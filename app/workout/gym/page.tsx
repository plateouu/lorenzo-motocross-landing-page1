"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Exercise {
  name: string;
  sets: string;
  videoId: string;
}

interface DayPlan {
  day: string;
  title: string;
  focus: string;
  accent: string;
  exercises: Exercise[];
}

const WARMUP = {
  title: "Warmup — Every Gym Day",
  duration: "10 minutes total",
  steps: [
    "Treadmill jog — 5 minutes light",
    "Leg swings — 10 each leg",
    "Walking lunges — 10 each leg",
    "Arm circles — 15 each direction",
    "Warmup set: light weight ×10, medium weight ×5",
  ],
};

const WEEK: DayPlan[] = [
  {
    day: "Monday",
    title: "Heavy Legs (Power)",
    focus: "Quads & Glutes",
    accent: "#ff5500",
    exercises: [
      { name: "Smith Machine Squats", sets: "4 × 5", videoId: "DUWK_gKcRCc" },
      { name: "Leg Press", sets: "4 × 8", videoId: "IZxyjW7MPJQ" },
      { name: "Romanian Deadlift (DB / Smith)", sets: "3 × 8", videoId: "5WxMW-Fu5KU" },
      { name: "Seated Leg Curl", sets: "3 × 10", videoId: "Wy1SwoY2aaQ" },
      { name: "Smith Machine Calf Raises", sets: "4 × 12", videoId: "g2rGZk_bJ4k" },
      { name: "Ab Crunch Machine", sets: "3 × 15", videoId: "m_TnNDJAUF8" },
    ],
  },
  {
    day: "Tuesday",
    title: "Upper Push",
    focus: "Chest & Shoulders",
    accent: "#ff7600",
    exercises: [
      { name: "Incline Dumbbell Bench", sets: "4 × 8", videoId: "8iPEnn-ltC8" },
      { name: "Seated DB Shoulder Press", sets: "4 × 8", videoId: "rO_iEImwHyo" },
      { name: "Machine Chest Press", sets: "3 × 10", videoId: "n8TOta_pfr4" },
      { name: "Dumbbell Lateral Raises", sets: "3 × 12", videoId: "Y29xKcze8Ik" },
      { name: "Tricep Rope Pushdowns", sets: "4 × 12", videoId: "kiuVA0gs3EI" },
      { name: "Overhead Tricep Extension", sets: "3 × 10", videoId: "nRiJVZDpdL0" },
    ],
  },
  {
    day: "Wednesday",
    title: "Sprint + Conditioning",
    focus: "Speed & Core",
    accent: "#ffaa00",
    exercises: [
      { name: "Treadmill Sprint Intervals (10×20-30s sprint / 60s rest)", sets: "10 rounds", videoId: "IbKQfHU6TOc" },
      { name: "Hanging Leg Raises", sets: "3 × failure", videoId: "hdng3Nm1x_E" },
      { name: "Cable Woodchops", sets: "3 × 12 each side", videoId: "0_QBtLJiYaw" },
      { name: "Plank", sets: "3 × 60 sec", videoId: "pvIjsG5Svck" },
      { name: "Back Extension", sets: "3 × 12", videoId: "vx0bSEzyzEo" },
      { name: "Smith Machine Calf Raises", sets: "4 × 15", videoId: "g2rGZk_bJ4k" },
    ],
  },
  {
    day: "Thursday",
    title: "Glutes / Hamstrings",
    focus: "Posterior Chain",
    accent: "#ff5500",
    exercises: [
      { name: "Smith Machine Hip Thrust", sets: "4 × 8", videoId: "Zp26q4BY5HE" },
      { name: "Bulgarian Split Squat", sets: "3 × 8 each leg", videoId: "2C-uNgKwPLE" },
      { name: "Seated Leg Curl", sets: "4 × 10", videoId: "Wy1SwoY2aaQ" },
      { name: "Leg Extensions", sets: "3 × 12", videoId: "YyvSfVjQeL0" },
      { name: "Smith Machine Calf Raises", sets: "4 × 15", videoId: "g2rGZk_bJ4k" },
    ],
  },
  {
    day: "Friday",
    title: "Upper Pull",
    focus: "Back, Traps & Biceps",
    accent: "#ff7600",
    exercises: [
      { name: "Lat Pulldown", sets: "4 × 8", videoId: "CAwf7n6Luuc" },
      { name: "Seated Cable Row", sets: "4 × 10", videoId: "GZbfZ033f74" },
      { name: "Dumbbell Shrugs", sets: "4 × 12", videoId: "cJRVVxmytaM" },
      { name: "Dumbbell Hammer Curl", sets: "3 × 10", videoId: "zC3nLlEvin4" },
      { name: "Cable Bicep Curl", sets: "3 × 12", videoId: "NFzpLET5Zmg" },
      { name: "Face Pull", sets: "3 × 12", videoId: "rep-qVOkqgk" },
    ],
  },
  {
    day: "Saturday",
    title: "Arms + Core",
    focus: "This Is the Day Your Arms Grow",
    accent: "#ffaa00",
    exercises: [
      { name: "EZ Bar Curl", sets: "4 × 10", videoId: "kwG2ipFRgFo" },
      { name: "Incline Dumbbell Curl", sets: "3 × 10", videoId: "soxrZlIl35U" },
      { name: "Tricep Rope Pushdown", sets: "4 × 12", videoId: "kiuVA0gs3EI" },
      { name: "Overhead Cable Tricep Extension", sets: "3 × 10", videoId: "nRiJVZDpdL0" },
      { name: "Lateral Raises", sets: "3 × 15", videoId: "Y29xKcze8Ik" },
      { name: "Cable Crunch", sets: "3 × 15", videoId: "AV5PmrFqMUU" },
    ],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

function VideoEmbed({ videoId, name }: { videoId: string; name: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-white/5 transition-colors hover:bg-white/10"
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover opacity-40 transition-opacity group-hover:opacity-60"
        />
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff7600] shadow-lg shadow-[#ff7600]/30 transition-transform group-hover:scale-110 md:h-14 md:w-14">
          <svg viewBox="0 0 24 24" fill="black" className="ml-1 h-5 w-5 md:h-6 md:w-6">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/[0.03] md:p-5"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#ff7600]/10 text-xs font-bold text-[#ff7600] md:h-8 md:w-8">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-white md:text-base">{exercise.name}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/50 md:px-3">{exercise.sets}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`h-4 w-4 text-white/30 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-white/5 p-3 md:p-4">
          <VideoEmbed videoId={exercise.videoId} name={exercise.name} />
        </div>
      )}
    </motion.div>
  );
}

export default function GymPlanPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-32 md:px-6">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="flex flex-col items-center gap-4 pt-16 pb-16 text-center md:pt-24 md:pb-20"
      >
        <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff7600]">
          6 Days Lifting · 1 Rest
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-5xl font-black leading-none tracking-tight md:text-7xl">
          Build the <span className="text-[#ff7600]">Machine</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-lg text-white/40 text-base md:text-lg">
          Compound lifts for power. Machines for Planet Fitness. Arms & traps to fill out. 60–90 min per session.
        </motion.p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="mb-16 md:mb-20"
      >
        <motion.div variants={fadeUp} className="rounded-2xl border border-[#ff7600]/20 bg-[#ff7600]/[0.03] p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <h3 className="text-base font-bold text-[#ff7600] md:text-lg">{WARMUP.title}</h3>
              <p className="text-sm text-white/40">{WARMUP.duration}</p>
            </div>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {WARMUP.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <span className="mt-0.5 text-[#ff7600]">›</span>
                {step}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      {WEEK.map((day) => (
        <motion.section
          key={day.day}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-end justify-between border-b border-white/5 pb-3 md:mb-6 md:pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest md:text-sm" style={{ color: day.accent }}>
                {day.day}
              </p>
              <h2 className="text-2xl font-black text-white md:text-3xl">{day.title}</h2>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/40 md:px-4 md:py-1.5">{day.focus}</span>
          </motion.div>
          <div className="grid gap-2 md:gap-3">
            {day.exercises.map((exercise, i) => (
              <ExerciseCard key={exercise.name + i} exercise={exercise} index={i} />
            ))}
          </div>
        </motion.section>
      ))}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="mb-8"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] py-12 text-center md:py-16"
        >
          <span className="text-5xl">😴</span>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff7600]">Sunday</p>
          <h2 className="text-3xl font-black text-white md:text-4xl">Rest Day</h2>
          <p className="text-base text-white/30 md:text-lg">Eat · Sleep · Recover</p>
        </motion.div>
      </motion.section>
    </main>
  );
}
