
import Redis from "ioredis"

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

async function main() {
    console.log("--- DEBUG REDIS KEYS ---")
    const valid = await redis.smembers("valid_keys")
    const used = await redis.smembers("used_keys")
    const revoked = await redis.smembers("revoked_keys")

    console.log("VALID KEYS:", valid)
    console.log("USED KEYS:", used)
    console.log("REVOKED KEYS:", revoked)
    redis.disconnect()
}

main()
