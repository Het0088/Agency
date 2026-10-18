import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { CITY_REGIONS, SERVICES, cityHref } from '@/lib/nav-data'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Global Locations & Regional Search Hubs — GENRANQ',
  description: 'Explore GENRANQ services across 20+ strategic markets in the United States, India, and internationally. Localized SEO, GEO, Web Design, and Growth Marketing.',
}

export default function LocationsPage() {
  return (
    <>
      <Topbar text="Serving high-growth enterprises worldwide." linkText="Get a free regional audit →" linkHref="/contact" />
      <Nav active="locations" />

      <main>
        <section className="page-hero" style={{ padding: '72px 0 48px', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / Locations
            </nav>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '16px 0' }}>
              Strategic hubs. <em>Global impact.</em>
            </h1>
            <p style={{ maxWidth: '640px', fontSize: '18px', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Whether you are scaling in major US tech metros, dominating local Indian search corridors, or capturing international demand in London and Dubai, our senior strategists drive measurable organic revenue.
            </p>
          </div>
        </section>

        <section className="section" style={{ padding: '64px 0 96px' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gap: '56px' }}>
              {CITY_REGIONS.map((region) => (
                <div key={region.region} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '48px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                    <h2 style={{ fontSize: '26px', fontWeight: 700, margin: 0 }}>{region.region}</h2>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                      {region.cities.length} Regional Markets
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {region.cities.map((city) => (
                      <div
                        key={city.slug}
                        style={{
                          background: '#ffffff',
                          border: '1px solid var(--line)',
                          borderRadius: '16px',
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '16px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                        }}
                      >
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0' }}>{city.name}</h3>
                          <p style={{ fontSize: '13.5px', color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>
                            Full-service SEO, AI search optimization, web design, and paid media for {city.name} enterprises.
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                          <Link
                            href={cityHref('seo-services', city.slug)}
                            style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--orange)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            SEO Services in {city.name} <ArrowRight />
                          </Link>
                          <Link
                            href={cityHref('web-development', city.slug)}
                            style={{ fontSize: '13px', color: 'var(--ink-soft)', textDecoration: 'none' }}
                          >
                            Web Development in {city.name} →
                          </Link>
                          <Link
                            href={cityHref('ai-search-optimization', city.slug)}
                            style={{ fontSize: '13px', color: 'var(--ink-soft)', textDecoration: 'none' }}
                          >
                            AI Search Optimization in {city.name} →
                          </Link>
                        </div>
                      </div>
                    ))}
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
