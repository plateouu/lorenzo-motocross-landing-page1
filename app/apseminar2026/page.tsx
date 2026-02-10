"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Maximize2, Minimize2 } from "lucide-react"

// ──────────────────────────────────────────────────────────
// SECTION COLOR ACCENTS — subtle, no outlines
// ──────────────────────────────────────────────────────────

type Theme = {
  accent: string
  accentBg: string
  glow: string
}

const themes: Record<string, Theme> = {
  opening: { accent: "text-blue-400", accentBg: "bg-blue-400", glow: "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.07) 0%, transparent 100%)" },
  problem: { accent: "text-rose-400", accentBg: "bg-rose-400", glow: "radial-gradient(ellipse 80% 60% at 80% 30%, rgba(244,63,94,0.07) 0%, transparent 100%)" },
  framework: { accent: "text-violet-400", accentBg: "bg-violet-400", glow: "radial-gradient(ellipse 70% 70% at 30% 70%, rgba(139,92,246,0.07) 0%, transparent 100%)" },
  structural: { accent: "text-amber-400", accentBg: "bg-amber-400", glow: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(245,158,11,0.07) 0%, transparent 100%)" },
  empirical: { accent: "text-teal-400", accentBg: "bg-teal-400", glow: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(20,184,166,0.07) 0%, transparent 100%)" },
  counter: { accent: "text-orange-400", accentBg: "bg-orange-400", glow: "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(249,115,22,0.07) 0%, transparent 100%)" },
  conclusion: { accent: "text-emerald-400", accentBg: "bg-emerald-400", glow: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(16,185,129,0.07) 0%, transparent 100%)" },
}

// ──────────────────────────────────────────────────────────
// SLIDES DATA
// ──────────────────────────────────────────────────────────

