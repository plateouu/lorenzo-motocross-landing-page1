"use client"

import { useEffect, useState } from "react"

const PARSEC_URL = "https://web.parsec.app/"

export default function ParsecLauncher() {
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    const w = window.screen.availWidth
    const h = window.screen.availHeight

    const win = window.open(
      "about:blank",
      "_blank",
      `popup=yes,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${w},height=${h},left=0,top=0`
    )

    if (!win) {
      setBlocked(true)
      return
    }

    win.opener = null
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

    win.location.replace(PARSEC_URL)

    window.location.replace("https://classroom.google.com")
  }, [])

  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans">
        <div className="text-center space-y-4">
          <p className="text-sm font-bold tracking-widest uppercase text-red-500">
            Popup Blocked
          </p>
          <a className="text-xs text-gray-500 underline" href={PARSEC_URL}>
            Open Parsec Web
          </a>
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
