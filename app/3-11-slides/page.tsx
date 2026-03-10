"use client";

import { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STUDENTS = [
  "Dhruv A.","Abdullah A.","Prateek B.","Tanish B.",
  "Lamaq D.","Pruthvi D.","Isha D.","Nanaki G.","Aryan G.",
  "Kenan H.","Vishwanth J.","Giya J.","Arnav K.","Vishnu K.",
  "Shivani N.","Nikhil P.","Sai P.",
  "Aarav S.","Pramod S.","Paavan S.","Vaibhav S.","Rahil S.",
  "Soumya T.","Matthew V.",
];

const MCQ_TIME = 30;
const BG = "#ebe9e4";
const DOT = `radial-gradient(circle, #ccc9c2 1.2px, transparent 1.2px)`;

const useAudio = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const getCtx = () => { if (!ctxRef.current) ctxRef.current = new AudioContext(); return ctxRef.current; };
  const t = (f: number, d: number, tp: OscillatorType = "sine", v = 0.1) => {
    const c = getCtx(), o = c.createOscillator(), g = c.createGain();
    o.type = tp; o.frequency.value = f;
    g.gain.setValueAtTime(v, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + d);
  };
  return {
    correct: () => { t(523,.12); setTimeout(() => t(659,.12),80); setTimeout(() => t(784,.25),160); },
    wrong: () => { t(200,.25,"sawtooth",.06); setTimeout(() => t(150,.35,"sawtooth",.06),120); },
    tick: () => t(880,.04,"sine",.03),
    timeUp: () => { t(330,.15,"square",.08); setTimeout(() => t(262,.15,"square",.08),150); setTimeout(() => t(196,.3,"square",.08),300); },
  };
};

