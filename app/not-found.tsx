'use client';

import React from 'react';
import TransitionLink from './components/TransitionLink';
import NoiseOverlay from './components/NoiseOverlay';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F4F3EC] text-[#221F21] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <NoiseOverlay />

      <div className="relative">
        <h1 className="text-[20vw] font-black italic tracking-tighter leading-none opacity-10 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#221F21] text-[#F4F3EC] px-6 py-3 transform -skew-x-12">
            <span className="block transform skew-x-12 font-sans font-black italic uppercase tracking-[0.2em] text-sm md:text-xl">
              Route Not Found
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 group">
        <TransitionLink
          href="/"
          className="flex items-center gap-4 text-sm font-sans font-black uppercase tracking-widest border-2 border-[#221F21] px-8 py-4 hover:bg-[#221F21] hover:text-[#F4F3EC] transition-all duration-300"
        >
          <span>← Back to Safety</span>
        </TransitionLink>
      </div>

      {/* Decorative Brutalist Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[#221F21]/20" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-[#221F21]/20" />
    </main>
  );
}
