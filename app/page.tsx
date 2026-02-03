'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import QuantumGraph from './components/QuantumGraph'
import DataNetwork from './components/DataNetwork'

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    const stagger = {
        visible: { transition: { staggerChildren: 0.2 } }
    }

    return (
        <main ref={containerRef} className="bg-black text-white relative font-sans selection:bg-white selection:text-black">
            <style jsx global>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* BACKGROUND LAYER - STICKY */}
            <div className="fixed inset-0 z-0">
                {/* Chaos / Discovery Phase Background */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]) }} // Fade out after Chapter 2
                    className="absolute inset-0"
                >
                    <QuantumGraph />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                </motion.div>

                {/* Structure / Scaling Phase Background */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]) }} // Fade in for Chapter 3
                    className="absolute inset-0"
                >
                    <DataNetwork />
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>
            </div>

            {/* CONTENT LAYER - SCROLLABLE */}
            <div className="relative z-10 w-full">

                {/* INTRO: The Spark */}
                <section className="h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                        className="text-center"
                    >
                        <motion.h1 variants={fadeUp} className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-difference">
                            Taylor Daan
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-zinc-400 uppercase tracking-[0.4em] text-sm md:text-base">
                            The Builder's Narrative
                        </motion.p>
                    </motion.div>
                </section>

                {/* CHAPTER 1: Discovery */}
                <section className="h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-2xl"
                    >
                        <motion.span variants={fadeUp} className="block text-blue-500 font-mono text-xs mb-4 tracking-widest">CHAPTER 01</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            It started with <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Discovery.</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
                            I stumbled upon a world where play met creation. It wasn't just a game; it was an engine. I realized that the pixels on the screen were malleable, waiting for a command.
                        </motion.p>
                    </motion.div>
                </section>

                {/* CHAPTER 2: Creation */}
                <section className="h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-2xl text-right ml-auto" // Aligned right for variety
                    >
                        <motion.span variants={fadeUp} className="block text-purple-500 font-mono text-xs mb-4 tracking-widest">CHAPTER 02</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            Then came <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Creation.</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-zinc-400 leading-relaxed">
                            I stopped playing and started building. I dove into the code, crafting my own worlds in Roblox examples like <span className="text-white">Isle</span> and <span className="text-white">Tower Defense</span>. Millions of players began to inhabit the spaces I designed.
                        </motion.p>
                    </motion.div>
                </section>

                {/* CHAPTER 3: Scaling */}
                <section className="h-screen flex items-center justify-center px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={stagger}
                        className="max-w-3xl text-center"
                    >
                        <motion.span variants={fadeUp} className="block text-green-500 font-mono text-xs mb-4 tracking-widest">CHAPTER 03</motion.span>
                        <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            Now, I <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Scale.</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-xl md:text-3xl text-zinc-300 leading-relaxed mb-12">
                            Infrastructure. Ecosystems. Economies.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <motion.div variants={fadeUp} className="p-8 border border-zinc-800 bg-black/50 backdrop-blur-md rounded-xl hover:border-zinc-600 transition-colors">
                                <h3 className="text-2xl font-bold mb-2">PlateouMC</h3>
                                <p className="text-zinc-500">Next-gen server infrastructure redefining performance standards.</p>
                            </motion.div>
                            <motion.div variants={fadeUp} className="p-8 border border-zinc-800 bg-black/50 backdrop-blur-md rounded-xl hover:border-zinc-600 transition-colors">
                                <h3 className="text-2xl font-bold mb-2">DonutSMP</h3>
                                <p className="text-zinc-500">A massive community-driven survival ecosystem managed at scale.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                <div className="h-[20vh]" /> {/* Spacer */}
            </div>
        </main>
    )
}
