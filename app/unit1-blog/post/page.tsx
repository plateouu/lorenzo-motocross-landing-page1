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
            We often ignore the architecture built by passing comments. A label attached to someone during a casual conversation seems to carry no weight at all. Yet, a joke about someone being <em className="not-italic inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#131211] font-black -rotate-1 mx-1">&quot;the smart one&quot;</em> or <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black rotate-1 mx-1">&quot;the quiet one&quot;</em> becomes engrained over time. We internalize these types of labels and mold our behavior accordingly. If a student is repeatedly labeled the smart one, they might stop taking intellectual risks; failing would threaten the only stable identity the room allows them to hold.
          </p>

          <p>
            This process of constructing labels for students continues to build the social landscape of high school. The descriptor of one student from another or a teacher can create a psychological boundary for that student. The student that is labeled begins to mold themselves into the role constructed for them by the language of their peers. Our identities are constructed in these ordinary spaces. It happens in the passing hallway comments that nobody questions, setting invisible rules for the rest of the students.
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
            <a href="https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Adichie</a> discusses the danger of a single story in her blog post. She states that these types of restrictive narratives rob people of their dignity and make people focus on how they are different from others rather than how they are similar to others (Adichie). While Adichie talks about how this is applied to the academic world, her discussion about language and how it constructs social realities is applicable to the high school hallway. Reputations can be constructed through a single casual comment about a freshman, labeling them for four years as <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black -rotate-2 mx-1">&quot;the clumsy one.&quot;</em> That label can rob them of their dignity as the world does not see them as the multifaceted student that they are.
          </p>

          <p>
            However, language is also a tool that can be used to dismantle the restrictive social constructs that are built against individuals. We are not to be permanently labeled by the words of others. <a href="https://www.ted.com/talks/jamila_lyiscott_3_ways_to_speak_english" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Jamila Lyiscott</a> discusses in her blog post how she proudly claims to be <em className="text-[#131211] not-italic font-bold decoration-wavy underline decoration-[#ff3b30] underline-offset-4 decoration-[3px]">&quot;tri-lingual,&quot;</em> seamlessly switching between multiple identities depending on the location of her phone case (Lyiscott). She does not hide who she is by altering her speech, but instead uses her language to assert control over her story, countering the society that expects her to speak in a single way.
          </p>

          <p>
            I have experienced these types of labels and constructed identities myself. I may send highly abbreviated texts to my best friend, but I may write formal, highly structured emails to teachers regarding schoolwork. Society may see my texting as careless and my emails as professional. Yet, Jamila Lyiscott’s discussion of different types of literacy shows that both are valid forms of communication. Each has a purpose, and I have the right to use my words however I wish.
          </p>

          <p>
            Every time we choose how to speak to others, we are communicating a thought and performing an act of literacy. These literacies can either reinforce the existing power structures in society, or they can work to dismantle them. Our words and identities become intertwined, like pennies. We spend them every day, and eventually, the way we spend them determines the reality that we are to live in. It dictates who is to be judged as dignified versus carelessly spoken of.
          </p>

          <p>
            Every time we choose how to speak to others, we are communicating a thought and performing an act of literacy. Our literacies have the power to either reinforce the existing dynamic of power in society, or to work towards dismantling it. Our words intertwine with the rest of our identity, like pennies. Drop enough of them into the jar of society’s expectations, and eventually, we have bought into the reality that others construct for us.
          </p>
        </div>
      </div>
    </div>
  );
}
