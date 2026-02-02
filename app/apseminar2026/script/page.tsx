"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Pause, RotateCcw, X, Maximize2, HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

const scriptData = [
  {
    slide: "1. Title Slide",
    section: "Intro",
    duration: "0:00 - 0:15",
    text: `Good morning. My name is Taylor Daan. Today asking you to rethink where we live. My presentation is "Digital Communities as Essential Social Infrastructure."`,
    cues: ["Stand tall", "Make eye contact", "Clear voice"],
  },
  {
    slide: "2. The Axis of Memory",
    section: "Intro",
    duration: "0:15 - 0:45",
    text: `Haruki Murakami writes about the "Axis of Memory." He says who we are comes from what we see every day. We need our physical surroundings to know who we are.
    
    Why does this matter? When those surroundings are destroyed, we lose our sense of self. We forget who we are because we lose the proof of our existence.`,
    cues: ["Slow pace", "Emphasize 'Axis'", "Gestures"],
  },
  {
    slide: "3. Context - Key Factors",
    section: "Context",
    duration: "0:45 - 1:15",
    text: `For millions of people, that anchor is gone. It was removed by neglect. 
    
    Ben Goldfarb writes in *Crossings* that highways and sprawl cut us off from each other. We built towns where we can't meet people. This destroys trust. You can't trust a neighbor you can't reach.`,
    cues: ["Point to screen", "Stern tone"],
  },
  {
    slide: "4. The Problem",
    section: "Problem",
    duration: "1:15 - 2:00",
    text: `This is hurting us physically. 
    
    In 2023, the U.S. Surgeon General called loneliness an epidemic. Being lonely is as deadly as smoking 15 cigarettes a day. It increases the risk of early death by 29%.
    
    We are facing a crisis of connection.`,
    cues: ["Emphasize '15 cigarettes'", "Serious pause"],
  },
  {
    slide: "5. Research Question",
    section: "RQ",
    duration: "2:00 - 2:15",
    text: `So I asked: 
    
    Can digital communities be real social spaces for people who are isolated from physical spaces?`,
    cues: ["Read clearly", "Scan audience"],
  },
  {
    slide: "6. Key Concepts",
    section: "Definitions",
    duration: "2:15 - 2:40",
    text: `To answer this, look at "Third Places." Ray Oldenburg coined this term for neutral connection hubs—coffee shops, parks, libraries.
    
    But many live in "Social Deserts"—places designed without interaction. We need "Bridging Social Capital"—connections that bind society together.`,
    cues: ["Define 'Third Place'", "Hand gestures"],
  },
  {
    slide: "7. Thesis Statement",
    section: "Argument",
    duration: "2:40 - 3:00",
    text: `Here is my answer: 
    
    For those trapped in Social Deserts, Virtual Communities work as necessary "Third Places." They are an essential way to build social capital and support inclusion.`,
    cues: ["Strong conviction", "One sentence"],
  },
  {
    slide: "8. Perspectives Overview",
    section: "Roadmap",
    duration: "3:00 - 3:10",
    text: `I looked at this in two ways:
    
    1. Structural: The barriers to physical entry.
    2. Economic: The cost of digital connection.`,
    cues: ["Count 1, 2"],
  },
  {
    slide: "9. P1: Networked Publics",
    section: "Structural",
    duration: "3:10 - 3:45",
    text: `First, the Structural Perspective. Why not just "go outside"?
    
    For youth, the outside is restricted. danah boyd writes in *It's Complicated* that due to curfews and safety fears, the internet is the *only* unsupervised public space left for teens. They are banned from the town square.`,
    cues: ["Emphasize 'only impact'", "Sympathetic tone"],
  },
  {
    slide: "10. P1: Friction Costs",
    section: "Structural",
    duration: "3:45 - 4:15",
    text: `For adults, it's design. Goldfarb discusses "Friction Costs." 
    
If visiting a friend takes a 45-minute drive, the friction is too high. You stay home. Suburban sprawl creates Social Deserts where community is structurally impossible.`,
    cues: ["Relatable tone"],
  },
  {
    slide: "11. P1: Counterargument",
    section: "Structural",
    duration: "4:15 - 4:45",
    text: `Critics like Constance Steinkuehler denote that digital spaces serve corporations. 
    
    Platforms prioritize profit. However, looking at the structural barriers, for many, the "imperfect" digital space is the only space accessible at all.`,
    cues: ["Concede point", "Pivot back"],
  },
  {
    slide: "12. P2: Surveillance Capitalism",
    section: "Economic",
    duration: "4:45 - 5:30",
    text: `Moving to the Economic Perspective.
    
    Shoshana Zuboff warns of "Surveillance Capitalism." Platforms like TikTok prioritize prediction over connection. They extract our experience as data. If the "Third Place" is a data mine, can it support community?`,
    cues: ["Warning tone", "Slow down"],
  },
  {
    slide: "13. P2: Illusion of Companionship",
    section: "Economic",
    duration: "5:30 - 6:00",
    text: `Sherry Turkle writes in *Alone Together* that we settle for the "illusion of companionship." 
    
    In digital space, we edit out the awkwardness. We sip on a simulation of friendship while our biological need for intimacy starves.`,
    cues: ["Poetic delivery", "Sadness"],
  },
  {
    slide: "14. P2: Counter - Lifeline",
    section: "Economic",
    duration: "6:00 - 6:45",
    text: `However, this view comes from privilege. It assumes we *have* a choice between perfect organic connection and imperfect digital connection.
    
For a disabled senior or a rural teen, that choice doesn't exist. It is Digital Community or Total Isolation. A starving person accepts food regardless of whether the store is corporate.`,
    cues: ["Passionate defense", "Strongest point"],
  },
  {
    slide: "15. Limitations & Implications",
    section: "Discussion",
    duration: "6:45 - 7:30",
    text: `There is one big problem: Digital contact can't replicate the physical stress-relief of a hug. It is not perfect.
    
    But here is the reality. We cannot wait for better cities to save us. We must see digital access as immediate "Harm Reduction." It is an imperfect tool, but for the isolated, it is the only tool that works.`,
    cues: ["Nuanced", "Shift to Urgent"],
  },
  {
    slide: "16. Conclusion",
    section: "Synthesis",
    duration: "7:15 - 7:50",
    text: `In conclusion:
1. Our physical axis is broken by neglect.
2. Until we rebuild our cities, Digital Communities are Essential Infrastructure.
3. They are life rafts.

Rather than shaming screen time, we must ask: *Why is this the only place they have left to go?*`,
    cues: ["Final thought", "Powerful close"],
  },
  {
    slide: "17. References",
    section: "End",
    duration: "7:50 - 8:00",
    text: `Thank you.`,
    cues: ["Smile", "Nod"],
  },
]

