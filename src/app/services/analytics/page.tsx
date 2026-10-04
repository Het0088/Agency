import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/analytics')
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

export default async function AnalyticsPage() {
  const c = await getContent('/services/analytics')

  const cards = [
    { num: '01', slug: 'tracking', title: c.card_1_title, tagline: c.card_1_tagline, desc: c.card_1_desc, highlights: (c.card_1_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_1_result },
    { num: '02', slug: 'dashboards', title: c.card_2_title, tagline: c.card_2_tagline, desc: c.card_2_desc, highlights: (c.card_2_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_2_result },
    { num: '03', slug: 'cro', title: c.card_3_title, tagline: c.card_3_tagline, desc: c.card_3_desc, highlights: (c.card_3_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_3_result },
  ]

  const analyticsFaqs = [
    {
      q: 'How do you configure Google Analytics 4 (GA4) to ensure accurate conversion tracking?',
      a: 'We implement GA4 through server-side Google Tag Manager (sGTM) and first-party domain endpoints to mitigate data loss from ad-blockers and iOS privacy restrictions. We configure custom purchase, lead, and micro-conversion events, custom dimensions, and user-ID reconciliation.',
    },
    {
      q: 'Can you set up automated BigQuery data warehousing for our marketing stack?',
      a: 'Yes. We configure the native GA4-to-BigQuery raw event streaming export, join it with your CRM, payment gateways (Stripe/Shopify), and ad spend data (Google/Meta), and build automated SQL data transformation pipelines so you have complete data ownership without sampling limits.',
    },
    {
      q: 'What reporting dashboards do you build (Looker Studio, PowerBI, custom)?',
      a: 'We build interactive, executive-ready dashboards in Looker Studio and PowerBI tailored to your leadership and marketing teams. Dashboards feature real-time blended CAC, ROAS by channel, organic keyword rankings, sales pipeline velocity, and conversion funnel drop-off diagnostics.',
    },
    {
      q: 'How do your Conversion Rate Optimization (CRO) audits identify leaks in our funnel?',
      a: 'We combine quantitative analytics (session recordings, drop-off paths, scroll heatmaps) with heuristic usability evaluations across mobile and desktop. We identify friction points in checkout, form submission, and product consideration, then prioritize fixes using the ICE (Impact, Confidence, Ease) scoring matrix.',
    },
    {
      q: 'How do you approach multi-touch attribution across complex buying cycles?',
      a: 'Modern customer journeys touch multiple organic, paid, social, and direct channels before converting. We implement data-driven attribution models in GA4 and marketing mix modeling (MMM) to credit the exact touchpoints driving initial awareness, consideration, and final conversion.',
    },
    {
      q: 'Are your analytics implementations compliant with GDPR, CCPA, and global privacy laws?',
      a: 'Yes. We configure Google Consent Mode v2, cookie consent management platforms (OneTrust, Cookiebot), and IP anonymization to ensure your tracking meets strict EU GDPR and California CCPA standards without losing conversion modeling signals.',
    },
  ]

  const faqSchema = buildFaqSchema(analyticsFaqs)

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
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Analytics &amp; CRO</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split("what doesn't.")[0]}<em>{"what doesn't."}</em></h1>
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
            <h2>{c.sec_heading?.split('total clarity.')[0]}<em>total clarity.</em></h2>
            <p className="sub">{c.sec_sub}</p>
          </div>
          <ServiceCards category="analytics" items={cards} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Analytics &amp; Intelligence FAQs</span>
            <h2>Frequently asked questions about <em>analytics &amp; CRO.</em></h2>
            <p className="sub">How we turn raw click streams into trustworthy attribution, clean dashboards, and conversion lift.</p>
          </div>
          <div className="faq-list reveal">
            {analyticsFaqs.map((item, i) => (
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

