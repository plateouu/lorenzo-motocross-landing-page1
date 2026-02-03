'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
    title: string;
    color: string;
    image?: string;
    images?: string[];
    hideOverlay?: boolean;
    aspect?: string;
};

export default function ProjectPreview({
    project,
    cursorPos
}: {
    project: Project;
    cursorPos: { x: number; y: number };
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!project.images || project.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }, 1500); // 1.5s slide duration (slower)

        return () => clearInterval(interval);
    }, [project]);

    // Determine which image to show
    const activeImage = project.images ? project.images[currentImageIndex] : project.image;

    // Dimensions based on aspect
    const isSquare = project.aspect === 'square';
    const width = isSquare ? 200 : 250;
    const height = isSquare ? 200 : 160;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} // Stronger blur start
            animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                x: cursorPos.x,
                y: cursorPos.y
            }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-0 h-0 z-50 pointer-events-none hidden md:block" // Wrapper
        >
            <div
                className={`rounded-xl overflow-hidden shadow-2xl relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}
                style={{
                    backgroundColor: project.color,
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <AnimatePresence mode="popLayout">
                    {activeImage && (
                        <motion.img
                            key={activeImage}
                            src={activeImage}
                            alt={project.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                </AnimatePresence>

                {/* Fallback Text - Only if NOT hidden */}
                {!project.hideOverlay && (
                    <div className="absolute inset-0 flex items-center justify-center font-display italic text-2xl opacity-40 bg-black/10 mix-blend-multiply z-10">
                        {project.title}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
