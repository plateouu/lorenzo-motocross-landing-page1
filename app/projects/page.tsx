'use client';

import React from 'react';
import TransitionLink from '../components/TransitionLink';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#221F21] text-[#F4F3EC] p-24 font-display">
            <div className="mb-20">
                <TransitionLink href="/" className="text-sm font-mono uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                    ← Back Home
                </TransitionLink>
            </div>

            <h1 className="text-[10vw] leading-none mb-12 italic">All Projects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans font-light">
                <div className="space-y-4">
                    <div className="bg-[#E1CCFF] aspect-video rounded-2xl w-full"></div>
                    <h2 className="text-3xl">Decadence</h2>
                    <p className="opacity-60">High-throughput server architecture.</p>
                </div>
                <div className="space-y-4">
                    <div className="bg-[#FFF7CC] aspect-video rounded-2xl w-full"></div>
                    <h2 className="text-3xl">PlateouMC</h2>
                    <p className="opacity-60">Next-gen infrastructure.</p>
                </div>
                <div className="space-y-4">
                    <div className="bg-[#FFD6DD] aspect-video rounded-2xl w-full"></div>
                    <h2 className="text-3xl">DonutSMP</h2>
                    <p className="opacity-60">Community ecosystem.</p>
                </div>
                <div className="space-y-4">
                    <div className="bg-[#E6FFDB] aspect-video rounded-2xl w-full"></div>
                    <h2 className="text-3xl">Legacy Ops</h2>
                    <p className="opacity-60">Game loop logic.</p>
                </div>
            </div>
        </main>
    );
}
