import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Analytics & CRO Services — Conversion Optimization, A/B Testing & Dashboards | Omniranq',
  description: 'Turn traffic into revenue. CRO audits, A/B testing, and custom reporting dashboards that show you exactly where money is being left on the table.',
}

const subServices = [
  {
    id: 'cro-audits',
    num: '01',
    title: 'CRO Audits',
    tagline: 'Find where you are losing money.',
    desc: 'A comprehensive conversion rate optimization audit that identifies friction points, drop-off patterns, and missed opportunities across your entire conversion funnel. Delivered as a prioritized action plan.',
    features: [
      'Full-funnel conversion analysis (awareness to purchase)',
      'Heatmap and session recording analysis',
      'Form and checkout flow friction identification',
      'Mobile vs. desktop conversion gap analysis',
      'Landing page effectiveness scoring',
      'User behavior flow mapping with drop-off identification',
      'Competitor conversion experience benchmarking',
      'Prioritized recommendations with expected impact estimates',
    ],
    result: 'Average 27% conversion rate improvement from audit recommendations.',
  },
  {
    id: 'ab-testing',
    num: '02',
    title: 'A/B Testing',
    tagline: 'Data-driven decisions, not opinions.',
    desc: 'We design, implement, and analyze A/B tests that generate statistically significant results. Every test is hypothesis-driven, properly powered, and measured against revenue outcomes.',
    features: [
      'Hypothesis development based on data and user research',
      'Test design with proper statistical power calculations',
      'Implementation on Google Optimize, VWO, or Optimizely',
      'Multivariate testing for complex page elements',
      'Revenue-based success metrics (not just clicks)',
      'Post-test analysis with actionable recommendations',
      'Testing roadmap with quarterly planning',
      'Knowledge base documentation of all test results',
    ],
    result: 'Average 4.2 winning tests per quarter per client.',
  },
  {
    id: 'dashboards',
    num: '03',
    title: 'Reporting Dashboards',
    tagline: 'See everything. Understand everything.',
    desc: 'Custom-built dashboards that connect your marketing data to business outcomes. Revenue attribution, channel performance, and ROI tracking in one place, updated in real time.',
    features: [
      'Custom Looker Studio dashboards with real-time data',
      'GA4 setup, migration, and event tracking configuration',
      'Revenue attribution modeling (first-touch, last-touch, multi-touch)',
      'Channel performance comparison with ROI calculations',
      'Goal and conversion tracking setup across all channels',
      'Monthly automated reporting with executive summaries',
      'Data warehouse integration for enterprise clients',
      'Team training on dashboard usage and interpretation',
    ],
    result: 'Clients save avg. 12 hours per month on reporting tasks.',
  },
]

const faqItems = [
  { q: 'What tools do you use for CRO?', a: 'We use Hotjar and Microsoft Clarity for heatmaps and recordings, Google Optimize or VWO for A/B testing, and GA4 with Looker Studio for analytics and reporting. We recommend tools based on your needs and budget.' },
  { q: 'How long does an A/B test need to run?', a: 'Most tests need 2-4 weeks to reach statistical significance, depending on your traffic volume. We never call a test early. Proper statistical rigor is non-negotiable.' },
  { q: 'Can you fix our Google Analytics setup?', a: 'Yes. GA4 migration and configuration is one of our most common requests. We audit your existing setup, fix tracking gaps, configure custom events, and build dashboards that actually answer your business questions.' },
  { q: 'What is revenue attribution?', a: 'Revenue attribution connects marketing activities to actual revenue. Instead of measuring clicks and impressions, we track which channels, campaigns, and content pieces generate paying customers and how much each is worth.' },
]

export default function AnalyticsPage() {
  return (
    <>
      <Topbar text="Know exactly what drives revenue." linkText="Get a dashboard demo \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Analytics &amp; CRO</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Analytics &amp; CRO</span>
              <h1>Turn traffic into <em>revenue.</em></h1>
              <p className="svc-page-hero-desc">CRO audits, A/B testing, and custom reporting dashboards. We show you exactly where money is being left on the table, then help you capture it.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a CRO audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#cro-audits" className="btn btn-ghost">See our services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">27%</span><span className="svc-page-stat-label">Avg. conversion rate improvement</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">4.2</span><span className="svc-page-stat-label">Winning tests per quarter</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">12hrs</span><span className="svc-page-stat-label">Saved on reporting per month</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">100%</span><span className="svc-page-stat-label">Revenue-based measurement</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal"><h2>Three services, <em>one goal: revenue.</em></h2><p className="sub">Every metric we track connects to money. Not vanity numbers.</p></div>
          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head"><span className="svc-detail-num">{svc.num}</span><div><h3>{svc.title}</h3><p className="svc-detail-tagline">{svc.tagline}</p></div></div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">{svc.features.map((f) => (<div className="svc-detail-feature" key={f}><span className="svc-detail-dot" />{f}</div>))}</div>
              <div className="svc-detail-result"><span className="svc-detail-result-icon">&uarr;</span> {svc.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta"><div className="wrap"><div className="mid-cta-inner mid-cta-dark reveal"><div className="mid-cta-text"><h3>Not sure what your data is telling you?</h3><p>We will review your analytics setup for free and show you what you are missing.</p></div><Link href="/contact" className="btn btn-primary">Book a review <span className="arr"><ArrowRight /></span></Link></div></div></section>

      <section className="section"><div className="wrap"><div className="sec-head reveal"><h2>Common <em>questions.</em></h2></div><div className="faq-list">{faqItems.map((item) => (<details className="faq reveal" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>))}</div></div></section>

      <BigCta heading="Better data." em="Better decisions." text="30 minutes with a strategist. We will look at your analytics, identify the gaps, and show you where revenue is hiding." btnText="Book your review" btnHref="/contact" />
      <Footer />
    </>
  )
}
