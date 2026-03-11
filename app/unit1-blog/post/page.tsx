"use client";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-[#f3efe0] text-[#131211] flex flex-col pt-32 pb-24 px-6 md:px-12 selection:bg-[#ff3b30] selection:text-[#f3efe0] relative overflow-hidden">
      
      {/* Decorative Stark Circles */}
      <div className="absolute top-[5%] right-[-5%] w-[300px] h-[300px] rounded-full border-[8px] border-[#131211]/10 pointer-events-none" />

      <div className="max-w-[800px] mx-auto w-full mt-10 md:mt-16 relative z-10">
        <div className="bg-[#131211] text-[#f3efe0] w-max px-6 py-2 rounded-full border-[3px] border-[#131211] flex items-center justify-center font-black uppercase tracking-widest text-sm mb-12 shadow-[6px_6px_0px_#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>
          The Reading
        </div>

        <h1 
          className="text-[#131211] text-5xl md:text-[5.5rem] leading-[1.05] tracking-tighter font-black mb-20"
          style={{ fontFamily: 'var(--font-space)' }}
        >
          Pennies of Power: How the smallest words carry the heaviest weight.
        </h1>

        <div className="space-y-12 text-[#131211] text-xl md:text-2xl leading-[1.7] font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
          <p className="first-letter:text-[4.5rem] md:first-letter:text-[5.5rem] first-letter:font-black first-letter:text-[#f3efe0] first-letter:bg-[#ff3b30] first-letter:px-5 first-letter:pt-2 first-letter:pb-3 first-letter:mr-6 first-letter:float-left first-letter:leading-none first-letter:shadow-[8px_8px_0px_#131211] first-letter:rounded-full first-letter:border-[4px] first-letter:border-[#131211]">
            We often ignore the architecture built by passing comments. A label attached to someone during a casual conversation seems to carry no weight at all. Yet, the joke regarding someone being <em className="not-italic inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#131211] font-black -rotate-1 mx-1">&quot;the smart one&quot;</em> or <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black rotate-1 mx-1">&quot;the quiet one&quot;</em> becomes engrained over time. We internalize these types of labels and mold our behavior accordingly.
          </p>

          <p>
            This process creates the entire social landscape of high school. One descriptor from a peer or teacher creates a psychological boundary for that student. It is as if the student is handed a tiny word that operates as a penny of power. Time passes in which the labeled student begins to anticipate the expectations of that casual word. They begin to mold themselves into the role constructed for them by the language of their peers.
          </p>
          
          <p>
            Our identity is constructed in the ordinary. It is in the text sent to someone at midnight that gets left on their read screen. It is in the passing comments made in the hallway by those who care nothing for the consequences. By the time we realize that we are constructing our identity in these spaces, the cement has already dried.
          </p>

          <blockquote className="my-24 p-10 md:p-16 bg-[#ff3b30] text-[#f3efe0] shadow-[12px_12px_0px_#131211] rounded-[60px] rounded-br-[10px] border-[6px] border-[#131211] relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#131211] text-[#f3efe0] rounded-full border-[4px] border-[#131211] shadow-[6px_6px_0px_#f3efe0] flex items-center justify-center font-serif text-5xl pt-4">"</div>
            <p className="text-3xl md:text-5xl font-black leading-[1.2] tracking-tighter" style={{ fontFamily: 'var(--font-space)' }}>
              The single story creates stereotypes. The problem with stereotypes is that they are incomplete.
            </p>
            <cite className="inline-block mt-12 text-sm uppercase tracking-widest font-black not-italic bg-[#f3efe0] text-[#131211] px-8 py-4 rounded-full shadow-[6px_6px_0px_#131211] border-[4px] border-[#131211] rotate-2" style={{ fontFamily: 'var(--font-space)' }}>
              Chimamanda Ngozi Adichie
            </cite>
          </blockquote>

          <p>
            When <a href="https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Chimamanda Ngozi Adichie</a> described the “danger of a single story” in her famed TED Talk, the academic world largely dismissed it as a commentary on colonialism and cultural erasure. Yet, Adichie’s discussion of the power of language and how it can construct a social reality for individuals is applicable to almost any scale. Reputations are constructed in the high school hallway. One casual comment regarding someone’s abilities as a freshman can last four years as that student is labeled <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black -rotate-2 mx-1">&quot;the clumsy one.&quot;</em> Someone who asks too many questions can be <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black rotate-2 mx-1">&quot;the try-hard one.&quot;</em> 
          </p>

          <p>
            Labels constructed via language flatten a human being into a flat JPEG. The language used to label someone is the tool used to write that script regarding that individual’s place in society.
          </p>

          <p>
            Language is the skeleton key that allowed me to navigate the differing dynamics of my daily life. <a href="https://www.ted.com/talks/jamila_lyiscott_3_ways_to_speak_english" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Jamila Lyiscott</a>’s spoken-word poem describes the different ways she speaks in different contexts. She claims that her syntax changes based on the location in which she is speaking. She is <em className="text-[#131211] not-italic font-bold decoration-wavy underline decoration-[#ff3b30] underline-offset-4 decoration-[3px]">&quot;tri-lingual.&quot;</em> She masterfully navigates her different identities within her life.
          </p>

          <p>
            I feel the same way regarding my own language. I may use different languages with different individuals in my life. I text my best friend with abbreviated text and inside jokes. Yet, I may write more formal emails to teachers regarding schoolwork. Society may judge one type of language over the other. Yet, it is still mine to use however I wish.
          </p>

          <p>
            Yet, when I choose how to speak to others, I communicate a thought and perform an act of literacy. My literacy shapes the existing dynamic of power in society. My words intertwine with my identity. They look like pennies. Drop enough of them into the jar of society’s expectations, and eventually, you’ve bought a reality.
          </p>
        </div>
      </div>
    </div>
  );
}
