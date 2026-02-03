"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";

type LenisCtx = {
    lenis: Lenis | null;
};

const LenisContext = createContext<LenisCtx>({ lenis: null });

export function useLenis() {
    return useContext(LenisContext).lenis;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = React.useState<Lenis | null>(null);

    useEffect(() => {
        const newLenis = new Lenis({
            autoRaf: false,
            smoothWheel: true,
            lerp: 0.1,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        setLenis(newLenis);

        let rafId = 0;
        const raf = (time: number) => {
            newLenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            newLenis.destroy();
            setLenis(null);
        };
    }, []);

    const value = useMemo(() => ({ lenis }), [lenis]);

    return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
