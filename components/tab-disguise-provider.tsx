"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export type DisguisePreset = "desmos" | "ap_classroom" | "google_classroom" | "google_forms" | "google_docs" | "custom"

export interface DisguiseSettings {
  preset: DisguisePreset
  customTitle?: string
  customIcon?: string
}

export const PRESETS = {
  desmos: {
    title: "Desmos | Graphing Calculator",
    icon: "/desmos/favicon.ico",
    redirectUrl: "https://www.desmos.com/calculator"
  },
  ap_classroom: {
    title: "AP Classroom",
    icon: "/collegeboards/favicon_0.ico",
    redirectUrl: "https://apclassroom.collegeboard.org"
  },
  google_classroom: {
    title: "Classes",
    icon: "/classroom/default.ico",
    redirectUrl: "https://classroom.google.com"
  },
  google_forms: {
    title: "Google Forms",
    icon: "/google_forms/docs.google.com_favicon_16x16.ico",
    redirectUrl: "https://docs.google.com/forms"
  },
  google_docs: {
    title: "Google Docs",
    icon: "/google_docs/docs.google.com_favicon_16x16 (1).ico",
    redirectUrl: "https://docs.google.com/document"
  },
  custom: {
    title: "Google",
    icon: "/favicon.ico",
    redirectUrl: "https://www.google.com"
  },
}

export function TabDisguiseProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<DisguiseSettings>({ preset: "desmos" })

  useEffect(() => {
    // Load settings from localStorage on mount
    const saved = localStorage.getItem("tab-disguise-settings")
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse disguise settings", e)
      }
    }

    // Listen for storage events to sync across tabs (optional) or updates
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "tab-disguise-settings" && e.newValue) {
        setSettings(JSON.parse(e.newValue))
      }
    }
    window.addEventListener("storage", handleStorage)
    
    // Custom event for immediate updates within the same tab
    const handleUpdate = (e: CustomEvent<DisguiseSettings>) => {
      setSettings(e.detail)
    }
    window.addEventListener("tab-disguise-update" as any, handleUpdate as any)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("tab-disguise-update" as any, handleUpdate as any)
    }
  }, [])

  const pathname = usePathname()

  useEffect(() => {
    // TOOL PAGES (Disguised)
    // Only apply the "Desmos" disguise to these specific routes.
    // All other routes (Homepage, Portfolio, Schools) should use their natural Next.js metadata ("Taylor Daan").
    const toolRoutes = ["/studyguide", "/reset", "/admin", "/hub", "/2030103030"]
    const isToolPage = toolRoutes.some(route => pathname?.startsWith(route))

    if (!isToolPage) {
      // If we are on a portfolio page, explicitly restore the portfolio defaults just in case
      document.title = "Taylor Daan"
      const existingFavicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']")
      if (existingFavicon) {
        existingFavicon.href = "/favicon.ico"
      }
      return
    }

    // Apply settings
    // USER REQUIREMENT: Main window must ALWAYS be "Desmos | Graphing Calculator" for tool pages.
    const title = PRESETS.desmos.title
    const icon = PRESETS.desmos.icon

    document.title = title

    // Update favicon
    const existingFavicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']")
    if (existingFavicon) {
      existingFavicon.href = icon
    } else {
      const newFavicon = document.createElement("link")
      newFavicon.rel = "icon"
      newFavicon.href = icon
      document.head.appendChild(newFavicon)
    }

  }, [settings, pathname])

  return <>{children}</>
}
