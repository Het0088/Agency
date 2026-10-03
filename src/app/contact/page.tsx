import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMeta } from '@/lib/get-meta'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from './ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/contact')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: {
      title: m.og_title,
      description: m.og_description,
      url: m.canonical,
      type: 'website',
      siteName: 'GENRANQ',
      ...(m.og_image ? { images: [{ url: m.og_image }] } : {}),
    },
  }
}

export default async function ContactPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://genranq.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://genranq.com/contact' },
    ],
  }

  const contactFaqs = [
    {
      q: 'How fast will you reply?',
      a: 'A senior strategist or developer replies within 4 business hours, Monday to Friday (09:30 – 18:30 IST). The response will be from someone who can evaluate your site and tech stack, not an SDR.',
    },
    {
      q: 'Do you sign an NDA?',
      a: 'Yes. We routinely sign non-disclosure agreements before reviewing source code, analytics, keyword targets, or proprietary systems.',
    },
    {
      q: 'Where are you based?',
      a: 'GENRANQ Software LLP is based in Vadodara, Gujarat, India. Our 120+ person team serves ambitious clients across 42 countries, overlapping smoothly with US, UK, European, and Australian business hours.',
    },
    {
      q: 'Is the 200-point audit really free?',
      a: 'Yes. We run a comprehensive technical crawl, Core Web Vitals assessment, backlink toxicity review, and generative engine citation audit. It is 100% yours to keep whether you engage us or not.',
    },
    {
      q: 'Do I have to sign a long-term contract?',
      a: 'No. All our retainers and engineering pods transition to flexible month-to-month terms after an initial 90-day baseline setup. We earn your partnership every single month.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Topbar text="● Most enquiries answered within 4 business hours." linkText="Direct call →" linkHref="tel:+918045074242" />
      <Nav active="contact" />

      {/* ===== HERO & CONTACT SECTION ===== */}
      <section className="pad bg-dark" style={{ paddingTop: 80, paddingBottom: 110 }}>
        <div className="wrap">
          <div className="crumbs" style={{ fontSize: 13, color: '#8C908A', marginBottom: 24 }}>
            <Link href="/" style={{ color: 'inherit' }}>Home</Link> / <b style={{ color: '#fff' }}>Contact</b>
          </div>

          <div className="contact-layout">
            <div>
              <span className="eyebrow" style={{ color: 'var(--orange)' }}>Contact GENRANQ</span>
              <h1 style={{ fontSize: 'clamp(40px, 5.2vw, 68px)', margin: '18px 0 22px', color: '#fff' }}>
                Let&apos;s talk about <em className="accent">your growth.</em>
              </h1>
              <p className="lead" style={{ color: '#A8ABA4', fontSize: 18, lineHeight: 1.6, marginBottom: 32 }}>
                SEO, AI search, a modern website, or dedicated developers — tell us where you stand and a senior strategist will reply within 4 business hours.
              </p>

              <div className="commit">
                <div>
                  <span className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  <span>Reply within 4 business hours guaranteed</span>
                </div>
                <div>
                  <span className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>
                  <span>NDA signed before any confidential project discussion</span>
                </div>
                <div>
                  <span className="icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  </span>
                  <span>Free 200-point audit, timeline &amp; tech plan included</span>
                </div>
              </div>

              <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--line-dark)' }}>
                <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9C9F98', marginBottom: 12, fontFamily: 'var(--f-mono)' }}>
                  Direct Office Channels
                </div>
                <div className="contact-direct">
                  <a href="mailto:hello@genranq.com">hello@genranq.com</a>
                  <a href="tel:+918045074242">+91 80 4507 4242</a>
                </div>
                <p style={{ marginTop: 14, color: '#8C908A', fontSize: 14 }}>
                  GENRANQ Software LLP · Vadodara, Gujarat, India
                </p>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROOF COUNTERS ===== */}
      <section className="pad bg-cream" style={{ padding: '70px 0' }}>
        <div className="wrap">
          <div className="stats-grid-4">
            <div className="stat-box">
              <b>4<small>h</small></b>
              <span>Average response time</span>
            </div>
            <div className="stat-box">
              <b>600<small>+</small></b>
              <span>Clients served worldwide</span>
            </div>
            <div className="stat-box">
              <b>42</b>
              <span>Countries with active retainers</span>
            </div>
            <div className="stat-box">
              <b>4.9<small>/5</small></b>
              <span>Verified client satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="pad" id="faq">
        <div className="wrap">
          <div className="faq-wrap">
            <div>
              <span className="eyebrow">Before you get in touch</span>
              <h2 style={{ fontSize: 'clamp(34px, 4.2vw, 52px)' }}>
                Frequently asked <em className="accent">questions.</em>
              </h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Have questions before filling out the form? Here are clear, upfront answers to what prospective partners ask most.
              </p>
              <div style={{ marginTop: 32 }}>
                <a href="mailto:hello@genranq.com" className="btn btn-dark">
                  Email us directly →
                </a>
              </div>
            </div>

            <div className="faq-list">
              {contactFaqs.map((faq, i) => (
                <details
                  key={faq.q}
                  className="faq"
                  style={{
                    background: '#fff',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    marginBottom: 12,
                    padding: 0,
                  }}
                  open={i === 0}
                >
                  <summary
                    style={{
                      padding: '22px 24px',
                      cursor: 'pointer',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--f-display)',
                      fontSize: 20,
                      fontWeight: 500,
                      color: 'var(--ink)',
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: 22, color: 'var(--orange)', marginLeft: 16 }}>+</span>
                  </summary>
                  <div style={{ padding: '0 24px 22px', color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP & STUDIO BANNER ===== */}
      <section className="pad bg-cream" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div className="wrap">
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--line)',
              borderRadius: 24,
              padding: '44px 48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 36,
              alignItems: 'center',
            }}
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: 12 }}>Our Studio</span>
              <h3 style={{ fontSize: 28, marginBottom: 12 }}>Vadodara Engineering Hub</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.6, margin: 0 }}>
                Strategists, technical SEO engineers, and full-stack developers collaborate under one roof. Drop by our office or book a video call.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, background: 'var(--cream)', padding: 24, borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase' }}>Working Hours</span>
                <div style={{ fontWeight: 600, color: 'var(--ink)', marginTop: 4, fontSize: 14 }}>Mon–Fri · 09:30–18:30 IST</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase' }}>Phone Support</span>
                <div style={{ fontWeight: 600, color: 'var(--ink)', marginTop: 4, fontSize: 14 }}>+91 80 4507 4242</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
