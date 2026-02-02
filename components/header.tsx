"use client"

import Link from "next/link"
import { Search, Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b border-brown-100/20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
           <div className="w-10 h-10 bg-banner flex items-center justify-center text-white font-serif text-2xl font-bold rounded-sm">
             B
           </div>
           <span className="font-serif text-2xl tracking-tight text-brown-900">Brown University</span>
        </Link>

        <div className="flex items-center gap-6 text-brown-800">
           <button aria-label="Search" className="hover:text-banner transition-colors">
             <Search className="w-5 h-5" />
           </button>
           <button className="flex items-center gap-2 hover:text-banner transition-colors font-medium text-sm uppercase tracking-wide">
             <Menu className="w-5 h-5" />
             <span>Menu</span>
           </button>
        </div>
      </div>
    </header>
  )
}
