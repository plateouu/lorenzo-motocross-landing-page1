'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLenis } from '../../LenisProvider';
import SideMenu from '../../components/SideMenu';
import NoiseOverlay from '../../components/NoiseOverlay';
import TransitionLink from '../../components/TransitionLink';

// --- VISUALS (Brutalist / Skewed Style) ---

// 1. Universal Translation
const TranslationVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex items-center justify-center p-8 relative overflow-hidden">

            <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
                {/* Input */}
                <div className="relative group">
                    <div className="bg-[#221F21] text-white px-6 py-4 transform -skew-x-12 z-10 relative">
                        <span className="block transform skew-x-12 font-mono font-bold">"Hello"</span>
                    </div>
                    <div className="absolute -top-4 left-0 text-[10px] uppercase font-bold tracking-widest text-[#221F21]/50">Input</div>
                </div>

                {/* Arrow */}
                <div className="w-16 h-[4px] bg-[#221F21] relative flex items-center justify-center mx-4">
                    <div className="w-4 h-4 bg-[#ff4d00] transform rotate-45" />
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-2">
                    {["Hola", "你好", "Bonjour"].map((text, i) => (
                        <div key={i} className="bg-[#ff4d00] text-white px-4 py-2 transform -skew-x-12">
                            <span className="block transform skew-x-12 font-mono font-bold text-sm">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-6 font-mono text-[10px] text-[#221F21]/30 uppercase tracking-widest">Locale Service</div>
        </div>
    );
};

// 2. The Core (Terminal List)
const CoreVisual = () => {
    const services = [
        "GracePeriodService", "TpaService", "VanishService", "TokenService",
        "SpawnService", "PrivateMessageService", "IgnoreService",
        "PunishmentService", "EconomyService", "RedisManager"
    ];

    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] p-8 flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-xs border-2 border-white/20 bg-black/50 p-4 font-mono text-xs">
                <div className="border-b border-white/20 pb-2 mb-2 text-[#ff4d00] uppercase font-bold">Service Registry</div>
                <div className="flex flex-col gap-1 text-white/70">
                    {services.slice(0, 6).map((service, i) => (
                        <div key={i} className="flex justify-between">
                            <span>{service}</span>
                            <span className="text-green-500">[OK]</span>
                        </div>
                    ))}
                    <div className="text-white/30">...</div>
                </div>
            </div>
        </div>
    )
}

// 3. Global State (Blocky Nodes)
const GlobalVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="mb-8 w-20 h-20 bg-[#221F21] flex items-center justify-center text-white font-bold shadow-xl z-10 transform -skew-x-6">
                <span className="transform skew-x-6">REDIS</span>
            </div>
            <div className="flex gap-8 z-10">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-[2px] h-8 bg-[#221F21]" />
                        <div className="w-12 h-12 bg-[#ff4d00] flex items-center justify-center text-white text-xs font-bold transform -skew-x-6">
                            <span className="transform skew-x-6">S{i}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// 4. Combat (Health Bar)
const CombatVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="w-full max-w-xs">
                <div className="flex justify-between text-white text-xs font-bold mb-1 font-mono uppercase">
                    <span>Player Health</span>
                    <span className="text-[#ff4d00]">LIFESTEAL ACTIVE</span>
                </div>
                <div className="w-full h-8 bg-black/50 border-2 border-white/20 relative">
                    <motion.div
                        className="h-full bg-red-600"
                        animate={{ width: ["100%", "20%", "40%", "10%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                    />
                </div>
                <div className="flex justify-between text-white/50 text-[10px] mt-2 font-mono">
                    <span>20.0 HP</span>
                    <span>+1.5 HP/Hit</span>
                </div>
            </div>
        </div>
    )
}

// 5. Nametags (Blocky)
const NametagVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="flex flex-col items-center">
                <div className="bg-[#221F21] text-white text-xs px-3 py-1 mb-2 font-mono font-bold flex gap-2 items-center transform -skew-x-12">
                    <span className="text-[#ff4d00] transform skew-x-12">[ADMIN]</span>
                    <span className="transform skew-x-12">DevUser</span>
                </div>
                <div className="w-16 h-16 bg-gray-300 border-4 border-[#221F21]" />
                <div className="w-24 h-12 bg-gray-300 border-4 border-[#221F21] -mt-1" />
            </div>
        </div>
    )
}

