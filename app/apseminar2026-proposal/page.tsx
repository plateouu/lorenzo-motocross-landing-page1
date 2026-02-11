"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProposalPage() {
    const [current, setCurrent] = React.useState(0)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, [])

    const SLIDES = [
        { id: "gap", label: "THE GAP" },
        { id: "goal", label: "THE GOAL" },
        { id: "question", label: "THE RQ" },
        { id: "significance", label: "WHY IT MATTERS" },
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
        <div
            className="min-h-screen w-full bg-white text-black flex flex-col items-center justify-center overflow-hidden selection:bg-yellow-200"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
            onClick={next}
            onContextMenu={(e) => { e.preventDefault(); prev() }}
        >
            <div className="w-full max-w-4xl p-12 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {SLIDES[current].id === "gap" && (
                            <div className="space-y-8">
                                <h1 className="text-6xl font-bold uppercase tracking-widest border-b-4 border-black pb-4 inline-block">The Blind Spot</h1>
                                <p className="text-4xl leading-snug">
                                    We study the <span className="text-red-600 bg-yellow-100 px-2 line-through decoration-black">1%</span> who go viral.
                                    <br /><br />
                                    We ignore the <span className="text-blue-600 bg-yellow-100 px-2 underline decoration-wavy decoration-blue-400">99%</span> who are invisible.
                                </p>
                            </div>
                        )}

                        {SLIDES[current].id === "goal" && (
                            <div className="space-y-8">
                                <h1 className="text-6xl font-bold uppercase tracking-widest border-b-4 border-black pb-4 inline-block">The Goal</h1>
                                <p className="text-5xl leading-relaxed font-bold">
                                    Quantify the Silence.
                                </p>
                                <p className="text-3xl text-gray-600 pt-8">
                                    Measuring the psychological toll of receiving zero engagement.
                                </p>
                            </div>
                        )}

                        {SLIDES[current].id === "question" && (
                            <div className="space-y-8">
                                <h1 className="text-6xl font-bold uppercase tracking-widest border-b-4 border-black pb-4 inline-block">The Question</h1>
                                <div className="border-4 border-black p-8 bg-gray-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
                                    <p className="text-4xl font-bold leading-relaxed">
                                        "To what extent does a lack of digital feedback impact adolescent self-worth?"
                                    </p>
                                </div>
                            </div>
                        )}

                        {SLIDES[current].id === "significance" && (
                            <div className="space-y-12 text-left w-full max-w-2xl mx-auto">
                                <h1 className="text-6xl font-bold uppercase tracking-widest border-b-4 border-black pb-4 w-full text-center">Significance</h1>
                                <ul className="text-3xl space-y-8 list-none pl-4">
                                    <li className="flex items-start gap-4">
                                        <span className="text-4xl">👉</span>
                                        <span>Moves beyond just "Cyberbullying".</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-4xl">👉</span>
                                        <span>Focuses on the <strong>silent majority</strong>.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-4xl">👉</span>
                                        <span>Helps schools support isolated students.</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="fixed bottom-8 text-xl font-bold text-gray-400">
                {SLIDES[current].label} ({current + 1}/{SLIDES.length})
            </div>
        </div>
    )
}
