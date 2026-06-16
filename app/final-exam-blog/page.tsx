"use client";

import Link from 'next/link';

export default function FinalExamBlogPost() {
  return (
    <div className="min-h-screen bg-[#f3efe0] text-[#131211] flex flex-col pt-32 pb-24 px-6 md:px-12 selection:bg-[#ff3b30] selection:text-[#f3efe0] relative overflow-hidden">
      
      {/* Decorative Stark Circles */}
      <div className="absolute top-[5%] right-[-5%] w-[300px] h-[300px] rounded-full border-[8px] border-[#131211]/10 pointer-events-none" />

      <div className="max-w-[800px] mx-auto w-full mt-10 md:mt-16 relative z-10">
        <div className="bg-[#131211] text-[#f3efe0] w-max px-6 py-2 rounded-full border-[3px] border-[#131211] flex items-center justify-center font-black uppercase tracking-widest text-sm mb-12 shadow-[6px_6px_0px_#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>
          Final Exam Blog Post
        </div>

        <h1 
          className="text-[#131211] text-5xl md:text-[5.5rem] leading-[1.05] tracking-tighter font-black mb-10"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Virtual Islands, Real Revolutions
        </h1>

        <h2 
          className="text-[#ff3b30] text-2xl md:text-3xl leading-[1.2] tracking-tight font-black mb-20"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          How Animal Crossing Became a Protest Space for Hong Kong
        </h2>

        <div className="space-y-12 text-[#131211] text-xl md:text-2xl leading-[1.7] font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
          <p className="first-letter:text-[4.5rem] md:first-letter:text-[5.5rem] first-letter:font-black first-letter:text-[#f3efe0] first-letter:bg-[#ff3b30] first-letter:px-5 first-letter:pt-2 first-letter:pb-3 first-letter:mr-6 first-letter:float-left first-letter:leading-none first-letter:shadow-[8px_8px_0px_#131211] first-letter:rounded-full first-letter:border-[4px] first-letter:border-[#131211]">
            In 2019, Hong Kong was ablaze with pro-democracy protests. What started as pushback against an extradition bill to mainland China evolved into a massive movement, with up to <em className="not-italic inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#131211] font-black -rotate-1 mx-1">2 million people</em> marching in the streets. But as 2020 rolled in, the Chinese government cracked down hard. On March 20, 2020, Hong Kong banned gatherings of more than four people.
          </p>

          <p>
            Shortly after, the National Security Law made the popular slogan "Liberate Hong Kong, revolution of our times" a jailable offense. The streets were silenced. The people were exhausted. They needed a new way to resist.
          </p>

          <blockquote className="my-24 p-10 md:p-16 bg-[#ff3b30] text-[#f3efe0] shadow-[12px_12px_0px_#131211] rounded-[60px] rounded-br-[10px] border-[6px] border-[#131211] relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#131211] text-[#f3efe0] rounded-full border-[4px] border-[#131211] shadow-[6px_6px_0px_#f3efe0] flex items-center justify-center font-serif text-5xl pt-4">"</div>
            <p className="text-3xl md:text-5xl font-black leading-[1.2] tracking-tighter" style={{ fontFamily: 'var(--font-space)' }}>
              On the exact same day Hong Kong banned public gatherings, Nintendo released Animal Crossing: New Horizons.
            </p>
          </blockquote>

          <h3 className="text-3xl font-black mb-6" style={{ fontFamily: 'var(--font-space)' }}>Protesting in Paradise</h3>

          <p>
            It didn’t take long for activists to realize this peaceful island simulator was the perfect loophole. On April 1, 2020, prominent democracy activist Joshua Wong posted a screenshot of his character standing next to a yellow banner that read <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black rotate-1 mx-1">&quot;Free Hong Kong, Revolution Now.&quot;</em> Almost overnight, players began designing black protest outfits, recreating the iconic yellow umbrellas, and sharing their virtual protests online.
          </p>

          <h3 className="text-3xl font-black mb-6 mt-16" style={{ fontFamily: 'var(--font-space)' }}>The Power of Cultural Resistance</h3>

          <p>
            Why does a video game protest matter? It comes down to cultural resistance. As author <strong className="font-black decoration-wavy underline decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Stephen Duncombe</strong> explains, culture can be used as a tool for resistance because political change must first be <em>imagined</em> before it can become reality. 
          </p>

          <p>
            Historically, we've seen this with punk rock music, graffiti art, and underground zines. As researchers Elliot Doornbos and Jordan Cashmore point out, these movements bypass traditional political channels. When activists use games like Animal Crossing, Minecraft, or Roblox, they aren't just preaching to the choir. They reach gamers and younger audiences who might otherwise ignore traditional political news, expanding the movement's footprint into entirely new demographics.
          </p>

          <h3 className="text-3xl font-black mb-6 mt-16" style={{ fontFamily: 'var(--font-space)' }}>Did It Actually Work?</h3>

          <p>
            It’s easy to dismiss online activism as "slacktivism." Did building virtual islands change China's policy? No. The National Security Law remained, and activists like Joshua Wong were still arrested. But if we look closer, the protests succeeded in three massive ways:
          </p>

          <ul className="list-disc pl-8 space-y-4">
            <li><strong>They beat the censorship:</strong> During the COVID-19 lockdowns, these digital protests kept the Hong Kong movement visible on an international scale.</li>
            <li><strong>They hijacked the media cycle:</strong> Screenshots from a Nintendo game jumped from Reddit to gaming sites like IGN, and eventually to major news networks like CNN and The BBC.</li>
            <li><strong>They provoked a real response:</strong> The Chinese government took the threat so seriously that within three weeks of its release, Animal Crossing was wiped from China's gray market platforms. When a global superpower bans a game about talking animals, you know the activism struck a nerve.</li>
          </ul>

          <h3 className="text-3xl font-black mb-6 mt-16" style={{ fontFamily: 'var(--font-space)' }}>What's Next for Digital Activism?</h3>

          <p>
            Moving forward, we need a fundamental shift in how we view video games. They are no longer just toys; they are uncensored digital town halls. As oppressive regimes develop better ways to monitor the physical world, human rights organizations and tech companies must consider how to protect these digital spaces from future government interference.
          </p>

          <div className="bg-[#131211] text-[#f3efe0] p-10 rounded-[40px] mt-16 shadow-[10px_10px_0px_#ff3b30] border-[4px] border-[#131211]">
            <h4 className="text-2xl font-black mb-4 text-[#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>What do you think?</h4>
            <p className="text-lg">Can video games be a legitimate platform for political change, or are they just a temporary nuisance to authoritarian governments? Let me know your thoughts in the comments!</p>
            <div className="mt-8">
              <Link href="https://docs.google.com/document/d/1A9KSK7-zCfmNEhQOcwXi29_J_g9RFU13715DOXNoljE/edit?usp=classroom_web&authuser=2" target="_blank" className="inline-block bg-[#f3efe0] text-[#131211] font-black px-6 py-3 rounded-full border-[3px] border-[#f3efe0] hover:bg-[#ff3b30] hover:text-[#f3efe0] hover:border-[#131211] transition-all uppercase tracking-wider text-sm shadow-[4px_4px_0px_#131211]">
                Read My Full Argument Essay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
