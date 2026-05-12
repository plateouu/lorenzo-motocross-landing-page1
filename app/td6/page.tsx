"use client"

import { useEffect, useState } from "react"

const PROXY_URL = "http://147.135.4.241:3500"

export default function TD6() {
  const [status, setStatus] = useState<"launching" | "blocked">("launching")

  useEffect(() => {
    const w = window.screen.availWidth
    const h = window.screen.availHeight

    const win = window.open(
      "about:blank",
      "_blank",
      `popup=yes,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${w},height=${h},left=0,top=0`
    )

    if (win) {
      win.document.title = "Google Classroom"
      win.document.body.style.margin = "0"
      win.document.body.style.height = "100vh"
      win.document.body.style.overflow = "hidden"
      win.document.body.style.backgroundColor = "#fff"

      const link = win.document.createElement("link")
      link.rel = "icon"
      link.type = "image/x-icon"
      link.href = window.location.origin + "/classroom/default.ico"
      win.document.head.appendChild(link)

      const iframe = win.document.createElement("iframe")
      iframe.style.border = "none"
      iframe.style.width = "100vw"
      iframe.style.height = "100vh"
      iframe.src = PROXY_URL
      iframe.allow =
        "fullscreen; camera; microphone; display-capture; clipboard-read; clipboard-write; autoplay"
      win.document.body.appendChild(iframe)

      setTimeout(() => {
        window.location.href = "https://classroom.google.com"
      }, 150)
    } else {
      setStatus("blocked")
    }
  }, [])

  if (status === "blocked") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans">
        <div className="text-center space-y-4">
          <p className="text-sm font-bold tracking-widest uppercase text-red-500">
            Popup Blocked
          </p>
          <p className="text-xs text-gray-500">
            Allow popups for this site and reload.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  )
}
