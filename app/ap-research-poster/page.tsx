"use client";

import React from "react";

/**
 * AP Research Poster - Simplified Direct Content Version
 * - Very simple, high contrast, no scroll.
 * - 8th grade level readability for presentation.
 * - Covering core areas from the Stage 4 requirements.
 */
export default function HumanizedPosterPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* --- GLOBAL RESET & HIDE SCROLLBARS --- */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        *::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }

        html, body { 
          height: 100vh; 
          width: 100vw; 
          background-color: #f0f2f5; 
          color: #1a202c; 
          font-family: 'Inter', sans-serif; 
          overflow: hidden; 
        }

        .poster-root {
          width: 100vw;
          height: 100vh;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* --- HEADER SECTION --- */
        .poster-header {
          text-align: center;
          padding: 8px;
          background-color: #ffffff;
          border: 2px solid #2d3748;
          border-radius: 8px;
        }

        .header-title {
          font-size: 24px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 2px;
        }

        .header-author {
          font-size: 14px;
          font-weight: 700;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* --- THE GRID --- */
        .poster-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 10px;
          min-height: 0;
        }

        /* --- POSTER CARD --- */
        .poster-card {
          background-color: #ffffff; 
          border: 2px solid #2d3748;
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          min-height: 0;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .card-title {
          font-size: 13px;
          font-weight: 800;
          color: #2b6cb0;
          text-transform: uppercase;
          margin-bottom: 6px;
          padding-bottom: 4px;
          border-bottom: 2px solid #e2e8f0;
          flex-shrink: 0;
        }

        .card-content {
          font-size: 12px;
          line-height: 1.35;
          color: #000; 
          font-weight: 500;
          overflow: hidden;
        }

        .card-content p {
          margin-bottom: 4px;
        }

        /* Layout spans */
        .problem-block { grid-column: span 2; }
        .question-block { grid-column: span 2; background-color: #fffaf0; border-color: #dd6b20; }
        .question-block .card-title { color: #dd6b20; border-bottom-color: #feebc8; }
        .sig-block { grid-column: span 2; }
        .methods-block { grid-row: span 2; }
        .assume-block { grid-column: span 2; }

        @media screen and (max-height: 800px) {
          .header-title { font-size: 22px; }
          .card-title { font-size: 11px; }
          .card-content { font-size: 11px; }
        }
      `}</style>

      <div className="poster-root">
        {/* HEADER */}
        <header className="poster-header">
          <h1 className="header-title">How Social Media Algorithms Affect the Psychology of Small Creators</h1>
          <p className="header-author">AP Research • Taylor Daan</p>
        </header>

        {/* POSTER GRID */}
        <div className="poster-grid">
          
          {/* Problem Statement */}
          <div className="poster-card problem-block">
            <h2 className="card-title">The Problem</h2>
            <div className="card-content">
              <p>Social media apps use algorithms to pick what shows up on your feed. For new creators, if you don't follow the latest trend, nobody sees your work. Because of this, creators feel forced to change their style and content just to get views. This leads to massive stress and makes people stop being authentic.</p>
            </div>
          </div>

          {/* Research Question */}
          <div className="poster-card question-block">
            <h2 className="card-title">Research Question</h2>
            <div className="card-content">
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#2d3748" }}>"How does the pressure to get views on TikTok and Instagram change how new creators feel and what they choose to post?"</p>
            </div>
          </div>

          {/* Definitions */}
          <div className="poster-card">
            <h2 className="card-title">Concepts</h2>
            <div className="card-content">
              <p><strong>Algorithm:</strong> The hidden code that picks which videos go viral and which ones stay invisible.</p>
              <p><strong>Small Creators:</strong> Regular people trying to grow an audience on apps like TikTok and Instagram.</p>
            </div>
          </div>

          {/* Assumptions/Hypotheses */}
          <div className="poster-card assume-block">
            <h2 className="card-title">Predictions</h2>
            <div className="card-content">
              <p><strong>The Theory:</strong> I assume the algorithm only likes content that matches what's already viral. If you're new, the platform basically hides you. Because of this, I think creators get stressed and feel like they have to "act fake" to gain followers.</p>
            </div>
          </div>

          {/* Significance */}
          <div className="poster-card sig-block">
            <h2 className="card-title">Value of Study</h2>
            <div className="card-content">
              <p>If we understand this pressure, we can see why everyone online copies each other and why social media can be bad for your head. It helps us understand why online communities feel toxic or fake sometimes.</p>
            </div>
          </div>

          {/* Method of Inquiry */}
          <div className="poster-card methods-block">
            <h2 className="card-title">The Method</h2>
            <div className="card-content">
              <p>First, I'll use an <strong>anonymous survey</strong> to see how many people feel this pressure. Next, I'll do <strong>10-minute interviews</strong> to hear exactly how the algorithm made them feel.</p>
              <p>I'll look for "emotional themes" in their stories to prove the connection.</p>
            </div>
          </div>

          {/* Rationale */}
          <div className="poster-card">
            <h2 className="card-title">Rationale</h2>
            <div className="card-content">
              <p>Interviews give me the "why" behind the numbers. I can hear the exact moments people felt stressed out by their view counts dropping.</p>
            </div>
          </div>

          {/* Situatedness */}
          <div className="poster-card">
            <h2 className="card-title">The Gap</h2>
            <div className="card-content">
              <p>Experts know algorithms cause anxiety, but nobody is really looking at how it feels when you're just starting your account.</p>
            </div>
          </div>

          {/* Data Sources - Lit Review */}
          <div className="poster-card">
            <h2 className="card-title">Expert Sources</h2>
            <div className="card-content">
              <p>I'm reading studies by experts like Gillespie (2014) and Bucher (2012) about how apps hide certain people and how that affects their brains.</p>
            </div>
          </div>

          {/* Data Sources - Evidence */}
          <div className="poster-card">
            <h2 className="card-title">Own Evidence</h2>
            <div className="card-content">
              <p>I will use my own surveys and interviews from people found on TikTok subreddits and creator forums.</p>
            </div>
          </div>

          {/* Ethical Considerations */}
          <div className="poster-card">
            <h2 className="card-title">Safety & Rights</h2>
            <div className="card-content">
              <p>Everyone stays anonymous. Participants can skip any question or stop at any time. I won't save any real names.</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="poster-card">
            <h2 className="card-title">Next Steps</h2>
            <div className="card-content">
              <p>Finish my expert reading, get school permission to start, and find my first 10 creators to interview.</p>
            </div>
          </div>

          {/* What am I Missing? */}
          <div className="poster-card">
            <h2 className="card-title">What's Missing?</h2>
            <div className="card-content">
              <p>Do platforms like Patreon or Substack work differently because they don't have the same "viral feed" algorithms?</p>
            </div>
          </div>

          {/* Potential Issues */}
          <div className="poster-card">
            <h2 className="card-title">Possible Problems</h2>
            <div className="card-content">
              <p>It's hard to find new creators because the algorithm hides them! Also, people might be embarrassed to say they "acted fake" for views.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
