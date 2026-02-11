"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, HelpCircle, AlertOctagon } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// ──────────────────────────────────────────────────────────
// DATA (SIMPLE)
// ──────────────────────────────────────────────────────────

// The precise "Long Tail" problem: 1% get 99% of views.
const DATA_DISTRIBUTION = Array.from({ length: 100 }, (_, i) => ({
    rank: i,
    views: i < 5 ? 100 - i * 10 : 2, // Huge spike at start, flatline for rest
    label: i === 0 ? "Viral" : "Invisible"
}))

// ──────────────────────────────────────────────────────────
// COMPONENTS
// ──────────────────────────────────────────────────────────

export default function MinimalProposalPage() {
    const [current, setCurrent] = React.useState(0)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, [])

    // 4 Essential Slides
    const SLIDES = [
        { id: "title", label: "Topic" },
        { id: "context", label: "The Problem (Data)" },
        { id: "challenges", label: "Challenges" },
        { id: "questions", label: "Core Questions" },
    ]

    const next = React.useCallback(() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1)), [SLIDES.length])
    const prev = React.useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

    React.useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (["ArrowRight", "Space", "PageDown"].includes(e.code)) next()
            if (["ArrowLeft", "PageUp"].includes(e.code)) prev()
        }
        window.addEventListener("keydown", h)
        return () => window.removeEventListener("keydown", h)
    }, [next, prev])

    if (!mounted) return null

    return (
        <div className="bg-neutral-900 min-h-screen text-white font-sans selection:bg-blue-500/30">

            {/* Click Area */}
            <div
                onClick={next}
                onContextMenu={(e) => { e.preventDefault(); prev() }}
                className="relative w-full h-screen flex items-center justify-center p-8 md:p-20 cursor-pointer"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-5xl"
                    >
                        <SlideContent id={SLIDES[current].id} />
                    </motion.div>
                </AnimatePresence>

                {/* Simple Progress */}
                <div className="absolute bottom-8 left-8 right-8 flex justify-between text-sm text-neutral-500 font-medium">
                    <span>{SLIDES[current].label}</span>
                    <span>{current + 1} / {SLIDES.length}</span>
                </div>
            </div>
        </div>
    )
}

function SlideContent({ id }: { id: string }) {
    switch (id) {
        case "title":
            return (
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Algorithmic Gatekeeping<br />
                        <span className="text-neutral-500">& The Right to Be Seen</span>
                    </h1>
                </div>
            )

        case "context":
            return (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <BarChart3 className="text-blue-500" />
                            The Context
                        </h2>
                        <p className="text-lg text-neutral-300 leading-relaxed">
                            My friend created high-quality content but got zero views. Why?
                        </p>
                        <p className="text-lg text-neutral-300 leading-relaxed">
                            Because platforms follow a <strong>Power Law Distribution</strong>.
                            The algorithm picks a tiny "viral" elite (Top 1%) and hides the rest.
                        </p>
                    </div>
                    <div className="h-[400px] w-full bg-white/5 rounded-xl border border-white/10 p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA_DISTRIBUTION}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis hide />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '8px' }}
                                    labelFormatter={() => ''}
                                    formatter={(val: number, name: string, props: any) => [val > 50 ? "Millions of Views" : "Zero Views", "Visibility"]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fill="#3b82f6"
                                    fillOpacity={0.2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                        <p className="text-center text-xs text-neutral-500 mt-4">FIG 1. THE "LONG TAIL" OF INVISIBILITY</p>
                    </div>
                </div>
            )

        case "challenges":
            return (
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <AlertOctagon className="text-red-500" />
                        Challenges Included
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <h3 className="text-xl font-semibold mb-2 text-white">The Black Box</h3>
                            <p className="text-neutral-400">
                                Platforms like TikTok and YouTube do not publish their code.
                                Creators see the failure result, but the cause remains hidden.
                            </p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                            <h3 className="text-xl font-semibold mb-2 text-white">Defining "Fairness"</h3>
                            <p className="text-neutral-400">
                                Is a "Right to be Seen" even practical?
                                Arguing that private companies <em>owe</em> us attention is a complex legal/ethical claim.
                            </p>
                        </div>
                    </div>
                </div>
            )

        case "questions":
            return (
                <div className="space-y-10">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <HelpCircle className="text-yellow-500" />
                        Feedback Needed
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-6 items-start">
                            <span className="text-2xl font-mono text-neutral-600 font-bold">01</span>
                            <p className="text-2xl font-medium text-white">
                                Is my Research Question too broad? (Should I narrow it to just TikTok?)
                            </p>
                        </div>
                        <div className="flex gap-6 items-start">
                            <span className="text-2xl font-mono text-neutral-600 font-bold">02</span>
                            <p className="text-2xl font-medium text-white">
                                Is the "Right to be Seen" a strong enough argument?
                            </p>
                        </div>
                        <div className="flex gap-6 items-start">
                            <span className="text-2xl font-mono text-neutral-600 font-bold">03</span>
                            <p className="text-2xl font-medium text-white">
                                Should I pivot to a different topic entirely?
                            </p>
                        </div>
                    </div>
                </div>
            )

        default: return null
    }
}
