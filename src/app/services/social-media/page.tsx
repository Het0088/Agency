import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Social Media Marketing — Management, Advertising & Brand Strategy | Omniranq',
  description: 'Strategic social media management and paid social advertising. Build brand authority, engage audiences, and drive conversions across all major platforms.',
}

const subServices = [
  {
    id: 'management',
    num: '01',
    title: 'Social Media Management',
    tagline: 'Consistent presence without the burnout.',
    desc: 'We manage your social channels end-to-end: strategy, content creation, scheduling, community management, and reporting. Your team stays focused on the business while we build your audience.',
    features: [
      'Platform strategy for LinkedIn, Instagram, Facebook, X, and TikTok',
      'Monthly content calendar with approval workflows',
      'Original post creation (copy, graphics, carousels, short-form video)',
      'Community management and response handling',
      'Hashtag strategy and trend monitoring',
      'Competitor social benchmarking',
      'Monthly analytics reporting with growth recommendations',
      'Crisis communication protocols',
    ],
    result: 'Average 156% follower growth within 6 months.',
  },
  {
    id: 'advertising',
    num: '02',
    title: 'Social Media Advertising',
    tagline: 'Paid social that drives pipeline, not just likes.',
    desc: 'Full-funnel paid social campaigns across Facebook, Instagram, LinkedIn, and TikTok. We build audiences, create ads, and optimize for business outcomes.',
    features: [
      'Facebook and Instagram ad campaign management',
      'LinkedIn Ads for B2B lead generation',
      'TikTok advertising for younger demographics',
      'Audience building with first-party data and lookalikes',
      'Creative testing frameworks (copy, visuals, formats)',
      'Retargeting and sequential messaging campaigns',
      'Conversion API and pixel setup for accurate tracking',
      'Weekly optimization with budget allocation recommendations',
    ],
    result: 'Average 3.8x ROAS on paid social campaigns.',
  },
  {
    id: 'brand',
    num: '03',
    title: 'Brand Management',
    tagline: 'Your brand, everywhere it matters.',
    desc: 'We develop and maintain your brand presence across social platforms with consistent messaging, visual identity, and strategic positioning that builds trust and recognition over time.',
    features: [
      'Brand voice development and social media style guide',
      'Visual identity adaptation for each platform',
      'Thought leadership content for founders and executives',
      'Brand monitoring and sentiment tracking',
      'Influencer identification and partnership management',
      'User-generated content strategy and curation',
    ],
    result: 'Average brand awareness lift of 67% measured via surveys.',
  },
]

const faqItems = [
  { q: 'Which social platforms should my business be on?', a: 'It depends on where your audience spends time. B2B brands typically prioritize LinkedIn. E-commerce brands focus on Instagram and TikTok. Local services benefit from Facebook and Google Business. We recommend platforms based on data, not trends.' },
  { q: 'Do you create all the content?', a: 'Yes. Our team creates all copy, graphics, carousels, and short-form video content. We handle everything from ideation to final delivery. You approve before anything publishes.' },
  { q: 'How do you handle negative comments?', a: 'We follow a crisis communication protocol established during onboarding. Minor complaints are handled with empathetic, brand-aligned responses. Escalation triggers are defined for anything that needs your direct involvement.' },
]

export default function SocialMediaPage() {
  return (
    <>
      <Topbar text="Social media that drives business results." linkText="Talk to us \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Social Media</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Social Media</span>
              <h1>Social media that builds <em>brands,</em> not just feeds.</h1>
              <p className="svc-page-hero-desc">Strategic management, paid advertising, and brand building across every platform that matters. Consistent, measurable, and aligned with your business goals.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a social strategy call <span className="arr"><ArrowRight /></span></Link>
                <a href="#management" className="btn btn-ghost">See our services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">156%</span><span className="svc-page-stat-label">Avg. follower growth in 6 months</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">3.8x</span><span className="svc-page-stat-label">Avg. paid social ROAS</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">5</span><span className="svc-page-stat-label">Platforms managed daily</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">67%</span><span className="svc-page-stat-label">Avg. brand awareness lift</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal"><h2>Three services, <em>one strategy.</em></h2><p className="sub">Management, advertising, and brand building work together. We deliver all three.</p></div>
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

      <section className="mid-cta"><div className="wrap"><div className="mid-cta-inner mid-cta-dark reveal"><div className="mid-cta-text"><h3>Want a social media audit?</h3><p>We will review your profiles, posting cadence, and engagement metrics for free.</p></div><Link href="/contact" className="btn btn-primary">Book a call <span className="arr"><ArrowRight /></span></Link></div></div></section>

      <section className="section"><div className="wrap"><div className="sec-head reveal"><h2>Common <em>questions.</em></h2></div><div className="faq-list">{faqItems.map((item) => (<details className="faq reveal" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>))}</div></div></section>

      <BigCta heading="Better social." em="Better brand." text="30 minutes with a strategist. We will show you what is working, what is not, and what to fix first." btnText="Book your strategy call" btnHref="/contact" />
      <Footer />
    </>
  )
}
