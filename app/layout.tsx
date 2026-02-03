import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from './LenisProvider'
import TransitionProvider from './components/TransitionProvider'
import CustomCursor from './components/CustomCursor'
import { bodyFont, displayFont } from './fonts'

export const metadata: Metadata = {
  title: 'Taylor Daan | Systems Engineer',
  description: 'Infrastructure met Imagination. High-end game ecosystems and scalable server architecture.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="font-sans antialiased bg-[#F4F3EC] text-[#221F21] selection:bg-[#ff4d00] selection:text-white">
        <LenisProvider>
          <TransitionProvider>
            <CustomCursor />
            {children}
          </TransitionProvider>
        </LenisProvider>
      </body>
    </html>
  )
}
