"use client";

import React from "react";

/**
 * AP Research Poster Redesign
 * - Clean, professional academic style.
 * - No animations.
 * - Fits within a single screen (no scroll goal).
 * - Humanized text provided by the user.
 */
export default function HumanizedPosterPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { 
          height: 100vh; width: 100vw; 
          background-color: #fcfcfc; color: #1a202c; 
          font-family: 'Inter', sans-serif; 
          overflow: hidden; /* No scroll goal */
        }

        .poster-root {
          width: 100vw;
          height: 100vh;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* --- HEADER SECTION --- */
        .poster-header {
          text-align: center;
          padding-bottom: 8px;
          border-bottom: 3px solid #3182ce;
        }

        .header-title {
          font-family: 'Lora', serif;
          font-size: 32px;
          font-weight: 700;
          color: #2c5282;
          margin-bottom: 4px;
        }

        .header-author {
          font-size: 16px;
          font-weight: 600;
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
          gap: 12px;
          min-height: 0; /* Important for flex child to not overflow */
        }

        /* --- POSTER CARD --- */
        .poster-card {
          background-color: #ffffff; 
          border: 1px solid #e2e8f0;
          padding: 14px;
          display: flex;
          flex-direction: column;
          min-height: 0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .card-title {
          font-family: 'Lora', serif;
          font-size: 16px;
          font-weight: 700;
          color: #2b6cb0;
          border-bottom: 1.5px solid #bee3f8;
          margin-bottom: 8px;
          padding-bottom: 4px;
        }

        .card-content {
          font-size: 13.5px;
          line-height: 1.45;
          color: #2d3748;
          overflow-y: auto; /* Allow overflow inside cards if needed */
          padding-right: 4px;
        }

        .card-content p {
          margin-bottom: 8px;
        }

        /* Span rules to create an interesting balanced layout */
        .span-2-row { grid-row: span 2; }
        .span-2-col { grid-column: span 2; }

        /* Specific block placements */
        .problem-block { grid-column: span 2; grid-row: span 1; }
        .question-block { grid-column: span 2; }
        
        .methods-block { grid-row: span 2; }
        .rationale-block { grid-column: span 1; }
        .data-lit-block { grid-column: span 1; }
        
        .significance-block { grid-column: span 2; }

        /* Scrollbar styling for cards */
        .card-content::-webkit-scrollbar { width: 4px; }
        .card-content::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 10px; }

        @media screen and (max-height: 700px) {
          .header-title { font-size: 24px; }
          .card-content { font-size: 12px; }
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
          
          {/* COLUMN 1 */}

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
              <p style={{ fontStyle: "italic", fontSize: "16px", fontWeight: "600" }}>"How does algorithmic gatekeeping on platforms like TikTok and Instagram impact the psychological well-being of small content creators?"</p>
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
          <div className="poster-card span-2-col">
            <h2 className="card-title">Assumptions & Hypotheses</h2>
            <div className="card-content">
              <p><strong>Assumption:</strong> The algorithms on social media platforms are designed to only feature content that is similar to the viral content of that platform at the time. Furthermore, as a new creator to a social media platform, assuming that a creator has no following yet, the platform will hide that user’s social media content.</p>
              <p><strong>Hypothesis:</strong> It is hypothesized that the creators will suffer significant psychological stress due to the algorithm’s influence over them, forcing them to change their authentic content to gain likes and followers.</p>
            </div>
          </div>

          {/* Significance */}
          <div className="poster-card significance-block">
            <h2 className="card-title">Significance / Value</h2>
            <div className="card-content">
              <p>Understanding the psychological impact of social media algorithms on creators will allow researchers to understand the root of the psychological crises of online communities.</p>
              <p>Furthermore, it will allow researchers to investigate the root of significant social media phenomena such as engagement-farming behavior, the formation of echo chambers online, and the mental health of online communities overall.</p>
            </div>
          </div>

          {/* Method of Inquiry */}
          <div className="poster-card methods-block">
            <h2 className="card-title">Method of Inquiry</h2>
            <div className="card-content">
              <p>The method that will be used to investigate the research question is through the performance of <strong>anonymous surveys</strong> with content creators that utilize platforms like TikTok and Instagram, followed by <strong>qualitative interviews</strong> with those same participants to examine their experiences with the social media algorithm.</p>
            </div>
          </div>

          {/* Rationale */}
          <div className="poster-card rationale-block">
            <h2 className="card-title">Rationale for Method</h2>
            <div className="card-content">
              <p>Using qualitative interviews will allow researchers to gain an understanding of the experiences and the “identity” of the creators being surveyed.</p>
              <p>Furthermore, using thematic coding will allow researchers to map the psychological experiences of the creators to their experiences with social media algorithms.</p>
            </div>
          </div>

          {/* Situatedness */}
          <div className="poster-card">
            <h2 className="card-title">Situatedness (The Gap)</h2>
            <div className="card-content">
              <p>While existing literature on social media algorithms recognizes the psychological impact of those platforms on users in general (Gillespie, Bucher), there has been a lack of investigation into the psychological impact on new creators of platforms on social media.</p>
            </div>
          </div>

          {/* Data Sources - Lit Review */}
          <div className="poster-card">
            <h2 className="card-title">Data Sources (Lit Review)</h2>
            <div className="card-content">
              <p>Research articles published in peer-reviewed journals in the fields of sociology and media studies, such as Gillespie (2014), Noble (2018), and Bucher (2012) regarding algorithmic objectivity, bias, and the psychological impact of becoming invisible online.</p>
            </div>
          </div>

          {/* Data Sources - Evidence */}
          <div className="poster-card">
            <h2 className="card-title">Data Sources (Evidence)</h2>
            <div className="card-content">
              <p>Data collected from anonymous survey responses and transcribed qualitative interviews with content creators recruited from independent online content creator discussion forums.</p>
            </div>
          </div>

          {/* Ethical Considerations */}
          <div className="poster-card">
            <h2 className="card-title">Ethical Considerations</h2>
            <div className="card-content">
              <p>Voluntary participation with informed consent will be required from all participants to ensure their rights are preserved and respected. Additionally, no personally identifiable information will be collected from these creators.</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="poster-card">
            <h2 className="card-title">Next Steps</h2>
            <div className="card-content">
              <p>Completing the literature review, obtaining approval to distribute the survey and conduct interviews, and beginning recruitment of participants for the study.</p>
            </div>
          </div>

          {/* What am I Missing? */}
          <div className="poster-card">
            <h2 className="card-title">What am I Missing?</h2>
            <div className="card-content">
              <p>Are there other social media platforms besides Instagram and TikTok that may have differently-designed algorithmic features that could be the subject of this study?</p>
            </div>
          </div>

          {/* Potential Issues */}
          <div className="poster-card">
            <h2 className="card-title">Potential Issues</h2>
            <div className="card-content">
              <p>The social media algorithm hides small creators, making it challenging to recruit participants for the study.</p>
              <p>Additionally, creators may be hesitant to reveal in interviews that they change their authentic content to gain social media likes and followers.</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
