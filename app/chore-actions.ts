"use server"

import Redis from "ioredis"
import { revalidatePath } from "next/cache"
import { startOfWeek, getWeek } from "date-fns"

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

// Types
export type Member = {
    id: string
    name: string
    role: 'parent' | 'teen'
    isHome: boolean
}

export type Chore = {
    id: string
    title: string
    description: string
    type: 'individual' | 'shared'
    category: string
    assigneeId?: string // For individual chores
}

export type Assignment = {
    status: 'pending' | 'completed' | 'traded'
    lastCompleted?: string
    weekNumber?: number
    tradedWith?: string
}

export type GroceryItem = {
    id: string
    name: string
    link: string
    requestedBy: string
    timestamp: number
}

export type ChatMessage = {
    id: string
    userName: string
    content: string
    timestamp: number
}

// Initial Data
const INITIAL_MEMBERS: Member[] = [
    { id: 'mom', name: 'Anett', role: 'parent', isHome: true },
    { id: 'dad', name: 'Marvin', role: 'parent', isHome: true },
    { id: 'son', name: 'Taylor', role: 'teen', isHome: true },
    { id: 'daughter', name: 'Daphne', role: 'teen', isHome: true },
]

const INITIAL_CHORES: Chore[] = [
    // Son (Taylor) - Fixed
    { id: 'son-bedroom', title: 'Bedroom (Upstairs)', description: 'Clean and organize personal room', type: 'individual', category: 'Bedroom', assigneeId: 'son' },
    { id: 'son-bathroom', title: 'Bathroom (Upstairs)', description: 'Deep clean shared/personal bathroom', type: 'individual', category: 'Bathroom', assigneeId: 'son' },

    // Daughter (Daphne) - Fixed
    { id: 'daughter-bedroom', title: 'Bedroom (Basement)', description: 'Maintain basement living space', type: 'individual', category: 'Bedroom', assigneeId: 'daughter' },
    { id: 'daughter-bathroom', title: 'Bathroom (Basement)', description: 'Clean private basement bathroom', type: 'individual', category: 'Bathroom', assigneeId: 'daughter' },

    // Dad (Marvin) - Fixed
    { id: 'dad-bathroom', title: 'Master Bathroom', description: 'Clean private master bathroom', type: 'individual', category: 'Bathroom', assigneeId: 'dad' },
    { id: 'dad-yard', title: 'Yard Maintenance', description: 'Mowing and general outdoor upkeep', type: 'individual', category: 'Outdoor', assigneeId: 'dad' },

    // Mom (Anett) - Fixed
    { id: 'mom-bedroom', title: 'Master Bedroom', description: 'Complete upkeep of the master bedroom', type: 'individual', category: 'Bedroom', assigneeId: 'mom' },
    { id: 'mom-dishes', title: 'Wash Dishes', description: 'Maintain kitchen cleanliness and dishes', type: 'individual', category: 'Kitchen', assigneeId: 'mom' },
    
    // Shared / Rotating (Switch between people)
    { id: 'shared-cooking', title: 'Dinner Preparation', description: 'Prepare meal for the household', type: 'shared', category: 'Kitchen' },
    { id: 'shared-vacuum', title: 'Living Room Vacuum', description: 'Clean common area carpets', type: 'shared', category: 'House' },
    { id: 'shared-trash', title: 'Trash & Recycling', description: 'Handle all bins and curb placement', type: 'shared', category: 'Maintenance' },
    { id: 'shared-floors', title: 'Kitchen Floors', description: 'Sweep and mop the kitchen area', type: 'shared', category: 'House' },
    { id: 'shared-laundry', title: 'Doing the Laundry', description: 'Wash, dry, and fold shared items', type: 'shared', category: 'Laundry' },
]

// Laundry folding rotation list
const FOLDING_ROTATION = ['son', 'daughter', 'mom', 'dad']

// Specific Rotation Cycles
const CYCLES = {
    trash: ['dad', 'son'], // Marvin and Taylor
    floors: ['mom', 'daughter'], // Anett and Daphne
    vacuum: ['mom', 'dad', 'son', 'daughter'], // Everyone
    laundry: ['son', 'daughter', 'mom', 'dad'], // Daily - Everyone
    yard: ['joint:dad,son'], // Together Marvin and Taylor
    cooking: ['mom', 'dad', 'son', 'daughter'] 
}

