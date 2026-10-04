import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/social-media')
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
import { getContent } from '@/lib/get-content'

import { buildFaqSchema } from '@/lib/schema'

export default async function SocialMediaPage() {
  const c = await getContent('/services/social-media')

  const cards = [
    { num: '01', slug: 'management', title: c.card_1_title, tagline: c.card_1_tagline, desc: c.card_1_desc, highlights: (c.card_1_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_1_result },
    { num: '02', slug: 'advertising', title: c.card_2_title, tagline: c.card_2_tagline, desc: c.card_2_desc, highlights: (c.card_2_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_2_result },
    { num: '03', slug: 'brand', title: c.card_3_title, tagline: c.card_3_tagline, desc: c.card_3_desc, highlights: (c.card_3_highlights || '').split(',').map((s: string) => s.trim()).filter(Boolean), result: c.card_3_result },
  ]

  const socialFaqs = [
    {
      q: 'Which social platforms should our company focus on for maximum business ROI?',
      a: 'We formulate channel strategies based on your customer acquisition model. For B2B and enterprise brands, we focus on LinkedIn thought leadership, executive profiling, and Twitter/X industry discourse. For B2C and direct-to-consumer e-commerce, we scale Instagram visual storytelling, TikTok short-form video, and YouTube education.',
    },
    {
      q: 'How do your organic social strategies integrate with paid social advertising?',
      a: 'Organic and paid social work in unison. We identify top-performing organic posts and test them as paid dark posts or boosted creatives, reducing cost-per-acquisition (CPA). Simultaneously, retargeting campaigns nurture organic followers into qualified leads or paying customers.',
    },
    {
      q: 'Who creates the visual assets, motion graphics, and video content?',
      a: 'Our in-house creative studio handles end-to-end production: graphic design, typography-driven carousels, custom illustrations, motion graphics, and short-form video editing (Reels, TikToks, Shorts) tailored to your brand identity guidelines.',
    },
    {
      q: 'How quickly do you handle social community moderation and inbound customer inquiries?',
      a: 'We establish clear SLA rules for community management. During business hours, our community team monitors comments, mentions, and direct messages with response times typically under 2 hours, escalating high-value sales opportunities directly to your internal sales or support channels.',
    },
    {
      q: 'How do you measure and report social media return on investment?',
      a: 'We track meaningful metrics aligned with business growth: conversion attribution via UTM parameters, lead form completions, referral traffic, and brand search lift in Google—not just vanity likes. You receive monthly Looker Studio dashboards demonstrating pipeline contribution.',
    },
    {
      q: 'What is the content approval and publishing workflow?',
      a: 'We construct a monthly content calendar 2 weeks prior to publication via collaborative tools (Notion, Asana, or Planoly). Your team has full review and revision rights. Nothing goes live without your explicit approval, leaving room for real-time reactive industry commentary.',
    },
  ]

  const faqSchema = buildFaqSchema(socialFaqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar text={c.topbar_text} linkText={c.topbar_link} linkHref="/contact" />
      <Nav active="services" />
      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Social Media</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split('real business.')[0]}<em>real business.</em></h1>
              <p className="svc-page-hero-desc">{c.hero_desc}</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">{c.hero_cta1} <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">{c.hero_cta2}</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat1_num}</span><span className="svc-page-stat-label">{c.hero_stat1_label}</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat2_num}</span><span className="svc-page-stat-label">{c.hero_stat2_label}</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat3_num}</span><span className="svc-page-stat-label">{c.hero_stat3_label}</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">{c.hero_stat4_num}</span><span className="svc-page-stat-label">{c.hero_stat4_label}</span></div>
            </div>
          </div>
        </div>
      </header>
      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>{c.sec_heading?.split('one brand voice.')[0]}<em>one brand voice.</em></h2>
            <p className="sub">{c.sec_sub}</p>
          </div>
          <ServiceCards category="social-media" items={cards} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Social Media FAQs</span>
            <h2>Frequently asked questions about <em>social media marketing.</em></h2>
            <p className="sub">How we manage brand presence, foster community engagement, and turn social followings into tangible pipeline revenue.</p>
          </div>
          <div className="faq-list reveal">
            {socialFaqs.map((item, i) => (
              <details className="faq" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BigCta heading={c.cta_heading} em={c.cta_em} text={c.cta_text} btnText={c.cta_btn} btnHref="/contact" />
      <Footer />
    </>
  )
}
