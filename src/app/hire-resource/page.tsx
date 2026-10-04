import type { Metadata } from 'next'
import HireResourceClient from './HireResourceClient'
import { buildFaqSchema } from '@/lib/schema'

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

export const hireFaqs = [
  {
    q: 'How does the 7-day risk-free developer trial work?',
    a: 'When you select an engineer, they integrate directly into your sprint on day one. If at any point during the first 7 business days you are not completely satisfied with their velocity, code quality, or communication, you owe nothing — we either provide an immediate replacement or terminate the engagement with zero charge.',
  },
  {
    q: 'How do you screen and vet developers before presenting them?',
    a: 'Only the top 1% of applicants join our dedicated engineering benches. Every developer passes a 4-stage evaluation: technical English communication, live pair-programming and architecture challenge, practical framework tests in Next.js, Node, Laravel, Python, or Mobile, and reference verification.',
  },
  {
    q: 'Can we interview candidates before making a hiring decision?',
    a: 'Yes. We present 2 to 3 thoroughly vetted profiles matching your exact tech stack and seniority needs within 48 hours. You conduct live technical interviews, code walk-throughs, or trial tasks — completely free and with no commitment.',
  },
  {
    q: 'How do developers handle time-zone alignment with US, UK, and European teams?',
    a: 'Our developers provide a guaranteed 4 to 5 hours of direct workday overlap with your team across North American (EST/PST), European (GMT/CET), or Australian (AEST) hours, joining your daily standups and live Slack discussions.',
  },
  {
    q: 'What happens if we need to scale up or down as project demands change?',
    a: 'You maintain complete flexibility. You can add more developers to meet tight deadlines or ramp down with simple 15-day written notice, switching between hourly, half-time, and dedicated full-time models.',
  },
  {
    q: 'Who owns the source code, Git commits, and intellectual property?',
    a: 'You do — 100%. Prior to project kickoff, we sign a strict Mutual NDA and comprehensive IP Assignment Agreement. All source code, pull requests, documentation, and architecture belong exclusively to your business.',
  },
  {
    q: 'How do we manage daily work, track hours, and communicate?',
    a: 'Your hired developers plug seamlessly into your existing engineering ecosystem (Jira, Linear, GitHub, GitLab, Slack, Teams) and participate directly in your sprint rituals and code reviews.',
  },
  {
    q: 'What happens if a developer is sick or we request a replacement?',
    a: 'If an engineer takes extended leave or if you ever feel a different skill profile is required, our engineering director provides a pre-vetted replacement with zero interruption to your project roadmap through structured knowledge handover.',
  },
]

export default function HireResourcePage() {
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
