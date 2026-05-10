import Link from "next/link"

const SECTIONS = [
  {
    id: "I",
    title: "I. Preparing for a Topic of Interest",
    docs: [
      { href: "/prep-portfolio/topic-brainstorming-1.pdf", label: "Topic Brainstorming 1" },
      { href: "/prep-portfolio/topic-brainstorming-2.pdf", label: "Topic Brainstorming 2" },
      { href: "/prep-portfolio/topic-exploration.pdf", label: "Topic Exploration" },
    ],
  },
  {
    id: "II",
    title: "II. Brainstorming & Research Question",
    docs: [
      { href: "/prep-portfolio/research-inquiry-proposal.pdf", label: "Research Inquiry Proposal" },
      { href: "/apseminar2026-proposal", label: "Topic Proposal (Web)", internal: true },
    ],
  },
  {
    id: "III",
    title: "III. Research & Literature Review",
    docs: [
      { href: "/prep-portfolio/lit-review-organizer.pdf", label: "Literature Review Organizer" },
      { href: "/prep-portfolio/academic-paper-sample.pdf", label: "Academic Paper Sample Review" },
      { href: "/prep-portfolio/examine-methods.pdf", label: "Examining Methods" },
    ],
  },
  {
    id: "IV",
    title: "IV. Drafting",
    docs: [
      { href: "/prep-portfolio/method-section-draft.pdf", label: "Method Section Draft" },
      { href: "/prep-portfolio/analytical-memo.pdf", label: "Analytical Memo" },
    ],
  },
  {
    id: "V",
    title: "V. Data Collection & Analysis",
    docs: [
      { href: "/prep-portfolio/data-collection-instruments.pdf", label: "Data Collection Instruments" },
      {
        href: "https://docs.google.com/forms/d/e/1FAIpQLScD0kRszx546DFoVekXco7dF0AsvoKnJqALGmMPEl4gCmL7Wg/viewform",
        label: "Survey (Google Form)",
        external: true,
      },
    ],
  },
  {
    id: "VI",
    title: "VI. Peer Editing & In-Class Activities",
    docs: [
      { href: "/prep-portfolio/lit-review-peer-editing.pdf", label: "Literature Review Peer Editing" },
      { href: "/prep-portfolio/methods-peer-editing.pdf", label: "Methods Peer Editing" },
      { href: "/prep-portfolio/academic-paper-peer-editing.pdf", label: "Academic Paper Peer Editing" },
      { href: "/prep-portfolio/pod-critique.pdf", label: "POD Critique" },
    ],
  },
  {
    id: "VII",
    title: "VII. Presentation Preparation",
    docs: [
      { href: "/ap-research-poster", label: "Research Pitch / Poster (Web)", internal: true },
      { href: "/prep-portfolio/oral-defense-practice.pdf", label: "Oral Defense Practice" },
      { href: "/prep-portfolio/pod-prep.pdf", label: "POD Preparation" },
      { href: "/prep-portfolio/paper-pod-checklist.pdf", label: "Academic Paper & POD Checklist" },
      { href: "/ap-research-presentation", label: "Final Presentation (Web)", internal: true },
    ],
  },
  {
    id: "VIII",
    title: "VIII. Researcher Journal",
    docs: [
      { href: "/prep-portfolio/researcher-journal.pdf", label: "Researcher Journal" },
    ],
  },
  {
    id: "IX",
    title: "IX. Reflection",
    description: undefined,
    docs: [
      { href: "/prep-portfolio/reflection", label: "Final Reflection (Web)", internal: true },
    ],
  },
  {
    id: "X",
    title: "X. Final Paper & Artifacts",
    docs: [
      { href: "/AP_Research_FINAL.pdf", label: "Final Academic Paper (PDF)" },
      { href: "/ap-research-presentation", label: "18-Slide Presentation (Web)", internal: true },
    ],
  },
]

export default function ProcessPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl md:text-4xl font-bold border-b-4 border-black pb-3">
        Research Process
      </h1>

      <p className="text-base leading-relaxed">
        The documents below trace the full research process from initial topic
        exploration through the final presentation. They are organized by the
        QUEST framework categories (I–X).
      </p>

      {SECTIONS.map((section) => (
        <div key={section.id} className="border border-black">
          <h2 className="text-base font-bold bg-black text-white px-4 py-2">
            {section.title}
          </h2>
          <div className="p-4 space-y-2">
            {section.description && (
              <p className="text-sm text-gray-600 mb-2">{section.description}</p>
            )}
            {section.docs.map((doc) =>
              doc.internal ? (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="block text-sm underline hover:text-gray-600 py-1"
                >
                  {doc.label}
                </Link>
              ) : (
                <a
                  key={doc.href}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm underline hover:text-gray-600 py-1"
                >
                  {doc.label}
                </a>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
