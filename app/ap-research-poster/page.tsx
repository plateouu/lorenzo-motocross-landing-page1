"use client";

import React from "react";

/**
 * AP Research Poster - Final Single Screen No Scroll Version
 * - Force fits everything to exact 100vh.
 * - Hides all scrollbars globally.
 * - Humanized text only.
 */
export default function HumanizedPosterPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* --- GLOBAL RESET & HIDE SCROLLBARS --- */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        *::-webkit-scrollbar { display: none; } /* Hide for all elements in layout */
        * { -ms-overflow-style: none; scrollbar-width: none; }

        html, body { 
          height: 100vh; 
          width: 100vw; 
          background-color: #f0f2f5; 
          color: #1a202c; 
          font-family: 'Inter', sans-serif; 
          overflow: hidden; /* No browser scroll */
        }

        .poster-root {
          width: 100vw;
          height: 100vh;
          padding: 16px; /* Slightly tighter padding */
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* --- HEADER SECTION --- */
        .poster-header {
          text-align: center;
          padding: 12px;
          background-color: #ffffff;
          border: 2px solid #2d3748;
          border-radius: 8px;
        }

        .header-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 2px;
        }

        .header-author {
          font-size: 15px;
          font-weight: 700;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* --- THE GRID --- */
        .poster-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 1fr);
          gap: 12px;
          min-height: 0;
        }

        /* --- POSTER CARD --- */
        .poster-card {
          background-color: #ffffff; 
          border: 2px solid #2d3748;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          min-height: 0;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
          overflow: hidden; /* Force content to stay in card */
        }

        .card-title {
          font-size: 15px;
          font-weight: 800;
          color: #2b6cb0;
          text-transform: uppercase;
          margin-bottom: 8px;
          padding-bottom: 4px;
          border-bottom: 2px solid #e2e8f0;
          flex-shrink: 0;
        }

        .card-content {
          font-size: 13px; /* Slightly smaller to fit without scroll */
          line-height: 1.4;
          color: #1a202c; 
          overflow: hidden; /* No internal scroll wheel */
          font-weight: 500;
        }

        .card-content p {
          margin-bottom: 6px;
        }

        /* Span rules for layout balance */
        .problem-block { grid-column: span 2; }
        .question-block { grid-column: span 2; background-color: #fffaf0; border-color: #dd6b20; }
        .question-block .card-title { color: #dd6b20; border-bottom-color: #feebc8; }
        .sig-block { grid-column: span 2; }
        .methods-block { grid-row: span 2; }
        .assume-block { grid-column: span 2; }

        /* Responsive scale-down if screen is really small */
        @media screen and (max-height: 900px) {
          .header-title { font-size: 24px; }
          .card-title { font-size: 14px; }
          .card-content { font-size: 12px; }
        }
        @media screen and (max-height: 700px) {
          .header-title { font-size: 20px; }
          .card-title { font-size: 12px; padding-bottom: 2px; margin-bottom: 4px; }
          .card-content { font-size: 11px; line-height: 1.25; }
          .poster-root { padding: 10px; gap: 8px; }
          .poster-grid { gap: 8px; }
        }
      `}</style>

      <div className="poster-root">
        {/* HEADER */}
        <header className="poster-header">
          <h1 className="header-title">How Social Media Algorithms Affect the Psychology of Small Content Creators</h1>
          <p className="header-author">AP Research • Taylor Daan</p>
        </header>

        {/* POSTER GRID */}
        <div className="poster-grid">
          
          {/* Problem Statement */}
          <div className="poster-card problem-block">
            <h2 className="card-title">Problem Statement</h2>
            <div className="card-content">
              <p>Social media algorithms determine the visibility of content. Small creators are under significant psychological pressure to abandon their original ideas in pursuit of virality.</p>
              <p>Instead of encouraging original content, social media platforms force creators to change who they are creatively to fit the algorithm.</p>
            </div>
          </div>

          {/* Research Question */}
          <div className="poster-card question-block">
            <h2 className="card-title">Research Question</h2>
            <div className="card-content">
              <p style={{ fontSize: "16px", fontWeight: "700", color: "#2d3748" }}>"How does algorithmic gatekeeping on platforms like TikTok and Instagram impact the psychological well-being of small content creators?"</p>
            </div>
          </div>

          {/* Definitions */}
          <div className="poster-card">
            <h2 className="card-title">Definitions</h2>
            <div className="card-content">
              <p><strong>Algorithm:</strong> The underlying mechanisms of social media platforms that work to prioritize content that receives the most engagement from users.</p>
              <p><strong>Small Creators:</strong> Users that create original content on platforms like TikTok and Instagram while attempting to gain an audience.</p>
            </div>
          </div>

          {/* Assumptions/Hypotheses */}
          <div className="poster-card assume-block">
            <h2 className="card-title">Assumptions & Hypotheses</h2>
            <div className="card-content" style={{ fontSize: "12.5px" }}>
              <p><strong>Assumption:</strong> Algorithms on social media platforms are designed to only feature content that is similar to viral content at the time. For new creators without followings, the platform will hide their content.</p>
              <p><strong>Hypothesis:</strong> Creators suffer significant psychological stress due to the algorithm's influence, forcing them to change their authentic content to gain metrics.</p>
            </div>
          </div>

          {/* Significance */}
          <div className="poster-card sig-block">
            <h2 className="card-title">Significance / Value</h2>
            <div className="card-content">
              <p>Understanding the impact of social media algorithms on creators will allow researchers to understand the root of psychological crises in online communities.</p>
              <p>Allows investigation into phenomena such as engagement-farming, echo chambers, and the mental health of online communities overall.</p>
            </div>
          </div>

          {/* Method of Inquiry */}
          <div className="poster-card methods-block">
            <h2 className="card-title">Method of Inquiry</h2>
            <div className="card-content">
              <p>Investigate the described research question through <strong>anonymous surveys</strong> with content creators that utilize TikTok and Instagram.</p>
              <p>Followed by <strong>qualitative interviews</strong> with participants to examine their personal experiences with the social media algorithm.</p>
            </div>
          </div>

          {/* Rationale */}
          <div className="poster-card">
            <h2 className="card-title">Rationale for Method</h2>
            <div className="card-content">
              <p>Qualitative interviews provide a deep understanding of the experiences and the “identity” of the creators being surveyed.</p>
              <p>Thematic coding maps the mental experiences to their interactions with social media algorithms.</p>
            </div>
          </div>

          {/* Situatedness */}
          <div className="poster-card">
            <h2 className="card-title">Situatedness (The Gap)</h2>
            <div className="card-content">
              <p>Existing literature recognizes impact on users in general, but there has been a lack of investigation into brand-new creators trying to establish a foothold.</p>
            </div>
          </div>

          {/* Data Sources - Lit Review */}
          <div className="poster-card">
            <h2 className="card-title">Data Sources (Lit Review)</h2>
            <div className="card-content">
              <p>Peer-reviewed journals in sociology and media studies regarding algorithmic objectivity, bias, and digital invisibility.</p>
            </div>
          </div>

          {/* Data Sources - Evidence */}
          <div className="poster-card">
            <h2 className="card-title">Data Sources (Evidence)</h2>
            <div className="card-content">
              <p>Data from anonymous surveys and transcribed interviews with content creators recruited from independent creator forums.</p>
            </div>
          </div>

          {/* Ethical Considerations */}
          <div className="poster-card">
            <h2 className="card-title">Ethical Considerations</h2>
            <div className="card-content">
              <p>Voluntary participation with informed consent from all participants. No personally identifiable information will be collected.</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="poster-card">
            <h2 className="card-title">Next Steps</h2>
            <div className="card-content">
              <p>Completing the literature review, obtaining approval to distribute the survey, and beginning recruitment of participants.</p>
            </div>
          </div>

          {/* What am I Missing? */}
          <div className="poster-card">
            <h2 className="card-title">What am I Missing?</h2>
            <div className="card-content">
              <p>Are there other platforms besides Instagram and TikTok that have differently-designed algorithmic features that should be considered?</p>
            </div>
          </div>

          {/* Potential Issues */}
          <div className="poster-card">
            <h2 className="card-title">Potential Issues</h2>
            <div className="card-content">
              <p>The algorithm hides small creators, making it challenging to recruit participants.</p>
              <p>Creators may also be hesitant to reveal in interviews that they change their authentic content for metrics.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
