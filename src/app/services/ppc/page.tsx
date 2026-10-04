import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/ppc')
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

export default async function PpcPage() {
  const c = await getContent('/services/ppc')

  const cards = [
    { num: '01', slug: 'google-ads', title: c.card_1_title, tagline: c.card_1_tagline, desc: c.card_1_desc, highlights: (c.card_1_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_1_result },
    { num: '02', slug: 'meta-ads', title: c.card_2_title, tagline: c.card_2_tagline, desc: c.card_2_desc, highlights: (c.card_2_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_2_result },
    { num: '03', slug: 'youtube-ads', title: c.card_3_title, tagline: c.card_3_tagline, desc: c.card_3_desc, highlights: (c.card_3_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_3_result },
    { num: '04', slug: 'programmatic', title: c.card_4_title, tagline: c.card_4_tagline, desc: c.card_4_desc, highlights: (c.card_4_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_4_result },
  ]

  const ppcFaqs = [
    {
      q: 'How do you manage our ad spend and prevent budget waste?',
      a: 'We run weekly negative keyword sweeps, implement automated click-fraud mitigation tools, and establish strict day-parting and audience exclusion rules. We continuously shift budget away from underperforming queries and direct it into bottom-of-funnel, high-converting terms to maximize ROAS.',
    },
    {
      q: 'Do we pay ad spend to GENRANQ or directly to Google and Meta?',
      a: 'You pay media spend directly to advertising networks (Google Ads, Meta, YouTube, LinkedIn) via your own corporate payment methods. You maintain 100% account ownership. GENRANQ charges a transparent flat or tiered monthly management fee with zero hidden percentage markups.',
    },
    {
      q: 'What return on ad spend (ROAS) can we realistically expect?',
      a: 'Target ROAS depends on your average order value (AOV) and customer lifetime value (LTV). For e-commerce stores, we typically target and deliver 3.5× to 6.0× blended ROAS. For B2B lead generation, we benchmark cost-per-qualified-lead (CPL) and focus on sales pipeline velocity rather than vanity clicks.',
    },
    {
      q: 'Do you create ad copy, visual assets, and landing pages?',
      a: 'Yes. Our creative team produces high-converting ad copy, responsive display banners, video scripts, and custom high-speed landing pages engineered for conversion rate optimization. If you have an internal brand team, we collaborate closely to adhere to your brand guidelines.',
    },
    {
      q: 'How do your PPC and SEO strategies support each other?',
      a: 'PPC and SEO generate powerful compounding intelligence. High-converting paid search search terms reveal immediate keyword targets for our SEO content clusters, while high-ranking organic pages improve Google Ads Quality Scores, lowering your average cost-per-click (CPC).',
    },
    {
      q: 'Are your PPC management agreements month-to-month?',
      a: 'Yes. Following an initial 60-day strategic onboarding and learning cycle, all PPC management agreements are strictly month-to-month. You can scale budgets up during peak seasonality or adjust campaign focuses with 15 days notice.',
    },
  ]

  const faqSchema = buildFaqSchema(ppcFaqs)

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
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / PPC &amp; Paid Media</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split('pays back.')[0]}<em>pays back.</em></h1>
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
            <h2>{c.sec_heading?.split('one dashboard.')[0]}<em>one dashboard.</em></h2>
            <p className="sub">{c.sec_sub}</p>
          </div>
          <ServiceCards category="ppc" items={cards} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Paid Search &amp; Media FAQs</span>
            <h2>Frequently asked questions about <em>PPC management.</em></h2>
            <p className="sub">How we manage ad spend, optimize conversion funnels, and deliver measurable return on capital.</p>
          </div>
          <div className="faq-list reveal">
            {ppcFaqs.map((item, i) => (
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

