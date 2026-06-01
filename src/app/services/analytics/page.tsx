import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Analytics & CRO Services — Conversion Audits, A/B Testing & Dashboards | Omniranq',
  description: 'Turn traffic into revenue. CRO audits, rigorous A/B testing, and live reporting dashboards with revenue attribution.',
}

const cards = [
  { num: '01', slug: 'cro-audits', title: 'CRO Audits', tagline: 'Find out why visitors leave.', desc: 'Systematic conversion audits that identify exactly why visitors are not converting and what to fix first. Data-driven, not opinion-driven.', highlights: ['Heatmap analysis', 'Funnel drop-offs', 'Form analytics', 'UX benchmarking'], result: '28% avg. conversion lift' },
  { num: '02', slug: 'ab-testing', title: 'A/B Testing', tagline: 'Test before you commit.', desc: 'Rigorous experimentation programs that validate changes before you roll them out. Revenue metrics, not vanity metrics.', highlights: ['Hypothesis design', 'Statistical planning', 'Multi-variant', 'Winner implementation'], result: '85% test validity rate' },
  { num: '03', slug: 'dashboards', title: 'Reporting Dashboards', tagline: 'Always know what moved.', desc: 'Live Looker Studio dashboards that connect marketing data to business outcomes with revenue attribution.', highlights: ['Looker Studio', 'Multi-source data', 'Revenue attribution', 'Automated alerts'], result: '60% reduction in reporting time' },
]

export default function AnalyticsPage() {
  return (
    <>
      <Topbar text="Turn traffic into revenue. Free CRO audit." linkText="Book →" linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Analytics & CRO</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Analytics & CRO</span>
              <h1>Turn traffic into <em>revenue.</em></h1>
              <p className="svc-page-hero-desc">Conversion optimization, rigorous experimentation, and live dashboards &mdash; because traffic without conversion is just a cost center.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free CRO audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">28%</span><span className="svc-page-stat-label">Avg. conversion lift</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">500+</span><span className="svc-page-stat-label">A/B tests run</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">100+</span><span className="svc-page-stat-label">Dashboards built</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">4.9</span><span className="svc-page-stat-label">Client satisfaction</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Three disciplines, <em>one goal.</em></h2>
            <p className="sub">Find the leaks, test the fixes, prove the impact.</p>
          </div>
          <ServiceCards category="analytics" items={cards} />
        </div>
      </section>
      <BigCta heading="Free CRO audit." em="Find the leaks." text="We will analyze your top 5 pages and show you exactly where conversions are being lost and what to test first." btnText="Book your CRO audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
