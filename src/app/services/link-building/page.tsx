import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Link Building Services — Digital PR, Guest Posting & Outreach | Omniranq',
  description: 'Editorial backlinks from publications your customers actually read. Digital PR, guest posting, and targeted outreach campaigns. Zero spam links. Ever.',
}

const cards = [
  { num: '01', slug: 'digital-pr', title: 'Digital PR', tagline: 'Coverage that builds authority.', desc: 'Data-driven PR campaigns that generate editorial coverage, high-authority backlinks, and brand awareness simultaneously.', highlights: ['Data-driven campaigns', 'Journalist outreach', 'Original research', 'Coverage tracking'], result: '15 avg. placements per campaign' },
  { num: '02', slug: 'guest-posting', title: 'Guest Posting', tagline: 'Strategic, editorial placements.', desc: 'Guest content placement on authoritative sites in your industry. Every placement is editorial, relevant, and permanent.', highlights: ['Authority sites only', 'Expert writers', 'Anchor strategy', 'No PBNs ever'], result: 'DR 55+ avg. placement quality' },
  { num: '03', slug: 'outreach', title: 'Outreach Campaigns', tagline: 'Earn links others cannot.', desc: 'Broken link building, unlinked mention reclamation, resource page placement, and strategic partnerships.', highlights: ['Broken link building', 'Mention reclamation', 'Resource pages', 'Toxic link cleanup'], result: '20 new referring domains per month' },
]

export default function LinkBuildingPage() {
  return (
    <>
      <Topbar text="Links from sites your customers actually read." linkText="See how →" linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Link Building</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Link Building</span>
              <h1>Backlinks that <em>actually matter.</em></h1>
              <p className="svc-page-hero-desc">Editorial links from publications your customers read. Digital PR, guest content, and strategic outreach &mdash; zero spam, zero PBNs, zero shortcuts.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a link audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">DR 60+</span><span className="svc-page-stat-label">Avg. linking domain rating</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">200+</span><span className="svc-page-stat-label">Media relationships</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">92%</span><span className="svc-page-stat-label">Campaign success rate</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">0</span><span className="svc-page-stat-label">Link penalties. Ever.</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Three methods, <em>one standard.</em></h2>
            <p className="sub">Every link we earn is editorial, relevant, and built for long-term value.</p>
          </div>
          <ServiceCards category="link-building" items={cards} />
        </div>
      </section>
      <BigCta heading="Free backlink audit." em="See your gaps." text="We will analyze your backlink profile against your top 5 competitors and show you the links you are missing." btnText="Book your link audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