const pop = (delay = 0) => ({
  initial: { scale: 0.88, opacity: 0, y: 12 } as const,
  animate: { scale: 1, opacity: 1, y: 0 } as const,
  transition: { type: "spring" as const, bounce: 0.4, duration: 0.65, delay },
});

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const MCQ = forwardRef<MCQHandle, {
  num: number; question: string; options: { key: string; text: string }[];
  correctKey: string; explanations: Record<string, string>; onReveal: () => void; onNext: () => void;
}>(function MCQInner({ num, question, options, correctKey, explanations, onReveal, onNext }, fwdRef) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongActs, setWrongActs] = useState<string[]>([]);
  const [currExp, setCurrExp] = useState<string | null>(null);
  const [tl, setTl] = useState(MCQ_TIME);
  const [run, setRun] = useState(true);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const upTimer = useRef<any>(null);
  const upCount = useRef(0);
  const a = useAudio();

  useEffect(() => {
    ref.current = setInterval(() => {
      setTl(prev => {
        if (prev <= 1) { clearInterval(ref.current!); a.timeUp(); setRun(false); return 0; }
        if (prev <= 6) a.tick();
        return prev - 1;
      });
    }, 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [a]);

  const attempt = useCallback((key: string) => {
    if (isCorrect || wrongActs.includes(key)) return;
    
    if (key === correctKey) {
      if (ref.current) clearInterval(ref.current);
      setIsCorrect(true); 
      setRun(false);
      a.correct();
      setCurrExp(explanations[key]);
      onReveal();
    } else {
      a.wrong();
      setWrongActs(p => [...p, key]);
      setCurrExp(explanations[key]);
    }
  }, [isCorrect, wrongActs, correctKey, explanations, a, onReveal]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // If we got it right and hit forward, go next
      if (isCorrect && (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowUp")) {
        onNext();
        return;
      }
      
      if (isCorrect || (!run && tl > 0)) return;
      
      const k = e.key.toLowerCase();
      if (k === "a" || k === "1") { attempt("A"); return; }
      if (k === "b" || k === "2") { attempt("B"); return; }
      if (k === "c" || k === "3") { attempt("C"); return; }
      if (k === "d" || k === "4") { attempt("D"); return; }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        upCount.current++;
        clearTimeout(upTimer.current);
        upTimer.current = setTimeout(() => {
          const opts = ["A", "B", "C", "D"];
          if (upCount.current >= 1 && upCount.current <= 4) attempt(opts[upCount.current - 1]);
          upCount.current = 0;
        }, 500); 
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCorrect, run, tl, attempt, onNext]);

  useImperativeHandle(fwdRef, () => ({ reveal: () => {} }), []);

  const urg = tl <= 10 && tl > 0 && run;
  const dead = tl === 0 && !isCorrect;

  return (
    <div className="mc">
      <div className="mc-top">
        <motion.span className="pill orange-pill" {...pop(0)}>MCQ #{num}</motion.span>
        {run && (
          <motion.div className={`clock-pill ${urg ? "urg" : ""}`}
            initial={pop(0.05).initial}
            animate={urg ? { scale: [1, 1.08, 1], y: 0, opacity: 1 } : pop(0.05).animate}
            transition={urg ? { repeat: Infinity, duration: 0.5 } : pop(0.05).transition}>
            {Math.floor(tl / 60)}:{(tl % 60).toString().padStart(2, "0")}
          </motion.div>
        )}
        {dead && <motion.div className="clock-pill urg" {...pop(0)}>Time&apos;s Up!</motion.div>}
      </div>
      <motion.h2 className="mc-q" {...rise(0.1)}>{question}</motion.h2>
      <div className="mc-os">
        {options.map((o, i) => {
          let c = "opt-btn";
          if (isCorrect && o.key === correctKey) c += " correct-btn";
          else if (wrongActs.includes(o.key)) c += " wrong-btn";
          return (
            <motion.button key={o.key} className={c} {...pop(0.12 + i * 0.07)}
              onClick={() => attempt(o.key)}
              disabled={isCorrect || wrongActs.includes(o.key)}
              whileHover={!(isCorrect || wrongActs.includes(o.key)) ? { scale: 1.01, x: 3 } : undefined}
              whileTap={!(isCorrect || wrongActs.includes(o.key)) ? { scale: 0.98 } : undefined}>
              <span className="opt-k">{o.key}</span><span>{o.text}</span>
            </motion.button>
          );
        })}
      </div>
      {currExp && (
        <motion.div className={`mcq-exp card ${isCorrect ? 'exp-correct' : 'exp-wrong'}`} {...rise(0)} key={currExp}>
          <h4>{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
          <p>{currExp}</p>
        </motion.div>
      )}
    </div>
  );
});

function Spinner({ students, topic, topicNum, side1, side2, autoSpin }: {
  students: string[]; topic: string; topicNum: number;
  side1: string; side2: string; autoSpin: boolean;
}) {
  const [phase, setPhase] = useState<"idle"|"spinning"|"done">("idle");
  const [forG, setForG] = useState<string[]>([]);
  const [agG, setAgG] = useState<string[]>([]);
  const [fi, setFi] = useState(0);
  const [ai, setAi] = useState(0);
  const au = useAudio();

  const spin = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("spinning");
    const sh = [...students].sort(() => Math.random() - 0.5);
    const h = Math.ceil(sh.length / 2);
    let i = 0;
    const timer = setInterval(() => {
      setFi(Math.floor(Math.random() * students.length));
      setAi(Math.floor(Math.random() * students.length));
      au.tick(); i++;
      if (i >= 45) {
        clearInterval(timer);
        setForG(sh.slice(0, h)); setAgG(sh.slice(h));
        setPhase("done"); au.correct();
      }
    }, 40 + i * 5);
  }, [phase, students, au]);

  useEffect(() => { if (autoSpin && phase === "idle") spin(); }, [autoSpin, phase, spin]);

  return (
    <div className="dbw">
      <motion.span className="pill purple-pill" {...pop(0)}>Debate #{topicNum}</motion.span>
      <motion.h2 className="debate-topic-card" {...rise(0.1)}>{topic}</motion.h2>
      {phase === "idle" && <motion.p className="hint-text" {...rise(0.2)}>Press → to randomize groups</motion.p>}
      {phase === "spinning" && (
        <motion.div className="slot-machine" {...pop(0)}>
          <div className="slot-col">
            <span className="slot-lbl for-lbl">FOR</span>
            <div className="slot-w for-w">
              <AnimatePresence mode="popLayout">
                <motion.span className="slot-n" key={fi}
                  initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.06 }}>{students[fi]}</motion.span>
              </AnimatePresence>
            </div>
          </div>
          <span className="slot-v">VS</span>
          <div className="slot-col">
            <span className="slot-lbl ag-lbl">AGAINST</span>
            <div className="slot-w ag-w">
              <AnimatePresence mode="popLayout">
                <motion.span className="slot-n" key={ai + 100}
                  initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.06 }}>{students[ai]}</motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
      {phase === "done" && (
        <div className="grd">
          <motion.div className="grp-box for-b" {...pop(0)}>
            <div className="grp-hdr for-hdr">FOR</div>
            <p className="grp-stance">{side1}</p>
            <div className="nw">{forG.map((s,i) => <span key={i} className="ntag">{s}</span>)}</div>
          </motion.div>
          <motion.div className="grp-box ag-b" {...pop(0.1)}>
            <div className="grp-hdr ag-hdr">AGAINST</div>
            <p className="grp-stance">{side2}</p>
            <div className="nw">{agG.map((s,i) => <span key={i} className="ntag">{s}</span>)}</div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Photo({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
  return (
    <motion.div className={`photo-frame ${tall ? "photo-tall" : ""}`} {...pop(0.15)}>
      <img src={src} alt={alt} />
      <span className="photo-cap">{alt}</span>
    </motion.div>
  );
}

type MCQHandle = { reveal: () => void };

const mcqs = [
  {
    q: "The New Negro movement most directly reflected which of the following developments in the early twentieth century?",
    opts: [
      { key: "A", text: "The decline of African American political activism after Reconstruction" },
      { key: "B", text: "A growing emphasis on self-definition, racial pride, and cultural expression among African Americans" },
      { key: "C", text: "Federal legislation that protected the civil rights of African Americans in northern cities" },
      { key: "D", text: "The integration of African American artists into mainstream white cultural institutions" },
    ], ans: "B",
    explanations: {
      "A": "Incorrect. African American political activism did not decline; it transformed and grew through organizations like the NAACP and UNIA.",
      "B": "Correct! The New Negro movement was defined by its push for self-definition, racial pride, and cultural independence.",
      "C": "Incorrect. There was no widespread federal legislation protecting civil rights in northern cities during this time period.",
      "D": "Incorrect. The New Negro movement sought to build independent Black cultural expression, not focus on integrating into white institutions."
    }
  },
  {
    q: "Langston Hughes's essay \"The Negro Artist and the Racial Mountain\" most directly argues for which of the following?",
    opts: [
      { key: "A", text: "African American artists should seek approval from white critics to gain wider recognition." },
      { key: "B", text: "Black artists should embrace their own racial identity and cultural traditions in their work." },
      { key: "C", text: "The Harlem Renaissance was primarily a political movement rather than an artistic one." },
      { key: "D", text: "African American literature should focus exclusively on the experience of slavery." },
    ], ans: "B",
    explanations: {
      "A": "Incorrect. This is the exact opposite of Hughes's argument; he criticized Black artists who wanted to be white or cater to white audiences.",
      "B": "Correct! Hughes powerfully argued that Black artists must proudly embrace their own culture, rhythm, and life without fear or shame.",
      "C": "Incorrect. Hughes was a poet and writer; his essay focused explicitly on the role of the artist and cultural production.",
      "D": "Incorrect. Hughes celebrated contemporary, everyday Black life (like jazz and blues), not just historical themes of slavery."
    }
  },
  {
    q: "Which of the following best describes the relationship between the Great Migration and the Harlem Renaissance?",
    opts: [
      { key: "A", text: "The Great Migration had no significant impact on cultural developments in northern cities." },
      { key: "B", text: "The migration of African Americans from the South brought cultural traditions that helped fuel artistic innovations in urban centers like Harlem." },
      { key: "C", text: "The Harlem Renaissance primarily drew on European artistic traditions rather than African American culture." },
      { key: "D", text: "The Great Migration was caused by the success of the Harlem Renaissance in attracting Southern Black workers." },
    ], ans: "B",
    explanations: {
      "A": "Incorrect. The influx of millions of Black southerners fundamentally transformed northern urban culture.",
      "B": "Correct! Migrants brought southern cultural traditions (like blues) that evolved and blossomed in northern cities, directly fueling the Renaissance.",
      "C": "Incorrect. The core defining feature of the Harlem Renaissance was its reliance on distinctively African American culture and roots.",
      "D": "Incorrect. The causality is backward. Economic opportunities and escaping Jim Crow caused the Great Migration, which then enabled the Renaissance."
    }
  },
];

const debates = [
  { topic: "Was the Black Aesthetic or Political Advocacy more important?",
    s1: "A unique Black aesthetic was most important — it gave African Americans their own cultural identity.",
    s2: "Political self-advocacy was more important — it directly challenged systemic racism." },
  { topic: "Who had a greater impact: Locke or Hughes?",
    s1: "Locke created the intellectual framework that defined the entire Renaissance.",
    s2: "Hughes turned philosophy into art that everyday people could connect with." },
  { topic: "What is the greatest legacy of the Harlem Renaissance?",
    s1: "Its cultural contributions (jazz, literature, art) permanently changed American culture.",
    s2: "Building community pride that fueled the Civil Rights Movement was more lasting." },
];

export default function SlidesPage() {
  const [slide, setSlide] = useState(0);
  const TOTAL = 22;
  const [dnLeft, setDnLeft] = useState(300);
  const [dnRun, setDnRun] = useState(false);
  const [dnStarted, setDnStarted] = useState(false);
  const dnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const au = useAudio();
  const [dt, setDt] = useState([false, false, false]);
  const [mcqRevealed, setMcqRevealed] = useState([false, false, false]);
  const mcqRefs = [useRef<MCQHandle>(null), useRef<MCQHandle>(null), useRef<MCQHandle>(null)];

  useEffect(() => () => { if (dnRef.current) clearInterval(dnRef.current); }, []);

  const goNext = useCallback(() => setSlide(s => Math.min(s + 1, TOTAL - 1)), []);

  const forward = useCallback(() => {
    if (slide === 3 && !dnStarted) {
      setDnStarted(true); setDnRun(true);
      dnRef.current = setInterval(() => {
        setDnLeft(t => {
          if (t <= 1) { clearInterval(dnRef.current!); au.timeUp(); setDnRun(false); return 0; }
          if (t <= 6) au.tick(); return t - 1;
        });
      }, 1000);
      return;
    }
    if (slide === 13 && !dt[0]) { setDt(d => [true, d[1], d[2]]); return; }
    if (slide === 14 && !dt[1]) { setDt(d => [d[0], true, d[2]]); return; }
    if (slide === 15 && !dt[2]) { setDt(d => [d[0], d[1], true]); return; }
    const mi = slide - 16;
    if (mi >= 0 && mi <= 2) {
      if (mcqRevealed[mi]) { goNext(); return; }
      mcqRefs[mi].current?.reveal();
      return;
    }
    goNext();
  }, [slide, dnStarted, dt, au, mcqRevealed, goNext]);

  const back = useCallback(() => setSlide(s => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const isMcq = !!document.querySelector('.mc');
      if (e.key === "ArrowRight" || (e.key === "ArrowUp" && !isMcq) || e.key === "PageDown") { e.preventDefault(); forward(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageUp") { e.preventDefault(); back(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [forward, back]);

  const dm = Math.floor(dnLeft / 60), ds = dnLeft % 60;
  const du = dnLeft <= 10 && dnLeft > 0 && dnRun;

  const makeMcq = (idx: number) => (
    <MCQ ref={mcqRefs[idx]} key={`mcq-${idx}`} num={idx + 1} question={mcqs[idx].q}
      options={mcqs[idx].opts} correctKey={mcqs[idx].ans} explanations={mcqs[idx].explanations}
      onReveal={() => setMcqRevealed(p => { const n = [...p]; n[idx] = true; return n; })}
      onNext={goNext} />
  );

  const C: React.ReactNode[] = [
    // 0 — Title
    <div key="0" className="cx">
      <motion.span className="pill teal-pill" {...pop(0.1)}>AP African American Studies · 3.11</motion.span>
      <motion.h1 className="display-title" {...rise(0.2)}>The New Negro Movement<br/>&amp; The Harlem Renaissance</motion.h1>
      <motion.p className="sub-hero" {...rise(0.3)} style={{ fontSize: '20px', color: '#444', marginTop: '16px', fontWeight: 600, maxWidth: '800px', lineHeight: 1.5 }}>
        <b>LO 3.11.A)</b> Describe ways the New Negro movement emphasized self-definition, racial pride, and cultural innovation.
      </motion.p>
      <motion.p className="sub-hero" {...rise(0.4)} style={{ fontSize: '26px', color: '#111', marginTop: '16px', fontWeight: 800 }}>
        Bilal • Nikhil • Taylor • Joel Raj<br/><span style={{ fontSize: '20px', color: '#666', fontWeight: 600 }}>Tuesday Mar 10</span>
      </motion.p>
      <motion.div className="hero-chips" {...rise(0.5)} style={{ marginTop: '12px' }}>
        <span className="chip">Due: 3.10 GN/MCQ/RS, 3.11 KT</span>
        <span className="chip">Coming: 3.11 GN/MCQ/RS</span>
        <span className="chip chip-alert">⚠ Unit 3 Exam Soon</span>
      </motion.div>
    </div>,

    // 1 — EKs
    <div key="ek" className="split">
      <div className="split-main">
        <motion.h2 className="section-title" {...rise(0)}>Essential Knowledge</motion.h2>
        <div className="note-stack tight">
          {[
            <><b>EK 3.11.A.1:</b> The New Negro movement encouraged African Americans to define their own identity and to advocate for themselves politically in the midst of the nadir&apos;s atrocities.</>,
            <><b>EK 3.11.A.2:</b> The New Negro movement pursued the creation of a Black aesthetic, which was reflected in the artistic and cultural achievements of Black creators.</>,
            <><b>EK 3.11.A.3:</b> The New Negro movement produced innovations in music (e.g., blues and jazz), art, and literature that served as counternarratives to prevailing racial stereotypes. These artistic innovations reflected the migrations of African Americans from the South to urban centers in the North and Midwest.</>,
            <><b>EK 3.11.A.4:</b> The movement encompassed several cultural movements, including the Harlem Renaissance. The Harlem Renaissance was a flourishing of Black literary, artistic, and intellectual life that created a cultural revolution in the United States in the 1920s and 1930s.</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" style={{ fontSize: '15px', padding: '16px' }} {...rise(0.06 + i * 0.05)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/harlem.jpg" alt="Harlem Renaissance" tall />
      </div>
    </div>,

    // 2 — Key Vocabulary
    <div key="vocab" className="split">
      <div className="split-main" style={{ minWidth: '550px' }}>
        <motion.h2 className="section-title" {...rise(0)}>Key Vocabulary</motion.h2>
        <div className="note-stack" style={{ gap: '10px' }}>
          {[
            <><b>New Negro Movement:</b> A cultural and political movement starting in the late 1800s to redefine Black identity, embrace racial pride, and challenge white supremacy.</>,
            <><b>Harlem Renaissance:</b> A flourishing of Black literary, artistic, and intellectual life centered in Harlem during the 1920s and 1930s.</>,
            <><b>Black Aesthetic:</b> A distinctive style of art rooted in Black cultural experience; rejecting white standards of beauty.</>,
            <><b>Nadir of Race Relations:</b> The period (1890s-1920s) of extreme racial violence, disenfranchisement, and segregation where this movement emerged.</>,
            <><b>Counternarrative:</b> Stories or art pushing back against the dominant racist stereotypes depicting Black people as inferior.</>,
            <><b>Great Migration:</b> The mass movement of ~6 million African Americans from the rural South to northern/midwestern urban centers.</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" style={{ fontSize: '14px', padding: '12px' }} {...rise(0.06 + i * 0.05)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/new_negro.jpg" alt="The New Negro" tall />
      </div>
    </div>,

    // 3 — Do Now
    <div key="1" className="split">
      <div className="split-main">
        <motion.div className="hdr-row" {...rise(0)}>
          <h2 className="section-title">Do Now</h2>
          <span className="tag-black">5 MINUTES</span>
        </motion.div>
        
        <motion.p className="hint-text" {...pop(0.05)} style={{ marginBottom: '16px', textAlign: 'left', color: '#333' }}>
          Directions: Read the following quote from Alain Locke's <i>The New Negro</i> (1925) and use it along with previous knowledge to answer the questions.
        </motion.p>

        <motion.div className="card quote-card" {...pop(0.1)}>
          <div className="q-mark">&ldquo;</div>
          <p className="q-text">The younger generation is vibrant with a new psychology; the new spirit is awake in the masses.</p>
          <p className="q-cite">— Alain Locke, <i>The New Negro</i>, 1925</p>
        </motion.div>
        <div className="q-list">
          {[
            'What does Locke mean by a "new psychology"?',
            'How might this connect to artistic changes in the 1920s?',
            'Why would self-definition matter during the "nadir" of race relations?',
            'How does this challenge stereotypes of the time?',
          ].map((q, i) => (
            <motion.div key={i} className="card q-card" {...rise(0.18 + i * 0.07)}>
              <span className="q-num">{i + 1}</span><p>{q}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/new_negro.jpg" alt="The New Negro, 1925" tall />
        <motion.div className="card timer-card" {...pop(0.3)}>
          <span className="timer-label">{dnStarted ? "REMAINING" : "PRESS → TO START"}</span>
          <motion.span className={`timer-big ${du ? "urg" : ""}`}
            animate={du ? { scale: [1, 1.06, 1] } : undefined}
            transition={du ? { repeat: Infinity, duration: 0.5 } : undefined}>
            {dm}:{ds.toString().padStart(2, "0")}
          </motion.span>
        </motion.div>
      </div>
    </div>,

    // 2 — Discussion 1-2
    <div key="2" className="cx">
      <motion.span className="pill yellow-pill" {...pop(0)}>Class Discussion</motion.span>
      <motion.h2 className="display-title med" {...rise(0.1)}>Let&apos;s Talk About It</motion.h2>
      <div className="disc-stack">
        {[
          { n: "1", t: 'What does "new psychology" mean? How were African Americans viewed vs. how they saw themselves?' },
          { n: "2", t: 'What kind of art, music, or writing would come from a community experiencing this "new spirit"?' },
        ].map((c, i) => (
          <motion.div key={i} className="card disc-card" {...pop(0.15 + i * 0.12)}>
            <div className="disc-num">{c.n}</div><p>{c.t}</p>
          </motion.div>
        ))}
      </div>
      <motion.p className="hint-text" {...rise(0.5)}>✋ Raise your hand to share</motion.p>
    </div>,

    // 3 — Discussion 3-4
    <div key="3" className="cx">
      <motion.span className="pill yellow-pill" {...pop(0)}>Class Discussion</motion.span>
      <motion.h2 className="display-title med" {...rise(0.1)}>Keep Going</motion.h2>
      <div className="disc-stack">
        {[
          { n: "3", t: "Why is self-definition so powerful during a time when society is defining you negatively?" },
          { n: "4", t: "How does Locke\u2019s quote push back against stereotypes? What is he saying that society refused to acknowledge?" },
        ].map((c, i) => (
          <motion.div key={i} className="card disc-card" {...pop(0.15 + i * 0.12)}>
            <div className="disc-num">{c.n}</div><p>{c.t}</p>
          </motion.div>
        ))}
      </div>
    </div>,

    // 4 — Section header
    <div key="4" className="cx">
      <motion.div className="icon-circle" {...pop(0)}>📖</motion.div>
      <motion.h1 className="display-title" {...rise(0.15)}>The New Negro<br/>Movement</motion.h1>
      <motion.span className="chip" {...pop(0.35)}>Core Concepts</motion.span>
    </div>,

    // 5 — Content
    <div key="5" className="split">
      <div className="split-main">
        <motion.h2 className="section-title" {...rise(0)}>What Was the New Negro Movement?</motion.h2>
        <div className="note-stack">
          {[
            <>Encouraged African Americans to <b>define their own identity</b> and advocate for themselves politically.</>,
            <>Began in the late 19th century through Booker T. Washington, Marcus Garvey, and others.</>,
            <>Alain Locke redefined it as an <b>aesthetic movement</b> in his 1925 anthology &ldquo;The New Negro.&rdquo;</>,
            <>Challenged the inferiority narrative. Pushed for <b>racial pride and cultural expression</b>.</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" {...rise(0.06 + i * 0.06)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/new_negro.jpg" alt="The New Negro" tall />
      </div>
    </div>,

    // 6 — Quick Check
    <div key="6" className="cx">
      <motion.span className="pill pink-pill" {...pop(0)}>Quick Check</motion.span>
      <motion.h2 className="display-title med" {...rise(0.1)}>Think About It</motion.h2>
      <motion.div className="card disc-card" {...pop(0.2)}>
        <div className="disc-num pink">?</div>
        <p>Washington wanted accommodation. Garvey wanted Pan-Africanism. Locke wanted art. Why so many different approaches to the same problem?</p>
      </motion.div>
      <motion.p className="hint-text" {...rise(0.4)}>✋ Raise your hand</motion.p>
    </div>,

    // 7 — Black Aesthetic
    <div key="7" className="split">
      <div className="split-main">
        <motion.h2 className="section-title" {...rise(0)}>A Black Aesthetic</motion.h2>
        <div className="note-stack">
          {[
            <>Black writers, artists, and musicians pursued the creation of a distinct <b>Black aesthetic</b> in their cultural achievements.</>,
            <>This aesthetic was central to self-definition, shifting the spirit and mindset of the Black community to center their own experiences.</>,
            <>Locke encouraged young artists to <b>reject the burden</b> of representing their entire race.</>,
            <>Writers like Hughes, Hurston, and McKay created literature celebrating Black life.</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" {...rise(0.06 + i * 0.06)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/langston_hughes.jpg" alt="Langston Hughes" />
        <Photo src="/apaf/zora_hurston.jfif" alt="Zora Neale Hurston" />
      </div>
    </div>,

    // 8 — Quick Check 2
    <div key="8" className="cx">
      <motion.span className="pill pink-pill" {...pop(0)}>Quick Check</motion.span>
      <motion.h2 className="display-title med" {...rise(0.1)}>What Do You Think?</motion.h2>
      <motion.div className="card disc-card" {...pop(0.2)}>
        <div className="disc-num pink">?</div>
        <p>Locke told Black artists to stop worrying about representing their whole race. Why would that be freeing? Can you think of a modern example?</p>
      </motion.div>
    </div>,

    // 9 — Innovations
    <div key="9" className="split">
      <div className="split-main">
        <motion.h2 className="section-title" {...rise(0)}>Innovations in Art &amp; Music</motion.h2>
        <div className="note-stack tight">
          {[
            <><b>Blues and jazz</b> served as counternarratives to racial stereotypes.</>,
            <>Reflected the <b>Great Migration</b> to northern urban centers.</>,
            <><b>Duke Ellington and Louis Armstrong</b> became famous in Harlem clubs.</>,
            <><b>Aaron Douglas</b> blended African imagery with modern styles.</>,
            <>Hughes: artists should <b>embrace their own culture</b> in &ldquo;The Negro Artist and the Racial Mountain.&rdquo;</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" {...rise(0.06 + i * 0.05)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/louis_armstrong_record_cover.jpg" alt="Louis Armstrong" />
        <Photo src="/apaf/aaron_douglas_painting.avif" alt="Aaron Douglas" />
      </div>
    </div>,

    // 10 — Harlem Renaissance
    <div key="10" className="split">
      <div className="split-main">
        <motion.h2 className="section-title" {...rise(0)}>The Harlem Renaissance</motion.h2>
        <div className="note-stack">
          {[
            <>A <b>cultural revolution</b> in the 1920s and 30s within the New Negro movement.</>,
            <>Harlem became the <b>cultural capital</b> of Black America during the Great Migration.</>,
            <><b>Key figures:</b> Hughes, Hurston, McKay, Douglas, Ellington.</>,
            <>Gave African Americans <b>pride</b> and showed the world the richness of Black culture.</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" {...rise(0.06 + i * 0.06)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/harlem.jpg" alt="1920s Harlem" tall />
      </div>
    </div>,

    // 11 — Impact
    <div key="11" className="split">
      <div className="split-main">
        <motion.h2 className="section-title" {...rise(0)}>Lasting Impact</motion.h2>
        <div className="note-stack tight">
          {[
            <>The movement established <b>lasting cultural contributions</b> that shaped American art, music, and literature.</>,
            <>Its global recognition proved Black Americans had a rich culture, completely <b>challenging the inferiority narrative</b>.</>,
            <>Harlem&apos;s jazz and blues innovations became the direct <b>foundation of modern American music</b>.</>,
            <>This era built a strong <b>community and unified identity</b> that laid the groundwork for the Civil Rights Movement.</>,
            <>Alain Locke&apos;s legacy remained iconic as the <b>first African American Rhodes Scholar</b> (1907).</>,
          ].map((t, i) => <motion.div key={i} className="card note-card" {...rise(0.06 + i * 0.05)}>{t}</motion.div>)}
        </div>
      </div>
      <div className="split-side">
        <Photo src="/apaf/civil_rights_march.jfif" alt="Civil Rights March" tall />
      </div>
    </div>,

    // 11 — Debate intro
    <div key="12" className="cx">
      <motion.div className="icon-circle" {...pop(0)}>🗣️</motion.div>
      <motion.h1 className="display-title" {...rise(0.15)}>Debate It Out</motion.h1>
      <motion.p className="sub-hero" {...rise(0.25)} style={{ fontSize: '20px', color: '#444', marginTop: '16px', fontWeight: 600, maxWidth: '800px', lineHeight: 1.5 }}>
        <b>Directions:</b> Prepare arguments using evidence from Alain Locke's <i>The New Negro</i> and Langston Hughes's <i>The Negro Artist and the Racial Mountain</i>.
      </motion.p>
      <motion.div className="hero-chips" {...rise(0.35)} style={{ marginTop: '24px' }}>
        <span className="chip">3 Min Prep</span>
        <span className="chip chip-orange">5 Min Debate</span>
        <span className="chip">Use Historical Evidence</span>
      </motion.div>
    </div>,

    // 13-15 Debates
    <Spinner key="13" students={STUDENTS} topic={debates[0].topic} topicNum={1} side1={debates[0].s1} side2={debates[0].s2} autoSpin={dt[0]} />,
    <Spinner key="14" students={STUDENTS} topic={debates[1].topic} topicNum={2} side1={debates[1].s1} side2={debates[1].s2} autoSpin={dt[1]} />,
    <Spinner key="15" students={STUDENTS} topic={debates[2].topic} topicNum={3} side1={debates[2].s1} side2={debates[2].s2} autoSpin={dt[2]} />,

    // 16-18 MCQs
    makeMcq(0), makeMcq(1), makeMcq(2),

    // 19 — Video
    <div key="19" className="cx">
      <motion.h2 className="display-title med" {...rise(0)}>Closing Video</motion.h2>
      <motion.div className="video-frame" {...pop(0.1)}>
        <iframe src="https://www.youtube.com/embed/m4PwIrdNuQI?rel=0" title="3.11"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </motion.div>
    </div>,

    // 20 — End
    <div key="20" className="cx">
      <motion.div className="icon-circle" {...pop(0)}>🏁</motion.div>
      <motion.h1 className="display-title" {...rise(0.15)}>Thank You!</motion.h1>
      <motion.span className="chip chip-alert" {...pop(0.3)}>Unit 3 Exam Approaching</motion.span>
    </div>,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow: hidden; height: 100%; width: 100%; background: ${BG}; background-image: ${DOT}; background-size: 22px 22px; }

        .s {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 36px 52px; overflow: hidden;
          background: ${BG}; background-image: ${DOT}; background-size: 22px 22px;
          font-family: 'Outfit', sans-serif; color: #1a1818;
        }

        .display-title {
          font-family: 'Outfit', sans-serif; font-weight: 900;
          font-size: 60px; line-height: 1.05; letter-spacing: -0.025em; color: #0e0e0e;
          text-shadow: 3px 3px 0 ${BG}, 6px 6px 0 #1a1a1a;
        }
        .display-title.med { font-size: 46px; margin-bottom: 24px; }

        .section-title {
          font-family: 'Outfit', sans-serif; font-weight: 800;
          font-size: 38px; line-height: 1.1; letter-spacing: -0.02em;
          color: #0e0e0e; margin-bottom: 22px;
        }

        .debate-topic-card {
          font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 42px;
          background: #111; border: 4px solid #000; border-radius: 16px;
          padding: 24px 32px; box-shadow: 6px 6px 0 rgba(0,0,0,0.2); margin: 10px 0 32px;
          color: #fff; line-height: 1.25; letter-spacing: -0.01em; width: 100%; max-width: 900px;
        }

        .sub-hero { font-size: 19px; font-weight: 600; color: #666; letter-spacing: 0.06em; }
        .hint-text { font-size: 15px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 12px; }

        .cx { max-width: 980px; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 18px; }

        .split { max-width: 1260px; width: 100%; display: flex; gap: 48px; align-items: flex-start; }
        .split-main { flex: 1; text-align: left; min-width: 0; }
        .split-side { width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 18px; }

        .icon-circle {
          font-size: 58px; width: 108px; height: 108px;
          background: #fff; border: 3px solid #000; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 5px 5px 0 #000;
        }

        .pill {
          display: inline-block; font-family: 'Outfit', sans-serif; font-weight: 800;
          font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;
          padding: 7px 18px; border-radius: 40px; border: 2.5px solid #000; box-shadow: 3px 3px 0 #000;
        }
        .teal-pill { background: #4deeea; }
        .yellow-pill { background: #ffe600; }
        .orange-pill { background: #ff5e00; color: #fff; }
        .pink-pill { background: #ff47a3; color: #fff; }
        .purple-pill { background: #b042ff; color: #fff; }

        .chip {
          display: inline-block; font-family: 'Outfit', sans-serif; font-weight: 800;
          font-size: 16px; padding: 11px 24px;
          background: #fff; border: 2.5px solid #000; border-radius: 12px; box-shadow: 4px 4px 0 #000;
        }
        .chip-alert { background: #ff3366; color: #fff; }
        .chip-orange { background: #ff9900; }
        .hero-chips { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

        .tag-black { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 13px; background: #111; color: #fff; padding: 6px 16px; border-radius: 8px; letter-spacing: 0.05em; }

        .card {
          background: #fff; border: 2.5px solid #1a1a1a; border-radius: 16px;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.12);
        }

        .hdr-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

        .photo-frame {
          border: 2.5px solid #000; border-radius: 16px; overflow: hidden;
          box-shadow: 6px 6px 0 #000; background: #111; position: relative;
        }
        .photo-frame img {
          width: 100%; display: block; object-fit: cover;
          height: 200px;
        }
        .photo-tall img { height: 280px; }
        .photo-cap {
          display: block; padding: 8px 14px; text-align: center;
          font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 12px;
          color: #ccc; letter-spacing: 0.08em; text-transform: uppercase;
          background: #111;
        }

        .quote-card { padding: 28px 32px; position: relative; background: #fffef5; }
        .q-mark {
          position: absolute; top: -20px; left: 24px;
          width: 44px; height: 44px; background: #ffe600; border: 2.5px solid #000;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-size: 30px; font-weight: 900;
          line-height: 1; padding-top: 15px; box-shadow: 3px 3px 0 #000;
        }
        .q-text { font-size: 19px; font-weight: 700; line-height: 1.6; font-style: italic; margin-top: 8px; }
        .q-cite { font-size: 14px; font-weight: 800; color: #999; margin-top: 12px; }

        .q-list { display: flex; flex-direction: column; gap: 10px; margin-top: 18px; }
        .q-card {
          display: flex; gap: 14px; align-items: center; padding: 14px 18px;
        }
        .q-num {
          width: 32px; height: 32px; background: #111; color: #fff; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 15px; flex-shrink: 0;
        }
        .q-card p { font-size: 16px; font-weight: 600; line-height: 1.5; }

        .timer-card { padding: 28px 20px; display: flex; flex-direction: column; align-items: center; gap: 10px; background: #fffef5; }
        .timer-label { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 11px; color: #aaa; letter-spacing: 0.1em; }
        .timer-big { font-family: 'Outfit', sans-serif; font-size: 56px; font-weight: 900; color: #111; line-height: 1; letter-spacing: -2px; }
        .timer-big.urg { color: #ff3366; }

        .disc-stack { display: flex; flex-direction: column; gap: 20px; max-width: 820px; width: 100%; }
        .disc-card { display: flex; gap: 22px; padding: 30px 32px; text-align: left; align-items: center; }
        .disc-num {
          width: 56px; height: 56px; background: #ffe600; border: 2.5px solid #000;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 24px; flex-shrink: 0;
          box-shadow: 3px 3px 0 #000;
        }
        .disc-num.pink { background: #ff47a3; color: #fff; }
        .disc-card p { font-size: 21px; font-weight: 600; line-height: 1.5; }

        .note-stack { display: flex; flex-direction: column; gap: 14px; }
        .note-stack.tight { gap: 10px; }
        .note-card {
          font-size: 19px; font-weight: 500; line-height: 1.6;
          padding: 18px 24px;
        }
        .note-card b { font-weight: 800; background: #ffe600; padding: 1px 6px; border-radius: 4px; }

        .mc { max-width: 880px; width: 100%; text-align: left; }
        .mc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .mc-q { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; line-height: 1.5; margin-bottom: 26px; }
        .clock-pill {
          font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 900;
          background: #fff; border: 2.5px solid #000; padding: 7px 22px;
          border-radius: 40px; box-shadow: 3px 3px 0 #000;
        }
        .clock-pill.urg { background: #ff3366; color: #fff; box-shadow: 3px 3px 0 #990033; }
        .mc-os { display: flex; flex-direction: column; gap: 12px; }
        .opt-btn {
          display: flex; align-items: center; gap: 16px;
          padding: 18px 22px; text-align: left; font-size: 18px;
          font-weight: 600; width: 100%; cursor: pointer;
          background: #fff; border: 2.5px solid #1a1a1a; border-radius: 14px;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.12); font-family: 'Outfit', sans-serif;
        }
        .opt-btn:disabled { cursor: default; }
        .opt-k {
          width: 40px; height: 40px; background: #f0ede6; border: 2.5px solid #000;
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 18px; flex-shrink: 0;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
        }
        .picked-btn { background: #e8f4ff; border-color: #2196f3; box-shadow: 4px 4px 0 rgba(33,150,243,0.3); }
        .picked-btn .opt-k { background: #2196f3; color: #fff; border-color: #000; }
        .correct-btn { background: #e8fbe8; border-color: #00c853; box-shadow: 4px 4px 0 rgba(0,200,83,0.3); }
        .correct-btn .opt-k { background: #00c853; color: #fff; border-color: #000; }
        .wrong-btn { background: #fee; border-color: #e53935; box-shadow: 4px 4px 0 rgba(229,57,53,0.3); opacity: 0.75; }
        .wrong-btn .opt-k { background: #e53935; color: #fff; border-color: #000; }

        .mcq-exp {
          margin-top: 24px; padding: 24px 28px;
          border-radius: 16px; box-shadow: 4px 4px 0 rgba(0,0,0, 0.1);
        }
        .exp-correct { background: #f0fdf4; border: 2.5px solid #22c55e; }
        .exp-correct h4 { color: #166534; font-size: 22px; font-weight: 900; margin-bottom: 8px; }
        .exp-correct p { color: #14532d; font-size: 19px; line-height: 1.6; font-weight: 500; }
        
        .exp-wrong { background: #fef2f2; border: 2.5px solid #ef4444; }
        .exp-wrong h4 { color: #991b1b; font-size: 22px; font-weight: 900; margin-bottom: 8px; }
        .exp-wrong p { color: #7f1d1d; font-size: 19px; line-height: 1.6; font-weight: 500; }

        .action-btn {
          font-family: 'Outfit', sans-serif; padding: 16px 32px; font-size: 18px;
          font-weight: 800; margin-top: 22px;
          display: inline-flex; align-items: center; gap: 10px;
          border: 2.5px solid #000; border-radius: 14px; cursor: pointer;
          box-shadow: 4px 4px 0 #000;
        }
        .lock-btn { background: #ff9900; }
        .next-btn { background: #7c3aed; color: #fff; }
        .skip-btn { background: #e5e5e5; color: #333; margin-left: 12px; }

        .dbw { max-width: 980px; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; }

        .slot-machine { display: flex; align-items: center; gap: 28px; margin: 24px 0; }
        .slot-col { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .slot-lbl {
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 800;
          padding: 5px 20px; border-radius: 8px;
          border: 2.5px solid #000; box-shadow: 2px 2px 0 #000; letter-spacing: 0.1em;
        }
        .for-lbl { background: #3b82f6; color: #fff; }
        .ag-lbl { background: #ef4444; color: #fff; }
        .slot-w {
          width: 290px; height: 86px; display: flex; align-items: center;
          justify-content: center; overflow: hidden; position: relative;
          background: #fff; border: 2.5px solid #000; border-radius: 16px;
        }
        .for-w { border-color: #3b82f6; box-shadow: 5px 5px 0 #3b82f6; }
        .ag-w { border-color: #ef4444; box-shadow: 5px 5px 0 #ef4444; }
        .slot-n { font-size: 30px; font-weight: 800; font-family: 'Outfit', sans-serif; position: absolute; }
        .slot-v { font-size: 38px; font-family: 'Outfit', sans-serif; font-weight: 900; color: #444; }

        .grd { display: flex; gap: 24px; width: 100%; margin-top: 16px; }
        .grp-box {
          flex: 1; padding: 36px 28px 28px; text-align: left; position: relative;
          border: 2.5px solid #000; border-radius: 16px; box-shadow: 5px 5px 0 rgba(0,0,0,0.12);
        }
        .for-b { background: #f0f6ff; }
        .ag-b { background: #fef5f5; }
        .grp-hdr {
          position: absolute; top: -14px; left: 24px;
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 800;
          padding: 5px 18px; border-radius: 8px; border: 2.5px solid #000;
          box-shadow: 2px 2px 0 #000; letter-spacing: 0.1em;
        }
        .for-hdr { background: #3b82f6; color: #fff; }
        .ag-hdr { background: #ef4444; color: #fff; }
        .grp-stance { font-size: 17px; font-weight: 600; line-height: 1.5; margin-bottom: 18px; }
        .nw { display: flex; flex-wrap: wrap; gap: 7px; }
        .ntag {
          font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 800;
          border: 2px solid #000; padding: 6px 14px; border-radius: 8px;
          background: #fff; box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
        }

        .video-frame {
          border: 2.5px solid #000; border-radius: 16px; overflow: hidden;
          box-shadow: 6px 6px 0 #000; width: 100%; max-width: 800px; aspect-ratio: 16/9;
        }
        .video-frame iframe { width: 100%; height: 100%; border: none; display: block; }
      `}</style>
      <AnimatePresence mode="wait">
        <motion.div className="s" key={slide}
          initial={slide === 0 ? false : { y: "100%" }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-12%", opacity: 0, transition: { duration: 0.28 } }}
          transition={slide === 0 ? {} : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          {C[slide]}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
