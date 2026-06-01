import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Content Marketing Services — SEO Writing, Blog Management, Copywriting | Omniranq',
  description: 'Content that ranks, converts, and compounds. SEO writing, managed blogs, conversion copy, and email marketing — all by humans who know your industry.',
}

const cards = [
  { num: '01', slug: 'seo-writing', title: 'SEO Content Writing', tagline: 'Content that ranks and converts.', desc: 'Long-form, answer-first articles written by ex-journalists. Built to rank, satisfy intent, and drive action.', highlights: ['SERP-targeted briefs', 'Human-written', 'Clearscope scoring', 'Snippet optimization'], result: '4.2x avg. traffic increase from content' },
  { num: '02', slug: 'blog-management', title: 'Blog Management', tagline: 'A fully managed editorial operation.', desc: 'We handle calendars, writers, publishing, and performance tracking so you can focus on your business.', highlights: ['Editorial calendars', 'Writer management', 'CMS publishing', 'Performance tracking'], result: '180% avg. session increase in 6 months' },
  { num: '03', slug: 'copywriting', title: 'Copywriting', tagline: 'Words that move people to act.', desc: 'Conversion-focused copy for landing pages, product descriptions, emails, and ad campaigns.', highlights: ['Landing page copy', 'Product descriptions', 'Email sequences', 'A/B test variants'], result: '35% avg. conversion rate lift' },
  { num: '04', slug: 'email-marketing', title: 'Email Marketing', tagline: 'The highest-ROI channel, done right.', desc: 'Strategic campaigns that nurture leads, retain customers, and drive repeat revenue across the lifecycle.', highlights: ['Automated sequences', 'List segmentation', 'Deliverability', 'A/B testing'], result: '42% avg. open rate across clients' },
]

export default function ContentMarketingPage() {
  return (
    <>
      <Topbar text="Content that compounds. Every month." linkText="Get started →" linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Content Marketing</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Content Marketing</span>
              <h1>Content that ranks, converts, and <em>compounds.</em></h1>
              <p className="svc-page-hero-desc">Editorial content, blog management, conversion copy, and email marketing &mdash; written by humans who know your industry. No AI filler, no word-count padding.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a content strategy <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">4.2x</span><span className="svc-page-stat-label">Avg. traffic increase from content</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">92%</span><span className="svc-page-stat-label">First-page ranking rate</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">0</span><span className="svc-page-stat-label">AI-generated content</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">96%</span><span className="svc-page-stat-label">On-time delivery rate</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four content engines, <em>one team.</em></h2>
            <p className="sub">Everything from strategy to publishing, managed end-to-end.</p>
          </div>
          <ServiceCards category="content-marketing" items={cards} />
        </div>
      </section>
      <BigCta heading="Free content audit." em="No obligation." text="We will analyze your top 10 pages and show you exactly where content is leaving traffic on the table." btnText="Book your content audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
