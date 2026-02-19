
import type { Metadata } from 'next'
import './globals.css'
import TransitionProvider from './components/TransitionProvider'
import { bodyFont, displayFont } from './fonts'

export const metadata: Metadata = {
  title: 'Game Hub',
  description: 'Play games when you have free time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white overflow-y-auto">
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  )
}
