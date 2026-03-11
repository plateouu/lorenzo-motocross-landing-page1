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
          The <span className="inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-[40px] border-[4px] border-[#131211] shadow-[6px_6px_0px_#131211] rotate-[2deg] mx-1">Act</span> of Design.
        </h1>

        <div className="space-y-12 text-[#131211] text-xl md:text-2xl leading-[1.7] font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
          <p className="first-letter:text-[4.5rem] md:first-letter:text-[5.5rem] first-letter:font-black first-letter:text-[#f3efe0] first-letter:bg-[#131211] first-letter:px-5 first-letter:pt-2 first-letter:pb-3 first-letter:mr-6 first-letter:float-left first-letter:leading-none first-letter:shadow-[8px_8px_0px_#ff3b30] first-letter:rounded-full first-letter:border-[4px] first-letter:border-[#131211]">
            When I first began writing “Pennies of Power,” I struggled with the idea of taking the concepts that I learned in my unit on language and identity and placing them into the digital space. My initial drafts of the blog had a tone that was quite stiff and formal, much like a traditional essay. However, by thinking about the concept of acts of literacy as defined by <a href="https://www.goodreads.com/book/show/9060416-everything-s-a-text" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Melzer and Coxwell-Teague</a>, I realized that literacy is not just limited to the written word. I needed to rethink my approach to my blog accordingly.
          </p>
          
          <p>
            One of the first things that I thought about was the visual design of my blog. Melzer and Coxwell-Teague argue that acts of literacy often incorporate both textual and visual components. Therefore, I thought about the visual design of my blog with the same importance as the text itself. I chose a Neo-Brutalist design for my blog, as it commands the attention of the reader. Additionally, the aggressive design with its bordered styling visually mirrors the heavy nature of the concepts that I discuss within my blog.
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
            Through this blog, I have gained an understanding of the reality of situated literacies. I used to think of academic writing and publishing digital content as separate endeavors. However, by placing my personal experiences into my blog and by discussing the ideas of Adichie and Lyiscott, I have found myself constantly considering the balance that I must strike between my voice and my audience (my peers and instructors).
          </p>

          <p>
            Through the process of writing this blog, I have realized that writing in any format is an act of design. By analyzing my blog, its situated nature, and my audience, I have found a balance between discussing my experiences in high school and the concepts of language and identity that can be applied to those experiences. I have even gained a better understanding of my own voice as a writer.
          </p>
        </div>
      </div>
    </div>
  );
}
