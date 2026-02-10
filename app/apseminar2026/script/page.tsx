"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Play, Pause, RotateCcw, X, Maximize2, HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

const scriptData = [
  {
    slide: "1. Title Slide",
    section: "Opening",
    duration: "0:00 - 0:15",
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

I use Oldenburg's framework because it gives a name to what is disappearing. Ben Goldfarb, an environmental journalist, writes in Crossings that American infrastructure — highways, suburban sprawl, car-dependent planning — has created "Social Deserts," which are neighborhoods designed without any place to gather.

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

// ONE unified reflection answer — same for every question so you can freestyle
const reflectionAnswer = `My research process started with the Surgeon General's 2023 advisory, which established that loneliness is a public health crisis with measurable outcomes — a 29% increase in premature death risk. That data gave me the "problem" side of my research. I then needed to understand the cause, which led me to Ray Oldenburg's concept of "Third Places" and Ben Goldfarb's work on "Social Deserts" and "Friction Costs." These two sources explained that the loneliness crisis is structural — physical gathering spaces are disappearing because of how we build cities.

From there, my research question became: can digital communities fill the gap left by disappearing Third Places? The most important evidence I found was Steinkuehler and Williams (2006), who showed that online gaming communities meet all of Oldenburg's Third Place criteria. I also used Putnam's "Bridging Social Capital" to measure whether these digital spaces actually produce functioning community bonds. The evidence showed they do.

I also had to address criticisms. Turkle argues digital connection is shallow, and Zuboff argues platforms exploit users. I addressed both by using Quan-Haase and Wellman's "harm reduction" framework — acknowledging limitations while arguing that for people in Social Deserts, imperfect digital connection is the most accessible option available. Cacioppo's neuroscience research confirmed that digital contact has physiological limits, which I included for intellectual honesty.

Every source I chose connects to the same argument chain: the health crisis (Surgeon General) is caused by structural problems (Oldenburg, Goldfarb), digital spaces can partially address it (Steinkuehler, Putnam), critics raise valid concerns (Turkle, Zuboff), and the harm reduction framework resolves those concerns for isolated populations (Quan-Haase).`

// ONE unified argumentation answer — same for every question so you can freestyle
const argumentationAnswer = `My argument is that for people isolated from physical Third Places, digital communities function as necessary social infrastructure. The conclusion rests on a chain of evidence.

The Surgeon General's 2023 data establishes that loneliness is a public health crisis with measurable health consequences. Oldenburg's Third Place framework and Goldfarb's Social Deserts concept explain the structural cause — physical gathering spaces have been removed by suburban sprawl and car-dependent planning. This means the crisis is caused by infrastructure, and the solution should also be infrastructural.

Steinkuehler and Williams (2006) provide the strongest evidence for my thesis. They showed that online gaming communities meet every criterion Oldenburg set for Third Places: neutral ground, regular participants, and conversation as the main activity. Putnam's Bridging Social Capital concept confirms that these spaces produce real community bonds across geographic and demographic lines.

The main counterarguments come from Turkle, who argues digital bonds are shallow, and Zuboff, who argues platforms prioritize profit over connection. Both are valid concerns. I address them using Quan-Haase and Wellman's harm reduction framework: digital connection has real limitations, but for people living in Social Deserts — disabled individuals, rural teens, homebound seniors — the available options are digital community or total isolation. The harm reduction model acknowledges imperfection while validating necessity.

Cacioppo's neuroscience research shows that digital contact cannot fully replicate physical co-regulation, which I include as a limitation. The long-term goal remains rebuilding physical Third Places. Digital communities serve as a bridge.

If I had more time, I would investigate which specific design features of digital platforms promote bridging capital versus those that undermine it — for example, comparing persistent-identity spaces like Discord servers to anonymous feeds like Instagram comments. My current research treats "digital" as one category, and the platform-level differences likely matter for connection quality.`

const reflectionQuestions = [
  {
    q: "What information did you need before you began your research, and how did that information shape your research?",
    a: reflectionAnswer
  },
  {
    q: "What evidence did you gather that you didn't use? Why did you choose not to use it?",
    a: reflectionAnswer
  },
  {
    q: "How valid and reliable are the sources you used? How do you know? Which sources didn't work?",
    a: reflectionAnswer
  },
  {
    q: "How did you select the strategies you used to gather information or conduct research? Were they effective?",
    a: reflectionAnswer
  },
  {
    q: "How did your research question evolve as you moved through the research process?",
    a: reflectionAnswer
  },
  {
    q: "What information did you need that you weren't able to find or locate? How did you go about trying to find that information?",
    a: reflectionAnswer
  },
  {
    q: "How did you handle the differing perspectives in order to reach a conclusion?",
    a: reflectionAnswer
  },
  {
    q: "What advice would you have for other researchers who consider this topic?",
    a: reflectionAnswer
  },
  {
    q: "If you had more time, what additional research would you conduct related to this issue?",
    a: reflectionAnswer
  }
]

const argumentationQuestions = [
  {
    q: "What additional questions emerged from your research? Why are these questions important?",
    a: argumentationAnswer
  },
  {
    q: "What might be the real-world implications or consequences of your findings?",
    a: argumentationAnswer
  },
  {
    q: "Explain the level of certainty you have about your conclusion, solution, or recommendation.",
    a: argumentationAnswer
  },
  {
    q: "How does your conclusion respond to any of the other research or sources you examined?",
    a: argumentationAnswer
  },
  {
    q: "How did you use the conclusions and questions of others to advance your own research?",
    a: argumentationAnswer
  }
]

export default function ScriptPage() {
  const [time, setTime] = React.useState(0)
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
              <h2 className="text-4xl font-black mb-4 border-b border-white/20 pb-4">Reflection on Process</h2>
              <p className="text-white/60 text-lg mb-8">One unified answer — freestyle to fit whichever question they ask.</p>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg">
                <p className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap">{reflectionAnswer}</p>
              </div>
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white/60 mb-4">Possible Questions They Might Ask:</h3>
                <div className="space-y-3">
                  {reflectionQuestions.map((item, i) => (
                    <p key={i} className="text-white/50 text-sm">{i + 1}. {item.q}</p>
                  ))}
                </div>
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
              <h2 className="text-4xl font-black mb-4 border-b border-white/20 pb-4">Extending Argumentation</h2>
              <p className="text-white/60 text-lg mb-8">One unified answer — freestyle to fit whichever question they ask.</p>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg">
                <p className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap">{argumentationAnswer}</p>
              </div>
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white/60 mb-4">Possible Questions They Might Ask:</h3>
                <div className="space-y-3">
                  {argumentationQuestions.map((item, i) => (
                    <p key={i} className="text-white/50 text-sm">{i + 1}. {item.q}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
