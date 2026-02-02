import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Desmos | Graphing Calculator",
  description: "Explore math with our beautiful, free online graphing calculator. Graph functions, plot data, evaluate equations, explore transformations, and much more.",
  icons: {
    icon: "/desmos/favicon.ico",
    shortcut: "/desmos/favicon.ico",
    apple: "/desmos/apple-touch-icon.png",
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
