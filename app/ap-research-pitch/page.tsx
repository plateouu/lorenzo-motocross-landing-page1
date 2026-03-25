"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FLOORS = 8;
const BG = "#0f1115";

const useAudio = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const getCtx = () => { if (!ctxRef.current) ctxRef.current = new AudioContext(); return ctxRef.current; };
  return {
    ding: () => {
      const c = getCtx(), o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(800, c.currentTime);
      g.gain.setValueAtTime(0.3, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, c.currentTime + 1.2);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 1.2);
    },
    swish: () => {
      const c = getCtx(), o = c.createOscillator(), g = c.createGain();
      o.type = "triangle"; o.frequency.setValueAtTime(150, c.currentTime);
      o.frequency.exponentialRampToValueAtTime(30, c.currentTime + 0.6);
      g.gain.setValueAtTime(0.08, c.currentTime);
      g.gain.linearRampToValueAtTime(0, c.currentTime + 0.6);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + 0.6);
    }
  };
};

const pop = (delay = 0) => ({
  initial: { scale: 0.9, opacity: 0, y: 15 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: { type: "spring", bounce: 0.4, duration: 0.6, delay },
});

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function ElevatorPitchPage() {
  const [floor, setFloor] = useState(0);
  const [transit, setTransit] = useState(false);
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [indicatorFloor, setIndicatorFloor] = useState(0);
  const a = useAudio();

  const changeFloor = useCallback((newFloor: number) => {
    if (transit || newFloor === floor || newFloor < 0 || newFloor >= TOTAL_FLOORS) return;
    setTransit(true);
    a.swish();
    setDoorsClosed(true);

    // After doors close (600ms)
    setTimeout(() => {
      setFloor(newFloor);
      setIndicatorFloor(newFloor);
      a.ding();
      
      // Keep doors closed for a moment to simulate moving, then open
      setTimeout(() => {
        setDoorsClosed(false);
        a.swish();
        
        // Let transit finish after doors open
        setTimeout(() => setTransit(false), 600);
      }, 500);
    }, 600);
  }, [floor, transit, a]);

  const goNext = useCallback(() => changeFloor(floor + 1), [changeFloor, floor]);
  const goPrev = useCallback(() => changeFloor(floor - 1), [changeFloor, floor]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const slides = [
    // Floor 0 / L
    <div key="0" className="slide-content">
      <motion.span className="pill blue-pill" {...pop(0)}>Proposal Title</motion.span>
      <motion.h1 className="display-title gradient-text" {...rise(0.1)}>
        How Social Media Algorithms<br/>Affect Small Content Creators
      </motion.h1>
      <motion.p className="sub-title" {...rise(0.2)}>
        AP Research Project • Taylor Daan
      </motion.p>
    </div>,

    // Floor 1
    <div key="1" className="slide-content">
      <motion.span className="pill orange-pill" {...pop(0)}>The Problem</motion.span>
      <motion.h2 className="section-title" {...rise(0.1)}>The Algorithm Picks What Shows Up</motion.h2>
      
      <div className="card-grid">
        <motion.div className="card" {...rise(0.2)}>
          <h3>The Pressure</h3>
          <p>For new creators, if you don't follow the latest trend, nobody sees your work. You feel forced to copy what's famous just to get any views.</p>
        </motion.div>
        <motion.div className="card red-card" {...rise(0.3)}>
          <h3>The Impact</h3>
          <p>This pressure makes people stop being authentic. It leads to a lot of stress because you're constantly "acting fake" to gain followers.</p>
        </motion.div>
      </div>
    </div>,

    // Floor 2
    <div key="2" className="slide-content">
      <motion.span className="pill green-pill" {...pop(0)}>Research Question</motion.span>
      <motion.div className="hero-quote-box" {...rise(0.1)}>
        "How does the pressure to get views on TikTok and Instagram change how new creators feel and what they post?"
      </motion.div>

      <div className="card-grid mt-4">
        <motion.div className="card small-card" {...rise(0.3)}>
          <span className="bold-label highlight-green">Algorithm</span> 
          <p>The hidden code that picks which videos go viral and which ones stay invisible.</p>
        </motion.div>
        <motion.div className="card small-card" {...rise(0.4)}>
          <span className="bold-label highlight-green">Small Creators</span> 
          <p>Regular people trying to grow an audience on apps like TikTok and Instagram.</p>
        </motion.div>
      </div>
    </div>,

    // Floor 3
    <div key="3" className="slide-content">
      <motion.span className="pill purple-pill" {...pop(0)}>Predictions</motion.span>
      <motion.h2 className="section-title" {...rise(0.1)}>What I Expect to Find</motion.h2>

      <div className="split-layout">
        <motion.div className="card" {...rise(0.2)}>
          <h3 className="highlight-purple">The Theory</h3>
          <p>I assume the algorithm only shows content that matches viral trends. If you're new and have no followers, the platform basically hides you.</p>
        </motion.div>
        <motion.div className="card" {...rise(0.3)}>
          <h3 className="highlight-purple">The Goal</h3>
          <p>I think this unpredictability causes real mental stress. Creators are forced to give up their authentic style just to secure steady likes.</p>
        </motion.div>
      </div>
    </div>,

    // Floor 4
    <div key="4" className="slide-content">
      <motion.span className="pill blue-pill" {...pop(0)}>Expert Sources</motion.span>
      <motion.h2 className="section-title" {...rise(0.1)}>What Experts Say</motion.h2>

      <div className="note-stack">
        <motion.div className="card note-card" {...rise(0.2)}><b>Gillespie (2014):</b> Found that algorithms pick winners while pretending to be balanced.</motion.div>
        <motion.div className="card note-card" {...rise(0.3)}><b>Noble (2018):</b> Showed that algorithms often make existing unfairness even worse.</motion.div>
        <motion.div className="card note-card" {...rise(0.4)}><b>Bucher (2012):</b> Found that the fear of being "invisible" online causes creators a lot of anxiety.</motion.div>
      </div>

      <motion.div className="card gap-card" {...pop(0.5)}>
        <span className="bold-label highlight-blue">THE GAP</span>
        <p>Other researchers know algorithms cause anxiety, but nobody is looking at the very first steps of a new creator's journey.</p>
      </motion.div>
    </div>,

    // Floor 5
    <div key="5" className="slide-content">
      <motion.span className="pill pink-pill" {...pop(0)}>The Study</motion.span>
      <motion.h2 className="section-title" {...rise(0.1)}>How I'm Doing It</motion.h2>

      <div className="card-grid">
        <motion.div className="card" {...rise(0.2)}>
          <h3 className="highlight-pink">Method</h3>
          <p>A quick survey to see the general pressure, followed by 10-minute interviews to hear their real emotional stories.</p>
        </motion.div>
        <motion.div className="card" {...rise(0.3)}>
          <h3 className="highlight-pink">Rationale</h3>
          <p>Interviews let me hear the "why" behind the numbers. I can see exactly where someone felt forced to change because of a drop in likes.</p>
        </motion.div>
      </div>
    </div>,

    // Floor 6
    <div key="6" className="slide-content">
      <motion.span className="pill orange-pill" {...pop(0)}>The Hurdles</motion.span>
      <motion.h2 className="section-title" {...rise(0.1)}>What Could Go Wrong</motion.h2>

      <div className="split-layout">
        <motion.div className="card" {...rise(0.2)}>
          <h3 className="highlight-orange">Safety</h3>
          <p>Everyone stays anonymous. They can quit any time, and I'm not saving any real names or private profiles.</p>
        </motion.div>
        <motion.div className="card" {...rise(0.3)}>
          <h3 className="highlight-orange">Problems</h3>
          <p>It's hard to find small creators because the algorithm hides them! Also, people might be shy to admit they "acted fake" for views.</p>
        </motion.div>
      </div>
    </div>,

    // Floor 7
    <div key="7" className="slide-content">
      <motion.span className="pill teal-pill" {...pop(0)}>Moving Forward</motion.span>
      <motion.h2 className="section-title" {...rise(0.1)}>Why This Matters</motion.h2>

      <motion.div className="card" {...rise(0.2)}>
        <h3 className="highlight-teal">The Value</h3>
        <p>This explains why social media feels like a cycle of people copying each other. Understanding this pressure helps us fix how talk to each other online.</p>
      </motion.div>
      
      <motion.div className="card mt-4" {...rise(0.3)}>
        <h3 className="highlight-teal">Next Steps</h3>
        <p>Finish reading expert books, get permission from school, and start finding my first creators to interview on forums/Reddit.</p>
      </motion.div>
    </div>
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@400;500;700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow: hidden; height: 100%; width: 100%; background: ${BG}; color: #fff; font-family: 'Outfit', sans-serif; }

        .elevator-viewport {
          position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
          background: #000; overflow: hidden;
        }

        /* Elaborate Elevator Frame */
        .elevator-frame {
          position: relative; width: 100%; max-width: 1400px; height: 100%; max-height: 900px;
          border-radius: 4px; background: #0c0d10;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.9);
          display: flex; flex-direction: column; overflow: hidden;
        }

        /* Top Indicator Panel */
        .elevator-header {
          height: 80px; background: linear-gradient(to bottom, #111, #1a1b22);
          display: flex; align-items: center; justify-content: center; gap: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 50; position: relative;
        }

        .floor-numbers { display: flex; gap: 8px; }
        .floor-num {
          font-family: 'Space Grotesk', monospace; font-size: 24px; font-weight: 700;
          color: #333; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          border-radius: 5px; background: #080808; border: none;
          transition: all 0.3s;
        }
        .floor-num.active {
          color: #ff3366; background: #1a050d;
          box-shadow: 0 0 15px rgba(255, 51, 102, 0.4); text-shadow: 0 0 10px #ff3366;
        }

        /* The Doors */
        .doors-container {
          position: absolute; top: 80px; left: 0; right: 0; bottom: 0;
          display: flex; z-index: 40; pointer-events: none;
        }
        .door {
          flex: 1; height: 100%; background: linear-gradient(90deg, #1b1c22, #262832);
          position: relative;
          box-shadow: inset 0 0 80px rgba(0,0,0,0.9);
          transition: transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
        }
        .door-left { transform: translateX(-100%); transform-origin: left; }
        .door-right { transform: translateX(100%); transform-origin: right; }

        .doors-container.closed .door-left { transform: translateX(0); }
        .doors-container.closed .door-right { transform: translateX(0); }

        /* The Interior / Content Area */
        .elevator-interior {
          flex: 1; position: relative; overflow: hidden;
          background: radial-gradient(circle at center, #1c1f28 0%, #0c0d10 100%);
          display: flex; padding: 40px 60px;
        }

        .slide-content {
          width: 100%; max-width: 1000px; margin: 0 auto;
          display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
          height: 100%; overflow-y: auto; padding-right: 20px;
        }
        .slide-content::-webkit-scrollbar { width: 6px; }
        .slide-content::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

        /* Typography & Components */
        .display-title { font-size: 56px; font-weight: 900; line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px; }
        .gradient-text {
          background: linear-gradient(135deg, #fff, #aab2cc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .sub-title { font-size: 22px; font-weight: 500; color: #8892b0; margin-bottom: 32px; letter-spacing: 0.05em; }
        .section-title { font-size: 42px; font-weight: 800; margin-bottom: 32px; color: #f5f5f5; text-align: center; }

        .pill {
          display: inline-block; font-family: 'Space Grotesk', monospace; font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 2px; padding: 8px 20px; border-radius: 100px;
          margin-bottom: 24px; align-self: center; border: none;
        }
        .blue-pill { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .orange-pill { background: rgba(251, 146, 60, 0.15); color: #fb923c; }
        .green-pill { background: rgba(52, 211, 153, 0.15); color: #34d399; }
        .purple-pill { background: rgba(192, 132, 252, 0.15); color: #c084fc; }
        .pink-pill { background: rgba(244, 114, 182, 0.15); color: #f472b6; }
        .teal-pill { background: rgba(45, 212, 191, 0.15); color: #2dd4bf; }

        .card {
          background: rgba(255, 255, 255, 0.04); border: none;
          border-radius: 16px; padding: 32px; backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .card h3 { font-size: 24px; font-weight: 700; margin-bottom: 12px; }
        .card p { font-size: 20px; line-height: 1.6; color: rgba(255, 255, 255, 0.9); font-weight: 500; }

        .red-card { background: rgba(244, 63, 94, 0.05); }
        .gap-card { background: rgba(56, 189, 248, 0.08); margin-top: 24px; }

        .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; width: 100%; justify-items: center; }
        .split-layout { display: flex; gap: 24px; width: 100%; justify-content: center; }
        .split-layout .card { flex: 1; }

        .hero-quote-box {
          font-family: 'Space Grotesk', serif; font-size: 28px; font-weight: 600; line-height: 1.4;
          color: #e4e4e7; padding: 32px 48px;
          background: rgba(52, 211, 153, 0.1); border-radius: 16px;
          margin-bottom: 24px; text-align: center;
        }

        .highlight-green { color: #34d399; }
        .highlight-purple { color: #c084fc; }
        .highlight-blue { color: #38bdf8; }
        .highlight-pink { color: #f472b6; }
        .highlight-orange { color: #fb923c; }
        .highlight-teal { color: #2dd4bf; }
        .bold-label { font-weight: 800; font-size: 20px; display: block; margin-bottom: 8px; font-family: 'Space Grotesk'; text-transform: uppercase; letter-spacing: 1px;}
        .small-card { padding: 24px; width: 100%; }

        .note-stack { display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%; }
        .note-card { padding: 20px 24px; font-size: 18px; color: #e4e4e7; width: 100%; }
        .note-card b { color: #fff; margin-right: 8px; font-size: 20px; }

        .mt-4 { margin-top: 24px; }

      `}</style>
      
      <div className="elevator-viewport">
        <div className="elevator-frame">
          
          {/* Top Indicator Panel */}
          <div className="elevator-header">
            <div className="floor-numbers">
              {Array.from({ length: TOTAL_FLOORS }).map((_, i) => (
                <div key={i} className={`floor-num ${indicatorFloor === i ? 'active' : ''}`}>
                  {i === 0 ? 'L' : i}
                </div>
              ))}
            </div>
          </div>

          {/* Elevator Doors overlay */}
          <div className={`doors-container ${doorsClosed ? 'closed' : ''}`}>
            <div className="door door-left" />
            <div className="door door-right" />
          </div>

          {/* Interior Floor Content */}
          <div className="elevator-interior">
            <AnimatePresence mode="wait">
              {/* Force re-render of frame on floor change, but hide it if in transit */}
              <motion.div key={floor} 
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: transit ? 50 : 0, opacity: transit ? 0 : 1 }} 
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%', display: 'flex' }}
              >
                {slides[floor]}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </>
  );
}
