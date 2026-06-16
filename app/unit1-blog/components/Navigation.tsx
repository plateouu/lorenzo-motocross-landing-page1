"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "./TransitionLink";

const MENU_CATEGORIES = [
  {
    title: "Unit 1: Overthinking",
    links: [
      { name: "Home", href: "/unit1-blog" },
      { name: "The Reading", href: "/unit1-blog/post" },
      { name: "Reflection", href: "/unit1-blog/reflection" },
    ]
  },
  {
    title: "Final Exam (Unit 3)",
    links: [
      { name: "Animal Crossing Protest", href: "/unit1-blog/final-exam" },
    ]
  },
  {
    title: "About",
    links: [
      { name: "Purpose", href: "/unit1-blog/about-blog" },
      { name: "Author", href: "/unit1-blog/about-author" },
      { name: "Works Cited", href: "/unit1-blog/works-cited" },
    ]
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className={`top-0 left-0 right-0 z-50 px-6 py-8 md:px-12 flex justify-between items-center text-[#131211] ${isOpen ? "fixed" : "absolute"}`}>
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

            <div className="min-h-screen w-full flex flex-col justify-center items-center pt-24 pb-12 px-4 relative z-10">
              <nav className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mt-8">
                {MENU_CATEGORIES.map((category) => (
                  <div key={category.title} className="flex flex-col items-center md:items-start w-full">
                    <h3 className="text-[#ff3b30] font-black uppercase tracking-widest text-xs md:text-sm mb-4 border-b-[3px] border-[#131211] pb-2 w-full text-center md:text-left" style={{ fontFamily: 'var(--font-space)' }}>
                      {category.title}
                    </h3>
                    <div className="flex flex-col items-center md:items-start gap-3 w-full">
                      {category.links.map((link) => (
                        <TransitionLink
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-lg sm:text-xl md:text-2xl font-black tracking-tighter transition-all duration-300 py-3 px-6 rounded-[20px] border-[3px] border-[#131211] text-center md:text-left w-full ${
                            pathname === link.href 
                              ? "bg-[#ff3b30] text-[#f3efe0] shadow-[4px_4px_0px_#131211] rotate-[-1deg] translate-x-1" 
                              : "bg-[#f3efe0] text-[#131211] hover:bg-[#131211] hover:text-[#f3efe0] hover:shadow-[4px_4px_0px_#ff3b30] hover:-translate-y-1"
                          }`}
                          style={{ fontFamily: 'var(--font-space)' }}
                        >
                          {link.name}
                        </TransitionLink>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
              
              <div className="mt-16 font-black text-[10px] sm:text-xs md:text-sm uppercase tracking-widest bg-[#131211] text-[#f3efe0] px-6 py-3 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#ff3b30] rotate-2" style={{ fontFamily: 'var(--font-space)' }}>
                Taylor Daan / Unit 1
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
