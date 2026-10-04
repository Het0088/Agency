import type { Metadata } from 'next'
import HireResourceClient from '../hire-resource/HireResourceClient'
import { hireFaqs } from '../hire-resource/page'
import { buildFaqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Hire Dedicated Developers | Top 1% Engineers — GENRANQ Software LLP',
  description: 'Scale your engineering team with pre-vetted GENRANQ developers. Fast 5-day onboarding, 7-day risk-free trial, dedicated engineers across React, Node, Laravel, Python, and Mobile.',
  alternates: { canonical: 'https://genranq.com/hire-developers' },
}

export default function HireDevelopersPage() {
  const faqSchema = buildFaqSchema(hireFaqs)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HireResourceClient />
    </>
  )
}
