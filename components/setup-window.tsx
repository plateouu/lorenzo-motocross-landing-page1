"use client"

import React, { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"

interface SetupWindowProps {
  children: React.ReactNode
  onClose?: () => void
}

export const SetupWindow = ({ children, onClose }: SetupWindowProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const windowRef = useRef<Window | null>(null)

  useEffect(() => {
    // Open the popup
    // Open the popup fullscreen-ish
    const width = window.screen.availWidth
    const height = window.screen.availHeight
    const left = 0
    const top = 0

    const win = window.open(
      "about:blank",
      "SetupWindow", // Unique name to target same window if re-opened
      `popup=yes,width=${width},height=${height},left=${left},top=${top}`
    )

    if (!win) {
       // Popup blocked handling usually done by parent, but we can't render children if blocked.
       // We'll let the parent handle the "retry" UI if container is null.
       return
    }

    windowRef.current = win

    // Setup document in popup
    win.document.title = "Desmos | Graphing Calculator"

    // Favicon for Desmos Disguise
    const link = win.document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/x-icon'
    link.href = window.location.origin + '/desmos/favicon.ico'
    win.document.head.appendChild(link)
    
    // Copy styles from parent to ensure Tailwind and Globals work
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    styles.forEach((style) => {
        win.document.head.appendChild(style.cloneNode(true))
    })

    // Create container
    const div = win.document.createElement("div")
    div.id = "setup-root"

    // CRITICAL: Inherit fonts by copying classes from parent HTML and BODY
    if (document.documentElement.className) {
      win.document.documentElement.className = document.documentElement.className
    }
    if (document.body.className) {
      win.document.body.className = document.body.className
    }

    // Apply classes to wrapper div as well for good measure
    div.className = "min-h-screen bg-[#FBFBFD] flex items-center justify-center p-4"
    win.document.body.appendChild(div)

    // Ensure body background is also set to match
    win.document.body.style.margin = "0"
    win.document.body.style.backgroundColor = "#FBFBFD"

    setContainer(div)

    // Handle close
    const checkClosed = setInterval(() => {
      if (win.closed) {
        clearInterval(checkClosed)
        onClose?.()
      }
    }, 500)

    // Cleanup
    return () => {
      clearInterval(checkClosed)
      if (win && !win.closed) {
        win.close()
      }
    }
  }, []) // Run once on mount

  return container ? createPortal(children, container) : null
}
