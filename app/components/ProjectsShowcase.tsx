import React from "react";

export type Project = {
    title: string;
    year?: string;
    role?: string;
    blurb: string;
    tags?: string[];
    href?: string;
};

export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
    return (
        <section id="projects" className="py-24 relative z-10 bg-white/5 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-[1100px] mx-auto px-5">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Showcased Projects</h2>
                <p className="opacity-70 text-lg mb-12 max-w-2xl leading-relaxed">
                    A collection of high-performance ecosystems and scalable infrastructure built end-to-end.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((p) => (
                        <a
                            key={p.title}
                            href={p.href || "#"}
                            className="group block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-md"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold font-display group-hover:text-yellow-400 transition-colors">{p.title}</h3>
                                <span className="text-sm font-mono opacity-60 border border-white/20 px-2 py-1 rounded-full">{p.year}</span>
                            </div>

                            {p.role && <div className="text-sm uppercase tracking-wider opacity-60 mb-3">{p.role}</div>}

                            <p className="opacity-80 leading-relaxed mb-6">
                                {p.blurb}
                            </p>

                            {p.tags && p.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs font-mono font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full opacity-70"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
