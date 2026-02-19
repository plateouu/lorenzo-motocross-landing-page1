"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getGameById, Game, GAMES } from "@/lib/games";
import { openDisguisedTab } from "@/lib/disguise";
import GameLayout from "@/components/game-layout";
import Link from "next/link";
import Image from "next/image";

function GamePageContent() {
    const { gameId } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = searchParams.get("filter");

    // Determine ACTIVE game
    const [activeGame, setActiveGame] = useState<Game | undefined>(undefined);
    
    // Config State
    const [targetUrl, setTargetUrl] = useState("");
    const [showAdminInput, setShowAdminInput] = useState(false);
    
    // Connection Simulation State
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const [countdown, setCountdown] = useState(1800); // 30 minutes in seconds

    useEffect(() => {
        if (gameId) {
            const found = getGameById(gameId as string);
            setActiveGame(found);
            
            // Load URL config
            const saved = localStorage.getItem(`game_url_${gameId}`);
            if (saved) {
                setTargetUrl(saved);
            } else if (found?.targetUrl) {
                setTargetUrl(found.targetUrl || "");
            }
            
            // Reset states on game switch
            setIsConnecting(false);
            setConnectionError(false);
            
        } else {
            // Fallback for Hub View if needed (should rely on /hub main page mostly)
             if (filter) {
                if (filter === "Games") {
                     setActiveGame(GAMES.find(g => g.id === 'calculator') || GAMES[0]);
                } else {
                     setActiveGame(GAMES.find(g => g.category === filter));
                }
            } else {
                setActiveGame(GAMES.find(g => g.id === 'calculator') || GAMES[0]);
            }
        }
    }, [gameId, filter]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (connectionError && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [connectionError, countdown]);

    // Format seconds to MM:SS
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Admin Toggle
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === 'l') {
                setShowAdminInput(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleLaunch = async () => {
        if (!activeGame) return;
        
        if (targetUrl) {
            localStorage.setItem(`game_url_${activeGame?.id}`, targetUrl);
            openDisguisedTab(targetUrl);
        } else {
            if (activeGame.id === '585285885') {
                // Clear any previous saved URL since we are attempting to connect without one
                localStorage.removeItem(`game_url_${activeGame?.id}`);
                
                // Simulate Connection
                setIsConnecting(true);
                setConnectionError(false); // Reset error
                
                // Fake delay 3 seconds
                await new Promise(r => setTimeout(r, 3000));
                
                setIsConnecting(false);
                setConnectionError(true);
                setCountdown(1800); // Reset timer to 30m
            } else {
                alert("Configuration pending...");
            }
        }
    };

    const handleGridClick = (g: Game) => {
        if (g.id === "585285885") {
            router.push(`/hub/${g.id}`);
        } else if (g.targetUrl) {
            openDisguisedTab(g.targetUrl);
        } else {
            router.push(`/hub/${g.id}`);
        }
    };

    // FILTER LOGIC:
    // If filter is "Games", return ALL GAMES.
    const filteredGames = (filter === "Games" || !filter)
        ? GAMES
        : GAMES.filter(g => g.category === filter);

    if (!activeGame) return null;

    const isSteamDeck = activeGame.id === '585285885';
    const isCalculator = activeGame.id === 'calculator';

    return (
        <GameLayout>
            <div className="flex flex-col min-h-full bg-[#0a0a0a]">
                
                {/* HERO SECTION */}
                <div className="relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden">
                    {/* Background Image with Fade */}
                    <img
                        src={activeGame.thumbnail}
                        alt={activeGame.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight">
                            {isSteamDeck ? "Steam Deck" : activeGame.title}
                        </h1>

                        {/* STATUS AREA */}
                        <div className="w-full max-w-md min-h-[100px] flex flex-col items-center justify-center">
                            
                            {/* CONNECTING STATE */}
                            {isSteamDeck && isConnecting && (
                                <div className="flex flex-col items-center space-y-3 animate-in fade-in">
                                    <div className="w-6 h-6 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-white/80 font-medium text-sm tracking-wide">
                                        Establishing secure link...
                                    </p>
                                </div>
                            )}

                            {/* ERROR STATE */}
                            {isSteamDeck && !isConnecting && connectionError && !targetUrl && (
                                <div className="text-center space-y-2 animate-in fade-in">
                                    <h3 className="text-red-500 font-bold text-lg">Connection Failed</h3>
                                    <p className="text-gray-400 text-sm">
                                        All systems are currently in use.
                                    </p>
                                    <p className="text-gray-500 text-xs font-mono pt-2">
                                        Please wait {formatTime(countdown)}
                                    </p>
                                </div>
                            )}

                            {/* ACTION BUTTON */}
                            {(!isConnecting && (!connectionError || targetUrl)) && (
                                <div className="flex flex-col gap-4 w-full max-w-xs relative z-10 transition-all duration-300 mt-4">
                                    {/* Admin Input */}
                                    {isSteamDeck && showAdminInput && (
                                        <input
                                            type="text"
                                            value={targetUrl}
                                            onChange={(e) => setTargetUrl(e.target.value)}
                                            placeholder="Config Link..."
                                            className="w-full bg-black/50 backdrop-blur text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 ring-blue-500 font-mono text-sm"
                                        />
                                    )}

                                    <button
                                        onClick={handleLaunch}
                                        className="bg-white text-black hover:bg-blue-500 hover:text-white font-black text-lg py-4 px-8 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
                                    >
                                        {isSteamDeck ? "Connect to Cloud Rig" : (isCalculator ? "Open Desmos" : "Play Now")}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* GAMES GRID */}
                <div className="p-8 md:p-12">
                     <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {filter ? (filter === "Games" ? "All Games" : filter) : "Discover"}
                        </h2>
                         <div className="flex gap-2">
                            {filter && (
                                <Link href="/hub" className="px-4 py-2 bg-[#1a1a1a] rounded-full text-xs font-bold text-gray-400 hover:text-white transition-colors">
                                    Clear Filter
                                </Link>
                            )}
                         </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredGames.filter(g => g.id !== activeGame.id).map(g => (
                            <div 
                                key={g.id} 
                                onClick={() => handleGridClick(g)}
                                className="group relative aspect-[16/10] bg-[#151515] rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
                            >
                                <img
                                    src={g.thumbnail}
                                    alt={g.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                    <h3 className="text-lg font-bold text-white leading-tight">{g.title}</h3>
                                    <p className="text-xs text-gray-400 font-medium mt-1">{g.category}</p>
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
            <GamePageContent />
        </Suspense>
    )
}
