import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/seo')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import Image from 'next/image'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  ArrowRight, IconBuilding, IconSearch, IconDocument, IconZap, IconActivity,
  IconDollarSign, IconMonitor, IconGlobe, IconUsers, IconLayers, IconClock,
  IconBarChart, IconMapPin, IconShoppingCart, IconShield, IconMessageSquare,
  IconTrendingUp, IconTarget
} from '@/components/Icons'


const processSteps = [
  { icon: <IconBuilding />, num: '1', title: 'Understanding Your Business', desc: 'We begin by gaining a clear understanding of your business, industry, and objectives to ensure the strategy aligns with your growth goals.' },
  { icon: <IconSearch />, num: '2', title: 'AI-Powered Audits & Keyword Research', desc: 'AI tools conduct detailed audits of your website and perform keyword research, identifying key opportunities for improvement and growth.' },
  { icon: <IconDocument />, num: '3', title: 'Personalised Content & SEO Recommendations', desc: 'Based on findings, we develop tailored content strategies and provide SEO recommendations to enhance both content and site performance.' },
  { icon: <IconZap />, num: '4', title: 'LLM Optimisation', desc: 'We research and optimise your brand to boost visibility in LLM searches — ChatGPT, Gemini, Perplexity — driving higher discoverability across AI platforms.' },
  { icon: <IconActivity />, num: '5', title: 'Continuous Monitoring & Optimisation', desc: 'The strategy is regularly monitored using AI tools, ensuring it remains effective and adapts to industry changes and algorithm updates.' },
  { icon: <IconDollarSign />, num: '6', title: 'Measuring ROI & Refining the Strategy', desc: 'We track your performance and refine the strategy as necessary, optimising results and achieving business goals systematically.' },
]

const whyUs = [
  { icon: <IconMonitor />, title: 'Genuine Enterprise Capabilities', desc: 'We have built in-house AI capabilities that allow us to work on websites with thousands of pages and scale up our efforts as your business grows.' },
  { icon: <IconGlobe />, title: 'Expertise Across the Entire Search Landscape', desc: 'From technical SEO to video, local, e-commerce, and AI search optimisation — our team covers the full spectrum to deliver the best growth for your business.' },
  { icon: <IconUsers />, title: 'Portfolio of Marquee Brands', desc: 'Our client portfolio includes some of the leading brands across industries including Healthcare, Finance, E-commerce, Education, and more.' },
  { icon: <IconLayers />, title: '38-Person Specialist Studio', desc: 'Our global team across Melbourne, London, and Bangalore works exclusively on SEO and AI search — not as a side offering within a generalist agency.' },
  { icon: <IconClock />, title: '10+ Years of Search Expertise', desc: 'Founded in 2014, we have guided 600+ brands through every major search algorithm shift — from Panda and Penguin to AI Overviews and GEO.' },
  { icon: <IconBarChart />, title: 'Data-Driven, No Long Contracts', desc: 'Monthly retainers with full transparency. We earn your business every month with measurable results — 8.5× average return on retainer spend.' },
]

const advantages = [
  { icon: <IconSearch />, title: 'Accelerated Keyword Research', desc: 'AI quickly identifies the best keyword opportunities, streamlining the research process and improving accuracy well beyond manual analysis.' },
  { icon: <IconDocument />, title: 'Optimised Content Recommendations', desc: 'AI enhances content relevance and structure, making it more engaging for both users and search engines — including AI answer engines.' },
  { icon: <IconTrendingUp />, title: 'Trend Prediction for SEO', desc: 'AI helps your business stay ahead by forecasting SEO and search trends before they peak — so you capture traffic before competitors react.' },
  { icon: <IconActivity />, title: 'Continuous SEO Optimisation', desc: 'AI monitors and adjusts your SEO performance in real time, enabling ongoing improvements without waiting for quarterly reviews.' },
  { icon: <IconDollarSign />, title: 'Scalable & Cost-Effective SEO', desc: 'AI automates many SEO tasks, making it easier to scale your efforts while reducing per-unit cost — ideal for multi-location and enterprise brands.' },
  { icon: <IconShield />, title: 'GEO & LLM Visibility', desc: 'We optimise your brand to appear in ChatGPT, Google AI Overviews, Gemini, and Perplexity — the new frontier of AI-powered search.' },
]

const oldRules = [
  'Ranking in Google was the only game',
  'Keyword stuffing',
  'Every link counted (quantity over quality)',
  'Optimised mainly for bots',
  'Quick traffic hacks',
  'Gaming algorithms',
  'Clicks equal victory',
  'Page-one rankings were the goal',
]

