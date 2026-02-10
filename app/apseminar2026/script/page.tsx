"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Pause, RotateCcw, X, Maximize2, HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

const scriptData = [
  {
    slide: "1. Title Slide",
    section: "Opening",
    duration: "0:00 - 0:07",
    text: `Good morning. My name is Taylor Daan. My presentation is titled "Digital Communities as Essential Social Infrastructure."`,
    cues: ["Stand tall", "Eye contact", "Clear voice"],
  },
  {
    slide: "2. Opening Quote — Surgeon General",
    section: "Hook",
    duration: "0:15 - 0:45",
    text: `In 2023, the U.S. Surgeon General Dr. Vivek Murthy issued an advisory stating: "Loneliness is far more than just a bad feeling. It harms both individual and societal health. It is associated with a greater risk of cardiovascular disease, dementia, stroke, depression, anxiety, and premature death."

I chose this quote because it establishes the medical severity of the problem my research investigates. The Surgeon General's advisory is what led me to ask whether digital communities could address this crisis.`,
    cues: ["Read the quote slowly", "Pause after 'premature death'"],
  },
  {
    slide: "3. The Problem — Loneliness Epidemic",
    section: "Problem",
    duration: "0:45 - 1:20",
    text: `The Surgeon General's data shows that loneliness increases the risk of premature death by 29 percent. Its health impact is equivalent to smoking 15 cigarettes a day. Half of all U.S. adults report measurable loneliness.

On screen you can see the cover of the Surgeon General's 2023 advisory report. I include this image because it shows the audience that this data comes from an official federal health document, which establishes its credibility as a primary source.

I present this data to establish the scale of the issue. Loneliness is a measurable public health crisis, and understanding its cause is the next step.`,
    cues: ["Gesture to image", "Emphasize '15 cigarettes'", "Transition naturally to cause"],
  },
  {
    slide: "4. Root Cause — Disappearing Third Places",
    section: "Cause",
    duration: "1:20 - 2:00",
    text: `The sociologist Ray Oldenburg identified "Third Places" — coffee shops, parks, libraries, and town squares where people gather outside of home and work. These spaces are where community forms.

Ben Goldfarb, an environmental journalist, writes in Crossings that American infrastructure — highways, suburban sprawl, car-dependent planning — has created "Social Deserts," which are neighborhoods designed without any place to gather.

On screen you can see an aerial photograph of a typical American suburb. I chose this image because it shows exactly what a Social Desert looks like — rows of houses with no sidewalks, no town square, and no visible place for people to gather. The image makes Goldfarb's concept concrete for the audience.`,
    cues: ["Gesture to image when describing Social Desert", "Name Oldenburg and Goldfarb clearly"],
  },
  {
    slide: "5. Research Question",
    section: "Question",
    duration: "2:00 - 2:15",
    text: `Given that loneliness is a health crisis caused by the disappearance of physical gathering spaces, my research question is:

To what extent can digital communities serve as meaningful social spaces for those who are isolated from physical Third Places?`,
    cues: ["Read clearly", "Deliberate pace"],
  },
  {
    slide: "6. Key Concepts — Definitions",
    section: "Framework",
    duration: "2:15 - 2:40",
    text: `To investigate this question, I used three key concepts.

First: Third Places, from Oldenburg — neutral gathering spots that are outside home and work.

Second: Social Deserts, from Goldfarb — areas designed without spaces for people to interact.

Third: Bridging Social Capital, from Robert Putnam — connections across diverse groups that hold communities together.

I use these three concepts because they form a framework: Third Places are the solution, Social Deserts are the problem, and Bridging Social Capital is the measure of whether a community is functioning.`,
    cues: ["Count off 1-2-3 with fingers", "Explain the framework connection"],
  },
  {
    slide: "7. Thesis Statement",
    section: "Argument",
    duration: "2:40 - 3:00",
    text: `My argument is:

For individuals trapped in Social Deserts, virtual communities function as necessary Third Places. They provide essential social infrastructure and support social inclusion.`,
    cues: ["Clear conviction", "Pause after stating thesis"],
  },
  {
    slide: "8. Perspectives Overview",
    section: "Roadmap",
    duration: "3:00 - 3:10",
    text: `I examined this issue through two perspectives.

First, Structural: who is excluded from physical spaces, and why.

Second, Empirical: whether digital spaces actually function as Third Places based on evidence.`,
    cues: ["Count 'First... Second...'", "Brief and clear"],
  },
  {
    slide: "9. P1 Structural — Youth Exclusion",
    section: "Structural",
    duration: "3:10 - 3:40",
    text: `Starting with the Structural Perspective.

danah boyd, a researcher at Microsoft, writes in It's Complicated that American teens face curfew laws, parental restrictions, and safety fears that prevent them from accessing public spaces. For many young people, the internet is the only unsupervised public venue available to them. Their exclusion is legal and systemic.

On screen you can see an empty playground that has been closed off. I chose this image because it is a direct visual example of what boyd describes — a public space that exists physically but is blocked off. For many young people, this is what access to a Third Place looks like.

I use boyd's research here because it shows that for an entire demographic, physical Third Places are inaccessible. The barrier is structural.`,
    cues: ["Gesture to image", "Cite boyd with her credentials"],
  },
  {
    slide: "10. P1 Structural — Suburban Friction Costs",
    section: "Structural",
    duration: "3:40 - 4:10",
    text: `This structural exclusion also affects adults. Goldfarb introduces the concept of "Friction Costs" — the time and effort required to reach another person.

On screen you can see an aerial view of a highway interchange. I chose this image because it shows the infrastructure that creates friction costs. These roads were designed for cars, and they physically divide neighborhoods. There is nowhere in this image to walk, sit, or meet a neighbor. This is what Goldfarb means by a Social Desert.

In suburban areas, visiting a friend might require a 45-minute drive. Spontaneous connection becomes very difficult.

I return to Goldfarb here because his Friction Costs concept explains why adults in suburbs are also cut off from Third Places — the same structural cause, different demographic.`,
    cues: ["Gesture to image when describing friction", "Conversational tone"],
  },
  {
    slide: "11. P2 Empirical — Digital Third Places",
    section: "Empirical",
    duration: "4:10 - 4:50",
    text: `Moving to the Empirical Perspective: do digital spaces actually fill the gap left by disappearing Third Places?

Constance Steinkuehler, a professor of informatics, and Dmitri Williams published a 2006 study examining massively multiplayer online games. They found that these communities meet every criterion Oldenburg set for Third Places: neutral ground, regular participants, and conversation as the primary activity. Real bridging social capital forms across geographic and demographic lines.

On screen you can see an example of a Discord community server. I chose this image because it shows what a digital Third Place actually looks like in practice — a persistent space where people gather, have conversations, and form ongoing relationships. This is the modern version of what Oldenburg described.

I use Steinkuehler and Williams because they are the strongest direct evidence that digital spaces can function as Third Places using Oldenburg's own criteria.`,
    cues: ["Gesture to image", "Evidence-based tone", "Cite with credentials"],
  },
  {
    slide: "12. P2 Empirical — Bridging Capital Beyond Geography",
    section: "Empirical",
    duration: "4:50 - 5:20",
    text: `Robert Putnam, a political scientist at Harvard, showed that bridging social capital — connections between people who are different from each other — is what holds communities together.

Online communities remove the geographic barrier. A disabled person, a rural teen, or a homebound senior can access social life that their physical environment does not provide. Discord servers, forums, and online guilds replicate the gathering functions that sprawl removed.

I use Putnam here because his framework measures whether a community is actually functioning. Steinkuehler and Williams showed digital spaces meet the Third Place criteria; Putnam's concept confirms they also produce the social capital that communities need.`,
    cues: ["Cite Putnam with credentials", "Connect to Steinkuehler"],
  },
  {
    slide: "13. Counterargument — The Quality Problem",
    section: "Counter",
    duration: "5:20 - 6:00",
    text: `There are valid criticisms of this position.

Sherry Turkle, a professor at MIT, argues in Alone Together that digital bonds create an "illusion of companionship." In digital space, people edit out vulnerability and awkwardness, so the connections that form may be shallow.

On screen you can see the cover of Turkle's book Alone Together. I chose to display this because the title itself captures the core counterargument — the idea that people can be digitally connected and still fundamentally alone.

Shoshana Zuboff, a professor at Harvard Business School, argues in The Age of Surveillance Capitalism that platforms like TikTok and Instagram exist to extract behavioral data for profit. Connection is secondary to their business model.

I include both Turkle and Zuboff because they represent the strongest objections to my thesis — that digital connection lacks quality, and that the platforms hosting it are exploitative.`,
    cues: ["Gesture to book cover", "Concede honestly", "Name both with credentials"],
  },
  {
    slide: "14. Rebuttal — A Necessary Lifeline",
    section: "Rebuttal",
    duration: "6:00 - 6:40",
    text: `Both criticisms assume the person has a choice between physical and digital connection.

For a disabled senior or a rural teenager living in a Social Desert, that alternative does not exist. The available options are digital community or total isolation.

Quan-Haase and Wellman, researchers in network sociology, proposed thinking of digital connection as "harm reduction" — an imperfect tool that still addresses a real need.

I use the harm reduction framework because it directly addresses Turkle and Zuboff's concerns. It acknowledges that digital connection has limitations while arguing that for the isolated, it remains the most accessible option.`,
    cues: ["Strongest point", "Explain the rebuttal logic"],
  },
  {
    slide: "15. Limitations — Physiological Limits",
    section: "Nuance",
    duration: "6:40 - 7:10",
    text: `There are real limitations to digital connection.

John Cacioppo, a neuroscientist at the University of Chicago, showed that text-based interaction cannot replicate the physiological stress relief of in-person contact. Physical proximity reduces cortisol in ways that text messages cannot.

I include Cacioppo because intellectual honesty requires acknowledging what digital communities cannot do. The long-term goal remains rebuilding physical Third Places. Digital infrastructure serves as a bridge in the meantime.`,
    cues: ["Honest, measured tone", "Frame as bridge"],
  },
  {
    slide: "16. Conclusion — Synthesis",
    section: "Close",
    duration: "7:10 - 7:45",
    text: `In conclusion:

Physical Third Places are disappearing due to decades of structural neglect — suburban sprawl, highway design, and the creation of Social Deserts.

Digital communities fill this gap as essential social infrastructure. For millions of isolated people, they are the most accessible lifeline available.

Rather than dismissing screen time, we should ask why digital space is the only gathering place many people have left. Thank you.`,
    cues: ["Slow, deliberate close", "Final question as takeaway", "Pause, then 'Thank you'"],
  },
  {
    slide: "17. Works Cited",
    section: "End",
    duration: "7:45 - 8:00",
    text: `These are my sources. I am happy to take any questions.`,
    cues: ["Smile", "Nod", "Open posture"],
  },
]

