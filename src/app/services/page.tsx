import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceFaq from './ServiceFaq'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'All Services — SEO, AI Search, Content, PPC, Web Design & More | Omniranq',
  description: 'Full-service digital growth. SEO, AI search optimization, content marketing, PPC, social media, web design, link building, and analytics — all under one roof.',
}

const categories = [
  {
    title: 'SEO Services',
    href: '/services/seo',
    desc: 'Technical foundations, local domination, e-commerce indexation, and enterprise-scale keyword strategy.',
    items: [
      { label: 'Technical SEO', href: '/services/seo/technical-seo', desc: 'Crawl audits, Core Web Vitals, JS rendering, schema markup.' },
      { label: 'Local SEO', href: '/services/seo/local-seo', desc: 'Google Business Profile, 3-pack ranking, multi-location.' },
      { label: 'E-commerce SEO', href: '/services/seo/ecommerce-seo', desc: 'Faceted nav, product schema, shopping feeds.' },
      { label: 'Enterprise SEO', href: '/services/seo/enterprise-seo', desc: 'Migrations, international, programmatic pages.' },
      { label: 'SEO Audits', href: '/services/seo/seo-audits', desc: '200+ point forensic audit. Standalone deliverable.' },
    ],
  },
  {
    title: 'AI Search & GEO',
    href: '/services/ai-search',
    desc: 'Get cited inside ChatGPT, Gemini, Perplexity, and Google AI Overviews.',
    items: [
      { label: 'ChatGPT Optimization', href: '/services/ai-search/chatgpt', desc: 'Brand mention engineering across LLM queries.' },
      { label: 'Google AI Overviews', href: '/services/ai-search/google-aio', desc: 'Get featured above the blue links.' },
      { label: 'Gemini Optimization', href: '/services/ai-search/gemini', desc: 'Knowledge Panel and entity recognition.' },
      { label: 'Perplexity SEO', href: '/services/ai-search/perplexity', desc: 'Source authority for the answer engine.' },
    ],
  },
  {
    title: 'Content Marketing',
    href: '/services/content-marketing',
    desc: 'Editorial content, blog management, conversion copy, and email campaigns.',
    items: [
      { label: 'SEO Content Writing', href: '/services/content-marketing/seo-writing', desc: 'Long-form, answer-first articles by industry experts.' },
      { label: 'Blog Management', href: '/services/content-marketing/blog-management', desc: 'Full editorial operation, managed end-to-end.' },
      { label: 'Copywriting', href: '/services/content-marketing/copywriting', desc: 'Landing pages, product descriptions, ad copy.' },
      { label: 'Email Marketing', href: '/services/content-marketing/email-marketing', desc: 'Automated sequences, newsletters, segmentation.' },
    ],
  },
  {
    title: 'PPC & Paid Ads',
    href: '/services/ppc',
    desc: 'Performance-driven paid media across Google, Meta, YouTube, and programmatic.',
    items: [
      { label: 'Google Ads', href: '/services/ppc/google-ads', desc: 'Search, Shopping, Display, Performance Max.' },
      { label: 'Meta Ads', href: '/services/ppc/meta-ads', desc: 'Facebook and Instagram, full-funnel.' },
      { label: 'YouTube Ads', href: '/services/ppc/youtube-ads', desc: 'TrueView, Bumper, In-Feed video campaigns.' },
      { label: 'Programmatic', href: '/services/ppc/programmatic', desc: 'DSP management, cross-channel display.' },
    ],
  },
  {
    title: 'Social Media',
    href: '/services/social-media',
    desc: 'Full-service social presence: organic, paid, and brand management.',
    items: [
      { label: 'Social Management', href: '/services/social-media/management', desc: 'Content creation, scheduling, community.' },
      { label: 'Social Advertising', href: '/services/social-media/advertising', desc: 'Paid campaigns across all platforms.' },
      { label: 'Brand Management', href: '/services/social-media/brand', desc: 'Positioning, reputation, influencer strategy.' },
    ],
  },
  {
    title: 'Web Design',
    href: '/services/web-design',
    desc: 'Custom websites built for speed, conversion, and SEO from day one.',
    items: [
      { label: 'Custom Web Design', href: '/services/web-design/custom', desc: 'Bespoke design, no templates, every pixel matters.' },
      { label: 'WordPress Design', href: '/services/web-design/wordpress', desc: 'Custom themes, ACF, WooCommerce.' },
      { label: 'E-commerce Design', href: '/services/web-design/ecommerce', desc: 'Stores optimized for mobile and AOV.' },
      { label: 'Website Redesign', href: '/services/web-design/redesign', desc: 'Strategic rebuilds with zero traffic loss.' },
    ],
  },
  {
    title: 'Link Building',
    href: '/services/link-building',
    desc: 'Editorial backlinks from publications your customers actually read.',
    items: [
      { label: 'Digital PR', href: '/services/link-building/digital-pr', desc: 'Data-driven campaigns, journalist outreach.' },
      { label: 'Guest Posting', href: '/services/link-building/guest-posting', desc: 'Strategic placements on authoritative sites.' },
      { label: 'Outreach Campaigns', href: '/services/link-building/outreach', desc: 'Broken links, unlinked mentions, partnerships.' },
    ],
  },
  {
    title: 'Analytics & CRO',
    href: '/services/analytics',
    desc: 'Conversion optimization, experimentation, and live reporting dashboards.',
    items: [
      { label: 'CRO Audits', href: '/services/analytics/cro-audits', desc: 'Heatmaps, funnels, prioritized fixes.' },
      { label: 'A/B Testing', href: '/services/analytics/ab-testing', desc: 'Rigorous experiments that move revenue.' },
      { label: 'Reporting Dashboards', href: '/services/analytics/dashboards', desc: 'Live Looker Studio with revenue attribution.' },
    ],
  },
]

