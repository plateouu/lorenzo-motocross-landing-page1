'use client'

import { useEffect, useState, useRef } from 'react'
import QuantumGraph from './components/QuantumGraph'
import DataNetwork from './components/DataNetwork'

export default function Page() {
    return (
        <main className="bg-black text-white relative">
            <style jsx global>{`
                ::-webkit-scrollbar {
                    display: none;
                }
                body {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Section 1: Intro */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black z-10">
                <div className="text-center px-6 mix-blend-difference">
                    <h1 className="text-white font-serif text-5xl md:text-9xl leading-tight opacity-95 mb-6 tracking-tighter">
                        Taylor Daan
                    </h1>
                    <p className="text-zinc-500 font-sans uppercase tracking-[0.5em] text-sm">
                        Portfolio
                    </p>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse">
                        <span className="text-xs uppercase tracking-widest text-zinc-600">Explore the System</span>
                    </div>
                </div>
            </div>

            {/* Section 2: Chaos (Quantum) */}
            <div className="sticky top-0 h-screen w-full bg-black z-20 flex items-center justify-center overflow-hidden">
                <QuantumGraph />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
                <div className="relative z-10 max-w-4xl px-10 text-center pointer-events-none">
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-800">
                        Complexity & Chaos
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                        Navigating the entropy of modern systems. Building structure from the noise.
                    </p>
                </div>
            </div>

            {/* Section 3: Order (Data) */}
            <div className="sticky top-0 h-screen w-full bg-black z-30 flex items-center justify-center overflow-hidden">
                <DataNetwork />
                <div className="absolute inset-0 bg-black/80" /> {/* Darken for text readability */}
                <div className="relative z-10 max-w-4xl px-10 text-center pointer-events-none">
                    <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white">
                        Structured Data
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                        Architecting scalable solutions. Transforming raw information into meaningful interactions.
                    </p>
                </div>
            </div>

            {/* Section 4: The Work (Story) */}
            <div className="relative z-40 bg-black min-h-screen py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-6xl md:text-9xl font-serif text-zinc-800 mb-32 text-center sticky top-10">
                        Selected Works
                    </h2>

                    {/* Project 1 */}
                    <div className="min-h-screen flex items-center justify-center sticky top-0 bg-black/50 backdrop-blur-sm border-t border-zinc-900">
                        <div className="text-center">
                            <h3 className="text-5xl md:text-8xl font-bold text-white mb-4">PlateouMC</h3>
                            <p className="text-zinc-500 text-xl max-w-2xl mx-auto">
                                A next-generation Minecraft server infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="min-h-screen flex items-center justify-center sticky top-0 bg-zinc-950/80 backdrop-blur-sm border-t border-zinc-900">
                        <div className="text-center">
                            <h3 className="text-5xl md:text-8xl font-bold text-white mb-4">Roblox</h3>
                            <p className="text-zinc-500 text-xl max-w-2xl mx-auto">
                                Immersive experiences played by millions.
                            </p>
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className="min-h-screen flex items-center justify-center sticky top-0 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800">
                        <div className="text-center">
                            <h3 className="text-5xl md:text-8xl font-bold text-white mb-4">DonutSMP</h3>
                            <p className="text-zinc-500 text-xl max-w-2xl mx-auto">
                                Community-driven survival multiplayer ecosystem.
                            </p>
                        </div>
                    </div>
                    <div className="h-[50vh] bg-black"></div>
                </div>
            </div>
        </main>
    )
}
