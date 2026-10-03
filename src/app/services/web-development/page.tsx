import type { Metadata } from 'next'
import WebDevClient from './WebDevClient'

export const metadata: Metadata = {
  title: 'Website Design & Development Services — GENRANQ Software LLP',
  description: 'Custom websites engineered for speed, conversions, and organic search ranking. Built with Next.js, React, Shopify, and headless architectures.',
  alternates: { canonical: 'https://genranq.com/services/web-development' },
  openGraph: {
    title: 'Website Design & Development Services — GENRANQ Software LLP',
    description: 'Custom websites engineered for speed, conversions, and organic search ranking. Built with Next.js, React, Shopify, and headless architectures.',
    url: 'https://genranq.com/services/web-development',
    type: 'website',
  },
}

export default function WebDevelopmentPage() {
  return <WebDevClient />
}