// 6. Scoreboard (Terminal)
const ScoreboardVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="bg-[#221F21] p-4 min-w-[200px] border-l-4 border-[#ff4d00]">
                <div className="text-[#ff4d00] font-black uppercase tracking-tighter mb-4 text-xl">PlateouMC</div>
                <div className="font-mono text-white text-xs space-y-2">
                    <div className="flex justify-between"><span>Kills</span><span>1,402</span></div>
                    <div className="flex justify-between"><span>Deaths</span><span>12</span></div>
                    <div className="flex justify-between"><span>Streak</span><span className="text-green-500">45</span></div>
                </div>
            </div>
        </div>
    )
}

// 7. Economy (Bar Chart)
const EconomyVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex items-end justify-center gap-2 p-16 relative overflow-hidden">
            {[40, 70, 30, 90, 50].map((h, i) => (
                <div key={i} className="w-12 bg-[#221F21] relative group hover:bg-[#ff4d00] transition-colors" style={{ height: `${h}%` }}>
                    <div className="absolute -top-6 w-full text-center text-xs font-bold font-mono">{h}k</div>
                </div>
            ))}
            <div className="absolute bottom-6 font-mono text-[10px] text-[#221F21]/30 uppercase tracking-widest">Global Supply</div>
        </div>
    )
}

// 8. Safety (Shield)
const SafetyVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="w-32 h-40 border-4 border-white flex items-center justify-center relative">
                <div className="absolute inset-2 border-2 border-[#ff4d00] flex items-center justify-center">
                    <span className="text-[#ff4d00] font-black text-4xl">!</span>
                </div>
            </div>
            <div className="absolute bottom-6 text-[#ff4d00] font-mono text-xs uppercase tracking-widest">Access Denied</div>
        </div>
    )
}

// 9. Staff (Vanish)
const StaffVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-[#221F21] flex items-center justify-center text-white text-2xl font-bold">P1</div>
                {/* Dashed Line */}
                <div className="w-20 h-0 border-t-4 border-dashed border-gray-300" />
                <div className="w-20 h-20 border-4 border-[#221F21] flex items-center justify-center text-[#221F21] text-2xl font-bold opacity-20">
                    ?
                </div>
            </div>
        </div>
    )
}

// 10. Tpa
const TpaVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] flex items-center justify-center p-8 relative overflow-hidden">
            <div className="flex items-center gap-0">
                <div className="bg-white text-black p-4 font-bold font-mono">A</div>
                <div className="w-32 h-16 bg-[#221F21] flex items-center justify-center">
                    <motion.div
                        className="w-4 h-4 bg-[#ff4d00]"
                        animate={{ x: [-50, 50] }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                    />
                </div>
                <div className="bg-white text-black p-4 font-bold font-mono">B</div>
            </div>
        </div>
    )
}


// 11. YouTube Visual
const YouTubeVisual = () => {
    return (
        <div className="w-full h-[300px] md:h-[400px] bg-[#000] p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ff0000_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    className="w-20 h-20 bg-red-600 flex items-center justify-center mb-6 transform hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                >
                    <svg className="w-10 h-10 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                </motion.div>

                <div className="text-center">
                    <div className="text-white font-black text-4xl md:text-6xl tracking-tighter mb-2 italic">1M+ VIEWS</div>
                    <div className="text-red-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">Total Network Reach</div>
                </div>
            </div>

            {/* Floating Video Tags */}
        </div>
    )
}

