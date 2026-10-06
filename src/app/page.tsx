import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'
import { buildFaqSchema } from '@/lib/schema'
import HomeClient from './HomeClient'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/')
  return {
    title: { absolute: m.title || 'GENRANQ — SEO & AI Search Studio' },
    description: m.description || 'GENRANQ Software LLP — SEO, local, technical and AI search (GEO) for small businesses.',
    alternates: { canonical: m.canonical || 'https://genranq.com' },
    openGraph: {
      title: m.og_title || 'GENRANQ — SEO & AI Search Studio',
      description: m.og_description || 'GENRANQ Software LLP — SEO, local, technical and AI search (GEO) for small businesses.',
      url: m.canonical || 'https://genranq.com',
      type: 'website',
      ...(m.og_image ? { images: [{ url: m.og_image }] } : {}),
    },
  }
}

const homeFaqs = [
  {
    q: 'How long until we see results?',
    a: 'Technical and on-page fixes usually show movement in 4–8 weeks. Meaningful traffic and revenue growth typically lands between months 3 and 6, compounding from there.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes — we’ve grown brands across 42 countries. Strategy calls run on your time zone and reporting is in your currency.',
  },
  {
    q: 'What does a retainer cost?',
    a: 'Pricing depends on scope and competition. After the free audit we send a fixed monthly quote — no hidden fees, no surprise add-ons.',
  },
  {
    q: 'What is GEO and do I need it?',
    a: 'Generative Engine Optimization makes your brand show up inside AI answers from ChatGPT, Perplexity, and Google AI Overviews. If your customers research before buying, you need it.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'After the first 90 days, everything is month-to-month. You keep all work, content, and dashboards if you leave.',
  },
]

import { getAllPublishedPosts } from '@/lib/posts'

export default async function Home() {
  const faqSchema = buildFaqSchema(homeFaqs)

  let articles: any[] = []
  let blogs: any[] = []

  try {
    const allPosts = await getAllPublishedPosts(20)
    articles = allPosts
      .filter(p => p.type === 'article')
      .slice(0, 3)
      .map((p, i) => ({
        id: p.id,
        num: String(i + 1).padStart(2, '0'),
        cat: p.tag || 'AI Search',
        title: p.title,
        desc: p.description,
        author: p.author || 'Tomas Beltran',
        date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        read: p.read_time || '10 min',
        slug: p.slug.startsWith('/') ? p.slug : `/insights/${p.slug}`,
      }))

    blogs = allPosts
      .filter(p => p.type === 'blog' || p.type === 'news')
      .slice(0, 3)
      .map((p, i) => ({
        id: p.id,
        num: String(i + 1).padStart(2, '0'),
        cat: p.tag || 'Editorial',
        title: p.title,
        desc: p.description,
        author: p.author || 'Marisol Acevedo',
        date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        read: p.read_time || '12 min',
        slug: p.slug.startsWith('/') ? p.slug : `/insights/${p.slug}`,
      }))
  } catch {}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient articles={articles} blogs={blogs} />
    </>
  )
}
