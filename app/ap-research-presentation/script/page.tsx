"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Mic2, Play, Pause, RotateCcw } from "lucide-react";

export default function ScriptPage() {
    const [timeLeft, setTimeLeft] = React.useState(15 * 60);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-yellow-200 p-6">
            <div className="max-w-4xl mx-auto py-12">
                <header className="mb-12 border-b-[8px] border-black pb-8">
                    <Link href="/ap-research-presentation" className="inline-flex items-center text-sm font-black uppercase tracking-widest text-slate-400 hover:text-black mb-6 transition-colors font-mono">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Slides
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase leading-none">
                        Taylor's Presentation Transcript
                    </h1>
                    <div className="flex flex-wrap gap-6 items-center mt-8">
                        <div className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-black text-xl uppercase tracking-wider">
                            <Clock className="w-6 h-6" /> 15:00 Pacing
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-black text-xl border-4 border-black uppercase tracking-wider">
                            <Mic2 className="w-6 h-6" /> ~2,300 Words
                        </div>
                    </div>
                </header>

                {/* PRO TIMER */}
                <div className="sticky top-4 z-[100] mb-12 bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className={`text-7xl font-mono font-black ${timeLeft < 120 ? 'text-red-600' : 'text-black'}`}>
                            {formatTime(timeLeft)}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black uppercase text-gray-400 leading-none">Remaining Time</p>
                            <p className="text-xs font-bold text-gray-300">Target: 15 Minutes</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setIsActive(!isActive)} className="bg-black text-white p-6 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </button>
                        <button onClick={() => { setTimeLeft(15 * 60); setIsActive(false); }} className="bg-slate-100 text-black p-6 rounded-2xl hover:bg-slate-200 transition-all border-2 border-black/10">
                            <RotateCcw className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                <article className="space-y-24 pb-48">
                    
                    <Section title="Beginning the Talk" slide="1" time="0:00 - 1:20">
                        <p><strong>[SLIDE 1: TITLE]</strong> Good morning! My name is Taylor, and my research presentation is called: The Invisible Gatekeepers: Algorithms and Creative Identity.</p>
                        
                        <p>Most of us recognize that platforms like Instagram and TikTok use an algorithm to decide what appears on our feeds. We see the effects of this every day. I started noticing that everyone seems to be making these very formulaic videos that look exactly like each other. Creators seem to be moving away from originality because they want to cheat the algorithm. They copy styles of content that are already successful instead of being original. This process is creating a very repetitive internet. There is also a major impact on how we think. When an algorithm only feeds you one side of the political spectrum, you become biased toward that specific view. We end up in these echo chambers where the code chooses our reality for us.</p>
                        
                        <p>This is especially important for digital artists—or creators who make content for a living. For these creators, the algorithm determines their visibility and their career. I wanted to study this because I saw artists changing their behavior. They are trying to please an algorithm. My study focuses on how this technical system impacts the actual identity and the creative heart of small artists working today.</p>
                    </Section>

                    <Section title="Setting the Scene" slide="2 & 3" time="1:20 - 3:50">
                        <p><strong>[SLIDE 2: GATEKEEPING]</strong> I want to operationally define a key term for this study: Gatekeeping. Historically, gatekeeping was the process of a human—like an editor at a newspaper or a curator at an art gallery—choosing which work reached the public. Today, the algorithm has replaced that human curator. The code now makes the decision on what art is seen. As you can see on Gillespie’s map, this is a very dense process. It is a mix of technical rules and social habits. This diagram shows why it is so difficult for a single artist to understand how to get their work in front of people.</p>
                        
                        <p><strong>[SLIDE 3: DIGITAL ANXIETY]</strong> This constant push for visibility creates "Digital Anxiety." Taina Bucher, a scholar I looked at, explains that being hidden is a major threat. In the modern art world, visibility equates to professional existence. The Bruns model shows us that information flows through a network now. But the central rule remains: If the code does not favor your post, it remains hidden. This puts pressure on creators to constantly monitor their numbers and change their art to fit the system's preferences.</p>
                    </Section>

                    <Section title="The Crisis & Research Intent" slide="4 & 5 & 6" time="3:50 - 6:20">
                        <p><strong>[SLIDE 4: THE PROBLEM]</strong> This systemic gatekeeping manifests as a phenomenon known as "Reach Collapse." Market analysis from Hyperlux Magazine and Saturno suggests a quantitative decoupling of social capital from visibility. Organic reach has declined by approximately 44% since 2019, leaving many creators reaching less than 5% of their established audience. This decline represents a fundamental change in how digital content is distributed. Visibility is now an earned technical reward rather than a guaranteed social connection.</p>
                        
                        <p><strong>[SLIDE 5: THE GAP]</strong> My review of the existing literature identified a significant gap in the scholarly conversation. Most research at this level focuses on macro-level platform governance or large-scale data sets. There is a lack of qualitative data regarding the individual experience. We understand how the machines work, yet we lack a clear understanding of how these systems impact the professional identity of the creator. My study addresses this gap by focusing on the micro-level impact of these governance structures.</p>
                        
                        <p><strong>[SLIDE 6: RESEARCH QUESTION]</strong> This realization led to my core research question: <strong>How do algorithms affect the professional identity and creative output of small artists?</strong> My goal is to understand how algorithmic incentive structures influence the choices a creator makes throughout their process.</p>
                    </Section>

                    <Section title="Methodological Framework" slide="7 & 8 & 9" time="6:20 - 8:50">
                        <p><strong>[SLIDE 7: APPROACH]</strong> I utilized Qualitative Discourse Analysis to investigate this question. By examining the public narratives and professional reflections of artists, I can identify the underlying themes of their digital experience. This method allows for a nuanced understanding of social phenomena that quantitative data often overlooks. It provides a lens into the "lived reality" of working within a governed technical space.</p>
                        
                        <p><strong>[SLIDE 8: DATA SOURCES]</strong> My data set consist of professional reflections from creators on platforms like Hyperlux and Medium. These sources provide a rich archive of long-form discourse regarding algorithmic precarity. I am analyzing these texts to locate the specific moments where a creator’s professional intent conflicts with the technical demands of the platform.</p>
                        
                        <p><strong>[SLIDE 9: THE ANALYSIS]</strong> During the coding process, three predominant themes emerged. I identified frequent mentions of "Visibility Labor," "Format Pressure," and "Identity Homogenization." These codes represent the categories where artists feel the most friction between their art and the system. This framework helps us categorize the different types of strain that algorithmic gatekeeping places on the individual.</p>
                    </Section>

                    <Section title="Key Findings" slide="10 & 11 & 12" time="8:50 - 11:50">
                        <p><strong>[SLIDE 10: RESULT 1]</strong> My first finding concerns the loss of agency. Creators feel that their audience connection has been mediated by a third-party logic. There is a sense of helplessness when visibility is detached from the quality of the work. The algorithm acts as an unpredictable filter that overrides the preferences of the followers. This shift forces creators to prioritize platform metrics over artistic intent.</p>
                        
                        <p><strong>[SLIDE 11: SYSTEM DEMANDS]</strong> Finding two focuses on technical standardisation. To maintain visibility, the algorithm incentivizes specific behaviors: high-frequency posting, the use of short-form video formats, and the adoption of viral trends. This creates a "homogenization" effect where artists must conform to these templates to remain competitive. The platform defines the professional standards, and creators must adopt them to achieve reach.</p>
                        
                        <p><strong>[SLIDE 12: ARTIST STRAIN]</strong> This environment produces significant professional strain. Creators are engaging in "Platform Labor"—the constant maintenance of digital metrics—which reduces the time available for actual creative work. This leads to burnout and a perceived loss of artistic voice. The pressure to "perform for the code" creates a psychological burden that challenges the very identity of the artist.</p>
                    </Section>

                    <Section title="Synthesis & Discussion" slide="13 & 14 & 15" time="11:50 - 13:20">
                        <p><strong>[SLIDE 13: THE REALITY]</strong> There is also a clear economic cost to this shift. Many creators describe the platform as "Pay to Play," where paid advertising is the only reliable way to circumvent algorithmic restrictions. This creates a barrier for the small artist who lacks the capital to compete with larger institutions. It reinforces a system where reach is purchased rather than earned through social engagement.</p>
                        
                        <p><strong>[SLIDE 14: SYNTHESIS]</strong> When we synthesize these findings, we see that the algorithm functions as more than a distribution tool. It is an active governing force. My results indicate that creators are increasingly internalizing these technical requirements. They are fundamentally changing their creative process to align with the platform’s incentive structures.</p>
                        
                        <p><strong>[SLIDE 15: THE SHIFT]</strong> The most critical takeaway is the shift in labor dynamics. Artists are now operating as laborers for the platform. Their creativity is being harnessed to generate engagement data rather than to facilitate human connection. This reveals a conflict between artistic purpose and platform economics.</p>
                    </Section>

                    <Section title="Significance & Conclusion" slide="16 & 17" time="13:20 - 15:00">
                        <p><strong>[SLIDE 16: THE RESULT]</strong> In conclusion, my findings establish that algorithms are the primary gatekeepers of modern culture. They do not merely distribute art; they influence its very production. This study highlights how technical governance can flatten creative identity and force artists into a state of constant professional precarity.</p>
                        
                        <p><strong>[SLIDE 17: SIGNIFICANCE]</strong> This research is significant because it highlights the cultural risk of algorithmic homogenization. We are seeing a loss of unique creative voices due to a system that prioritizes retention data over artistic quality. This study provides a foundation for future research into digital equity and the rights of creators in a governed digital space.</p>
                        
                        <p>Thank you. I am now open for your defense questions.</p>
                    </Section>

                    {/* ORAL DEFENSE SECTION */}
                    <div className="mt-32 border-t-[12px] border-black pt-16">
                        <div className="bg-yellow-400 border-[6px] border-black p-10 mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">Oral Defense Cheat Sheet</h2>
                            <p className="text-xl font-bold bg-white px-4 py-2 border-2 border-black inline-block">
                                UNIVERSAL THEME: "The trade-off between human creativity and technical demands."
                            </p>
                            <p className="mt-4 text-lg font-bold italic opacity-70">
                                Use this theme to bridge any question back to your core research.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-12">
                            {/* Research/Inquiry Process */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-yellow-400">Section 1: The Research Process</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q1: How did initial exploration lead to your final RQ?</p>
                                        <p className="text-lg font-bold">"I started by looking at how social media works in general. But I soon realized that most research only looks at the viewer. I saw a gap where no one was talking about the artist's identity. This led me to focus on how the technical demands of the code change the person making the art."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q2: How did and how did scholarly methods inform your selection?</p>
                                        <p className="text-lg font-bold">"I saw that other scholars used numbers and stats to study tech. But I felt that numbers don't show the emotional side of being an artist. I chose Discourse Analysis because it lets me analyze the actual stories and words of the creators. This aligns better with my goal of studying identity, not just stats."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q3: How did your method impact your research process?</p>
                                        <p className="text-lg font-bold">"Choosing discourse analysis meant I had to be very careful with how I coded the data. It made my process more focused on the 'why' behind the artists' posts. It pushed me to look for deeper patterns in their experiences rather than just surface-level complaints."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q4: How did you determine which results were most important?</p>
                                        <p className="text-lg font-bold">"I looked for the ideas that came up across every single source. When every artist mentioned 'stress' or 'short videos,' I knew those were the core findings. I prioritized the results that directly showed the trade-off between their art and the machine's requirements."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Depth of Understanding */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-blue-400">Section 2: Depth of Understanding</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q5: How does this address a gap in the conversation?</p>
                                        <p className="text-lg font-bold">"Current research is very technical and focused on the platforms. My study addresses the human gap. It provides a look at the psychological toll and the identity shift that small artists go through. It puts the creator back in the center of the conversation."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q6: How did limitations influence your understanding?</p>
                                        <p className="text-lg font-bold">"Since I only looked at public posts, I couldn't see the private struggles or the exact data of the artists. This made me realize that visibility is even more complex than it looks from the outside. It taught me that my findings are just the tip of the iceberg of a much larger technical issue."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q7: What are the real-world implications of your findings?</p>
                                        <p className="text-lg font-bold">"The real-world implication is that artists are being forced to become technicians. If we keep this system, we will see less unique art and more 'templated' content. This has consequences for our entire culture and how we value creativity over data."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q8: How do your findings provide directions for future research?</p>
                                        <p className="text-lg font-bold">"Future research could do 'live ethnographies' where they watch artists create in real-time. My study provides a foundation showing that identity is shifting, so the next step is to study specifically how to build platforms that support art without these technical burdens."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reflection */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-red-400">Section 3: Reflection & Self-Awareness</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q9: What other curiosities do you have and how did this prepare you?</p>
                                        <p className="text-lg font-bold">"I’m now curious about how AI art generators will affect this same problem. This process has prepared me to analyze technical systems critically. It gave me the skills to look past the 'user interface' and see the power structures underneath."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q10: How did you handle the uncertainty of the research process?</p>
                                        <p className="text-lg font-bold">"I handled it by going back to my data and sticking to my theme. When the research felt too big, I reminded himself that I was just looking for the human impact. This kept me focused even when the technical side of algorithms felt overwhelming."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q11: If you could revisit the process, what would you do differently?</p>
                                        <p className="text-lg font-bold">"I would probably include direct interviews. Analyzing public posts is great, but talking one-on-one with an artist would provide even more personal detail. It would allow me to ask follow-up questions that I couldn't get from just a blog post."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q12: What was the most important research skill you developed?</p>
                                        <p className="text-lg font-bold">"The most important skill was Critical Media Literacy. I learned how to look at a platform's design and see it as a government with its own rules. I can now apply this to any new technology or system I encounter in the future."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q13: How did your adviser facilitate your understanding? (Optional)</p>
                                        <p className="text-lg font-bold">"My adviser helped me stay grounded in the human experience. When I got too deep into the technical side of how code works, they reminded me to focus on the 'Identity' part of my question. This ensured my research stayed relevant to artists, not just techies."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

function Section({ title, slide, time, children }: { title: string, slide: string, time: string, children: React.ReactNode }) {
    return (
        <div className="mb-24 border-l-[12px] border-slate-100 pl-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase text-slate-950 m-0 tracking-tighter">{title}</h2>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-400 font-mono">Slide: {slide}</span>
                </div>
                <div className="text-2xl font-mono font-black text-slate-500 bg-slate-50 px-4 py-2 border-4 border-slate-200">
                    {time}
                </div>
            </div>
            <div className="text-2xl text-slate-700 leading-relaxed space-y-8 font-medium">
                {children}
            </div>
        </div>
    )
}
