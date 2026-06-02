import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/ppc')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'


const cards = [
  { num: '01', slug: 'google-ads', title: 'Google Ads', tagline: 'ROAS-driven, not spend-driven.', desc: 'Search, Shopping, Display, and Performance Max campaigns built to maximize return on ad spend.', highlights: ['Campaign architecture', 'Negative keywords', 'Quality score', 'Attribution modeling'], result: '3.2x avg. ROAS improvement' },
  { num: '02', slug: 'meta-ads', title: 'Meta Ads', tagline: 'Full-funnel Facebook & Instagram.', desc: 'Awareness to conversion across Meta platforms with creative strategy and Conversion API setup included.', highlights: ['Lookalike audiences', 'Creative strategy', 'Retargeting', 'iOS 14+ tracking'], result: '2.8x avg. ROAS' },
  { num: '03', slug: 'youtube-ads', title: 'YouTube Ads', tagline: 'Video that drives action.', desc: 'TrueView, Bumper, and In-Feed campaigns with precise intent-based targeting on the second-largest search engine.', highlights: ['TrueView & Bumper', 'Intent targeting', 'Brand lift', 'Video remarketing'], result: '65% lower CPV vs. benchmarks' },
  { num: '04', slug: 'programmatic', title: 'Programmatic Advertising', tagline: 'Automated, data-driven media buying.', desc: 'Cross-channel campaigns across display, video, native, and connected TV using DV360 and The Trade Desk.', highlights: ['DSP management', 'Cross-channel', 'Brand safety', 'Incrementality testing'], result: '40% avg. media efficiency gain' },
]

export default function PpcPage() {
  return (
    <>
      <Topbar text="Maximize your ad spend. Free PPC audit available." linkText="Book →" linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / PPC</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">PPC & Paid Ads</span>
              <h1>Paid media that <em>pays back.</em></h1>
              <p className="svc-page-hero-desc">Performance-driven campaigns across Google, Meta, YouTube, and programmatic. Every dollar tracked, every campaign optimized for revenue.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free PPC audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">3.2x</span><span className="svc-page-stat-label">Avg. ROAS improvement</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">$2M+</span><span className="svc-page-stat-label">Monthly ad spend managed</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">90</span><span className="svc-page-stat-label">Days to measurable ROAS lift</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">94%</span><span className="svc-page-stat-label">Client retention rate</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four channels, <em>one dashboard.</em></h2>
            <p className="sub">Every campaign tracked in real-time with revenue attribution.</p>
          </div>
          <ServiceCards category="ppc" items={cards} />
        </div>
      </section>
      <BigCta heading="Free PPC audit." em="Find the waste." text="We will analyze your current campaigns and show you exactly where budget is being wasted and where to scale." btnText="Book your PPC audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