const slides: any[] = [
  {
    id: 1, theme: "opening", type: "title",
    title: "Digital Communities as Essential Social Infrastructure",
    subtitle: "Taylor Daan",
  },
  {
    id: 2, theme: "opening", type: "quote",
    quote: "Loneliness is far more than just a bad feeling. It harms both individual and societal health. It is associated with a greater risk of cardiovascular disease, dementia, stroke, depression, anxiety, and premature death.",
    author: "Dr. Vivek Murthy",
    role: "U.S. Surgeon General, 2023",
  },
  {
    id: 3, theme: "problem", type: "stats",
    title: "Loneliness Is a Public Health Crisis",
    stats: [
      { value: "29%", label: "increased risk of premature death" },
      { value: "15", label: "cigarettes/day \u2014 equivalent health impact" },
      { value: "50%", label: "of U.S. adults report measurable loneliness" },
    ],
    source: "U.S. Surgeon General Advisory, 2023",
    image: "/us-surgeongeneral-loneliness-2023.png",
    imageAlt: "U.S. Surgeon General Advisory on Loneliness",
  },
  {
    id: 4, theme: "problem", type: "split-text",
    title: "Disappearing Third Places",
    blocks: [
      { heading: "Third Places", body: "Coffee shops, parks, libraries \u2014 gathering spots outside home and work where community forms.", cite: "Oldenburg, 1989" },
      { heading: "Social Deserts", body: "Neighborhoods built without anywhere to gather. Highways, suburban sprawl, and car-dependent planning eliminated these spaces.", cite: "Goldfarb, 2023" },
    ],
    image: "/xpoJW1i2LWtflxEImNfK-K-rdZ4eULQ6EUD71TGS77U.webp",
    imageAlt: "Suburban sprawl aerial view",
  },
  {
    id: 5, theme: "framework", type: "bigtext",
    label: "Research Question",
    text: "To what extent can digital communities serve as meaningful social spaces for those who are isolated from physical Third Places?",
  },
  {
    id: 6, theme: "framework", type: "three-cards",
    cards: [
      { num: "01", term: "Third Places", def: "Neutral gathering spots outside home and work", source: "Oldenburg, 1989" },
      { num: "02", term: "Social Deserts", def: "Areas designed without spaces for interaction", source: "Goldfarb, 2023" },
      { num: "03", term: "Bridging Social Capital", def: "Connections across diverse groups that hold communities together", source: "Putnam, 2000" },
    ],
  },
  {
    id: 7, theme: "framework", type: "bigtext",
    label: "Thesis",
    text: "For individuals trapped in Social Deserts, virtual communities function as necessary \u201CThird Places\u201D that provide essential social infrastructure and support social inclusion.",
  },
  {
    id: 8, theme: "framework", type: "two-boxes",
    cols: [
      { num: "01", title: "Structural", desc: "Who is excluded from physical spaces, and why" },
      { num: "02", title: "Empirical", desc: "Do digital spaces actually function as Third Places" },
    ],
  },
  {
    id: 9, theme: "structural", type: "split-text",
    title: "Youth Excluded from Public Space",
    blocks: [
      { heading: "", body: "Curfew laws, parental restrictions, and safety fears prevent teens from accessing public spaces.", cite: "" },
      { heading: "", body: "The internet is the only unsupervised public venue available to them. Their exclusion is systemic.", cite: "" },
    ],
    source: "danah boyd, It\u2019s Complicated (2014)",
    sourceRole: "Researcher, Microsoft",
    image: "/empty-playground-closed-quarantine-covid-blocked-red-warning-tape-stay-home-please-179761275.webp",
    imageAlt: "Empty closed playground",
  },
  {
    id: 10, theme: "structural", type: "split-text",
    title: "Impossible \u201CFriction Costs\u201D",
    blocks: [
      { heading: "", body: "Suburban design raises the cost of every social interaction. No sidewalks, no town squares, no walkable centers.", cite: "" },
      { heading: "", body: "A 45-minute drive to see a friend removes spontaneous connection entirely.", cite: "" },
    ],
    source: "Goldfarb, Crossings (2023)",
    sourceRole: "Environmental Journalist",
    image: "/los-angeles-highway-interchange-aerial-photos.jpg",
    imageAlt: "LA highway interchange",
  },
  {
    id: 11, theme: "empirical", type: "split-text",
    title: "Digital Spaces Are Third Places",
    blocks: [
      { heading: "", body: "Online communities meet all of Oldenburg\u2019s Third Place criteria: neutral ground, regular participants, conversation as main activity.", cite: "" },
      { heading: "", body: "Real bridging social capital forms across geographic and demographic lines.", cite: "" },
    ],
    source: "Steinkuehler & Williams (2006)",
    sourceRole: "Journal of Computer-Mediated Communication",
    image: "/Content-Blog-Banner_Q1-2024_1125x600_066_Discord-Communities.png",
    imageAlt: "Discord community server",
  },
  {
    id: 12, theme: "empirical", type: "points",
    title: "Bridging Capital Beyond Geography",
    points: [
      "Online communities remove the geographic barrier entirely",
      "Disabled, rural, and homebound individuals gain access to social life their environment does not provide",
    ],
    source: "Putnam (2000)",
    sourceRole: "Political Scientist, Harvard",
  },
  {
    id: 13, theme: "counter", type: "counter",
    title: "The Quality Problem",
    args: [
      { author: "Turkle (2011)", role: "Professor, MIT", point: "Digital bonds create an \u201Cillusion of companionship.\u201D Vulnerability is edited out, connections stay shallow." },
      { author: "Zuboff (2019)", role: "Professor, Harvard Business School", point: "Platforms extract behavioral data for profit. Connection is secondary to their business model." },
    ],
    image: "/9780465093656.webp",
    imageAlt: "Alone Together by Sherry Turkle",
  },
  {
    id: 14, theme: "counter", type: "points",
    title: "A Necessary Lifeline",
    points: [
      "Both criticisms assume the person has a choice between physical and digital connection",
      "For people in Social Deserts, the options are digital community or total isolation",
      "Harm reduction: an imperfect tool still addresses a real need",
    ],
    source: "Quan-Haase & Wellman (2004)",
    sourceRole: "Harm Reduction Framework",
  },
  {
    id: 15, theme: "counter", type: "points",
    title: "Physiological Limits",
    points: [
      "Text-based interaction cannot replicate the physical stress relief of in-person contact",
      "Digital communities serve as a bridge, not a permanent replacement",
    ],
    source: "Cacioppo (2008)",
    sourceRole: "Neuroscientist, University of Chicago",
  },
  {
    id: 16, theme: "conclusion", type: "conclusion",
    lines: [
      "Physical Third Places are disappearing due to structural neglect",
      "Digital communities fill this gap as essential social infrastructure",
      "The real question: why is digital space the only gathering place many people have left",
    ],
  },
  {
    id: 17, theme: "conclusion", type: "references",
    title: "Works Cited",
    refs: [
      "Boyd, D. (2014). It\u2019s Complicated. Yale University Press.",
      "Cacioppo, J. T. & Patrick, W. (2008). Loneliness. W.W. Norton.",
      "Goldfarb, B. (2023). Crossings. W.W. Norton.",
      "Oldenburg, R. (1989). The Great Good Place. Marlowe & Company.",
      "Office of the U.S. Surgeon General. (2023). Our Epidemic of Loneliness and Isolation.",
      "Putnam, R. D. (2000). Bowling Alone. Simon & Schuster.",
      "Quan-Haase, A. & Wellman, B. (2004). How does the Internet affect social capital? MIT Press.",
      "Steinkuehler, C. & Williams, D. (2006). Where Everybody Knows Your (Screen) Name. JCMC, 11(4).",
      "Turkle, S. (2011). Alone Together. Basic Books.",
      "Zuboff, S. (2019). The Age of Surveillance Capitalism. PublicAffairs.",
    ],
  },
]

