"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { validateKey, generateKey, revokeKey, getAdminStats, updateKeyNote, saveUserConfig, getUserConfig } from "../actions"
import { PRESETS, DisguisePreset, DisguiseSettings } from "@/components/tab-disguise-provider"
import { SetupWindow } from "@/components/setup-window"

// Fixed duplicate icons and keys
const CLASSROOM_ICONS = [
  { label: "Default", value: "/classroom/default.ico" },
  { label: "Blue", value: "/classroom/blue.ico" },
  { label: "Aqua", value: "/classroom/aqua.ico" },
  { label: "Orange", value: "/classroom/orange.ico" },
  { label: "Purple", value: "/classroom/purple.ico" },
  { label: "Black", value: "/classroom/black.ico" },
]

// --- SEPARATED SETUP FORM COMPONENT ---
// Defined outside to prevent re-render focus loss
interface SetupFormProps {
  currentSettings: DisguiseSettings
  setCurrentSettings: React.Dispatch<React.SetStateAction<DisguiseSettings>>
  hasSelected: boolean
  updatePreset: (preset: DisguisePreset) => void
  linkInput: string
  setLinkInput: (val: string) => void
  handleSetup: (e: React.FormEvent) => void
  hideBookmarkHint: boolean
  setError: (val: boolean) => void
}

