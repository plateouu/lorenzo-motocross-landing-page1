"use server"

import Redis from "ioredis"
import { revalidatePath } from "next/cache"

const MASTER_KEY = "taylor1#"
const HARDCODED_KEYS: string[] = []

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

export async function validateKey(key: string) {
    const cleanKey = key.trim()
    try {
        // 1. Check Master Key (ALWAYS VALID, NEVER EXPIRES)
        if (cleanKey === MASTER_KEY) {
            return { success: true, isAdmin: true }
        }

        // 2. Check Revocation (Explicit Logout/Ban)
        const isRevoked = await redis.sismember("revoked_keys", cleanKey)
        if (isRevoked) {
            return { success: false, message: "Key Revoked By Admin" }
        }

        // 3. Check Usage (One-time use)
        // Checking usage for standard keys
        const isUsed = await redis.sismember("used_keys", cleanKey)
        if (isUsed) {
            return { success: false, message: "Key Already Redeemed" }
        }

        // 4. Validate Existence
        const isDynamic = await redis.sismember("valid_keys", cleanKey)
        const isHardcoded = HARDCODED_KEYS.includes(cleanKey)

        if (isDynamic || isHardcoded) {
            // Mark as used
            await redis.sadd("used_keys", cleanKey)
            return { success: true, isAdmin: false }
        }

        return { success: false, message: "Invalid Key Code" }
    } catch (error) {
        console.error("Redis Error:", error)
        return { success: false, message: "Server Protocol Error" }
    }
}

export async function validateAdminKey(key: string) {
    const cleanKey = key.trim()
    if (cleanKey === MASTER_KEY) {
        return { success: true }
    }
    return { success: false, message: "Access Denied" }
}

// ADMIN ACTIONS

export async function generateKey(note?: string) {
    // Generate simple 6-char key
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    const newKey = result + "#" // Signature suffix

    // Add to Redis
    await redis.sadd("valid_keys", newKey)
    if (note) {
        await redis.hset("key_notes", newKey, note)
    }
    revalidatePath("/")
    return { success: true, key: newKey }
}

export async function revokeKey(targetKey: string) {
    // Ban the key
    await redis.sadd("revoked_keys", targetKey)
    return { success: true }
}

export async function getAdminStats() {
    // Fetch all relevant data
    const [valid, used, revoked, notes] = await Promise.all([
        redis.smembers("valid_keys"),
        redis.smembers("used_keys"),
        redis.smembers("revoked_keys"),
        redis.hgetall("key_notes")
    ])

    // Merge logic for display
    return {
        valid: valid,
        used: used,
        revoked: revoked,
        hardcoded: HARDCODED_KEYS.concat([MASTER_KEY]), // Show master key in stats?
        notes: notes || {}
    }
}

export async function updateKeyNote(key: string, note: string) {
    if (note.trim()) {
        await redis.hset("key_notes", key, note.trim())
    } else {
        await redis.hdel("key_notes", key)
    }
    revalidatePath("/")
    return { success: true }
}

// USER PREFERENCES (DB Persistence)
export async function saveUserConfig(key: string, config: any) {
    if (!key) return { success: false }
    // Merge with existing to avoid overwriting tutorial status if only settings update
    const existingRaw = await redis.hget("user_configs", key)
    let finalConfig = config

    if (existingRaw) {
        const existing = JSON.parse(existingRaw)
        finalConfig = { ...existing, ...config }
    }

    await redis.hset("user_configs", key, JSON.stringify(finalConfig))
    return { success: true }
}

export async function getUserConfig(key: string) {
    if (!key) return null
    const data = await redis.hget("user_configs", key)
    return data ? JSON.parse(data) : null
}
