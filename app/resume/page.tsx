"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const RESUME_SECTIONS = [
  {
    title: "Research Experience",
    items: [
      {
        role: "Research Assistant",
        organization: "Stanford University",
        department: "Stefano Ermon - Computer Science",
        period: "Current",
        description: "Research in machine learning and artificial intelligence under Professor Stefano Ermon.",
      },
      {
        role: "Research Assistant",
        organization: "Mantis AI",
        department: "Kellis Lab - MIT",
        period: "Current",
        description: "Research in computational biology and AI applications at the Kellis Laboratory, Massachusetts Institute of Technology.",
      },
    ],
  },
  {
    title: "Projects & Entrepreneurship",
    items: [
      {
        role: "Owner & Founder",
        organization: "PlateouMC",
        department: "plateoumc.xyz",
        period: "2021 — Current",
        description: "Currently restarting operations. Full-stack development of custom Java server infrastructure with advanced networking and sharding solutions.",
      },
    ],
  },
]

export default function ResumePage() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    window.print()
    setTimeout(() => setIsPrinting(false), 1000)
  }

  return (
    <div className={`min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans ${isPrinting ? 'print-mode' : ''}`}>
      <div className="max-w-4xl mx-auto p-8 md:p-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 pb-8 border-b border-[#F5F5F7]"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter mb-2">Resume</h1>
              <p className="text-[#8E8E93] font-medium uppercase tracking-widest text-[10px]">Research & Development</p>
            </div>
            <button
              onClick={handlePrint}
              className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] hover:text-[#1D1D1F] transition-colors px-4 py-2 modern-border hover:modern-shadow"
            >
              Print / Export
            </button>
          </div>
        </motion.div>

        {/* Resume Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-16"
        >
          {RESUME_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight border-b-2 border-[#1D1D1F] pb-2">
                {section.title}
              </h2>
              
              <div className="space-y-12">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + itemIndex * 0.1 }}
                    className="bg-white p-8 modern-border modern-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold tracking-tight mb-1">{item.role}</h3>
                        <p className="text-lg font-medium text-[#1D1D1F]/80 mb-1">{item.organization}</p>
                        <p className="text-sm text-[#8E8E93] font-medium uppercase tracking-wide">{item.department}</p>
                      </div>
                      <div className="text-sm font-bold text-[#8E8E93] uppercase tracking-widest whitespace-nowrap">
                        {item.period}
                      </div>
                    </div>
                    <p className="text-base text-[#1D1D1F]/70 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-32 pt-12 border-t border-[#F5F5F7] text-center text-[#8E8E93]"
        >
          <p className="text-[10px] font-medium uppercase tracking-widest">
            © 2026 Taylor Daan
          </p>
        </motion.div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print-mode {
            background: white;
          }
          button {
            display: none !important;
          }
          .modern-shadow {
            box-shadow: none;
          }
          .modern-border {
            border: 1px solid #e5e5e5;
          }
        }
      `}</style>
    </div>
  )
}

