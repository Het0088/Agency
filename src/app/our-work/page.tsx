import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight, CheckIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Our Work & Case Studies — GENRANQ',
  description: 'Explore client case studies, verified organic growth metrics, and technical search transformations delivered by GENRANQ Software LLP.',
}

const caseStudies = [
  {
    client: 'Apex Industrial Dynamics',
    industry: 'Precision Manufacturing',
    metric: '+412%',
    metricLabel: 'Organic Pipeline Growth',
    summary: 'Restructured global technical SEO architecture and built programmatic specification libraries, achieving top 3 rankings for 420+ high-value industrial queries.',
    tags: ['Technical SEO', 'Architecture', 'Global SERP'],
  },
  {
    client: 'LuxeLiving Group',
    industry: 'High-End Hospitality & Real Estate',
    metric: '94%',
    metricLabel: 'Client Retention & Recurring Lead Flow',
    summary: 'Engineered multi-location local search dominance across 14 metropolitan centers, driving a 3.4x surge in direct qualified inquiries.',
    tags: ['Local SEO', 'GEO & AI Search', 'Next.js Dev'],
  },
  {
    client: 'FinSphere Payments',
    industry: 'B2B Fintech & SaaS',
    metric: '3.8x',
    metricLabel: 'Generative Search Citations',
    summary: 'Pioneered Generative Engine Optimization (GEO) protocols, securing primary citations in ChatGPT, Perplexity, and Google AI Overviews.',
    tags: ['GEO', 'Perplexity SEO', 'Content Strategy'],
  },
]

export default function OurWorkPage() {
  return (
    <>
      <Topbar text="Proven case studies and verified client ROI." linkText="Discuss your project →" linkHref="/contact" />
      <Nav active="about" />

      <main>
        <section className="page-hero" style={{ padding: '72px 0 48px', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/about">About Us</Link> / Our Work
            </nav>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '16px 0' }}>
              Engineered results. <em>Measurable growth.</em>
            </h1>
            <p style={{ maxWidth: '640px', fontSize: '18px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              We partner with ambitious enterprises and small businesses to deliver sustained organic search authority, AI citations, and rapid conversion acceleration.
            </p>
          </div>
        </section>

        <section className="section" style={{ padding: '64px 0 96px' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gap: '32px' }}>
              {caseStudies.map((cs) => (
                <div
                  key={cs.client}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--line)',
                    borderRadius: '20px',
                    padding: '40px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '32px',
                    alignItems: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--orange)' }}>
                      {cs.industry}
                    </span>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 16px' }}>{cs.client}</h2>
                    <p style={{ fontSize: '16px', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{cs.summary}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
                      {cs.tags.map((t) => (
                        <span key={t} style={{ fontSize: '12px', background: 'var(--cream)', padding: '5px 12px', borderRadius: '999px', fontWeight: 600 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '56px', fontWeight: 800, color: 'var(--orange)', lineHeight: 1, letterSpacing: '-0.03em', display: 'block' }}>
                        {cs.metric}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-soft)', marginTop: '4px', display: 'block' }}>
                        {cs.metricLabel}
                      </span>
                    </div>
                    <Link href="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                      Get Similar Results <ArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
