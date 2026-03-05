"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Meal Prep", href: "/workout" },
  { label: "Gym Plan", href: "/workout/gym" },
];

export default function WorkoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen text-[#e8e8e8] selection:bg-[#ff7600] selection:text-black"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: "#0a0a0a" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl" style={{ background: "rgba(10,10,10,0.8)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/workout" className="text-xl font-extrabold tracking-tight text-[#ff7600]">
            J&T
          </Link>
          <div className="flex gap-1 rounded-full bg-white/5 p-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-[#ff7600] text-black shadow-lg shadow-[#ff7600]/20"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
