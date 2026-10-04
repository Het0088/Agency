import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import TechnicalSeoClient from './TechnicalSeoClient'
import { getContent } from '@/lib/get-content'
import { getPageMeta } from '@/lib/get-meta'
import { buildFaqSchema } from '@/lib/schema'

export const technicalSeoFaqs = [
  {
    q: 'What is included in a forensic technical SEO audit?',
    a: 'Our forensic audit evaluates 200+ technical checkpoints: server response times, render-tree bottlenecks, JavaScript hydration issues, internal PageRank distribution, canonical tag integrity, XML sitemap validation, Core Web Vitals (LCP, INP, CLS) field data, and AI search entity disambiguation.',
  },
  {
    q: 'How do you diagnose and fix JavaScript rendering issues on modern SPAs?',
    a: 'We analyze Googlebot web rendering service (WRS) snapshots using dynamic rendering and server-side rendering (SSR/SSG/ISR) profiling. We ensure critical DOM content, schema, and internal links render before client-side hydration timeouts occur.',
  },
  {
    q: 'Do your technical SEO engineers implement code changes directly in our repository?',
    a: 'Yes. Unlike traditional agencies that only deliver PDF recommendations, our in-house engineers create branches, test fixes in your staging environment, and open clean GitHub, GitLab, or Bitbucket pull requests ready for review.',
  },
  {
    q: 'How quickly do Core Web Vitals improvements impact Google rankings?',
    a: 'Google calculates Core Web Vitals using a 28-day rolling window of Chrome User Experience Report (CrUX) field data. Once our front-end performance optimizations are deployed to production, Google re-indexes passing thresholds within 3 to 4 weeks, improving ranking signals and reducing bounce rates.',
  },
  {
    q: 'How do you optimize crawl budget for large-scale websites (100k+ pages)?',
    a: 'We analyze server access log files to discover crawl traps, infinite facet loops, orphan pages, and parameter bloat. We implement strict robots.txt directives, self-referencing canonicals, HTTP cache-control headers, and optimized XML sitemap index clustering to force search engines to focus on high-converting URLs.',
  },
  {
    q: 'What is your process for zero-traffic-loss website migrations?',
    a: 'We create comprehensive 1:1 URL redirect maps, preserve legacy metadata and internal linking structures, test DNS cutovers in private staging environments, and run automated crawl regression tests immediately post-launch to catch 404s and redirect loops before they harm rankings.',
  },
]

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

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://genranq.com' },
      { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://genranq.com/services/seo' },
      { '@type': 'ListItem', position: 3, name: 'Technical SEO', item: 'https://genranq.com/services/seo/technical-seo' },
    ],
  }

  const faqSchema = buildFaqSchema(technicalSeoFaqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
