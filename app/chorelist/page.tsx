"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { 
    MessageSquare, 
    Check,
    Plus,
    Calendar,
    X,
    ArrowRight,
    Users,
    Utensils,
    Settings,
    Edit3,
    Trash2,
    RotateCcw,
    FastForward
} from "lucide-react"
import { 
    getChoreState, 
    updateChoreStatus, 
    sendChatMessage,
    updateChoreDueDate,
    updateDinnerSchedule,
    addCustomChore,
    updateChoreDetail,
    deleteChore,
    getSecurityStatus,
    setUserPassword,
    verifyPassword,
    Member,
    Chore,
    Assignment,
    ChatMessage
} from "../chore-actions"
import { Toaster, toast } from "sonner"

// CONSTANT SORT ORDERS - NEVER CHANGE
const MEMBER_IDS = ['mom', 'dad', 'son', 'daughter']
const BASE_INDIVIDUAL_IDS = [
    'mom-bedroom', 'mom-dishes',
    'dad-bathroom',
    'son-bedroom', 'son-bathroom',
    'daughter-bedroom', 'daughter-bathroom'
]
const SHARED_CHORE_IDS = [
    'shared-trash', 'shared-floors', 'shared-vacuum', 'shared-laundry', 'dad-yard'
]
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function ChorelistPage() {
    const [state, setState] = useState<{
        members: Member[],
        chores: Chore[],
        assignments: Record<string, string>,
        dueDates: Record<string, string>,
        dinnerSchedule: Record<string, { assigneeId: string, description: string }>,
        chat: ChatMessage[],
        currentWeek: number,
        rotation: Record<string, string>,
        nextRotation: Record<string, string>
    } | null>(null)
    
    const [userName, setUserName] = useState<string | null>(null)
    const [chatInput, setChatInput] = useState("")
    const [newChoreTitle, setNewChoreTitle] = useState("")
    const [newChoreAssignee, setNewChoreAssignee] = useState("son")
    const [newChoreDate, setNewChoreDate] = useState("Monday")
    
    // Parent Management State
    const [editingChore, setEditingChore] = useState<Chore | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDinnerModal, setShowDinnerModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const [authUserId, setAuthUserId] = useState<string | null>(null)
    const [authMode, setAuthMode] = useState<'none' | 'setup' | 'verify'>('none')
    const [authPassword, setAuthPassword] = useState("")

    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchState()
        const savedName = localStorage.getItem("daan-member-name")
        if (savedName) setUserName(savedName)
        const interval = setInterval(fetchState, 5000) 
        return () => clearInterval(interval)
    }, [])

    async function fetchState() {
        const data = await getChoreState()
        setState(data as any)
    }

    const currentUser = state?.members.find(m => m.name === userName)
    const isParent = currentUser?.id === 'mom' || currentUser?.id === 'dad'

    const sortedMembers = useMemo(() => {
        if (!state) return []
        const membersMap = new Map(state.members.map(m => [m.id, m]))
        return MEMBER_IDS.map(id => membersMap.get(id)).filter(Boolean) as Member[]
    }, [state?.members])

    const getSharedRotationChores = () => {
        if (!state) return []
        return SHARED_CHORE_IDS.map(id => {
            const chore = state.chores.find(c => c.id === id)
            if (!chore) return null
            const key = id.replace('shared-', '').replace('dad-', '')
            
            const assigneeIdRaw = state.rotation[key] || ""
            const nextAssigneeIdRaw = state.nextRotation[key] || ""

            // Handle multiple assignees (joint tasks)
            const assigneeIds = assigneeIdRaw.split(',')
            const nextAssigneeIds = nextAssigneeIdRaw.split(',')

            const assignees = assigneeIds.map(aid => state.members.find(m => m.id === aid)).filter(Boolean) as Member[]
            const nextAssignees = nextAssigneeIds.map(aid => state.members.find(m => m.id === aid)).filter(Boolean) as Member[]
            
            return { chore, assignees, nextAssignees, id }
        }).filter(Boolean) as { chore: Chore, assignees: Member[], nextAssignees: Member[], id: string }[]
    }

    const getIndividualChoresForMember = (memberId: string) => {
        if (!state) return []
        const individual = state.chores.filter(c => c.id.startsWith('custom-') ? false : (c.type === 'individual' && c.assigneeId === memberId && !SHARED_CHORE_IDS.includes(c.id)))
        const custom = state.chores.filter(c => c.id.startsWith('custom-') && c.assigneeId === memberId)
        const result = BASE_INDIVIDUAL_IDS.map(id => individual.find(c => c.id === id)).filter(Boolean) as Chore[]
        return [...result, ...custom]
    }

    const handleStatus = async (choreId: string, memberId: string, currentStatus?: string) => {
        if (!isParent && currentUser?.id !== memberId) {
            toast.error("Only parents or assigned members can mark tasks")
            return
        }

        const newStatus = currentStatus === "completed" ? "pending" : "completed"
        if (state) {
            const key = `${memberId}:${choreId}`
            const newAssignments = { ...state.assignments, [key]: JSON.stringify({ status: newStatus }) }
            setState({ ...state, assignments: newAssignments })
        }
        await updateChoreStatus(choreId, memberId, newStatus)
        fetchState()
    }

    const handleUpdateDate = async (choreId: string, newDate: string) => {
        if (!isParent) return
        const formatted = newDate.toLowerCase().replace(/,/g, ' and').replace(/\s+/g, ' ')
        if (state) {
            setState({ ...state, dueDates: { ...state.dueDates, [choreId]: formatted } })
        }
        await updateChoreDueDate(choreId, formatted)
        fetchState()
    }

    const handleUpdateDinner = async (dayIndex: number, assigneeId: string, description: string) => {
        if (!isParent) return
        await updateDinnerSchedule(dayIndex, assigneeId, description)
        fetchState()
    }

    const handleAddChore = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newChoreTitle) return
        await addCustomChore(newChoreTitle, newChoreAssignee, newChoreDate)
        setNewChoreTitle("")
        setShowAddModal(false)
        fetchState()
    }

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingChore) return
        await updateChoreDetail(editingChore.id, editingChore.title, editingChore.description, editingChore.assigneeId || "")
        setShowEditModal(false)
        setEditingChore(null)
        fetchState()
    }

    const handleDeleteChore = async (choreId: string) => {
        if (!confirm("Are you sure you want to delete this task?")) return
        await deleteChore(choreId)
        setShowEditModal(false)
        setEditingChore(null)
        fetchState()
    }

    const handleSendChat = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userName || !chatInput) return
        const content = chatInput
        setChatInput("")
        await sendChatMessage(userName, content)
        fetchState()
    }

    const handleSelectMember = async (id: string) => {
        const { hasPassword } = await getSecurityStatus(id)
        setAuthUserId(id)
        setAuthMode(hasPassword ? 'verify' : 'setup')
        setAuthPassword("")
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!authUserId) return
        
        if (authMode === 'setup') {
            if (authPassword.length < 4) {
                toast.error("Password must be at least 4 characters")
                return
            }
            await setUserPassword(authUserId, authPassword)
            toast.success("Security set!")
        } else {
            const res = await verifyPassword(authUserId, authPassword)
            if (res.error) {
                toast.error(res.error)
                return
            }
        }
        
        const m = state?.members.find(member => member.id === authUserId)
        if (m) {
            setUserName(m.name)
            localStorage.setItem("daan-member-name", m.name)
        }
    }

    if (!state) return <div className="min-h-screen bg-black" />

    if (!userName) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans selection:bg-white selection:text-black">
                <div className="w-full max-w-sm space-y-12">
                    <div className="text-center space-y-2">
                        <h1 className="text-5xl font-black tracking-tighter">CHORES</h1>
                        <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Select your profile</p>
                    </div>

                    {authMode === 'none' ? (
                        <div className="space-y-4">
                            {MEMBER_IDS.map(id => {
                                const m = state.members.find(member => member.id === id)
                                if (!m) return null
                                return (
                                    <button
                                        key={m.id}
                                        onClick={() => handleSelectMember(m.id)}
                                        className="w-full p-8 bg-zinc-950 border border-white/5 hover:border-white/20 rounded-3xl text-left font-black text-2xl transition-all active:scale-[0.98]"
                                    >
                                        {m.name.toUpperCase()}
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        <form onSubmit={handleAuth} className="space-y-8 bg-zinc-950 p-10 rounded-3xl border border-white/5 animate-in fade-in zoom-in duration-300">
                            <div className="space-y-4 text-center">
                                <h2 className="text-2xl font-black">{authMode === 'setup' ? 'CREATE PASSWORD' : 'ENTER PASSWORD'}</h2>
                                <p className="text-[10px] font-bold text-zinc-600 uppercase">Profile: {state.members.find(m => m.id === authUserId)?.name}</p>
                            </div>
                            <input 
                                autoFocus
                                type="password" 
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                placeholder="••••"
                                className="w-full bg-black border-4 border-zinc-900 rounded-2xl p-6 text-center text-3xl font-black tracking-widest outline-none focus:border-white transition-all"
                            />
                            <div className="flex gap-4">
                                <button 
                                    type="button" 
                                    onClick={() => setAuthMode('none')}
                                    className="flex-1 bg-zinc-900 text-zinc-500 py-6 rounded-2xl font-black uppercase text-sm"
                                >
                                    BACK
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-[2] bg-white text-black py-6 rounded-2xl font-black uppercase text-sm active:scale-95 transition-all"
                                >
                                    {authMode === 'setup' ? 'SET SECURITY' : 'UNLOCK'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        )
    }

    const defaultDueMap: Record<string, string> = {
        'shared-trash': 'Tuesday and Friday',
        'shared-floors': 'Wednesday and Saturday',
        'shared-vacuum': 'Monday and Thursday',
        'shared-laundry': 'Automatic Rotation',
        'dad-yard': 'Saturday Service'
    }

    const todayIndex = new Date().getDay()
    const todaysDinner = state.dinnerSchedule[todayIndex.toString()] || { assigneeId: 'none', description: 'No assignment set' }
    const dinnerAssignee = todaysDinner.assigneeId === 'none' ? null : state.members.find(m => m.id === todaysDinner.assigneeId)

    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pb-32">
            <Toaster position="top-center" theme="dark" />
            
            <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-[80] border-b-2 border-zinc-900 px-6 py-8 md:px-12">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl md:text-5xl font-black tracking-tighter">CHORES</h1>
                        <p className="text-[10px] font-bold text-zinc-600 mt-1 uppercase tracking-widest">{userName} &bull; {DAYS[todayIndex]}</p>
                    </div>
                    <div className="flex gap-3">
                        {isParent && (
                            <button onClick={() => setShowAddModal(true)} className="bg-white text-black p-4 rounded-xl flex items-center justify-center hover:bg-zinc-200 transition-all">
                                <Plus className="w-6 h-6" />
                            </button>
                        )}
                        <button onClick={() => { localStorage.removeItem("daan-member-name"); setUserName(null); }} className="bg-zinc-900 p-4 rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-all">
                            <RotateCcw className="w-5 h-5 text-zinc-500" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 pt-52 space-y-20">
                
                {/* 1. DINNER PREP CARD */}
                <section className="bg-zinc-950 p-6 md:p-10 rounded-3xl border-2 border-zinc-900 space-y-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Utensils className="w-6 h-6 text-zinc-600" />
                            <h2 className="text-xl md:text-2xl font-black text-zinc-600 uppercase">Dinner Plan</h2>
                        </div>
                        {isParent && <button onClick={() => setShowDinnerModal(true)} className="text-[10px] font-bold text-zinc-700 bg-zinc-900 px-4 py-2 rounded-full hover:text-white flex items-center gap-2"><Settings className="w-3 h-3" /> MANAGE</button>}
                    </div>
                    <div className="bg-zinc-900 p-6 md:p-8 rounded-2xl flex items-center justify-between border border-white/5 transition-all">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-xl md:text-3xl font-black uppercase text-white">{todaysDinner.description.toUpperCase()}</span>
                                {dinnerAssignee && (
                                    <span className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-black">
                                        {dinnerAssignee.name.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Today&apos;s Assignment</p>
                        </div>
                        {isParent && dinnerAssignee && (
                            <button 
                                onClick={() => handleStatus('shared-cooking', dinnerAssignee.id, 'pending')}
                                className="bg-zinc-800 text-zinc-200 p-5 rounded-2xl hover:bg-white hover:text-black transition-all"
                            >
                                <Check className="w-8 h-8 stroke-[3]" />
                            </button>
                        )}
                    </div>
                </section>

                {/* 2. WEEKLY ROTATION AREA */}
                <section className="space-y-8 px-2">
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-zinc-600" />
                        <h2 className="text-xl md:text-2xl font-black text-zinc-600 uppercase">Weekly Rotation</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {getSharedRotationChores().map(({ chore, assignees, nextAssignees, id }) => {
                            const isMe = assignees.some(a => a.name === userName)
                            const names = assignees.map(a => a.name.toUpperCase()).join(" & ")
                            const nextNames = nextAssignees.map(a => a.name.toUpperCase()).join(" & ")
                            
                            // For status tracking, we use the first assignee as the key unless it's a joint task
                            const primaryAssignee = assignees[0]
                            if (!primaryAssignee) return null
                            
                            const key = `${primaryAssignee.id}:${chore.id}`
                            const assignmentRaw = state.assignments[key]
                            const assignment = assignmentRaw ? JSON.parse(assignmentRaw) : { status: 'pending' }
                            const isDone = assignment.status === 'completed'
                            const dueDate = state.dueDates[chore.id] || defaultDueMap[chore.id] || "Weekly"

                            // Handle 'none' logic for bi-weekly off weeks
                            if (assignees[0].id === 'none') {
                                return null // Don't show yard work if it's not a yard week
                            }

                            return (
                                <div 
                                    key={chore.id}
                                    className={`p-8 rounded-3xl flex items-center justify-between border-2 transition-all active:scale-[0.99] ${
                                        isDone ? "bg-zinc-950 border-zinc-900 text-zinc-800 opacity-60" : isMe ? "bg-zinc-900 border-white/30 shadow-2xl" : "bg-zinc-900/40 border-transparent text-zinc-600"
                                    }`}
                                >
                                    <div className="flex items-center gap-6 md:gap-10">
                                        <button 
                                            onClick={() => handleStatus(chore.id, primaryAssignee.id, assignment.status)}
                                            className={`w-14 h-14 shrink-0 aspect-square rounded-2xl border-4 flex items-center justify-center transition-all ${
                                                isDone ? "bg-zinc-900 border-zinc-800 text-zinc-700" : isMe || isParent ? "bg-white border-white text-black active:scale-90" : "border-zinc-800"
                                            }`}
                                        >
                                            {isDone && <Check className="w-8 h-8 stroke-[5]" />}
                                        </button>
                                        <div onClick={() => isParent && (setEditingChore(chore), setShowEditModal(true))} className="cursor-pointer">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className={`text-xl md:text-2xl font-black ${isDone ? 'line-through' : ''}`}>{chore.title.toUpperCase()}</span>
                                                <span className={`text-[10px] font-black px-3 py-1 rounded-md ${isMe ? 'bg-white text-black outline outline-4 outline-white/10' : 'bg-zinc-800 text-zinc-500'}`}>
                                                    {names}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-zinc-800" />
                                                    <span className="text-[10px] font-black text-zinc-700 tracking-tighter">{dueDate.toUpperCase()}</span>
                                                </div>
                                                {names !== nextNames && nextNames !== "NONE" && (
                                                    <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded">
                                                        <FastForward className="w-3 h-3" />
                                                        NEXT: {nextNames}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isMe && !isDone && <ArrowRight className="w-6 h-6 text-zinc-800" />}
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* 3. INDIVIDUAL TASKS AREA */}
                <div className="space-y-32 border-t-4 border-zinc-900 pt-20">
                    {sortedMembers.map(m => {
                        const myChores = getIndividualChoresForMember(m.id)
                        const isMe = currentUser?.id === m.id

                        return (
                            <section key={m.id} className="space-y-10">
                                <h2 className={`text-2xl md:text-3xl font-black ${isMe ? 'text-white' : 'text-zinc-700'}`}>
                                    {m.name.toUpperCase()}&apos;S PERSONAL
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {myChores.length > 0 ? myChores.map(c => {
                                        const key = `${m.id}:${c.id}`
                                        const assignmentRaw = state.assignments[key]
                                        const assignment = assignmentRaw ? JSON.parse(assignmentRaw) : { status: 'pending' }
                                        const isDone = assignment.status === 'completed'
                                        const dueDate = state.dueDates[c.id] || "DAILY"

                                        return (
                                            <div 
                                                key={c.id}
                                                className={`p-8 rounded-3xl flex items-center justify-between border-2 active:scale-[0.99] transition-all ${
                                                    isDone ? "bg-zinc-950 border-zinc-900 text-zinc-800" : isMe ? "bg-zinc-900 border-white/10" : "bg-zinc-900/60 border-transparent text-zinc-600"
                                                }`}
                                            >
                                                <div className="flex items-center gap-8 md:gap-12">
                                                    <button 
                                                        onClick={() => handleStatus(c.id, m.id, assignment.status)}
                                                        className={`w-14 h-14 shrink-0 aspect-square rounded-2xl border-4 flex items-center justify-center transition-all ${
                                                            isDone ? "bg-zinc-900 border-zinc-800 text-zinc-700" : isMe || isParent ? "bg-white border-white text-black active:scale-95" : "border-zinc-800"
                                                        }`}
                                                    >
                                                        {isDone && <Check className="w-8 h-8 stroke-[5]" />}
                                                    </button>
                                                    <div onClick={() => isParent && (setEditingChore(c), setShowEditModal(true))} className="cursor-pointer space-y-1">
                                                        <span className={`text-xl md:text-2xl font-black ${isDone ? 'line-through' : ''}`}>{c.title.toUpperCase()}</span>
                                                        <div className="flex items-center gap-4">
                                                            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{c.description.toUpperCase()}</p>
                                                            <span className="text-[10px] font-black text-zinc-800">{dueDate.toUpperCase()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : (
                                        <p className="text-zinc-800 font-black italic text-sm px-4">NO TASKS ASSIGNED</p>
                                    )}
                                </div>
                            </section>
                        )
                    })}
                </div>

                <section className="pt-24 border-t-4 border-zinc-900">
                    <div className="bg-zinc-950 rounded-3xl p-8 md:p-12 space-y-12">
                        <h2 className="text-[10px] font-black text-zinc-600 tracking-[1em] text-center">FAMILY BOARD</h2>
                        <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                            {state.chat.slice().reverse().map((msg) => (
                                <div key={msg.id} className="border-l-8 border-zinc-900 pl-8 py-2">
                                    <span className="text-[10px] font-black text-zinc-700 tracking-widest">{msg.userName.toUpperCase()}</span>
                                    <p className="text-lg font-bold mt-2 text-zinc-200">{msg.content}</p>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                        <form onSubmit={handleSendChat} className="pt-8 block">
                            <input 
                                type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                                placeholder="SEND A MESSAGE..."
                                className="w-full bg-zinc-900 rounded-2xl p-6 text-sm font-black focus:outline-none focus:ring-4 focus:ring-white/5 transition-all outline-none"
                            />
                        </form>
                    </div>
                </section>

            </div>

            {/* Dinner Modal */}
            {showDinnerModal && (
                <div className="fixed inset-0 bg-black/95 flex items-end md:items-center justify-center z-[110] p-0 md:p-6">
                    <div className="bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-10 md:p-16 rounded-t-3xl md:rounded-3xl space-y-12 border-t md:border border-zinc-800">
                        <div className="flex justify-between items-center bg-zinc-900 sticky top-0 py-4 z-10 border-b border-zinc-800">
                            <h3 className="text-3xl font-black uppercase">Dinner Schedule</h3>
                            <button onClick={() => setShowDinnerModal(false)} className="bg-zinc-800 p-4 rounded-2xl hover:bg-zinc-700 transition-all"><X className="w-8 h-8" /></button>
                        </div>
                        <div className="space-y-6">
                            {DAYS.map((day, idx) => {
                                const sched = state.dinnerSchedule[idx.toString()] || { assigneeId: 'none', description: 'No assignment' }
                                return (
                                    <div key={day} className="flex flex-col md:flex-row gap-6 bg-zinc-950 p-8 rounded-2xl border border-white/5">
                                        <div className="md:w-32 font-black text-zinc-600 text-lg">{day.toUpperCase()}</div>
                                        <div className="flex-1 space-y-4">
                                            <select 
                                                value={sched.assigneeId} 
                                                onChange={(e) => handleUpdateDinner(idx, e.target.value, sched.description)}
                                                className="w-full bg-zinc-900 border-2 border-zinc-800 p-4 rounded-xl font-bold text-sm outline-none focus:border-white transition-all"
                                            >
                                                <option value="none">NONE / OUT / LEFTOVERS</option>
                                                {MEMBER_IDS.map(id => <option key={id} value={id}>{id.toUpperCase()}</option>)}
                                            </select>
                                            <input 
                                                value={sched.description} 
                                                onChange={(e) => handleUpdateDinner(idx, sched.assigneeId, e.target.value)}
                                                placeholder="What's for dinner?"
                                                className="w-full bg-black border-2 border-zinc-800 p-4 rounded-xl font-bold text-sm outline-none focus:border-white transition-all"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <button onClick={() => setShowDinnerModal(false)} className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-widest text-lg active:scale-95 transition-all">SAVE & CLOSE</button>
                    </div>
                </div>
            )}

            {/* Edit Chore Modal */}
            {showEditModal && editingChore && (
                <div className="fixed inset-0 bg-black/95 flex items-end md:items-center justify-center z-[120] p-0 md:p-6">
                    <div className="bg-zinc-900 w-full max-w-2xl p-10 md:p-16 rounded-t-3xl md:rounded-3xl space-y-10 border-t md:border border-zinc-800">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl font-black uppercase tracking-tighter">Edit Task</h3>
                            <button onClick={() => setShowEditModal(false)}><X className="w-8 h-8" /></button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-zinc-600 uppercase">TITLE</label>
                                <input 
                                    autoFocus value={editingChore.title} 
                                    onChange={(e) => setEditingChore({...editingChore, title: e.target.value})}
                                    className="w-full bg-black rounded-2xl p-6 font-black text-xl border-4 border-zinc-800 focus:border-white outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-zinc-600 uppercase">DESCRIPTION</label>
                                <input 
                                    value={editingChore.description} 
                                    onChange={(e) => setEditingChore({...editingChore, description: e.target.value})}
                                    className="w-full bg-black rounded-2xl p-6 font-black text-lg border-4 border-zinc-800 focus:border-white outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-zinc-600 uppercase">RE-ASSIGN TO</label>
                                    <select 
                                        value={editingChore.assigneeId || 'son'} 
                                        onChange={(e) => setEditingChore({...editingChore, assigneeId: e.target.value})}
                                        className="w-full bg-black rounded-2xl p-6 font-black border-4 border-zinc-800 outline-none"
                                    >
                                        {MEMBER_IDS.map(id => <option key={id} value={id}>{id.toUpperCase()}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-zinc-600 uppercase">DUE DATE</label>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const next = prompt("Update Due Date (e.g. Monday and Thursday):", state?.dueDates[editingChore.id] || "Daily")
                                            if (next) handleUpdateDate(editingChore.id, next)
                                        }}
                                        className="w-full bg-zinc-800 rounded-2xl p-6 font-black text-left text-zinc-400"
                                    >
                                        {(state?.dueDates[editingChore.id] || "Daily").toUpperCase()}
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-white text-black py-6 rounded-2xl font-black uppercase text-lg active:scale-95 transition-all">SAVE CHANGES</button>
                                <button type="button" onClick={() => handleDeleteChore(editingChore.id)} className="bg-zinc-800 text-red-500 p-6 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 className="w-8 h-8" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Chore Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/95 flex items-end md:items-center justify-center z-[120] p-0 md:p-6">
                    <div className="bg-zinc-900 w-full max-w-2xl p-10 md:p-16 rounded-t-3xl md:rounded-3xl space-y-10 border-t md:border border-zinc-800">
                        <div className="flex justify-between items-center">
                            <h3 className="text-3xl font-black uppercase tracking-tighter">New Task</h3>
                            <button onClick={() => setShowAddModal(false)}><X className="w-8 h-8" /></button>
                        </div>
                        <form onSubmit={handleAddChore} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-zinc-600 uppercase">TASK NAME</label>
                                <input 
                                    autoFocus value={newChoreTitle} onChange={(e) => setNewChoreTitle(e.target.value)}
                                    className="w-full bg-black rounded-2xl p-6 font-black text-xl border-4 border-zinc-800 focus:border-white outline-none transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-zinc-600 uppercase">ASSIGN TO</label>
                                    <select value={newChoreAssignee} onChange={(e) => setNewChoreAssignee(e.target.value)} className="w-full bg-black rounded-2xl p-6 font-black border-4 border-zinc-800 outline-none">
                                        {MEMBER_IDS.map(id => <option key={id} value={id}>{id.toUpperCase()}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-zinc-600 uppercase">DUE DATE</label>
                                    <input value={newChoreDate} onChange={(e) => setNewChoreDate(e.target.value)} placeholder="e.g. Tuesday and Friday" className="w-full bg-black rounded-2xl p-6 font-black border-4 border-zinc-800 outline-none" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase text-lg active:scale-95 transition-all">CREATE TASK</button>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )
}
