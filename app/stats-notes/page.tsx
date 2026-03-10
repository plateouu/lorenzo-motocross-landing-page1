"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_COUNT = 19;
const MCQ_TIME = 30;
const DEBATE_PREP_TIME = 180;
const DEBATE_TIME = 300;
const DO_NOW_TIME = 300;

type MCQState = {
  selected: string | null;
  revealed: boolean;
  timeLeft: number;
  running: boolean;
};

const useAudioFX = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    return ctxRef.current;
  };

  const playTone = (freq: number, duration: number, type: OscillatorType = "sine", vol = 0.15) => {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  return {
    correct: () => {
      playTone(523, 0.15, "sine", 0.12);
      setTimeout(() => playTone(659, 0.15, "sine", 0.12), 100);
      setTimeout(() => playTone(784, 0.3, "sine", 0.12), 200);
    },
    wrong: () => {
      playTone(200, 0.3, "sawtooth", 0.08);
      setTimeout(() => playTone(150, 0.4, "sawtooth", 0.08), 150);
    },
    tick: () => playTone(880, 0.05, "sine", 0.06),
    navigate: () => playTone(440, 0.08, "sine", 0.05),
    timeUp: () => {
      playTone(330, 0.2, "square", 0.1);
      setTimeout(() => playTone(262, 0.2, "square", 0.1), 200);
      setTimeout(() => playTone(196, 0.4, "square", 0.1), 400);
    },
    debateStart: () => {
      playTone(440, 0.15, "sine", 0.1);
      setTimeout(() => playTone(554, 0.15, "sine", 0.1), 120);
      setTimeout(() => playTone(659, 0.25, "sine", 0.1), 240);
    },
  };
};

function GoldParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/30">
      <motion.div
        className="h-full"
        style={{ background: "linear-gradient(90deg, #d4af37, #f0d060, #d4af37)" }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function TimerDisplay({ timeLeft, total, label }: { timeLeft: number; total: number; label: string }) {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const pct = (timeLeft / total) * 100;
  const urgent = timeLeft <= 10 && timeLeft > 0;

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      animate={urgent ? { scale: [1, 1.05, 1] } : {}}
      transition={urgent ? { duration: 0.5, repeat: Infinity } : {}}
    >
      <span className="text-xs uppercase tracking-[0.3em] text-amber-300/70">{label}</span>
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="2" />
          <motion.circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={urgent ? "#ef4444" : "#d4af37"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${pct} ${100 - pct}`}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-mono font-bold ${urgent ? "text-red-400" : "text-amber-200"}`}>
            {mins}:{secs.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function MCQOption({
  label,
  text,
  selected,
  correct,
  revealed,
  onClick,
}: {
  label: string;
  text: string;
  selected: boolean;
  correct: boolean;
  revealed: boolean;
  onClick: () => void;
}) {
  let bg = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-500/40";
  if (revealed && correct) bg = "bg-emerald-500/20 border-emerald-400/60";
  else if (revealed && selected && !correct) bg = "bg-red-500/20 border-red-400/60";
  else if (selected) bg = "bg-amber-500/15 border-amber-400/50";

  return (
    <motion.button
      onClick={onClick}
      disabled={revealed}
      className={`w-full text-left p-4 rounded-xl border backdrop-blur-sm transition-colors ${bg}`}
      whileHover={!revealed ? { scale: 1.01, x: 6 } : {}}
      whileTap={!revealed ? { scale: 0.99 } : {}}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: ["A", "B", "C", "D"].indexOf(label) * 0.08 }}
    >
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-bold mr-3 text-sm">
        {label}
      </span>
      <span className="text-white/90 text-sm leading-relaxed">{text}</span>
      {revealed && correct && <span className="ml-2 text-emerald-400">✓</span>}
      {revealed && selected && !correct && <span className="ml-2 text-red-400">✗</span>}
    </motion.button>
  );
}

function SlideShell({
  children,
  slideNum,
  bg,
}: {
  children: React.ReactNode;
  slideNum: number;
  bg?: string;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: bg || "radial-gradient(ellipse at 30% 20%, #1a1207 0%, #0d0d0d 50%, #0a0a0a 100%)",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      <div className="absolute bottom-4 right-6 text-[10px] tracking-[0.2em] text-white/20 uppercase">
        {slideNum} / {SLIDE_COUNT}
      </div>
    </motion.div>
  );
}

function TitleSlide() {
  return (
    <SlideShell slideNum={1} bg="radial-gradient(ellipse at 50% 30%, #1a1510 0%, #0d0b08 40%, #050505 100%)">
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-5xl">
        <motion.div
          className="mb-6 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-amber-300 text-xs tracking-[0.4em] uppercase">
            AP African American Studies · Unit 3
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-bold leading-[1.1] mb-4"
          style={{
            background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          3.11: The New Negro
          <br />
          Movement & the
          <br />
          Harlem Renaissance
        </motion.h1>

        <motion.p
          className="text-white/50 text-sm tracking-wide mt-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Self-Definition · Racial Pride · Cultural Innovation
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            Due: 3.10 GN/MCQ/RS, 3.11 KT
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            Coming Up: 3.11 GN/MCQ/RS
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300">
            Unit 3 Exam Coming Soon
          </span>
        </motion.div>

        <motion.img
          src="/slides-images/harlem-street.png"
          alt="Harlem 1920s"
          className="mt-8 w-full max-w-lg rounded-2xl border border-amber-500/20 shadow-2xl shadow-amber-900/20 object-cover h-48"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        />
      </div>
    </SlideShell>
  );
}

function DoNowSlide({ sfx }: { sfx: ReturnType<typeof useAudioFX> }) {
  const [timeLeft, setTimeLeft] = useState(DO_NOW_TIME);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const toggle = () => {
    if (running) {
      if (timerRef.current) clearInterval(timerRef.current);
      setRunning(false);
    } else {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            sfx.timeUp();
            return 0;
          }
          if (t <= 11) sfx.tick();
          return t - 1;
        });
      }, 1000);
    }
  };

  const questions = [
    "What do you think Locke means by a \u201cnew psychology\u201d among the younger generation of African Americans?",
    "How might this \u201cnew spirit\u201d connect to the artistic and cultural changes happening in Black communities during the 1920s?",
    "Why would self-definition be so important for African Americans during a time period known as the \u201cnadir\u201d of race relations?",
    "How does this quote challenge the stereotypes that existed about Black people at the time?",
  ];

  return (
    <SlideShell slideNum={2} bg="radial-gradient(ellipse at 70% 20%, #1a1207 0%, #0d0d0d 60%, #050505 100%)">
      <div className="relative z-10 flex gap-8 px-10 max-w-6xl w-full items-start">
        <div className="flex-1">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 text-lg">
              ✍
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Do Now</h2>
              <span className="text-white/40 text-xs">5 minutes</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/5 border border-amber-500/20 rounded-2xl p-5 mb-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-amber-300/60 uppercase tracking-widest mb-2">Quote</p>
            <p className="text-white/80 italic text-sm leading-relaxed">
              &ldquo;The younger generation is vibrant with a new psychology; the new spirit is awake in the masses.&rdquo;
            </p>
            <p className="text-amber-300/50 text-xs mt-2">― Alain Locke, The New Negro, 1925</p>
          </motion.div>

          <div className="space-y-3">
            {questions.map((q, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-start"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-white/70 text-sm leading-relaxed">{q}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-4 pt-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TimerDisplay timeLeft={timeLeft} total={DO_NOW_TIME} label="Time Remaining" />
          <button
            onClick={toggle}
            className="mt-2 px-6 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: running
                ? "linear-gradient(135deg, #dc2626, #991b1b)"
                : "linear-gradient(135deg, #d4af37, #b8941f)",
              color: "white",
            }}
          >
            {running ? "Pause" : timeLeft === DO_NOW_TIME ? "Start" : "Resume"}
          </button>
          <img
            src="/slides-images/alain-locke.png"
            alt="Alain Locke"
            className="w-40 rounded-xl border border-amber-500/20 mt-4 shadow-lg"
          />
        </motion.div>
      </div>
    </SlideShell>
  );
}