const reflectionQuestions = [
  {
    q: "What information did you need before you began your research, and how did that information shape your research?",
    a: "I needed to understand if 'digital community' was biologically valid. I started by reading Cacioppo's neuroscience research on loneliness. That shaped my whole argument because it forced me to admit that digital contact *is* biologically inferior to physical contact. Instead of arguing that digital is 'better,' I shifted to arguing that it is a necessary form of 'harm reduction' for those who physically cannot access the superior option."
  },
  {
    q: "What evidence did you gather that you didn’t use? Why did you choose not to use it?",
    a: "I researched VR and Metaverse communities extensively. I found fascinating data on 'phantom touch' in VR. I chose not to use it because it felt too niche and futuristic. I wanted my argument to apply to the common person using Discord or texting, not just VR enthusiasts. Focusing on VR would have made the argument seem less universal."
  },
  {
    q: "How valid and reliable are the sources you used? How do you know? Which sources didn’t work?",
    a: "I prioritized academic sociologists like Boyd and Turkle because they have longitudinal data. Turkle's 'Alone Together' is a seminal text. I also used the Surgeon General's report for health stats, which is highly reliable gov data. I discarded some 'tech optimist' blogs because they lacked data and were just opinion pieces defending social media without acknowledging the economic surveillance aspect."
  },
  {
    q: "How did you select the strategies you used to gather information or conduct research? Were they effective?",
    a: "I used a 'Lens' strategy. I specifically looked for 'Structural' (urban planning) and 'Economic' (surveillance) sources separately. This was effective because it prevented me from getting stuck in a generic 'is social media good or bad' debate. It forced me to look at the *infrastructure* of connection, not just the content."
  },
  {
    q: "How did your research question evolve as you moved through the research process?",
    a: "Initially, my RQ was 'Is social media making us lonely?' It was too broad and binary. After reading Goldfarb on 'Friction Costs,' I realized the issue wasn't the phone, but the *lack of physical alternatives*. I shifted the question to 'To what extent could digital communities be meaningful social spaces *for those isolated from physical spaces*?' This qualification made the argument much stronger and more specific."
  },
  {
    q: "What information did you need that you weren’t able to find or locate? How did you go about trying to find that information?",
    a: "I struggled to find direct comparison data on 'loneliness reduction' between pure digital users vs. pure physical users, because almost everyone uses both. It was hard to isolate variables. I tried to find studies on shut-ins or elderly populations restricted to home, using that as a proxy for 'pure digital' reliance, which helped fill the gap."
  },
  {
    q: "How did you handle the differing perspectives in order to reach a conclusion?",
    a: "I placed Turkle (Digital is fake) in direct conversation with the 'Social Desert' reality. I acknowledged Turkle is right about the *quality* of connection, but countered that she ignores the *access* to connection. My conclusion synthesized them: Digital connection is lower quality but higher accessibility, making it essential infrastructure for the isolated."
  },
  {
    q: "What advice would you have for other researchers who consider this topic?",
    a: "Don't get trapped in the 'content' wars. It doesn't matter if TikTok is toxic or not. Focus on the *function* of the connection. Look at it as infrastructure, like roads or bridges. It changes the entire analysis from a moral judgment to a structural necessity."
  },
  {
    q: "If you had more time, what additional research would you conduct related to this issue?",
    a: "I would research the specific design features of digital spaces that *promote* bridging capital vs those that destroy it. For example, comparing the social health of a Discord server vs. an Instagram feed. My current research treats 'digital' as one big bucket, but the nuances between platforms likely matter valid."
  }
]

