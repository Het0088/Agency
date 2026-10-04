import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/link-building')
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

export default async function LinkBuildingPage() {
  const c = await getContent('/services/link-building')

  const cards = [
    { num: '01', slug: 'digital-pr', title: c.card_1_title, tagline: c.card_1_tagline, desc: c.card_1_desc, highlights: (c.card_1_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_1_result },
    { num: '02', slug: 'guest-posting', title: c.card_2_title, tagline: c.card_2_tagline, desc: c.card_2_desc, highlights: (c.card_2_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_2_result },
    { num: '03', slug: 'outreach', title: c.card_3_title, tagline: c.card_3_tagline, desc: c.card_3_desc, highlights: (c.card_3_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_3_result },
  ]

  const linkFaqs = [
    {
      q: 'How do your link building methods protect our domain from Google algorithmic penalties?',
      a: 'We execute 100% white-hat, manual digital PR and editorial outreach. We never use private blog networks (PBNs), automated forum submissions, comment spam, or link farms. Every backlink is earned in-context within genuine, high-authority publications with real organic traffic and human editorial oversight.',
    },
    {
      q: 'What metrics do you use to evaluate and qualify referring domains?',
      a: 'We look far beyond vanity Domain Rating (DR) or Domain Authority (DA). We rigorously evaluate real organic search traffic trends via Ahrefs and Semrush, topical relevance to your industry, geographic audience match, historical spam score, and editorial indexing health.',
    },
    {
      q: 'What happens if an earned link is removed or changed to nofollow?',
      a: 'We provide a comprehensive 12-month link replacement warranty. If any placed editorial link is removed, redirected, or altered within 365 days of acquisition, our outreach team replaces it with an equivalent or higher-tier authoritative placement at zero additional cost.',
    },
    {
      q: 'Can we review and approve publisher prospect lists and content before publication?',
      a: 'Yes. We maintain complete operational transparency. You have access to our live outreach dashboard where you can pre-approve target publication domains, content outlines, and planned anchor text strategies before any outreach email is dispatched.',
    },
    {
      q: 'How do you determine anchor text distribution and target page allocation?',
      a: 'We model an anchor text portfolio based on natural competitor distributions in your industry (blending branded, exact-match, partial-match, and natural URL anchors). We prioritize bottom-of-funnel commercial assets and foundational guide pages to distribute link equity where it directly impacts revenue.',
    },
    {
      q: 'What timeframe is needed before link acquisition translates into organic ranking gains?',
      a: 'Search engines typically crawl, index, and recalculate PageRank across authoritative referring domains within 3 to 8 weeks. In competitive verticals, continuous compound link acquisition over a 90-to-180 day cycle is standard for capturing top 3 keyword positions.',
    },
  ]

  const faqSchema = buildFaqSchema(linkFaqs)

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
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Link Building</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split('the needle.')[0]}<em>the needle.</em></h1>
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
            <h2>{c.sec_heading?.split('zero shortcuts.')[0]}<em>zero shortcuts.</em></h2>
            <p className="sub">{c.sec_sub}</p>
          </div>
          <ServiceCards category="link-building" items={cards} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Link Acquisition FAQs</span>
            <h2>Frequently asked questions about <em>link building &amp; PR.</em></h2>
            <p className="sub">How we secure genuine, high-authority editorial placements that pass real PageRank and protect your domain reputation.</p>
          </div>
          <div className="faq-list reveal">
            {linkFaqs.map((item, i) => (
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
