import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/web-design')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/get-content'
import WebDesignClient from './WebDesignClient'

export default async function WebDesignPage() {
  const c = await getContent('/services/web-design')

  return (
    <>
      <Topbar
        text={c.topbar_text || 'Websites built for search & conversion from day one.'}
        linkText={c.topbar_link || 'Get free proposal →'}
        linkHref="/contact"
      />
      <Nav active="services" />
      <WebDesignClient content={c} />
      <Footer />
    </>
  )
}