// ──────────────────────────────────────────────────────────
// REFLECTION Q&A — Anchor: Surgeon General's Advisory
// ──────────────────────────────────────────────────────────

const reflectionQuestions = [
  {
    q: "What information did you need before you began your research, and how did that information shape your research?",
    a: `Before I started, I honestly didn't know if loneliness was actually dangerous or if people were just being dramatic about it. Then I read the Surgeon General's 2023 report, and it said loneliness raises your risk of dying early by 29% — that's as bad as smoking 15 cigarettes a day. That completely changed my research. I stopped thinking about "is social media good or bad" and started thinking about "people are literally dying from being alone — can the internet help?"`
  },
  {
    q: "What evidence did you gather that you didn't use? Why did you choose not to use it?",
    a: `I found a lot of stuff about Instagram making teens anxious and depressed. But I didn't end up using it because my research wasn't about social media making people feel bad — it was about whether online spaces can give people a community when they don't have one in real life. The Instagram anxiety stuff was about a different problem than what I was trying to solve.`
  },
  {
    q: "How valid and reliable are the sources you used? How do you know? Which sources didn't work?",
    a: `The Surgeon General's report is the most solid source I have — it's an official federal health document based on years of medical data. You can't really argue with it. What didn't work were random blog posts and opinion pieces about loneliness. They had good stories but no real data behind them, so I couldn't build an argument on them.`
  },
  {
    q: "How did you select the strategies you used to gather information or conduct research? Were they effective?",
    a: `I started with the problem first — the Surgeon General said people are dying from isolation. Then I worked backwards: okay, why are they isolated? And can anything fix it? That kept me really focused. Instead of reading everything about technology, I only looked at things that directly addressed the isolation problem. It saved me a lot of time.`
  },
  {
    q: "How did your research question evolve as you moved through the research process?",
    a: `At first I was asking "is technology bad for us?" which is way too broad. But once I saw the Surgeon General's numbers — that isolation kills as many people as smoking — my question became much more specific: "Can online communities actually help isolated people?" It went from a vague opinion question to a real health question.`
  },
  {
    q: "What information did you need that you weren't able to find or locate? How did you go about trying to find that information?",
    a: `I really wanted a study that showed, like, "people who use Discord have lower stress hormones." That doesn't exist yet. The medical side only has data on in-person contact reducing stress. So I had to work around it — I used studies that proved online spaces work like real community spaces, even though I couldn't prove they have the exact same biological effect.`
  },
  {
    q: "How did you handle the differing perspectives in order to reach a conclusion?",
    a: `One side says "we need connection or people die" — that's the Surgeon General. The other side says "online connection isn't real" — that's Turkle. My conclusion was basically: okay, maybe online isn't perfect, but if someone has zero access to real-life community, an imperfect online community is way better than nothing. It's not ideal, but it keeps people alive.`
  },
  {
    q: "What advice would you have for other researchers who consider this topic?",
    a: `Start with the health data. The Surgeon General's report gives you something solid to anchor everything to. It's really easy to get lost in opinions about whether phones are good or bad, but if you keep coming back to "loneliness literally kills people," it keeps your argument grounded in something that actually matters.`
  },
  {
    q: "If you had more time, what additional research would you conduct related to this issue?",
    a: `I'd want to see if there's ever a follow-up from the Surgeon General that specifically talks about online communities as a solution, not just a risk. Right now the report mostly treats technology as part of the problem. I think there's a gap there — someone needs to study whether platforms like Discord actually reduce the health effects of isolation.`
  },
]

