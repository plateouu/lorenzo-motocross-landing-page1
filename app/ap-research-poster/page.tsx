"use client";

import React from "react";

/**
 * AP Research Poster - Responsive & Simplified
 * - High contrast, no scroll (single-screen).
 * - 8th grade readability.
 * - Dynamic font scaling (clamp) based on viewport size.
 */
export default function HumanizedPosterPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* --- GLOBAL RESET --- */
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
          padding: clamp(8px, 2vh, 20px);
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1.5vh, 12px);
        }

        /* --- HEADER SECTION --- */
        .poster-header {
          text-align: center;
          padding: clamp(6px, 1.2vh, 14px);
          background-color: #ffffff;
          border: 2px solid #2d3748;
          border-radius: 8px;
        }

        .header-title {
          font-size: clamp(18px, 3vh, 32px);
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 2px;
        }

        .header-author {
          font-size: clamp(12px, 1.6vh, 16px);
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
          gap: clamp(6px, 1.2vh, 12px);
          min-height: 0;
        }

        /* --- POSTER CARD --- */
        .poster-card {
          background-color: #ffffff; 
          border: 2px solid #2d3748;
          border-radius: 8px;
          padding: clamp(6px, 1.2vh, 14px);
          display: flex;
          flex-direction: column;
          min-height: 0;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .card-title {
          font-size: clamp(11px, 1.4vh, 14px);
          font-weight: 800;
          color: #2b6cb0;
          text-transform: uppercase;
          margin-bottom: clamp(4px, 0.8vh, 8px);
          padding-bottom: clamp(2px, 0.4vh, 4px);
          border-bottom: 2px solid #e2e8f0;
          flex-shrink: 0;
        }

        .card-content {
          font-size: clamp(10px, 1.35vh, 14px);
          line-height: 1.3;
          color: #000; 
          font-weight: 500;
          overflow: hidden;
        }

        .card-content p {
          margin-bottom: clamp(3px, 0.6vh, 6px);
        }

        /* Layout spans */
        .problem-block { grid-column: span 2; }
        .question-block { grid-column: span 2; background-color: #fffaf0; border-color: #dd6b20; }
        .question-block .card-title { color: #dd6b20; border-bottom-color: #feebc8; }
        .sig-block { grid-column: span 2; }
        .methods-block { grid-row: span 2; }
        .assume-block { grid-column: span 2; }

        /* Ensure everything fits on really long text cards */
        .methods-block .card-content { font-size: clamp(10px, 1.3vh, 13px); }
        .assume-block .card-content { font-size: clamp(10px, 1.25vh, 12.5px); }
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
              <p style={{ fontWeight: "700", color: "#2d3748" }}>"How does the pressure to get views on TikTok and Instagram change how new creators feel and what they choose to post?"</p>
            </div>
          </div>

          {/* Definitions */}
          <div className="poster-card">
            <h2 className="card-title">Concepts</h2>
            <div className="card-content">
              <p><strong>Algorithm:</strong> Hidden code that picks which videos go viral and which stay invisible.</p>
              <p><strong>Small Creators:</strong> Regular people trying to grow an audience on apps like TikTok and Instagram.</p>
            </div>
          </div>

          {/* Assumptions/Hypotheses */}
          <div className="poster-card assume-block">
            <h2 className="card-title">Predictions</h2>
            <div className="card-content">
              <p><strong>The Theory:</strong> I assume the algorithm only likes content matching trends. If you're new, the platform hides you. I think this pressure causes stress and forces creators to 'act fake' for followers.</p>
            </div>
          </div>

          {/* Significance */}
          <div className="poster-card sig-block">
            <h2 className="card-title">Value of Study</h2>
            <div className="card-content">
              <p>Understanding this pressure shows why everyone copies each other and why social media can be bad for your mental health. It helps explain toxic online behavior.</p>
            </div>
          </div>

          {/* Method of Inquiry */}
          <div className="poster-card methods-block">
            <h2 className="card-title">The Method</h2>
            <div className="card-content">
              <p>First, I'll use an <strong>anonymous survey</strong> to see the general level of pressure. Next, I'll do <strong>10-minute interviews</strong> to hear real emotional stories.</p>
              <p>I'll look for themes in their stories to prove a connection between view count drops and mental stress.</p>
            </div>
          </div>

          {/* Rationale */}
          <div className="poster-card">
            <h2 className="card-title">Rationale</h2>
            <div className="card-content">
              <p>Interviews give me the "why" behind numbers. I can hear the exact moments people felt stressed out by their view counts dropping.</p>
            </div>
          </div>

          {/* Situatedness */}
          <div className="poster-card">
            <h2 className="card-title">The Gap</h2>
            <div className="card-content">
              <p>Experts know algorithms cause anxiety, but nobody is looking at the first steps of a new account's journey.</p>
            </div>
          </div>

          {/* Data Sources - Lit Review */}
          <div className="poster-card">
            <h2 className="card-title">Expert Sources</h2>
            <div className="card-content">
              <p>Reading experts like Gillespie (2014) and Bucher (2012) about digital invisibility and how apps hide certain people.</p>
            </div>
          </div>

          {/* Data Sources - Evidence */}
          <div className="poster-card">
            <h2 className="card-title">Own Evidence</h2>
            <div className="card-content">
              <p>Using survey results and interview transcripts from creators found on TikTok subreddits and forums.</p>
            </div>
          </div>

          {/* Ethical Considerations */}
          <div className="poster-card">
            <h2 className="card-title">Safety & Rights</h2>
            <div className="card-content">
              <p>Stay anonymous. Participants can skip any question or stop at any time. No real names saved.</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="poster-card">
            <h2 className="card-title">Next Steps</h2>
            <div className="card-content">
              <p>Finish lit review and peer editing, then find my first 10 creators to interview and send surveys to.</p>
            </div>
          </div>

          {/* What am I Missing? */}
          <div className="poster-card">
            <h2 className="card-title">What's Missing?</h2>
            <div className="card-content">
              <p>Do subscription-based apps like Patreon work differently because they don't have viral feeds?</p>
            </div>
          </div>

          {/* Potential Issues */}
          <div className="poster-card">
            <h2 className="card-title">Possible Problems</h2>
            <div className="card-content">
              <p>Hard to find new creators if the algorithm hides them! People might also hide that they copy trends.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
