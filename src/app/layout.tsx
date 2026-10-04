import type { Metadata } from 'next'
import './globals.css'
import RevealProvider from '@/components/RevealProvider'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://genranq.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'GENRANQ Software LLP — SEO & Website Design Studio',
    template: '%s | GENRANQ',
  },
  description: 'A global SEO and web development studio for ambitious small businesses. We design and build fast, SEO-ready websites and growth systems.',
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE,
    siteName: 'GENRANQ Software LLP',
    title: 'GENRANQ Software LLP — SEO & Website Design Studio',
    description: 'A global SEO and web development studio for ambitious small businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GENRANQ Software LLP — SEO & Website Design Studio',
    description: 'A global SEO and web development studio for ambitious small businesses.',
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
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <RevealProvider />
        {children}
      </body>
    </html>
  )
}
