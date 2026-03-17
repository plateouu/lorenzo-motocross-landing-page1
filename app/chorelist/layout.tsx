import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CHORELIST',
  description: 'Daan family household management.',
}

export default function ChorelistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
