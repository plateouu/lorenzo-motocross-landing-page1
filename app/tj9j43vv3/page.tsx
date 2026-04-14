"use client"

import { Download } from "lucide-react"

export default function ResumePage() {
    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-2 md:p-4 print:p-0 print:bg-white font-serif text-black">
            <button
                onClick={handlePrint}
                className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded shadow-sm bg-neutral-900 px-3 py-1.5 text-xs font-semibold tracking-wide text-white transition-all hover:bg-neutral-800 print:hidden"
            >
                <Download className="h-3 w-3" />
                PDF
            </button>

            <div
                className="mx-auto max-w-[8.5in] bg-white p-[0.4in] print:p-0 leading-[1.4] text-[13px]"
                style={{ fontFamily: "'Times New Roman', Times, serif" }}
            >
                <header className="mb-2 text-center border-b-[2px] border-black pb-2">
                    <h1 className="text-[26px] font-bold uppercase tracking-tight mb-0.5">
                        Taylor Daan
                    </h1>
                    <div className="text-[13px]">
                        Iselin, NJ &nbsp;|&nbsp; daantaylor02@gmail.com
                    </div>
                </header>

                <div className="space-y-2.5">

                    {/* EDUCATION */}
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-0.5 border-b border-black pb-0.5">Education</h2>
                        <div className="space-y-1.5">
                            <div>
                                <div className="flex justify-between items-baseline text-[13px]">
                                    <span><strong>Rutgers University</strong>, New Brunswick, NJ</span>
                                    <span className="italic">Fall 2026</span>
                                </div>
                                <div className="text-[13px] italic">
                                    B.A. in Economics, incoming freshman
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-baseline text-[13px]">
                                    <span><strong>John F. Kennedy Memorial High School</strong>, Iselin, NJ</span>
                                    <span className="italic">Expected June 2026</span>
                                </div>
                                <p className="mt-0.5">GPA: 4.23 (4.33 scale) &nbsp;|&nbsp; SAT: 1580 / 1600 &nbsp;|&nbsp; IEO National Qualifier &nbsp;|&nbsp; 15 AP courses</p>
                            </div>
                        </div>
                    </section>

                    {/* EXPERIENCE */}
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-0.5 border-b border-black pb-0.5">Experience</h2>
                        <div className="space-y-2">

                            <div>
                                <div className="flex justify-between items-baseline text-[13px]">
                                    <span><strong>Independent Game Developer</strong>, Roblox Platform</span>
                                    <span className="italic">2019 – August 2025</span>
                                </div>
                                <ul className="list-disc list-outside ml-5 mt-0.5 space-y-0.5">
                                    <li>Solo-built and monetized multiple online games with <strong>200M+ play sessions</strong>, earning <strong>$400k gross revenue</strong> over 6 years</li>
                                    <li>Ran pricing tests on in-game items and tracked how changes affected player retention and spending</li>
                                    <li>Grew to <strong>3.6M monthly active users</strong> at peak using YouTube videos and partnerships with content creators</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between items-baseline text-[13px]">
                                    <span><strong>PlateouMC.xyz</strong> (Minecraft Server), Founder</span>
                                    <span className="italic">2023 – Present</span>
                                </div>
                                <ul className="list-disc list-outside ml-5 mt-0.5 space-y-0.5">
                                    <li>Wrote the full server backend solo in Java (PostgreSQL, Redis) serving <strong>150,000 registered users</strong> with safeguards against item duplication and transaction exploits</li>
                                    <li>Built a server store (store.plateoumc.xyz) and in-game economy that generated <strong>$70k in revenue</strong> with $0 in paid ads, using YouTube and creator outreach</li>
                                    <li>Automated staff moderation through a custom Discord bot, reducing manual moderation workload for a team of 15+ moderators</li>
                                </ul>
                            </div>

                        </div>
                    </section>

                    {/* RESEARCH */}
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-0.5 border-b border-black pb-0.5">Research</h2>
                        <div>
                            <div className="flex justify-between items-baseline text-[13px]">
                                <span><strong>MIT CSAIL, Kellis Lab</strong>, Research Intern</span>
                                <span className="italic">September 2025 – Present</span>
                            </div>
                            <ul className="list-disc list-outside ml-5 mt-0.5 space-y-0.5">
                                <li>Opened pull requests on the Mantis AI codebase to fix data pipeline bugs and improve agent reliability for dataset ingestion</li>
                                <li>Built and tested new features for the visual dataset exploration interface used by lab researchers</li>
                            </ul>
                        </div>
                    </section>

                    {/* SKILLS */}
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-0.5 border-b border-black pb-0.5">Skills &amp; Interests</h2>
                        <div className="mt-0.5 space-y-0.5">
                            <p><strong>Technical:</strong> Java, Python, SQL, PostgreSQL, Redis, Git, Excel, Stata</p>
                            <p><strong>Interests:</strong> Game Development, Competitive Chess, Track and Field, Audio Engineering, Cooking</p>
                            <p><strong>Languages:</strong> English (native), Hungarian (beginner)</p>
                        </div>
                    </section>

                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0.2in 0.25in;
                        size: letter;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        background-color: white;
                        print-color-adjust: exact;
                    }
                    ::-webkit-scrollbar {
                        display: none;
                    }
                }
            `}</style>
        </div>
    )
}
