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
            We often ignore the architecture built by passing comments. A label attached to someone during a casual conversation seems to carry no weight at all. Yet, a joke about someone being <em className="not-italic inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#131211] font-black -rotate-1 mx-1">&quot;the smart one&quot;</em> or <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black rotate-1 mx-1">&quot;the quiet one&quot;</em> becomes ingrained into the individual over time. We internalize these types of labels and mold our behavior accordingly. If a student is labeled as the smart one in a room of students, that student may avoid taking risks in their academic endeavors.
          </p>

          <p>
            The process of constructing such labels for students continues to build the social landscape of a high school. A label from a peer has the power to construct a psychological boundary around the student that is labeled. The student that is labeled begins to mold themselves into the role constructed for them by the language of their peers. Our identities are constructed within these ordinary spaces. It happens in the passing comments in the hallway that nobody questions.
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
            <a href="https://www.ted.com/talks/chimamanda_ngozi_adichie_the_danger_of_a_single_story" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Adichie</a> discusses the danger of a single story in her TED Talk. She states that these types of restrictive narratives rob people of their dignity and make people focus upon the differences that they have from others as opposed to the similarities (Adichie). Although Adichie was discussing the dangers of single storyhood in relation to cultural differences, the same concepts are visible within the social landscape of a high school. The reputation of an individual can be constructed through a single casual comment about a freshman student, labeling them for four years as <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black -rotate-2 mx-1">&quot;the clumsy one.&quot;</em> That label can rob them of their dignity as the rest of the world does not see them as the smart, gifted student that they are.
          </p>

          <p>
            However, language is also a tool that can be used to dismantle the constructs of others. We are not to be permanently labeled by the words of others. <a href="https://www.ted.com/talks/jamila_lyiscott_3_ways_to_speak_english" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-wavy decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Jamila Lyiscott</a> discusses in her TED Talk how she proudly claims to be <em className="text-[#131211] not-italic font-bold decoration-wavy underline decoration-[#ff3b30] underline-offset-4 decoration-[3px]">&quot;tri-lingual,&quot;</em> switching between multiple identities depending on the environment she is in (Lyiscott). She does not hide who she is, but instead uses her language and literacy to assert control over her story, countering the society that expects her to speak in a certain way.
          </p>

          <p>
            I have experienced these types of labels myself. For example, I may send highly abbreviated texts to my best friend, but I may write formal emails to teachers regarding schoolwork. Society may view my texting as careless and my emails as professional. Yet, Jamila Lyiscott's discussion of different types of literacy show that each form of communication has its purpose, and I have the right to use my words in whatever way I choose.
          </p>

          <p>
            Every time we choose how to speak to others, whether in text or in person, we are performing an act of literacy. These acts of literacy can either reinforce the existing power structures in society, or they can work to dismantle those structures. Our words and our identities are often intertwined, like pennies. We spend our words every day with others, and the way in which we spend them determines the reality of our lives. Our words shape those of others, and those of others shape who is treated with dignity and who is casually reduced by others.
          </p>
        </div>
      </div>
    </div>
  );
}
