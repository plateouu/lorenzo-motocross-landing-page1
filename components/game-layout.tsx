"use client";

import { GameSidebar } from "@/components/game-sidebar";

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-[#111] text-white font-comic overflow-hidden">
            <GameSidebar />

            {/* Main Content: Lighter background than sidebar for separation without border */}
            <main className="flex-1 relative flex flex-col bg-[#0f0f0f] p-4 overflow-hidden">
                <div className="flex-1 min-h-0 bg-[#0a0a0a] rounded-3xl overflow-y-auto shadow-2xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
