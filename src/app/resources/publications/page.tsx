import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PublicationsClient from './PublicationsClient'
import { getPageMeta } from '@/lib/get-meta'
import { getContent } from '@/lib/get-content'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/resources/publications')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: {
      title: m.og_title,
      description: m.og_description,
      url: m.canonical,
      type: 'website',
      ...(m.og_image ? { images: [{ url: m.og_image }] } : {}),
    },
  }
}

export default async function PublicationsPage() {
  const c = await getContent('/resources/publications')

  return (
    <>
      <Topbar
        text={c.topbar_text || 'New Research: The 2026 Generative Engine Optimization Benchmark Study is live.'}
        linkText={c.topbar_link || 'Download free PDF →'}
        linkHref="/resources/publications"
      />
      <Nav active="resources" />
      <main>
        <PublicationsClient content={c} />
      </main>
      <Footer />
    </>
  )
}

