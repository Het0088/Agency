import type { Metadata } from 'next'
import './globals.css'
import RevealProvider from '@/components/RevealProvider'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://omniranq.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Omniranq \u2014 SEO that drives real revenue',
    template: '%s | Omniranq',
  },
  description: 'A global SEO agency for ambitious small businesses. We use AI-augmented strategy, technical depth, and editorial craft to climb rankings and grow revenue.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE,
    siteName: 'Omniranq',
    title: 'Omniranq \u2014 SEO that drives real revenue',
    description: 'A global SEO agency for ambitious small businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omniranq \u2014 SEO that drives real revenue',
    description: 'A global SEO agency for ambitious small businesses.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: BASE },
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
