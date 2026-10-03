import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'
import WebDevClient from './services/web-development/WebDevClient'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/')
  return {
    title: { absolute: m.title || 'GENRANQ Software LLP — Website Design & Development Studio' },
    description: m.description || 'GENRANQ designs and builds fast, SEO-ready websites that turn visitors into customers on WordPress, Shopify, Next.js, or fully custom.',
    alternates: { canonical: m.canonical || 'https://genranq.com' },
    openGraph: {
      title: m.og_title || 'GENRANQ Software LLP — Website Design & Development Studio',
      description: m.og_description || 'GENRANQ designs and builds fast, SEO-ready websites that turn visitors into customers on WordPress, Shopify, Next.js, or fully custom.',
      url: m.canonical || 'https://genranq.com',
      type: 'website',
      ...(m.og_image ? { images: [{ url: m.og_image }] } : {}),
    },
  }
}

export default function Home() {
  return <WebDevClient />
}