// Utility to get assignment for specific chore logic
function getDynamicAssignee(choreId: string, date: Date = new Date()) {
    const weekNumber = getWeek(date)
    const dayIndex = date.getDay()
    const key = choreId.replace('shared-', '').replace('dad-', '') as keyof typeof CYCLES
    
    // 1. Joint assignments (e.g., Marvin and Taylor for Yard)
    const cycle = CYCLES[key]
    if (cycle && cycle[0]?.startsWith('joint:')) {
        return cycle[0].replace('joint:', '')
    }

    // 2. Laundry Folding (Daily Rotation - Independent)
    if (choreId === 'shared-laundry') {
        return CYCLES.laundry[dayIndex % CYCLES.laundry.length]
    }

    // 3. Yard Work (Bi-weekly Saturday Joint)
    if (choreId === 'dad-yard') {
        const biWeek = Math.floor((weekNumber - 1) / 2)
        return biWeek % 2 === 0 ? 'dad,son' : 'none'
    }

    // 4. ORCHESTRATED WEEKLY HUB (Trash, Floors, Vacuum)
    // We use a 4-week matrix to ensure zero person-overlap
    const cyclePos = weekNumber % 4
    
    // Trash Pairing: Marvin (Dad) and Taylor (Son)
    if (choreId === 'shared-trash') {
        return ['dad', 'son', 'dad', 'son'][cyclePos]
    }
    
    // Floors Pairing: Anett (Mom) and Daphne (Daughter)
    if (choreId === 'shared-floors') {
        return ['mom', 'daughter', 'mom', 'daughter'][cyclePos]
    }
    
    // Vacuuming: Everyone (Orchestrated to never overlap Trash/Floors person)
    // Week 0: Trash:Dad, Floors:Mom -> Vac:Son
    // Week 1: Trash:Son, Floors:Daughter -> Vac:Dad
    // Week 2: Trash:Dad, Floors:Mom -> Vac:Daughter
    // Week 3: Trash:Son, Floors:Dauther -> Vac:Mom
    if (choreId === 'shared-vacuum') {
        return ['son', 'dad', 'daughter', 'mom'][cyclePos]
    }

    return cycle ? cycle[weekNumber % cycle.length] : ""
}

// Server Actions
export async function seedInitialData() {
    // Force re-seed for the new structure
    await redis.del('chorelist:chores')
    await redis.del('chorelist:members')
    
    // Update chores for specific frequencies
    const modifiedChores = INITIAL_CHORES.map(c => {
        if (c.id === 'dad-yard') {
            return { ...c, title: 'Yard Maintenance (Joint)', description: 'Mowing and outdoor upkeep' }
        }
        if (c.id.includes('bathroom')) {
            return { ...c, description: 'Deep clean (Every 3 Days)' }
        }
        return c
    })
    
    const pipeline = redis.pipeline()
    INITIAL_MEMBERS.forEach(m => pipeline.hset('chorelist:members', m.id, JSON.stringify(m)))
    modifiedChores.forEach(c => pipeline.hset('chorelist:chores', c.id, JSON.stringify(c)))
    await pipeline.exec()
    revalidatePath('/')
}

// Update a chore's full details
export async function updateChoreDetail(choreId: string, title: string, description: string, assigneeId: string) {
    const existingRaw = await redis.hget('chorelist:chores', choreId)
    if (!existingRaw) return { error: 'Chore not found' }
    
    const chore = JSON.parse(existingRaw as string)
    chore.title = title
    chore.description = description
    chore.assigneeId = assigneeId
    
    await redis.hset('chorelist:chores', choreId, JSON.stringify(chore))
    revalidatePath('/')
    return { success: true }
}

// Delete a chore permanently
export async function deleteChore(choreId: string) {
    await Promise.all([
        redis.hdel('chorelist:chores', choreId),
        redis.hdel('chorelist:due_dates', choreId),
        redis.lrem('chorelist:custom_ids', 0, choreId)
    ])
    
    // Also cleanup all assignments for this chore
    const allAssignments = await redis.hkeys('chorelist:assignments')
    const toDelete = allAssignments.filter(key => key.endsWith(`:${choreId}`))
    if (toDelete.length > 0) {
        await Promise.all(toDelete.map(key => redis.hdel('chorelist:assignments', key)))
    }
    
    revalidatePath('/')
    return { success: true }
}

// Update a chore's due date
export async function updateChoreDueDate(choreId: string, dueDate: string) {
    await redis.hset('chorelist:due_dates', choreId, dueDate)
    revalidatePath('/')
    return { success: true }
}

// Update the daily dinner schedule
export async function updateDinnerSchedule(dayIndex: number, assigneeId: string, description: string) {
    await redis.hset('chorelist:dinner_schedule', dayIndex.toString(), JSON.stringify({ assigneeId, description }))
    revalidatePath('/')
    return { success: true }
}

