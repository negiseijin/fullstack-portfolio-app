import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { JSX } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web',
  description: 'Web',
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
