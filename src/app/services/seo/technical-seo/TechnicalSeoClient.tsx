'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckIcon, IconLock, IconShield, IconZap, IconCheckCircle, IconSettings, IconSparkles, IconSearch, IconGlobe, IconTarget, IconCode } from '@/components/Icons'

type Props = {
  content?: Record<string, string>
}

export default function TechnicalSeoClient({ content = {} }: Props) {
  // Hero Contact Form state
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  })

  // Accordion state for Section 02 (Why AI SEO)
  const [openAccordion, setOpenAccordion] = useState<number>(0)

  async function handleHeroFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.website) {
      setFormError('Please fill out all required fields.')
      return
    }
    setFormLoading(true)
    setFormError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: 'Technical SEO & Audit',
          source: '/services/seo/technical-seo',
        }),
      })
      if (res.ok) {
        setFormSubmitted(true)
      } else {
        setFormError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setFormError('Failed to send request. Please check your connection.')
    } finally {
      setFormLoading(false)
    }
  }

  const accordionItems = [
    {
      title: 'Smarter Workflow',
      content:
        'We use the most capable AI tools to automate keyword research, data analysis and performance tracking — accelerating work, improving accuracy and freeing experts to focus on strategy.',
    },
    {
      title: 'Actionable Insights',
      content:
        'Telemetry from thousands of daily crawl events and LLM answers is distilled into clear, prioritized code fixes that move indexing and organic traffic directly.',
    },
    {
      title: 'Adaptive SEO Strategy',
      content:
        'Search engines update their ranking algorithms continuously. Our adaptive loop detects SERP pattern changes in real time and adjusts metadata, internal links, and content structure.',
    },
    {
      title: 'Audience-Focused Content',
      content:
        'High-density, answer-first content engineered for human searchers while providing clear semantic vectors that large language models cite as authoritative consensus.',
    },
    {
      title: 'Accurate Optimization',
      content:
        'Granular technical execution across JSON-LD schema graphs, server header directives, hreflang tags, canonicalization, and Core Web Vitals to remove every friction point.',
    },
  ]

  const servicesGrid = [
    {
      num: '01',
      title: 'Technical SEO',
      desc: 'Forensic fixes for crawlability, rendering, indexation, architecture & Core Web Vitals.',
      badge: 'Core Engine',
    },
    {
      num: '02',
      title: 'AI SEO',
      desc: 'AI-driven keyword discovery, semantic entity clustering, and automated content monitoring.',
      badge: 'Next-Gen',
    },
    {
      num: '03',
      title: 'LLM SEO & GEO',
      desc: 'Optimising brand mentions to be reliably cited inside ChatGPT, Perplexity, Claude & Gemini.',
      badge: 'GEO Protocol',
    },
    {
      num: '04',
      title: 'E-commerce SEO',
      desc: 'Faceted navigation architecture, product schema, feed discovery & crawl budget optimization.',
      badge: 'Revenue Scaling',
    },
    {
      num: '05',
      title: 'JavaScript SEO',
      desc: 'Eliminate client-side rendering bottlenecks in Next.js, React, Vue & headless setups.',
      badge: 'Full-Stack Fix',
    },
    {
      num: '06',
      title: 'ORM & Brand Entity',
      desc: 'Online reputation management, Knowledge Panel claiming & brand entity sentiment control.',
      badge: 'Authority',
    },
    {
      num: '07',
      title: 'Local SEO',
      desc: 'Google Business Profile, local 3-pack dominance & high-intent localized search queries.',
      badge: 'Local Intent',
    },
    {
      num: '08',
      title: 'Enterprise SEO',
      desc: 'Scale visibility safely across large web apps and multi-regional domains with 100k+ URLs.',
      badge: 'Scale',
    },
    {
      num: '09',
      title: 'SEO Audits',
      desc: 'Standalone forensic audit deliverable with reproducible GitHub pull requests, not vague decks.',
      badge: 'Forensic Audit',
    },
  ]

  const strategySteps = [
    {
      step: '1',
      title: 'AI SEO Audit',
      desc: 'Identify performance, content & technical gaps for classical engines and AI search.',
    },
    {
      step: '2',
      title: 'Keyword & Competitor Research',
      desc: 'Use AI insights to beat competitors & boost visibility across buyer-intent keywords.',
    },
    {
      step: '3',
      title: 'Strategy & Content Plan',
      desc: 'Plan high-density content that lifts UX, engagement, and entity citation rates.',
    },
    {
      step: '4',
      title: 'On-Page & Technical Optimization',
      desc: 'AI-powered fixes for LLM discovery, Core Web Vitals, and search visibility.',
    },
    {
      step: '5',
      title: 'Link Building & Authority',
      desc: 'Strengthen backlinks and brand consensus with targeted digital PR outreach.',
    },
    {
      step: '6',
      title: 'Tracking & Monthly Reporting',
      desc: 'Measure ROI, track AI citation share of voice, and make data-driven decisions.',
    },
  ]

  const deliveryPhases = [
    {
      num: '01',
      title: 'Search Data Audit',
      desc: 'Forensic technical evaluation of every crawl barrier, index lock, and rendering bottleneck.',
    },
    {
      num: '02',
      title: 'Keyword Research',
      desc: 'AI-driven discovery, search intent categorization, and topical cluster architecture.',
    },
    {
      num: '03',
      title: 'Competitor Analysis',
      desc: 'Content-gap reverse engineering and high-value ranking-opportunity mapping.',
    },
    {
      num: '04',
      title: 'Content Optimization',
      desc: 'Evaluate and improve existing pages against strict semantic and E-E-A-T guidelines.',
    },
    {
      num: '05',
      title: 'Technical Fixes',
      desc: 'Direct code resolution of crawl errors, server headers, page speed, and INP metrics.',
    },
    {
      num: '06',
      title: 'Link Building',
      desc: 'Deliberate, niche-relevant authority building and tier-1 publication mentions.',
    },
  ]

  const industries = [
    {
      name: 'SAAS',
      tagline: 'Ship faster. Retain longer.',
      desc: 'High-intent B2B search dominance, programmatic documentation SEO, and high-converting competitor comparison teardowns.',
      gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    },
    {
      name: 'EDTECH',
      tagline: 'Educate. Engage. Empower.',
      desc: 'Course curriculum search architecture, programmatic student question answers, and multi-region educational schema.',
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
    },
    {
      name: 'HEALTHCARE',
      tagline: 'Secure. Patient-first.',
      desc: 'Strict YMYL & E-E-A-T compliance, localized medical facility directories, and verified physician schema.',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
    },
    {
      name: 'MANUFACTURING',
      tagline: 'Get more leads.',
      desc: 'Complex industrial SKU search discovery, RFQ-driven technical landing pages, and international distributor SEO.',
      gradient: 'linear-gradient(135deg, #451a03 0%, #291003 100%)',
    },
    {
      name: 'RETAIL & E-COMMERCE',
      tagline: 'Connect with B2C audience.',
      desc: 'Shopify Plus & headless faceted search, product review rich snippets, and Google Merchant Center integration.',
      gradient: 'linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)',
    },
    {
      name: 'FINANCIAL SERVICES',
      tagline: 'Build trust. Automate growth.',
      desc: 'Regulatory-compliant entity authority, high-stakes keyword ranking, and authoritative fintech comparison pages.',
      gradient: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)',
    },
  ]

  const securityPillars = [
    {
      title: 'Security-First Processes',
      desc: 'Globally recognised data protection standards and zero unencrypted credential storage.',
    },
    {
      title: 'NDA-Enabled Engagement',
      desc: 'Strict mutual non-disclosure and confidentiality agreements executed as standard.',
    },
    {
      title: 'Controlled Access Management',
      desc: 'Only authorised senior team members granted least-privilege, monitored permissions.',
    },
    {
      title: 'Confidential Strategy Handling',
      desc: 'Your competitive strategy, keywords, and data telemetry are never shared or repurposed.',
    },
    {
      title: 'Transparent Agreements',
      desc: 'All deliverables, scope boundaries, and data-handling protocols documented up front.',
    },
    {
      title: 'Secure Workflow Systems',
      desc: 'All staging assets and pull requests are managed through audited, encrypted GitHub environments.',
    },
  ]

  const tools = [
    { name: 'Ahrefs', category: 'Backlink & Rank Tracking' },
    { name: 'SEMrush', category: 'Keyword & Market Intelligence' },
    { name: 'Screaming Frog', category: 'Crawl & Architecture Auditing' },
    { name: 'Google Analytics (GA4)', category: 'Traffic & Conversion Attribution' },
    { name: 'BuzzSumo', category: 'Content Research & Digital PR' },
    { name: 'Moz Pro', category: 'Domain Authority & SERP Telemetry' },
  ]

  const engagementModels = [
    {
      badge: 'Best for scaling brands',
      name: 'Growth Retainer Model',
      desc: 'Ongoing, full-scope optimization for brands aggressively scaling search performance, organic pipeline, and AI answer citations month over month.',
      features: [
        'Dedicated Senior Strategist + Full-Stack Dev support',
        'Continuous crawl budget & technical error monitoring',
        'Topical cluster roadmap & on-page execution',
        'Bi-weekly strategy sprints & direct Slack channel',
      ],
      cta: 'Explore Retainers',
    },
    {
      badge: 'Best for in-house teams',
      name: 'Strategic Advisory Model',
      desc: 'Senior strategic oversight, architecture blueprints, and code reviews for internal engineering and content teams that execute in-house.',
      features: [
        'Architectural oversight on major site migrations',
        'Sprint-level technical code reviews & QA',
        'Executive board-ready revenue & search dashboards',
        'Monthly deep-dive coaching & roadmap calibration',
      ],
      cta: 'Book Advisory',
    },
    {
      badge: 'Best for one-off goals',
      name: 'Focused Optimization Sprint',
      desc: 'A time-boxed 30 to 60-day push on a well-defined technical objective — Core Web Vitals remediation, penalty recovery, or platform migration.',
      features: [
        'Comprehensive forensic audit & pull-request deliverables',
        'Sub-second Core Web Vitals remediation sprint',
        'Algorithmic quality drop or spam recovery protocol',
        '30-day post-launch index monitoring & guarantee',
      ],
      cta: 'Start a Sprint',
    },
  ]

  const testimonials = [
    {
      quote:
        'Omniranq was instrumental in scaling our company — our rankings and organic qualified leads improved remarkably within the first four months of technical remediation.',
      author: 'David Harrison',
      company: 'Founder & CEO',
      location: 'Agency, USA',
      rating: 5,
    },
    {
      quote:
        'Cost savings were incredible compared to our previous global agency, and the quality of code-level technical execution is consistently excellent.',
      author: 'Sarah Jenkins',
      company: 'Head of Growth',
      location: 'Marketing Co., UK',
      rating: 5,
    },
    {
      quote:
        'What sets them apart is their total commitment to confidentiality and direct senior collaboration. No junior account reps — just senior engineers who deliver.',
      author: 'Marcus Thorne',
      company: 'Managing Director',
      location: 'Digital Solutions, AU',
      rating: 5,
    },
  ]

  return (
    <div className="tseo-page">
      {/* ── SECTION 01: HERO BANNER (With Integrated Contact Form & 6 Metric Boxes) ── */}
      <section className="tseo-hero">
        <div className="wrap">
          <div className="tseo-breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services">Services</Link>
            <span>/</span>
            <Link href="/services/seo">SEO</Link>
            <span>/</span>
            <span className="current">Technical SEO</span>
          </div>

          <div className="tseo-hero-grid">
            {/* Left Column: Headline, Narrative & 6 Metric Boxes */}
            <div className="tseo-hero-left">
              <span className="tseo-badge">{content.hero_badge || 'Technical SEO Services'}</span>
              <h1 className="tseo-hero-title">
                {content.hero_title ? (
                  content.hero_title
                ) : (
                  <>
                    Technical SEO Built for <em>Flawless Crawlability</em> &amp; AI Readiness.
                  </>
                )}
              </h1>
              <p className="tseo-hero-lede">
                {content.hero_lede ||
                  'We diagnose and eliminate the hidden architecture bottlenecks, render blockers, and indexing locks that prevent search engines and LLMs from discovering your highest-value pages.'}
              </p>

              {/* 6 Metric Boxes in 2x3 Grid (Slide 6 & 7) */}
              <div className="tseo-stat-grid">
                <div className="tseo-stat-box">
                  <span className="tseo-stat-val">{content.stat_1_val || '40%'}</span>
                  <span className="tseo-stat-label">{content.stat_1_label || 'Avg. Organic Traffic Lift'}</span>
                </div>
                <div className="tseo-stat-box">
                  <span className="tseo-stat-val">{content.stat_2_val || '200+'}</span>
                  <span className="tseo-stat-label">{content.stat_2_label || 'Forensic Audits Delivered'}</span>
                </div>
                <div className="tseo-stat-box">
                  <span className="tseo-stat-val">{content.stat_3_val || '60'}</span>
                  <span className="tseo-stat-label">{content.stat_3_label || 'Days to Green Vitals'}</span>
                </div>
                <div className="tseo-stat-box">
                  <span className="tseo-stat-val">{content.stat_4_val || '94%'}</span>
                  <span className="tseo-stat-label">{content.stat_4_label || 'Client Retention Rate'}</span>
                </div>
                <div className="tseo-stat-box">
                  <span className="tseo-stat-val">{content.stat_5_val || '3×'}</span>
                  <span className="tseo-stat-label">{content.stat_5_label || 'Increase in AI Citations'}</span>
                </div>
                <div className="tseo-stat-box">
                  <span className="tseo-stat-val">{content.stat_6_val || '24/7'}</span>
                  <span className="tseo-stat-label">{content.stat_6_label || 'Continuous Uptime & Indexing'}</span>
                </div>
              </div>

              <div className="tseo-hero-actions">
                <a href="#audit-form" className="btn btn-primary">
                  Book Technical Audit <span className="arr"><ArrowRight /></span>
                </a>
                <a href="#delivery-process" className="btn btn-ghost">
                  View Delivery Process
                </a>
              </div>
            </div>

            {/* Right Column: Hero Contact-Us Form (Slide 6) */}
            <div className="tseo-hero-right" id="audit-form">
              <div className="tseo-form-card">
                <div className="tseo-form-head">
                  <span className="tseo-form-tag">Instant Response • Under 24h</span>
                  <h3>Get a Free Technical Audit</h3>
                  <p>Our senior technical architects will inspect your site and return 3 critical fixes.</p>
                </div>

                {formSubmitted ? (
                  <div className="tseo-form-success">
                    <span className="tseo-success-icon"><CheckIcon /></span>
                    <h4>Audit Request Received!</h4>
                    <p>One of our senior engineers is currently analyzing your domain. We will email your initial findings within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroFormSubmit} className="tseo-form">
                    {formError && <div className="tseo-form-error">{formError}</div>}
                    <div className="tseo-field">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        placeholder="Elena Vance"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="tseo-field">
                      <label>Business Email *</label>
                      <input
                        type="email"
                        placeholder="elena@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="tseo-field">
                      <label>Website URL *</label>
                      <input
                        type="text"
                        placeholder="https://yourcompany.com"
                        value={formData.website}
                        onChange={e => setFormData({ ...formData, website: e.target.value })}
                        required
                      />
                    </div>
                    <div className="tseo-field">
                      <label>Message / Critical Issues (Optional)</label>
                      <textarea
                        placeholder="Tell us about recent drops, migrations, or Core Web Vitals issues..."
                        rows={3}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary tseo-submit-btn" disabled={formLoading}>
                      {formLoading ? 'Submitting Audit Request...' : (content.hero_cta_btn || 'Get A Free Audit')}
                      <span className="arr"><ArrowRight /></span>
                    </button>
                    <div className="tseo-form-guarantee">
                      <IconLock /> {content.hero_guarantee || '100% Confidential • Signed NDA protection as standard'}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 02: WHY YOU NEED AI SEO SERVICES (Ref: Drinfosoft, Slide 8) ── */}
      <section className="section tseo-why-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 840, margin: '0 auto 48px' }}>
            <span className="eyebrow">{content.why_eyebrow || 'Next-Gen SEO Paradigm'}</span>
            <h2 className="serif">{content.why_heading ? content.why_heading : <>Why you need <em>AI SEO services.</em></>}</h2>
            <p className="sub">
              {content.why_subtext ||
                'Search engines and LLMs no longer just match keywords. They evaluate technical rendering speed, structured data entities, and authority consensus.'}
            </p>
          </div>

          {/* 4 Pillars Strip */}
          <div className="tseo-pillars-grid">
            <div className="tseo-pillar-card">
              <span className="tseo-pillar-tag">SEO</span>
              <h4>Classic Organic</h4>
              <p>Rank pages and build sustainable organic traffic across Google, Bing, and search engines.</p>
            </div>
            <div className="tseo-pillar-card">
              <span className="tseo-pillar-tag">AEO</span>
              <h4>Answer Engines</h4>
              <p>Win featured snippets, direct knowledge panels, and voice-assisted answer surfaces.</p>
            </div>
            <div className="tseo-pillar-card">
              <span className="tseo-pillar-tag">GEO</span>
              <h4>Generative Discovery</h4>
              <p>Structure your proprietary data so LLMs parse and cite your brand inside synthesized answers.</p>
            </div>
            <div className="tseo-pillar-card">
              <span className="tseo-pillar-tag">AI Overview</span>
              <h4>Deep Structured Content</h4>
              <p>Produce high-density, authoritative schema graphs that modern algorithms prioritize.</p>
            </div>
          </div>

          {/* 5-Item Interactive Accordion (Slide 8) */}
          <div className="tseo-accordion-wrap">
            {accordionItems.map((item, idx) => {
              const isOpen = openAccordion === idx
              return (
                <div className={`tseo-accordion-item${isOpen ? ' open' : ''}`} key={item.title}>
                  <button
                    type="button"
                    className="tseo-accordion-header"
                    onClick={() => setOpenAccordion(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="tseo-accordion-title">{item.title}</span>
                    <span className="tseo-accordion-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="tseo-accordion-body">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 03: RANK ACROSS SEARCH & AI PLATFORMS (Ref: Drinfosoft, Slide 9) ── */}
      <section className="section tseo-platforms-section">
        <div className="wrap">
          <div className="tseo-platforms-box">
            <div className="tseo-platforms-text">
              <span className="tseo-badge">{content.plat_badge || 'Next-Gen Search Matrix'}</span>
              <h2 className="serif">{content.plat_heading ? content.plat_heading : <>Rank across <em>Search &amp; AI platforms.</em></>}</h2>
              <p>
                {content.plat_subtext ||
                  'Search behaviour is changing. Users now expect direct answers, comprehensive summaries, and AI-curated insights. We engineer your technical infrastructure so your company ranks on classic engines and modern AI answer platforms alike.'}
              </p>
              <div className="tseo-platforms-cta">
                <a href="#audit-form" className="btn btn-primary">
                  {content.plat_cta || 'Unlock AI SEO Now'} <span className="arr"><ArrowRight /></span>
                </a>
              </div>
            </div>

            <div className="tseo-platforms-grid">
              <div className="tseo-platform-pill">
                <span className="tseo-plat-icon"><IconSparkles /></span>
                <strong>ChatGPT</strong>
                <span>Search &amp; Citations</span>
              </div>
              <div className="tseo-platform-pill">
                <span className="tseo-plat-icon"><IconSearch /></span>
                <strong>Google</strong>
                <span>Organic &amp; AI Overviews</span>
              </div>
              <div className="tseo-platform-pill">
                <span className="tseo-plat-icon"><IconZap /></span>
                <strong>Perplexity</strong>
                <span>Pro Answer Citations</span>
              </div>
              <div className="tseo-platform-pill">
                <span className="tseo-plat-icon"><IconGlobe /></span>
                <strong>Bing</strong>
                <span>Copilot &amp; Generative</span>
              </div>
              <div className="tseo-platform-pill">
                <span className="tseo-plat-icon"><IconTarget /></span>
                <strong>Gemini</strong>
                <span>Ecosystem Grounding</span>
              </div>
              <div className="tseo-platform-pill">
                <span className="tseo-plat-icon"><IconCode /></span>
                <strong>Claude</strong>
                <span>Artifact &amp; Knowledge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 04: SEO SERVICES GRID — 9 BOXES (Ref: Techmagnate, Slide 10) ── */}
      <section className="section tseo-services-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 800, margin: '0 auto 56px' }}>
            <span className="eyebrow">{content.svc_eyebrow || 'Services Matrix'}</span>
            <h2 className="serif">{content.svc_heading ? content.svc_heading : <>Comprehensive SEO services — <em>9 core disciplines.</em></>}</h2>
            <p className="sub">{content.svc_subtext || 'We cover every technical layer: from rendering pipelines and crawl traps to enterprise architecture and index pruning.'}</p>
          </div>

          <div className="tseo-services-grid">
            {servicesGrid.map(svc => (
              <div className="tseo-service-card" key={svc.num}>
                <div className="tseo-svc-head">
                  <span className="tseo-svc-num">{svc.num}</span>
                  <span className="tseo-svc-badge">{svc.badge}</span>
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <div className="tseo-svc-link">
                  <a href="#audit-form">Request Scope →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 05: HOW OUR AI SEO STRATEGY WORKS (Slide 11) ── */}
      <section className="section tseo-strategy-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 840, margin: '0 auto 56px' }}>
            <span className="eyebrow">Strategic Methodology</span>
            <h2 className="serif">How our AI SEO strategy <em>actually works.</em></h2>
            <p className="sub">A 6-stage continuous compounding feedback loop designed for sustained organic supremacy.</p>
          </div>

          <div className="tseo-strategy-grid">
            {strategySteps.map(step => (
              <div className="tseo-strategy-card" key={step.step}>
                <div className="tseo-strategy-step-num">{step.step}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIONS 06 & 07: DELIVERY PROCESS (Slide 12) ── */}
      <section className="section tseo-delivery-section" id="delivery-process">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 800, margin: '0 auto 56px' }}>
            <span className="eyebrow">Service Delivery</span>
            <h2 className="serif">The technical delivery <em>process.</em></h2>
            <p className="sub">From forensic search audits to deliberate link-building — our proven 6-phase sprint model.</p>
          </div>

          <div className="tseo-delivery-timeline">
            {deliveryPhases.map(phase => (
              <div className="tseo-delivery-step" key={phase.num}>
                <div className="tseo-delivery-num-badge">{phase.num}</div>
                <div className="tseo-delivery-content">
                  <h4>{phase.title}</h4>
                  <p>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 08: INDUSTRIES WE CATER TO (Slide 13) ── */}
      <section className="section tseo-industries-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 800, margin: '0 auto 56px' }}>
            <span className="eyebrow">Vertical Expertise</span>
            <h2 className="serif">Industries we cater to.</h2>
            <p className="sub">Specialized technical search strategies calibrated to your business model and regulatory landscape.</p>
          </div>

          <div className="tseo-industries-grid">
            {industries.map(ind => (
              <div className="tseo-industry-card" key={ind.name}>
                <div className="tseo-ind-cover" style={{ background: ind.gradient }}>
                  <span className="tseo-ind-tag">{ind.name}</span>
                  <span className="tseo-ind-tagline">{ind.tagline}</span>
                </div>
                <div className="tseo-ind-body">
                  <h4>{ind.name}</h4>
                  <p>{ind.desc}</p>
                  <a href="#audit-form" className="tseo-ind-cta">Explore {ind.name} SEO →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 09: REPORTING & COMMUNICATION (Slide 14) ── */}
      <section className="section tseo-reporting-section">
        <div className="wrap">
          <div className="tseo-reporting-box">
            <div className="tseo-reporting-content">
              <span className="tseo-badge">{content.report_badge || 'Radical Transparency'}</span>
              <h2 className="serif">{content.report_heading ? content.report_heading : <>Reporting &amp; communication <em>built for leaders.</em></>}</h2>
              <p>
                {content.report_subtext ||
                  'No dense 80-page automated PDF exports that nobody reads. We operate with clean, live Looker Studio telemetry and direct communication with the senior team doing the work.'}
              </p>
              <div className="tseo-reporting-perks">
                <div className="tseo-perk">
                  <span className="tseo-perk-check"><CheckIcon /></span>
                  <div>
                    <strong>Private Client Slack Channel</strong>
                    <span>Direct access to lead technical SEOs, not account coordinators.</span>
                  </div>
                </div>
                <div className="tseo-perk">
                  <span className="tseo-perk-check"><CheckIcon /></span>
                  <div>
                    <strong>Live Revenue &amp; Indexation Dashboard</strong>
                    <span>24/7 access to Google Search Console, GA4 attribution, and LLM share-of-voice.</span>
                  </div>
                </div>
                <div className="tseo-perk">
                  <span className="tseo-perk-check"><CheckIcon /></span>
                  <div>
                    <strong>Bi-Weekly Strategic Sprint Syncs</strong>
                    <span>30-minute high-leverage calls to review shipped pull requests and upcoming experiments.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: DATA SECURITY & OPERATIONAL INTEGRITY (Slide 15) ── */}
      <section className="section tseo-security-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 840, margin: '0 auto 56px' }}>
            <span className="eyebrow">{content.sec_eyebrow || 'Trust & Protection'}</span>
            <h2 className="serif">{content.sec_heading ? content.sec_heading : <>Data security &amp; <em>operational integrity.</em></>}</h2>
            <p className="sub">{content.sec_subtext || 'Our commitment: measurable growth, responsible execution, and absolute confidentiality.'}</p>
          </div>

          <div className="tseo-security-grid">
            {securityPillars.map(p => (
              <div className="tseo-security-card" key={p.title}>
                <span className="tseo-sec-icon"><IconLock /></span>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="tseo-compliance-strip">
            <span className="tseo-comp-item"><IconShield /> Legally Protected</span>
            <span className="tseo-comp-sep">•</span>
            <span className="tseo-comp-item"><IconLock /> Data Confidentiality</span>
            <span className="tseo-comp-sep">•</span>
            <span className="tseo-comp-item"><IconZap /> No Unauthorized Changes</span>
            <span className="tseo-comp-sep">•</span>
            <span className="tseo-comp-item"><IconCheckCircle /> Compliance-Driven</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: TOOLS WE USE (Slide 16) ── */}
      <section className="section tseo-tools-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 780, margin: '0 auto 48px' }}>
            <span className="eyebrow">{content.tools_eyebrow || 'Enterprise Tech Stack'}</span>
            <h2 className="serif">{content.tools_heading ? content.tools_heading : <>Tools which we use.</>}</h2>
            <p className="sub">{content.tools_subtext || 'The battle-tested software matrix that powers data-driven strategy, precise tracking, and seamless execution.'}</p>
          </div>

          <div className="tseo-tools-grid">
            {tools.map(t => (
              <div className="tseo-tool-card" key={t.name}>
                <span className="tseo-tool-icon"><IconSettings /></span>
                <h4>{t.name}</h4>
                <span>{t.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: TRANSPARENT PRICING (Slide 18) ── */}
      <section className="section tseo-pricing-section" id="pricing">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 840, margin: '0 auto 56px' }}>
            <span className="eyebrow">{content.pricing_badge || 'Predictable Investment'}</span>
            <h2 className="serif">{content.pricing_heading ? content.pricing_heading : <>Transparent pricing.</>}</h2>
            <p className="sub">{content.pricing_subtext || 'Pricing designed for clarity, ethical execution, and predictable growth. One flagship program, customized by scope.'}</p>
          </div>

          <div className="tseo-pricing-center">
            <div className="tseo-pricing-card">
              <span className="tseo-pricing-tag">Flagship Retainer</span>
              <h3>{content.pricing_plan_title || 'AI-Driven SEO Growth Program'}</h3>
              <p className="tseo-pricing-desc">{content.pricing_plan_desc || 'Consistent visibility across Google Search, Maps, and AI-powered discovery platforms.'}</p>

              <div className="tseo-price-row">
                <span className="tseo-price-val">{content.pricing_price_val || '₹15,000 – ₹1,00,000'}</span>
                <span className="tseo-price-unit">{content.pricing_price_unit || '/ month*'}</span>
              </div>
              <span className="tseo-price-sub">{content.pricing_price_sub || '*Customised based on scope, competition & AI SEO depth'}</span>

              <ul className="tseo-pricing-checklist">
                <li><span><CheckIcon /></span> AI SEO execution (AEO, GEO &amp; AI-ready structuring)</li>
                <li><span><CheckIcon /></span> Optimisation for ChatGPT, Gemini &amp; AI discovery</li>
                <li><span><CheckIcon /></span> Technical SEO (indexing, performance &amp; Core Web Vitals)</li>
                <li><span><CheckIcon /></span> On-page SEO (schema, metadata &amp; intent alignment)</li>
                <li><span><CheckIcon /></span> Local SEO &amp; Google Business profile ranking</li>
                <li><span><CheckIcon /></span> Monthly reporting, ROI tracking &amp; visibility insights</li>
              </ul>

              <a href="#audit-form" className="btn btn-primary tseo-pricing-btn">
                {content.pricing_btn_text || 'Request a Custom AI SEO Strategy'} <span className="arr"><ArrowRight /></span>
              </a>
              <span className="tseo-pricing-note"><IconLock /> {content.pricing_note || 'Month-to-month after 90 days • You own all code & assets'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: ENGAGEMENT MODELS (Slide 20) ── */}
      <section className="section tseo-models-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 840, margin: '0 auto 56px' }}>
            <span className="eyebrow">Flexible Partnership</span>
            <h2 className="serif">Flexible engagement models.</h2>
            <p className="sub">Adaptable structures suited to different growth stages — aligning scope, reporting depth, and strategic involvement with business maturity.</p>
          </div>

          <div className="tseo-models-grid">
            {engagementModels.map(model => (
              <div className="tseo-model-card" key={model.name}>
                <span className="tseo-model-badge">{model.badge}</span>
                <h3>{model.name}</h3>
                <p>{model.desc}</p>
                <ul className="tseo-model-features">
                  {model.features.map(f => (
                    <li key={f}><span><CheckIcon /></span> {f}</li>
                  ))}
                </ul>
                <a href="#audit-form" className="btn btn-ghost tseo-model-cta">
                  {model.cta} <span className="arr"><ArrowRight /></span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 14: CLIENT TESTIMONIALS (Slide 21) ── */}
      <section className="section tseo-testimonials-section">
        <div className="wrap">
          <div className="sec-head text-center" style={{ maxWidth: 800, margin: '0 auto 56px' }}>
            <span className="eyebrow">Verified Outcomes</span>
            <h2 className="serif">Client testimonials.</h2>
            <p className="sub">Unedited feedback from engineering directors, founders, and growth leads.</p>
          </div>

          <div className="tseo-testimonials-grid">
            {testimonials.map((t, idx) => (
              <div className="tseo-testimonial-card" key={idx}>
                <div className="tseo-stars">★★★★★</div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="tseo-testi-author">
                  <strong>{t.author}</strong>
                  <span>{t.company} • {t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 15: FINAL CONVERSION BAND (Slide 22) ── */}
      <section className="tseo-final-cta-section">
        <div className="wrap">
          <div className="tseo-final-cta-box">
            <span className="tseo-badge tseo-badge-light">{content.cta_badge || 'Take Action'}</span>
            <h2 className="serif">{content.cta_heading ? content.cta_heading : <>Get a free SEO audit today.</>}</h2>
            <p>
              {content.cta_subtext ||
                'We analyse your server response times, index coverage, crawl efficiency, and entity footprint to surface high-leverage growth opportunities. No sales decks, just real findings.'}
            </p>
            <div className="tseo-final-cta-btn-wrap">
              <a href="#audit-form" className="btn btn-primary btn-lg">
                {content.cta_btn_text || 'Get a Free SEO Audit Today'} <span className="arr"><ArrowRight /></span>
              </a>
            </div>
            <span className="tseo-final-note"><IconLock /> {content.cta_note || '100% Free • Delivered within 24 hours by a Senior SEO'}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