const argumentationQuestions = [
  {
    q: "What additional questions emerged from your research? Why are these questions important?",
    a: "A huge question is: If digital spaces are essential infrastructure, should they be public utilities? If Discord is the new town square, should a CEO control it? This is important because my argument establishes them as 'essential,' which logically leads to regulation, but I didn't have space to explore the legal nightmare of regulating independent platforms."
  },
  {
    q: "What might be the real-world implications or consequences of your findings?",
    a: "The implication is that urban planners need to see 'broadband access' as a mental health intervention, not just an economic one. For communities, it means we need to stop shaming screen time for isolated groups (like the elderly) and start teaching 'healthy digital citizenship' to maximize the connection benefits while minimizing the surveillance risks."
  },
  {
    q: "Explain the level of certainty you have about your conclusion, solution, or recommendation.",
    a: "I am highly certain that physical infrastructure is failing connection (the Surgeon General data is irrefutable). I am moderately certain that digital spaces are the *best* stopgap. It's possible that other interventions (like community centers) are better, but given the speed of the crisis, I am confident that validating digital community is the most immediate effective solution."
  },
  {
    q: "How does your conclusion respond to any of the other research or sources you examined?",
    a: "My conclusion pushes back against the 'Digital Detox' narrative popular in pop psychology. Sources like Turkle suggest less tech is better. My conclusion argues that for many, less tech means *zero* contact. I respond by arguing that 'detox' is a privileged solution for those with a physical village to return to."
  },
  {
    q: "How did you use the conclusions and questions of others to advance your own research?",
    a: "I used Oldenburg's definition of 'Third Places' (which he meant for coffee shops) and applied it to Discord servers. Using his criteria (neutral ground, leveler, conversation as main activity), I proved that digital spaces *fit* his definition, even though he never intended them to. This allowed me to 'stand on the shoulders' of established sociology to validate a modern phenomenon."
  }
]

