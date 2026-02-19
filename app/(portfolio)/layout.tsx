"use client";

import LenisProvider from "@/app/LenisProvider";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <LenisProvider>
            {children}
        </LenisProvider>
    );
}
