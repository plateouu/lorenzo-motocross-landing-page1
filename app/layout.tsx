import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import './globals.css'


const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-serif' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Taylor Daan - Portfolio',
  description: 'Student First. Developer Second.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${manrope.variable} font-sans bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}