// ──────────────────────────────────────────────────────────
// ARGUMENTATION Q&A — Anchor: Oldenburg & Steinkuehler
// ──────────────────────────────────────────────────────────

const argumentationQuestions = [
  {
    q: "What additional questions emerged from your research? Why are these questions important?",
    a: `The big one is: does this still work with modern apps? The communities I studied — like MMO guilds and Discord servers — have regulars who show up, talk, and build relationships. But TikTok just feeds you random videos. You don't build a community scrolling TikTok. So the question is: which platforms actually create community, and which ones just create content? That distinction matters a lot for my argument.`
  },
  {
    q: "What might be the real-world implications or consequences of your findings?",
    a: `If online communities really do work like parks and coffee shops — places where people actually connect — then we should treat internet access like we treat public infrastructure. We fund parks because people need somewhere to gather. If a Discord server does the same thing for a kid in a rural town, then cutting off their internet is like locking the park gates.`
  },
  {
    q: "Explain the level of certainty you have about your conclusion, solution, or recommendation.",
    a: `I'm very confident that some online spaces genuinely work as community spaces — the research on gaming communities specifically tested for that and they passed. Where I'm less sure is whether this applies to every platform. A tight-knit Discord server? Yes. A random Twitter feed? Probably not. So my conclusion is strong for certain types of spaces, not all of them.`
  },
  {
    q: "How does your conclusion respond to any of the other research or sources you examined?",
    a: `Turkle says online connection is shallow and fake. My response is: maybe it feels different, but it does the same job. If people are showing up regularly, having real conversations, and forming friendships — which the research shows they are — then it doesn't matter that it's on a screen. What matters is whether it works, and the evidence says it does.`
  },
  {
    q: "How did you use the conclusions and questions of others to advance your own research?",
    a: `Oldenburg said communities need gathering places. Steinkuehler proved that online games are gathering places. I just connected those two ideas. Oldenburg identified what's missing, Steinkuehler found where it went — online. My contribution was putting those together and saying: this isn't just entertainment, it's infrastructure.`
  },
]

