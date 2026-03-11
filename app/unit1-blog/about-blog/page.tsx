"use client";

import TransitionLink from "../components/TransitionLink";

export default function AboutBlog() {
  return (
    <div className="min-h-screen bg-[#f3efe0] text-[#131211] flex flex-col pt-32 pb-24 px-6 md:px-12 selection:bg-[#ff3b30] selection:text-[#f3efe0] relative overflow-hidden">
      
      {/* Decorative Stark Circles */}
      <div className="absolute top-[10%] left-[5%] w-[250px] h-[250px] rounded-full border-[8px] border-[#131211]/10 pointer-events-none" />

      <div className="max-w-[800px] mx-auto w-full mt-10 md:mt-16 relative z-10">
        <div className="bg-[#131211] text-[#f3efe0] w-max px-6 py-2 rounded-full border-[3px] border-[#131211] flex items-center justify-center font-black uppercase tracking-widest text-sm mb-12 shadow-[6px_6px_0px_#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>
          The Purpose
        </div>

        <h1 
          className="text-[#131211] text-5xl md:text-[5.5rem] leading-[1.05] tracking-tighter font-black mb-16"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Dedicated to <span className="inline-block bg-[#ff3b30] text-[#f3efe0] px-5 pt-1 pb-3 mx-1 rounded-[40px] border-[4px] border-[#131211] shadow-[6px_6px_0px_#131211] rotate-[-2deg]">slowing down</span> and paying attention.
        </h1>

        <div className="space-y-12 text-[#f3efe0] text-xl md:text-2xl leading-[1.7] font-medium p-10 md:p-14 border-[6px] border-[#131211] bg-[#131211] shadow-[12px_12px_0px_#ff3b30] rounded-[60px] rounded-tr-[10px]" style={{ fontFamily: 'var(--font-outfit)' }}>
          <p>
            This blog was started as a question: what if the most important things in life are the ones that we pass by?
          </p>
          <p>
            This blog, built around the ideas discussed in Unit 1, is dedicated to slowing down and paying attention to the interactions that construct our identities. We look closely at the interactions that define us. We dissect the story that others tell about us.
          </p>
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