const compareRows = [
  { lab: 'Senior strategist on every call', us: 'Always', them: 'Account manager, sometimes' },
  { lab: 'Month-to-month after onboarding', us: 'After 90 days', them: '12-month minimums' },
  { lab: 'Live dashboard with revenue attribution', us: 'Day one', them: 'Monthly PDFs' },
  { lab: 'AI Search & GEO included', us: 'Standard', them: 'Premium add-on or unavailable' },
  { lab: 'Content written by industry experts', us: 'Ex-journalists, in-house', them: 'Offshored generalists' },
  { lab: 'You own all the work + access', us: 'Always yours', them: 'Proprietary tools you lose access to' },
]

const engagementModels = [
  {
    tag: 'Most popular',
    title: 'Monthly retainer',
    price: 'From $4,000/mo',
    desc: 'Ongoing, full-service SEO with a dedicated strategist. All workstreams running in parallel. Month-to-month after 90-day onboarding.',
    features: ['Dedicated senior strategist', 'All deliverables included', 'Live dashboard & monthly calls', 'Month-to-month after onboarding'],
    primary: true,
  },
  {
    tag: 'One-time',
    title: 'SEO audit',
    price: 'From $2,500',
    desc: 'A comprehensive 60-90 page audit with prioritized findings and a 90-minute walkthrough.',
    features: ['200+ point technical audit', 'Content gap analysis', 'Competitive positioning report', '90-minute strategy call'],
    primary: false,
  },
  {
    tag: 'Consulting',
    title: 'Strategy sprint',
    price: 'From $6,000',
    desc: 'A focused 4-week engagement. We build your roadmap, train your team, and hand over a 12-month execution plan.',
    features: ['4-week intensive engagement', 'Full keyword & content strategy', 'Team training sessions', '12-month execution plan'],
    primary: false,
  },
]

const trustBadges = [
  { label: 'Google Partner', sub: 'Certified' },
  { label: 'Clutch', sub: '4.9 / 5.0' },
  { label: 'Semrush', sub: 'Agency Partner' },
  { label: 'HubSpot', sub: 'Certified' },
]

