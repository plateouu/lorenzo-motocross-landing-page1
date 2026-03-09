"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Printer, 
  Download, 
  BookOpen, 
  AlertCircle, 
  Activity, 
  Target, 
  GitMerge, 
  CheckCircle2,
  AlertTriangle,
  FileText
} from "lucide-react";

export default function StatsCheatSheet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 font-sans print:bg-white print:text-black">
      {/* Print-only Header */}
      <div className="hidden print:block mb-8 text-center border-b border-black pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-black">Statistics Final Exam Cheat Sheet</h1>
        <p className="text-gray-600 mt-2">Essential Formulas & Logic Shortcuts</p>
      </div>

      {/* Interactive Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl print:hidden">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">Stats Master</h1>
              <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase">Exam Cheat Sheet</p>
            </div>
          </div>
          
          <button 
            onClick={handlePrint}
            className="group relative flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          >
            <Printer className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Save as PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 print:p-0 print:m-0">
        
        {/* Intro Section - Screen Only */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center print:hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            <span>Targeted High-Yield Concepts</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 tracking-tight leading-tight mb-6 mt-2">
            The Ultimate <br /> Statistics Survival Guide
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The exact formulas, logical frameworks, and simplified explanations you need to ace your final test. Zero fluff. Pure mechanics.
          </p>
        </motion.div>

        {/* CSS to control print page breaks */}
        <div className="print:block" style={{ pageBreakInside: "auto" }}>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block"
          >
            {/* 1. Mutually Exclusive vs Independent */}
            <motion.section variants={itemVariants} className="lg:col-span-2 relative group print:mb-8 print:break-inside-avoid">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 print:hidden" />
              <div className="relative p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm print:border-black print:bg-white print:p-0 print:border-0">
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 print:bg-transparent print:text-black print:p-0">
                    <GridIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white print:text-black">1. Mutually Exclusive vs. Independent</h3>
                </div>
                
                <p className="text-zinc-400 mb-6 print:text-gray-700">These are the most heavily tested concepts (Q1, Q5, Q6). They are completely different things. <strong>The Golden Rule:</strong> If events actually happen (Prob &gt; 0), they <strong>cannot be both</strong>. If they are mutually exclusive, knowing A happened means B definitely has a 0% chance—so they impacted each other (dependent).</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4 mb-8">
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 print:border-gray-300 print:bg-gray-50">
                    <h4 className="font-bold text-red-400 mb-2 print:text-black flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 print:bg-black" />
                      Mutually Exclusive (Disjoint)
                    </h4>
                    <p className="text-sm text-zinc-400 mb-4 print:text-gray-700">They cannot happen at the same time. The overlap is zero.</p>
                    <div className="bg-zinc-900 rounded-xl p-3 font-mono text-center text-blue-300 border border-zinc-800 print:bg-white print:border-gray-200 print:text-black">
                      P(A ∩ B) = 0
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 print:border-gray-300 print:bg-gray-50">
                    <h4 className="font-bold text-emerald-400 mb-2 print:text-black flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 print:bg-black" />
                      Independent
                    </h4>
                    <p className="text-sm text-zinc-400 mb-4 print:text-gray-700">One happening does not change the probability of the other.</p>
                    <div className="bg-zinc-900 rounded-xl p-3 font-mono text-center text-emerald-300 border border-zinc-800 flex flex-col gap-2 print:bg-white print:border-gray-200 print:text-black">
                      <span>P(A|B) = P(A)</span>
                      <span className="text-zinc-600 text-xs">OR</span>
                      <span>P(A ∩ B) = P(A) · P(B)</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-bold text-white print:text-black mb-4">The 4 Cases (Like in Q1):</h4>
                <div className="space-y-3">
                  <CaseRow num="1" title="Mutually Exclusive, NOT Independent" desc="They don't overlap (P(A ∩ B) = 0), so they impact each other." />
                  <CaseRow num="2" title="Independent, NOT Mutually Exclusive" desc="They don't impact each other (P(A ∩ B) = P(A) · P(B)), so they MUST overlap." />
                  <CaseRow num="3" title="NEITHER" desc="They overlap, but the overlap doesn't equal their individual probabilities multiplied." />
                  <CaseRow num="4" title="BOTH" desc="Impossible (unless one event has a 0% chance)." isLast />
                </div>
              </div>
            </motion.section>

            {/* 2. General Addition Rule */}
            <motion.section variants={itemVariants} className="p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0 print:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400 print:bg-transparent print:text-black print:p-0">
                  <GitMerge className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">2. General Addition Rule (A OR B)</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4 print:text-gray-700">
                Add the two probabilities together, but subtract the overlap so you don't count it twice. Use this for <strong>"OR"</strong> questions (Q7).
              </p>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 font-mono text-center text-lg text-orange-300 print:bg-gray-100 print:border-gray-300 print:text-black">
                P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
              </div>
            </motion.section>

            {/* 3. Conditional Probability */}
            <motion.section variants={itemVariants} className="p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0 print:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 print:bg-transparent print:text-black print:p-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">3. Conditional Probability</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4 print:text-gray-700">
                The probability of A, assuming B is already a guarantee. Keywords: <strong>"Given that..."</strong> (Q2, Q7, Q8, Q10). Divide the overlap by the condition that already happened.
              </p>
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 font-mono text-center text-lg text-pink-300 print:bg-gray-100 print:border-gray-300 print:text-black">
                P(A|B) = P(A ∩ B) / P(B)
              </div>
            </motion.section>

            {/* 4. General Multiplication Rule */}
            <motion.section variants={itemVariants} className="p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0 print:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 print:bg-transparent print:text-black print:p-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">4. Multiplication Rule (A AND B)</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4 print:text-gray-700">
                Just the conditional formula rearranged. It works to find the overlap for ANY two events, even if they depend on each other.
              </p>
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 font-mono text-center text-lg text-indigo-300 print:bg-gray-100 print:border-gray-300 print:text-black">
                P(A ∩ B) = P(A|B) · P(B)
              </div>
            </motion.section>

            {/* 5. "In a Row" & "At Least One" */}
            <motion.section variants={itemVariants} className="p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0 print:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 print:bg-transparent print:text-black print:p-0">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">5. "In a Row" & "At Least"</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white print:text-black mb-1">Consecutive Events (Q3, Q9e)</h4>
                  <p className="text-xs text-zinc-400 mb-2 print:text-gray-700">Same thing happening $n$ times in a row.</p>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-center text-yellow-300 print:bg-gray-50 print:border-gray-300 print:text-black">
                    P(event n times) = P(A)ⁿ
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white print:text-black mb-1">At Least One Rule (Q4, Q9f, EC)</h4>
                  <p className="text-xs text-zinc-400 mb-2 print:text-gray-700">The complement of getting "none". Way easier mathematically.</p>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-center text-yellow-300 print:bg-gray-50 print:border-gray-300 print:text-black">
                    P(at least one) = 1 - P(none)ⁿ
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 6. Reversing Conditions */}
            <motion.section variants={itemVariants} className="lg:col-span-2 p-8 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0 print:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 print:bg-transparent print:text-black print:p-0">
                  <GitMerge className="w-6 h-6 rotate-90" />
                </div>
                <h3 className="text-xl font-bold text-white print:text-black">6. Reversing Conditions (Tree Diagrams)</h3>
              </div>
              <p className="text-zinc-400 mb-4 print:text-gray-700">
                Used when you are given <code>P(A|B)</code> but the question asks for <code>P(B|A)</code> (Like Question 10b). You build a tree diagram and divide the <strong>specific path you want</strong> by the <strong>total probability of all paths</strong> that lead to that outcome.
              </p>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-mono text-center text-emerald-300 flex flex-col gap-3 print:bg-gray-100 print:border-gray-300 print:text-black">
                <div>P(B|A) = (Probability of the specific path you want) / (Sum of all paths ending in A)</div>
                <div className="text-sm text-emerald-400/80 print:text-gray-600">P(B|A) = P(B ∩ A) / [ P(A₁ ∩ B) + P(A₂ ∩ B) + P(A₃ ∩ B) ]</div>
              </div>
            </motion.section>

            {/* 7 & 8 Additional Strategies */}
            <motion.section variants={itemVariants} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 print:block">
              
              {/* Two-Way Tables */}
              <div className="p-6 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0 print:mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-cyan-400 print:text-black" />
                  <h4 className="font-bold text-white print:text-black text-lg">Two-Way Tables (Q8)</h4>
                </div>
                <ul className="space-y-3 text-sm text-zinc-400 list-disc pl-5 print:text-gray-700">
                  <li><strong>Conditional P(A|B):</strong> The condition limits the denominator. Only look at that specific row/column total!</li>
                  <li><strong>Testing Independence:</strong> Check if <code>P(A|B) = P(A)</code> across the entire table. If they match, they are independent.</li>
                  <li><strong>OR statement:</strong> <code>P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</code>. Find A total + B total, minus the cell where they overlap.</li>
                </ul>
              </div>

              {/* Normal Curves */}
              <div className="p-6 rounded-3xl border border-zinc-800/50 bg-zinc-900/50 print:break-inside-avoid print:border-black print:bg-white print:p-0 print:border-0">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-rose-400 print:text-black" />
                  <h4 className="font-bold text-white print:text-black text-lg">Normal Distributions (Q9)</h4>
                </div>
                <ul className="space-y-3 text-sm text-zinc-400 list-disc pl-5 print:text-gray-700">
                  <li><strong>Normalcdf(lower, upper, $\mu$, $\sigma$):</strong> Finds the probability of landing between two numbers.</li>
                  <li><strong>InvNorm(area, $\mu$, $\sigma$):</strong> Finds the actual value (e.g., dollars or weight) when given a percentage.</li>
                  <li><strong>"Top 11%":</strong> The calculator usually reads from left to right. Top 11% means the area is <code>0.89</code> below it.</li>
                </ul>
              </div>
            </motion.section>

          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-zinc-600 text-sm print:hidden pb-12">
          Prepared for optimal testing success. Good luck. 
        </div>

      </main>
    </div>
  );
}

// Subcomponents
const GridIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
);

const CaseRow = ({ num, title, desc, isLast }: { num: string, title: string, desc: string, isLast?: boolean }) => (
  <div className={`p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center bg-zinc-950/50 border border-zinc-800/50 print:bg-white print:border-gray-200 print:p-3`}>
    <div className="flex-none w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold print:bg-gray-100 print:text-black text-sm">
      {num}
    </div>
    <div>
      <h5 className="font-bold text-white print:text-black text-sm">{title}</h5>
      <p className="text-zinc-400 text-sm mt-0.5 print:text-gray-700">{desc}</p>
    </div>
  </div>
);
