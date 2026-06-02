import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'
import { getSubService, getSubServiceSlugs, getSubServicesByCategory } from '@/lib/services-data'
import OldVsNewSeo from '@/app/sections/OldVsNewSeo'

export function generateStaticParams() {
  return getSubServiceSlugs().map(([category, slug]) => ({ category, slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params
  const svc = getSubService(category, slug)
  if (!svc) return {}
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://omniranq.com'
  return {
    title: `${svc.title} Services — Omniranq`,
    description: svc.metaDescription || `${svc.desc.slice(0, 155)}...`,
    alternates: { canonical: `${base}/services/${category}/${slug}` },
  }
}

export default async function SubServicePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params
  const svc = getSubService(category, slug)
  if (!svc) notFound()

  const siblings = getSubServicesByCategory(category).filter(s => s.slug !== slug)

  return (
    <>
      <Topbar text={`Expert ${svc.title} services. Free audit available.`} linkText="Book →" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <Link href={`/services/${category}`}>{svc.parentTitle}</Link> / {svc.title}
          </div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{svc.parentTitle}</span>
              <h1>{svc.title} that<br /><em>drives results.</em></h1>
              <p className="svc-page-hero-desc">{svc.desc}</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#features" className="btn btn-ghost">See what&apos;s included</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              {svc.stats.map(s => (
                <div className="svc-page-stat" key={s.label}>
                  <span className="svc-page-stat-num">{s.value}</span>
                  <span className="svc-page-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="features" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>What&apos;s <em>included.</em></h2>
            <p className="sub">{svc.featuresIntro || `Everything you need for ${svc.title.toLowerCase()} success. No upsells, no add-ons.`}</p>
          </div>
          <div className="sub-svc-features">
            {svc.features.map((f, i) => (
              <div className="sub-svc-feat reveal" key={f}>
                <span className="sub-svc-feat-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{f}</p>
              </div>
            ))}
          </div>
          {svc.result && (
            <div className="svc-detail-result reveal" style={{ marginTop: 48 }}>
              <span className="svc-detail-result-icon">&uarr;</span> {svc.result}
            </div>
          )}
        </div>
      </section>

      {svc.process && svc.process.length > 0 && (
        <section className="section process">
          <div className="wrap">
            <div className="sec-head reveal">
              <h2>How we <em>deliver.</em></h2>
              <p className="sub">A proven process refined across hundreds of engagements.</p>
            </div>
            <div className="process-grid">
              {svc.process.map((p, i) => (
                <div className="proc reveal" key={p.title}>
                  <div className="proc-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner mid-cta-dark reveal">
            <div className="mid-cta-text">
              <h3>Want to discuss {svc.title.toLowerCase()} for your business?</h3>
              <p>30-minute call. No pitch, just honest advice from a senior strategist.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a free call <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {svc.faqs && svc.faqs.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head reveal">
              <h2>Common <em>questions.</em></h2>
            </div>
            <div className="faq-list">
              {svc.faqs.map(item => (
                <details className="faq reveal" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <section className="section" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <h2>More from <em>{svc.parentTitle}.</em></h2>
              <p className="sub">Related services you might need alongside {svc.title.toLowerCase()}.</p>
            </div>
            <div className="services-grid" style={{ borderLeft: '1px solid var(--border)' }}>
              {siblings.map((s, i) => (
                <Link key={s.slug} href={`/services/${s.category}/${s.slug}`} className="service reveal">
                  <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc.slice(0, 120)}...</p>
                  <span className="service-arrow"><ArrowRight /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {category === 'seo' && <OldVsNewSeo />}

      <BigCta
        heading={`Free ${svc.title.toLowerCase()} audit.`}
        em="No obligation."
        text="30 minutes with a senior strategist. Real analysis of your site. Actionable advice even if you never hire us."
        btnText="Book your free audit"
        btnHref="/contact"
      />
      <Footer />
    </>
  )
}
