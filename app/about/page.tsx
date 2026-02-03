'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SideMenu from '../components/SideMenu';
import NoiseOverlay from '../components/NoiseOverlay';
import TransitionLink from '../components/TransitionLink';

const SectionHeader = ({ text }: { text: string }) => (
    <div className="bg-[#221F21] text-[#F4F3EC] px-4 py-2 transform -skew-x-12 inline-block mb-6">
        <span className="block transform skew-x-12 text-xs font-sans font-black italic uppercase tracking-widest">
            {text}
        </span>
    </div>
);

export default function AboutPage() {
    return (
        <main className="relative w-full min-h-screen bg-[#F4F3EC] text-[#221F21] font-sans overflow-x-hidden">
            <NoiseOverlay />
            <SideMenu />

            {/* FIXED HEADER */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-start px-6 py-6 mix-blend-difference text-white pointer-events-none">
                <div className="w-1/3 pointer-events-auto cursor-pointer">
                    <TransitionLink href="/" className="font-display italic text-2xl tracking-tighter hover:opacity-70 transition-opacity">Taylor Daan</TransitionLink>
                </div>
                <div className="w-1/3 flex justify-center pointer-events-none">
                    <span className="font-sans font-bold text-xs uppercase tracking-widest hidden md:block">About • Information</span>
                </div>
                <div className="w-1/3 text-right pointer-events-auto"></div>
            </header>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">

                    {/* LEFT COL: Image only */}
                    <div className="space-y-12">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#ff4d00]/10 transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                            <div className="aspect-[4/5] overflow-hidden transition-all duration-700 bg-gray-200">
                                <img
                                    src="/image0.png"
                                    alt="Taylor Daan at the Grand Canyon"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 bg-[#221F21] text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                                Grand Canyon, AZ
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COL: Bio, Mission & Links */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <SectionHeader text="About me" />
                            <p className="text-lg text-[#221F21]/60 leading-relaxed font-medium">
                                Hi, I'm Taylor Daan. I'm a student at JFK Memorial High School and a competitive programmer in the USACO Platinum division and a Codeforces Candidate Master.
                            </p>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-none mt-12">
                                SYSTEMIC CHANGE.
                            </h2>
                            <p className="text-lg text-[#221F21]/60 leading-relaxed">
                                I work on large-scale networks to learn how to build my own. My goal is to create high quality games that are fair and accessible for everyone.
                            </p>
                            <p className="text-lg text-[#221F21]/60 leading-relaxed italic">
                                No pay-to-win, just quality experiences.
                            </p>
                        </div>

                        <div className="space-y-6 pt-10">
                            <SectionHeader text="Connect" />
                            <div className="flex flex-col gap-4">
                                <a
                                    href="https://www.linkedin.com/in/taylor-daan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#221F21] text-white p-6 md:p-8 flex justify-between items-center group hover:bg-[#ff4d00] transition-colors"
                                >
                                    <span className="text-2xl font-bold tracking-tight">LinkedIn</span>
                                    <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                                </a>
                                <a
                                    href="mailto:daantaylor02@gmail.com"
                                    className="border-2 border-[#221F21]/10 p-6 md:p-8 flex justify-between items-center group hover:border-[#ff4d00] transition-colors"
                                >
                                    <span className="text-2xl font-bold tracking-tight">Email Me</span>
                                    <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* FOOTER */}
            <div className="w-full bg-[#221F21] py-20 px-6 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-[#F4F3EC] text-4xl font-display italic">Taylor Daan</div>
                    <div className="flex gap-8 text-[#F4F3EC]/40 font-mono text-xs uppercase tracking-[0.2em]">
                        <span>© 2026</span>
                        <span>Built for the future</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
