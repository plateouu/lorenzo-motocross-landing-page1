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
            When I first began writing the blog post titled “Pennies of Power,” I struggled with the idea of how to translate the academic concepts of language and identity into a digital space. My initial blog posts had a more formal tone, as I approached the blog as if it were an essay. The concept of act of literacy, as defined by <a href="https://www.goodreads.com/book/show/9060416-everything-s-a-text" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Dan Melzer and Kevin Coxwell-Teague</a>, is not simply the written word, but also the visual components of a composition. Therefore, I needed to alter the way that I approached my blog post to fit this new concept of act of literacy.
          </p>
          
          <p>
            One of the main changes that I made to my blog post was in the visual design of my blog. Melzer and Coxwell-Teague argue that acts of literacy incorporate both text and visual components. Thus, I altered the visual design of my blog post to command the attention of readers. The visual elements of my blog reflect the heavy nature of the concepts that I am discussing in my blog post. Therefore, the medium in which I published my blog post became a part of my message.
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
            Through this process, I learned about the concept of situated literacies. I had previously considered literacy and academic writing as separate concepts from digital publishing. Yet, by weaving my personal reflections with the concepts and authors discussed in my blog post, I learned that both my audience of peers and instructors, as well as my own voice as an author, must be considered in the composition of my blog post.
          </p>

          <p>
            Through this blog post, I have learned that acts of literacy can be intentional in their design. By analyzing the situated nature of my blog post and its required audience, I was able to find a balance between discussing the everyday experiences of high school students and the structural aspects of society’s understanding of those students. Therefore, through this blog post, I have found a way to express myself as an author in a way that is intentional and with purpose.
          </p>
        </div>
      </div>
    </div>
  );
}
