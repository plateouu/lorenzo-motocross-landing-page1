"use client";

import TransitionLink from '../components/TransitionLink';

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
            Let's be real for a second. In 2019, Hong Kong was wild with protests for increased democracy. What started as a protest against an extradition bill developed into a full-blown movement with up to <em className="not-italic inline-block bg-[#ff3b30] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[5px_5px_0px_#131211] font-black -rotate-1 mx-1">2 million people</em> actively protesting. However, 2020 would bring another development for the region; the Chinese government would clamp down on protests.
          </p>

          <p>
            They banned gatherings of more than four people. Then, shortly after, they would pass the National Security Law, turning the popular protest slogan, "Liberate Hong Kong," into a jailable offense. All of Hong Kong was silenced. People were exhausted from protesting, and someone had to find a new loophole.
          </p>

          <blockquote className="my-24 p-10 md:p-16 bg-[#ff3b30] text-[#f3efe0] shadow-[12px_12px_0px_#131211] rounded-[60px] rounded-br-[10px] border-[6px] border-[#131211] relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#131211] text-[#f3efe0] rounded-full border-[4px] border-[#131211] shadow-[6px_6px_0px_#f3efe0] flex items-center justify-center font-serif text-5xl pt-4">"</div>
            <p className="text-3xl md:text-5xl font-black leading-[1.2] tracking-tighter" style={{ fontFamily: 'var(--font-space)' }}>
              On the exact same day Hong Kong banned public gatherings, Nintendo would release Animal Crossing: New Horizons.
            </p>
          </blockquote>

          <h3 className="text-3xl font-black mb-6" style={{ fontFamily: 'var(--font-space)' }}>Protesting in Paradise</h3>

          <p>
            The first to recognize the potential of the video game to support their protest movement was Joshua Wong, a prominent figure in the Hong Kong democracy movement. On April 1, 2020, Wong posted a screenshot of himself within Animal Crossing standing beside a yellow banner that read <em className="not-italic inline-block bg-[#131211] text-[#f3efe0] px-4 pt-1 pb-2 rounded-full border-[3px] border-[#131211] shadow-[4px_4px_0px_#ff3b30] font-black rotate-1 mx-1">&quot;Free Hong Kong, Revolution Now.&quot;</em> Overnight, players of the game began to create protest wear and share their protests on social media.
          </p>

          <div className="my-16 relative">
            <img src="https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=2000&auto=format&fit=crop" alt="Nintendo Switch playing Animal Crossing" className="w-full h-[400px] object-cover rounded-[40px] border-[6px] border-[#131211] shadow-[12px_12px_0px_#ff3b30]" />
            <div className="absolute -bottom-6 -right-6 bg-[#131211] text-[#f3efe0] px-6 py-2 rounded-full border-[4px] border-[#131211] font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_#f3efe0] rotate-3" style={{ fontFamily: 'var(--font-space)' }}>
              Island Getaway?
            </div>
          </div>

          <h3 className="text-3xl font-black mb-6 mt-16" style={{ fontFamily: 'var(--font-space)' }}>The Power of Cultural Resistance</h3>

          <p>
            Video games are more than a means of entertainment anymore. On the contrary, they have become a new form of cultural resistance. Cultural theory author <strong className="font-black decoration-wavy underline decoration-[#ff3b30] hover:text-[#ff3b30] transition-colors">Stephen Duncombe</strong> argues that the role of culture as a tool for creating political change requires individuals to first <em>imagine</em> the change they would like to see before they can create it.
          </p>

          <p>
            Other examples of cultural resistance include the rise of punk rock, graffiti art, and underground newspapers. Today’s movements, however, have used platforms like Animal Crossing: New Horizons, Minecraft, and Roblox to expose their political and social messages to demographics that would otherwise never engage with political movements.
          </p>

          <h3 className="text-3xl font-black mb-6 mt-16" style={{ fontFamily: 'var(--font-space)' }}>Did It Actually Work?</h3>

          <p>
            While it is easy to dismiss online activism as "slacktivism," there is no denying that the virtual protest movement in Hong Kong did not change anything in China. However, there are three ways in which the protest was a win for the movement:
          </p>

          <ul className="list-disc pl-8 space-y-4">
            <li><strong>First, they had beaten the censorship laws of Hong Kong;</strong> digital protests helped sustain the movement abroad during the COVID-19 pandemic.</li>
            <li><strong>Second, they had hijacked the media cycle;</strong> screenshots of players within the video game trending on Reddit and other gaming websites like IGN, followed by national news stations like CNN and The BBC.</li>
            <li><strong>Finally, they provoked a real response from the Chinese government.</strong> Upon the video game’s release in China, Nintendo lost the game’s digital rights on China’s gray market gaming platforms within three weeks of its release. A superpower in global politics has banned a video game about friendly, talking animals.</li>
          </ul>

          <h3 className="text-3xl font-black mb-6 mt-16" style={{ fontFamily: 'var(--font-space)' }}>What's Next for Digital Activism?</h3>

          <p>
            The future of video games and activism will go hand in hand. Video games will remain uncensored digital town halls where individuals can voice their concerns. As the world’s leaders continue to monitor the physical world, organizations like the United Nations, Amnesty International, and other technology companies must work to protect the digital world from excessive governmental interference.
          </p>

          <div className="bg-[#131211] text-[#f3efe0] p-10 rounded-[40px] mt-16 shadow-[10px_10px_0px_#ff3b30] border-[4px] border-[#131211]">
            <h4 className="text-2xl font-black mb-4 text-[#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>What do you think?</h4>
            <p className="text-lg">What do you think about the idea of video games as a platform for political change? Let me know your thoughts in the comments!</p>
            <div className="mt-8">
              <TransitionLink href="https://docs.google.com/document/d/1A9KSK7-zCfmNEhQOcwXi29_J_g9RFU13715DOXNoljE/edit?usp=classroom_web&authuser=2" target="_blank" className="inline-block bg-[#f3efe0] text-[#131211] font-black px-6 py-3 rounded-full border-[3px] border-[#f3efe0] hover:bg-[#ff3b30] hover:text-[#f3efe0] hover:border-[#131211] transition-all uppercase tracking-wider text-sm shadow-[4px_4px_0px_#131211]">
                Read My Full Argument Essay
              </TransitionLink>
            </div>
          </div>

          {/* Works Cited Section */}
          <div className="mt-32 pt-16 border-t-[8px] border-[#131211] relative mb-10">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#ff3b30] text-[#f3efe0] px-8 py-3 rounded-full border-[4px] border-[#131211] font-black uppercase tracking-widest text-xl shadow-[6px_6px_0px_#131211] -rotate-2 w-max" style={{ fontFamily: 'var(--font-space)' }}>
              The Receipts (Works Cited)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Citation 1 */}
              <div className="bg-[#f3efe0] border-[4px] border-[#131211] p-6 rounded-2xl shadow-[8px_8px_0px_#131211] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#ff3b30] transition-all group rotate-1">
                <div className="font-black text-xl mb-2 text-[#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>Doornbos & Cashmore</div>
                <p className="text-sm font-medium leading-relaxed group-hover:underline decoration-wavy decoration-[#131211] decoration-2 underline-offset-4">
                  "New Horizons: Interactions between Video Games and Activism." <br/><span className="italic">New Forms of Civic Resistance and Activism</span>, Routledge, 2025, pp. 175-194.
                </p>
              </div>

              {/* Citation 2 */}
              <div className="bg-[#131211] text-[#f3efe0] border-[4px] border-[#131211] p-6 rounded-2xl shadow-[8px_8px_0px_#ff3b30] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#ff3b30] transition-all group -rotate-1">
                <div className="font-black text-xl mb-2 text-[#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>Stephen Duncombe</div>
                <p className="text-sm font-medium leading-relaxed group-hover:underline decoration-wavy decoration-[#f3efe0] decoration-2 underline-offset-4">
                  <span className="italic">Cultural Resistance Reader</span>. <br/>Verso, 2002.
                </p>
              </div>

              {/* Citation 3 */}
              <div className="bg-[#f3efe0] border-[4px] border-[#131211] p-6 rounded-2xl shadow-[8px_8px_0px_#131211] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#ff3b30] transition-all group -rotate-1">
                <div className="font-black text-xl mb-2 text-[#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>David Gilbert</div>
                <p className="text-sm font-medium leading-relaxed group-hover:underline decoration-wavy decoration-[#131211] decoration-2 underline-offset-4">
                  "Hong Kong Gamers Protested Inside 'Animal Crossing.' Now China Wants to Ban It." <br/><span className="italic">Vice</span>, 10 Apr. 2020.
                </p>
              </div>

              {/* Citation 4 */}
              <div className="bg-[#f3efe0] border-[4px] border-[#131211] p-6 rounded-2xl shadow-[8px_8px_0px_#131211] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#ff3b30] transition-all group rotate-1">
                <div className="font-black text-xl mb-2 text-[#ff3b30]" style={{ fontFamily: 'var(--font-space)' }}>Haneul Lee</div>
                <p className="text-sm font-medium leading-relaxed group-hover:underline decoration-wavy decoration-[#131211] decoration-2 underline-offset-4">
                  "This Is What We Do: Hong Kong Protests in Animal Crossing: New Horizons." <br/><span className="italic">Made in Asia/America</span>, Duke University Press, 2024, pp. 290-306.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
