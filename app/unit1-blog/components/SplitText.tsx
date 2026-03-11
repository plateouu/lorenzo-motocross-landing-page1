"use client";

import { motion } from "framer-motion";
import { useTransition } from "./TransitionProvider";
import { useEffect, useState } from "react";

export function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const { phase } = useTransition();
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(text.split(" "));
  }, [text]);

  // Luxury ease curve: [0.76, 0, 0.24, 1]
  const container = {
    idle: { opacity: 1 },
    entering: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
    exiting: {
      opacity: 1,
      transition: { staggerChildren: 0.02, staggerDirection: -1 as const },
    },
  };

  const child = {
    idle: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" },
    entering: {
      opacity: [0, 0.5, 1],
      y: [40, 0],
      x: [-10, 0],
      filter: ["blur(8px)", "blur(0px)"],
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
    },
    exiting: {
      opacity: [1, 0.5, 0],
      y: [0, -30],
      x: [0, 15],
      filter: ["blur(0px)", "blur(12px)"],
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
  };

  // The ghost layer lags slightly behind
  const ghost = {
    idle: { opacity: 0 },
    entering: {
      opacity: [0, 0.3, 0],
      y: [60, 10, -10],
      x: [10, -5, 0],
      filter: ["blur(12px)", "blur(4px)", "blur(0px)"],
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], times: [0, 0.6, 1] },
    },
    exiting: {
      opacity: [0, 0.4, 0],
      y: [0, -10, -50],
      x: [0, -10, 20],
      filter: ["blur(0px)", "blur(8px)", "blur(16px)"],
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], times: [0, 0.4, 1] },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="entering"
      animate={phase === "exiting" ? "exiting" : "idle"}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] relative inline-block whitespace-nowrap">
          {/* Main Text */}
          <motion.span variants={child} className="inline-block relative z-10">
            {word}
          </motion.span>
          {/* Ghost Text */}
          <motion.span
            variants={ghost}
            className="absolute inset-0 z-0 select-none pointer-events-none text-white/20"
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
