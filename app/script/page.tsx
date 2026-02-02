
"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Mic2 } from "lucide-react";

export default function ScriptPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-yellow-200">
            <div className="max-w-4xl mx-auto px-6 py-12">

                <header className="mb-12 border-b border-black/10 pb-8">
                    <Link href="/apseminar2026" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-black mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Slides
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Presentation Script</h1>
                    <div className="flex gap-6 text-sm font-medium text-slate-500">
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> 8:00 Minutes</span>
                        <span className="flex items-center"><Mic2 className="w-4 h-4 mr-2" /> 1250 Words</span>
                    </div>
                </header>

                <article className="prose prose-lg prose-slate max-w-none">

                    <Section title="Introduction: The Axis of Memory" slide="Title & Quote Slide" time="0:00 - 1:15">
                        <p>
                            <strong>(Title Slide)</strong> Good morning.
                        </p>
                        <p>
                            In his 2002 memoir <em>A Walk to Kobe</em>, Haruki Murakami describes his return to a town destroyed by an earthquake. He writes that he expected the physical damage, but he wasn't prepared for the psychological loss. He coins a phrase: <strong>"The Axis of Memory."</strong>
                        </p>
                        <p>
                            <strong>(Slide: The Axis of Memory)</strong> Murakami argues that our identity is not self-contained; it is a function of our relationship to our community, specifically through consistent, tangible "scenery." When that scenery is destroyed, whether by disaster or by time, our internal "axis" begins to wobble. We lose our footing.
                        </p>
                        <p>
                            <strong>(Slide: Context - Key Factors)</strong> But today, for millions of people, that axis is broken not by earthquakes, but by structural neglect. As Ben Goldfarb notes in <em>Crossings</em>, modern planning—endless highways, suburban sprawl, and car-centric design—has physically severed the connections between us. We have built a world where community is physically inaccessible.
                        </p>
                    </Section>

                    <Section title="The Problem" slide="Public Health Crisis" time="1:15 - 2:00">
                        <p>
                            This physical isolation has metastasized into a biological crisis.
                        </p>
                        <p>
                            <strong>(Slide: The Problem)</strong> In 2023, the U.S. Surgeon General declared loneliness a public health epidemic. The statistics are terrifying: lacking social connection carries a mortality risk equivalent to smoking <strong>15 cigarettes a day</strong>. It increases the risk of premature death by 29%.
                        </p>
                        <p>
                            We are facing a crisis of connection. And if our physical world is failing to provide the infrastructure for community, we must ask: where do we go?
                        </p>
                    </Section>

                    <Section title="Research Question & Thesis" slide="RQ & Thesis" time="2:00 - 3:00">
                        <p>
                            This leads to my Research Question: <strong>(Slide: Research Question)</strong> <em>To what extent could digital communities be considered meaningful social spaces for those who are isolated from physical spaces?</em>
                        </p>
                        <p>
                            <strong>(Slide: Key Concepts)</strong> To answer this, we must define "Third Places." Sociologist Ray Oldenburg coinage this term for neutral grounds where people gather—not work, not home, but distinct "social condensers." Coffee shops, parks, libraries.
                        </p>
                        <p>
                            My argument is simple: <strong>(Slide: Thesis)</strong> For those trapped in "Social Deserts"—spaces designed against interaction—virtual communities are not a "fake" alternative. They are necessary "Third Places." They are an essential means of developing "bridging social capital"—the diverse connections that bind a society together.
                        </p>
                    </Section>

                    <Section title="Perspective 1: Structural Barriers" slide="Networked Publics & Sprawl" time="3:00 - 4:30">
                        <p>
                            Let's look at the Structural Perspective. Why can't people just "go outside"?
                        </p>
                        <p>
                            <strong>(Slide: Structural - Networked Publics)</strong> For youth, the "outside" is increasingly legally restricted. Dana Boyd, in her book <em>It's Complicated</em>, introduces the concept of "Networked Publics." She argues that due to curfews, safety fears, and the privatization of public space (like malls kicking out teens), the internet has become the <strong>only</strong> unsupervised public space left for young people. It's not that they <em>prefer</em> screens; it's that they are <em>banned</em> from the town square.
                        </p>
                        <p>
                            <strong>(Slide: Structural - Friction Costs)</strong> For adults, the barrier is design. Goldfarb discusses "Friction Costs." If visiting a friend requires a 45-minute drive through 6-lane highways, the "friction" is too high. You stay home. Suburban sprawl creates "Social Deserts" where community is impossible.
                        </p>
                        <p>
                            <strong>(Slide: Counter - Surveillance Cap)</strong> Now, critics—specifically Steinkuehler & Williams—argue that digital spaces are poor substitutes because they are owned by corporations. This is a valid concern, which leads us to the Economic Perspective.
                        </p>
                    </Section>

                    <Section title="Perspective 2: Economic Reality" slide="Profit & Illusion" time="4:30 - 6:30">
                        <p>
                            The Economic argument against digital community is strong.
                        </p>
                        <p>
                            <strong>(Slide: Economic - Profit Over Connection)</strong> Shoshana Zuboff, in <em>The Age of Surveillance Capitalism</em>, warns us that platforms like TikTok or Discord are not charities. Their goal is not connection; it is <strong>prediction</strong>. They extract our experience as raw data to modify our behavior. If the "Third Place" is a data mine, can it really support community?
                        </p>
                        <p>
                            <strong>(Slide: Economic - Illusion)</strong> Sherry Turkle, in <em>Alone Together</em>, goes further. She argues we are settling for the "illusion of companionship." In digital space, we can edit ourselves. We can delete the awkward pause. Turkle argues this isn't connection; it's <strong>connection-lite</strong>. We are "Alone Together," sipping on a simulation of friendship while our biological need for intimacy starves.
                        </p>
                        <p>
                            <strong>(Slide: Economic - Counter/Lifeline)</strong> However, this view comes from a place of privilege. It assumes we have a choice between "perfect organic connection" and "imperfect digital connection."
                        </p>
                        <p>
                            But for the teenager in a rural food desert, or the disabled senior trapped in a third-floor apartment, that choice doesn't exist. It is either Digital Community or <strong>Total Isolation</strong>.
                        </p>
                        <p>
                            Surveillance Capitalism is real, yes. But a starving person doesn't reject food because the grocery store is a corporation. To dismiss digital spaces because they are imperfect is to condemn millions to the "toxic biological isolation" that causes that 29% mortality risk.
                        </p>
                    </Section>

                    <Section title="Limitations" slide="Physiological Limits" time="6:30 - 7:15">
                        <p>
                            <strong>(Slide: Limitations)</strong> I must concede a biological limitation. As Cacioppo notes in his research on loneliness, text on a screen cannot trigger the full oxytocin response of a hug. There is a physiological gap. Digital connection is not a <em>perfect</em> biological substitute.
                        </p>
                        <p>
                            But the goal is <strong>Harm Reduction</strong>. As Quan-Haase argues, we use the tools we have. Imperfect connection is infinitely better than no connection.
                        </p>
                    </Section>

                    <Section title="Conclusion" slide="Synthesis" time="7:15 - 8:00">
                        <p>
                            <strong>(Slide: Conclusion)</strong> In conclusion, our physical "Axis of Memory" has been broken by modern planning and neglect. We have built a world that isolates us.
                        </p>
                        <p>
                            Until we rebuild our physical cities—a task that will take decades—we must recognize <strong>Digital Communities as Essential Social Infrastructure</strong>. They are the life rafts in a sea of isolation.
                        </p>
                        <p>
                            We shouldn't shame people for looking at their phones. We should ask: <em>Why is this the only place they have left to go?</em>
                        </p>
                        <p>
                            Thank you.
                        </p>
                    </Section>

                </article>

            </div>
        </div>
    );
}

function Section({ title, slide, time, children }: { title: string, slide: string, time: string, children: React.ReactNode }) {
    return (
        <div className="mb-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 m-0">{title}</h2>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Slide: {slide}</span>
                </div>
                <div className="text-sm font-mono font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded">
                    {time}
                </div>
            </div>
            <div className="text-slate-700 leading-relaxed space-y-4">
                {children}
            </div>
        </div>
    )
}
