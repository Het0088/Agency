import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/content-marketing')
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

export default async function ContentMarketingPage() {
  const c = await getContent('/services/content-marketing')

  const cards = [
    { num: '01', slug: 'seo-writing', title: c.card_1_title, tagline: c.card_1_tagline, desc: c.card_1_desc, highlights: (c.card_1_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_1_result },
    { num: '02', slug: 'blog-management', title: c.card_2_title, tagline: c.card_2_tagline, desc: c.card_2_desc, highlights: (c.card_2_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_2_result },
    { num: '03', slug: 'copywriting', title: c.card_3_title, tagline: c.card_3_tagline, desc: c.card_3_desc, highlights: (c.card_3_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_3_result },
    { num: '04', slug: 'email-marketing', title: c.card_4_title, tagline: c.card_4_tagline, desc: c.card_4_desc, highlights: (c.card_4_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_4_result },
  ]

  const contentFaqs = [
    {
      q: 'How do you vet and select subject-matter expert writers for technical industries?',
      a: 'We assign niche-specialized writers with documented industry backgrounds (SaaS, FinTech, Healthcare, B2B services). Every piece undergoes technical verification, editor sign-off, and review against your internal style guide and product positioning before submission.',
    },
    {
      q: "What is GENRANQ's policy on AI-generated content versus human writing?",
      a: 'We enforce a human-first editorial standard. While we utilize AI tools for preliminary research aggregation, keyword gap discovery, and outline structuring, all published narratives, case studies, technical explanations, and brand messaging are written, fact-checked, and edited 100% by human subject-matter experts.',
    },
    {
      q: 'How do you balance SEO ranking intent with actual commercial conversion copywriting?',
      a: 'High rankings are worthless if visitors bounce. Every article is engineered with a dual purpose: answering primary search intent with authoritative data while weaving strategic contextual conversion points, interactive calculators, case study callouts, and tailored lead magnets directly into the copy.',
    },
    {
      q: 'How often do you audit and refresh decaying or underperforming historical content?',
      a: 'As part of our content management retainers, we conduct quarterly content decay audits using Google Search Console and GA4. We update outdated statistics, expand thin sections, add modern schema markup, and re-optimize titles and headers to recapture lost organic search visibility.',
    },
    {
      q: 'Do you handle CMS formatting, graphic design, and publishing directly?',
      a: 'Yes. Our content deliverables include custom branded vector illustrations, charts, featured hero imagery, formatted meta tags, and internal link routing. We draft and schedule directly within your CMS (WordPress, Webflow, Contentful, Ghost, Shopify, or Git-based headless setups).',
    },
    {
      q: 'What cadence and content volume do you recommend for meaningful traffic growth?',
      a: 'Most competitive verticals require an initial velocity of 4 to 8 deeply researched long-form articles (1,800–3,500 words each) per month. For enterprise sites or high-urgency programmatic expansions, we configure specialized editorial pods scaling up to 20+ articles monthly without compromising editorial standards.',
    },
  ]

  const faqSchema = buildFaqSchema(contentFaqs)

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
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Content</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split('trust, and traffic.')[0]}<em>trust, and traffic.</em></h1>
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
            <h2>{c.sec_heading?.split('one voice.')[0]}<em>one voice.</em></h2>
            <p className="sub">{c.sec_sub}</p>
          </div>
          <ServiceCards category="content-marketing" items={cards} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Content Strategy FAQs</span>
            <h2>Frequently asked questions about <em>content marketing.</em></h2>
            <p className="sub">How our editorial pods produce authoritative, revenue-focused content engineered for organic discovery and conversion.</p>
          </div>
          <div className="faq-list reveal">
            {contentFaqs.map((item, i) => (
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
