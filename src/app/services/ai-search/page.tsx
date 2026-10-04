import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/ai-search')
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
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'
import { getContent } from '@/lib/get-content'
import { buildFaqSchema } from '@/lib/schema'

export default async function AiSearchPage() {
  const c = await getContent('/services/ai-search')

  const cards = [
    { num: '01', slug: 'chatgpt', title: c.card_1_title, tagline: c.card_1_tagline, desc: c.card_1_desc, highlights: (c.card_1_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_1_result },
    { num: '02', slug: 'google-aio', title: c.card_2_title, tagline: c.card_2_tagline, desc: c.card_2_desc, highlights: (c.card_2_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_2_result },
    { num: '03', slug: 'gemini', title: c.card_3_title, tagline: c.card_3_tagline, desc: c.card_3_desc, highlights: (c.card_3_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_3_result },
    { num: '04', slug: 'perplexity', title: c.card_4_title, tagline: c.card_4_tagline, desc: c.card_4_desc, highlights: (c.card_4_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_4_result },
  ]

  const faqItems = [
    {
      q: 'What is Generative Engine Optimization (GEO) and how does it differ from traditional SEO?',
      a: 'Traditional SEO focuses on earning ranking positions on search result pages. GEO (Generative Engine Optimization) optimizes your brand\'s digital entities, authoritative mentions, and semantic relationships so conversational models like ChatGPT, Perplexity, Google AI Overviews, and Gemini actively cite and recommend your brand when prospective customers ask open-ended questions.',
    },
    {
      q: 'How do you get our brand cited in ChatGPT, Perplexity, and Google AI Overviews?',
      a: 'We execute a three-part framework: (1) Knowledge Graph entity reconciliation across trusted registries and databases; (2) High-tier digital PR and authoritative editorial placements that LLM training corpora ingest; and (3) Re-architecting on-site content into citable data structures and schema markup that real-time retrieval-augmented generation (RAG) engines index.',
    },
    {
      q: 'How long does it take to see citations appear in AI search responses?',
      a: 'Answer engines utilizing live web retrieval (like Perplexity and Google AI Overviews) can start citing newly optimized, authoritative pages within 2 to 4 weeks. Offline base models reflect brand authority during weight updates. We benchmark and track your brand citations monthly across 50+ industry-specific prompts.',
    },
    {
      q: 'Can you monitor and correct brand hallucinations or inaccuracies in LLMs?',
      a: 'Yes. We run synthetic prompt testing across multiple AI models to audit what they say about your products, pricing, and leadership. When inaccurate data or hallucinations are detected, we publish authoritative structured corrections and earn high-authority citations to steer the model\'s consensus.',
    },
    {
      q: 'Will AI search cannibalize our traditional organic website traffic?',
      a: 'While top-of-funnel definitions are increasingly answered directly in AI summaries, commercial queries that require decisions, purchases, and quotes still generate massive click-through traffic. Brands cited prominently inside AI summaries earn the highest-trust, highest-converting visitors.',
    },
    {
      q: 'Do you offer GEO as a standalone service or integrated with SEO?',
      a: 'Both. We offer specialized GEO sprints focused entirely on LLM entity engineering, or fully integrated GEO programs included as a standard pillar in all GENRANQ SEO retainers.',
    },
  ]

  const faqSchema = buildFaqSchema(faqItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar text={c.topbar_text} linkText={c.topbar_link} linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / AI Search &amp; GEO</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split('people trust.')[0]}<em>people trust.</em></h1>
              <p className="svc-page-hero-desc">{c.hero_desc}</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">{c.hero_cta1} <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">{c.hero_cta2}</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat1_num}</span><span className="svc-page-stat-label">{c.hero_stat1_label}</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat2_num}</span><span className="svc-page-stat-label">{c.hero_stat2_label}</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat3_num}</span><span className="svc-page-stat-label">{c.hero_stat3_label}</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat4_num}</span><span className="svc-page-stat-label">{c.hero_stat4_label}</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>{c.sec_heading?.split('one strategy.')[0]}<em>one strategy.</em></h2>
            <p className="sub">{c.sec_sub}</p>
          </div>
          <ServiceCards category="ai-search" items={cards} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">AI Search FAQs</span>
            <h2>Frequently asked questions about <em>AI Search &amp; GEO.</em></h2>
            <p className="sub">How we position your brand to win recommendations across LLMs and generative search engines.</p>
          </div>
          <div className="faq-list reveal">
            {faqItems.map((item, i) => (
              <details className="faq" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BigCta heading={c.cta_heading} em={c.cta_em} text={c.cta_text} btnText={c.cta_btn} btnHref="/contact" />
      <Footer />
    </>
  )
}

