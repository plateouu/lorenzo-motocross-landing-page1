"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu } from "lucide-react"

export default function StickyHeader() {
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-black/5" : "py-8 bg-transparent"
                }`}
        >
            <div className="px-6 md:px-12 flex items-center justify-between max-w-[1800px] mx-auto">
                <div className="w-12 h-12" /> {/* Spacer */}

                <Link href="/" className="text-xl font-serif tracking-tight hover:opacity-70 transition-opacity">
                    TAYLOR DAAN
                </Link>

                <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
                    <Menu className="w-5 h-5" />
                </button>
            </div>
        </header>
    )
}
