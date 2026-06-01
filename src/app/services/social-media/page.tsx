import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Social Media Services — Management, Advertising & Brand | Omniranq',
  description: 'Full-service social media: organic content, paid campaigns, and brand management across Instagram, LinkedIn, TikTok, and X.',
}

const cards = [
  { num: '01', slug: 'management', title: 'Social Media Management', tagline: 'Your brand, always on.', desc: 'Content creation, scheduling, community engagement, and performance reporting across all major platforms.', highlights: ['Content creation', 'Community management', 'Multi-platform', 'Monthly analytics'], result: '156% avg. follower growth' },
  { num: '02', slug: 'advertising', title: 'Social Advertising', tagline: 'Paid social that pays back.', desc: 'Campaigns across Meta, LinkedIn, TikTok, and X with a focus on measurable ROAS, not vanity metrics.', highlights: ['Cross-platform', 'Creative testing', 'Retargeting', 'Attribution'], result: '2.4x avg. ROAS' },
  { num: '03', slug: 'brand', title: 'Brand Management', tagline: 'Build it. Protect it. Grow it.', desc: 'Strategic brand positioning, reputation monitoring, and influencer partnerships across digital channels.', highlights: ['Brand voice', 'Reputation monitoring', 'Influencer strategy', 'Sentiment tracking'], result: '78% brand sentiment improvement' },
]

export default function SocialMediaPage() {
  return (
    <>
      <Topbar text="Social media that drives business results." linkText="Get started →" linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Social Media</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Social Media</span>
              <h1>Social that builds <em>businesses,</em> not just followers.</h1>
              <p className="svc-page-hero-desc">Organic content, paid campaigns, and brand management &mdash; all under one team that understands your audience and your revenue goals.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a social strategy <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">156%</span><span className="svc-page-stat-label">Avg. follower growth</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">3.2x</span><span className="svc-page-stat-label">Engagement increase</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">40+</span><span className="svc-page-stat-label">Brands managed</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">98%</span><span className="svc-page-stat-label">On-time delivery</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Three disciplines, <em>one voice.</em></h2>
            <p className="sub">Organic, paid, and brand &mdash; managed together for maximum impact.</p>
          </div>
          <ServiceCards category="social-media" items={cards} />
        </div>
      </section>
      <BigCta heading="Free social audit." em="See what's working." text="We will review your social presence and show you the three highest-impact moves to make this quarter." btnText="Book your social audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