// ──────────────────────────────────────────────────────────
// ACCORDION COMPONENT for Q&A
// ──────────────────────────────────────────────────────────

function QAAccordion({ items, color }: { items: { q: string; a: string }[]; color: "blue" | "purple" }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  const bg = color === "blue" ? "bg-white/5 hover:bg-white/8" : "bg-white/5 hover:bg-white/8"
  const numColor = color === "blue" ? "text-blue-300" : "text-purple-300"

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className={`rounded-xl overflow-hidden transition-all ${openIndex === i ? "bg-white/8" : bg}`}>
          <button
            onClick={(e) => { e.stopPropagation(); setOpenIndex(openIndex === i ? null : i) }}
            className="w-full text-left p-5 flex gap-4 items-start"
          >
            <span className={`text-lg font-black ${numColor} shrink-0 mt-0.5`}>{i + 1}</span>
            <span className="text-base font-semibold text-white/90 leading-relaxed">{item.q}</span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pl-14">
                  <p className="text-[15px] leading-[1.8] text-white/70 whitespace-pre-wrap">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default function ScriptPage() {
  const [time, setTime] = React.useState(0)
  const [elapsedTime, setElapsedTime] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false)
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(-1)
  const [showModal1, setShowModal1] = React.useState(false)
  const [showModal2, setShowModal2] = React.useState(false)
  const [isFocusMode, setIsFocusMode] = React.useState(false)
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([])

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
        setElapsedTime((prev) => prev + 1)
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
    setElapsedTime(0)
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
        <div className="flex flex-col items-end gap-1">
          <div className="font-mono text-4xl font-bold tracking-widest">
            {formatTime(time)}
          </div>
          <div className="font-mono text-xs text-white/50 font-bold uppercase tracking-widest">
            Script / {formatTime(elapsedTime)} Real
          </div>
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

      {/* Modals — scrollable, each Q has its own answer */}
      <AnimatePresence>
        {showModal1 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f172a] z-[60] overflow-y-auto"
            onClick={() => setShowModal1(false)}
          >
            <div
              className="max-w-3xl mx-auto text-white py-16 px-4 md:px-8 min-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal1(false)}
                className="fixed top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
              >
                <X size={28} />
              </button>
              <h2 className="text-4xl font-black mb-2">Reflection on Process</h2>
              <p className="text-white/40 text-base mb-10">Click any question to see its tailored response</p>
              <QAAccordion items={reflectionQuestions} color="blue" />
            </div>
          </motion.div>
        )}
        {showModal2 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f0716] z-[60] overflow-y-auto"
            onClick={() => setShowModal2(false)}
          >
            <div
              className="max-w-3xl mx-auto text-white py-16 px-4 md:px-8 min-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal2(false)}
                className="fixed top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
              >
                <X size={28} />
              </button>
              <h2 className="text-4xl font-black mb-2">Extending Argumentation</h2>
              <p className="text-white/40 text-base mb-10">Click any question to see its tailored response</p>
              <QAAccordion items={argumentationQuestions} color="purple" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
