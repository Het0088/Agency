import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Content Marketing Services — SEO Writing, Blog Management, Copywriting | Omniranq',
  description: 'Content that ranks and converts. SEO content writing, blog strategy, conversion copywriting, and email marketing from industry-expert writers.',
}

const subServices = [
  {
    id: 'seo-writing',
    num: '01',
    title: 'SEO Content Writing',
    tagline: 'Content written to rank, read, and convert.',
    desc: 'Every piece starts with a brief built from keyword data, SERP analysis, and competitive gaps. Our writers are former journalists and subject-matter experts who produce content that satisfies both algorithms and humans.',
    features: [
      '4-8 long-form articles per month (2,000-4,000 words)',
      'Clearscope-optimized briefs with target keywords and entities',
      'SERP intent matching (informational, transactional, navigational)',
      'Internal linking strategy embedded in every article',
      'Schema markup integration (FAQ, HowTo, Article)',
      'Content refreshes on existing underperforming pages',
      'AI search optimization (answer-first formatting)',
      'Monthly content performance reporting with next-step recommendations',
    ],
    result: 'Average 180% increase in organic blog traffic within 6 months.',
  },
  {
    id: 'blog-management',
    num: '02',
    title: 'Blog Management',
    tagline: 'A publishing engine, not a chore.',
    desc: 'We manage your entire blog operation: editorial calendar, topic ideation, writing, editing, publishing, and performance tracking. You approve drafts. We handle everything else.',
    features: [
      'Quarterly editorial calendar aligned with business goals',
      'Topic ideation based on keyword gaps and trending queries',
      'Writer assignment from our network of 40+ vetted specialists',
      'Two rounds of editorial review before publishing',
      'WordPress, Webflow, or headless CMS publishing',
      'Featured image sourcing and alt-text optimization',
      'Category and tag taxonomy management',
      'Monthly performance report with content recommendations',
    ],
    result: 'Clients publish 3x more consistently with managed blogs.',
  },
  {
    id: 'copywriting',
    num: '03',
    title: 'Conversion Copywriting',
    tagline: 'Words that sell, not just describe.',
    desc: 'Landing pages, product descriptions, homepage rewrites, email sequences. We write copy that converts visitors into leads and customers, informed by conversion rate data and user research.',
    features: [
      'Landing page copy with A/B testing frameworks',
      'Product and service page rewrites with SEO integration',
      'Homepage and About page messaging overhauls',
      'Value proposition development and positioning',
      'Call-to-action optimization across the site',
      'Sales enablement content (case studies, one-pagers, decks)',
    ],
    result: 'Average 35% improvement in landing page conversion rates.',
  },
  {
    id: 'email-marketing',
    num: '04',
    title: 'Email Marketing',
    tagline: 'The channel you own. Make it count.',
    desc: 'Email remains the highest-ROI marketing channel. We build sequences, newsletters, and campaigns that nurture leads, retain customers, and drive repeat revenue. Integrated with your SEO content for maximum leverage.',
    features: [
      'Welcome and onboarding sequences',
      'Newsletter strategy and production (weekly or biweekly)',
      'Drip campaigns for lead nurturing',
      'Re-engagement and win-back sequences',
      'Segmentation strategy based on behavior and lifecycle stage',
      'A/B testing for subject lines, send times, and content formats',
    ],
    result: 'Average email-attributed revenue increase of 42%.',
  },
]

const faqItems = [
  { q: 'Who writes the content?', a: 'Our team of 40+ vetted writers includes former journalists, industry specialists, and subject-matter experts. Every writer is matched to your industry. We never use offshore content mills or unedited AI output.' },
  { q: 'How do you ensure content quality?', a: 'Every piece goes through a three-step process: Clearscope-optimized brief, expert writer draft, and editorial review. We also fact-check claims and verify data before publishing.' },
  { q: 'Do you write AI-generated content?', a: 'We use AI as a research and efficiency tool, never as a replacement for human writing. Every article is written by a human expert, reviewed by an editor, and checked for originality. Our content consistently outperforms AI-only content in rankings.' },
  { q: 'Can you work with our existing CMS?', a: 'Yes. We publish directly into WordPress, Webflow, Shopify, and most headless CMSs. If you use a custom system, we deliver formatted drafts your team can publish.' },
]

export default function ContentMarketingPage() {
  return (
    <>
      <Topbar text="Content that ranks \u00B7 Written by industry experts." linkText="Learn more \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Content Marketing</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Content Marketing</span>
              <h1>Content that <em>ranks,</em> reads, and converts.</h1>
              <p className="svc-page-hero-desc">SEO content writing, blog management, conversion copywriting, and email marketing. All written by industry experts, not generalists. All optimized for search and AI answers.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a content strategy call <span className="arr"><ArrowRight /></span></Link>
                <a href="#seo-writing" className="btn btn-ghost">See our services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">40+</span>
                <span className="svc-page-stat-label">Vetted specialist writers</span>
              </div>
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">180%</span>
                <span className="svc-page-stat-label">Avg. blog traffic growth</span>
              </div>
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">2,400+</span>
                <span className="svc-page-stat-label">Articles published for clients</span>
              </div>
              <div className="svc-page-stat">
                <span className="svc-page-stat-num">35%</span>
                <span className="svc-page-stat-label">Avg. conversion rate lift</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four content disciplines, <em>one team.</em></h2>
            <p className="sub">From blog posts to email sequences, every word is written with SEO strategy baked in from the brief stage.</p>
          </div>

          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head">
                <span className="svc-detail-num">{svc.num}</span>
                <div>
                  <h3>{svc.title}</h3>
                  <p className="svc-detail-tagline">{svc.tagline}</p>
                </div>
              </div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">
                {svc.features.map((f) => (
                  <div className="svc-detail-feature" key={f}>
                    <span className="svc-detail-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="svc-detail-result">
                <span className="svc-detail-result-icon">&uarr;</span> {svc.result}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner reveal">
            <div className="mid-cta-text">
              <h3>Need content that actually ranks?</h3>
              <p>Talk to our content strategist about your industry and goals.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a call <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Common <em>questions.</em></h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq reveal" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BigCta heading="Better content." em="Better rankings." text="Get a free content gap analysis showing the topics your competitors rank for that you are missing. 30 minutes, no obligation." btnText="Book your strategy call" btnHref="/contact" />
      <Footer />
    </>
  )
}