export default function PlateouMCPage() {
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
                    <span className="font-sans font-bold text-xs uppercase tracking-widest hidden md:block">Case Study • PlateouMC</span>
                </div>
                <div className="w-1/3 text-right pointer-events-auto"></div>
            </header>

            {/* FIXED HERO (Behind) */}
            <div className="fixed top-0 left-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-20 z-0 pointer-events-none text-center">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents as any }} className="flex flex-col items-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 mb-12 pointer-events-auto select-none">
                        <img src="/logo.webp" alt="PlateouMC" className="w-full h-full object-contain" />
                    </div>

                    <div className="mb-6 bg-[#221F21] text-white px-4 py-2 transform -skew-x-12 pointer-events-auto">
                        <span className="block transform skew-x-12 text-xs font-mono uppercase tracking-widest font-bold italic">In Development</span>
                    </div>

                    <h1 className="text-[12vw] md:text-9xl leading-none font-sans font-black tracking-tighter text-[#221F21] mb-6">
                        PlateouMC
                    </h1>
                    <p className="text-xl md:text-2xl font-sans font-medium text-[#221F21]/60 tracking-tight max-w-2xl">
                        A custom-built Minecraft network engine focused on performance and economy stability.
                    </p>
                </motion.div>
            </div>

            {/* SPACER (Force Scroll) */}
            <div className="h-[100vh] w-full invisible pointer-events-none"></div>

            {/* SCROLLING CARD CONTENT (Z-10) */}
            <div className="relative w-full z-10 px-4 md:px-20 pb-40">
                <motion.div style={{ opacity: contentOpacity, y: contentY }} className="space-y-10 md:space-y-20 max-w-7xl mx-auto">

                    {/* 1. THE GOAL */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="01. The Goal" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Translation first.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">Built to solve the language barrier in global gaming. PlateouMC automatically translates every message in real-time between 12+ languages.</p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">No more broken English. Every player speaks their native tongue; the network handles the rest.</p>
                            </div>
                            <div><TranslationVisual /></div>
                        </div>
                    </section>

                    {/* 2. CORE */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1"><CoreVisual /></div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="02. Engine" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Service Based.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">Moving away from monolithic plugins. We built a micro-service architecture where every functionality (Economy, Chat, Combat) is a decoupled service.</p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">This allows for hot-reloading sub-systems without taking the entire network offline.</p>
                            </div>
                        </div>
                    </section>

                    {/* 3. SYNC */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="03. Scale" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Global State.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">Utilizing Redis as a central source of truth, ensuring that player data (Balance, Rank, Position) is synchronized across the entire cluster in &lt;5ms.</p>
                            </div>
                            <div><GlobalVisual /></div>
                        </div>
                    </section>

                    {/* 4. COMBAT */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1"><CombatVisual /></div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="04. Combat" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Lifesteal.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">A mathematical combat system where every heart lost by an opponent is gained by the attacker, managed by a high-frequency event processor.</p>
                            </div>
                        </div>
                    </section>

                    {/* 5. NAMETAG */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="05. Identity" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Visual Tags.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">Dynamic nametag rendering that injects health bars and status effects directly into the player's view using entity metadata packets.</p>
                            </div>
                            <div><NametagVisual /></div>
                        </div>
                    </section>

                    {/* 6. SCOREBOARD */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1"><ScoreboardVisual /></div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="06. HUD" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Real-time Stats.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">A flicker-free scoreboard system that updates with local server data and global network stats simultaneously.</p>
                            </div>
                        </div>
                    </section>

                    {/* 7. ECONOMY */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="07. Wealth" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Vault Engine.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">A transactional economy API that prevents race conditions and ensures balance integrity across multiple server instances.</p>
                            </div>
                            <div><EconomyVisual /></div>
                        </div>
                    </section>

                    {/* 8. SAFETY */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1"><SafetyVisual /></div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="08. Security" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Threat Map.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">Custom anti-VPN and anti-exploit layers that filter incoming connections before they ever reach the game server.</p>
                            </div>
                        </div>
                    </section>

                    {/* 9. STAFF */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="09. Stealth" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Vanish Hub.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">The VanishService completely erases a staff member's presence from the network, including tab lists and query packets, ensuring undetected observation.</p>
                            </div>
                            <div><StaffVisual /></div>
                        </div>
                    </section>

                    {/* 10. TELEPORT */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1"><TpaVisual /></div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="10. Travel" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Request System.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">We implemented a safe TpaService that handles timeouts, movement cancellation, and cross-dimension warping with strict safety checks.</p>
                            </div>
                        </div>
                    </section>

                    {/* 11. YOUTUBE Content */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="11. Impact" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Content & Reach.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">
                                    The network's success is driven by high-impact content. My YouTube channel, <a href="https://www.youtube.com/@plateouu" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-red-600 transition-colors">@plateouu</a>, showcases the platform to a massive audience.
                                </p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">
                                    With over <span className="font-bold text-red-600">1 Million total views</span> across the network's lifecycle, the community continues to grow.
                                </p>
                            </div>
                            <div><YouTubeVisual /></div>
                        </div>
                    </section>

                    {/* FOOTER */}
                    <div className="bg-[#221F21] text-[#F4F3EC] p-12 md:p-24 rounded-[3rem] text-center">
                        <h2 className="text-[8vw] font-display italic leading-none mb-10">
                            Universal.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">10</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Core Modules</div>
                            </div>
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">Realtime</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Translation</div>
                            </div>
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">Global</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">State Sync</div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </main>
    )
}
