"use server"

import Redis from "ioredis"
import { revalidatePath } from "next/cache"
import { startOfWeek, getWeek } from "date-fns"

import crypto from "node:crypto"

const redis = new Redis("redis://default:AYW1AAIncDEzNDc2MmZlZmY1ZDk0ZWQyOTIxYjYxZDZiZmZmYTQ1MHAxMzQyMjk@ultimate-pig-34229.upstash.io:6379", {
    tls: {
        servername: "ultimate-pig-34229.upstash.io"
    }
})

// Timezone Helper: Always use New York Wall Clock Time
function getNYDate() {
    const nyString = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    return new Date(nyString)
}

function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex')
}

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
    { id: 'son-bedroom', title: 'Bedroom Upkeep', description: 'Clean and organize personal room', type: 'individual', category: 'Bedroom', assigneeId: 'son' },
    { id: 'son-bathroom-daily', title: 'Bathroom Upkeep', description: 'Wipe down and organize (Daily)', type: 'individual', category: 'Bathroom', assigneeId: 'son' },
    { id: 'son-bathroom-deep', title: 'Bathroom Deep Clean', description: 'Complete scrub (Every 3 Days)', type: 'individual', category: 'Bathroom', assigneeId: 'son' },

    // Daughter (Daphne) - Fixed
    { id: 'daughter-bedroom', title: 'Bedroom Upkeep', description: 'Maintain basement living space', type: 'individual', category: 'Bedroom', assigneeId: 'daughter' },
    { id: 'daughter-bathroom-daily', title: 'Bathroom Upkeep', description: 'Wipe down and organize (Daily)', type: 'individual', category: 'Bathroom', assigneeId: 'daughter' },
    { id: 'daughter-bathroom-deep', title: 'Bathroom Deep Clean', description: 'Complete scrub (Every 3 Days)', type: 'individual', category: 'Bathroom', assigneeId: 'daughter' },

    // Dad (Marvin) - Fixed
    { id: 'dad-bedroom', title: 'Bedroom Upkeep', description: 'Master bedroom organization', type: 'individual', category: 'Bedroom', assigneeId: 'dad' },
    { id: 'dad-bathroom-daily', title: 'Bathroom Upkeep', description: 'Wipe down and organize (Daily)', type: 'individual', category: 'Bathroom', assigneeId: 'dad' },
    { id: 'dad-bathroom-deep', title: 'Bathroom Deep Clean', description: 'Complete scrub (Every 3 Days)', type: 'individual', category: 'Bathroom', assigneeId: 'dad' },
    { id: 'dad-yard', title: 'Yard Maintenance', description: 'Mowing and general outdoor upkeep', type: 'individual', category: 'Outdoor', assigneeId: 'dad' },

    // Mom (Anett) - Fixed
    { id: 'mom-bedroom', title: 'Master Bedroom', description: 'Complete upkeep of the master bedroom', type: 'individual', category: 'Bedroom', assigneeId: 'mom' },
    
    // Shared / Rotating (Switch between people)
    { id: 'shared-cooking', title: 'Dinner Preparation', description: 'Prepare meal for the household', type: 'shared', category: 'Kitchen' },
    { id: 'shared-vacuum', title: 'Clean Livingroom', description: 'Clean common area carpets', type: 'shared', category: 'House' },
    { id: 'shared-trash', title: 'Trash & Recycling', description: 'Handle all bins and curb placement', type: 'shared', category: 'Maintenance' },
    { id: 'shared-floors', title: 'Dishes', description: 'Wash and dry all household dishes', type: 'shared', category: 'Kitchen' },
    { id: 'shared-laundry', title: 'Doing the Laundry', description: 'Wash, dry, and fold shared items', type: 'shared', category: 'Laundry' },
]

// Laundry folding rotation list
const FOLDING_ROTATION = ['son', 'daughter', 'mom', 'dad']

// Specific Rotation Cycles
const CYCLES = {
    trash: ['dad', 'son'], 
    dishes: ['mom', 'daughter'], // Renamed from floors
    vacuum: ['mom', 'dad', 'son', 'daughter'], 
    laundry: ['son', 'daughter', 'mom', 'dad'], 
    yard: ['joint:dad,son'], 
    cooking: ['mom', 'dad', 'son', 'daughter'] 
}

