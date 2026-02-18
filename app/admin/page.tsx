"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { validateAdminKey, generateKey, getAdminStats, revokeKey, updateKeyNote } from "../actions"

type AdminStats = {
    valid: string[]
    used: string[]
    revoked: string[]
    hardcoded: string[]
    notes: Record<string, string>
}

export default function AdminPage() {
    const [step, setStep] = useState<"login" | "admin">("login")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    // Admin State
    const [stats, setStats] = useState<AdminStats | null>(null)
    const [newCreatedKey, setNewCreatedKey] = useState("")
    const [newKeyNote, setNewKeyNote] = useState("")

    const loadAdminStats = async () => {
        const data = await getAdminStats()
        setStats(data)
    }

    const handleCreateKey = async () => {
        const res = await generateKey(newKeyNote)
        if (res.success && res.key) {
            setNewCreatedKey(res.key)
            setNewKeyNote("") // Reset note input
            loadAdminStats()
        }
    }

    const handleRevoke = async (k: string) => {
        if (confirm(`Revoke access for key ${k}?`)) {
            await revokeKey(k)
            loadAdminStats()
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await validateAdminKey(password.trim())
            if (result.success) {
                await loadAdminStats() // PRE-LOAD
                setStep("admin")
            } else {
                setError(true)
                setErrorMsg(result.message || "Access Denied")
            }
        } catch (err) {
            setError(true)
            setErrorMsg("Connection Error")
        }
    }

    // UPDATED KEY ROW COMPONENT
    const KeyRow = ({ k, status }: { k: string, status: "valid" | "used" | "revoked" | "hardcoded" }) => {
        const [visible, setVisible] = useState(false)
        const [isHovered, setIsHovered] = useState(false)

        let statusColor = "text-green-600"
        let statusBg = "bg-green-100"

        if (status === "used") {
            statusColor = "text-yellow-600"
            statusBg = "bg-yellow-100"
        }
        if (status === "revoked") {
            statusColor = "text-red-600"
            statusBg = "bg-red-100"
        }
        if (status === "hardcoded") {
            statusColor = "text-blue-600"
            statusBg = "bg-blue-100"
        }

        const handleEditNote = async () => {
            const currentNote = stats?.notes[k] || ""
            const newNote = prompt("Edit Note for " + k, currentNote)
            if (newNote !== null) {
                await updateKeyNote(k, newNote)
                loadAdminStats()
            }
        }

        return (
            <motion.div
                layout
                className="flex justify-between items-center p-4 bg-white modern-border rounded-sm hover:modern-shadow transition-all duration-200"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center gap-4">
                    <div className={`px-2 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest ${statusBg} ${statusColor}`}>
                        {status}
                    </div>

                    <span className={`font-mono text-sm min-w-[120px] text-[#1D1D1F] ${status === "revoked" ? "line-through opacity-50" : ""}`}>
                        {visible ? k : "••••••••••••"}
                    </span>

                    <button
                        onClick={() => status !== "hardcoded" && setVisible(!visible)}
                        className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm border border-[#E5E5E5] transition-colors ${status === "hardcoded"
                            ? "text-gray-300 cursor-not-allowed bg-gray-50"
                            : "text-gray-500 hover:text-black hover:bg-gray-50"
                            }`}
                        disabled={status === "hardcoded"}
                    >
                        {status === "hardcoded" ? "Hidden" : (visible ? "Hide" : "Show")}
                    </button>

                    {/* Note Display / Edit Trigger */}
                    <div onClick={handleEditNote} className="flex items-center cursor-pointer group ml-2 border-l border-[#E5E5E5] pl-4 hover:opacity-70 transition-opacity">
                        {stats?.notes[k] ? (
                            <span className="text-xs text-gray-500 italic">
                                {stats.notes[k]}
                            </span>
                        ) : (
                            <span className={`text-[10px] text-blue-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity ${isHovered ? 'opacity-100' : ''}`}>
                                + Add Note
                            </span>
                        )}
                    </div>
                </div>

                {status !== "revoked" && status !== "hardcoded" && (
                    <button onClick={() => handleRevoke(k)} className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-wider px-3 py-1 hover:bg-red-50 rounded-sm transition-colors">
                        Revoke
                    </button>
                )}
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center p-4 text-[#1D1D1F] font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-50 expressive-blur -z-10 opacity-60" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gray-100 expressive-blur -z-10 opacity-60" />

            <AnimatePresence mode="wait">
                {step === "login" && (
                    <motion.form
                        key="login"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleLogin}
                        className="w-full max-w-sm bg-white modern-border p-8 rounded-sm shadow-xl space-y-8"
                    >
                        <div className="text-center space-y-2">
                            <h1 className="text-sm font-bold tracking-[0.2em] text-[#1D1D1F] uppercase">Restricted Access</h1>
                            <p className="text-[11px] text-[#8E8E93] tracking-widest uppercase">Portfolio Admin Console</p>
                        </div>

                        <motion.div
                            className="w-full relative space-y-6"
                            animate={error ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setError(false)
                                    }}
                                    placeholder="Enter Authentication Key"
                                    className="w-full bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-blue-500 rounded-sm py-3 px-4 text-center text-lg tracking-[0.2em] focus:outline-none transition-all placeholder:text-gray-400 placeholder:tracking-normal placeholder:text-sm"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#1D1D1F] text-white py-3 text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all rounded-sm"
                            >
                                Authenticate
                            </button>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="text-center overflow-hidden pt-2"
                                    >
                                        <p className="text-[10px] text-red-500 tracking-widest uppercase font-bold flex items-center justify-center gap-2">
                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                            {errorMsg}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.form>
                )}

                {step === "admin" && stats && (
                    <motion.div
                        key="admin"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-3xl space-y-8"
                    >
                        <div className="bg-white modern-border p-6 rounded-sm shadow-sm flex justify-between items-center sticky top-4 z-10">
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-[#1D1D1F]">Admin Console</h1>
                                <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">Key Management System</p>
                            </div>
                            <button
                                onClick={() => setStep("login")}
                                className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Create Key Card */}
                            <div className="bg-white modern-border p-6 rounded-sm shadow-sm space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <h2 className="text-xs font-bold text-[#8E8E93] tracking-widest uppercase">Generate Access</h2>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        value={newKeyNote}
                                        onChange={(e) => setNewKeyNote(e.target.value)}
                                        placeholder="Recipient Note (Optional)..."
                                        className="bg-[#F5F5F7] border border-transparent focus:bg-white focus:border-gray-300 rounded-sm px-4 py-3 text-sm focus:outline-none transition-all w-full"
                                    />
                                    <button
                                        onClick={handleCreateKey}
                                        className="bg-[#1D1D1F] text-white px-4 py-3 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all rounded-sm w-full"
                                    >
                                        Create New Key
                                    </button>
                                </div>
                            </div>

                            {/* New Key Display */}
                            <div className="bg-[#F5F5F7] modern-border p-6 rounded-sm flex flex-col justify-center items-center text-center relative overflow-hidden group">
                                {newCreatedKey ? (
                                    <div className="space-y-2 relative z-10">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">New Key Generated</p>
                                        <p className="text-2xl font-mono font-bold text-blue-600 select-all cursor-copy">{newCreatedKey}</p>
                                        <p className="text-[10px] text-gray-400">Click to copy (built-in browser)</p>
                                    </div>
                                ) : (
                                    <div className="text-gray-400 space-y-2">
                                        <span className="block text-2xl opacity-20">• • • •</span>
                                        <p className="text-[10px] uppercase tracking-widest opacity-50">Waiting for generation</p>
                                    </div>
                                )}
                                {newCreatedKey && <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end px-2">
                                <h2 className="text-xs font-bold text-[#8E8E93] tracking-widest uppercase">Active Keys</h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] text-gray-400 font-medium">TOTAL: {stats.valid.length + stats.hardcoded.length}</span>
                                    <button onClick={loadAdminStats} className="text-[10px] text-blue-600 hover:text-blue-800 uppercase tracking-wider font-bold">Refresh</button>
                                </div>
                            </div>

                            <div className="space-y-2 pb-12">
                                {(() => {
                                    const allUniqueKeys = Array.from(new Set([
                                        ...stats.hardcoded,
                                        ...stats.valid,
                                        ...stats.used,
                                        ...stats.revoked
                                    ]))

                                    if (allUniqueKeys.length === 0) {
                                        return (
                                            <div className="text-center py-12 text-gray-400 text-sm">
                                                No keys found.
                                            </div>
                                        )
                                    }

                                    return allUniqueKeys.map(k => {
                                        let status: "valid" | "used" | "revoked" | "hardcoded" = "valid"

                                        if (stats.hardcoded.includes(k)) status = "hardcoded"
                                        else if (stats.revoked.includes(k)) status = "revoked"
                                        else if (stats.used.includes(k)) status = "used"
                                        else if (stats.valid.includes(k)) status = "valid"

                                        return { k, status }
                                    })
                                        .sort((a, b) => {
                                            const score = (s: string) => {
                                                if (s === "hardcoded") return 0
                                                if (s === "valid") return 1
                                                if (s === "used") return 2
                                                if (s === "revoked") return 3
                                                return 4
                                            }
                                            return score(a.status) - score(b.status)
                                        })
                                        .sort((a, b) => {
                                            if (a.status === b.status) return a.k.localeCompare(b.k)
                                            return 0
                                        })
                                        .map(({ k, status }) => (
                                            <KeyRow key={k} k={k} status={status as any} />
                                        ))
                                })()}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
