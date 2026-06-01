import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Web Design Services — Custom, WordPress, E-commerce & Redesign | Omniranq',
  description: 'Custom websites built for speed, conversion, and SEO. No templates, no themes — every pixel is purposeful. Average 52% conversion lift on redesigned sites.',
}

const cards = [
  { num: '01', slug: 'custom', title: 'Custom Web Design', tagline: 'Every pixel is purposeful.', desc: 'Bespoke website design built for performance, conversion, and SEO from the ground up. No templates, no themes.', highlights: ['Figma prototyping', 'Mobile-first', 'SEO architecture', 'CMS integration'], result: '52% avg. conversion lift' },
  { num: '02', slug: 'wordpress', title: 'WordPress Design', tagline: 'Fast, secure, manageable.', desc: 'Custom WordPress development your team can actually manage without calling a developer.', highlights: ['Custom themes', 'ACF flexible content', 'WooCommerce', 'Security hardening'], result: '3x speed vs. template sites' },
  { num: '03', slug: 'ecommerce', title: 'E-commerce Design', tagline: 'Stores that convert.', desc: 'Shopping experiences optimized for mobile, speed, and average order value from day one.', highlights: ['Checkout optimization', 'Product pages', 'Payment setup', 'Post-launch CRO'], result: '45% avg. revenue increase' },
  { num: '04', slug: 'redesign', title: 'Website Redesign', tagline: 'Rebuild without losing rankings.', desc: 'Strategic redesigns that improve performance without losing SEO equity. Zero traffic loss is non-negotiable.', highlights: ['SEO audit first', 'URL mapping', '301 redirects', 'Post-launch monitoring'], result: '0% traffic loss on redesigns' },
]

export default function WebDesignPage() {
  return (
    <>
      <Topbar text="Websites that convert. Free design consultation." linkText="Book →" linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Web Design</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Web Design</span>
              <h1>Websites built to <em>perform.</em></h1>
              <p className="svc-page-hero-desc">Custom design, blazing speed, SEO-ready architecture, and conversion optimization &mdash; built into every site from the first wireframe.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free consultation <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">52%</span><span className="svc-page-stat-label">Avg. conversion lift</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">200+</span><span className="svc-page-stat-label">Sites designed</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">&lt; 2s</span><span className="svc-page-stat-label">Avg. page load time</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">100</span><span className="svc-page-stat-label">Lighthouse score target</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four ways to <em>build.</em></h2>
            <p className="sub">From scratch or from what you have &mdash; every approach is SEO-native.</p>
          </div>
          <ServiceCards category="web-design" items={cards} />
        </div>
      </section>
      <BigCta heading="Free design consultation." em="No commitment." text="30 minutes with a designer who understands SEO. We will review your current site and show you what a high-performing version looks like." btnText="Book your consultation" btnHref="/contact" />
      <Footer />
    </>
  )
}
