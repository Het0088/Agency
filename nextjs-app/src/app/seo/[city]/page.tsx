import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import cities, { getCityBySlug, getAllCitySlugs } from '@/data/cities'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export function generateStaticParams() {
  return getAllCitySlugs().map(slug => ({ city: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const c = getCityBySlug(slug)
  if (!c) return {}
  const loc = c.state ? `${c.name}, ${c.state}` : c.name
  return {
    title: `SEO Agency in ${loc} — We Strive Design`,
    description: `Expert SEO services in ${c.name}. We help ${c.name} small businesses rank higher, get found in AI search, and grow revenue. Free audit available.`,
    openGraph: {
      title: `SEO Agency in ${loc}`,
      description: `Expert SEO services for small businesses in ${c.name}. 412% average traffic growth. Free audit.`,
    },
  }
}

const svcList = [
  { num: '01', title: 'SEO Foundations', desc: 'On-page, technical, and content fundamentals that make search engines trust you.' },
  { num: '02', title: 'Local & Maps SEO', desc: 'Win the 3-pack and "near me" queries that drive walk-ins, calls, and bookings.' },
  { num: '03', title: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, schema, JS rendering — the plumbing nobody else touches.' },
  { num: '04', title: 'Editorial Content', desc: 'Long-form, answer-first content written by humans who know your industry.' },
  { num: '05', title: 'Digital PR & Links', desc: 'Editorial backlinks from publications your customers actually read.' },
  { num: '06', title: 'AI Search & GEO', desc: 'Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini.' },
]

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const c = getCityBySlug(slug)
  if (!c) notFound()

  const loc = c.state ? `${c.name}, ${c.state}` : c.name
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `We Strive Design — SEO Agency ${c.name}`,
    description: `Expert SEO services for small businesses in ${c.name}`,
    url: `https://westrivedesign.com/seo/${c.slug}`,
    areaServed: { '@type': 'City', name: c.name },
    serviceType: 'Search Engine Optimization',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Topbar text={`Now offering SEO services in ${c.name}.`} linkText="Get your free audit →" linkHref="/contact" />
      <Nav active="services" />

      <header className="city-hero">
        <div className="wrap">
          <span className="eyebrow">{`SEO Services · ${loc}`}</span>
          <h1>SEO agency in <em>{c.name}.</em></h1>
          <div className="city-intro">
            <div>
              <p>{c.intro}</p>
              <p>We&apos;re a 38-person SEO studio that helps independent shops, founders, and challenger brands in {c.name} win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' as const, marginTop: 28 }}>
                <Link href="/contact" className="btn btn-primary">
                  Get a free SEO audit <span className="arr"><ArrowRight /></span>
                </Link>
                <Link href="/services" className="btn btn-ghost">See our services</Link>
              </div>
            </div>
            <div>
              <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="stat" style={{ borderRight: '1px solid var(--border)', padding: '28px 20px' }}>
                  <div className="stat-num" style={{ fontSize: 48 }}>412<span className="unit">%</span></div>
                  <div className="stat-label">Avg. organic traffic growth</div>
                </div>
                <div className="stat" style={{ padding: '28px 20px' }}>
                  <div className="stat-num" style={{ fontSize: 48 }}>8.5<span className="unit">×</span></div>
                  <div className="stat-label">Avg. return on retainer</div>
                </div>
                <div className="stat" style={{ borderRight: '1px solid var(--border)', borderTop: '1px solid var(--border)', padding: '28px 20px' }}>
                  <div className="stat-num" style={{ fontSize: 48 }}>600<span className="unit">+</span></div>
                  <div className="stat-label">Brands grown since 2014</div>
                </div>
                <div className="stat" style={{ borderTop: '1px solid var(--border)', padding: '28px 20px' }}>
                  <div className="stat-num" style={{ fontSize: 48 }}>94<span className="unit">%</span></div>
                  <div className="stat-label">Client retention rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal in">
            <h2>SEO services in <em>{c.name}.</em></h2>
            <p className="sub">Six tightly-scoped services that compound when run together. No bloated retainers, no work-for-the-sake-of-work.</p>
          </div>
          <div className="services-grid">
            {svcList.map(s => (
              <Link key={s.num} className="service reveal in" href="/services">
                <div className="service-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-arrow"><ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="wrap">
          <div className="sec-head reveal in">
            <h2>How we work with {c.name} <em>businesses.</em></h2>
            <p className="sub">SEO is not a project. It&apos;s a discipline. Here&apos;s the loop we run with every client, every month.</p>
          </div>
          <div className="process-grid">
            {[
              { num: '01', title: 'Audit & map', text: `Three weeks of forensic analysis across your ${c.name} site, content, links, and the SERPs you want to own.` },
              { num: '02', title: 'Build & ship', text: 'Technical fixes, on-page work, and content production run in parallel. Most clients see changes inside week 4.' },
              { num: '03', title: 'Earn authority', text: `Digital PR, partnerships, and editorial outreach — links from outlets your ${c.name} customers actually read.` },
              { num: '04', title: 'Measure & iterate', text: 'Monthly dashboards show traffic, rankings, AI mentions, and revenue. We meet, we adjust, we ship.' },
            ].map(p => (
              <div key={p.num} className="proc reveal in">
                <div className="proc-num">{p.num}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BigCta
        heading={`Ready to dominate search in`}
        em={`${c.name}?`}
        text={`Get a free 30-minute SEO audit for your ${c.name} business. A real strategist, looking at your real site, telling you the three things to fix first.`}
        btnText="Book your free audit"
        btnHref="/contact"
      />
      <Footer />
    </>
  )
}
