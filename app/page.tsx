'use client';

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from "next/link"
import { useLenis } from './LenisProvider'
import ScrambleText from './components/ScrambleText'
import TransitionLink from './components/TransitionLink'
import SideMenu from './components/SideMenu'
import NoiseOverlay from './components/NoiseOverlay'
import ProjectPreview from './components/ProjectPreview'

// Define projects
const projects = [
    {
        title: "PlateouMC",
        year: "2026",
        role: "Founder & Lead Engineer",
        blurb: "Solo-owned Minecraft community with 19k members, $20k earned, and 1m views across all videos.",
        color: "#FFF7CC",
        image: "/PlateouSMP.jfif",
        href: "/projects/plateoumc",
        tags: ["Infrastructure", "Game Ops", "Scale"],
        aspect: "square",
        hideOverlay: true
    },
    {
        title: "DonutSMP",
        year: "2024",
        role: "Assistant Developer",
        blurb: "Mathematical approaches for server optimization using Redis and Folia.",
        color: "#D4E6FF", // Light Blue for preview
        image: "/stats.png",
        hideOverlay: true,
        href: "/projects/donutsmp", // NEW ROUTE
        tags: ["Community", "Backend", "LiveOps"]
    },
    {
        title: "Roblox Games",
        year: "2023",
        role: "Platform Game Developer",
        blurb: "Games accumulated half a quarter billion players.",
        color: "#FFE4E1",
        images: ["/Roblox1.png", "/Roblox2.webp", "/Roblox3.webp"],
        hideOverlay: true,
        href: "/projects/roblox",
        tags: ["Lua", "Game Design", "Logic"]
    },

];

export default function Page() {
    const lenis = useLenis()
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // Scroll handling - Global Window Scroll (Pixel based, no guessing)
    const { scrollY } = useScroll(); // Returns pixels

    // 1. Hero Fades out: 0px -> 300px
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
    const heroPointerEvents = useTransform(scrollY, (y) => y > 300 ? 'none' : 'auto');

    // 2. Safety Lock (Dead Zone 300-500px): Nothing happens. User just scrolls.

    // 3. Projects Fade In: 500px -> 750px
    const projectListOpacity = useTransform(scrollY, [500, 750], [0, 1]);
    const projectListY = useTransform(scrollY, [500, 750], [100, 0]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const scrollToSection = (id: string) => {
        lenis?.scrollTo(`#${id}`, { offset: 0 })
    }

    return (
        <main className="relative w-full bg-[#F4F3EC]" onMouseMove={handleMouseMove}>
            <NoiseOverlay />
            <SideMenu />

            {/* FIXED HEADER LOGO */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-start px-6 py-6 mix-blend-difference text-white pointer-events-none">
                <div className="w-1/3 pointer-events-auto cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span className="font-display italic text-2xl tracking-tighter">Taylor Daan</span>
                </div>
                <div className="w-1/3 flex justify-center pointer-events-none">
                    <span className="font-sans font-bold text-xs uppercase tracking-widest hidden md:block">Home</span>
                </div>
                <div className="w-1/3"></div>
            </header>

            {/* FIXED HERO COVER - Stays put, fades out based on pixels. z-0 to be behind projects */}
            <div className="fixed top-0 left-0 h-screen w-full flex flex-col justify-center items-center px-4 md:px-20 z-0 pointer-events-none">
                <motion.div style={{ opacity: heroOpacity, scale: heroScale, pointerEvents: heroPointerEvents as any }} className="w-full">
                    <h1 className="text-[10vw] leading-[0.8] font-display font-medium tracking-tighter text-[#221F21] mb-10 overflow-hidden text-center md:text-left">
                        <div className="block italic">
                            <ScrambleText text="Student first." duration={1500} />
                        </div>
                        <div className="block md:ml-[10vw]">
                            <ScrambleText text="Developer second." duration={1500} />
                        </div>
                    </h1>
                </motion.div>
            </div>

            {/* SPACER - Forces the initial scroll distance "Safety Buffer" */}
            {/* 100vh = Content starts just below fold. User MUST scroll to see it. */}
            <div className="h-[100vh] w-full invisible pointer-events-none"></div>

            {/* SCROLLING CONTENT - Flows naturally. z-10 to go OVER the fixed hero */}
            <div className="relative w-full z-10 px-4 md:px-20">
                <motion.div style={{ opacity: projectListOpacity, y: projectListY }}>
                    <h2 className="font-sans font-bold text-xs uppercase tracking-widest opacity-50 mb-10">( Selected Works )</h2>

                    <div className="flex flex-col gap-10">
                        {projects.map((project, i) => (
                            <div
                                key={i}
                                className="group relative bg-white/50 backdrop-blur-sm p-10 md:p-14 md:rounded-3xl cursor-pointer hover:bg-white transition-colors duration-500 shadow-sm hover:shadow-xl" // Boxy styling
                                onMouseEnter={() => {
                                    setHoveredProject(i);
                                    document.body.classList.add('cursor-hidden');
                                }}
                                onMouseLeave={() => {
                                    setHoveredProject(null);
                                    document.body.classList.remove('cursor-hidden');
                                }}
                            >
                                <TransitionLink href={project.href} className="flex flex-col relative z-10">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-4">
                                        <h3
                                            className="text-5xl md:text-7xl font-sans font-bold tracking-tight transition-colors duration-300"
                                            style={{ color: hoveredProject === i ? project.color : '#221F21' }}
                                        >
                                            {project.title}
                                        </h3>
                                        <div className="font-sans text-sm uppercase tracking-wide opacity-60 font-medium bg-[#221F21]/5 px-3 py-1 rounded-full">
                                            {project.role} — {project.year}
                                        </div>
                                    </div>

                                    {/* Hover Description Reveal */}
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: hoveredProject === i ? 'auto' : 0, opacity: hoveredProject === i ? 1 : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-xl md:text-2xl font-sans font-medium max-w-2xl opacity-80 pt-2">
                                            {project.blurb}
                                        </p>
                                    </motion.div>
                                </TransitionLink>
                            </div>
                        ))}
                    </div>

                    {/* FOOTER INSIDE ANIMATED CONTAINER */}
                    <section className="bg-[#221F21] text-[#F4F3EC] py-40 px-6 relative z-10 -mx-8 md:-mx-20 px-4 md:px-20 mt-40 rounded-t-[3rem]">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                            <a href="mailto:daantaylor02@gmail.com">
                                <h2 className="text-[12vw] font-display italic leading-none hover:text-[#ff4d00] transition-colors cursor-pointer">
                                    Let's Talk.
                                </h2>
                            </a>

                            <div className="flex gap-10 text-lg font-sans font-bold uppercase tracking-widest mb-6">
                                <a href="mailto:daantaylor02@gmail.com" className="hover:text-[#ff4d00] transition-colors">Email</a>
                                <a href="https://www.linkedin.com/in/taylor-daan/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4d00] transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>

            {/* HOVER IMAGE FLOATER (Follows cursor) */}
            <AnimatePresence mode="wait">
                {hoveredProject !== null && (
                    <ProjectPreview
                        project={projects[hoveredProject]}
                        cursorPos={cursorPos}
                    />
                )}
            </AnimatePresence>
        </main>
    )
}