// Add a custom, one-off chore
export async function addCustomChore(title: string, assigneeId: string, dueDate: string) {
    const id = `custom-${Date.now()}`
    const chore: Chore = {
        id,
        title,
        description: 'Custom added task',
        type: 'individual',
        category: 'House',
        assigneeId
    }
    
    await Promise.all([
        redis.hset('chorelist:chores', id, JSON.stringify(chore)),
        redis.hset('chorelist:due_dates', id, dueDate),
        redis.lpush('chorelist:custom_ids', id)
    ])
    revalidatePath('/')
    return { success: true, id }
}

export async function getChoreState() {
    await seedInitialData()

    const [membersRaw, choresRaw, assignmentsRaw, dueDatesRaw, chatRaw, dinnerScheduleRaw] = await Promise.all([
        redis.hgetall('chorelist:members'),
        redis.hgetall('chorelist:chores'),
        redis.hgetall('chorelist:assignments'),
        redis.hgetall('chorelist:due_dates'),
        redis.lrange('chorelist:chat', 0, 49),
        redis.hgetall('chorelist:dinner_schedule')
    ])

    const members = Object.values(membersRaw || {}).map(m => JSON.parse(m as string))
    const baseChores = Object.values(choresRaw || {}).map(c => JSON.parse(c as string))
    
    const now = new Date()
    const next = new Date()
    next.setDate(next.getDate() + 7)

    const rotation: Record<string, string> = {}
    const nextRotation: Record<string, string> = {}

    // Build rotation summaries dynamically
    Object.keys(CYCLES).forEach(key => {
        rotation[key] = getDynamicAssignee(`shared-${key}`, now)
        nextRotation[key] = getDynamicAssignee(`shared-${key}`, next)
    })

    // Special: Yard Next Date
    const weekNumber = getWeek(now)
    const biWeek = Math.floor((weekNumber - 1) / 2)
    const currentSaturday = new Date(now)
    currentSaturday.setDate(now.getDate() + (6 - now.getDay()))
    
    let yardDateObj = currentSaturday
    if (biWeek % 2 !== 0) {
        yardDateObj.setDate(yardDateObj.getDate() + 7)
    }
    const yardDateStr = yardDateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    
    const finalDueDates = { ...dueDatesRaw }
    finalDueDates['dad-yard'] = yardDateStr

    // Parse dinner schedule
    const dinnerSchedule: Record<string, { assigneeId: string, description: string }> = {}
    if (dinnerScheduleRaw) {
        Object.entries(dinnerScheduleRaw).forEach(([day, val]) => {
            dinnerSchedule[day] = JSON.parse(val as string)
        })
    }

    return {
        members,
        chores: baseChores,
        assignments: assignmentsRaw || {},
        dueDates: finalDueDates,
        chat: chatRaw.map(m => JSON.parse(m as string)),
        dinnerSchedule,
        currentWeek: weekNumber,
        rotation,
        nextRotation
    }
}

export async function toggleMemberStatus(memberId: string) {
    const raw = await redis.hget('chorelist:members', memberId)
    if (!raw) return
    const member = JSON.parse(raw)
    member.isHome = !member.isHome
    await redis.hset('chorelist:members', memberId, JSON.stringify(member))
    revalidatePath('/')
}

export async function updateChoreStatus(choreId: string, memberId: string, status: 'pending' | 'completed') {
    const key = `${memberId}:${choreId}`
    const now = new Date().toISOString()
    const assignment: Assignment = {
        status,
        lastCompleted: status === 'completed' ? now : undefined
    }
    await redis.hset('chorelist:assignments', key, JSON.stringify(assignment))
    revalidatePath('/')
}

export async function takeCharge(choreId: string, fromMemberId: string, toMemberId: string) {
    const keyTo = `${toMemberId}:${choreId}`
    const assignment: Assignment = {
        status: 'pending',
        tradedWith: fromMemberId
    }
    await redis.hset('chorelist:assignments', keyTo, JSON.stringify(assignment))
    
    // Mark original as traded
    const keyFrom = `${fromMemberId}:${choreId}`
    const fromAssignment: Assignment = {
        status: 'traded',
        tradedWith: toMemberId
    }
    await redis.hset('chorelist:assignments', keyFrom, JSON.stringify(fromAssignment))
    
    revalidatePath('/')
}

export async function sendChatMessage(userName: string, content: string) {
    const msg: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        userName,
        content,
        timestamp: Date.now()
    }
    await redis.lpush('chorelist:chat', JSON.stringify(msg))
    await redis.ltrim('chorelist:chat', 0, 49)
    revalidatePath('/')
}
