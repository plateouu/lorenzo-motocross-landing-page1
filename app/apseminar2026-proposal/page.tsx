"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, HelpCircle, AlertOctagon, MousePointer2 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// ──────────────────────────────────────────────────────────
// DATA (The "Long Tail")
// ──────────────────────────────────────────────────────────
const DATA_DISTRIBUTION = Array.from({ length: 80 }, (_, i) => ({
    rank: i,
    views: i < 3 ? 100 - i * 15 : 2 + Math.random(),
    label: i === 0 ? "Viral" : "Invisible"
}))

// ──────────────────────────────────────────────────────────
// COMPONENTS
// ──────────────────────────────────────────────────────────

export default function KineticProposalPage() {
    const [current, setCurrent] = React.useState(0)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, [])

    const SLIDES = [
        { id: "title", label: "INTRO" },
        { id: "context", label: "THE DATA" },
        { id: "challenges", label: "THE PROBLEM" },
        { id: "questions", label: "FEEDBACK" },
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
        <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden selection:bg-white selection:text-black">

            {/* Subtle Spotlight Background */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_transparent_70%)]" />

            {/* Main Click Area */}
            <div
                onClick={next}
                onContextMenu={(e) => { e.preventDefault(); prev() }}
                className="relative z-10 w-full h-screen flex flex-col justify-center p-8 md:p-16 cursor-pointer"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                        exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <SlideContent id={SLIDES[current].id} />
                    </motion.div>
                </AnimatePresence>

                {/* Minimal Progress Indicator */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 md:px-16 text-[10px] items-end uppercase tracking-[0.2em] text-neutral-600 font-bold">
                    <span>{SLIDES[current].label}</span>
                    <div className="flex gap-2">
                        {SLIDES.map((_, i) => (
                            <div key={i} className={`h-1 w-1 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-150' : 'bg-neutral-800'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SlideContent({ id }: { id: string }) {
    switch (id) {
        case "title":
            return (
                <div className="w-full max-w-6xl">
                    <motion.h1
                        className="text-[8vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter mix-blend-difference"
                        initial="hidden" animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {["ALGORITHMIC", "GATEKEEPING"].map((word, i) => (
                            <motion.div key={i} variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>
                                {word}
                            </motion.div>
                        ))}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-8 border-l-2 border-white pl-6"
                    >
                        <p className="text-xl md:text-3xl font-light text-neutral-400">The Right to Be Seen</p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-6 text-sm md:text-lg text-neutral-500 max-w-2xl font-mono"
                        >
                            RQ: To what extent do social media algorithms perpetuate inequality by rendering the majority of content invisible?
                        </motion.p>
                    </motion.div>
                </div>
            )

        case "context":
            return (
                <div className="w-full max-w-7xl grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <span className="text-xs font-bold text-neutral-500 tracking-widest uppercase mb-2 block">The Data</span>
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight">THE <span className="text-white bg-neutral-800 px-2 italic">99%</span> PROBLEM</h2>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="text-xl text-neutral-400 leading-relaxed max-w-md"
                        >
                            My friend did everything right. Quality content. Consistency. <strong>Zero Views.</strong> Because the algorithm s a cliff.
                        </motion.p>
                    </div>

                    {/* Dynamic Graph */}
                    <div className="h-[50vh] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA_DISTRIBUTION}>
                                <defs>
                                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fff" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#fff"
                                    strokeWidth={3}
                                    fill="url(#g1)"
                                    isAnimationActive={true}
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>

                        {/* Overlay Annotations */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5, type: "spring" }}
                            className="absolute top-0 left-0 bg-white text-black text-xs font-bold px-3 py-1 rounded-full"
                        >
                            VIRAL (1%)
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                            className="absolute bottom-10 right-10 text-neutral-500 text-right text-xs font-mono"
                        >
                            THE LONG TAIL<br />(INVISIBLE)
                        </motion.div>
                    </div>
                </div>
            )

        case "challenges":
            return (
                <div className="w-full max-w-5xl">
                    <motion.h2
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-xs font-bold text-neutral-500 tracking-widest uppercase mb-12"
                    >
                        The Obstacles
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card
                            delay={0.2}
                            icon={<AlertOctagon size={40} />}
                            title="The Black Box"
                            text="Platforms hide the logic. We see the output (failure) but never the code (the 'why')."
                        />
                        <Card
                            delay={0.4}
                            icon={<HelpCircle size={40} />}
                            title="Defining Fairness"
                            text="Do private companies owe us visibility? Or is attention just a product they own?"
                        />
                    </div>
                </div>
            )

        case "questions":
            return (
                <div className="w-full max-w-4xl space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-16"
                    >
                        RESEARCH QUESTIONS
                    </motion.h2>

                    <Question delay={0.2} num="01" text="How do 'black box' algorithms impact the economic viability of independent creators?" />
                    <Question delay={0.4} num="02" text="To what extent does the 'power law' of attention violate principles of digital equity?" />
                    <Question delay={0.6} num="03" text="Can algorithmic transparency regulation effectively mitigate gatekeeping?" />
                </div>
            )

        default: return null
    }
}

function Card({ icon, title, text, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6 }}
            className="group bg-neutral-900/50 border border-white/10 p-8 hover:border-white/30 transition-colors"
        >
            <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors">{text}</p>
        </motion.div>
    )
}

function Question({ num, text, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, ease: "circOut" }}
            className="flex items-center gap-8 group cursor-pointer"
        >
            <span className="text-xl font-mono text-neutral-700 font-bold group-hover:text-white transition-colors">{num}</span>
            <p className="text-2xl md:text-4xl font-bold text-neutral-400 group-hover:text-white transition-colors leading-tight">
                {text}
            </p>
        </motion.div>
    )
}
