"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, Minimize2, BarChart3, Users, Quote as QuoteIcon, ArrowRight, BookOpen, BrainCircuit, Activity } from "lucide-react"
import Image from "next/image"
import Head from "next/head"

// --- Background Components ---

const WavyBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.4]">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d="M -10 50 Q 25 20 50 50 T 110 50"
        fill="none"
        stroke="#000000" // Black stroke
        strokeWidth="0.8"
        animate={{
          d: [
            "M -10 5 Q 25 0 50 5 T 110 5",
            "M -10 5 Q 25 10 50 5 T 110 5",
            "M -10 5 Q 25 0 50 5 T 110 5",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.path
        d="M -10 95 Q 50 90 110 95"
        fill="none"
        stroke="#000000" // Secondary Black line
        strokeWidth="0.4"
        strokeDasharray="2 2"
        animate={{
          d: [
            "M -10 95 Q 50 100 110 95",
            "M -10 95 Q 50 90 110 95",
            "M -10 95 Q 50 100 110 95",
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </svg>
  </div>
)

// --- Slide Data ---

const slides = [
  {
    id: "title",
    type: "title",
    header: "AP SEMINAR IMP",
    title: "Digital Communities as Essential Social Infrastructure",
    author: "Taylor Daan",
  },
  {
    id: "quote-slide",
    type: "quote",
    header: "THE AXIS OF MEMORY",
    quote: "“Identity is a function of relationships to community, specifically through tangible 'scenery'.”",
    author: "Haruki Murakami (2002)",
    citation: "",
  },
  {
    id: "key-factors",
    type: "standard-content",
    layout: "right", // Image on right
    header: "CONTEXT",
    title: "Key Factors",
    bullets: [
      "Axis = Physical stability (Murakami, 2002)",
      "Destruction of scenery breaks the axis",
      "Modern planning severs connections (Goldfarb, 2023)"
    ],
    image: "https://picsum.photos/seed/prague/800/600",
    citation: "Source: Murakami (2002) / Goldfarb (2023)",
  },
  {
    id: "problem",
    type: "standard-content",
    layout: "left", // Image on left
    header: "THE PROBLEM",
    title: "Public Health Crisis",
    bullets: [
      "Loneliness declared an epidemic (Surgeon General, 2023)",
      "29% increased premature death risk",
      "Equivalent to smoking 15 cigarettes/day",
      "Crisis of Connection in modern era"
    ],
    image: "https://picsum.photos/seed/healthchart/1280/720",
    citation: "Data Source: U.S. Surgeon General (2023)",
  },
  {
    id: "rq-slide",
    type: "statement",
    header: "RESEARCH QUESTION",
    text: "To what extent could digital communities be considered meaningful social spaces for those who are isolated from physical spaces?",
  },
  {
    id: "key-concepts",
    type: "standard-content",
    layout: "right",
    header: "KEY CONCEPTS",
    title: "Definitions",
    bullets: [
      "Third Places (Oldenburg, 1989): Neutral connection hubs",
      "Social Deserts (Goldfarb, 2023): Design preventing interaction",
      "Bridging Social Capital (Putnam, 2000): Diverse connections"
    ],
    image: "https://picsum.photos/seed/coffeeshop/800/600",
    citation: "Source: Oldenburg (1989) / Ferreira (2021)",
  },
  {
    id: "thesis-slide",
    type: "thesis",
    header: "THESIS STATEMENT",
    text: "For individuals trapped in Social Deserts, Virtual Communities function as necessary “Third Places” that provide essential social infrastructure and support social inclusion.",
  },
  {
    id: "perspectives-intro",
    type: "perspectives-intro",
    header: "OVERVIEW",
    title: "Perspectives",
    perspectives: [
      { label: "Structural", icon: BarChart3, desc: "Barriers to Entry" },
      { label: "Economic", icon: Users, desc: "Surveillance Capitalism" },
    ],
    image: "https://picsum.photos/seed/matrixcode/1280/720",
  },
  {
    id: "p1-youth",
    type: "standard-content",
    layout: "left",
    header: "PERSPECTIVE 1",
    subHeader: "STRUCTURAL",
    title: "Networked Publics",
    bullets: [
      "Concept: 'Networked Publics' (Boyd, 2014)",
      "Curfews/Safety fears restrict youth",
      "Digital = ONLY unsupervised venue",
      "Barrier is legal, not choice"
    ],
    image: "https://picsum.photos/seed/teenphone/1280/720",
    citation: "Source: Boyd (2014)",
  },
  {
    id: "p1-sprawl",
    type: "standard-content",
    layout: "right",
    header: "PERSPECTIVE 1",
    subHeader: "STRUCTURAL",
    title: "High 'Friction Costs'",
    bullets: [
      "Concept: High 'Friction Costs' (Goldfarb, 2023)",
      "Suburban sprawl segments communities",
      "Highways create 'Social Deserts'",
      "Isolation is structural, not personal"
    ],
    image: "https://picsum.photos/seed/suburbsprawl/1280/720",
    citation: "Source: Goldfarb (2023)",
  },
  {
    id: "p1-counter",
    type: "standard-content",
    layout: "left",
    header: "COUNTERARGUMENT",
    subHeader: "STRUCTURAL",
    title: "Surveillance Capitalism",
    bullets: [
      "Platforms prioritize profit over connection (Zuboff, 2019)",
      "Illusion of Companionship (Turkle, 2011)"
    ],
    image: "https://picsum.photos/seed/surveillance/1280/720",
    citation: "Source: Steinkuehler & Williams (2006)",
  },
  {
    id: "p2-economic-1",
    type: "standard-content",
    layout: "right",
    header: "PERSPECTIVE 2",
    subHeader: "ECONOMIC",
    title: "Profit Over Connection",
    bullets: [
      "Surveillance Capitalism (Zuboff, 2019)",
      "Experience extracted as raw data",
      "Goal: Prediction and Behavioral Modification",
      "Connection is secondary to profit"
    ],
    image: "https://covers.openlibrary.org/b/id/8381666-L.jpg",
    citation: "Source: Zuboff (2019)",
  },
  {
    id: "p2-economic-2",
    type: "standard-content",
    layout: "left",
    header: "PERSPECTIVE 2",
    subHeader: "ECONOMIC",
    title: "Illusion of Companionship",
    bullets: [
      "Sherry Turkle (2011): 'Alone Together'",
      "We expect more from technology and less from each other",
      "Digital bonds may be 'simulated' rather than authentic",
      "Vulnerability is edited out of interaction"
    ],
    image: "https://picsum.photos/seed/illusion/1280/720",
    citation: "Source: Turkle (2011)",
  },
  {
    id: "p2-economic-counter",
    type: "standard-content",
    layout: "right",
    header: "COUNTERARGUMENT",
    subHeader: "ECONOMIC",
    title: "A Necessary Lifeline",
    bullets: [
      "Rebuttal: Flawed vessel, real need",
      "For the isolated, 'imperfect' connection is better than none",
      "We must use available infrastructure (even if corporate)",
      "Criticism comes from a place of privilege"
    ],
    image: "https://picsum.photos/seed/solitude/1280/720",
    citation: "Status: Validated Necessity",
  },
  {
    id: "limitations",
    type: "standard-content",
    layout: "left",
    header: "DISCUSSION",
    subHeader: "LIMITATIONS",
    title: "Physiological Limits",
    bullets: [
      "Stress response failure (Cacioppo, 2008)",
      "Text lacks physiological co-regulation",
      "Refutation: Harm Reduction (Quan-Haase, 2004)",
      "Better than 'toxic biological isolation'"
    ],
    image: "https://picsum.photos/seed/biology/1280/720", // Replaced broken wikimedia link
    citation: "Source: Cacioppo (2008)",
  },
  {
    id: "conclusion-slide",
    type: "standard-content",
    layout: "right",
    header: "CONCLUSION",
    title: "Synthesis",
    bullets: [
      "Physical axis broken by neglect (Murakami/Goldfarb)",
      "Digital space is the lifeline",
      "Must validate virtual connections",
      "Mitigates the health crisis"
    ],
    image: "https://picsum.photos/seed/futurebridge/1280/720",
  },
  {
    id: "references-slide",
    type: "references",
    header: "APPENDIX",
    title: "Works Cited",
    refs: [
      "Boyd, D. (2014). It's Complicated. Yale University Press.",
      "Goldfarb, B. (2023). Crossings. W.W. Norton.",
      "Murakami, H. (2002). A Walk to Kobe.",
      "Office of the U.S. Surgeon General. (2023). Advisory on Social Connection.",
      "Steinkuehler, C., & Williams, D. (2006). Where Everybody Knows Your Name.",
      "Zuboff, S. (2019). The Age of Surveillance Capitalism.",
      "Turkle, S. (2011). Alone Together.",
    ],
  },
]

// --- Unified Components ---

const MasterCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "w-full h-full relative bg-white overflow-hidden flex flex-col p-6 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] ring-1 ring-black/[0.03]",
      className
    )}
  >
    {children}
  </motion.div>
)

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const [timerTime, setTimerTime] = React.useState(480) // 8 minutes
  const [timerActive, setTimerActive] = React.useState(false)
  const [timerVisible, setTimerVisible] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  // Timer countdown logic
  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, timerTime])

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const nextSlide = React.useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide((prev) => prev + 1)
    }
  }, [currentSlide])

  const prevSlide = React.useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  React.useEffect(() => {
    if (currentSlide > 0 && !timerActive) {
      setTimerActive(true)
      setTimerVisible(true)
    }
  }, [currentSlide, timerActive])

  // Enhanced Key Handling including PageUp/PageDown and ArrowUp/ArrowDown
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowRight", "Space", "PageDown", "ArrowDown"].includes(e.code)) {
        e.preventDefault()
        nextSlide()
      } else if (["ArrowLeft", "PageUp", "ArrowUp"].includes(e.code)) {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Preload Next Image
  const nextSlideImage = slides[currentSlide + 1]?.type === 'standard-content'
    // @ts-ignore
    ? slides[currentSlide + 1]?.image
    : null;

  return (
    <div className="bg-[#Fdfbf7] min-h-screen text-black overflow-hidden font-sans relative selection:bg-yellow-200">
      <Head>
        {nextSlideImage && <link rel="preload" as="image" href={nextSlideImage} />}
      </Head>

      <div className="absolute inset-0 z-[60] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <WavyBackground />

      {/* Floating Fullscreen button */}
      <div className="fixed top-6 right-6 z-50">
        {mounted && (
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-white/50 backdrop-blur hover:bg-white/80 text-black rounded-full transition-all duration-300 shadow-sm border border-black/5"
          >
            {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
        )}
      </div>

      {/* Main Slide Container */}
      <div
        ref={containerRef}
        onClick={nextSlide}
        className="relative w-full h-screen cursor-pointer select-none p-4 md:p-8 flex items-center justify-center"
      >
        {/* Timer - Fixed Top Left (Inside Container for Fullscreen) */}
        {timerVisible && (
          <div className="fixed top-4 left-4 z-[100] pointer-events-none select-none">
            <span className="font-mono text-xl font-bold text-black/[0.05]">
              {formatTime(timerTime)}
            </span>
          </div>
        )}

        {/* Hidden Preloader for next image */}
        {nextSlideImage && (
          <div className="hidden">
            <Image src={nextSlideImage} alt="preload" width={1} height={1} priority={true} />
          </div>
        )}

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction < 0 ? 50 : -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Elegant ease
            className="w-full h-full max-w-[1700px] max-h-[1000px] mx-auto z-10"
          >
            <SlideContent slide={slides[currentSlide]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function SlideContent({ slide }: { slide: any }) {

  const contentAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  }
  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // Shared Header Component
  const SlideHeader = ({ title, subHeader, header, className, align = "left" }: any) => (
    <div className={cn("mb-[4vh] shrink-0", className, align === "center" && "text-center", align === "right" && "text-right")}>
      {header && <h3 className="text-xs md:text-sm font-black tracking-[0.3em] text-black/40 uppercase mb-2">{header}</h3>}
      <div className="flex flex-col gap-1">
        {subHeader ? (
          <>
            {/* Subheader dominant mode */}
            <h1 className="text-[6vw] lg:text-[5vw] font-black tracking-tighter text-black leading-[0.9]">{subHeader}</h1>
            <h2 className="text-[2.5vw] lg:text-[1.5vw] font-bold text-black/60 tracking-tight leading-none">{title}</h2>
          </>
        ) : (
          /* Title dominant mode */
          <h1 className="text-[5vw] lg:text-[4vw] font-black tracking-tighter text-black leading-none">{title}</h1>
        )}
      </div>
    </div>
  )


  switch (slide.type) {
    case "title":
      return (
        <MasterCard className="text-center items-center justify-center gap-8 !bg-black text-white rounded-none md:rounded-[3rem]">
          {/* Abstract Background Accents */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

          <motion.div variants={contentAnim} initial="hidden" animate="show" className="max-w-[90vw] relative z-10">
            <motion.p variants={itemAnim} className="text-lg md:text-xl font-black tracking-[0.4em] text-white/50 mb-[2vh] uppercase">{slide.header}</motion.p>
            <motion.h1 variants={itemAnim} className="text-[6vw] md:text-[6vw] font-black tracking-tighter leading-[1.0] text-white mb-[4vh] max-w-5xl mx-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">{slide.title}</span>
            </motion.h1>
            <motion.p variants={itemAnim} className="text-xl md:text-2xl font-medium text-white/60 uppercase tracking-widest">{slide.author}</motion.p>
          </motion.div>
        </MasterCard>
      )

    case "quote":
      return (
        <MasterCard className="text-center items-center justify-center bg-[#f8f8f8]">
          <motion.div variants={contentAnim} initial="hidden" animate="show" className="max-w-[85vw]">
            <motion.div variants={itemAnim}><QuoteIcon className="w-[6vw] h-[6vw] text-black/10 mx-auto mb-8" strokeWidth={1} /></motion.div>
            <motion.h3 variants={itemAnim} className="text-sm font-bold tracking-[0.3em] text-black/40 mb-8 uppercase">{slide.header}</motion.h3>
            <motion.h2 variants={itemAnim} className="text-[4vw] font-black leading-[1.1] text-black mb-12 italic tracking-tight relative inline-block">
              {slide.quote}
            </motion.h2>
            <motion.div variants={itemAnim} className="space-y-2">
              <p className="text-[2vw] font-bold text-black">— {slide.author}</p>
            </motion.div>
          </motion.div>
        </MasterCard>
      )

    case "grid":
      // ... existing grid code if needed, but looks like we aren't using grid type in new slides ...
      return null;

    case "statement":
      return (
        <MasterCard className="items-center justify-center text-center !bg-black text-white">
          <div className="max-w-[85vw]">
            <h3 className="text-lg md:text-xl font-black tracking-widest text-white/50 mb-12 uppercase">{slide.header}</h3>
            <h2 className="text-[4.5vw] font-medium leading-[1.2] text-white tracking-tight">
              {slide.text}
            </h2>
          </div>
        </MasterCard>
      )

    case "thesis":
      return (
        <MasterCard className="items-center justify-center text-center border-[20px] border-white/5 !bg-black">
          <div className="max-w-[90vw]">
            <h1 className="text-[6vw] font-black text-white/10 mb-[4vh] uppercase tracking-tighter leading-none absolute top-12 left-0 w-full text-center select-none">
              {slide.header}
            </h1>
            <h2 className="text-[3vw] font-bold leading-[1.3] text-white relative z-10">
              {slide.text}
            </h2>
          </div>
        </MasterCard>
      )

    case "perspectives-intro":
      return (
        <MasterCard className="items-center justify-center text-center">
          <h2 className="text-lg font-black tracking-widest text-black/40 mb-6 uppercase">{slide.header}</h2>
          <h1 className="text-[8vw] font-black tracking-tighter text-black mb-12 leading-none">{slide.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[80vw]">
            {slide.perspectives.map((p: any, i: number) => (
              <div key={i} className="bg-black text-white rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
                <p.icon className="w-[6vw] h-[6vw] mb-4 text-white/90" strokeWidth={1} />
                <div>
                  <span className="text-[3vw] font-black uppercase tracking-widest block mb-2">{p.label}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </MasterCard>
      )

    case "standard-content":
      const hasImage = !!slide.image;
      const isRightLayout = slide.layout === 'right'; // Image on right, Text on left

      // Default left layout: Image Left, Text Right
      // Right layout: Text Left, Image Right

      return (
        <MasterCard>
          <div className="flex flex-col h-full">
            <SlideHeader title={slide.title} subHeader={slide.subHeader} header={slide.header} />

            <div className={cn(
              "flex flex-1 gap-8 min-h-0 items-center",
              isRightLayout ? "flex-row" : "flex-row-reverse"
            )}>
              {/* Bullets Block */}
              {slide.bullets && (
                <div className="w-1/2 flex flex-col justify-center space-y-6 pl-4">
                  {slide.bullets.map((bullet: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: isRightLayout ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (0.1 * i) }}
                      className="flex gap-4 items-start group"
                    >
                      <div className="w-2 h-2 rounded-full bg-black group-hover:bg-blue-600 mt-2.5 shrink-0 transition-colors" />
                      <p className="text-[1.6vw] font-medium leading-relaxed text-slate-800">{bullet}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Image Block */}
              {hasImage ? (
                <div className={cn(
                  "relative h-full rounded-[2rem] overflow-hidden bg-gray-100 min-h-0 shadow-lg ring-1 ring-black/5",
                  slide.bullets ? "w-1/2" : "w-full"
                )}>
                  <Image
                    src={slide.image}
                    alt={slide.title || "Slide Image"}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                    priority={true}
                  />
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black">{slide.citation}</p>
                  </div>
                </div>
              ) : (
                <div className={cn(
                  "rounded-[2rem] bg-gray-50 flex items-center justify-center border-2 border-dashed border-black/10",
                  slide.bullets ? "w-1/2" : "w-full"
                )}>
                  <p className="text-black/30 font-bold uppercase tracking-widest">Image Unavailable</p>
                </div>
              )}
            </div>
          </div>
        </MasterCard>
      )

    case "conclusion":
      return (
        <MasterCard className="justify-center bg-black text-white">
          <div className="max-w-[85vw] mx-auto w-full">
            <h3 className="text-lg font-black tracking-widest text-white/40 uppercase mb-4">{slide.header}</h3>
            <h1 className="text-[7vw] font-black tracking-tighter text-white mb-16 border-b border-white/20 pb-8">{slide.title}</h1>
            <div className="space-y-6 mb-8">
              {slide.items.map((item: string, i: number) => (
                <div key={i} className="flex gap-6 items-center">
                  <ArrowRight className="text-blue-500 shrink-0 w-[4vw] h-[4vw]" strokeWidth={3} />
                  <span className="text-[3.5vw] font-bold text-white leading-tight tracking-tight">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-8 pt-8 mt-12 border-t border-white/10 opacity-60">
              <p className="text-sm font-mono uppercase tracking-widest">Digital Communities = Social Infrastructure</p>
            </div>
          </div>
        </MasterCard>
      )

    case "references":
      return (
        <MasterCard>
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-black tracking-widest text-black/30 uppercase mb-4">{slide.header}</h3>
            <h1 className="text-[6vw] font-black tracking-tighter text-black mb-6 uppercase border-b-4 border-black pb-4">{slide.title}</h1>
            <div className="overflow-y-auto flex-1 pr-6 custom-scrollbar space-y-4 pb-8">
              {slide.refs.map((ref: string, i: number) => (
                <div key={i} className="pl-8 -indent-8 text-[1.4vw] font-medium text-slate-700 leading-relaxed hover:text-black transition-colors">
                  {ref}
                </div>
              ))}
            </div>
          </div>
        </MasterCard>
      )

    default: return null
  }
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
