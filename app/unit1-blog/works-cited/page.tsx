"use client";

import TransitionLink from "../components/TransitionLink";

const citations = [
  'Adichie, Chimamanda Ngozi. "The Danger of a Single Story." TED, July 2009, www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story.',
  'Lyiscott, Jamila. "3 Ways to Speak English." TED, Feb. 2014, www.ted.com/talks/jamila_lyiscott_3_ways_to_speak_english.',
];

export default function WorksCited() {
  return (
    <div className="min-h-screen bg-[#f3efe0] text-[#131211] flex flex-col pt-32 pb-24 px-6 md:px-12 selection:bg-[#ff3b30] selection:text-[#f3efe0] relative overflow-hidden">
      
      {/* Decorative Stark Circles */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full border-[8px] border-[#131211]/10 pointer-events-none opacity-20" />

      <div className="max-w-[800px] mx-auto w-full mt-10 md:mt-16 relative z-10">
        <div className="bg-[#131211] text-[#f3efe0] w-max px-6 py-2 rounded-full border-[3px] border-[#131211] flex items-center justify-center font-black uppercase tracking-widest text-sm mb-12 shadow-[6px_6px_0px_#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>
          Works Cited
        </div>

        <h1 
          className="text-[#131211] text-5xl md:text-[5.5rem] leading-[1.05] tracking-tighter font-black mb-20"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          The <span className="inline-block bg-[#ff3b30] text-[#f3efe0] px-5 pt-1 pb-3 rounded-full border-[4px] border-[#131211] shadow-[6px_6px_0px_#131211] rotate-[-1deg] mx-2">architecture</span> behind the ideas.
        </h1>

        <div className="space-y-8 text-[#131211] text-xl leading-[1.6] font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
          {citations.map((cite, i) => (
            <div key={i} className="bg-[#f3efe0] p-8 md:p-10 rounded-[40px] shadow-[8px_8px_0px_#ff3b30] border-[4px] border-[#131211] transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_#131211] cursor-default bg-white">
              <p>
                {cite}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
           <TransitionLink 
            href="/unit1-blog"
            className="inline-flex items-center justify-center bg-[#ff3b30] text-[#f3efe0] px-14 py-6 rounded-full text-2xl font-black tracking-widest uppercase transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_#131211] active:translate-y-0 active:shadow-none w-max border-[4px] border-[#131211] shadow-[8px_8px_0px_#131211]"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            Return Home
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
