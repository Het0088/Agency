import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'SEO Services — Technical, Local, E-commerce & Enterprise SEO | Omniranq',
  description: 'Full-service SEO that drives revenue. Technical audits, local 3-pack domination, e-commerce indexation, and enterprise-scale keyword strategy. 412% avg. traffic growth in 12 months.',
}

const subServices = [
  {
    num: '01',
    slug: 'technical-seo',
    title: 'Technical SEO',
    tagline: 'The foundation everything else is built on.',
    desc: 'We fix crawl issues, indexation gaps, rendering problems, and Core Web Vitals before a single piece of content gets written.',
    highlights: ['Crawl & indexation audits', 'Core Web Vitals', 'Schema markup', 'Site speed'],
    result: '40% avg. crawl efficiency gain',
  },
  {
    num: '02',
    slug: 'local-seo',
    title: 'Local SEO',
    tagline: 'Win the 3-pack. Own the "near me" queries.',
    desc: 'Multi-location SEO systems that scale from 1 storefront to 200+ locations without diluting any single listing.',
    highlights: ['Google Business Profile', 'Citation building', 'Review strategy', 'Maps ranking'],
    result: '280% avg. 3-pack visibility',
  },
  {
    num: '03',
    slug: 'ecommerce-seo',
    title: 'E-commerce SEO',
    tagline: 'Turn product pages into revenue machines.',
    desc: 'Faceted navigation, product schema, category architecture, and inventory-driven indexation for online stores.',
    highlights: ['Product page optimization', 'Faceted nav', 'Shopping feeds', 'Platform-specific'],
    result: '67% avg. organic revenue lift',
  },
  {
    num: '04',
    slug: 'enterprise-seo',
    title: 'Enterprise SEO',
    tagline: 'SEO at scale, without the chaos.',
    desc: 'Cross-functional roadmapping, migration planning, and programmatic page generation for large organizations.',
    highlights: ['Migration planning', 'International SEO', 'Executive reporting', 'Dev integration'],
    result: '12 migrations, zero traffic loss',
  },
  {
    num: '05',
    slug: 'seo-audits',
    title: 'SEO Audits',
    tagline: 'Know exactly where you stand.',
    desc: 'A forensic 60-90 page audit covering every dimension of your search presence. Standalone deliverable, no retainer required.',
    highlights: ['200+ point audit', 'Content gap analysis', 'Backlink review', 'AI readiness score'],
    result: '400+ audits delivered',
  },
]

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We audit your current search presence, competitive landscape, and business goals. No assumptions.' },
  { num: '02', title: 'Strategy', desc: 'We build a keyword map, content plan, and technical roadmap prioritized by impact and effort.' },
  { num: '03', title: 'Execution', desc: 'Technical fixes ship first. Content follows. Links build in parallel. Everything moves at the same time.' },
  { num: '04', title: 'Measurement', desc: 'Live dashboard from day one. Monthly calls. Quarterly deep-dives. You always know what moved and why.' },
]

const faqItems = [
  { q: 'How long does SEO take to show results?', a: 'Most clients see measurable ranking improvements within 90 days. Significant traffic growth typically occurs between months 4-6. The timeline depends on your starting position, competition level, and the technical health of your site.' },
  { q: 'What makes your SEO different from other agencies?', a: 'Three things: we only do SEO (no distractions), every client works with a senior strategist (not an account manager), and we include AI search optimization as standard in every retainer.' },
  { q: 'Do you require long-term contracts?', a: 'We ask for a 90-day onboarding commitment because SEO needs time to work. After that, we are month-to-month. We keep clients by delivering results, not by locking them in.' },
  { q: 'Can you work with our in-house team?', a: 'Yes. Many of our enterprise clients have internal SEO teams. We function as a strategic extension, handling the work your team does not have bandwidth or specialization for.' },
  { q: 'What industries do you specialize in?', a: 'E-commerce, B2B SaaS, local services, hospitality, health and wellness, finance, education, and specialty retail. We have deep SERP knowledge in each.' },
]

export default function SeoServicesPage() {
  return (
    <>
      <Topbar text="Free SEO audit · 200+ checks · No obligation." linkText="Book →" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / SEO</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">SEO Services</span>
              <h1>Search engine optimization that brings <em>buyers,</em> not browsers.</h1>
              <p className="svc-page-hero-desc">We are a 38-person studio that does one thing: SEO. Technical foundations, content strategy, link building, local optimization, and AI search visibility &mdash; delivered as one unified retainer.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free SEO audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">Explore our SEO services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">412%</span>
                <span className="svc-page-stat-label">Avg. traffic growth in 12 months</span>
              </div>
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">94%</span>
                <span className="svc-page-stat-label">Annual client retention</span>
              </div>
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">600+</span>
                <span className="svc-page-stat-label">Brands grown since 2014</span>
              </div>
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">8.5x</span>
                <span className="svc-page-stat-label">Avg. return on retainer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Five disciplines, <em>one retainer.</em></h2>
            <p className="sub">Every SEO engagement we run covers technical, local, content, links, and measurement. No upsells, no tiers.</p>
          </div>
          <div className="svc-cards-grid">
            {subServices.map((svc) => (
              <Link key={svc.slug} href={`/services/seo/${svc.slug}`} className="svc-card reveal">
                <div className="svc-card-top">
                  <span className="svc-card-num">{svc.num}</span>
                  <span className="svc-card-arrow"><ArrowRight /></span>
                </div>
                <h3>{svc.title}</h3>
                <p className="svc-card-tagline">{svc.tagline}</p>
                <p className="svc-card-desc">{svc.desc}</p>
                <div className="svc-card-highlights">
                  {svc.highlights.map(h => (
                    <span className="svc-card-tag" key={h}>{h}</span>
                  ))}
                </div>
                <div className="svc-card-result">
                  <span className="svc-card-result-icon">&uarr;</span> {svc.result}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner mid-cta-dark reveal">
            <div className="mid-cta-text">
              <h3>Not sure which SEO service fits your business?</h3>
              <p>Book a free 30-minute strategy call. No pitch, just honest advice.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Talk to a strategist <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>How we <em>work.</em></h2>
            <p className="sub">A four-phase process refined over 600+ engagements. No black boxes, no mystery.</p>
          </div>
          <div className="process-grid">
            {processSteps.map((s) => (
              <div className="proc reveal" key={s.num}>
                <div className="proc-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="logos-label">Tools we use daily</div>
          <div className="tools-strip reveal">
            <span className="tool">AHREFS<span className="sub">Backlinks &amp; SERPs</span></span>
            <span className="tool">SEMRUSH<span className="sub">Keyword research</span></span>
            <span className="tool serif-i">Screaming Frog</span>
            <span className="tool">SISTRIX<span className="sub">Visibility index</span></span>
            <span className="tool">LOOKER<span className="sub">Dashboards</span></span>
            <span className="tool">CLEARSCOPE<span className="sub">Content briefs</span></span>
            <span className="tool serif-i">Sitebulb</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Common <em>questions.</em></h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq reveal" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BigCta heading="Free SEO audit." em="200+ checks." text="A senior strategist will look at your real site and tell you the three things to fix first. 30 minutes. No obligation. Useful even if you never hire us." btnText="Book your free audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
