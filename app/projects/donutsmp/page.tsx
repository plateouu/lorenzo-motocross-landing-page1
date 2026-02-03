'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLenis } from '../../LenisProvider';
import SideMenu from '../../components/SideMenu';
import NoiseOverlay from '../../components/NoiseOverlay';
import TransitionLink from '../../components/TransitionLink';

// --- VISUALS (Brutalist / Skewed Style) ---

// 1. World Grid (Brutalist)
const WorldGridVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-[repeat(10,1fr)] gap-[2px] bg-white/10 p-[2px] aspect-square h-[60%]">
                {[...Array(100)].map((_, i) => (
                    <div key={i} className="bg-[#0F172A] border-[1px] border-white/5" />
                ))}
                {/* Highlight one Chunk */}
                <motion.div
                    className="absolute bg-[#ff4d00]"
                    style={{ width: '10%', height: '10%', top: '40%', left: '40%' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <div className="absolute bottom-6 bg-[#ff4d00] text-white px-3 py-1 transform -skew-x-12">
                <span className="block transform skew-x-12 font-mono font-bold text-[10px] uppercase tracking-widest">
                    Shard Vector: 50k
                </span>
            </div>
        </div>
    );
};

// 2. Anti-Dupe (Industrial Pipeline)
const AntiDupeVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="flex items-center gap-2">
                <div className="w-16 h-16 bg-[#221F21] flex items-center justify-center text-white font-mono text-xs">SRV A</div>
                <div className="w-24 h-2 bg-[#221F21] relative flex items-center">
                    <motion.div
                        className="w-4 h-4 bg-[#ff4d00] absolute transform rotate-45"
                        animate={{ x: [0, 80] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <div className="w-16 h-16 border-4 border-[#221F21] flex items-center justify-center text-[#221F21] font-mono text-xs">SRV B</div>
            </div>
            <div className="absolute bottom-12 bg-[#221F21] text-[#F4F3EC] px-4 py-1 transform -skew-x-12">
                <span className="block transform skew-x-12 font-display font-black italic uppercase text-xs tracking-widest">
                    Atomic Lock: Active
                </span>
            </div>
        </div>
    )
}

// 3. Economy Visual (Literal Sync)
const EconomyVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="mb-12 w-20 h-20 bg-[#ff4d00] flex items-center justify-center text-white font-black text-2xl transform rotate-3">
                DB
            </div>
            <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center text-[10px] text-white font-mono">
                            NODE {i}
                        </div>
                        <motion.div
                            className="w-1 h-4 bg-[#ff4d00]"
                            animate={{ scaleY: [1, 2, 1] }}
                            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute top-6 left-6 border-l-4 border-[#ff4d00] pl-4">
                <div className="text-white font-mono text-[10px] uppercase tracking-widest font-bold">Live Replication</div>
                <div className="text-white/40 font-mono text-[8px]">Latency: 0.8ms</div>
            </div>
        </div>
    )
}