const SetupForm = ({
  currentSettings,
  setCurrentSettings,
  hasSelected,
  updatePreset,
  linkInput,
  setLinkInput,
  handleSetup,
  hideBookmarkHint,
  setError
}: SetupFormProps) => {
  const [isExiting, setIsExiting] = useState(false)

  /* Safety Fallback */
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        handleSetup({ preventDefault: () => { } } as React.FormEvent)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isExiting, handleSetup])

  const onInitialize = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasSelected) {
      setError(true)
      return
    }
    // Fix "Frozen" state: Validate link BEFORE starting animation
    if (linkInput.length <= 3) {
      setError(true)
      return
    }

    // Trigger Animation
    setIsExiting(true)
    // Animation completion triggers handleSetup via callback
  }

  return (
    <>
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#000] z-[9999] flex items-center justify-center pointer-events-auto"
            onAnimationComplete={() => handleSetup({ preventDefault: () => { } } as React.FormEvent)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white font-bold tracking-[0.5em] text-2xl uppercase"
            >
              Initializing
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={onInitialize} className="w-full max-w-lg bg-white modern-border shadow-2xl rounded-sm relative z-10 flex flex-col overflow-hidden">
        {/* Header removed as requested */}

        <div className="p-8 space-y-8">
          {/* Section 1: Appearance */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold tracking-[0.2em] text-[#1D1D1F] uppercase">
                Disguise Profile <span className="text-red-500">*</span>
              </label>
              <p className="text-[10px] text-[#8E8E93] leading-relaxed">
                Select how this tab will appear in browser history and title bar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(PRESETS) as DisguisePreset[]).filter(k => k !== 'custom').map((preset) => (
                <div
                  key={preset}
                  onClick={() => updatePreset(preset)}
                  className={`
                                    cursor-pointer p-4 border rounded-sm text-xs font-bold uppercase tracking-wider text-center transition-all duration-200
                                    ${currentSettings.preset === preset && hasSelected
                      ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-lg transform scale-[1.02]"
                      : "bg-white text-[#8E8E93] border-[#E5E5E5] hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50"
                    }
                                `}
                >
                  {PRESETS[preset].title === "Classes" ? "Google Classroom" : PRESETS[preset].title.split(" | ")[0]}
                </div>
              ))}
            </div>

            {hasSelected && (
              <div className="space-y-4 pt-4 border-t border-[#F5F5F7] animate-in fade-in slide-in-from-top-2">
                {/* HIDE Tab Title if not supported (Desmos/AP Classroom) */}
                {currentSettings.preset !== 'desmos' && currentSettings.preset !== 'ap_classroom' && (
                  <div className="grid gap-2">
                    <div className="flex justify-between items-baseline">
                      <label className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest">
                        {currentSettings.preset === 'google_classroom' ? "CHOOSE A NAME" : "Tab Title"}
                      </label>
                    </div>
                    <input
                      type="text"
                      value={currentSettings.customTitle || ""}
                      onChange={(e) => setCurrentSettings(prev => ({ ...prev, customTitle: e.target.value }))}
                      placeholder={PRESETS[currentSettings.preset].title}
                      className="w-full bg-white border border-[#E5E5E5] px-3 py-2 rounded-sm text-xs text-[#1D1D1F] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                )}

                {currentSettings.preset === 'google_classroom' && (
                  <div className="grid gap-2">
                    <label className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-widest">Icon Style</label>
                    <div className="grid grid-cols-6 gap-2">
                      {CLASSROOM_ICONS.map((icon) => (
                        <div
                          key={icon.value}
                          onClick={() => setCurrentSettings(prev => ({ ...prev, customIcon: icon.value }))}
                          className={`
                                                    aspect-square rounded-full border-2 cursor-pointer transition-all flex items-center justify-center
                                                    ${(currentSettings.customIcon === icon.value || (!currentSettings.customIcon && icon.label === "Default"))
                              ? "border-blue-500 scale-110 shadow-sm"
                              : "border-transparent hover:border-[#E5E5E5] bg-[#F5F5F7]"
                            }
                                                `}
                          title={icon.label}
                        >
                          <div className="w-5 h-5 rounded-full" style={{ backgroundImage: `url(${icon.value})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 2: Target */}
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold tracking-[0.2em] text-[#1D1D1F] uppercase">
                Target Connection <span className="text-red-500">*</span>
              </label>
              <p className="text-[10px] text-[#8E8E93] leading-relaxed">
                Enter the destination URL for the cloaked session.
              </p>
            </div>
            <div className="relative group">
              <input
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="go.getscreen.me/..."
                className="w-full bg-[#F5F5F7] border-b-2 border-[#E5E5E5] px-4 py-3 text-sm text-[#1D1D1F] focus:outline-none focus:border-[#1D1D1F] transition-all font-mono group-hover:bg-[#F0F0F2]"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!hasSelected || isExiting}
              className={`w-full py-4 rounded-sm text-sm font-bold tracking-widest uppercase transition-all shadow-lg
                                    ${hasSelected
                  ? "bg-[#1D1D1F] text-white hover:opacity-90 hover:scale-[1.01]"
                  : "bg-[#F5F5F7] text-[#8E8E93] cursor-not-allowed"
                }
                                `}
            >
              {isExiting ? "Initializing..." : (hasSelected ? "Initialize" : "Select Appearance First")}
            </button>
            {!hideBookmarkHint && (
              <p className="text-center text-[10px] text-[#8E8E93] mt-4 tracking-wider uppercase">
                Verification required on next step
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  )
}

// --- MAIN COMPONENT ---

export default function StudyHub() {
  const router = useRouter()
  // "admin" step restored
  const [step, setStep] = useState<"loading" | "login" | "setup" | "launching" | "unsupported" | "admin">("loading")
  const [password, setPassword] = useState("")
  const [linkInput, setLinkInput] = useState("")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const linkRef = useRef<string>("")
  const [hideBookmarkHint, setHideBookmarkHint] = useState(false)

  // Setup Popup State
  const [isSetupOpen, setIsSetupOpen] = useState(false)

  // Mandatory Settings State
  const [currentSettings, setCurrentSettings] = useState<DisguiseSettings>({ preset: 'desmos' })
  const [hasSelected, setHasSelected] = useState(false)

  // Admin State
  const [stats, setStats] = useState<{
    valid: string[],
    used: string[],
    revoked: string[],
    hardcoded: string[],
    notes: Record<string, string>
  } | null>(null)
  const [newCreatedKey, setNewCreatedKey] = useState<string | null>(null)
  const [newKeyNote, setNewKeyNote] = useState("")

  useEffect(() => {
    // 1. Device Constraint Check
    const ua = navigator.userAgent
    const isChromebook = ua.includes("CrOS")

    // Check persistence
    const hasAuth = document.cookie.split("; ").find((row) => row.startsWith("curr_user="))
    const savedLink = localStorage.getItem("target_link")
    // If they have ever completed the tutorial, we hide the strict "Bookmark" step content
    const tutorialDone = localStorage.getItem("tutorial_completed")
    if (tutorialDone) setHideBookmarkHint(true)

    // Load saved settings if any (LOCAL Fallback)
    const savedSettings = localStorage.getItem("tab-disguise-settings")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        if (parsed.preset) {
          setCurrentSettings(parsed)
          setHasSelected(true)
        }
      } catch (e) { }
    } else {
      setCurrentSettings({ preset: 'desmos' })
    }

    if (hasAuth) {
      if (savedLink) {
        linkRef.current = savedLink
        setStep("launching")
      } else {
        setStep("setup")
      }
    } else {
      setStep("login")
    }
  }, [])

  useEffect(() => {
    if (step === "launching") {
      // INSTANT LAUNCH - No 2.5s delay
      if (linkRef.current) {
        openResource(linkRef.current, true) // True for parent Redirect
      }
    }
    // If we enter setup, try to open the popup automatically (might be blocked)
    if (step === "setup") {
      setIsSetupOpen(true)
    }
  }, [step])

  // Update Provider Live (if needed, though setup window has its own rendering)
  useEffect(() => {
    if (hasSelected) {
      window.dispatchEvent(new CustomEvent("tab-disguise-update", { detail: currentSettings }))
    }
  }, [currentSettings, hasSelected])

  const loadStats = async () => {
    const data = await getAdminStats()
    setStats(data)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const cleanKey = password.trim()
      const result = await validateKey(cleanKey)

      if (result.success) {
        if (result.isAdmin) {
          await loadStats()
          setStep("admin")
          return
        }

        document.cookie = "curr_user=true; path=/; max-age=315360000"

        const serverConfig = await getUserConfig(cleanKey)
        if (serverConfig) {
          localStorage.setItem("target_link", serverConfig.link)
          localStorage.setItem("tab-disguise-settings", JSON.stringify(serverConfig.settings))

          linkRef.current = serverConfig.link
          setStep("launching")
        } else {
          const savedLink = localStorage.getItem("target_link")
          if (savedLink) {
            linkRef.current = savedLink
            setStep("launching")
          } else {
            setStep("setup")
          }
        }

      } else {
        setError(true)
        setErrorMsg(result.message || "Invalid Key")
      }
    } catch (err) {
      setError(true)
      setErrorMsg("Connection Error")
    }
  }

  const handleCreateKey = async () => {
    const res = await generateKey(newKeyNote)
    if (res.success && res.key) {
      setNewCreatedKey(res.key)
      setNewKeyNote("")
      loadStats()
    }
  }

  const handleRevoke = async (key: string) => {
    await revokeKey(key)
    loadStats()
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasSelected) {
      setError(true)
      return
    }

    if (linkInput.length > 3) {
      let finalLink = linkInput.trim()
      if (!finalLink.startsWith("http")) {
        finalLink = "https://" + finalLink
      }

      localStorage.setItem("target_link", finalLink)
      localStorage.setItem("tutorial_completed", "true")
      localStorage.setItem("tab-disguise-settings", JSON.stringify(currentSettings))

      if (password) {
        await saveUserConfig(password.trim(), {
          link: finalLink,
          settings: currentSettings
        })
      }

      window.dispatchEvent(new CustomEvent("tab-disguise-update", { detail: currentSettings }))
      setIsSetupOpen(false)
      localStorage.setItem("reset_tutorial_pending", "true")
      router.push("/2030103030")
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  const updatePreset = (preset: DisguisePreset) => {
    setHasSelected(true)
    const newSettings: DisguiseSettings = {
      preset,
      customIcon: preset === 'google_classroom' ? '/classroom/default.ico' : undefined
    }
    setCurrentSettings(newSettings)
    // Force immediate update for "Live Preview" to prevent "Desmos" lag
    window.dispatchEvent(new CustomEvent("tab-disguise-update", { detail: newSettings }))
  }

  const openResource = (url: string, doParentRedirect: boolean = false) => {
    // ... (Same logic as before)
    const width = window.screen.availWidth
    const height = window.screen.availHeight

    const win = window.open(
      'about:blank',
      '_blank',
      `popup=yes,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},left=0,top=0`
    )

    if (win) {
      try {
        let title = "Desmos | Graphing Calculator"
        let icon = "/desmos/favicon.ico"

        const savedRaw = localStorage.getItem("tab-disguise-settings")
        let activeSettings: DisguiseSettings | null = currentSettings

        if (savedRaw) {
          try {
            activeSettings = JSON.parse(savedRaw)
          } catch (e) { }
        }

        if (activeSettings) {
          if (activeSettings.preset === 'custom') {
            title = activeSettings.customTitle || PRESETS.custom.title
            icon = activeSettings.customIcon || PRESETS.custom.icon
          } else if (activeSettings.preset === 'google_classroom') {
            title = activeSettings.customTitle || PRESETS.google_classroom.title
            icon = activeSettings.customIcon || PRESETS.google_classroom.icon
          } else if (PRESETS[activeSettings.preset]) {
            const p = PRESETS[activeSettings.preset]
            title = activeSettings.customTitle || p.title
            icon = activeSettings.customIcon || p.icon
          }
        }

        win.document.title = title
        win.document.body.style.margin = '0'
        win.document.body.style.height = '100vh'
        win.document.body.style.overflow = 'hidden'
        win.document.body.style.backgroundColor = '#000'

        const link = win.document.createElement('link')
        link.rel = 'icon'
        link.type = 'image/x-icon'
        link.href = window.location.origin + icon
        win.document.head.appendChild(link)

        const iframe = win.document.createElement('iframe')
        iframe.style.border = 'none'
        iframe.style.width = '100vw'
        iframe.style.height = '100vh'
        iframe.src = url
        iframe.allow = "fullscreen; camera; microphone; display-capture; clipboard-read; clipboard-write; autoplay"

        win.document.body.appendChild(iframe)

        if (doParentRedirect) {
          let redirectTarget = "https://www.desmos.com/calculator"
          const savedSettings = localStorage.getItem("tab-disguise-settings")
          if (savedSettings) {
            const parsed = JSON.parse(savedSettings)
            if (parsed.preset && PRESETS[parsed.preset as DisguisePreset]) {
              redirectTarget = PRESETS[parsed.preset as DisguisePreset].redirectUrl || redirectTarget
            }
          } else if (currentSettings && PRESETS[currentSettings.preset]) {
            redirectTarget = PRESETS[currentSettings.preset].redirectUrl || redirectTarget
          }

          setTimeout(() => {
            window.location.href = redirectTarget
          }, 100)
        }

      } catch (e) { console.error("Popup blocked or failed", e) }
    } else {
      alert("Popup blocked! Please allow popups for this site.")
    }
  }

  const LoadingDots = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-[#1D1D1F] rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const KeyRow = ({ k, status }: { k: string, status: "valid" | "used" | "revoked" | "hardcoded" }) => {
    const [visible, setVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    let statusColor = "text-green-500"
    if (status === "used") statusColor = "text-yellow-500"
    if (status === "revoked") statusColor = "text-red-500"
    if (status === "hardcoded") statusColor = "text-blue-500"
    const handleEditNote = async () => {
      const currentNote = stats?.notes[k] || ""
      const newNote = prompt("Edit Note for " + k, currentNote)
      if (newNote !== null) {
        await updateKeyNote(k, newNote)
        loadStats()
      }
    }
    return (
      <div
        className="flex justify-between items-center p-3 bg-white modern-border rounded-sm hover:modern-shadow transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          <span className={`font-mono text-sm min-w-[80px] text-[#1D1D1F] ${status === "revoked" ? "line-through opacity-50" : ""}`}>{visible ? k : "••••••"}</span>
          <button
            onClick={() => status !== "hardcoded" && setVisible(!visible)}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-[#E5E5E5] ${status === "hardcoded" ? "text-neutral-400 bg-neutral-100 cursor-not-allowed" : "text-neutral-600 hover:text-black bg-[#F5F5F7]"}`}
            disabled={status === "hardcoded"}
          >
            {status === "hardcoded" ? "HIDDEN" : (visible ? "HIDE" : "SHOW")}
          </button>
          <span className={`text-[10px] uppercase tracking-widest ${statusColor} ml-2`}>
            {status}
          </span>
          <div onClick={handleEditNote} className="flex items-center cursor-pointer group ml-2 border-l border-[#E5E5E5] pl-2 hover:bg-[#F5F5F7] rounded px-1 -ml-1 transition-colors">
            {stats?.notes[k] ? (
              <span className="text-[10px] text-neutral-500 italic group-hover:text-black">
                {stats.notes[k]}
              </span>
            ) : (
              <span className={`text-[10px] text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ${isHovered ? 'opacity-100' : ''}`}>
                + Note
              </span>
            )}
          </div>
        </div>
        {status !== "revoked" && status !== "hardcoded" && (
          <button onClick={() => handleRevoke(k)} className="text-[10px] text-red-500 hover:text-red-600 uppercase tracking-wider">Revoke</button>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col items-center justify-center p-4 text-[#1D1D1F] overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      <AnimatePresence mode="wait">
        {step === "loading" && (
          <motion.div
            key="init-load"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="w-24 overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1, ease: "circOut" }}
              className="h-[2px] w-full bg-[#1D1D1F]"
            />
          </motion.div>
        )}

        {step === "unsupported" && (
          <motion.div
            key="unsupported"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <h1 className="text-red-500 font-bold tracking-[0.2em]">PROTOCOL MISMATCH</h1>
            <p className="text-xs text-neutral-500">DEVICE IDENTIFIER INVALID.</p>
          </motion.div>
        )}

        {step === "login" && (
          <>
            <motion.form
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleLogin}
              className="w-full max-w-xs flex flex-col items-center gap-6 z-10"
            >
              <div className="text-center space-y-1">
                <h1 className="text-xs font-bold tracking-[0.2em] text-[#1D1D1F] uppercase">Private Access</h1>
                <p className="text-[10px] text-neutral-500 tracking-wider">ENTER KEY</p>
              </div>

              <motion.div
                className="w-full relative"
                animate={error ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                  }}
                  placeholder="ENTER KEY"
                  className="w-full bg-transparent py-2 text-center text-xl tracking-[0.5em] focus:outline-none transition-colors placeholder:text-neutral-300 placeholder:tracking-normal placeholder:text-sm font-light text-[#1D1D1F]"
                  autoFocus
                />
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-center overflow-hidden"
                    >
                      <p className="text-[10px] text-red-500 tracking-widest uppercase font-bold">{errorMsg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.form>

            <div className="fixed bottom-4 left-0 right-0 z-50 text-center text-neutral-400 pointer-events-none">
              <p className="text-[10px] tracking-widest uppercase pointer-events-auto inline-block">Key bugged? Please ask me in person.</p>
            </div>
          </>
        )}

        {step === "admin" && stats && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl p-8 space-y-8 bg-white modern-border shadow-2xl rounded-sm"
          >
            <div className="flex justify-between items-center border-b border-[#F5F5F7] pb-4">
              <h1 className="text-xl font-bold tracking-widest text-green-600">ADMIN CONSOLE</h1>
              <button onClick={() => {
                document.cookie = "curr_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                setStep("login")
              }} className="text-xs text-red-500 hover:underline">LOGOUT</button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-xs text-neutral-500 tracking-widest uppercase">Generate Key</h2>
                <button onClick={handleCreateKey} className="bg-[#1D1D1F] text-white px-4 py-2 text-xs font-bold tracking-widest uppercase hover:opacity-90">Create New Key</button>
                <input type="text" value={newKeyNote} onChange={(e) => setNewKeyNote(e.target.value)} placeholder="Note..." className="bg-[#F5F5F7] border border-[#E5E5E5] px-3 py-2 text-xs w-full" />
                {newCreatedKey && <div className="p-4 bg-[#F5F5F7] text-green-600 font-mono">{newCreatedKey}</div>}
              </div>
            </div>
            <div className="space-y-4">
              <button onClick={loadStats} className="text-[10px] text-blue-600 uppercase">REFRESH</button>
              <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[400px]">
                {(() => {
                  const allUniqueKeys = Array.from(new Set([...stats.hardcoded, ...stats.valid, ...stats.used, ...stats.revoked]))
                  return allUniqueKeys.map(k => {
                    let status: "valid" | "used" | "revoked" | "hardcoded" = "valid"
                    if (stats.hardcoded.includes(k)) status = "hardcoded"
                    else if (stats.revoked.includes(k)) status = "revoked"
                    else if (stats.used.includes(k)) status = "used"
                    return { k, status }
                  }).sort((a, b) => a.k.localeCompare(b.k)).map(({ k, status }) => <KeyRow key={k} k={k} status={status as any} />)
                })()}
              </div>
            </div>
          </motion.div>
        )}

        {step === "setup" && (
          <motion.div
            key="setup-loading"
            className="flex items-center justify-center flex-col gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <LoadingDots />
            </div>

            {isSetupOpen && (
              <SetupWindow onClose={() => setIsSetupOpen(false)}>
                <SetupForm
                  currentSettings={currentSettings}
                  setCurrentSettings={setCurrentSettings}
                  hasSelected={hasSelected}
                  updatePreset={updatePreset}
                  linkInput={linkInput}
                  setLinkInput={setLinkInput}
                  handleSetup={handleSetup}
                  hideBookmarkHint={hideBookmarkHint}
                  setError={setError}
                />
              </SetupWindow>
            )}
          </motion.div>
        )}

        {step === "launching" && (
          <motion.div
            key="launching"
            className="flex items-center justify-center flex-col gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <LoadingDots />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center space-y-4 pt-8"
            >
              <button
                onClick={() => linkRef.current && openResource(linkRef.current, true)}
                className="bg-[#1D1D1F] text-white px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity shadow-lg"
              >
                Click to Launch
              </button>
              {linkRef.current && (
                <div className="pt-2 px-10">
                  <p className="text-[9px] text-neutral-400 break-all font-mono bg-neutral-50 p-2 border border-neutral-100 rounded">
                    Launch URL: {linkRef.current}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
