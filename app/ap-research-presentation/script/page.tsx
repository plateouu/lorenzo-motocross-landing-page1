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
                        <p><strong>[SLIDE 2: GATEKEEPING]</strong> I want to define a key term for this study: Gatekeeping. Historically, gatekeeping was the process of a human editor choosing which work reached the public. Today, algorithms have replaced those human curators. This is a dense process of technical rules and social habits that filters information and determines its visibility. This diagram shows the specific technical filters a single piece of art must pass through to reach an audience.</p>
                        
                        <p><strong>[SLIDE 3: DIGITAL ANXIETY]</strong> This technical filtering creates "Digital Anxiety." Scholar Taina Bucher explains that the threat of being "hidden" is a major professional risk. In the modern creative economy, visibility is the same as professional existence. Algorithms determine whether a post is seen or suppressed. This forces creators to constantly monitor their metrics and change their artistic output to align with the algorithm's preferences.</p>
                    </Section>

                    <Section title="The Crisis & The Gap" slide="4 & 5" time="3:50 - 5:50">
                        <p><strong>[SLIDE 4: THE PROBLEM]</strong> This algorithmic gatekeeping results in "Reach Collapse." To explain this directly, reach collapse is when a content creator's followers are disconnected from their actual views. Since 2019, organic reach has declined by 44%. Most creators now reach less than 5% of their audience. Visibility is now a technical reward for following the algorithm's rules. This results in massive job instability for artists.</p>
                        
                        <p><strong>[SLIDE 5: THE GAP]</strong> My review of the research shows a fundamental gap regarding the **content creator**. Most experts focus on how social media companies make a profit or the technical way the software is written. We understand how big companies benefit, but we do not understand the impact on the human **author**. My study addresses this gap by analyzing the author's emotional state and the loss of creative motivation that occurs when they are hidden by an algorithm.</p>
                    </Section>

                    <Section title="Research Intent & Method" slide="6 & 7 & 8 & 9" time="5:50 - 8:50">
                        <p><strong>[SLIDE 6: RESEARCH INTENT]</strong> This leads to my core research question: <strong>How do algorithms affect the professional identity and creative output of small artists?</strong> My goal is to analyze the trade-offs that content creators make. I want to understand how these incentives influence their choices, emotions, and motivation.</p>

                        <p><strong>[SLIDE 7: THE METHOD]</strong> I used a method called <strong>Qualitative Discourse Analysis</strong>. This means I studied the actual words and sentences that content creators use in their public blogs. This helps us see how technical rules change the way people talk about their identity. It shows how an artist's language shifts from 'art' to 'following rules.'</p>
                        
                        <p><strong>[SLIDE 8: DATA SOURCES]</strong> My data comes from long-form professional reflections on platforms like Hyperlux and Medium. These sources provide a detailed archive of the emotional and professional struggles of content creators. I analyzed these texts to find the specific moments where an artist's personal intent conflicts with the algorithm's demands.</p>
                        
                        <p><strong>[SLIDE 9: THE ANALYSIS]</strong> I used a systematic process called <strong>Qualitative Coding</strong>. This involves reading every sentence of the reflections and assigning descriptive labels to specific patterns. For example, I looked for repeated phrases about stress or feeling forced to post. I used the label "Visibility Labor" for the work required to stay seen. This process turns raw stories into organized data that shows exactly how algorithms control human behavior.</p>
                    </Section>

                    <Section title="Key Findings" slide="10 & 11 & 12" time="8:50 - 11:50">
                        <p><strong>[SLIDE 10: RESULT 1 - THE LINGUISTIC SHIFT]</strong> My first finding revealed a profound shift in the language of content creators. In their reflections, vocabulary like "craft" and "inspiration" is replaced by industrial terminology like "retention rates" and "engagement metrics." This represents a full transition into an industrial identity. <strong>Tarleton Gillespie’s</strong> theories suggest that when an algorithm becomes the curator, artists view their work as data that must be "processed" to survive.</p>
                        
                        <p><strong>[SLIDE 11: RESULT 2 - THE EMOTION OF ERASURE]</strong> Finding two focuses on the recurring emotional theme of "erasure." Over 70% of the text I analyzed used metaphors of invisibility—phrases like "shouting into a void" or "being buried alive by the feed." This reveals that content creators carry a deep psychological burden of being "erased" by algorithmic choices. <strong>Taina Bucher</strong> describes the fear of the invisible as a powerful control mechanism. Artists describe a feeling of "punishment" when they take a break, treating the algorithm as a force that requires constant sacrifice in the form of content.</p>
                        
                        <p><strong>[SLIDE 12: ARTIST BURNOUT]</strong> My final finding is the loss of the creative spirit. Artists feel forced into safe, repetitive styles to keep their views. They feel suffocated by the pressure to follow templates. This proves that art is now a high-stress job focused on farming views. Creators only focus on what the algorithm requires, leading to total professional burnout.</p>
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
                                    <p className="font-black underline uppercase text-xl">1. Gillespie (Gatekeeping)</p>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        Gillespie defines algorithms as editorial gatekeepers. They choose which content is "publicly relevant" based on platform-specific rules.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black underline uppercase text-xl">2. Axel Bruns (Information Flow)</p>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        Bruns analyzes how information flows through networks. He identifies that algorithms act as central control points that can restrict these flows.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black underline uppercase text-xl">3. Loes van Driel (Precarity)</p>
                                    <p className="font-bold opacity-90 leading-relaxed">
                                        Van Driel examines the instability and stress that algorithms cause for creative workers who must constantly adapt to changing rules.
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
                                        <p className="text-lg font-bold">"So pretty much I was reading <strong>Gillespie</strong> and his analysis of how algorithms choose what is 'relevant.' I noticed that artists in my initial reading weren't talking about 'artistic choice'—they were talking about 'negotiating with code.' This fascinated me because it showed a shift in identity from an artist to a technical negotiator. This led to my question about how this negotiation affects the creative spirit of the content creator."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q2: How did scholarly methods inform your selection of Discourse Analysis?</p>
                                        <p className="text-lg font-bold">"So I used <strong>Discourse Analysis</strong> to look at the 'emotional vocabulary' of content creators. I wanted to see how their language shifts when they lose control. By analyzing the frequency of words like 'erasure' and 'punishment,' I could map the psychological impact of algorithms in a way that numbers alone could never show."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q3: What does 'Coding the data' mean in your study?</p>
                                        <p className="text-lg font-bold">"So I read through hundreds of pages of artist blogs and assigned labels to specific emotional and technical markers. For example, I used the label <strong>'Visibility Anxiety'</strong> whenever an artist described the fear of being hidden or 'buried' by the algorithm. This allowed me to categorize raw stories into clear themes of professional instability."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Depth of Understanding */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-blue-400">Section 2: Depth of Understanding</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q5: How does this address a gap in the conversation? [CITING BRUNS]</p>
                                        <p className="text-lg font-bold">"So pretty much I looked at <strong>Axel Bruns</strong> and the gatekeeping of information. Most experts focus on the 'audience'—how they see content. This ignores the 'author' and their emotional decay. My research addresses this by analyzing how the language of content creators shifts from 'craft' to 'industrial survival,' revealing the deep cost of algorithmic control."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q6: How did limitations influence your understanding?</p>
                                        <p className="text-lg font-bold">"I focused on public blogs where artists try to remain professional. This means the 'panic' I found is likely even more extreme in private. This limitation showed me that algorithmic control creates a culture of forced professionalism where artists must hide their stress to please the system."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q7: What are the real-world implications of your findings?</p>
                                        <p className="text-lg font-bold">"The real-world implication is the death of original art. We are moving toward an internet where everyone is forced to act as an algorithmic view farmer. This leads to a loss of human originality as we all start making the same repetitive videos to survive the system."</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reflection */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-black uppercase underline decoration-8 decoration-red-400">Section 3: Reflection & Self-Awareness</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q9: What other curiosities do you have and how did this prepare you? [CITING VAN DRIEL]</p>
                                        <p className="text-lg font-bold">"So pretty much I was very interested in <strong>Loes van Driel</strong> and her work on how automated systems make jobs unstable. This fascinated me because I see it in content creation where everyone is using AI or scripts just to keep up. It inspired me to look at the effort and emotion in videos. Now I analyze these systems by asking if quantity is more important than quality."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q10: How did you handle the uncertainty of the research process?</p>
                                        <p className="text-lg font-bold">"So I handled the process by returning to my data and sticking to my theme. Focusing on the human impact helped me stay on track even when the technical algorithm stuff felt confusing."</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 border-2 border-black rounded-lg">
                                        <p className="font-black text-blue-700 mb-2">Q12: What was the most important research skill you developed?</p>
                                        <p className="text-lg font-bold">"So the most important skill was learning to look at an algorithm as a set of rules that artists have to follow. I can now apply this to any new technology by looking for the trade-offs between what the human wants and what the machine requires."</p>
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
