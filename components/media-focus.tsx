"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MediaFocusProps {
    isActive: boolean
    children: React.ReactNode
    className?: string
}

export default function MediaFocus({ isActive, children, className }: MediaFocusProps) {
    return (
        <div
            className={cn("w-full h-full overflow-hidden media-focus-container", className)}
            data-active={isActive}
        >
            <div className="w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
                {children}
            </div>
        </div>
    )
}
