"use client";

import { motion } from "framer-motion";

const MEALS = [
  {
    time: "6:30 AM",
    title: "Liquid Calories",
    items: ["Shaker cup — whole milk, whey protein, creatine", "Bagel with cream cheese"],
    icon: "🥤",
    accent: "#ff7600",
  },
  {
    time: "~12 PM",
    title: "School Lunch",
    items: ["Heaviest carbs available", "Biggest meat option"],
    icon: "🍱",
    accent: "#ffaa00",
  },
  {
    time: "Post-Gym",
    title: "Fast Protein",
    items: ["Chocolate milk", "Protein bar"],
    icon: "🍫",
    accent: "#ff5500",
  },
  {
    time: "Dinner",
    title: "Main Fuel",
    items: ["Meats from the freezer", "White rice or pasta", "Alfredo pasta preferred — add cheese"],
    icon: "🍝",
    accent: "#ff7600",
  },
  {
    time: "Pre-Bed",
    title: "Slow Fuel",
    items: ["Toast with peanut butter & honey", "Bowl of cereal"],
    icon: "🍯",
    accent: "#ffcc00",
  },
];

const MACROS = [
  {
    label: "Protein",
    value: "203g",
    description:
      "Well over 1 gram per pound of body weight — the golden rule for building arms and adding lean tissue.",
    color: "#ff5500",
  },
  {
    label: "Carbs",
    value: "463g",
    description:
      "Your secret weapon for the 400m. The race is entirely anaerobic — it burns pure glycogen. 450g+ keeps your legs explosive through that final 100m straightaway.",
    color: "#ff7600",
  },
  {
    label: "Calories",
    value: "3,800",
    description:
      "Training 1–3 hours a day turns your metabolism into a furnace. This surplus guarantees you're gaining weight, not just burning it on the track.",
    color: "#ffaa00",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] } },
};

export default function MealPrepPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="flex flex-col items-center gap-4 pt-16 pb-16 text-center md:pt-24 md:pb-20"
      >
        <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff7600]">
          Taylor&apos;s Daily Nutrition
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-black leading-none tracking-tight md:text-7xl"
        >
          Eat to <span className="text-[#ff7600]">Grow</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-md text-white/40 text-base md:text-lg">
          Five meals. 3,800 calories. Every gram engineered for the track and the rack.
        </motion.p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="relative"
      >
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff7600]/60 via-[#ff7600]/20 to-transparent md:left-1/2" />

        {MEALS.map((meal, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={meal.title}
              variants={fadeUp}
              className={`relative mb-12 flex flex-col gap-4 pl-16 md:mb-16 md:flex-row md:items-start md:gap-0 md:pl-0 ${
                isLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className="absolute left-4 top-2 z-10 h-4 w-4 rounded-full border-2 md:left-1/2 md:-translate-x-1/2"
                style={{ borderColor: meal.accent, backgroundColor: "#0a0a0a", boxShadow: `0 0 12px ${meal.accent}40` }}
              />

              <div className={`md:w-1/2 ${isLeft ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6 backdrop-blur-sm transition-colors hover:border-white/10">
                  <div className="mb-3 flex items-center gap-3" style={isLeft ? {} : { justifyContent: "flex-end" }}>
                    <span className="text-2xl">{meal.icon}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: meal.accent }}>
                        {meal.time}
                      </p>
                      <p className="text-base font-bold text-white md:text-lg">{meal.title}</p>
                    </div>
                  </div>
                  <ul className={`space-y-1 text-sm text-white/50 ${isLeft ? "" : "md:text-right"}`}>
                    {meal.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          );
        })}
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mt-12 md:mt-16"
      >
        <motion.h2 variants={fadeUp} className="mb-10 text-center text-3xl font-black md:text-4xl">
          The <span className="text-[#ff7600]">Numbers</span>
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {MACROS.map((macro) => (
            <motion.div
              key={macro.label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 transition-colors hover:border-white/10"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${macro.color}10, transparent 70%)`,
                }}
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: macro.color }}>
                  {macro.label}
                </p>
                <p className="mt-2 text-4xl font-black text-white md:text-5xl">{macro.value}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/40">{macro.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
