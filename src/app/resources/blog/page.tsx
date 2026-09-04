import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blog & SEO Playbooks',
  description: 'In-depth tactical guides, playbooks, and teardowns on modern SEO, AI search, and GEO.',
  alternates: { canonical: 'https://genranq.com/insights' },
}

export default function ResourcesBlogPage() {
  redirect('/insights')
}
