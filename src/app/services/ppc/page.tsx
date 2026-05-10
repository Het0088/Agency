import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'PPC & Paid Advertising — Google Ads, Meta Ads, YouTube | We Strive Design',
  description: 'Data-driven paid advertising that maximizes ROAS. Google Ads, Meta Ads, YouTube campaigns, and programmatic advertising managed by certified specialists.',
}

const subServices = [
  {
    id: 'google-ads',
    num: '01',
    title: 'Google Ads',
    tagline: 'Capture demand at the moment of intent.',
    desc: 'Search, Shopping, Display, and Performance Max campaigns managed by Google-certified specialists. We build campaigns that prioritize revenue, not just clicks.',
    features: [
      'Search campaign architecture with SKAG and STAG structures',
      'Google Shopping feed optimization and bid strategy',
      'Performance Max campaign setup and creative asset management',
      'Negative keyword mining and match type optimization',
      'Landing page alignment with ad messaging',
      'Conversion tracking setup (GA4, GTM, enhanced conversions)',
      'Competitor auction insights analysis',
      'Weekly optimization with monthly strategy reviews',
    ],
    result: 'Average ROAS improvement of 3.2x within 90 days.',
  },
  {
    id: 'meta-ads',
    num: '02',
    title: 'Meta Ads',
    tagline: 'Reach audiences before they search.',
    desc: 'Facebook and Instagram advertising for awareness, consideration, and conversion. We build full-funnel campaigns that move prospects from scroll to sale.',
    features: [
      'Full-funnel campaign architecture (TOFU, MOFU, BOFU)',
      'Audience building with lookalikes, interests, and custom audiences',
      'Creative strategy with ad copy and visual direction',
      'Advantage+ campaign optimization',
      'Retargeting sequences for cart abandoners and page visitors',
      'CAPI integration for accurate conversion tracking',
      'A/B testing for creatives, audiences, and placements',
      'Monthly reporting with creative performance analysis',
    ],
    result: 'Average cost-per-acquisition reduction of 41%.',
  },
  {
    id: 'youtube-ads',
    num: '03',
    title: 'YouTube Ads',
    tagline: 'Video ads that drive action, not just views.',
    desc: 'YouTube is the second largest search engine. We run skippable in-stream, bumper, and discovery campaigns that drive measurable business outcomes, not vanity metrics.',
    features: [
      'In-stream, bumper, and discovery ad campaign setup',
      'Audience targeting with custom intent and affinity segments',
      'Video creative strategy and script frameworks',
      'YouTube Search ad campaigns for high-intent queries',
      'Remarketing sequences from YouTube to search and display',
      'View-through and click-through conversion tracking',
    ],
    result: 'Average view-through rate 40% above industry benchmarks.',
  },
  {
    id: 'programmatic',
    num: '04',
    title: 'Programmatic Advertising',
    tagline: 'Precision targeting at scale.',
    desc: 'For brands that need reach beyond Google and Meta. We run programmatic display, native, and CTV campaigns through demand-side platforms with granular audience targeting.',
    features: [
      'DSP campaign management (DV360, The Trade Desk, Amazon DSP)',
      'Contextual and behavioral targeting strategies',
      'Connected TV (CTV) and over-the-top (OTT) campaigns',
      'Native advertising on premium publisher networks',
      'Brand safety and viewability optimization',
      'Cross-channel attribution and incremental lift measurement',
    ],
    result: 'Average brand awareness lift of 28% in controlled studies.',
  },
]

const faqItems = [
  { q: 'What is your minimum ad spend requirement?', a: 'We recommend a minimum monthly ad spend of $3,000 for Google Ads and $2,000 for Meta Ads to generate statistically significant data for optimization. Our management fees are separate from ad spend.' },
  { q: 'How do you measure PPC success?', a: 'We track revenue-based metrics: ROAS, cost per acquisition, customer lifetime value, and revenue attribution. We set up proper conversion tracking before launching any campaign.' },
  { q: 'Do you create the ad creative?', a: 'We provide ad copy, creative direction, and performance-tested frameworks. For video and graphic assets, we partner with design studios or work with your existing creative team.' },
  { q: 'Can you work with our existing campaigns?', a: 'Yes. We start with a full audit of your existing account, identify quick wins, and restructure campaigns over the first 30 days. No scorched-earth rebuilds unless warranted.' },
]

export default function PpcPage() {
  return (
    <>
      <Topbar text="Paid ads that pay for themselves." linkText="Get a free audit \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / PPC &amp; Paid Ads</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">PPC &amp; Paid Ads</span>
              <h1>Paid advertising that <em>pays</em> for itself.</h1>
              <p className="svc-page-hero-desc">Google Ads, Meta Ads, YouTube, and programmatic campaigns managed by certified specialists who optimize for revenue, not vanity metrics.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free PPC audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#google-ads" className="btn btn-ghost">See our services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">3.2x</span><span className="svc-page-stat-label">Avg. ROAS improvement</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">41%</span><span className="svc-page-stat-label">Avg. CPA reduction</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">$14M+</span><span className="svc-page-stat-label">Ad spend managed annually</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">200+</span><span className="svc-page-stat-label">Campaigns launched</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four channels, <em>one dashboard.</em></h2>
            <p className="sub">Every campaign is managed with revenue attribution from day one. No black boxes.</p>
          </div>
          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head">
                <span className="svc-detail-num">{svc.num}</span>
                <div><h3>{svc.title}</h3><p className="svc-detail-tagline">{svc.tagline}</p></div>
              </div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">
                {svc.features.map((f) => (<div className="svc-detail-feature" key={f}><span className="svc-detail-dot" />{f}</div>))}
              </div>
              <div className="svc-detail-result"><span className="svc-detail-result-icon">&uarr;</span> {svc.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta"><div className="wrap"><div className="mid-cta-inner mid-cta-dark reveal"><div className="mid-cta-text"><h3>Spending on ads but not sure what is working?</h3><p>Get a free account audit. We will show you exactly where your budget is being wasted.</p></div><Link href="/contact" className="btn btn-primary">Book an audit <span className="arr"><ArrowRight /></span></Link></div></div></section>

      <section className="section"><div className="wrap"><div className="sec-head reveal"><h2>Common <em>questions.</em></h2></div><div className="faq-list">{faqItems.map((item) => (<details className="faq reveal" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>))}</div></div></section>

      <BigCta heading="Free PPC audit." em="Find the waste." text="We will review your existing ad accounts and show you 3 things to fix immediately. 30 minutes, no pitch." btnText="Book your audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