function SectionTitleSlide() {
  return (
    <SlideShell slideNum={3} bg="radial-gradient(ellipse at 50% 50%, #1a1510 0%, #0a0908 60%, #050505 100%)">
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          className="text-amber-400/40 text-sm tracking-[0.5em] uppercase mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          3.11 · AP AFAM
        </motion.span>
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-3"
          style={{
            background: "linear-gradient(135deg, #d4af37, #f5e6a3, #d4af37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          THE NEW NEGRO MOVEMENT
        </motion.h1>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white/60"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          AND THE HARLEM RENAISSANCE
        </motion.h2>
        <motion.div
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </div>
    </SlideShell>
  );
}

function ContentSlide({
  slideNum,
  title,
  icon,
  bullets,
  images,
}: {
  slideNum: number;
  title: string;
  icon: string;
  bullets: string[];
  images: { src: string; alt: string }[];
}) {
  return (
    <SlideShell slideNum={slideNum}>
      <div className="relative z-10 flex gap-8 px-10 max-w-6xl w-full items-start">
        <div className="flex-1">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">
              {icon}
            </div>
            <h2
              className="text-3xl font-bold"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f5e6a3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {bullets.map((b, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-start"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-500/50 flex-shrink-0" />
                <p className="text-white/75 text-sm leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {images.length > 0 && (
          <motion.div
            className="flex flex-col gap-4 w-56 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="w-full rounded-xl border border-amber-500/15 shadow-lg shadow-amber-900/10 object-cover h-36"
              />
            ))}
          </motion.div>
        )}
      </div>
    </SlideShell>
  );
}

function DebateIntroSlide() {
  return (
    <SlideShell slideNum={9} bg="radial-gradient(ellipse at 50% 40%, #1a0f07 0%, #0d0907 50%, #050505 100%)">
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl px-8">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-3xl mb-5"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
        >
          ⚔️
        </motion.div>
        <motion.h2
          className="text-5xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #f97316, #fbbf24, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          DEBATE IT OUT
        </motion.h2>
        <motion.p
          className="text-white/60 text-sm leading-relaxed mb-6 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          One half of the class takes one stance, the other half takes the other.
          Use evidence from the lecture, required sources (Locke & Hughes), and your EK knowledge.
        </motion.p>
        <motion.div
          className="flex gap-6 text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">3 min prep</span>
          <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">5 min debate per topic</span>
        </motion.div>
      </div>
    </SlideShell>
  );
}

