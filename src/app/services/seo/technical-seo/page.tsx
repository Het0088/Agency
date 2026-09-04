import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TechnicalSeoClient from './TechnicalSeoClient'
import { getContent } from '@/lib/get-content'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/seo/technical-seo')
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

export default async function TechnicalSeoPage() {
  const content = await getContent('/services/seo/technical-seo')

  return (
    <>
      <Topbar
        text={content.topbar_text || 'Specialist Technical Audit: Surface hidden crawl & Core Web Vitals bottlenecks.'}
        linkText={content.topbar_link || 'Request free audit →'}
        linkHref="#audit-form"
      />
      <Nav active="services" />
      <main>
        <TechnicalSeoClient content={content} />
      </main>
      <Footer />
    </>
  )
}
