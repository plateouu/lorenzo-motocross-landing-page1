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
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        /* --- GLOBAL RESET --- */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        *::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }

        html, body { 
          min-height: 100vh;
          background: radial-gradient(circle at top right, #f8fafc, #e2e8f0);
          color: #1a202c; 
          font-family: 'Outfit', sans-serif; 
          overflow-x: hidden;
          line-height: 1.5;
        }

        .poster-root {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(24px, 5vw, 60px);
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vh, 32px);
          min-height: 100vh;
        }

        /* --- HEADER SECTION --- */
        .poster-header {
          text-align: center;
          padding: clamp(24px, 4vh, 48px);
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
        }

        .header-title {
          font-size: clamp(24px, 5vw, 48px);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .header-author {
          font-size: clamp(14px, 2vh, 18px);
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* --- THE GRID --- */
        .poster-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: auto;
          gap: 20px;
          padding-bottom: 40px;
        }

        /* Responsive Grid: Switch to 2 columns on tablets, 1 on mobile */
        @media (max-width: 1100px) {
          .poster-grid { grid-template-columns: repeat(2, 1fr); }
          .problem-block, .question-block, .sig-block, .assume-block { grid-column: span 2 !important; }
        }
        @media (max-width: 640px) {
          .poster-grid { grid-template-columns: 1fr; }
          .problem-block, .question-block, .sig-block, .assume-block, .methods-block { grid-column: span 1 !important; }
        }

        /* --- POSTER CARD --- */
        .poster-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          height: 100%;
        }

        .poster-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .card-title {
          font-size: 13px;
          font-weight: 800;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-title::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .card-content {
          font-size: 15px;
          line-height: 1.6;
          color: #334155;
          font-weight: 450;
        }

        .card-content p {
          margin-bottom: 12px;
        }

        .card-content strong {
          color: #0f172a;
          font-weight: 700;
        }

        /* Layout spans */
        .problem-block { grid-column: span 2; background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%); }
        .question-block { grid-column: span 2; background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); border-color: #fcd34d; }
        .question-block .card-title { color: #d97706; }
        .question-block .card-title::after { background: #fde68a; }
        .sig-block { grid-column: span 2; }
        .methods-block { grid-row: span 2; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #86efac; }
        .methods-block .card-title { color: #16a34a; }
        .methods-block .card-title::after { background: #bbf7d0; }
        .assume-block { grid-column: span 2; }

        /* Typography tweaks for readability */
        .header-title, .card-title, .card-content { -webkit-font-smoothing: antialiased; }
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
