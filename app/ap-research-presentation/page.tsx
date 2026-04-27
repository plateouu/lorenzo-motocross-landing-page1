"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize, Minimize, Plus, Minus } from "lucide-react"

// Import Comic Neue via Google Fonts
const FontImport = () => (
    <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
        
        .presentation-inner {
            aspect-ratio: 16/9;
            width: 100%;
            height: auto;
            max-width: 1400px;
            margin: 0 auto;
            transition: transform 0.2s ease-out;
        }

        /* Responsive scaling for small devices */
        @media (max-width: 768px) {
            .presentation-inner {
                aspect-ratio: auto;
                height: 100%;
            }
        }
    `}</style>
)

export default function APResearchPresentation() {
    const [current, setCurrent] = React.useState(0)
    const [mounted, setMounted] = React.useState(false)
    const [isFullscreen, setIsFullscreen] = React.useState(false)
    const [zoom, setZoom] = React.useState(1)

    React.useEffect(() => { setMounted(true) }, [])

    const SLIDES = [
        { id: "title", label: "TITLE" },
        { id: "context-gatekeeping", label: "GATEKEEPING" },
        { id: "context-anxiety", label: "ALGORITHMIC ANXIETY" },
        { id: "problem", label: "THE PROBLEM" },
        { id: "gap", label: "THE GAP" },
        { id: "rq", label: "RESEARCH QUESTION" },
        { id: "methodology", label: "METHODOLOGY" },
        { id: "sample", label: "SAMPLE" },
        { id: "coding", label: "CODING" },
        { id: "results-1", label: "VISIBILITY" },
        { id: "results-2", label: "SYSTEM DEMANDS" },
        { id: "results-3", label: "ARTIST STRAIN" },
        { id: "results-4", label: "THE COST" },
        { id: "discussion-1", label: "SYNTHESIS" },
        { id: "discussion-2", label: "ART AS LABOR" },
        {id: "conclusion-2", label: "SIGNIFICANCE" },
        { id: "works-cited", label: "WORKS CITED" },
    ]

    const next = React.useCallback(() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1)), [SLIDES.length])
    const prev = React.useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

    const toggleFullscreen = () => {
        try {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen()
                setIsFullscreen(true)
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                    setIsFullscreen(false)
                }
            }
        } catch (e) {
            console.error("Fullscreen failed:", e)
        }
    }

    React.useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (["ArrowRight", "Space", "PageDown", "ArrowDown"].includes(e.code)) next()
            if (["ArrowLeft", "PageUp", "ArrowUp"].includes(e.code)) prev()
            if (e.code === "KeyF") toggleFullscreen()
        }
        window.addEventListener("keydown", h)
        return () => window.removeEventListener("keydown", h)
    }, [next, prev])

    if (!mounted) return null

    const slideVariants = {
        initial: { opacity: 0, scale: 0.99 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.01 },
    }

    return (
        <div
            className="h-screen w-full bg-white text-black flex flex-col items-center justify-center overflow-hidden selection:bg-yellow-200 cursor-default p-4 md:p-8"
            style={{ fontFamily: '"Comic Neue", "Comic Sans MS", "Comic Sans", cursive' }}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) return;
                next();
            }}
            onContextMenu={(e) => { e.preventDefault(); prev() }}
        >
            <FontImport />
            
            {/* Control Panel */}
            <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 flex gap-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(0.5, z - 0.1)) }}
                    className="p-2 md:p-3 bg-slate-100 text-black rounded-lg hover:bg-slate-200 transition-colors shadow-sm"
                    title="Zoom Out"
                >
                    <Minus className="w-5 h-5" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(2, z + 0.1)) }}
                    className="p-2 md:p-3 bg-slate-100 text-black rounded-lg hover:bg-slate-200 transition-colors shadow-sm"
                    title="Zoom In"
                >
                    <Plus className="w-5 h-5" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className="p-2 md:p-3 bg-black text-white rounded-lg hover:scale-105 transition-transform shadow-lg ml-2"
                >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
            </div>

            {/* Presentation Frame */}
            <div 
                className="presentation-inner flex flex-col justify-center w-full max-w-7xl mx-auto"
                style={{ transform: `scale(${zoom})` }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        variants={slideVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-full flex-1 flex flex-col justify-center"
                    >
                        {/* 1. TITLE */}
                        {SLIDES[current].id === "title" && (
                            <div className="space-y-6 md:space-y-12 text-center">
                                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase leading-tight tracking-tighter">
                                    The Invisible <br />
                                    <span className="bg-black text-white px-4 md:px-6">Gatekeepers</span>
                                </h1>
                                <p className="text-xl md:text-4xl lg:text-5xl font-bold border-4 border-black p-4 md:p-8 bg-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block">
                                    Algorithms and Creative Identity
                                </p>
                                <div className="pt-6 md:pt-12 text-lg md:text-2xl font-bold uppercase tracking-widest text-gray-400">
                                    Taylor Daan • AP Research • 2026
                                </div>
                            </div>
                        )}

                        {/* 2. CONTEXT: GATEKEEPING */}
                        {SLIDES[current].id === "context-gatekeeping" && (
                            <div className="space-y-6 h-full flex flex-col justify-center p-8">
                                <h2 className="text-4xl md:text-6xl font-bold uppercase border-b-8 border-black pb-4 mb-8">Gatekeeping</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div className="space-y-8 text-2xl md:text-4xl font-bold">
                                        <p className="bg-slate-50 p-6 border-l-8 border-black"><strong>Gatekeeping:</strong> The process of choosing what information reaches the public.</p>
                                        <div className="bg-yellow-400 p-8 border-4 border-black rotate-1 shadow-lg">
                                            <p className="text-3xl font-black uppercase mb-2">Technical Rules:</p>
                                            <p>This map shows how complicated these systems are for artists to understand.</p>
                                        </div>
                                    </div>
                                    <div className="border-4 border-black bg-white shadow-xl max-w-lg mx-auto overflow-hidden">
                                        <img 
                                            src="/images/gillespie-map.jpg" 
                                            alt="Gillespie Map" 
                                            className="w-full h-auto"
                                            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Gillespie+Map" }}
                                        />
                                        <p className="text-sm p-4 font-bold uppercase bg-black text-white text-center italic">Fig 1: Socio-Technical Map (Gillespie, 2014)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. CONTEXT: ANXIETY */}
                        {SLIDES[current].id === "context-anxiety" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-4xl md:text-6xl font-bold uppercase border-b-8 border-black pb-4">Digital Anxiety</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                    <div className="border-4 border-black bg-white shadow-lg max-w-lg mx-auto overflow-hidden">
                                        <img 
                                            src="/images/Digital-gatekeeping-in-a-mass-dissemination-framework.png" 
                                            alt="Gatekeeping Model" 
                                            className="w-full h-auto"
                                            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Model+Missing" }}
                                        />
                                        <p className="text-sm p-4 font-bold uppercase bg-black text-white text-center">Fig 2: Digital Gatekeeping (Bruns, 2017)</p>
                                    </div>
                                    <div className="space-y-8 text-2xl md:text-4xl font-bold text-center md:text-left">
                                        <p><strong>Visibility:</strong> This is a threat to creators who need to be seen.</p>
                                        <div className="bg-red-600 text-white p-6 shadow-md inline-block">
                                            <p className="text-4xl font-black">Visibility = Survival</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 4. THE PROBLEM */}
                        {SLIDES[current].id === "problem" && (
                            <div className="space-y-12 text-center p-8">
                                <h2 className="text-4xl md:text-6xl font-bold uppercase border-b-8 border-red-600 pb-4 text-red-600 inline-block">Reach Collapse</h2>
                                <div className="flex flex-col md:flex-row gap-8 mt-12">
                                    <div className="flex-1 border-8 border-black p-12 bg-red-50 shadow-lg">
                                        <h3 className="text-8xl font-black text-red-600">44%</h3>
                                        <p className="text-3xl font-black uppercase">Drop in Reach</p>
                                    </div>
                                    <div className="flex-1 border-8 border-black p-12 bg-blue-50 shadow-lg">
                                        <h3 className="text-8xl font-black text-blue-600">&lt; 5%</h3>
                                        <p className="text-3xl font-black uppercase">Organic Views</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 5. THE GAP */}
                        {SLIDES[current].id === "gap" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">The Gap</h2>
                                <div className="space-y-12 mt-12">
                                    <div className="flex items-center gap-12 text-3xl md:text-5xl">
                                        <div className="bg-black text-white px-8 py-3 font-black">BIG DATA</div>
                                        <span className="font-bold">Studies large corporations.</span>
                                    </div>
                                    <div className="text-6xl md:text-8xl font-black text-center text-gray-200 uppercase">vs</div>
                                    <div className="flex items-center gap-12 text-3xl md:text-5xl">
                                        <div className="bg-yellow-400 px-8 py-3 font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black">MY STUDY</div>
                                        <span className="font-bold">Focuses on the small artist.</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 6. RESEARCH QUESTION */}
                        {SLIDES[current].id === "rq" && (
                            <div className="h-full flex flex-col justify-center items-center text-center p-8">
                                <h2 className="text-3xl font-black uppercase tracking-widest text-gray-400 mb-8">Research Question</h2>
                                <div className="border-[12px] border-black p-12 md:p-24 bg-white shadow-2xl max-w-5xl rotate-1">
                                    <p className="text-5xl md:text-7xl font-black leading-tight">
                                        How do algorithms affect the <span className="text-blue-600 underline">Creative Identity</span> of small artists?
                                    </p>
                                </div>
                            </div>
                        )}

                         {/* 7. METHODOLOGY */}
                         {SLIDES[current].id === "methodology" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">Approach</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                                    <div className="border-8 border-black p-12 bg-yellow-50 shadow-xl flex flex-col justify-center text-center">
                                        <h3 className="text-5xl font-black uppercase mb-6 underline">Discourse Analysis</h3>
                                        <p className="text-3xl font-bold">Analyzing the stories and posts artists write online.</p>
                                    </div>
                                    <div className="bg-white border-8 border-black p-12 flex flex-col justify-center space-y-12 text-4xl font-bold shadow-xl">
                                        <div className="flex items-center gap-8">
                                            <span className="bg-black text-white px-4">1.</span> <span>Collect Posts</span>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="bg-black text-white px-4">2.</span> <span>Social Coding</span>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <span className="bg-black text-white px-4">3.</span> <span>Core Themes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 8. SAMPLE */}
                        {SLIDES[current].id === "sample" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">Data Sources</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                    {[
                                        { title: "Hyperlux", desc: "Artist accounts of reach collapse." },
                                        { title: "Medium", desc: "Burnout narratives from creators." },
                                        { title: "Saturno", desc: "Independent artist struggles." }
                                    ].map((s, i) => (
                                        <div key={i} className="border-4 border-black p-10 bg-blue-50 shadow-md">
                                            <h4 className="text-3xl font-black uppercase mb-6 underline">{s.title}</h4>
                                            <p className="text-2xl font-bold">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 9. CODING */}
                        {SLIDES[current].id === "coding" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-black uppercase border-b-8 border-black pb-4">The Patterns</h2>
                                <div className="flex flex-col md:flex-row gap-12 mt-12">
                                    <div className="flex-1 bg-black text-white p-16 space-y-8 shadow-2xl">
                                        <h3 className="text-5xl font-black uppercase italic text-yellow-400">Section A</h3>
                                        <ul className="text-4xl space-y-6 font-bold list-disc pl-8">
                                            <li>Gatekeeping</li>
                                            <li>Constant Stress</li>
                                            <li>Visibility Work</li>
                                        </ul>
                                    </div>
                                    <div className="flex-1 border-8 border-black p-16 space-y-8 bg-slate-50 shadow-2xl">
                                        <h3 className="text-5xl font-black uppercase italic text-blue-600">Section B</h3>
                                        <ul className="text-4xl space-y-6 font-bold list-disc pl-8">
                                            <li>Similarity</li>
                                            <li>Artist Anger</li>
                                            <li>Hidden Labor</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 10. RESULTS 1: VISIBILITY */}
                        {SLIDES[current].id === "results-1" && (
                            <div className="space-y-8 h-full flex flex-col justify-center p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">Result 1: Control</h2>
                                <div className="bg-black text-white p-20 border-l-[24px] border-yellow-400 shadow-2xl transform -rotate-1">
                                    <p className="text-5xl md:text-7xl font-black leading-tight italic">
                                        "Followers do not equal views anymore."
                                    </p>
                                </div>
                                <p className="text-4xl md:text-6xl mt-12 font-black text-center uppercase tracking-tighter">
                                    Reach is determined by the <span className="bg-red-600 text-white px-6 py-2">System</span>.
                                </p>
                            </div>
                        )}

                        {/* 11. RESULTS 2: SYSTEM DEMANDS */}
                        {SLIDES[current].id === "results-2" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">System Demands</h2>
                                <div className="border-[12px] border-black p-16 space-y-12 bg-yellow-50 shadow-2xl mt-12">
                                    <h3 className="text-5xl font-black uppercase underline decoration-8">Requirements for Success:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="border-4 border-black p-8 text-3xl font-black bg-white">1. SHORT VIDEO</div>
                                        <div className="border-4 border-black p-8 text-3xl font-black bg-white">2. DAILY POSTS</div>
                                        <div className="border-4 border-black p-8 text-3xl font-black bg-white">3. FAST TRENDS</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 12. RESULTS 3: ARTIST STRAIN */}
                        {SLIDES[current].id === "results-3" && (
                            <div className="space-y-12 text-center p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4 text-left">Artist Strain</h2>
                                <p className="text-5xl md:text-[5rem] font-black leading-[1.1] max-w-6xl mx-auto py-12">
                                    Artists are spending more time on <strong>"Platform Maintenance"</strong> than on art.
                                </p>
                                <div className="bg-red-600 text-white inline-block px-20 py-8 shadow-2xl border-4 border-black transform rotate-2">
                                    <p className="text-6xl font-black uppercase italic">Burnout is standard.</p>
                                </div>
                            </div>
                        )}

                        {/* 13. RESULTS 4: THE COST */}
                        {SLIDES[current].id === "results-4" && (
                            <div className="space-y-12 text-center h-full flex flex-col justify-center p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4 text-left">The Reality</h2>
                                <div className="text-[12rem] font-black py-12 uppercase tracking-tighter leading-none bg-yellow-400 border-[16px] border-black inline-block shadow-2xl transform -rotate-1">
                                    UNFAIR
                                </div>
                                <p className="text-5xl max-w-5xl mx-auto font-black mt-16 bg-white p-12 border-8 border-black shadow-xl">
                                    Artists feel forced to pay for ads to reach their own audience.
                                </p>
                            </div>
                        )}

                         {/* 14. DISCUSSION 1: SYNTHESIS */}
                         {SLIDES[current].id === "discussion-1" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">Synthesis</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
                                    <div className="space-y-8">
                                        <div className="bg-blue-50 p-8 border-8 border-black shadow-lg">
                                            <h3 className="text-4xl font-black text-blue-600 underline uppercase">1. Sensemaking</h3>
                                            <p className="text-2xl font-bold mt-4">Trying to "read" the code through numbers.</p>
                                        </div>
                                        <div className="bg-red-50 p-8 border-8 border-black shadow-lg">
                                            <h3 className="text-4xl font-black text-red-600 underline uppercase">2. Emotion</h3>
                                            <p className="text-2xl font-bold mt-4">Constant anxiety about becoming invisible.</p>
                                        </div>
                                    </div>
                                    <div className="border-8 border-black bg-white shadow-2xl max-w-md mx-auto overflow-hidden">
                                        <img 
                                            src="/images/Digital-gatekeeping-in-a-mass-dissemination-framework.png" 
                                            alt="Precarity Model" 
                                            className="w-full h-auto"
                                            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x600?text=Model" }}
                                        />
                                        <p className="text-lg p-6 font-black uppercase bg-black text-white text-center italic">Fig 3: Precarity Model (van Driel, 2024)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 15. DISCUSSION 2: ART AS LABOR */}
                        {SLIDES[current].id === "discussion-2" && (
                            <div className="space-y-8 p-12">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">The Shift</h2>
                                <div className="bg-black text-white p-24 shadow-[24px_24px_0px_0px_rgba(37,99,235,1)]">
                                    <p className="text-5xl md:text-8xl font-black uppercase leading-tight italic">
                                        "Artists work FOR the platform, instead of with it."
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 16. CONCLUSION 1: MAIN FINDING */}
                        {SLIDES[current].id === "conclusion-1" && (
                            <div className="space-y-12 text-center h-full flex flex-col justify-center p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4 text-left">The Result</h2>
                                <div className="p-20 md:p-32 border-[16px] border-black bg-yellow-400 shadow-2xl max-w-5xl mx-auto rotate-1">
                                    <p className="text-6xl md:text-8xl font-black leading-tight uppercase underline decoration-black decoration-[12px]">
                                        Algorithms are the new Gatekeepers.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 17. CONCLUSION 2: SIGNIFICANCE */}
                        {SLIDES[current].id === "conclusion-2" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">Why it Matters</h2>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-12 mt-12">
                                    <div className="bg-slate-50 p-16 border-[12px] border-black shadow-2xl text-center">
                                        <h3 className="text-5xl font-black text-blue-600 mb-12 underline uppercase">Key Takeaway</h3>
                                        <ul className="text-4xl space-y-8 font-black uppercase list-none">
                                            <li>• Shows how art is changing.</li>
                                            <li>• Explains artist stress.</li>
                                            <li>• Starts a talk on fairness.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 18. WORKS CITED */}
                        {SLIDES[current].id === "works-cited" && (
                            <div className="space-y-8 p-8">
                                <h2 className="text-6xl font-bold uppercase border-b-8 border-black pb-4">Works Cited</h2>
                                <div className="bg-white border-8 border-black p-12 shadow-xl space-y-6 max-h-[60vh] overflow-auto">
                                    <p className="text-xl md:text-2xl font-bold font-mono">Bruns, Axel. (2017). "Gatekeeping into the 21st century." Oxford Research Encyclopedia of Communication.</p>
                                    <p className="text-xl md:text-2xl font-bold font-mono">Bucher, Taina. (2017). "The algorithmic imaginary: exploring the role of algorithms in social media." Information, Communication & Society.</p>
                                    <p className="text-xl md:text-2xl font-bold font-mono">Gillespie, Tarleton. (2014). "The relevance of algorithms." Media Technologies: Essays on Communication, Materiality, and Society.</p>
                                    <p className="text-xl md:text-2xl font-bold font-mono">Noble, Safiya U. (2018). "Algorithms of Oppression: How Search Engines Reinforce Racism." NYU Press.</p>
                                    <p className="text-xl md:text-2xl font-bold font-mono">Saturno. (2023). "Artists as Data: The Costs of Modern Visibility." Saturno Digital Archives.</p>
                                    <p className="text-xl md:text-2xl font-bold font-mono">Van Driel, Loes. (2024). "Algorithmic Precarity in the Creative Economy." University of Amsterdam Press.</p>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* FOOTER - Minimal Page Number Only */}
            <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
                <div className="bg-black text-white px-3 py-2 border-2 border-black text-sm md:text-xl font-mono shadow-[2px_2px_0px_0px_rgba(253,224,71,1)] pointer-events-auto">
                    {current + 1} / {SLIDES.length}
                </div>
            </div>
        </div>
    )
}
