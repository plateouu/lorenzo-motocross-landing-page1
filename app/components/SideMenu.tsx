'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TransitionLink from './TransitionLink';

export default function SideMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);

    const menuVariants = {
        closed: { x: '100%', transition: { duration: 0.7, ease: "easeInOut" as const } },
        open: { x: '0%', transition: { duration: 0.7, ease: "easeInOut" as const } }
    };

    const linkVariants = {
        closed: { x: 80, opacity: 0 },
        open: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" as const }
        })
    };

    const projectSubLinks = [
        { name: "PlateouMC", href: "/projects/plateoumc" },
        { name: "DonutSMP", href: "/projects/donutsmp" },
        { name: "Roblox Games", href: "/projects/roblox" }
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-8 right-8 z-[80] mix-blend-difference text-white flex flex-col justify-center items-center w-12 h-12 gap-[6px] group"
            >
                <motion.div
                    animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    className="w-8 h-[2px] bg-white group-hover:bg-[#ff4d00] transition-colors origin-center"
                />
                <motion.div
                    animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                    className="w-8 h-[2px] bg-white group-hover:bg-[#ff4d00] transition-colors origin-center"
                />
            </button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed top-0 right-0 h-screen w-full md:w-[600px] bg-[#0b0b0b] z-[70] p-12 md:p-24 flex flex-col justify-center"
                        >
                            <div className="flex flex-col gap-6 md:gap-8">
                                {/* Home */}
                                <motion.div custom={0} variants={linkVariants} onClick={() => setIsOpen(false)}>
                                    <TransitionLink href="/" className="text-5xl md:text-7xl font-sans font-bold text-[#F4F3EC] hover:text-[#ff4d00] transition-colors">
                                        Home
                                    </TransitionLink>
                                </motion.div>

                                {/* Projects Accordion */}
                                <motion.div custom={1} variants={linkVariants} className="flex flex-col">
                                    <button
                                        onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                                        className="text-5xl md:text-7xl font-sans font-bold text-[#F4F3EC] hover:text-[#ff4d00] transition-colors text-left flex items-center gap-4"
                                    >
                                        Projects
                                        <motion.span
                                            animate={{ rotate: isProjectsOpen ? 180 : 0 }}
                                            className="text-2xl md:text-4xl opacity-50"
                                        >
                                            ↓
                                        </motion.span>
                                    </button>

                                    <AnimatePresence>
                                        {isProjectsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden flex flex-col gap-4 pl-4 md:pl-8 mt-4 border-l-2 border-white/10"
                                            >
                                                {projectSubLinks.map((p, i) => (
                                                    <div key={p.name} onClick={() => setIsOpen(false)}>
                                                        <TransitionLink
                                                            href={p.href}
                                                            className="text-2xl md:text-4xl font-sans font-medium text-[#F4F3EC]/70 hover:text-[#ff4d00] transition-colors py-1"
                                                        >
                                                            {p.name}
                                                        </TransitionLink>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* About */}
                                <motion.div custom={2} variants={linkVariants} onClick={() => setIsOpen(false)}>
                                    <TransitionLink href="/about" className="text-5xl md:text-7xl font-sans font-bold text-[#F4F3EC] hover:text-[#ff4d00] transition-colors">
                                        About
                                    </TransitionLink>
                                </motion.div>

                                {/* Contact */}
                                <motion.div custom={3} variants={linkVariants} onClick={() => setIsOpen(false)}>
                                    <a
                                        href="mailto:daantaylor02@gmail.com"
                                        className="text-5xl md:text-7xl font-sans font-bold text-[#F4F3EC] hover:text-[#ff4d00] transition-colors"
                                    >
                                        Contact
                                    </a>
                                </motion.div>
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between text-[#F4F3EC]/50 font-sans font-bold text-xs uppercase tracking-widest">
                                <span>Taylor Daan</span>
                                <span>© 2026</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
