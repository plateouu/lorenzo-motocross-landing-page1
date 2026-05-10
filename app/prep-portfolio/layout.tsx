"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV = [
  { href: "/prep-portfolio", label: "Home" },
  { href: "/prep-portfolio/inquiry", label: "The Inquiry" },
  { href: "/prep-portfolio/literature", label: "Literature" },
  { href: "/prep-portfolio/methodology", label: "Methodology" },
  { href: "/prep-portfolio/findings", label: "Findings" },
  { href: "/prep-portfolio/reflection", label: "Reflection" },
  { href: "/prep-portfolio/process", label: "Process" },
  { href: "/prep-portfolio/artifacts", label: "Artifacts" },
]

export default function PrepLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div
      className="min-h-screen bg-white text-black flex flex-col"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center justify-center">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-2 ${
                pathname === href
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {children}
      </main>

      <footer className="py-6 text-center text-xs text-gray-400">
        Taylor Daan · AP Research · Dr. Kenny · 2026
      </footer>
    </div>
  )
}
