'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLenis } from '../../LenisProvider';
import SideMenu from '../../components/SideMenu';
import NoiseOverlay from '../../components/NoiseOverlay';
import TransitionLink from '../../components/TransitionLink';

// --- VISUALS ---

const MM3Visual = () => (
    <div className="w-full h-[300px] md:h-[400px] bg-[#221F21] flex items-center justify-center p-8 relative overflow-hidden group">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="relative z-10 text-center">
            <motion.div
                className="text-white font-black text-6xl md:text-8xl tracking-tighter italic mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                250M+
            </motion.div>
            <div className="bg-[#ff4d00] text-white px-4 py-1 transform -skew-x-12 inline-block">
                <span className="block transform skew-x-12 font-mono font-bold text-xs uppercase tracking-widest">Total Plays</span>
            </div>
        </div>
    </div>
);

const RevenueVisual = () => (
    <div className="w-full h-[300px] md:h-[400px] bg-[#FAFAFA] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="flex gap-4 items-end h-40">
            {[60, 100, 45, 80].map((h, i) => (
                <div key={i} className="w-12 bg-[#221F21] relative flex items-end" style={{ height: `${h}%` }}>
                    <motion.div
                        className="w-full bg-[#ff4d00]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '30%' }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                    />
                </div>
            ))}
        </div>
        <div className="mt-8 text-center">
            <div className="text-[#221F21] font-black text-4xl tracking-tighter italic mb-1">$420,000+</div>
            <div className="text-[#221F21]/40 font-mono text-[10px] uppercase tracking-widest leading-none">Aggregate Project Revenue</div>
        </div>
    </div>
);

const NosniyVisual = () => (
    <div className="w-full h-[300px] md:h-[400px] bg-[#1E293B] flex flex-col items-center justify-center relative overflow-hidden group">
        <img
            src="/rivals.webp"
            alt="Rivals"
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent" />
        <div className="relative z-10 w-48 h-16 border-2 border-[#ff4d00] flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="text-white font-black text-3xl tracking-tighter">RIVALS</div>
            <div className="text-[#ff4d00] font-mono text-[10px] uppercase font-bold tracking-widest">Contributor</div>
        </div>
    </div>
);

const SectionHeader = ({ text }: { text: string }) => (
    <div className="bg-[#221F21] text-[#F4F3EC] px-4 py-2 transform -skew-x-12 inline-block mb-6">
        <span className="block transform skew-x-12 text-xs font-display font-black italic uppercase tracking-widest">
            {text}
        </span>
    </div>
);

