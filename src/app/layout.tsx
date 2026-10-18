import type { Metadata, Viewport } from 'next'
import './globals.css'
import RevealProvider from '@/components/RevealProvider'
import SitePopup from '@/components/SitePopup'
import { getSiteScripts } from '@/lib/site-scripts'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://genranq.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'GENRANQ Software LLP — SEO & Website Design Studio',
    template: '%s | GENRANQ',
  },
  description: 'A global SEO and web development studio for ambitious small businesses. We design and build fast, SEO-ready websites and growth systems.',
  keywords: [
    'SEO services',
    'AI search optimization',
    'GEO',
    'generative engine optimization',
    'website development',
    'technical SEO',
    'local SEO',
    'Next.js web design',
    'Google AI Overviews',
    'ChatGPT citations',
    'Perplexity SEO',
    'digital marketing studio',
    'GENRANQ',
  ],
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GENRANQ Software LLP',
  url: BASE,
  logo: `${BASE}/logo.png`,
  description: 'Global SEO, AI Search Optimization, and Custom Web Development Studio.',
  sameAs: [
    'https://twitter.com/genranq',
    'https://www.linkedin.com/company/genranq',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@genranq.com',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GENRANQ',
  url: BASE,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE}/insights?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const scripts = await getSiteScripts()

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Head code snippet (e.g. Google Analytics, Tag Manager head, Search Console verification) */}
        {scripts.head_code ? (
          <script
            id="head-code-snippet"
            dangerouslySetInnerHTML={{ __html: scripts.head_code.replace(/<\/?script[^>]*>/gi, '') }}
          />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        {/* Body code snippet — right after the opening <body> — e.g. Tag Manager’s second snippet */}
        {scripts.body_code ? (
          <div id="body-code-snippet" dangerouslySetInnerHTML={{ __html: scripts.body_code }} />
        ) : null}
        <RevealProvider />
        {children}
        <SitePopup />
        {/* Footer code snippet — at the end of the page, before </body> */}
        {scripts.footer_code ? (
          <div id="footer-code-snippet" dangerouslySetInnerHTML={{ __html: scripts.footer_code }} />
        ) : null}
      </body>
    </html>
  )
}