const newRules = [
  'Being retrieved, cited, and trusted across Google and AI',
  "Content meets Google's E-E-A-T criteria",
  'GEO — cited in ChatGPT, Gemini, Perplexity',
  'AEO — appear in AI answers and voice search',
  'AIO — structure content for AI workflows',
  'SXO — align content with UX and conversions',
  'Long-term authority building',
  'Visibility across Google, AI, and voice',
]

const seoServices = [
  { icon: <IconZap />, slug: 'technical-seo', title: 'Technical SEO', desc: 'We fix crawl issues, indexation gaps, rendering problems, and Core Web Vitals — the foundation everything else is built on.' },
  { icon: <IconMapPin />, slug: 'local-seo', title: 'Local SEO', desc: 'Multi-location SEO systems that dominate the 3-pack. From single storefronts to 200+ locations.' },
  { icon: <IconShoppingCart />, slug: 'ecommerce-seo', title: 'E-commerce SEO', desc: 'Product schema, faceted navigation, category architecture, and inventory-aware indexation for online stores.' },
  { icon: <IconBuilding />, slug: 'enterprise-seo', title: 'Enterprise SEO', desc: 'Cross-functional roadmapping, migration planning, and programmatic page generation for large organizations.' },
  { icon: <IconSearch />, slug: 'seo-audits', title: 'SEO Audits', desc: 'A forensic 60-90 page audit covering every dimension of your search presence. No retainer required.' },
  { icon: <IconTarget />, slug: 'chatgpt', title: 'AI Search & GEO', desc: 'Optimize your brand to be cited in ChatGPT, Gemini, Perplexity, and Google AI Overviews.', href: '/services/ai-search' },
]

const industries = [
  { icon: <IconDollarSign />, label: 'Accountants SEO' },
  { icon: <IconBuilding />, label: 'Construction SEO' },
  { icon: <IconShoppingCart />, label: 'E-commerce SEO' },
  { icon: <IconShield />, label: 'Healthcare SEO' },
  { icon: <IconMapPin />, label: 'Real Estate SEO' },
  { icon: <IconDocument />, label: 'Legal & Law Firm SEO' },
  { icon: <IconUsers />, label: 'Restaurant & Hospitality SEO' },
  { icon: <IconLayers />, label: 'Education SEO' },
  { icon: <IconZap />, label: 'HVAC & Trade SEO' },
  { icon: <IconBarChart />, label: 'Financial Services SEO' },
  { icon: <IconGlobe />, label: 'Hotel & Accommodation SEO' },
  { icon: <IconActivity />, label: 'Automotive SEO' },
  { icon: <IconClock />, label: 'Doctors & Medical SEO' },
  { icon: <IconMonitor />, label: 'Security Companies SEO' },
  { icon: <IconTrendingUp />, label: 'Fitness & Wellness SEO' },
  { icon: <IconMessageSquare />, label: 'Logistics & Freight SEO' },
]

const reviews = [
  { initial: 'N', color: '#0e1410', name: 'Nazir Mohammadi', ago: '7 months ago', text: 'Extremely reliable and super friendly staff. The team helped us with our digital strategy. Would recommend to everyone who wants to get their SEO done properly.' },
  { initial: 'H', color: '#ff5a1f', name: "Hunter D'Angelis", ago: '10 months ago', text: 'The Omniranq team have been incredible to work with. From the very beginning they crafted a clear SEO strategy and have delivered measurable results month after month.' },
  { initial: 'S', color: '#1a6b4d', name: 'Sarah Mitchell', ago: '3 months ago', text: 'Our organic traffic grew by 280% in the first 90 days. The AI SEO approach is genuinely different — we\'re now appearing in ChatGPT and Google AI Overviews too.' },
]

const faqs = [
  { q: 'How long does SEO take to show results?', a: 'Most clients see measurable ranking improvements within 90 days. Significant traffic growth typically occurs between months 4-6. The timeline depends on your starting position, competition level, and the technical health of your site.' },
  { q: 'What makes your SEO different from other agencies?', a: 'Three things: we only do SEO (no distractions), every client works with a senior strategist (not an account manager), and we include AI search optimization as standard in every retainer.' },
  { q: 'Do you require long-term contracts?', a: 'We ask for a 90-day onboarding commitment because SEO needs time to work. After that, we are month-to-month. We keep clients by delivering results, not by locking them in.' },
  { q: 'Can you work with our in-house team?', a: 'Yes. Many of our enterprise clients have internal SEO teams. We function as a strategic extension, handling the work your team does not have bandwidth or specialization for.' },
  { q: 'What is included in a free SEO audit?', a: 'A 200+ point technical crawl, Core Web Vitals check, content gap analysis, backlink profile overview, and AI search readiness score — delivered with a 30-minute strategy call.' },
]