// Utility to get assignment for specific chore logic
function getDynamicAssignee(choreId: string, date: Date = getNYDate()) {
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
        const d = date.getDay()
        return CYCLES.laundry[d % CYCLES.laundry.length]
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
    
    // Dishes Pairing (Renamed floors): Anett (Mom) and Daphne (Daughter)
    if (choreId === 'shared-floors') {
        return ['mom', 'daughter', 'mom', 'daughter'][cyclePos]
    }
    
    // Vacuuming: Everyone (Orchestrated to never overlap Trash/Floors person)
    if (choreId === 'shared-vacuum') {
        return ['son', 'dad', 'daughter', 'mom'][cyclePos]
    }

    return cycle ? cycle[weekNumber % cycle.length] : ""
}

// Security Actions
export async function getSecurityStatus(userId: string) {
    const pwd = await redis.hget('chorelist:passwords', userId)
    return { hasPassword: !!pwd }
}

export async function setUserPassword(userId: string, password: string) {
    const existing = await redis.hget('chorelist:passwords', userId)
    if (existing) return { error: 'Password already set' }
    
    const hash = hashPassword(password)
    await redis.hset('chorelist:passwords', userId, hash)
    return { success: true }
}

export async function verifyPassword(userId: string, password: string) {
    const hash = await redis.hget('chorelist:passwords', userId)
    if (!hash) return { error: 'No password set' }
    
    if (hash === hashPassword(password)) {
        return { success: true }
    }
    return { error: 'Incorrect password' }
}

// Server Actions
export async function seedInitialData() {
    const existing = await redis.hlen('chorelist:chores')
    if (existing > 0) return 

    const pipeline = redis.pipeline()
    INITIAL_MEMBERS.forEach(m => pipeline.hset('chorelist:members', m.id, JSON.stringify(m)))
    INITIAL_CHORES.forEach(c => pipeline.hset('chorelist:chores', c.id, JSON.stringify(c)))
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
    
    // Always calculate based on New York Wall Clock
    const now = getNYDate()
    const next = new Date(now)
    next.setDate(now.getDate() + 7)

    const rotation: Record<string, string> = {}
    const nextRotation: Record<string, string> = {}

    // Build rotation summaries dynamically
    Object.keys(CYCLES).forEach(key => {
        const choreId = key === 'dishes' ? 'shared-floors' : `shared-${key}`
        rotation[key] = getDynamicAssignee(choreId, now)
        nextRotation[key] = getDynamicAssignee(choreId, next)
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

    // Smart Periodic Reset & Filtering
    const processedAssignments: Record<string, string> = {}
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    // Reference date for 3-day deep clean cycle (Sunday, March 1, 2026)
    const SEED_DATE = new Date("2026-03-01T00:00:00-05:00") // NY Time

    Object.entries(assignmentsRaw || {}).forEach(([key, val]) => {
        const [memberId, choreId] = key.split(':')
        const assignment: Assignment = JSON.parse(val as string)
        const chore = baseChores.find(c => c.id === choreId)
        
        if (assignment.status === 'completed' && assignment.lastCompleted) {
            const completedDate = new Date(assignment.lastCompleted)
            
            // 1. Daily Reset Logic
            const isDaily = chore?.title.toLowerCase().includes('upkeep') || 
                            choreId === 'shared-floors' || // Dishes
                            choreId === 'shared-laundry' ||
                            chore?.id === 'mom-dishes'
            
            if (isDaily && completedDate < startOfToday) {
                // Resets daily
                return 
            }

            // 2. Periodic Reset (3-Day Deep Clean)
            if (choreId.includes('deep')) {
                const diffMs = now.getTime() - SEED_DATE.getTime()
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
                const currentCycleDay = diffDays % 3
                
                const cycleStart = new Date(now)
                cycleStart.setDate(now.getDate() - currentCycleDay)
                cycleStart.setHours(0, 0, 0, 0)

                if (completedDate < cycleStart) {
                    // Reset if completed before the start of this 3-day cycle
                    return
                }
            }
        }
        processedAssignments[key] = val
    })

    // Calculate Next Due Dates for Deep Cleans
    baseChores.forEach(chore => {
        if (chore.id.includes('deep')) {
            const diffMs = now.getTime() - SEED_DATE.getTime()
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
            const daysUntilNext = 3 - (diffDays % 3)
            
            const nextDate = new Date(now)
            nextDate.setDate(now.getDate() + (daysUntilNext === 3 ? 0 : daysUntilNext))
            
            finalDueDates[chore.id] = nextDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            })
        }
    })

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
        assignments: processedAssignments,
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
