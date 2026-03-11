"use client";

export default function Reflection() {
  return (
    <div className="min-h-screen bg-[#f3efe0] text-[#131211] flex flex-col pt-32 pb-24 px-6 md:px-12 selection:bg-[#ff3b30] selection:text-[#f3efe0] relative overflow-hidden">
      
      {/* Decorative Stark Circles */}
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full border-[8px] border-[#131211]/5 pointer-events-none" />

      <div className="max-w-[800px] mx-auto w-full mt-10 md:mt-16 relative z-10">
        <div className="bg-[#131211] text-[#f3efe0] w-max px-6 py-2 rounded-full border-[3px] border-[#131211] flex items-center justify-center font-black uppercase tracking-widest text-sm mb-12 shadow-[6px_6px_0px_#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>
          Unit 1 Reflection
        </div>

        <h1 
          className="text-[#131211] text-5xl md:text-[5.5rem] leading-[1.05] tracking-tighter font-black mb-20"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Analyzing the <span className="inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-[40px] border-[4px] border-[#131211] shadow-[6px_6px_0px_#131211] rotate-[2deg] mx-1">Acts</span> of Literacy.
        </h1>

        <div className="space-y-12 text-[#131211] text-xl md:text-2xl leading-[1.7] font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
          <p className="first-letter:text-[4.5rem] md:first-letter:text-[5.5rem] first-letter:font-black first-letter:text-[#f3efe0] first-letter:bg-[#131211] first-letter:px-5 first-letter:pt-2 first-letter:pb-3 first-letter:mr-6 first-letter:float-left first-letter:leading-none first-letter:shadow-[8px_8px_0px_#ff3b30] first-letter:rounded-full first-letter:border-[4px] first-letter:border-[#131211]">
            When I first started thinking about the blog post, I struggled with how to best translate all of this into the digital world. My initial thoughts on the blog were overly formal, as if it were an essay. Yet, the act of literacy requires a different approach. Literacy is situated within contexts. Therefore, I had to adjust my mind and my composing process to fit the digital medium.
          </p>
          
          <p>
            One specific learning moment occurred when I decided to change the visual design of the blog. <a href="https://www.goodreads.com/book/show/9060416-everything-s-a-text" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Dan Melzer and Kevin Coxwell-Teague</a> discussed the idea that composing involves more than just the text that is written. Therefore, I had to think about the visual components of my blog and how they would reflect the content that I was publishing. I had to perform an act of visual literacy to command the attention of my audience. The visual design of the blog would reflect the heavy nature of the discussion regarding power dynamics.
          </p>
          
          <blockquote className="my-24 p-10 md:p-16 bg-[#131211] text-[#f3efe0] shadow-[12px_12px_0px_#ff3b30] rounded-[60px] rounded-tl-[10px] border-[6px] border-[#131211] relative">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#ff3b30] text-[#f3efe0] rounded-full border-[4px] border-[#131211] shadow-[6px_6px_0px_#131211] flex items-center justify-center font-serif text-5xl pt-4">"</div>
            <p className="text-3xl md:text-5xl font-black leading-[1.2] tracking-tighter" style={{ fontFamily: 'var(--font-space)' }}>
              Literacy is reading a text and understanding how that text operates within a specific social situation.
            </p>
            <cite className="inline-block mt-12 text-sm uppercase tracking-widest font-black not-italic bg-[#f3efe0] text-[#131211] px-8 py-4 rounded-full shadow-[6px_6px_0px_#ff3b30] border-[4px] border-[#131211] -rotate-2" style={{ fontFamily: 'var(--font-space)' }}>
              Inspired by Melzer & Coxwell-Teague
            </cite>
          </blockquote>

          <p>
            This learning was significantly helpful in adjusting my mind to the idea that academic writing and digital expression are not separate activities. Instead, they are both forms of literacy that must be considered in their contexts. Therefore, I had to analyze my work in terms of its situated nature. I had to find a way to discuss both the everyday nature of high school life and the structural nature of societal stereotyping.
          </p>

          <p>
            Through this process of adjustment, I found a way to balance these elements in my blog post. Therefore, I was able to prove my point regarding the nature of literacy and the dynamic relationship between the reader and the text.
          </p>
        </div>
      </div>
    </div>
  );
}
