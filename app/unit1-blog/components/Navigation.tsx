"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "./TransitionLink";

const LINKS = [
  { name: "Home", href: "/unit1-blog" },
  { name: "The Reading", href: "/unit1-blog/post" },
  { name: "Reflection", href: "/unit1-blog/reflection" },
  { name: "Purpose", href: "/unit1-blog/about-blog" },
  { name: "Author", href: "/unit1-blog/about-author" },
  { name: "Works Cited", href: "/unit1-blog/works-cited" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-8 md:px-12 flex justify-between items-center text-[#131211]">
        <TransitionLink
          href="/unit1-blog"
          className="text-xl md:text-2xl tracking-tighter font-black hover:-translate-y-1 transition-transform"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          overthinking.
        </TransitionLink>

        {/* High-contrast Light Circular Neo-brutalist button */}
        <button 
          onClick={toggleMenu}
          className="bg-[#ff3b30] text-[#f3efe0] text-sm uppercase tracking-widest font-black px-8 py-3 rounded-full border-[3px] border-[#131211] transition-transform hover:-translate-y-1 shadow-[5px_5px_0px_#131211] active:translate-y-0 active:shadow-none"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-40 bg-[#f3efe0] overflow-y-auto"
          >
            {/* Background decorative circles */}
            <div className="fixed top-10 left-10 w-32 h-32 border-[4px] border-[#131211] rounded-full opacity-20 pointer-events-none z-0" />
            <div className="fixed bottom-20 right-20 w-64 h-64 bg-[#ff3b30] border-[4px] border-[#131211] rounded-full opacity-20 pointer-events-none z-0" />

            <div className="min-h-[100svh] w-full flex flex-col justify-center items-center py-28 px-4 relative z-10">
              <nav className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full">
                {LINKS.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl sm:text-2xl md:text-5xl lg:text-6xl font-black tracking-tighter transition-all duration-300 py-3 sm:py-4 px-6 sm:px-10 rounded-[40px] border-[3px] sm:border-[4px] border-[#131211] text-center max-w-[85vw] ${
                      pathname === link.href 
                        ? "bg-[#ff3b30] text-[#f3efe0] shadow-[6px_6px_0px_#131211] rotate-[-2deg]" 
                        : "bg-[#f3efe0] text-[#131211] hover:bg-[#131211] hover:text-[#f3efe0] hover:shadow-[6px_6px_0px_#ff3b30]"
                    }`}
                    style={{ fontFamily: 'var(--font-space)' }}
                  >
                    {link.name}
                  </TransitionLink>
                ))}
              </nav>
              
              <div className="mt-12 font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest bg-[#131211] text-[#f3efe0] px-6 py-3 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#ff3b30] rotate-2" style={{ fontFamily: 'var(--font-space)' }}>
                Taylor Daan / Unit 1
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
