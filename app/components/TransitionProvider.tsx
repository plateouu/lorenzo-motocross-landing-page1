'use client';

import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLenis } from '../LenisProvider';

const TransitionCtx = createContext<{
    go: (href: string) => void;
} | null>(null);

export function useTransitions() {
    const ctx = useContext(TransitionCtx);
    if (!ctx) throw new Error('useTransitions must be used inside TransitionProvider');
    return ctx;
}

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        // Reset scroll position on route change
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    const value = useMemo(
        () => ({
            go: (href: string) => {
                if (href === pathname) return;
                router.push(href, { scroll: true });
            },
        }),
        [router, pathname]
    );

    return (
        <TransitionCtx.Provider value={value}>
            {children}
        </TransitionCtx.Provider>
    );
}
