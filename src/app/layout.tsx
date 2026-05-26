import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import RevealProvider from '@/components/RevealProvider'

export const metadata: Metadata = {
  title: 'Omniranq — SEO that drives real revenue',
  description: 'A global SEO agency for ambitious small businesses. We use AI-augmented strategy, technical depth, and editorial craft to climb rankings and grow revenue.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body>
        <RevealProvider />
        {children}
      </body>
    </html>
  )
}