export default function ScriptPage() {
  const [time, setTime] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false) // Start paused
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(-1)
  const [showModal1, setShowModal1] = React.useState(false) // Reflection
  const [showModal2, setShowModal2] = React.useState(false) // Argumentation
  const [isFocusMode, setIsFocusMode] = React.useState(false)
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([])

  // Helper to parse "M:SS - M:SS" into start/end seconds
  const getSecondsRange = (durationStr: string) => {
    if (!durationStr) return { start: 0, end: 0 }
    const [startStr, endStr] = durationStr.split(" - ")
    const parse = (t: string) => {
      if (!t) return 0
      const parts = t.split(":").map(Number)
      if (parts.length !== 2) return 0
      const [m, s] = parts
      return m * 60 + s
    }
    return { start: parse(startStr), end: parse(endStr) }
  }

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault()

        let currentIdx = activeSlideIndex
        if (currentIdx === -1) {
          currentIdx = scriptData.findIndex(item => {
            const range = getSecondsRange(item.duration)
            return time >= range.start && time < range.end
          })
          if (currentIdx === -1 && time === 0) currentIdx = 0
        }

        let nextIdx = currentIdx
        if (e.key === 'ArrowRight') {
          nextIdx = Math.min(scriptData.length - 1, currentIdx + 1)
        } else if (e.key === 'ArrowLeft') {
          nextIdx = Math.max(0, currentIdx - 1)
        }

        if (nextIdx !== currentIdx) {
          const range = getSecondsRange(scriptData[nextIdx].duration)
          setTime(range.start)
          // REMOVED setActiveSlideIndex here to force reflow via effect
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlideIndex, time])

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  React.useEffect(() => {
    const newActiveIndex = scriptData.findIndex((item) => {
      const { start, end } = getSecondsRange(item.duration)
      return time >= start && time < end
    })

    if (newActiveIndex !== -1 && newActiveIndex !== activeSlideIndex) {
      setActiveSlideIndex(newActiveIndex)
      if (slideRefs.current[newActiveIndex]) {
        slideRefs.current[newActiveIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  }, [time, activeSlideIndex])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setIsActive(false)
    setTime(0)
    setActiveSlideIndex(-1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen bg-gray-50 text-black font-sans p-6 md:p-12 pb-32 transition-all duration-500 ${isFocusMode ? "bg-gray-900" : ""}`}>
      <div className={`max-w-4xl mx-auto transition-all duration-500 ${isFocusMode ? "max-w-6xl" : ""}`}>
        <div className="flex items-center gap-4 mb-12">
          <Link href="/apseminar2026" className={`p-3 rounded-full shadow-sm hover:shadow-md transition-all ${isFocusMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-black/60 hover:text-black"}`}>
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className={`text-3xl font-black tracking-tighter uppercase ${isFocusMode ? "text-white" : "text-black"}`}>Presentation Script</h1>
            <p className={`${isFocusMode ? "text-white/50" : "text-black/50"} font-medium`}>Digital Communities & Social Infrastructure • Target Time: 8:00 Minutes</p>
          </div>
        </div>

        <div className="space-y-8">
          {scriptData.map((item, index) => {
            const isCurrent = index === activeSlideIndex
            return (
              <motion.div
                key={index}
                ref={(el) => { slideRefs.current[index] = el }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isFocusMode && !isCurrent ? 0.3 : 1,
                  filter: isFocusMode && !isCurrent ? "blur(2px)" : "blur(0px)",
                  y: 0,
                  scale: isCurrent ? (isFocusMode ? 1.05 : 1.02) : 1,
                  borderWidth: isCurrent ? "4px" : "2px",
                  borderColor: isCurrent ? "#3b82f6" : "transparent"
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl p-8 border-2 transition-all duration-300 ${isCurrent
                  ? "shadow-xl ring-4 ring-blue-500/10 z-10 bg-white"
                  : `${isFocusMode ? "bg-gray-800 border-transparent text-gray-500" : "bg-white border-transparent shadow-sm hover:shadow-md"}`
                  }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-sm font-bold uppercase tracking-widest ${isCurrent ? "text-blue-600" : (isFocusMode ? "text-gray-500" : "text-gray-400")}`}>
                    {item.slide} • {item.section}
                  </span>
                  <span className={`font-mono text-sm ${isCurrent ? "text-blue-600 font-bold" : "text-gray-400"}`}>
                    {item.duration}
                  </span>
                </div>
                <p className={`whitespace-pre-wrap mb-6 transition-all duration-300 ${isFocusMode && isCurrent
                  ? "text-5xl md:text-6xl leading-tight font-black text-black"
                  : isCurrent
                    ? "text-2xl leading-relaxed font-medium text-black"
                    : (isFocusMode ? "text-2xl text-gray-500" : "text-2xl text-gray-600")
                  }`}>
                  {item.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.cues.map((cue, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isCurrent ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
                      }`}>
                      {cue}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Sticky Timer & Controls */}
      <div className="fixed bottom-8 right-8 bg-black text-white p-6 rounded-3xl shadow-2xl z-50 flex items-center gap-6">
        <div className="font-mono text-4xl font-bold tracking-widest">
          {formatTime(time)}
        </div>
        <div className="flex gap-2 border-l border-white/20 pl-6">
          <button onClick={() => setIsFocusMode(!isFocusMode)} className={`p-3 rounded-full transition-colors ${isFocusMode ? "bg-blue-600 hover:bg-blue-700" : "bg-white/10 hover:bg-white/20"}`} title="Toggle Peripheral Mode">
            <Maximize2 size={24} />
          </button>
          <button onClick={toggleTimer} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={resetTimer} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            <RotateCcw size={24} />
          </button>
        </div>
      </div>

      {/* Q&A Buttons */}
      <div className="fixed bottom-8 left-8 flex gap-4 z-40">
        <button
          onClick={() => setShowModal1(true)}
          className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all font-bold"
        >
          <HelpCircle size={24} />
          Reflection
        </button>
        <button
          onClick={() => setShowModal2(true)}
          className="flex items-center gap-3 px-6 py-4 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 transition-all font-bold"
        >
          <MessageCircle size={24} />
          Argumentation
        </button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showModal1 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-900/95 z-[60] flex justify-center p-4 md:p-8 backdrop-blur-md overflow-y-auto"
          >
            <div className="max-w-3xl w-full text-white space-y-8 relative py-20">
              <button
                onClick={() => setShowModal1(false)}
                className="fixed top-6 right-6 md:top-8 md:right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-50"
              >
                <X size={32} />
              </button>
              <h2 className="text-4xl font-black mb-8 border-b border-white/20 pb-4">Reflection on Process</h2>
              <div className="space-y-8">
                {reflectionQuestions.map((item, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg">
                    <p className="font-bold text-xl mb-4 text-blue-200 block">{i + 1}. {item.q}</p>
                    <p className="text-lg leading-relaxed text-white/90">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {showModal2 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-purple-900/95 z-[60] flex justify-center p-4 md:p-8 backdrop-blur-md overflow-y-auto"
          >
            <div className="max-w-3xl w-full text-white space-y-8 relative py-20">
              <button
                onClick={() => setShowModal2(false)}
                className="fixed top-6 right-6 md:top-8 md:right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all z-50"
              >
                <X size={32} />
              </button>
              <h2 className="text-4xl font-black mb-8 border-b border-white/20 pb-4">Extending Argumentation</h2>
              <div className="space-y-8">
                {argumentationQuestions.map((item, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg">
                    <p className="font-bold text-xl mb-4 text-purple-200 block">{i + 1}. {item.q}</p>
                    <p className="text-lg leading-relaxed text-white/90">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
