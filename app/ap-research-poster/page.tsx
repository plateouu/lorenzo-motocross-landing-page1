"use client";

import React from "react";

/**
 * AP Research Poster - Final High Contrast Review
 * - Extra legible, high contrast fonts.
 * - Single-screen view (no scroll).
 * - Humanized text only.
 */
export default function HumanizedPosterPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { 
          height: 100vh; width: 100vw; 
          background-color: #f0f2f5; 
          color: #1a202c; 
          font-family: 'Inter', sans-serif; 
          overflow: hidden; 
        }

        .poster-root {
          width: 100vw;
          height: 100vh;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* --- HEADER SECTION --- */
        .poster-header {
          text-align: center;
          padding: 16px;
          background-color: #ffffff;
          border: 2px solid #2d3748;
          border-radius: 8px;
        }

        .header-title {
          font-size: 34px;
          font-weight: 800;
          color: #1a202c;
          margin-bottom: 4px;
        }

        .header-author {
          font-size: 18px;
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
          gap: 16px;
          min-height: 0;
        }

        /* --- POSTER CARD --- */
        .poster-card {
          background-color: #ffffff; 
          border: 2px solid #2d3748;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          min-height: 0;
          box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        }

        .card-title {
          font-size: 17px;
          font-weight: 800;
          color: #2b6cb0;
          text-transform: uppercase;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 2px solid #e2e8f0;
        }

        .card-content {
          font-size: 14px;
          line-height: 1.5;
          color: #1a202c; /* High contrast black/grey */
          overflow-y: auto;
          font-weight: 500;
        }

        .card-content p {
          margin-bottom: 10px;
        }

        .highlight-box {
          background-color: #ebf8ff;
          border-left: 4px solid #3182ce;
          padding: 8px 12px;
          margin: 8px 0;
        }

        /* Span rules for layout balance */
        .problem-block { grid-column: span 2; }
        .question-block { grid-column: span 2; background-color: #fffaf0; border-color: #dd6b20; }
        .question-block .card-title { color: #dd6b20; border-bottom-color: #feebc8; }
        .sig-block { grid-column: span 2; }
        .methods-block { grid-row: span 2; }
        .assume-block { grid-column: span 2; }

        /* Scrollbar styling for cards */
        .card-content::-webkit-scrollbar { width: 6px; }
        .card-content::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 10px; }

        @media screen and (max-height: 800px) {
          .header-title { font-size: 26px; }
          .card-title { font-size: 15px; }
          .card-content { font-size: 13px; }
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
              <p style={{ fontSize: "17px", fontWeight: "700", color: "#2d3748" }}>"How does algorithmic gatekeeping on platforms like TikTok and Instagram impact the psychological well-being of small content creators?"</p>
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
            <div className="card-content">
              <p><strong>Assumption:</strong> The algorithms on social media platforms are designed to only feature content that is similar to the viral content of that platform at the time. Furthermore, as a new creator to a social media platform, assuming that a creator has no following yet, the platform will hide that user’s social media content.</p>
              <p><strong>Hypothesis:</strong> The creators will suffer significant psychological stress due to the algorithm’s influence over them, forcing them to change their authentic content to gain likes and followers.</p>
            </div>
          </div>

          {/* Significance */}
          <div className="poster-card sig-block">
            <h2 className="card-title">Significance / Value</h2>
            <div className="card-content">
              <p>Understanding the psychological impact of social media algorithms on creators will allow researchers to understand the root of the psychological crises of online communities.</p>
              <p>Furthermore, it will allow researchers to investigate the root of significant social media phenomena such as engagement-farming, echo chambers, and the mental health of online communities overall.</p>
            </div>
          </div>

          {/* Method of Inquiry */}
          <div className="poster-card methods-block">
            <h2 className="card-title">Method of Inquiry</h2>
            <div className="card-content">
              <p>Investigate the described research question through <strong>anonymous surveys</strong> with content creators that utilize TikTok and Instagram.</p>
              <p>Followed by <strong>qualitative interviews</strong> with those same participants to examine their experiences with the social media algorithm.</p>
            </div>
          </div>

          {/* Rationale */}
          <div className="poster-card">
            <h2 className="card-title">Rationale for Method</h2>
            <div className="card-content">
              <p>Qualitative interviews provide a deep understanding of the experiences and the “identity” of the creators being surveyed.</p>
              <p>Thematic coding maps the mental experiences of the creators to their interactions with social media algorithms.</p>
            </div>
          </div>

          {/* Situatedness */}
          <div className="poster-card">
            <h2 className="card-title">Situatedness (The Gap)</h2>
            <div className="card-content">
              <p>Existing literature (Gillespie, Bucher) recognizes the impact of those platforms on users in general, but there has been a lack of investigation into the impact on brand-new creators trying to establish a foothold.</p>
            </div>
          </div>

          {/* Data Sources - Lit Review */}
          <div className="poster-card">
            <h2 className="card-title">Data Sources (Lit Review)</h2>
            <div className="card-content">
              <p>Peer-reviewed journals in sociology and media studies (e.g., Gillespie 2014, Noble 2018, Bucher 2012) regarding algorithmic objectivity, bias, and the impact of digital invisibility.</p>
            </div>
          </div>

          {/* Data Sources - Evidence */}
          <div className="poster-card">
            <h2 className="card-title">Data Sources (Evidence)</h2>
            <div className="card-content">
              <p>Data collected from anonymous survey responses and transcribed qualitative interviews with creators recruited from independent content creator forums.</p>
            </div>
          </div>

          {/* Ethical Considerations */}
          <div className="poster-card">
            <h2 className="card-title">Ethical Considerations</h2>
            <div className="card-content">
              <p>Voluntary participation with informed consent from all participants. No personally identifiable information will be collected from these creators.</p>
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
              <p>Creators may also be hesitant to reveal in interviews that they change their authentic content to gain social media likes and followers.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
