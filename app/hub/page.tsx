"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { GAMES, Game } from "@/lib/games";
import Link from "next/link";
import GameLayout from "@/components/game-layout";
import { openDisguisedTab } from "@/lib/disguise";

function HubPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = searchParams.get("filter");

    // Choose a "Featured" game for the big banner
    const [featuredGame, setFeaturedGame] = useState<Game>(GAMES.find(g => g.id === 'calculator') || GAMES[0]);

    // FILTER LOGIC:
    // If filter is "Games", return ALL GAMES.
    // If filter is anything else (e.g., "Trending"), filter by category.
    // If no filter, also return ALL GAMES (default view).
    const filteredGames = (filter === "Games" || !filter)
        ? GAMES
        : GAMES.filter(g => g.category === filter);

    useEffect(() => {
        if (filter && filter !== "Games") {
            const firstInCat = GAMES.find(g => g.category === filter);
            if (firstInCat) setFeaturedGame(firstInCat);
        } else {
            // Default featured if "Games" or no filter
            // Maybe random? Or just Calculator default.
            const defaultFeatured = GAMES.find(g => g.id === 'calculator') || GAMES[0];
            setFeaturedGame(defaultFeatured);
        }
    }, [filter]);

    const handleGameClick = (g: Game) => {
        if (g.id === "585285885") {
            // Steam Deck needs configuration, go to (hub) page
            router.push(`/hub/${g.id}`);
        } else if (g.targetUrl) {
            // Direct launch
            openDisguisedTab(g.targetUrl);
        } else {
            // Fallback
            router.push(`/hub/${g.id}`);
        }
    };

    return (
        <GameLayout>
            <div className="flex flex-col min-h-full">
                {/* Banner Section */}
                <div className="flex flex-col items-center justify-center p-8 space-y-6 bg-[#0a0a0a] border-b border-white/5">
                    <div
                        onClick={() => handleGameClick(featuredGame)}
                        className="w-full max-w-5xl aspect-[21/9] bg-[#000] rounded-xl overflow-hidden relative shadow-2xl group cursor-pointer"
                    >
                        <div className="absolute inset-0">
                            <img src={featuredGame.thumbnail} alt={featuredGame.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/20">
                                <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-xl text-center">
                                    {featuredGame.title}
                                </h1>
                                <span className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg group-hover:scale-105 transition-transform">
                                    Play Now
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Discovery Grid */}
                <div className="p-8 bg-[#050505] flex-1">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                            {filter ? (filter === "Games" ? "All Games" : `${filter} Games`) : "All Games"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredGames.map(g => (
                            <div
                                key={g.id}
                                onClick={() => handleGameClick(g)}
                                className="block relative aspect-[4/3] rounded-lg overflow-hidden bg-[#111] hover:brightness-110 transition-all group cursor-pointer"
                            >
                                <img src={g.thumbnail} alt={g.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/90 to-transparent">
                                    <span className="text-xs font-bold truncate text-white">{g.title}</span>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-gray-300 font-bold">
                                    {g.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GameLayout>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
            <HubPageContent />
        </Suspense>
    )
}
