import type { Metadata } from 'next'
import HireResourceClient from './HireResourceClient'

export const metadata: Metadata = {
  title: 'Hire Dedicated Developers | Pre-Vetted Engineers — GENRANQ Software LLP',
  description: 'Hire dedicated Laravel, React, Node.js, Python, Shopify, and full-stack developers. Pre-vetted, English-fluent engineers who ship from week one with a 7-day risk-free trial.',
  alternates: { canonical: 'https://genranq.com/hire-resource' },
  openGraph: {
    title: 'Hire Dedicated Developers | Pre-Vetted Engineers — GENRANQ Software LLP',
    description: 'Hire dedicated Laravel, React, Node.js, Python, Shopify, and full-stack developers. Pre-vetted, English-fluent engineers who ship from week one with a 7-day risk-free trial.',
    url: 'https://genranq.com/hire-resource',
    type: 'website',
  },
}

export default function HireResourcePage() {
  return <HireResourceClient />
}