// ──────────────────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────────────────

export default function PresentationPage() {
  const [current, setCurrent] = React.useState(0)
  const [isFs, setIsFs] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => { setMounted(true) }, [])

  const go = React.useCallback((i: number) => { if (i >= 0 && i < slides.length) setCurrent(i) }, [])
  const next = React.useCallback(() => { if (current < slides.length - 1) go(current + 1) }, [current, go])
  const prev = React.useCallback(() => { if (current > 0) go(current - 1) }, [current, go])

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["ArrowRight", "Space", "PageDown", "ArrowDown"].includes(e.code)) { e.preventDefault(); next() }
      else if (["ArrowLeft", "PageUp", "ArrowUp"].includes(e.code)) { e.preventDefault(); prev() }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [next, prev])

  const toggleFs = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!document.fullscreenElement) { ref.current?.requestFullscreen(); setIsFs(true) }
    else { document.exitFullscreen(); setIsFs(false) }
  }

  const slide = slides[current]
  const theme = themes[slide.theme]

  return (
    <div className="bg-[#09090b] min-h-screen text-white font-sans">
      <div
        ref={ref}
        onClick={next}
        onContextMenu={(e) => { e.preventDefault(); prev() }}
        className="relative w-full h-screen cursor-pointer select-none overflow-hidden bg-[#09090b]"
        tabIndex={0}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none transition-all duration-[1.5s]" style={{ background: theme.glow }} />

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute inset-0 flex items-center justify-center px-[7%] py-16"
          >
            <Slide slide={slide} theme={theme} />
          </motion.div>
        </AnimatePresence>

        {/* Fullscreen */}
        {mounted && (
          <button onClick={toggleFs} className="fixed top-5 right-5 z-50 p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition">
            {isFs ? <Minimize2 size={16} className="text-white/30" /> : <Maximize2 size={16} className="text-white/30" />}
          </button>
        )}

        {/* Progress */}
        <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/[0.03]">
          <div className={`h-full transition-all duration-700 ${theme.accentBg} opacity-30`} style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 right-6 z-50 pointer-events-none">
          <span className="font-mono text-[11px] text-white/10">{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// SLIDE RENDERER — big, bold, no outlines
// ──────────────────────────────────────────────────────────

function Slide({ slide, theme }: { slide: any; theme: Theme }) {
  switch (slide.type) {
    case "title":
      return (
        <div className="text-center w-full max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[64px] font-black tracking-[-0.03em] leading-[1.05] text-white"
          >{slide.title}</motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg text-white/25 font-medium mt-8 tracking-wide"
          >{slide.subtitle}</motion.p>
        </div>
      )

    case "quote":
      return (
        <div className="text-center w-full max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[28px] font-semibold leading-[1.6] text-white/75 italic"
          >&ldquo;{slide.quote}&rdquo;</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <p className={`text-base font-bold mt-10 ${theme.accent}`}>{slide.author}</p>
            <p className="text-sm text-white/20 mt-1">{slide.role}</p>
          </motion.div>
        </div>
      )

    case "stats":
      return (
        <div className="w-full max-w-6xl flex items-center gap-16">
          <div className="flex-1">
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[42px] font-black tracking-tight text-white mb-10"
            >{slide.title}</motion.h2>
            <div className="space-y-8">
              {slide.stats.map((s: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  <span className={`text-[56px] font-black ${theme.accent} leading-none`}>{s.value}</span>
                  <p className="text-base text-white/35 font-medium mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-xs text-white/15 mt-8"
            >{slide.source}</motion.p>
          </div>
          {slide.image && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="relative w-[400px] h-[450px] shrink-0 rounded-2xl overflow-hidden bg-white/[0.02]"
            >
              <Image src={slide.image} alt={slide.imageAlt} fill className="object-contain p-4" sizes="400px" />
            </motion.div>
          )}
        </div>
      )

    case "split-text":
      return (
        <div className="w-full max-w-6xl flex items-center gap-14">
          <div className="flex-1">
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[40px] font-black tracking-tight text-white mb-8"
            >{slide.title}</motion.h2>
            <div className="space-y-6">
              {slide.blocks.map((b: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.1 }}
                >
                  {b.heading && <p className={`text-xl font-black ${theme.accent} mb-2`}>{b.heading}</p>}
                  <p className="text-lg text-white/55 font-medium leading-relaxed">{b.body}</p>
                  {b.cite && <p className="text-xs text-white/15 mt-2">{b.cite}</p>}
                </motion.div>
              ))}
            </div>
            {slide.source && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-8 flex items-baseline gap-3"
              >
                <p className={`text-sm font-bold ${theme.accent} opacity-70`}>{slide.source}</p>
                {slide.sourceRole && <p className="text-xs text-white/15">{slide.sourceRole}</p>}
              </motion.div>
            )}
          </div>
          {slide.image && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="relative w-[420px] h-[380px] shrink-0 rounded-2xl overflow-hidden bg-white/[0.02]"
            >
              <Image src={slide.image} alt={slide.imageAlt} fill className="object-contain p-3" sizes="420px" />
            </motion.div>
          )}
        </div>
      )

    case "bigtext":
      return (
        <div className="text-center w-full max-w-4xl">
          {slide.label && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`text-sm font-bold ${theme.accent} uppercase tracking-[0.2em] mb-8`}
            >{slide.label}</motion.p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[34px] font-bold leading-[1.5] text-white/90"
          >{slide.text}</motion.h2>
        </div>
      )

    case "three-cards":
      return (
        <div className="w-full max-w-5xl grid grid-cols-3 gap-8">
          {slide.cards.map((c: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.1 }}
              className="bg-white/[0.03] rounded-2xl p-8"
            >
              <span className={`text-[42px] font-black ${theme.accent} opacity-15 block mb-4`}>{c.num}</span>
              <p className="text-xl font-black text-white mb-3">{c.term}</p>
              <p className="text-sm text-white/40 font-medium leading-relaxed">{c.def}</p>
              <p className="text-[10px] text-white/15 mt-4">{c.source}</p>
            </motion.div>
          ))}
        </div>
      )

    case "two-boxes":
      return (
        <div className="w-full max-w-5xl grid grid-cols-2 gap-12">
          {slide.cols.map((col: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12 }}
            >
              <span className={`text-[64px] font-black ${theme.accent} opacity-12 block mb-3`}>{col.num}</span>
              <h3 className="text-[36px] font-black text-white mb-3">{col.title}</h3>
              <p className="text-lg text-white/35 font-medium leading-relaxed">{col.desc}</p>
            </motion.div>
          ))}
        </div>
      )

    case "points":
      return (
        <div className="w-full max-w-4xl">
          <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[40px] font-black tracking-tight text-white mb-8"
          >{slide.title}</motion.h2>
          <div className="space-y-5">
            {slide.points.map((pt: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${theme.accentBg} opacity-40`} />
                <p className="text-lg text-white/55 font-medium leading-relaxed">{pt}</p>
              </motion.div>
            ))}
          </div>
          {slide.source && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-8 flex items-baseline gap-3"
            >
              <p className={`text-sm font-bold ${theme.accent} opacity-70`}>{slide.source}</p>
              {slide.sourceRole && <p className="text-xs text-white/15">{slide.sourceRole}</p>}
            </motion.div>
          )}
        </div>
      )

    case "counter":
      return (
        <div className="w-full max-w-6xl flex items-center gap-14">
          <div className="flex-1">
            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[40px] font-black tracking-tight text-white mb-8"
            >{slide.title}</motion.h2>
            <div className="space-y-8">
              {slide.args.map((arg: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.1 }}
                >
                  <p className="text-lg text-white/55 font-medium leading-relaxed mb-2">{arg.point}</p>
                  <div className="flex items-baseline gap-3">
                    <p className={`text-sm font-bold ${theme.accent}`}>{arg.author}</p>
                    <p className="text-xs text-white/20">{arg.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {slide.image && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="relative w-[300px] h-[380px] shrink-0 rounded-2xl overflow-hidden bg-white/[0.02]"
            >
              <Image src={slide.image} alt={slide.imageAlt} fill className="object-contain p-4" sizes="300px" />
            </motion.div>
          )}
        </div>
      )

    case "conclusion":
      return (
        <div className="w-full max-w-4xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`text-sm font-bold ${theme.accent} uppercase tracking-[0.2em] mb-10`}
          >Conclusion</motion.p>
          <div className="space-y-8">
            {slide.lines.map((line: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="flex gap-6 items-start"
              >
                <span className={`text-[40px] font-black ${theme.accent} opacity-15 shrink-0 leading-none`}>{i + 1}</span>
                <p className="text-[22px] font-bold text-white/75 leading-relaxed pt-1">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )

    case "references":
      return (
        <div className="w-full max-w-3xl">
          <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="text-[30px] font-black text-white mb-8"
          >{slide.title}</motion.h2>
          <div className="space-y-3">
            {slide.refs.map((r: string, i: number) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 + i * 0.03 }}
                className="text-[14px] text-white/30 font-medium leading-relaxed pl-8 -indent-8"
              >{r}</motion.p>
            ))}
          </div>
        </div>
      )

    default: return null
  }
}