export default function DonutSMPPage() {
    const lenis = useLenis()
    const { scrollY } = useScroll();

    // 1. Hero Fades out
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
    const heroPointerEvents = useTransform(scrollY, (y) => y > 500 ? 'none' : 'auto');

    // 2. Content Fades in
    const contentOpacity = useTransform(scrollY, [400, 700], [0, 1]);
    const contentY = useTransform(scrollY, [400, 700], [100, 0]);

    // Reusable Header Component
    const SectionHeader = ({ text }: { text: string }) => (
        <div className="bg-[#221F21] text-[#F4F3EC] px-4 py-2 transform -skew-x-12 inline-block mb-6">
            <span className="block transform skew-x-12 text-xs font-display font-black italic uppercase tracking-widest">
                {text}
            </span>
        </div>
    );

    return (
        <main className="relative w-full min-h-screen bg-[#F4F3EC] text-[#221F21] font-sans">
            <NoiseOverlay />
            <SideMenu />

            {/* FIXED HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-start px-6 py-6 mix-blend-difference text-white pointer-events-none">
                <div className="w-1/3 pointer-events-auto cursor-pointer">
                    <TransitionLink href="/" className="font-display italic text-2xl tracking-tighter hover:opacity-70 transition-opacity">Taylor Daan</TransitionLink>
                </div>
                <div className="w-1/3 flex justify-center pointer-events-none">
                    <span className="font-sans font-bold text-xs uppercase tracking-widest hidden md:block">Case Study • DonutSMP</span>
                </div>
                <div className="w-1/3 text-right pointer-events-auto"></div>
            </header>

            {/* FIXED HERO (Behind) */}
            <div className="fixed top-0 left-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-20 z-0 pointer-events-none text-center">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents as any }} className="flex flex-col items-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 mb-6 pointer-events-auto select-none">
                        <img src="/resume/donutsmp.png" alt="DonutSMP" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                    <div className="mb-6 bg-[#221F21] text-[#F4F3EC] px-6 py-2 transform -skew-x-12 inline-block">
                        <span className="block transform skew-x-12 text-sm font-display font-black italic uppercase tracking-widest">
                            High Scalability
                        </span>
                    </div>
                    <h1 className="text-[12vw] md:text-9xl leading-none font-sans font-black tracking-tighter text-[#221F21] mb-6">
                        DonutSMP
                    </h1>
                    <p className="text-xl md:text-2xl font-sans font-medium text-[#221F21]/60 tracking-tight max-w-2xl">
                        A persistent world simulation running on a $60,000/mo bare-metal fleet.
                    </p>
                </motion.div>
            </div>

            {/* SPACER (Force Scroll) */}
            <div className="h-[100vh] w-full invisible pointer-events-none"></div>

            {/* SCROLLING CARD CONTENT (Z-10) */}
            <div className="relative w-full z-10 px-4 md:px-20 pb-40">
                <motion.div style={{ opacity: contentOpacity, y: contentY }} className="space-y-10 md:space-y-20 max-w-7xl mx-auto">

                    {/* 1. INFRASTRUCTURE */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="01. The Scale" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">
                                    $60,000/mo.<br />Infrastructure.
                                </h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">
                                    To the players, DonutSMP is a single, uninterrupted continent. They walk from spawn to the world border without ever seeing a loading screen.
                                </p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">
                                    This is an expensive illusion. We maintain a cluster of <span className="text-[#221F21] font-bold">330 dedicated machines</span>. Each machine is responsible for a strict 50,000-block square of the map.
                                </p>
                            </div>
                            <div>
                                <WorldGridVisual />
                            </div>
                        </div>
                    </section>

                    {/* 2. ANTI-DUPE */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <AntiDupeVisual />
                            </div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="02. No Dupes" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">
                                    Atomic Transfers.
                                </h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">
                                    When a player moves from one server to another, the biggest risk is Item Duplication. If the network lags, they could exist on both servers at once.
                                </p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">
                                    I implemented a strict "Atomic Lock" system. The player's data is locked on Server A before it is sent to Server B. If anything fails, the transaction rolls back instantly. Zero dupes.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 3. ECONOMY */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="03. Economy" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">
                                    Global Sync.
                                </h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">
                                    Money needs to be accessible from anywhere. We use Redis to create a unified economy layer that hovers above the 330 game servers.
                                </p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">
                                    Whether a player is mining in the northeast corner or trading in the southwest, their balance updates in real-time. We also use this layer for live chat translation, allowing seamless communication.
                                </p>
                            </div>
                            <div>
                                <EconomyVisual />
                            </div>
                        </div>
                    </section>

                    {/* FOOTER */}
                    <div className="bg-[#221F21] text-[#F4F3EC] p-12 md:p-24 rounded-[3rem] text-center">
                        <h2 className="text-[8vw] font-display italic leading-none mb-10">
                            Scale.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">$60k</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Monthly Cost</div>
                            </div>
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">&lt;1ms</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Redis Latency</div>
                            </div>
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">50k</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Shard Radius</div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </main>
    )
}
