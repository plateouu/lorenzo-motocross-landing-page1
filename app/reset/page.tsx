"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getUserConfig, saveUserConfig } from "../actions"

function ResetContent() {
  const router = useRouter()
  // "loading" -> "tutorial" (First time) OR "resetting" (Returning - AUTO RESET)
  const [viewState, setViewState] = useState<"loading" | "tutorial" | "resetting">("loading")

  useEffect(() => {
    // Check local flag (set immediately after setup)
    const justCompletedUsingLocal = localStorage.getItem("reset_tutorial_pending")
    
    if (justCompletedUsingLocal === "true") {
         setViewState("tutorial")
      localStorage.removeItem("reset_tutorial_pending")
    } else {
      // RETURNING USER: Auto-Reset immediately
      setViewState("resetting")

      // Trigger the reset (mimic original code delay for effect, or instant?)
      // "it should just automatiaclly reset confiuraiotn"
      // "resetting should not bring u to the key page"
      localStorage.removeItem("target_link")
      localStorage.removeItem("tab-disguise-settings")

      const timer = setTimeout(() => {
        router.push("/studyguide")
         }, 1000) // Short delay to show updated "Pulse" UI if needed, or consistent with old code
      return () => clearTimeout(timer)
    }
  }, [router])

  const handleLaunch = () => {
    // Just go to studyguide, which launches if config exists
    // BUT wait, this is the First Time Setup flow.
    // Does the user want to Auto-Launch here?
    // Usually "Launch Tool" button does that.
    router.push("/studyguide")
  }

  if (viewState === "loading") return null

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center p-4 text-[#1D1D1F] font-sans selection:bg-blue-100 selection:text-blue-900 text-center relative overflow-hidden">

      <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-50 expressive-blur -z-10" />

      {/* Swipe Reveal Animation */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-0 bg-[#000] z-[9999] pointer-events-none"
      />

      {viewState === "resetting" ? (
        // === AUTO-RESET VIEW (Returning User) ===
        <div className="space-y-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-[#E5E5E5] border-t-blue-600 rounded-full animate-spin mx-auto mb-8" />
          <p className="text-xs text-[#8E8E93] tracking-widest uppercase font-medium">Resetting Configuration...</p>
        </div>
      ) : (
      // === TUTORIAL VIEW (First Time Only) ===
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }} // Wait for swipe to reveal
            className="max-w-md w-full bg-white modern-border p-8 rounded-sm shadow-xl space-y-6"
          >
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                {/* Bookmark Icon */}
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-widest text-[#1D1D1F] uppercase">Ready</h1>
              <div className="bg-[#F5F5F7] px-4 py-3 rounded-sm border border-[#E5E5E5] flex flex-col items-center gap-1 w-full">
                <span className="text-[10px] text-[#8E8E93] uppercase tracking-widest font-bold">BOOKMARK this page</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-[#1D1D1F] font-bold">PRESS CTRL + D</span>
                </div>
              </div>
            </div>

            <button
                onClick={handleLaunch}
                className="w-full bg-[#1D1D1F] text-white py-4 text-sm font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] rounded-sm shadow-lg"
            >
                Launch Tool
            </button>
        </motion.div>
      )}
    </div>
  )
}

export default function Reset() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFBFD]" />}>
      <ResetContent />
    </Suspense>
  )
}
