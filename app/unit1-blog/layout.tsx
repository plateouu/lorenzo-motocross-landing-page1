import type { Metadata } from "next";
import { space, outfit } from "./fonts";
import Navigation from "./components/Navigation";
import TransitionProvider from "./components/TransitionProvider";

export const metadata: Metadata = {
  title: "overthinking out loud.",
  description: "A blog by Taylor Daan about language, identity, and the moments we almost ignore.",
};

export default function Unit1BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${space.variable} ${outfit.variable} min-h-screen antialiased flex`}
      style={{
        fontFamily: "var(--font-outfit)",
      }}
    >
      <TransitionProvider>
        <Navigation />
        <main className="flex-1 min-w-0">{children}</main>
      </TransitionProvider>
    </div>
  );
}
