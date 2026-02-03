'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on client and if matchMedia indicates pointer
        if (typeof window === 'undefined') return;

        // Check if device matches fine pointer
        const isFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!isFinePointer) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        // Move logic
        const moveCursor = (e: MouseEvent) => {
            // Force visibility on first move
            gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });

            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', moveCursor);

        // Hover effects logic
        const handleLinkHover = () => {
            gsap.to(cursor, { scale: 1.5, opacity: 0.5 });
            gsap.to(follower, { scale: 3, opacity: 0.2, backgroundColor: '#ff4d00' });
        };

        const handleLinkLeave = () => {
            gsap.to(cursor, { scale: 1, opacity: 1 });
            gsap.to(follower, { scale: 1, opacity: 1, backgroundColor: 'transparent' });
        };

        // Attach listeners to all interactive elements periodically or via delegate
        // For simplicity, we just look for specific tags
        const links = document.querySelectorAll('a, button, .cursor-pointer');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleLinkHover);
                link.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    // Hide default cursor via CSS mostly, but this component adds the dot
    return (
        <div
            ref={followerRef}
            className="custom-cursor-element fixed -top-5 -left-5 w-4 h-4 bg-[#ff4d00] rounded-full pointer-events-none z-[200000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        />
    );
}
