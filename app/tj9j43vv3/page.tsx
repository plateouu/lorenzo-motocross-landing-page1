"use client"

import { Download } from "lucide-react"

export default function ResumePage() {
    const handlePrint = () => {
        window.print()
    }

    // Logo component - simpler for print
    const Logo = ({ src, alt }: { src: string; alt: string }) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src={src}
            alt={alt}
            className="inline h-4 w-4 mr-1.5 object-contain align-text-bottom mix-blend-multiply grayscale opacity-90 contrast-125"
        />
    )

    return (
        <div className="min-h-screen bg-[#F3F4F6] p-2 md:p-4 print:p-0 print:bg-white font-serif text-black">
            {/* Download Button */}
            <button
                onClick={handlePrint}
                className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded shadow-sm bg-neutral-900 px-3 py-1.5 text-xs font-semibold tracking-wide text-white transition-all hover:bg-neutral-800 print:hidden"
            >
                <Download className="h-3 w-3" />
                PDF
            </button>

            {/* Resume Content */}
            <div
                className="mx-auto max-w-[8.5in] bg-white p-[0.3in] print:p-0 leading-snug text-[12.5px]"
                style={{ fontFamily: "Cambria, 'Times New Roman', Times, serif" }}
            >
                {/* Header */}
                <header className="mb-2.5 text-center border-b border-gray-300 pb-2">
                    <h1 className="text-[28px] font-bold uppercase tracking-wide mb-1">
                        Taylor Daan
                    </h1>
                    <div className="text-[12px] text-black font-medium">
                        Iselin, New Jersey &nbsp;•&nbsp; daantaylor02@gmail.com
                    </div>
                </header>

                <div className="space-y-2.5">
                    {/* Education */}
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1 border-b border-black pb-0.5">
                            Education
                        </h2>

                        <div>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-[15px]">John F. Kennedy High School</h3>
                                <span className="text-[12px] italic">Iselin, NJ</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] mb-1">
                                <span>High School Diploma</span>
                                <span>June 2026</span>
                            </div>
                            <ul className="list-disc list-inside space-y-1 marker:text-black">
                                <li><span className="font-bold">GPA:</span> 3.66/4.0 &nbsp;|&nbsp; <span className="font-bold">SAT:</span> 1580 (800 Math, 780 Reading)</li>
                                <li><span className="font-bold">Honors:</span> USACO Platinum, Codeforces Master, Roblox Innovation Awards Top 20</li>
                                <li><span className="font-bold">Clubs:</span> Debate (Founder & Captain), Mock Trial (Founder & Co-President), Computer Science Club (Director of Innovation), Astronomy (VP), Investment (VP), Varsity XC/Track. <em>(Leadership represents 500+ students, ~1/3 of student body).</em></li>
                            </ul>
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1.5 border-b border-black pb-0.5">
                            Experience
                        </h2>

                        <div className="space-y-2.5">

                            {/* Open Source */}
                            <div>
                                <h3 className="font-bold text-[13px] mb-1 border-b border-gray-200 inline-block">Open Source Contributions</h3>
                                <ul className="list-disc list-inside space-y-1 text-black marker:text-black">
                                    <li><Logo src="https://assets.papermc.io/brand/papermc_logo.512.png" alt="PaperMC" /><span className="font-bold">PaperMC:</span> Fixed bugged seeding on 1.21.11 for Folia; contributed patches for cross-region packet handling.</li>
                                    <li><Logo src="/resume/valkey.jfif" alt="Valkey" /><span className="font-bold">Valkey:</span> Improved cluster setup documentation; contributed performance fixes to command parser.</li>
                                    <li><Logo src="/resume/langchain.jfif" alt="LangChain" /><span className="font-bold">LangChain:</span> Added unit tests for experimental chain modules; fixed callback issues in async workflows.</li>
                                    <li><Logo src="/resume/mistral.jfif" alt="Mistral AI" /><span className="font-bold">Mistral AI:</span> Contributed documentation updates and fixes to inference example scripts.</li>
                                </ul>
                            </div>

                            {/* DonutSMP */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]"><Logo src="/resume/donutsmp.png" alt="DonutSMP" />DonutSMP</h3>
                                    <span className="text-[12px] font-semibold">2023 – Present</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Assistant Developer</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Contributed to the <strong>2nd largest Minecraft server ever</strong> (<strong>50k+ concurrent users</strong>, <strong>$3M/yr revenue</strong>, <strong>200M+ views</strong>).</li>
                                    <li>Helped fix critical Folia backend bugs; provided code and feature ideas that were adopted into production.</li>
                                </ul>
                            </div>

                            {/* PlateouMC */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]"><Logo src="/resume/plateoumc.jfif" alt="PlateouMC" />PlateouMC.xyz</h3>
                                    <span className="text-[12px] font-semibold">Sep 2022 – Present</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Founder & Lead Developer</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Scaled network to <strong>$19k revenue</strong> serving <strong>150k+ unique paid users</strong> ($20/account); amassed <strong>19k+ Discord members</strong>.</li>
                                    <li>Directed marketing campaigns generating <strong>1M+ YouTube views</strong>; managed a 400+ person staff team.</li>
                                    <li>Bought Minecraft accounts ($25 each) for low-income players; solo sysadmin using OVH, DragonflyDB, Valkey, and PaperMC/Folia.</li>
                                </ul>
                            </div>

                            {/* JFK Connect */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]">
                                        <span className="inline-block h-4 w-4 mr-1.5 align-text-bottom overflow-hidden rounded-sm">
                                            <img src="/resume/jfkconnect.png" alt="JFK Connect" className="w-full h-full object-cover object-center scale-[1.3] grayscale opacity-90 contrast-125 mix-blend-multiply" />
                                        </span>
                                        JFK Connect
                                    </h3>
                                    <span className="text-[12px] font-semibold">2023 – Present</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Founder & Sole Owner</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Created 300-student mentorship community (20% of school); facilitating 20+ weekly peer study sessions.</li>
                                    <li>Implemented automated role-selection systems for class cohorts and centralized club announcement feeds.</li>
                                </ul>
                            </div>

                            {/* Roblox */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]"><Logo src="/resume/roblox.jfif" alt="Roblox" />Roblox</h3>
                                    <span className="text-[12px] font-semibold">2019 – Aug 2025</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Game Developer</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Generated <strong>$240k gross revenue</strong> across <strong>8 games</strong> (<strong>$70k on one game alone</strong>); created a <strong>Top 10 Roblox Game</strong> (Ranked #4 top-earning, #7 most popular).</li>
                                    <li>Featured by influencers (40M+ subs) and managed 1M+ member communities; achieved <strong>Verified Developer Badge</strong> (Top 0.02%).</li>
                                </ul>
                            </div>

                            {/* US House */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]"><Logo src="/resume/us_house_of_representatives_logo.jfif" alt="US House" />U.S. House of Representatives</h3>
                                    <span className="text-[12px] font-semibold">Sep 2025 – Jan 2026</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Legislative Intern (Rep. Chris Smith)</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Assisted with research on the <strong>TVPA</strong> and <strong>Palermo Protocol</strong> for the Trafficking Department.</li>
                                    <li>Drafted policy memos and handled administrative operations for constituent relations.</li>
                                </ul>
                            </div>

                            {/* MIT CSAIL */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]"><Logo src="/resume/CSAIL_26642.png" alt="MIT" />MIT CSAIL (Kellis Labs)</h3>
                                    <span className="text-[12px] font-semibold">Sep 2025 – Present</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Research Intern</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Assisted with data analysis for computational biology research under Prof. Manolis Kellis.</li>
                                    <li>Processed genomic datasets using Python/R; contributed to deep learning model development for motif discovery.</li>
                                </ul>
                            </div>

                            {/* Princeton */}
                            <div>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-[15px]"><Logo src="/resume/princeton.jfif" alt="Princeton" />Princeton University</h3>
                                    <span className="text-[12px] font-semibold">Jan 2023 – Jun 2023</span>
                                </div>
                                <p className="text-[12px] italic ml-5">Research Intern</p>
                                <ul className="list-disc list-outside ml-10 space-y-1 marker:text-black">
                                    <li>Researched conflict minerals and international policy; engaged 10k+ users through targeted advocacy campaigns in the DRC.</li>
                                </ul>
                            </div>

                        </div>
                    </section>
                </div>
            </div>

            {/* Print Styles */}
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
