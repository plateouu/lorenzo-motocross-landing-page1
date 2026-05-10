import Link from "next/link"

const TOC = [
  { href: "/prep-portfolio/inquiry", label: "The Inquiry" },
  { href: "/prep-portfolio/literature", label: "Literature & Context" },
  { href: "/prep-portfolio/methodology", label: "Methodology" },
  { href: "/prep-portfolio/findings", label: "Findings" },
  { href: "/prep-portfolio/reflection", label: "Reflection" },
  { href: "/prep-portfolio/process", label: "Research Process (I–X)" },
  { href: "/prep-portfolio/artifacts", label: "Artifacts" },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        The Invisible Gatekeepers
      </h1>
      <p className="text-lg md:text-xl text-gray-700">
        How Social Media Algorithms Shape Creative Identity Among Small
        Independent Visual Artists
      </p>

      <div className="border-l-4 border-gray-400 pl-5 py-3">
        <h2 className="text-base font-bold mb-2">Abstract</h2>
        <p className="text-sm leading-relaxed">
          This paper investigates the impact of recommendation systems on the
          creative identity of small independent visual artists. While existing
          literature reveals that recommendation systems have the power to act
          as gatekeepers of cultural content, to create uncertainty among
          platform workers, and to require certain skills from those who create
          content, there has been less attention paid to how small visual
          artists discuss such systems as a problem related to their art and
          creative identity. Through qualitative discourse analysis of six
          texts published by small visual artists and three texts published by
          social media platforms between 2020 and 2025, this study investigates
          the experiences of small artists who interact with social media
          recommendation systems. These texts range from artist essays and
          articles discussing art to official explanations of the ranking
          systems of platforms like Instagram, TikTok, and YouTube. The results
          of this analysis reveal that the small artists that were studied did
          not discuss the recommendation systems of social media platforms as
          only a topic related to the distribution of their art. Instead, their
          discussions of recommendation systems indicated that they often
          experienced such systems as invisible gatekeepers to audiences, which
          created instability in their relationship with their audiences and
          their responsibilities to create content that was small artists could
          publish and view. Furthermore, their discussions of their experiences
          with recommendation systems indicates that their concept of artistic
          creativity is, at the very least, defensive in relation to the
          invisibility of their art that is enabled through recommendation
          systems. These findings contribute to the existing literature on both
          the impacts of recommendation systems on creators and small visual
          artists, suggesting that efforts should be made towards treating
          audience building as an aspect of artistic development rather than as
          a private responsibility of the artists themselves.
        </p>
      </div>

      <div>
        <h2 className="text-base font-bold mb-3">Table of Contents</h2>
        <ol className="list-decimal pl-6 space-y-1 text-sm">
          {TOC.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="underline hover:text-gray-600">
                {label}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-sm text-gray-600">
        Taylor Daan · AP Research · Dr. Kenny · 2026
      </p>
    </div>
  )
}