export default function SeoServicesPage() {
  return (
    <>
      <Topbar text="Free SEO audit · 200+ checks · No obligation." linkText="Book →" linkHref="/contact" />
      <Nav active="services" />

      <header className="ref-hero">
        <div className="wrap">
          <div className="ref-hero-inner">
            <div className="ref-hero-copy">
              <span className="ref-eyebrow">AI-Powered SEO Studio · Est. 2014</span>
              <h1>Search rankings driven by <em>artificial intelligence.</em></h1>
              <p className="ref-hero-sub">Omniranq combines deep SEO expertise with AI tools to grow your organic traffic, authority, and revenue — faster than traditional methods alone.</p>
              <div className="ref-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a Free SEO Audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#process" className="btn btn-ghost">See How It Works</a>
              </div>
              <div className="ref-hero-stats">
                <div className="ref-stat"><div className="ref-stat-num">412%</div><div className="ref-stat-label">Avg. traffic growth</div></div>
                <div className="ref-stat"><div className="ref-stat-num">600+</div><div className="ref-stat-label">Brands grown</div></div>
                <div className="ref-stat"><div className="ref-stat-num">94%</div><div className="ref-stat-label">Client retention</div></div>
                <div className="ref-stat"><div className="ref-stat-num">8.5×</div><div className="ref-stat-label">Avg. retainer ROI</div></div>
              </div>
            </div>
            <div className="ref-hero-visual">
              <div className="ref-hero-img-main">
                <Image src="/images/hero-seo-main.jpg" alt="AI SEO Strategy & Analysis" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-hero-img-sub">
                <Image src="/images/hero-seo-team.jpg" alt="Team & Collaboration" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-hero-badge"><IconTarget /></div>
            </div>
          </div>
        </div>
      </header>

      <section className="ref-contact-banner" id="contact-top">
        <div className="wrap">
          <div className="ref-contact-inner">
            <div className="ref-contact-copy">
              <h2>Get your <em>free SEO audit</em> today.</h2>
              <p>200+ checks. No obligation. Our team reviews your site and delivers a custom AI SEO growth plan within 48 hours.</p>
            </div>
            <form className="ref-contact-form" action="/contact" method="get">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <input type="tel" placeholder="Phone Number" />
              <input type="url" placeholder="Website URL" />
              <textarea placeholder="Tell us about your SEO goals…" rows={3} />
              <div className="ref-form-submit">
                <button type="submit" className="btn btn-primary">Send My Free Audit Request <span className="arr"><ArrowRight /></span></button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-intro-grid">
            <div className="ref-intro-images">
              <div className="ref-intro-img-lg">
                <Image src="/images/intro-strategy.jpg" alt="AI Strategy & Team" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-intro-img-sm">
                <Image src="/images/intro-office.jpg" alt="Office & Work" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-intro-float" style={{ top: '205px', left: '58%' }}><IconSearch /></div>
              <div className="ref-intro-float" style={{ bottom: '140px', left: '18px' }}><IconZap /></div>
            </div>
            <div className="ref-intro-text reveal">
              <span className="eyebrow">Artificial Intelligence SEO</span>
              <h2>AI SEO Services built for the <em>modern search landscape.</em></h2>
              <p>Over the past few years, one force has reshaped every business landscape — artificial intelligence. The kind of AI-driven applications emerging in SEO and digital marketing are unprecedented.</p>
              <p>When Google&apos;s AI Overviews, ChatGPT citations, and Perplexity search changed the rules, we were ready. Omniranq deploys proven AI-powered tools and strategies to put your brand in front of buyers — not just browsers.</p>
              <p>If you want to stay ahead by investing in emerging technologies and revolutionary strategies, it is time to look at AI SEO.</p>
              <a href="#process" className="ref-cta-link">See our AI SEO process →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section-dark section" id="process">
        <div className="wrap">
          <div className="ref-process-header reveal">
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Our Method</span>
            <h2 style={{ color: 'var(--dark-ink)' }}>Omniranq&apos;s <em>AI SEO Process</em></h2>
            <p style={{ color: 'var(--dark-ink-soft)', maxWidth: 620, margin: '12px auto 0' }}>Our AI-driven SEO process is well-defined, structured in industry best practices, and tailored to the unique needs of each client.</p>
          </div>
          <div className="ref-process-grid">
            {processSteps.map(s => (
              <div className="ref-process-card reveal" key={s.num}>
                <div className="ref-process-num">{s.num}</div>
                <div className="ref-process-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="ref-features-header reveal">
            <span className="eyebrow">Why Omniranq</span>
            <h2>World-class AI SEO.<br /><em>Real competitive advantage.</em></h2>
            <p className="sub">Omniranq is a natural choice for ambitious brands looking for an AI marketing partner that manages the complexity of modern search without compromising on performance or precision.</p>
          </div>
          <div className="ref-features-grid">
            {whyUs.map(f => (
              <div className="ref-feature-card reveal" key={f.title}>
                <div className="ref-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-features-header reveal">
            <span className="eyebrow">AI Advantage</span>
            <h2>AI makes SEO <em>faster and more effective.</em></h2>
            <p className="sub">AI SEO services bring measurable advantages over traditional methods — here is what you gain when you partner with Omniranq.</p>
          </div>
          <div className="ref-features-grid">
            {advantages.map(a => (
              <div className="ref-adv-card reveal" key={a.title}>
                <div className="ref-feature-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="ref-rules-header reveal">
            <h2>The rules have <em>changed.</em></h2>
            <p>SEO in 2026 looks nothing like it did three years ago. Here&apos;s what&apos;s shifted — and why AI-first optimisation is now non-negotiable.</p>
          </div>
          <div className="ref-rules-table reveal">
            <div className="ref-rules-head">
              <div className="ref-rules-col-label ref-col-old"><span className="ref-rules-dot ref-dot-old" />OLD SEO</div>
              <div className="ref-rules-col-label ref-col-new"><span className="ref-rules-dot ref-dot-new" />NEW SEO</div>
            </div>
            {oldRules.map((old, i) => (
              <div className="ref-rules-row" key={i}>
                <div className="ref-rules-cell ref-cell-old">
                  <span className="ref-cell-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ref-cell-icon ref-cell-x">✕</span>
                  {old}
                </div>
                <div className="ref-rules-cell">
                  <span className="ref-cell-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ref-cell-icon ref-cell-check">✓</span>
                  {newRules[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-features-header reveal">
            <span className="eyebrow">Our SEO Services</span>
            <h2>Full-spectrum search <em>optimisation.</em></h2>
            <p className="sub">The following SEO services from Omniranq help businesses rank higher, get cited more, and reach buyers across every modern search platform.</p>
          </div>
          <div className="ref-features-grid">
            {seoServices.map(s => (
              <Link href={s.href || `/services/seo/${s.slug}`} className="ref-services-card reveal" key={s.slug}>
                <div className="ref-feature-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="ref-card-arrow"><ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="ref-industries-header reveal">
            <div>
              <span className="eyebrow">Industries We Work With</span>
              <h2>Omniranq delivers tailored SEO for businesses just like yours.</h2>
            </div>
            <p>We work with clients from over 300 different industries. Here are just some of the sectors we serve — if yours isn&apos;t listed, get in touch.</p>
          </div>
          <div className="ref-industries-grid">
            {industries.map(ind => (
              <Link href="/contact" className="ref-industry-tile reveal" key={ind.label}>
                <div className="ref-industry-icon">{ind.icon}</div>
                <span>{ind.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-testimonials-header reveal">
            <div>
              <span className="eyebrow">Client Testimonials</span>
              <h2>What our clients say about Omniranq.</h2>
            </div>
            <p>With hundreds of 5-star reviews, Omniranq can create a tailored plan to meet your company&apos;s online marketing goals — and deliver on it.</p>
          </div>
          <div className="ref-testimonials-grid">
            <div className="ref-reviews-panel reveal">
              <div className="ref-google-bar">
                <div className="ref-google-g">G</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>480 Google Reviews</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                    {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#FBBC04', fontSize: 16 }}>{s}</span>)}
                    <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 6, color: 'var(--ink)' }}>4.9</span>
                  </div>
                </div>
              </div>
              {reviews.map(r => (
                <div className="ref-review-card" key={r.name}>
                  <div className="ref-reviewer-row">
                    <div className="ref-reviewer-avatar" style={{ background: r.color }}>{r.initial}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 1 }}>★★★★★ · {r.ago}</div>
                    </div>
                  </div>
                  <p className="ref-review-text">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="ref-video-panel reveal">
              <div className="ref-video-thumb">
                <div className="ref-video-play">▶</div>
                <div className="ref-video-label">Client Success Story — Watch Now</div>
              </div>
              <div className="ref-video-thumbs-row">
                {[0,1,2,3].map(i => <div className="ref-video-mini" key={i}>▶</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="ref-faq-box reveal">
            <div className="ref-faq-header">
              <h2>Frequently Asked Questions</h2>
            </div>
            {faqs.map(f => (
              <details className="ref-faq-item" key={f.q}>
                <summary className="ref-faq-question">
                  {f.q}
                  <span className="ref-faq-toggle">+</span>
                </summary>
                <div className="ref-faq-answer">{f.a}</div>
              </details>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/contact" className="btn btn-primary" style={{ borderRadius: 999 }}>
              Book Your Free Audit <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
