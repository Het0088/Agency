import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllSlugs, getCityBySlug, getAllCities } from '@/lib/cities'
import { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schema'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight, CheckIcon } from '@/components/Icons'

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = getCityBySlug(slug)
  if (!c) return {}
  const loc = c.state ? `${c.city}, ${c.state}` : c.city
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://westrivedesign.com'
  return {
    title: c.metaTitle || `${c.service} in ${loc} — We Strive Design`,
    description: c.metaDescription || `Expert ${c.service} in ${c.city}. Free audit available.`,
    keywords: c.localKeywords?.split(',').map(k => k.trim()),
    alternates: { canonical: `${base}/${c.slug}` },
    openGraph: {
      title: c.metaTitle || `${c.service} in ${loc}`,
      description: c.metaDescription || c.description,
      url: `${base}/${c.slug}`,
      type: 'website',
    },
  }
}

const services = [
  { num: '01', title: 'SEO Foundations', desc: 'On-page, technical, and content fundamentals that make search engines trust you.' },
  { num: '02', title: 'Local & Maps SEO', desc: 'Win the 3-pack and "near me" queries that drive walk-ins, calls, and bookings.' },
  { num: '03', title: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, schema, JS rendering — the plumbing nobody else touches.' },
  { num: '04', title: 'Editorial Content', desc: 'Long-form, answer-first content written by humans who know your industry.' },
  { num: '05', title: 'Digital PR & Links', desc: 'Editorial backlinks from publications your customers actually read.' },
  { num: '06', title: 'AI Search & GEO', desc: 'Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini.' },
]

const processSteps = [
  { num: '01', title: 'Audit & map' },
  { num: '02', title: 'Build & ship' },
  { num: '03', title: 'Earn authority' },
  { num: '04', title: 'Measure & iterate' },
]

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = getCityBySlug(slug)
  if (!c) notFound()

  const loc = c.state ? `${c.city}, ${c.state}` : c.city
  const localBusinessSchema = buildLocalBusinessSchema(c)
  const breadcrumbSchema = buildBreadcrumbSchema(c)

  const faqs = [
    { q: `How much does SEO cost in ${c.city}?`, a: `Our retainers for ${c.city} businesses start at $4,000/month. Every engagement includes a custom scope — we don't sell cookie-cutter packages. The price depends on your market, competition, and goals.` },
    { q: `How long until I see results in ${c.city}?`, a: `Most ${c.city} clients see measurable ranking improvements within 8–12 weeks. Significant revenue impact typically shows by month 4–6. SEO compounds — month 12 is always better than month 6.` },
    { q: `Do you work with small businesses in ${c.city}?`, a: `Yes. Most of our ${c.city} clients are 5–200 person companies. We're built for ambitious small businesses, not enterprise bureaucracy.` },
    { q: `Can I meet your team in ${c.city}?`, a: c.address ? `We have presence at ${c.address}. We're happy to meet in person or work remotely — most of our client communication happens over video calls and shared dashboards.` : `We work remotely with ${c.city} clients via video calls and shared dashboards. Our team is distributed across Melbourne, London, and Bangalore.` },
  ]

  const faqSchema = buildFaqSchema(faqs)

  const relatedCities = getAllCities()
    .filter(x => x.slug !== c.slug && x.country === c.country)
    .slice(0, 6)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Topbar text={`Now offering ${c.service} in ${c.city}.`} linkText="Get your free audit →" linkHref="/contact" />
      <Nav active="services" />

      <header className="page-hero">
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / {c.service} in {c.city}
          </nav>
          <h1>{c.heroHeading ? c.heroHeading.replace(/\.$/, '') : `${c.service} in ${c.city}`}
            {c.heroHeading?.includes(c.city) ? '.' : <> in <em>{c.city}.</em></>}
          </h1>
          <p>{c.heroSubheading || c.description}</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="city-intro">
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-soft)' }}>{c.description}</p>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                We&apos;re a 38-person SEO studio that helps independent shops, founders, and challenger brands in {c.city} win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                <Link href="/contact" className="btn btn-primary">
                  Get a free SEO audit <span className="arr"><ArrowRight /></span>
                </Link>
                <Link href="/services" className="btn btn-ghost">See all services</Link>
              </div>
              {c.phone && (
                <div style={{ marginTop: 20, fontSize: 14, color: 'var(--ink-soft)' }}>
                  Or call us: <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{ fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid var(--accent)' }}>{c.phone}</a>
                </div>
              )}
            </div>
            <div>
              <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                {[
                  { num: '412', unit: '%', label: 'Avg. organic traffic growth' },
                  { num: '8.5', unit: '×', label: 'Avg. return on retainer' },
                  { num: '600', unit: '+', label: 'Brands grown since 2014' },
                  { num: '94', unit: '%', label: 'Client retention rate' },
                ].map((s, i) => (
                  <div key={s.label} className="stat" style={{
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderTop: i >= 2 ? '1px solid var(--border)' : 'none',
                    padding: '28px 20px'
                  }}>
                    <div className="stat-num" style={{ fontSize: 48 }} data-count={s.num} data-decimals={s.num.includes('.') ? 1 : 0}>0</div>
                    <span className="unit" style={{ fontSize: 24, color: 'var(--accent)' }}>{s.unit}</span>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="city-trust-strip reveal">
          <div className="city-trust-badge"><span className="badge-icon">G</span> Google Partner</div>
          <div className="city-trust-badge"><span className="badge-icon">C</span> Clutch Top Agency</div>
          <div className="city-trust-badge"><span className="badge-icon">S</span> Semrush Certified</div>
          <div className="city-trust-badge"><span className="badge-icon">H</span> HubSpot Partner</div>
          <div className="city-trust-badge"><span className="badge-icon">★</span> 4.9/5 (412 reviews)</div>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>What we do in <em>{c.city}.</em></h2>
            <p className="sub">Six tightly-scoped services that compound when run together.</p>
          </div>
          <div className="services-grid">
            {services.map(s => (
              <Link key={s.num} className="service reveal" href="/services">
                <div className="service-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-arrow"><ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Industries we serve in <em>{c.city}.</em></h2>
            <p className="sub">Deep SERP knowledge in verticals that matter.</p>
          </div>
          <div className="city-industries reveal">
            {['E-commerce & Retail', 'B2B SaaS', 'Health & Wellness', 'Local Services', 'Hospitality & Travel', 'Finance & Insurance', 'Education & EdTech', 'Real Estate', 'Food & Beverage', 'Legal Services', 'Manufacturing', 'Specialty Retail'].map(ind => (
              <div className="city-industry" key={ind}>
                <span className="city-industry-dot" />
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>How we work with <em>{c.city} businesses.</em></h2>
            <p className="sub">SEO is not a project. It&apos;s a discipline. Here&apos;s the loop we run every month.</p>
          </div>
          <div className="process-grid">
            {processSteps.map(p => (
              <div key={p.num} className="proc reveal">
                <div className="proc-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>
                  {p.num === '01' && `Three weeks of forensic analysis across your ${c.city} site, content, links, and the SERPs you want to own.`}
                  {p.num === '02' && 'Technical fixes, on-page work, and content production run in parallel. Most clients see changes inside week 4.'}
                  {p.num === '03' && `Digital PR, partnerships, and editorial outreach — links from outlets your ${c.city} customers actually read.`}
                  {p.num === '04' && 'Monthly dashboards show traffic, rankings, AI mentions, and revenue. We meet, we adjust, we ship.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {c.testimonialQuote && (
        <section className="section" style={{ background: 'var(--surface)' }}>
          <div className="wrap" style={{ maxWidth: 800 }}>
            <div className="testimonial reveal" style={{ background: 'var(--ink)', color: 'var(--dark-ink)', padding: '48px 44px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.25, marginBottom: 28, letterSpacing: '-0.01em' }}>
                &ldquo;{c.testimonialQuote}&rdquo;
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent)', display: 'grid', placeItems: 'center', fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#fff' }}>
                  {c.testimonialName?.[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{c.testimonialName}</div>
                  <div style={{ fontSize: 13, color: 'var(--dark-ink-soft)' }}>{c.testimonialRole}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <h2>FAQ: {c.service} in <em>{c.city}.</em></h2>
            <p className="sub">Quick answers for {c.city} businesses.</p>
          </div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (
              <details className="faq" key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {relatedCities.length > 0 && (
        <section className="section" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <h2>Also serving <em>nearby cities.</em></h2>
              <p className="sub">We work with businesses across {c.country}.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {relatedCities.map(rc => (
                <Link key={rc.slug} href={`/${rc.slug}`} className="reveal" style={{
                  padding: '20px 24px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  background: 'var(--bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'border-color 0.2s, transform 0.2s var(--ease-out)',
                  fontSize: 15,
                  fontWeight: 500,
                }}>
                  {rc.city}
                  <span style={{ width: 14, height: 14, display: 'inline-flex' }}><ArrowRight /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BigCta
        heading={`Ready to dominate search in`}
        em={`${c.city}?`}
        text={`Get a free 30-minute SEO audit for your ${c.city} business. A real strategist, looking at your real site, telling you the three things to fix first.`}
        btnText="Book your free audit"
        btnHref="/contact"
      />
      <Footer />
    </>
  )
}
