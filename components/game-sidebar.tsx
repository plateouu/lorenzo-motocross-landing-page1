"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CATEGORIES = [
    { label: "Games", icon: "✨" },
];

function SidebarContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get("filter");

    return (
        <div className="w-64 flex flex-col h-full bg-[#111] text-white font-comic shrink-0">
            <div className="p-8 pb-4">
                <Link href="/hub" className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors">
                    Game Hub
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-1">
                {CATEGORIES.map((cat) => {
                    const isActive = currentFilter === cat.label;

                    // Roundings and background logic
                    return (
                        <Link
                            key={cat.label}
                            href={`/hub?filter=${cat.label}`}
                            className={`
                w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all
                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                                }
              `}
                        >
                            <span className="text-lg">{cat.icon}</span>
                            <span>{cat.label}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto p-8 text-xs text-gray-600 font-medium">
                ©2026 Game Hub
            </div>
        </div>
    );
}

export function GameSidebar() {
    return (
        <Suspense fallback={<div className="w-64 bg-[#111]" />}>
            <SidebarContent />
        </Suspense>
    )
}
