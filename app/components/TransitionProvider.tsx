'use client';

import React, { createContext, useContext, useMemo, useRef, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LiquidWipe, LiquidWipeHandle } from './LiquidWipe';
import { useLenis } from '../LenisProvider';

const TransitionCtx = createContext<{
    go: (href: string) => Promise<void>;
} | null>(null);

export function useTransitions() {
    const ctx = useContext(TransitionCtx);
    if (!ctx) throw new Error('useTransitions must be used inside TransitionProvider');
    return ctx;
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const wipeRef = useRef<LiquidWipeHandle | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const isCovered = useRef(false); // Track if we manually covered
    const lenis = useLenis();

    useEffect(() => {
        const playTransition = async () => {
            if (lenis) lenis.stop();

            // Case 1: Manual Navigation (we already covered slowly)
            if (isCovered.current) {
                await wipeRef.current?.reveal({ duration: 0.65 });
                isCovered.current = false;
            }
            // Case 2: Back/Forward or Refresh (screen is visible, need to wipe it)
            else {
                // Instant cover to prevent FOUC / ensure Wipe effect starts from black
                await wipeRef.current?.cover({ color: '#221F21', duration: 0 });
                // Small delay to ensure paint, then reveal
                setTimeout(() => {
                    wipeRef.current?.reveal({ duration: 0.65 });
                }, 50);
            }

            if (lenis) lenis.start();
        };

        playTransition();
    }, [pathname, lenis]);

    const value = useMemo(
        () => ({
            go: async (href: string) => {
                if (lenis) lenis.stop();

                // Check if same-page navigation
                if (href === pathname) {
                    // Just do a cycle
                    const colors = ['#ff4d00', '#221F21', '#E1CCFF', '#4c2e08'];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    await wipeRef.current?.cover({ color: randomColor, duration: 1.2 });

                    // Allow router to push (hash change etc)
                    router.push(href);

                    await wipeRef.current?.reveal({ duration: 0.65 });
                    if (lenis) lenis.start();
                    return;
                }

                // Normal Navigation
                const colors = ['#ff4d00', '#221F21', '#E1CCFF', '#4c2e08'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                // 1. Cover
                await wipeRef.current?.cover({ color: randomColor, duration: 1.2 });
                isCovered.current = true; // Mark as covered

                // 2. Navigate (Effect will handle reveal)
                router.push(href);
            },
        }),
        [router, pathname, lenis]
    );

    return (
        <TransitionCtx.Provider value={value}>
            {children}
            <LiquidWipe ref={wipeRef} defaultColor="#0b0b0b" />
        </TransitionCtx.Provider>
    );
}