function DebateTopicSlide({
  slideNum,
  topicNum,
  title,
  side1,
  side2,
  sfx,
}: {
  slideNum: number;
  topicNum: number;
  title: string;
  side1: string;
  side2: string;
  sfx: ReturnType<typeof useAudioFX>;
}) {
  const [phase, setPhase] = useState<"idle" | "prep" | "debate" | "done">("idle");
  const [timeLeft, setTimeLeft] = useState(DEBATE_PREP_TIME);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startPhase = (p: "prep" | "debate") => {
    if (timerRef.current) clearInterval(timerRef.current);
    const total = p === "prep" ? DEBATE_PREP_TIME : DEBATE_TIME;
    setPhase(p);
    setTimeLeft(total);
    if (p === "debate") sfx.debateStart();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          sfx.timeUp();
          if (p === "prep") {
            setPhase("debate");
            setTimeLeft(DEBATE_TIME);
            sfx.debateStart();
            timerRef.current = setInterval(() => {
              setTimeLeft((t2) => {
                if (t2 <= 1) {
                  clearInterval(timerRef.current!);
                  sfx.timeUp();
                  setPhase("done");
                  return 0;
                }
                if (t2 <= 11) sfx.tick();
                return t2 - 1;
              });
            }, 1000);
          } else {
            setPhase("done");
          }
          return 0;
        }
        if (t <= 11) sfx.tick();
        return t - 1;
      });
    }, 1000);
  };

  const totalForPhase = phase === "prep" ? DEBATE_PREP_TIME : DEBATE_TIME;

  return (
    <SlideShell slideNum={slideNum} bg="radial-gradient(ellipse at 50% 30%, #1a0f07 0%, #0d0908 50%, #050505 100%)">
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl px-8 w-full">
        <motion.span
          className="text-orange-400/60 text-xs tracking-[0.4em] uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Topic #{topicNum}
        </motion.span>
        <motion.h2
          className="text-3xl font-bold mb-6"
          style={{
            background: "linear-gradient(135deg, #f97316, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-5 w-full mb-6">
          {[
            { label: "Side 1", text: side1, color: "blue" },
            { label: "Side 2", text: side2, color: "red" },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={`p-5 rounded-2xl border backdrop-blur-sm text-left ${
                s.color === "blue"
                  ? "bg-blue-500/10 border-blue-500/25"
                  : "bg-red-500/10 border-red-500/25"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <span
                className={`text-xs font-bold uppercase tracking-widest mb-2 block ${
                  s.color === "blue" ? "text-blue-400" : "text-red-400"
                }`}
              >
                {s.label}
              </span>
              <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {phase !== "idle" && phase !== "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <TimerDisplay
              timeLeft={timeLeft}
              total={totalForPhase}
              label={phase === "prep" ? "Prep Time" : "Debate Time"}
            />
          </motion.div>
        )}

        {phase === "done" && (
          <motion.p
            className="text-amber-300 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Time's up! Great debate.
          </motion.p>
        )}

        {phase === "idle" && (
          <motion.button
            onClick={() => startPhase("prep")}
            className="mt-2 px-8 py-3 rounded-xl font-medium text-sm text-white"
            style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Start Prep Timer (3 min)
          </motion.button>
        )}
      </div>
    </SlideShell>
  );
}

function MCQSlide({
  slideNum,
  questionNum,
  question,
  options,
  correctKey,
  sfx,
  isRevealSlide,
}: {
  slideNum: number;
  questionNum: number;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  sfx: ReturnType<typeof useAudioFX>;
  isRevealSlide: boolean;
}) {
  const [state, setState] = useState<MCQState>({
    selected: null,
    revealed: isRevealSlide,
    timeLeft: MCQ_TIME,
    running: false,
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRevealSlide) {
      setState((s) => ({ ...s, revealed: true }));
      return;
    }
    setState({ selected: null, revealed: false, timeLeft: MCQ_TIME, running: true });
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timerRef.current!);
          sfx.timeUp();
          return { ...prev, timeLeft: 0, running: false, revealed: true };
        }
        if (prev.timeLeft <= 6) sfx.tick();
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRevealSlide]);

  const handleSelect = (key: string) => {
    if (state.revealed) return;
    setState((s) => ({ ...s, selected: key }));
  };

  const handleReveal = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState((s) => ({ ...s, revealed: true, running: false }));
    if (state.selected === correctKey) sfx.correct();
    else sfx.wrong();
  };

  return (
    <SlideShell slideNum={slideNum} bg="radial-gradient(ellipse at 40% 20%, #0d1a0d 0%, #0d0d0d 50%, #050505 100%)">
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-8 w-full">
        <motion.div
          className="flex items-center gap-3 mb-5 self-start"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg">📝</div>
          <div>
            <h3 className="text-lg font-bold text-white">Practice MCQ #{questionNum}</h3>
            <span className="text-xs text-white/30">{isRevealSlide ? "Answer Reveal" : "Choose your answer"}</span>
          </div>
          {!isRevealSlide && state.running && (
            <div className="ml-auto">
              <TimerDisplay timeLeft={state.timeLeft} total={MCQ_TIME} label="Time" />
            </div>
          )}
        </motion.div>

        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full mb-5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-white/85 text-sm leading-relaxed">{question}</p>
        </motion.div>

        <div className="w-full space-y-3">
          {options.map((o) => (
            <MCQOption
              key={o.key}
              label={o.key}
              text={o.text}
              selected={state.selected === o.key}
              correct={o.key === correctKey}
              revealed={state.revealed}
              onClick={() => handleSelect(o.key)}
            />
          ))}
        </div>

        {!isRevealSlide && !state.revealed && state.selected && (
          <motion.button
            onClick={handleReveal}
            className="mt-5 px-8 py-3 rounded-xl font-medium text-sm text-white"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Lock In & Reveal
          </motion.button>
        )}
      </div>
    </SlideShell>
  );
}

function ClosingSlide() {
  return (
    <SlideShell slideNum={19} bg="radial-gradient(ellipse at 50% 40%, #1a1510 0%, #0d0b08 50%, #050505 100%)">
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl px-8">
        <motion.div
          className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-2xl mb-5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          🎬
        </motion.div>
        <motion.h2
          className="text-4xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #d4af37, #f5e6a3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Closing Video
        </motion.h2>
        <motion.p
          className="text-white/50 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AP African American Studies: 3.11 — The New Negro Movement and the Harlem Renaissance
        </motion.p>
        <motion.a
          href="https://www.youtube.com/watch?v=m4PwIrdNuQI"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white border border-red-500/40 bg-red-500/15 hover:bg-red-500/25 transition-colors"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-red-400">
            <path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
          </svg>
          Watch on YouTube
        </motion.a>
        <motion.p
          className="text-white/30 text-xs mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          APUSHSlides — Unit 3 Playlist
        </motion.p>
      </div>
    </SlideShell>
  );
}

const mcqData = [
  {
    question:
      "The New Negro movement most directly reflected which of the following developments in the early twentieth century?",
    options: [
      { key: "A", text: "The decline of African American political activism after Reconstruction" },
      { key: "B", text: "A growing emphasis on self-definition, racial pride, and cultural expression among African Americans" },
      { key: "C", text: "Federal legislation that protected the civil rights of African Americans in northern cities" },
      { key: "D", text: "The integration of African American artists into mainstream white cultural institutions" },
    ],
    correct: "B",
  },
  {
    question:
      'Langston Hughes\'s essay "The Negro Artist and the Racial Mountain" most directly argues for which of the following?',
    options: [
      { key: "A", text: "African American artists should seek approval from white critics to gain wider recognition." },
      { key: "B", text: "Black artists should embrace their own racial identity and cultural traditions in their work." },
      { key: "C", text: "The Harlem Renaissance was primarily a political movement rather than an artistic one." },
      { key: "D", text: "African American literature should focus exclusively on the experience of slavery." },
    ],
    correct: "B",
  },
  {
    question:
      "Which of the following best describes the relationship between the Great Migration and the Harlem Renaissance?",
    options: [
      { key: "A", text: "The Great Migration had no significant impact on cultural developments in northern cities." },
      { key: "B", text: "The migration of African Americans from the South brought cultural traditions that helped fuel artistic innovations in urban centers like Harlem." },
      { key: "C", text: "The Harlem Renaissance primarily drew on European artistic traditions rather than African American culture." },
      { key: "D", text: "The Great Migration was caused by the success of the Harlem Renaissance in attracting Southern Black workers." },
    ],
    correct: "B",
  },
];

const debateTopics = [
  {
    title: "THE BLACK AESTHETIC",
    side1:
      "The creation of a unique Black aesthetic was the most important contribution of the New Negro movement because it gave African Americans their own cultural identity.",
    side2:
      "The political self-advocacy of the New Negro movement was more important than the aesthetic because it directly challenged systemic racism and fought for real change.",
  },
  {
    title: "LOCKE vs. HUGHES",
    side1:
      "Alain Locke had a greater impact on the New Negro movement because he created the intellectual framework that defined the entire Harlem Renaissance.",
    side2:
      "Langston Hughes had a greater impact because he turned the philosophy into actual art that everyday Black people could connect with and be proud of.",
  },
  {
    title: "LEGACY OF THE HARLEM RENAISSANCE",
    side1:
      "The Harlem Renaissance's greatest legacy was its cultural contributions (jazz, literature, art) that permanently changed American culture.",
    side2:
      "The Harlem Renaissance's greatest legacy was building the sense of community pride and identity that later fueled the Civil Rights Movement.",
  },
];

export default function SlidesPage() {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const sfx = useAudioFX();

  const go = useCallback(
    (dir: number) => {
      const next = slide + dir;
      if (next < 0 || next >= SLIDE_COUNT) return;
      setDirection(dir);
      sfx.navigate();
      setSlide(next);
    },
    [slide, sfx]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const renderSlide = () => {
    switch (slide) {
      case 0:
        return <TitleSlide key="s0" />;
      case 1:
        return <DoNowSlide key="s1" sfx={sfx} />;
      case 2:
        return <SectionTitleSlide key="s2" />;
      case 3:
        return (
          <ContentSlide
            key="s3"
            slideNum={4}
            title="What Was the New Negro Movement?"
            icon="📖"
            bullets={[
              "The New Negro movement encouraged African Americans to define their own identity and advocate for themselves politically during the nadir of race relations.",
              "It began in the late 19th century and took many forms — from Booker T. Washington's accommodationism to Marcus Garvey's Pan-Africanism.",
              'Alain Locke redefined the movement as an aesthetic movement in his 1925 anthology "The New Negro: An Interpretation."',
              "The movement challenged the idea that Black people were inferior, pushing for racial pride, self-determination, and cultural expression.",
            ]}
            images={[{ src: "/slides-images/alain-locke.png", alt: "Alain Locke" }]}
          />
        );
      case 4:
        return (
          <ContentSlide
            key="s4"
            slideNum={5}
            title="The Creation of a Black Aesthetic"
            icon="🎨"
            bullets={[
              "The New Negro movement pursued the creation of a Black aesthetic, reflected in the artistic and cultural achievements of Black creators.",
              "Black aesthetics were central to self-definition — more than just art, it was about shifting the spirit and mindset of Black people.",
              "Locke encouraged young Black artists to reject the burden of being the sole representative of their entire race and instead express themselves freely.",
              "Writers like Langston Hughes, Zora Neale Hurston, and Claude McKay created literature that celebrated Black life and culture.",
            ]}
            images={[
              { src: "/slides-images/harlem-writers.png", alt: "Harlem Writers" },
            ]}
          />
        );
      case 5:
        return (
          <ContentSlide
            key="s5"
            slideNum={6}
            title="Innovations in Music, Art, and Literature"
            icon="🎵"
            bullets={[
              "The New Negro movement produced innovations in music (blues and jazz), art, and literature that served as counternarratives to prevailing racial stereotypes.",
              "These artistic innovations reflected the migrations of African Americans from the South to urban centers in the North and Midwest.",
              "Jazz musicians like Duke Ellington and Louis Armstrong became famous in Harlem clubs like the Cotton Club and the Apollo Theater.",
              "Artists like Aaron Douglas created paintings blending African imagery with modern styles, shaping a unique visual identity.",
              'Langston Hughes wrote "The Negro Artist and the Racial Mountain" (1926), arguing Black artists should embrace their own culture instead of fitting white standards.',
            ]}
            images={[
              { src: "/slides-images/jazz-musicians.png", alt: "Jazz musicians" },
              { src: "/slides-images/aaron-douglas.png", alt: "Aaron Douglas art" },
            ]}
          />
        );
      case 6:
        return (
          <ContentSlide
            key="s6"
            slideNum={7}
            title="The Harlem Renaissance"
            icon="🌟"
            bullets={[
              "The New Negro movement encompassed several political and cultural movements, including the Harlem Renaissance.",
              "The Harlem Renaissance was a flourishing of Black literary, artistic, and intellectual life that created a cultural revolution in the 1920s and 1930s.",
              "Harlem became the cultural capital of Black America as thousands moved there during the Great Migration.",
              "Key figures: Langston Hughes (poetry), Zora Neale Hurston (novels), Claude McKay (poetry), Aaron Douglas (visual art), Duke Ellington (music).",
              "The movement gave African Americans a sense of pride and showed the world the richness of Black culture.",
            ]}
            images={[{ src: "/slides-images/harlem-street.png", alt: "Harlem street scene" }]}
          />
        );
      case 7:
        return (
          <ContentSlide
            key="s7"
            slideNum={8}
            title="Impact of the Harlem Renaissance"
            icon="💡"
            bullets={[
              "Created lasting cultural contributions that influenced American society for decades.",
              "Proved Black Americans had a rich, vibrant culture, directly challenging the white supremacist narrative of Black inferiority.",
              "Jazz and blues from this era became the foundation of rock and roll and modern American music.",
              "Built a strong sense of community and identity that later helped fuel the Civil Rights Movement.",
              "Alain Locke became the first African American Rhodes Scholar in 1907, showing Black intellectual excellence.",
            ]}
            images={[
              { src: "/slides-images/civil-rights.png", alt: "Civil Rights Movement" },
              { src: "/slides-images/alain-locke.png", alt: "Alain Locke" },
            ]}
          />
        );
      case 8:
        return <DebateIntroSlide key="s8" />;
      case 9:
        return (
          <DebateTopicSlide
            key="s9"
            slideNum={10}
            topicNum={1}
            title={debateTopics[0].title}
            side1={debateTopics[0].side1}
            side2={debateTopics[0].side2}
            sfx={sfx}
          />
        );
      case 10:
        return (
          <DebateTopicSlide
            key="s10"
            slideNum={11}
            topicNum={2}
            title={debateTopics[1].title}
            side1={debateTopics[1].side1}
            side2={debateTopics[1].side2}
            sfx={sfx}
          />
        );
      case 11:
        return (
          <DebateTopicSlide
            key="s11"
            slideNum={12}
            topicNum={3}
            title={debateTopics[2].title}
            side1={debateTopics[2].side1}
            side2={debateTopics[2].side2}
            sfx={sfx}
          />
        );
      case 12:
        return (
          <MCQSlide
            key="s12"
            slideNum={13}
            questionNum={1}
            question={mcqData[0].question}
            options={mcqData[0].options}
            correctKey={mcqData[0].correct}
            sfx={sfx}
            isRevealSlide={false}
          />
        );
      case 13:
        return (
          <MCQSlide
            key="s13"
            slideNum={14}
            questionNum={1}
            question={mcqData[0].question}
            options={mcqData[0].options}
            correctKey={mcqData[0].correct}
            sfx={sfx}
            isRevealSlide={true}
          />
        );
      case 14:
        return (
          <MCQSlide
            key="s14"
            slideNum={15}
            questionNum={2}
            question={mcqData[1].question}
            options={mcqData[1].options}
            correctKey={mcqData[1].correct}
            sfx={sfx}
            isRevealSlide={false}
          />
        );
      case 15:
        return (
          <MCQSlide
            key="s15"
            slideNum={16}
            questionNum={2}
            question={mcqData[1].question}
            options={mcqData[1].options}
            correctKey={mcqData[1].correct}
            sfx={sfx}
            isRevealSlide={true}
          />
        );
      case 16:
        return (
          <MCQSlide
            key="s16"
            slideNum={17}
            questionNum={3}
            question={mcqData[2].question}
            options={mcqData[2].options}
            correctKey={mcqData[2].correct}
            sfx={sfx}
            isRevealSlide={false}
          />
        );
      case 17:
        return (
          <MCQSlide
            key="s17"
            slideNum={18}
            questionNum={3}
            question={mcqData[2].question}
            options={mcqData[2].options}
            correctKey={mcqData[2].correct}
            sfx={sfx}
            isRevealSlide={true}
          />
        );
      case 18:
        return <ClosingSlide key="s18" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#050505] overflow-hidden select-none"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <GoldParticles />
      <ProgressBar current={slide} total={SLIDE_COUNT} />

      <AnimatePresence mode="wait">{renderSlide()}</AnimatePresence>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
        <button
          onClick={() => go(-1)}
          disabled={slide === 0}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center text-sm"
        >
          ←
        </button>

        <div className="flex gap-1.5 px-3">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > slide ? 1 : -1);
                sfx.navigate();
                setSlide(i);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === slide
                  ? "bg-amber-400 w-6"
                  : "bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={slide === SLIDE_COUNT - 1}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80 disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center text-sm"
        >
          →
        </button>
      </div>

      <div className="fixed bottom-4 right-6 z-50 text-[10px] text-white/20">
        ← → or click to navigate
      </div>
    </div>
  );
}