export default function RobloxPage() {
    const lenis = useLenis()
    const { scrollY } = useScroll();

    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
    const heroPointerEvents = useTransform(scrollY, (y) => y > 500 ? 'none' : 'auto');

    const contentOpacity = useTransform(scrollY, [400, 700], [0, 1]);
    const contentY = useTransform(scrollY, [400, 700], [100, 0]);

    const personalities = [
        { name: "Flamingo", url: "https://www.youtube.com/watch?v=3KcYyKEAf3k" },
        { name: "KreekCraft", url: "https://www.youtube.com/watch?v=pgwS4aarrHw" },
        { name: "ZacharyZaxor", url: "https://www.youtube.com/watch?v=Ce7qWr7qa4E" },
        { name: "Ant", url: "https://www.youtube.com/watch?v=FuWb95L1Rpg" },
        { name: "TwiistedPandora", url: "https://www.youtube.com/watch?v=-zaBhfGM1wo" },
        { name: "Gaming Dan", url: "https://www.youtube.com/watch?v=8lQGLlC4FdY" },
        { name: "ItsShark", url: "https://www.youtube.com/watch?v=pgwS4aarrHw" },
        { name: "Seedeng", url: "https://www.youtube.com/watch?v=3KcYyKEAf3k" },
        { name: "PDJ", url: "https://www.youtube.com/watch?v=3AygWRZtNGc" },
        { name: "Seer", url: "https://www.youtube.com/watch?v=2niUDZb-dU8" }
    ];

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
                    <span className="font-sans font-bold text-xs uppercase tracking-widest hidden md:block">Case Study • Roblox</span>
                </div>
                <div className="w-1/3 text-right pointer-events-auto"></div>
            </header>

            {/* FIXED HERO (Behind) */}
            <div className="fixed top-0 left-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-20 z-0 pointer-events-none text-center">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents as any }} className="flex flex-col items-center">
                    <div className="w-32 md:w-48 mb-10 pointer-events-auto select-none">
                        <img src="/0eeeb19633422b1241f4306419a0f15f39d58de9.png" alt="Roblox" className="w-full h-auto object-contain" />
                    </div>

                    <div className="mb-6 bg-[#221F21] text-white px-4 py-2 transform -skew-x-12 pointer-events-auto">
                        <span className="block transform skew-x-12 text-xs font-mono uppercase tracking-widest font-bold italic">2019 – 2025</span>
                    </div>

                    <h1 className="text-[12vw] md:text-9xl leading-none font-sans font-black tracking-tighter text-[#221F21] mb-6">
                        ROBLOX
                    </h1>
                    <p className="text-xl md:text-2xl font-sans font-medium text-[#221F21]/60 tracking-tight max-w-2xl">
                        Developing large-scale entertainment for a generation of digital natives.
                    </p>
                </motion.div>
            </div>

            {/* SPACER (Force Scroll) */}
            <div className="h-[100vh] w-full invisible pointer-events-none"></div>

            {/* SCROLLING CARD CONTENT (Z-10) */}
            <div className="relative w-full z-10 px-4 md:px-20 pb-40">
                <motion.div style={{ opacity: contentOpacity, y: contentY }} className="space-y-10 md:space-y-20 max-w-7xl mx-auto">

                    {/* 1. MURDER MYSTERY 3 */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none border-l-4 border-[#221F21]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="01. Flagship" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Murder Mystery 3.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">Owned and founded one of the platforms most recognizable titles. MM3 peaked in the top 10 rankings globally, providing social deductions and fast-paced gameplay to millions.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#221F21] p-4 text-[#F4F3EC]">
                                        <div className="text-2xl font-black italic">250M+</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">Total Plays</div>
                                    </div>
                                    <div className="bg-[#221F21] p-4 text-[#F4F3EC]">
                                        <div className="text-2xl font-black italic">$420,000+</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest opacity-50">Estimated Personal Earnings</div>
                                    </div>
                                </div>
                            </div>
                            <div><MM3Visual /></div>
                        </div>
                    </section>

                    {/* 2. SCALE & SOLUTIONS */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none border-l-4 border-[#ff4d00]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1"><RevenueVisual /></div>
                            <div className="order-1 md:order-2">
                                <SectionHeader text="02. Portfolio" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Mars Solutions.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">Founded high-yield game groups focused on rapid content deployment and monetization efficiency. Origin and Mars Solutions reached 100M+ visits collectively.</p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium">Successfully exited multiple projects with personal aggregate earnings of $70,000+ USD.</p>
                            </div>
                        </div>
                    </section>

                    {/* 3. NOSNIY GAMES */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none border-l-4 border-[#221F21]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <SectionHeader text="03. Contribution" />
                                <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Nosniy Games.</h3>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium mb-6">Collaborated with industry-leading developers like SenseiWarrior (Lead Scripter for *Rivals*). I met him through Murder Mystery 3 where he directly contributed to my codebase.</p>
                                <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium italic">I provided UI/UX refinements that influenced player retention and onboarding flow for Nosniy/Rivals projects.</p>
                            </div>
                            <div><NosniyVisual /></div>
                        </div>
                    </section>

                    {/* 4. PERSONALITIES */}
                    <section className="bg-white/50 backdrop-blur-md p-8 md:p-16 shadow-none border-l-4 border-[#ff4d00]">
                        <div className="mb-12">
                            <SectionHeader text="04. Recognition" />
                            <h3 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[0.9]">Impact Proof.</h3>
                            <p className="text-lg text-[#221F21]/70 leading-relaxed font-medium max-w-2xl">A snapshot of the massive audience reached across these production cycles. These creators documented the experience for millions of viewers.</p>
                            <div className="mt-4 text-[10px] font-mono uppercase tracking-widest text-[#221F21]/40 font-bold">List of personalities & gameplay videos</div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {personalities.map((p, i) => (
                                <div
                                    key={i}
                                    className="bg-[#221F21] p-3 text-[#F4F3EC] group border-l-2 border-transparent hover:border-[#ff4d00] transition-all"
                                >
                                    <div className="text-[11px] font-bold tracking-tight leading-tight">{p.name}</div>
                                    <div className="text-[7px] uppercase font-mono tracking-widest opacity-30 mt-1 italic">Gameplay Proof</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FOOTER */}
                    <div className="bg-[#221F21] text-[#F4F3EC] p-12 md:p-24 rounded-[3rem] text-center">
                        <h2 className="text-[8vw] font-display italic leading-none mb-10">
                            Scale.
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">250M+</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Total Plays</div>
                            </div>
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">$420k+</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Gross Revenue</div>
                            </div>
                            <div>
                                <div className="text-4xl font-sans font-bold mb-2">Verified</div>
                                <div className="text-xs uppercase tracking-widest opacity-50">Top 0.02% Dev</div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </main>
    );
}
