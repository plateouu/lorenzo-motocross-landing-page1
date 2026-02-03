'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const isFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!isFinePointer) return;

        const follower = followerRef.current;
        if (!follower) return;

        const moveCursor = (e: MouseEvent) => {
            const isHidden = document.body.classList.contains('cursor-hidden');
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                autoAlpha: isHidden ? 0 : 1,
                duration: 0.1,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        window.addEventListener('mousemove', moveCursor);

        const handleLinkHover = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            if (target.classList.contains('project-link')) {
                gsap.to(follower, { autoAlpha: 0, scale: 0.5 });
            } else {
                gsap.to(follower, { scale: 2, backgroundColor: '#ff4d00', opacity: 0.5 });
            }
        };

        const handleLinkLeave = () => {
            gsap.to(follower, { scale: 1, backgroundColor: '#ff4d00', opacity: 0.3, autoAlpha: 1 });
        };

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

    return (
        <div
            ref={followerRef}
            className="custom-cursor-follower fixed top-0 left-0 w-8 h-8 bg-[#ff4d00] rounded-full pointer-events-none z-[200000] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply opacity-0"
            style={{ opacity: 0.1 }}
        />
    );
}
