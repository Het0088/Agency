import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Link Building Services — Digital PR, Guest Posting & Outreach | We Strive Design',
  description: 'Editorial backlinks from publications your customers read. Digital PR, strategic guest posting, and outreach campaigns that build real authority.',
}

const subServices = [
  {
    id: 'digital-pr',
    num: '01',
    title: 'Digital PR',
    tagline: 'Earned mentions from real publications.',
    desc: 'We create data-driven stories, expert commentary, and newsworthy campaigns that earn editorial coverage from publications your customers actually read. No link farms. No PBNs. Real press, real authority.',
    features: [
      'Data-driven PR campaigns with original research',
      'Expert commentary placement in industry publications',
      'Journalist relationship building and media outreach',
      'Reactive PR for trending topics and news cycles',
      'Press release creation and distribution strategy',
      'Brand mention monitoring and link reclamation',
      'Crisis communication support for negative press',
      'Monthly PR performance reporting with link metrics',
    ],
    result: 'Average 15 editorial placements per month per client.',
  },
  {
    id: 'guest-posting',
    num: '02',
    title: 'Guest Posting',
    tagline: 'Strategic placements, not spray and pray.',
    desc: 'We place thought leadership content on hand-vetted publications with real traffic and domain authority. Every placement is reviewed for relevance, audience quality, and editorial standards before we pitch.',
    features: [
      'Hand-vetted publication database (2,000+ sites)',
      'Topic ideation aligned with your keyword strategy',
      'Full content creation by industry-expert writers',
      'Natural anchor text strategy for link diversity',
      'Domain authority and traffic quality verification',
      'Editorial relationship management',
      'Monthly reporting with link metrics and impact analysis',
      'Toxic link audit and disavow support',
    ],
    result: 'Average DR 60+ for all guest post placements.',
  },
  {
    id: 'outreach',
    num: '03',
    title: 'Outreach Campaigns',
    tagline: 'Relationships that build authority.',
    desc: 'Beyond PR and guest posts, we run targeted outreach campaigns for resource page links, broken link building, and strategic partnership opportunities that build lasting authority.',
    features: [
      'Resource page link building with personalized outreach',
      'Broken link building campaigns at scale',
      'Competitor backlink gap analysis and targeted acquisition',
      'Partnership and co-marketing link opportunities',
      'Scholarship and sponsorship link building',
      'Unlinked brand mention conversion',
    ],
    result: 'Average 25 new referring domains per month.',
  },
]

const faqItems = [
  { q: 'Are your links safe for SEO?', a: 'Yes. We only build editorial links from real websites with real traffic. We never use PBNs, link farms, or paid link schemes. Every link is manually vetted for quality and relevance.' },
  { q: 'How long until links impact rankings?', a: 'Links typically take 4-8 weeks to be fully indexed and influence rankings. Consistent link building over 3-6 months produces compounding results.' },
  { q: 'Do you guarantee a specific number of links?', a: 'We provide minimum link targets based on your retainer level. Typical clients receive 15-30 new links per month. We guarantee quality over quantity and will never sacrifice editorial standards for volume.' },
  { q: 'Can you clean up toxic links?', a: 'Yes. We audit existing backlink profiles, identify toxic or spammy links, and submit Google Disavow files. This is included in our standard link building retainer.' },
]

export default function LinkBuildingPage() {
  return (
    <>
      <Topbar text="Editorial links from real publications." linkText="See our approach \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Link Building</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Link Building</span>
              <h1>Backlinks that build <em>authority,</em> not risk.</h1>
              <p className="svc-page-hero-desc">Digital PR, strategic guest posting, and outreach campaigns. Every link is editorial, relevant, and from a site with real traffic.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a link audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#digital-pr" className="btn btn-ghost">See our services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">15+</span><span className="svc-page-stat-label">Editorial placements per month</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">DR 60+</span><span className="svc-page-stat-label">Average placement authority</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">2,000+</span><span className="svc-page-stat-label">Vetted publication database</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">0</span><span className="svc-page-stat-label">PBNs or link farms. Ever.</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal"><h2>Three approaches, <em>one standard.</em></h2><p className="sub">Every link we build is editorial, relevant, and from a site with real traffic. No exceptions.</p></div>
          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head"><span className="svc-detail-num">{svc.num}</span><div><h3>{svc.title}</h3><p className="svc-detail-tagline">{svc.tagline}</p></div></div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">{svc.features.map((f) => (<div className="svc-detail-feature" key={f}><span className="svc-detail-dot" />{f}</div>))}</div>
              <div className="svc-detail-result"><span className="svc-detail-result-icon">&uarr;</span> {svc.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta"><div className="wrap"><div className="mid-cta-inner mid-cta-dark reveal"><div className="mid-cta-text"><h3>Worried about your backlink profile?</h3><p>Get a free toxic link audit. We will show you which links are helping and which are hurting.</p></div><Link href="/contact" className="btn btn-primary">Get a free audit <span className="arr"><ArrowRight /></span></Link></div></div></section>

      <section className="section"><div className="wrap"><div className="sec-head reveal"><h2>Common <em>questions.</em></h2></div><div className="faq-list">{faqItems.map((item) => (<details className="faq reveal" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>))}</div></div></section>

      <BigCta heading="Better links." em="Better authority." text="30 minutes with a strategist. We will audit your backlink profile and show you the gaps your competitors are exploiting." btnText="Book your link audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
