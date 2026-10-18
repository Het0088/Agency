import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight, IconFileText } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'White Papers & Industry Playbooks — GENRANQ',
  description: 'In-depth industry playbooks, enterprise search architecture studies, and generative engine optimization white papers by GENRANQ research team.',
}

const whitepapers = [
  {
    title: 'The 2026 Generative Engine Optimization (GEO) Playbook',
    desc: 'How LLMs cite web sources, build trust graphs, and synthesize answers — and how enterprises can secure first-position recommendations in ChatGPT, Gemini, and Perplexity.',
    tag: 'Enterprise Research',
    date: 'Q1 2026',
    pages: '48 pages',
    pdfUrl: '/contact',
  },
  {
    title: 'Large-Scale Next.js & Headless Web Performance Blueprint',
    desc: 'Architectural patterns for sub-second LCP, zero CLS, and full server-rendered SEO parity across multi-million URL e-commerce and SaaS catalogues.',
    tag: 'Technical Architecture',
    date: 'Q4 2025',
    pages: '36 pages',
    pdfUrl: '/contact',
  },
  {
    title: 'The B2B Organic Pipeline Attribution Framework',
    desc: 'Connecting organic SERP visibility directly to CRM pipeline, ARR growth, and multi-touch buyer journeys without relying on broken last-click metrics.',
    tag: 'Analytics & CRO',
    date: 'Q3 2025',
    pages: '32 pages',
    pdfUrl: '/contact',
  },
]

export default function WhitePapersPage() {
  return (
    <>
      <Topbar text="Enterprise Search Research Series." linkText="Download our latest study →" linkHref="/contact" />
      <Nav active="resources" />

      <main>
        <section className="page-hero" style={{ padding: '72px 0 48px', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/resources/blog">Resources</Link> / White Papers
            </nav>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '16px 0' }}>
              White papers &amp; <em>playbooks.</em>
            </h1>
            <p style={{ maxWidth: '640px', fontSize: '18px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Comprehensive research reports, empirical search analyses, and architectural playbooks written by senior search engineers and data strategists.
            </p>
          </div>
        </section>

        <section className="section" style={{ padding: '64px 0 96px' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {whitepapers.map((wp) => (
                <div
                  key={wp.title}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--line)',
                    borderRadius: '16px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--orange)' }}>
                        {wp.tag}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>{wp.pages}</span>
                    </div>
                    <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>{wp.title}</h2>
                    <p style={{ fontSize: '14.5px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{wp.desc}</p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)', fontWeight: 500 }}>{wp.date}</span>
                    <Link
                      href={wp.pdfUrl}
                      className="btn btn-primary btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      Request Copy <ArrowRight />
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
