"use client";

import TransitionLink from "./components/TransitionLink";

export default function Unit1BlogHome() {
  return (
    <div className="min-h-screen bg-[#f3efe0] text-[#131211] flex flex-col pt-32 pb-16 px-6 md:px-12 selection:bg-[#ff3b30] selection:text-[#f3efe0] relative overflow-hidden">
      
      {/* Decorative stark geometric circles */}
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full border-[8px] border-[#131211]/10 pointer-events-none" />
      <div className="absolute top-[25%] right-[25%] w-[100px] h-[100px] rounded-full bg-[#ff3b30] border-[4px] border-[#131211] shadow-[8px_8px_0px_#131211] rotate-12 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full flex flex-col justify-center flex-1 py-10 relative z-10">
        <div className="bg-[#f3efe0] text-[#131211] w-max px-6 py-2 rounded-full border-[3px] border-[#131211] flex items-center justify-center font-black uppercase tracking-widest text-sm mb-12 shadow-[5px_5px_0px_#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>
          Unit 1 Literacies
        </div>

        <h1 
          className="text-[#131211] text-[4rem] md:text-[6.5rem] lg:text-[8rem] leading-[1.05] tracking-tighter font-black mb-12"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Overthinking<br />
          <span className="inline-flex items-center justify-center bg-[#ff3b30] text-[#f3efe0] px-8 pt-1 pb-4 mx-2 rounded-[50px] border-[4px] border-[#131211] shadow-[10px_10px_0px_#131211] rotate-[-2deg] align-middle transform -translate-y-2 relative overflow-visible">
            Out
          </span>
          <br />Loud.
        </h1>
        
          <p 
            className="text-[#131211] text-xl md:text-3xl max-w-2xl leading-[1.6] font-medium mb-16"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            A blog exploring how the little things we say every day shape who we are, and the unwritten rules behind the words we use.
          </p>

        <TransitionLink 
          href="/unit1-blog/post"
          className="inline-flex items-center justify-center bg-[#ff3b30] text-[#f3efe0] px-14 py-6 rounded-full text-2xl font-black tracking-widest uppercase transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_#131211] active:translate-y-0 active:shadow-none w-max border-[4px] border-[#131211] shadow-[8px_8px_0px_#131211]"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Read the Essay
        </TransitionLink>
      </div>

    </div>
  );
}