export default function ServicesPage() {
  return (
    <>
      <Topbar text="Free SEO audit · 30 minutes · No obligation." linkText="Book →" linkHref="/contact" />
      <Nav active="services" />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Services</div>
          <div className="reveal in">
            <h1 style={{ maxWidth: 'none' }}>Everything you need<br />to <em>dominate</em> search.</h1>
            <p style={{ maxWidth: 600 }}>Eight disciplines, one studio. We handle SEO, AI search, content, paid media, web design, link building, social, and analytics — so you don&apos;t need eight agencies.</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
              <Link href="/contact" className="btn btn-primary">Get a free audit <span className="arr"><ArrowRight /></span></Link>
              <a href="#all-services" className="btn btn-ghost">Explore all services</a>
            </div>
          </div>
        </div>
      </header>

      <section className="trust-strip">
        <div className="wrap">
          <div className="trust-grid">
            {trustBadges.map((b) => (
              <div className="trust-badge reveal" key={b.label}>
                <span className="trust-badge-label">{b.label}</span>
                <span className="trust-badge-sub">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap">
          <div className="stats-grid">
            <div className="stat reveal"><div className="stat-num">8<span className="unit">services</span></div><div className="stat-label">Full disciplines under one roof</div></div>
            <div className="stat reveal"><div className="stat-num">30<span className="unit">+</span></div><div className="stat-label">Specialized sub-services</div></div>
            <div className="stat reveal"><div className="stat-num">412<span className="unit">%</span></div><div className="stat-label">Average organic traffic growth</div></div>
            <div className="stat reveal"><div className="stat-num">94<span className="unit">%</span></div><div className="stat-label">Annual client retention rate</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="all-services">
        <div className="wrap">
          {categories.map((cat) => (
            <div className="svc-cat-block reveal" key={cat.title}>
              <div className="svc-cat-header">
                <div>
                  <Link href={cat.href} className="svc-cat-title">{cat.title} <span className="arr" style={{ display: 'inline-flex', width: 14, height: 14, marginLeft: 6, verticalAlign: 'middle' }}><ArrowRight /></span></Link>
                  <p className="svc-cat-desc">{cat.desc}</p>
                </div>
              </div>
              <div className="svc-cat-grid">
                {cat.items.map((item) => (
                  <Link href={item.href} className="svc-cat-card" key={item.label}>
                    <h4>{item.label}</h4>
                    <p>{item.desc}</p>
                    <span className="svc-cat-card-arrow"><ArrowRight /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner reveal">
            <div className="mid-cta-text">
              <h3>Not sure which service you need?</h3>
              <p>Book a 30-minute call with a senior strategist. No sales pitch &mdash; just honest advice.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a free call <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="models">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Choose your <em>engagement.</em></h2>
            <p className="sub">Three ways to work with us. Pick the model that fits your stage and budget.</p>
          </div>
          <div className="engage-grid">
            {engagementModels.map((m) => (
              <div className={`engage-card reveal${m.primary ? ' engage-primary' : ''}`} key={m.title}>
                <span className="engage-tag">{m.tag}</span>
                <h3>{m.title}</h3>
                <div className="engage-price">{m.price}</div>
                <p>{m.desc}</p>
                <ul className="engage-features">
                  {m.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link href="/contact" className={`btn ${m.primary ? 'btn-primary' : 'btn-ghost'} btn-sm`} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                  {m.primary ? 'Start a retainer' : 'Learn more'} <span className="arr"><ArrowRight /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Us vs. <em>typical agencies.</em></h2>
            <p className="sub">Not throwing shade. Just being clear about how we&apos;re built differently.</p>
          </div>
          <div className="compare reveal">
            <div className="compare-row head"><div>What you get</div><div className="col-us">Omniranq</div><div>Most agencies</div></div>
            {compareRows.map((r) => (
              <div className="compare-row" key={r.lab}>
                <div className="lab">{r.lab}</div>
                <div className="col-us"><span className="yes">{r.us}</span></div>
                <div className="no">{r.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq />

      <BigCta heading="Free audit." em="No deck." text="30 minutes. A senior strategist looking at your real site, telling you the three things to fix first. Useful even if you never hire us." btnText="Book your free audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
