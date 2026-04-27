"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Mic2, Play, Pause, RotateCcw } from "lucide-react";

export default function ScriptPage() {
    const [timeElapsed, setTimeElapsed] = React.useState(0);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

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

                {/* PRO STOPWATCH */}
                <div className="sticky top-4 z-[100] mb-12 bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className={`text-7xl font-mono font-black ${timeElapsed > 15 * 60 ? 'text-red-600' : 'text-black'}`}>
                            {formatTime(timeElapsed)}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black uppercase text-gray-400 leading-none">Elapsed Time</p>
                            <p className="text-xs font-bold text-gray-300">Target: 15 Minutes</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setIsActive(!isActive)} className="bg-black text-white p-6 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                        </button>
                        <button onClick={() => { setTimeElapsed(0); setIsActive(false); }} className="bg-slate-100 text-black p-6 rounded-2xl hover:bg-slate-200 transition-all border-2 border-black/10">
                            <RotateCcw className="w-8 h-8" />
                        </button>
                    </div>
                </div>

                <article className="space-y-24 pb-48">
                    
                    <Section title="Beginning the Talk" slide="1" time="0:00 - 1:20">
                        <p><strong>[SLIDE 1: TITLE]</strong> Good morning! My name is Taylor, and my research presentation is called: The Invisible Gatekeepers: Algorithms and Creative Identity.</p>
                        
                        <p>Most of us recognize that platforms like Instagram and TikTok use an algorithm to decide what appears on our feeds. We see the effects of this every day. I started noticing that everyone seems to be making these very formulaic videos that look exactly like each other. Creators seem to be moving away from originality because they want to cheat the algorithm. They copy styles of content that are already successful instead of being original. This process is creating a very repetitive internet. There is also a major impact on how we think. When an algorithm only feeds you one side of the political spectrum, you become biased toward that specific view. We end up in these echo chambers where the code chooses our reality for us.</p>
                        
                        <p>This is especially important for digital artists—or creators who make content for a living. For these creators, the algorithm determines their visibility and their career. I wanted to study this because I saw artists changing their behavior. They are trying to please an algorithm. My study focuses on how this specific algorithm impacts the actual identity and the creative heart of small artists working today.</p>
                    </Section>

                    <Section title="Setting the Scene" slide="2 & 3" time="1:20 - 3:50">
                        <p><strong>[SLIDE 2: GATEKEEPING]</strong> I want to operationally define a key term for this study: Gatekeeping. Historically, gatekeeping was the process of a human—like an editor at a newspaper (choosing what is printed) or a curator at an art gallery. Today, the algorithm has replaced that human curator. Algorithms now make the decision on what art is seen. As you can see on Gillespie’s map, this is a very dense process. It is a mix of technical rules and social habits. This diagram shows why it is so difficult for a single artist to understand how to get their work in front of people.</p>
                        
                        <p><strong>[SLIDE 3: DIGITAL ANXIETY]</strong> This constant push for visibility creates "Digital Anxiety." Taina Bucher, a scholar I looked at, explains that being hidden is a major threat. In the modern art world, visibility is the same as professional existence. The Bruns model shows us that information flows through a network now. Algorithmic rules determine if a post is seen or hidden. This puts pressure on creators to constantly monitor their numbers and change their art to fit the algorithm's preferences.</p>
                    </Section>

                    <Section title="The Crisis & Research Intent" slide="4 & 5 & 6" time="3:50 - 6:20">
                        <p><strong>[SLIDE 4: THE PROBLEM]</strong> Algorithmic gatekeeping appears as a phenomenon called "Reach Collapse." To explain this simply, reach collapse is when an artist has thousands of followers who simply never see their posts because the algorithm blocks the connection. Market analysis from Hyperlux Magazine suggests followers and views are completely separate now. Since 2019, organic reach has declined by 44%. Most creators now reach less than 5% of their audience. High visibility is now a reward for following algorithmic rules. This creates job instability for artists who cannot rely on their audience to find their work.</p>
                        
                        <p><strong>[SLIDE 5: THE GAP]</strong> My review of the research shows a gap regarding the impact of these algorithms on the individual. Most experts focus on "macro" stuff like how big corporations work or how data is harvested. We understand the technical side. We know how companies benefit. My study looks at the "micro" level impact on the creator. We need to understand how these rules change the choices and the professional identity of the human artist. I am focusing on the experience of the individual creator working inside these algorithmic spaces.</p>
                        
                        <p><strong>[SLIDE 6: RESEARCH INTENT]</strong> This led to my core research question: <strong>How do algorithms affect the professional identity and creative output of small artists?</strong> My goal is to move past the mechanical formulas and analyze the trade-offs that creators make. I want to understand how algorithmic incentives influence a creator's choices from the first idea to the final post.</p>
                    </Section>

                    <Section title="Methodological Framework" slide="7 & 8 & 9" time="6:20 - 8:50">
                        <p><strong>[SLIDE 7: APPROACH]</strong> I used a method called <strong>Qualitative Discourse Analysis</strong>. This doesn't mean I am looking at numbers; it means I am analyzing the <em>conversations</em> and <em>language</em> that artists use publicly. Discourse Analysis helps us understand how the "big rules"—like platform algorithms—change the way people talk about themselves and their careers. By studying their blog posts and professional reflections, I can see how their language shifts from being about "creating art" to being about "managing visibility."</p>
                        
                        <p><strong>[SLIDE 8: DATA SOURCES]</strong> My data set consist of professional reflections from creators on platforms like Hyperlux and Medium. These sources provide a rich archive of long-form discourse regarding algorithmic precarity. I am analyzing these texts to locate the specific moments where a creator’s professional intent conflicts with the technical demands of the platform.</p>
                        
                        <p><strong>[SLIDE 9: THE ANALYSIS]</strong> During the analysis, I "coded" the data. In research, <strong>Coding</strong> is not computer programming. Instead, it is the process of labeling pieces of text with specific "tags" to find patterns. For example, every time an artist mentioned stress about numbers, I labeled that text with the code "Visibility Anxiety." I then grouped these codes into themes like "Visibility Labor" and "Identity Homogenization." This helped me turn hundreds of pages of text into clear, organized categories of artist behavior.</p>
                    </Section>

                    <Section title="Key Findings" slide="10 & 11 & 12" time="8:50 - 11:50">
                        <p><strong>[SLIDE 10: RESULT 1]</strong> My first finding is the loss of agency. Creators feel the algorithm acts as a third-party filter between them and their audience. Visibility is independent of the quality of the art. The algorithm overrides the preferences of the followers. This shift forces creators to prioritize platform metrics when they should be focusing on artistic intent.</p>
                        
                        <p><strong>[SLIDE 11: SYSTEM DEMANDS]</strong> Finding two focuses on technical standardization. To stay visible, the algorithm rewards specific behaviors like high-frequency posting and using short-form video formats. This makes art very formulaic. Artists must copy successful templates to remain competitive. The platform defines the professional standards and creators must adopt them to be seen.</p>
                        
                        <p><strong>[SLIDE 12: ARTIST STRAIN]</strong> This environment produces significant professional strain. Creators are doing "Platform Labor" which is the constant maintenance of digital numbers. This reduces the time they have for actual creative work. This leads to burnout and a loss of artistic voice. The pressure to please an algorithm creates a psychological burden that changes who the artist is.</p>
                    </Section>

                    <Section title="Synthesis & Discussion" slide="13 & 14 & 15" time="11:50 - 13:20">
                        <p><strong>[SLIDE 13: THE REALITY]</strong> There is also a clear economic cost to this shift. Many creators describe the platform as "Pay to Play," where paid advertising is the only reliable way to circumvent algorithmic restrictions. This creates a barrier for the small artist who lacks the capital to compete with larger institutions. It reinforces an algorithm where reach is purchased rather than earned through social engagement.</p>
                        
                        <p><strong>[SLIDE 14: SYNTHESIS]</strong> When we synthesize these findings, we see that the algorithm functions as more than a distribution tool. It is an active governing force. My results indicate that creators are increasingly internalizing these technical requirements. They are fundamentally changing their creative process to align with the algorithm’s incentive structures.</p>
                        
                        <p><strong>[SLIDE 15: THE SHIFT]</strong> The most critical takeaway is the shift in labor dynamics. Artists are now operating as laborers for the platform. Their creativity is being harnessed to generate engagement data rather than to facilitate human connection. This reveals a conflict between artistic purpose and platform economics.</p>
                    </Section>

                    <Section title="Significance & Conclusion" slide="16 & 17" time="13:20 - 15:00">
                        <p><strong>[SLIDE 16: THE RESULT]</strong> In conclusion, my findings show that algorithms are the primary gatekeepers of modern culture. They influence the production of art through their distribution rules. This research shows how technical rules can flatten creative identity and force artists into constant job instability.</p>
                        
                        <p><strong>[SLIDE 17: SIGNIFICANCE]</strong> This research is significant because it highlights the cultural risk of formulaic content. We are seeing a loss of unique creative voices because algorithms prioritize retention data over artistic quality. This study provides a foundation for more research into digital fairness and the rights of creators in an algorithmic space.</p>
                        
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

                        {/* SOURCE DEEP DIVE - THE "YAP" SECTION */}
                        <div className="bg-slate-900 text-white p-10 mb-12 border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(253,224,71,1)]">
                            <h3 className="text-3xl font-black uppercase mb-6 text-yellow-400">Source Deep Dive (Quick Ref)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                                <div className="space-y-2">
                                    <p className="font-black underline uppercase text-xl">1. Gillespie</p>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        The "Algorithm as an Editor." He says code isn't neutral—it makes editorial choices just like a human editor. It decides what is "publicly relevant."
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black underline uppercase text-xl">2. Axel Bruns</p>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        "Gatekeeping is a Flow." Information flows through networks, but the platform at the center acts as a gatekeeping force that can restrict that flow (Reach Collapse).
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black underline uppercase text-xl">3. Loes van Driel</p>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        "Algorithmic Precarity." Working for code makes life unstable. Artists are always chasing a moving target (the algorithm), leading to burnout and stress.
                                        "Algorithmic Instability." Working for algorithms makes life unstable. Artists are always chasing a moving target, leading to burnout and stress.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-12">
                            {/* Research/Inquiry Process */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-yellow-400">Section 1: The Research Process</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q1: How did initial exploration lead to your final RQ? [CITING GILLESPIE]</p>
                                        <p className="text-lg font-bold">"So pretty much I was reading <strong>Tarleton Gillespie</strong> and his work on algorithms. He explains that these algorithms act like editors who choose what is 'publicly relevant.' This fascinated me because it means the algorithm is actually deciding the value of an artist's identity. This directly led to my question about how these automated choices change an artist's creative heart."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q2: How did scholarly methods inform your selection of Discourse Analysis?</p>
                                        <p className="text-lg font-bold">"So I used <strong>Discourse Analysis</strong> to look at the specific language and the identity of artists under algorithmic pressure. This method helps me find patterns in the words they use. I can see the personal impact of automated rules on their actual professional voice."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q3: What does 'Coding the data' mean in your study?</p>
                                        <p className="text-lg font-bold">"So just to be clear, 'coding' here is about labeling text patterns and not computer programming. I used tags like 'Visibility Labor' to group all the times artists talked about the work they do just to get seen by the algorithms."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Depth of Understanding */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-blue-400">Section 2: Depth of Understanding</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q5: How does this address a gap in the conversation? [CITING BRUNS]</p>
                                        <p className="text-lg font-bold">"So pretty much I looked at <strong>Axel Bruns</strong> and his framework for how information flows. He shows that algorithms are a gatekeeping force in the middle of our networks. My research looks at how individual artists experience 'reach collapse' because of these technical rules. I'm filling the human gap by showing the impact on the person making the art."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q6: How did limitations influence your understanding?</p>
                                        <p className="text-lg font-bold">"So I focused on public posts which means I can't see the private side of the struggle. This limitation shows me that my findings are just the start of a much bigger technical issue regarding digital fairness."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q7: What are the real-world implications of your findings?</p>
                                        <p className="text-lg font-bold">"So the real-world implication is that artists are becoming technicians. The current algorithm environment produces formulaic content which leads to a loss of human creativity in favor of engagement data."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reflection */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-red-400">Section 3: Reflection & Self-Awareness</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q9: What other curiosities do you have and how did this prepare you? [CITING VAN DRIEL]</p>
                                        <p className="text-lg font-bold">"So pretty much I was very interested in <strong>Loes van Driel</strong> and her work on 'Algorithmic Instability.' She describes how automated work and things like AI making people lose jobs is becoming a huge issue. This fascinated me because it correlates with content creation and originality. I've started seeing people use AI scripts or text-to-speech when presenting, which inspired me to look at the effort and emotion put into videos. I've learned to analyze these systems by asking if quantity is becoming more important than quality."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q10: How did you handle the uncertainty of the research process?</p>
                                        <p className="text-lg font-bold">"So I handled the process by returning to my data and sticking to my theme. Focusing on the human impact maintained my direction even when the technical algorithmic structures felt complex."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q12: What was the most important research skill you developed?</p>
                                        <p className="text-lg font-bold">"So the most important skill was learning to look at a platform's design and see it as a government with its own rules. I can now apply this to any new technology by looking for the trade-offs between human agency and technical control."</p>
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
