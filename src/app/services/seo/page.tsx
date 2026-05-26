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
    id: 'technical-seo',
    num: '01',
    title: 'Technical SEO',
    tagline: 'The foundation everything else is built on.',
    desc: 'Most SEO campaigns fail because the technical foundation is broken. We fix crawl issues, indexation gaps, rendering problems, and Core Web Vitals before a single piece of content gets written.',
    features: [
      'Full crawl audit using Screaming Frog, Sitebulb, and log file analysis',
      'Core Web Vitals optimization (LCP, INP, CLS) with real-user data',
      'JavaScript rendering audit for SPAs and frameworks',
      'Crawl budget optimization for large sites (50k+ pages)',
      'XML sitemap architecture and robots.txt configuration',
      'Canonicalization, hreflang, and duplicate content resolution',
      'Structured data implementation (FAQ, HowTo, Product, LocalBusiness)',
      'Site speed optimization including image formats, lazy loading, and CDN config',
    ],
    result: 'Average 40% improvement in crawl efficiency within 60 days.',
  },
  {
    id: 'local-seo',
    num: '02',
    title: 'Local SEO',
    tagline: 'Win the 3-pack. Own the "near me" queries.',
    desc: 'For businesses that serve specific geographic areas, local SEO is the highest-ROI channel available. We build multi-location SEO systems that scale from 1 storefront to 200+ locations without diluting any single listing.',
    features: [
      'Google Business Profile optimization and ongoing management',
      'Local citation building and NAP consistency audit',
      'Review generation strategy and reputation monitoring',
      'Local link building from chambers, directories, and community sites',
      'Geo-targeted landing pages with LocalBusiness schema',
      'Google Maps ranking optimization and category strategy',
      'Competitor proximity analysis and market gap identification',
      'Multi-location dashboard with per-location KPI tracking',
    ],
    result: 'Average 3-pack visibility increase of 280% within 90 days.',
  },
  {
    id: 'ecommerce-seo',
    num: '03',
    title: 'E-commerce SEO',
    tagline: 'Turn product pages into revenue machines.',
    desc: 'E-commerce SEO is a different discipline. Faceted navigation, product schema, category architecture, and inventory-driven indexation require specialized knowledge that most generalist agencies lack.',
    features: [
      'Product and category page optimization at scale',
      'Faceted navigation management (filters, sorts, pagination)',
      'Product schema markup (price, availability, reviews, brand)',
      'Programmatic content for long-tail product queries',
      'Internal linking architecture for category authority',
      'Inventory-aware indexation (noindex out-of-stock handling)',
      'Shopify, WooCommerce, Magento, and BigCommerce optimization',
      'Shopping feed optimization for Google Merchant Center',
    ],
    result: 'Average 67% increase in organic revenue within 6 months.',
  },
  {
    id: 'enterprise-seo',
    num: '04',
    title: 'Enterprise SEO',
    tagline: 'SEO at scale, without the chaos.',
    desc: 'Enterprise sites have enterprise problems: thousands of stakeholders, legacy CMSs, dev queues measured in quarters, and SEO recommendations that die in Jira. We know how to navigate the politics and ship the work.',
    features: [
      'Cross-functional SEO roadmapping with dev, product, and content teams',
      'Large-scale migration planning and execution (domain, CMS, redesign)',
      'International SEO with hreflang, subdomain, and ccTLD strategy',
      'Programmatic page generation for thousands of location or product pages',
      'Executive reporting with revenue attribution and board-ready dashboards',
      'SEO governance frameworks and publishing workflows',
      'Competitor intelligence monitoring at the portfolio level',
      'Integration with enterprise tools (Conductor, BrightEdge, seoClarity)',
    ],
    result: 'Managed migrations for 12 enterprise clients with zero traffic loss.',
  },
  {
    id: 'seo-audits',
    num: '05',
    title: 'SEO Audits',
    tagline: 'Know exactly where you stand before you spend a dollar.',
    desc: 'A standalone, one-time deliverable. Our forensic SEO audit is a 60-90 page document covering every dimension of your search presence. No retainer required. Walk away with a prioritized roadmap your team can execute.',
    features: [
      '200+ point technical audit with severity scoring',
      'Content gap analysis against your top 10 SERP competitors',
      'Backlink profile audit with toxic link identification',
      'Keyword opportunity mapping with difficulty and volume data',
      'Core Web Vitals assessment with specific remediation steps',
      'Information architecture review and internal linking analysis',
      'AI search readiness score (ChatGPT, Gemini, Perplexity visibility)',
      '90-minute strategy call to walk through findings and priorities',
    ],
    result: 'Delivered 400+ audits. 78% of audit clients convert to retainers.',
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
      <Topbar text="Free SEO audit \u00B7 200+ checks \u00B7 No obligation." linkText="Book \u2192" linkHref="/contact" />
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

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Five disciplines, <em>one retainer.</em></h2>
            <p className="sub">Every SEO engagement we run covers technical, local, content, links, and measurement. No upsells, no tiers. Pick the depth you need.</p>
          </div>

          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head">
                <span className="svc-detail-num">{svc.num}</span>
                <div>
                  <h3>{svc.title}</h3>
                  <p className="svc-detail-tagline">{svc.tagline}</p>
                </div>
              </div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">
                {svc.features.map((f) => (
                  <div className="svc-detail-feature" key={f}>
                    <span className="svc-detail-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="svc-detail-result">
                <span className="svc-detail-result-icon">&uarr;</span> {svc.result}
              </div>
            </div>
          ))}
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
