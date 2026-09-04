'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckIcon,
  IconLock,
  IconPalette,
  IconShoppingCart,
  IconZap,
  IconFileText,
  IconRefresh,
  IconTarget,
  IconSmartphone,
  IconBarChart,
  IconShield,
  IconSparkles,
  IconTrendingUp,
} from '@/components/Icons'

type Props = {
  content?: Record<string, string>
}

const serviceItems = [
  {
    iconType: 'palette',
    title: 'Custom Website Design',
    tag: 'Bespoke UI/UX',
    desc: 'Unique, brand-centric website design crafted from blank canvas in Figma. No cookie-cutter templates — every typography hierarchy, micro-interaction, and layout is engineered to elevate your brand authority.',
    bullets: ['Figma interactive prototypes', 'Design systems & style guides', 'Custom brand illustrations', 'Micro-animations & transitions'],
  },
  {
    iconType: 'cart',
    title: 'Shopify & E-Commerce Design',
    tag: 'Conversion-Led',
    desc: 'High-converting Shopify and Shopify Plus storefronts designed to maximize average order value (AOV) and streamline checkout flows with custom product pages, cart drawers, and upsells.',
    bullets: ['Custom Shopify Liquid themes', 'Shopify Plus checkout branding', 'Mobile-first product pages', '1-click checkout & bundle UX'],
  },
  {
    iconType: 'zap',
    title: 'Next.js & React Web Apps',
    tag: 'Ultra-Fast',
    desc: 'Headless, lightning-fast web applications built on modern Next.js and React architecture. Experience sub-second page loads, 100/100 Core Web Vitals, and effortless enterprise scalability.',
    bullets: ['Server-side rendering (SSR)', 'Dynamic routing & metadata', 'Headless CMS integrations', 'Edge deployment on Vercel/VPS'],
  },
  {
    iconType: 'file',
    title: 'WordPress & Headless CMS',
    tag: 'Flexible CMS',
    desc: 'Custom-built WordPress and modern CMS themes that give your marketing team full editorial power without risking code breakage or visual degradation.',
    bullets: ['Gutenberg block systems', 'Zero bloat custom code', 'Advanced custom fields (ACF)', 'Headless API architecture'],
  },
  {
    iconType: 'refresh',
    title: 'Website Redesign & Modernization',
    tag: 'Zero SEO Loss',
    desc: 'Transform outdated, slow websites into modern conversion powerhouses while safeguarding existing search rankings, URLs, backlink equity, and conversion funnels.',
    bullets: ['Complete SEO URL migration', 'Modernized aesthetic & brand feel', 'Core Web Vitals remediation', 'Mobile usability overhaul'],
  },
  {
    iconType: 'target',
    title: 'High-Converting Landing Pages',
    tag: 'Paid Ads & CRO',
    desc: 'Dedicated landing pages engineered specifically for PPC, Meta Ads, and product launches with razor-sharp value propositions, trust proof, and zero distraction.',
    bullets: ['A/B testing ready', 'Dynamic headline insertion', 'Frictionless lead forms', 'Heatmap & CRO tracking setup'],
  },
  {
    iconType: 'mobile',
    title: 'Mobile-First Responsive UX',
    tag: 'Omni-Device',
    desc: 'Over 70% of web traffic is mobile. We design mobile experiences with thumb-friendly touch targets, swipeable carousels, and instant tactile responsiveness.',
    bullets: ['iOS & Android testing', 'Adaptive image compression', 'Fluid typography & grids', 'Bottom-sheet navigation patterns'],
  },
  {
    iconType: 'chart',
    title: 'SaaS & Dashboard UI/UX',
    tag: 'Complex Systems',
    desc: 'Intuitive web app interfaces and customer portals that make complex data, analytics, and multi-step user onboarding effortless and enjoyable.',
    bullets: ['Complex workflow wireframing', 'Dark & light mode themes', 'Data visualization & charts', 'User role & access UX'],
  },
  {
    iconType: 'shield',
    title: 'Maintenance, Security & Care',
    tag: 'Ongoing Growth',
    desc: 'Continuous post-launch optimization, security audits, plugin updates, speed monitoring, and dedicated developer hours to keep your website performing at its peak.',
    bullets: ['24/7 uptime monitoring', 'Weekly security patches', 'Quarterly CRO sprints', 'Dedicated Slack communication'],
  },
]

const techStack = [
  {
    category: 'Design & Prototyping',
    items: ['Figma', 'Adobe XD', 'Framer', 'Illustrator', 'Photoshop', 'Principle'],
  },
  {
    category: 'Frontend & Architecture',
    items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vanilla CSS', 'WebGL / Three.js'],
  },
  {
    category: 'CMS & E-Commerce Platforms',
    items: ['Shopify Plus', 'Shopify Liquid', 'WordPress', 'WooCommerce', 'Webflow', 'Strapi Headless'],
  },
  {
    category: 'Integrations & Analytics',
    items: ['Google Analytics 4', 'HubSpot CRM', 'Stripe Payments', 'Klaviyo', 'Zapier', 'Segment'],
  },
]

const whyChooseUs = [
  { title: '12+ Years Experience', desc: 'Over a decade of designing and building top-tier web solutions for high-growth businesses.' },
  { title: 'Agile Sprint Model', desc: 'Transparent 2-week sprints with live staging links, weekly video demos, and continuous progress.' },
  { title: 'Senior Designers Only', desc: 'Every project is personally led by senior creative directors and full-stack architects.' },
  { title: 'Conversion-Focused UI', desc: 'We do not just make sites look pretty — every section is structured to drive qualified inquiries and sales.' },
  { title: 'Sub-Second Speed Guarantee', desc: '95+ Google PageSpeed score and green Core Web Vitals delivered out of the box.' },
  { title: '100% Asset Ownership', desc: 'Full ownership of all Figma files, source code, production assets, and database credentials.' },
  { title: 'Signed Mutual NDA', desc: 'Your confidential product ideas, business data, and strategy are protected before work begins.' },
  { title: 'SEO-Engineered Code', desc: 'Clean semantic HTML5, JSON-LD Schema markup, Open Graph tags, and crawlable structure.' },
  { title: 'Strict Cross-Device QA', desc: 'Rigorous testing across Safari, Chrome, Edge, Firefox, iOS, Android, tablets, and 4K displays.' },
  { title: 'Transparent Milestone Pricing', desc: 'Fixed-price scopes with clear deliverables. No surprise invoices or hidden maintenance fees.' },
  { title: 'Zero Template Bloat', desc: 'Custom tailored solutions built specifically for your workflow, avoiding heavy plugin bloat.' },
  { title: 'Post-Launch Warranty', desc: '30-day comprehensive post-launch bug warranty plus optional continuous growth retainers.' },
]

const portfolioProjects = [
  {
    name: 're.skin',
    category: 'Shopify Plus / DTC Skincare',
    result: '+284% Mobile Conversion',
    desc: 'Custom headless e-commerce store with interactive skin quiz, personalized subscription bundles, and sub-second checkout.',
    tags: ['Shopify Plus', 'Custom Theme', 'CRO', 'UX Research'],
    gradient: 'g1',
  },
  {
    name: 'Birch + Balm',
    category: 'E-Commerce / Clean Beauty',
    result: '3.4x Average Order Value',
    desc: 'Complete brand identity and multi-currency Shopify storefront built with interactive ingredient showcases and reviews engine.',
    tags: ['Custom Design', 'Shopify', 'Brand Identity', 'Speed'],
    gradient: 'g2',
  },
  {
    name: 'Vitally Health',
    category: 'Custom Web Platform / HealthTech',
    result: '$4.2M ARR Scaled',
    desc: 'Next.js web platform with tailored daily vitamin formulation builder, recurring billing logic, and customer portal.',
    tags: ['Next.js', 'React', 'Tailwind', 'Stripe'],
    gradient: 'g3',
  },
  {
    name: 'Northbound Goods',
    category: 'Lifestyle & Apparel / E-Commerce',
    result: '+412% Organic Traffic',
    desc: 'Editorial-style online store featuring high-res lookbooks, instant filter search, and optimized Google AIO ranking markup.',
    tags: ['Shopify', 'Editorial UI', 'SEO Architecture'],
    gradient: 'g4',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    desc: 'We analyze your target audience, competitor landscape, current conversion roadblocks, and business objectives to establish the visual and functional roadmap.',
  },
  {
    step: '02',
    title: 'Wireframing & UX Architecture',
    desc: 'We map out the user journey, page hierarchy, and content layout through high-fidelity wireframes before designing visual elements.',
  },
  {
    step: '03',
    title: 'UI Design & Interactive Prototype',
    desc: 'Our senior designers craft custom visual screens in Figma with realistic typography, imagery, micro-interactions, and mobile viewports for your feedback.',
  },
  {
    step: '04',
    title: 'Full-Stack Development',
    desc: 'We code your website with clean, performant Next.js, Shopify, or WordPress standards, integrating all third-party APIs, forms, and analytics.',
  },
  {
    step: '05',
    title: 'QA, Speed Audit & Launch',
    desc: 'Stringent cross-browser testing, accessibility audit, Core Web Vitals optimization, zero-downtime DNS deployment, and client training handover.',
  },
]

const webDesignFaqs = [
  {
    q: 'How much does a custom website or Shopify store design cost?',
    a: 'Our web design projects typically range from $4,000 to $18,000 depending on project scope, number of unique page templates, custom animations, and integrations (e.g., custom Shopify apps or complex headless architectures). We provide fixed-price proposals with zero surprise fees after our initial discovery call.',
  },
  {
    q: 'How long does a complete website design and development project take?',
    a: 'Most custom websites launch within 4 to 8 weeks. Simple high-impact landing pages take 1-2 weeks, while large-scale e-commerce stores with custom migrations take 6-10 weeks. We work in transparent 2-week sprints so you see live progress every week.',
  },
  {
    q: 'Do you design custom themes or use pre-made templates?',
    a: 'We design 100% bespoke websites tailored to your exact brand and conversion goals. We do not use bloated pre-made templates. Every line of CSS and every Figma layout is crafted specifically for your business, ensuring fast load speeds and distinct market positioning.',
  },
  {
    q: 'Will my new website be optimized for SEO and Google AI Overviews?',
    a: 'Yes, absolutely. Every site we build includes semantic HTML5 hierarchy, structured JSON-LD Schema markup, optimized Core Web Vitals (sub-second LCP), automated XML sitemaps, Open Graph social tags, and clean URLs that search engines and AI engines can crawl effortlessly.',
  },
  {
    q: 'Can our team easily edit text, add blog posts, and change images after launch?',
    a: 'Yes. We provide an intuitive CMS setup (custom WordPress Gutenberg blocks, Shopify section builders, or headless admin panels) accompanied by video walkthrough documentation so anyone on your team can edit content without touching code.',
  },
  {
    q: 'Do you offer ongoing website maintenance and support?',
    a: 'Yes. We provide flexible post-launch support retainers covering security monitoring, speed maintenance, CRO A/B testing, design updates, and new feature rollouts. Every client also receives a complimentary 30-day bug warranty post-launch.',
  },
  {
    q: 'Who owns the website and design files once the project is finished?',
    a: 'You do. Upon project completion and final milestone settlement, 100% of all intellectual property, Figma design files, source code repositories, and assets are transferred entirely to your company.',
  },
  {
    q: 'Will you sign a non-disclosure agreement (NDA) before we discuss details?',
    a: 'Yes. We frequently work with confidential startups, challenger brands, and proprietary tech. We are pleased to execute our standard mutual NDA or review yours prior to our initial discovery session.',
  },
]

export default function WebDesignClient({ content = {} }: Props) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Custom Website Design',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  async function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service: formState.serviceType,
          message: `[Web Design Proposal Request - ${formState.serviceType}]\nPhone: ${formState.phone}\nDetails: ${formState.message}`,
          _t: Date.now() - 3000,
        }),
      })
      if (res.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="wd-page">
      {/* ─── 1. HERO WITH INTEGRATED PROPOSAL FORM ─── */}
      <section className="wd-hero">
        <div className="wrap">
          <div className="crumb" style={{ marginBottom: 20 }}>
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>Web Design</span>
          </div>

          <div className="wd-hero-grid">
            {/* Left Content */}
            <div className="wd-hero-left reveal in">
              <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
                <ol style={{ display: 'inline-flex', alignItems: 'center', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: 'var(--ink-soft)' }}>
                  <li><Link href="/" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Home</Link></li>
                  <li>/</li>
                  <li><Link href="/services" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Services</Link></li>
                  <li>/</li>
                  <li aria-current="page" style={{ color: 'var(--accent)', fontWeight: 600 }}>Web Design</li>
                </ol>
              </nav>
              <span className="wd-badge"><IconSparkles /> {content.hero_badge || 'Bespoke Web Design & Shopify Studio'}</span>
              <h1 className="wd-hero-title">
                {content.hero_title ? (
                  content.hero_title
                ) : (
                  <>
                    High-Converting <em>Web Design</em> &amp; Shopify Stores Built for Revenue.
                  </>
                )}
              </h1>
              <p className="wd-hero-lede">
                {content.hero_lede ||
                  'We craft bespoke websites with next-gen speed, interactive UX, and measurable ROI. From custom Figma prototypes to sub-second Next.js and Shopify builds, our team turns visitors into loyal customers.'}
              </p>

              {/* 4 Feature Badges */}
              <div className="wd-feature-pills">
                <div className="wd-pill">
                  <span className="wd-pill-icon"><IconShield /></span>
                  <div>
                    <strong>Support &amp; 24/7 Care</strong>
                    <span>30-day post-launch warranty &amp; SLA</span>
                  </div>
                </div>
                <div className="wd-pill">
                  <span className="wd-pill-icon"><IconZap /></span>
                  <div>
                    <strong>Sub-Second Load Times</strong>
                    <span>95+ PageSpeed &amp; Core Web Vitals</span>
                  </div>
                </div>
                <div className="wd-pill">
                  <span className="wd-pill-icon"><IconPalette /></span>
                  <div>
                    <strong>Top 1% UI/UX Designers</strong>
                    <span>Zero templates, 100% bespoke craft</span>
                  </div>
                </div>
                <div className="wd-pill">
                  <span className="wd-pill-icon"><IconTrendingUp /></span>
                  <div>
                    <strong>Built-In SEO &amp; AI Search</strong>
                    <span>Structured data for Google &amp; LLMs</span>
                  </div>
                </div>
              </div>

              {/* Trust Rating Bar */}
              <div className="wd-rating-strip">
                <div className="wd-stars">
                  <span style={{ color: '#ff5a1f' }}>★</span>
                  <span style={{ color: '#ff5a1f' }}>★</span>
                  <span style={{ color: '#ff5a1f' }}>★</span>
                  <span style={{ color: '#ff5a1f' }}>★</span>
                  <span style={{ color: '#ff5a1f' }}>★</span>
                </div>
                <span className="wd-rating-text">
                  {content.hero_rating_text || '4.9 / 5 across 412+ verified reviews on Clutch, Google & Trustpilot'}
                </span>
              </div>
            </div>

            {/* Right Hero Lead Capture Form */}
            <div className="wd-hero-right reveal in">
              <div className="wd-form-card">
                <div className="wd-form-head">
                  <span className="wd-form-tag">Fast Response</span>
                  <h3>{content.hero_form_title || 'Get a Free Custom Proposal'}</h3>
                  <p>{content.hero_form_sub || 'Tell us about your project — we will reply with an estimate & timeline within 4 hours.'}</p>
                </div>

                {formStatus === 'success' ? (
                  <div className="wd-form-success">
                    <div className="wd-success-icon"><CheckIcon /></div>
                    <h4>Proposal Request Received!</h4>
                    <p>Our senior design strategist is reviewing your requirements and will email your tailored proposal shortly.</p>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ marginTop: 16 }}
                      onClick={() => setFormStatus('idle')}
                    >
                      Submit Another Project
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="wd-form">
                    <div className="wd-form-field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        required
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>

                    <div className="wd-form-row">
                      <div className="wd-form-field">
                        <label>Work Email *</label>
                        <input
                          type="email"
                          placeholder="sarah@company.com"
                          required
                          value={formState.email}
                          onChange={e => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                      <div className="wd-form-field">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={formState.phone}
                          onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="wd-form-field">
                      <label>Project Type</label>
                      <select
                        value={formState.serviceType}
                        onChange={e => setFormState({ ...formState, serviceType: e.target.value })}
                      >
                        <option value="Custom Website Design">Custom Website Design (Figma + Code)</option>
                        <option value="Shopify E-Commerce Store">Shopify / E-Commerce Store Design</option>
                        <option value="Website Redesign">Complete Website Redesign</option>
                        <option value="Next.js Web App UI/UX">Next.js / Web App UI/UX</option>
                        <option value="WordPress CMS Build">WordPress / Headless CMS Build</option>
                        <option value="Landing Page & CRO">High-Converting Landing Page</option>
                      </select>
                    </div>

                    <div className="wd-form-field">
                      <label>Project Brief</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your timeline, current website URL, or goals..."
                        required
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="wd-form-error">Could not send request. Please try again or email us directly.</div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary wd-form-btn"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Preparing Proposal...' : 'Get Free Proposal'}
                      <span className="arr"><ArrowRight /></span>
                    </button>

                    <div className="wd-form-foot">
                      <span><IconLock /> 100% Privacy with Mutual NDA</span>
                      <span>•</span>
                      <span>No Spam Guarantee</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. TRUSTED BY LOGO STRIP ─── */}
      <section className="wd-trust-section">
        <div className="wrap">
          <div className="wd-trust-label">TRUSTED BY 600+ CHALLENGER BRANDS, DTC FOUNDERS & SCALE-UPS WORLDWIDE</div>
          <div className="wd-trust-grid">
            <span className="wd-trust-item">Maple & Oak</span>
            <span className="wd-trust-item">Northbound</span>
            <span className="wd-trust-item">FERN Studios</span>
            <span className="wd-trust-item">Habitat Goods</span>
            <span className="wd-trust-item">Cresta Health</span>
            <span className="wd-trust-item">Solace Yoga</span>
            <span className="wd-trust-item">Birch Architects</span>
            <span className="wd-trust-item">Vitally</span>
          </div>
        </div>
      </section>

      {/* ─── 3. VALUE PROPOSITION STATEMENT ─── */}
      <section className="wd-statement-section">
        <div className="wrap">
          <div className="wd-statement-card reveal">
            <span className="eyebrow">Design That Moves The Needle</span>
            <h2>We Design <em>Pixel-Perfect</em> Websites Engineered For Maximum Revenue.</h2>
            <p>
              Choosing the right web design studio transforms your digital trajectory. When a website is architected with
              clarity, lightning speed, and aesthetic precision, it does not just impress visitors — it guides them directly into sales.
              We replace slow, generic templates with high-converting custom architecture built to outrank and outperform your competitors.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 4. ZIG-ZAG CAPABILITIES SHOWCASE ─── */}
      <section className="section wd-showcase-section">
        <div className="wrap">
          <div className="wd-showcase-grid">
            {/* Visual Interactive Preview */}
            <div className="wd-showcase-visual reveal">
              <div className="wd-mockup-frame">
                <div className="wd-mockup-topbar">
                  <div className="wd-mockup-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="wd-mockup-url">genranq.design/preview</div>
                  <div className="wd-mockup-switch">
                    <button
                      className={activeDevice === 'desktop' ? 'active' : ''}
                      onClick={() => setActiveDevice('desktop')}
                    >
                      Desktop
                    </button>
                    <button
                      className={activeDevice === 'tablet' ? 'active' : ''}
                      onClick={() => setActiveDevice('tablet')}
                    >
                      Tablet
                    </button>
                    <button
                      className={activeDevice === 'mobile' ? 'active' : ''}
                      onClick={() => setActiveDevice('mobile')}
                    >
                      Mobile
                    </button>
                  </div>
                </div>

                <div className={`wd-mockup-screen mode-${activeDevice}`}>
                  <div className="wd-screen-hero">
                    <div className="wd-screen-badge">New Launch · 2026 Collection</div>
                    <h3>Engineered For Aesthetic Precision & High Conversion</h3>
                    <p>Custom Shopify Plus & Next.js builds delivering 0.4s load times and 4x sales uplift.</p>
                    <div className="wd-screen-btn">Explore Live Showcase →</div>
                  </div>
                  <div className="wd-screen-metrics">
                    <div className="wd-metric-box">
                      <span className="wd-metric-val">100</span>
                      <span className="wd-metric-lab">PageSpeed</span>
                    </div>
                    <div className="wd-metric-box">
                      <span className="wd-metric-val">0.3s</span>
                      <span className="wd-metric-lab">LCP Speed</span>
                    </div>
                    <div className="wd-metric-box">
                      <span className="wd-metric-val">+340%</span>
                      <span className="wd-metric-lab">Sales Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Content */}
            <div className="wd-showcase-content reveal">
              <span className="eyebrow">{content.showcase_eyebrow || 'Full-Spectrum Capabilities'}</span>
              <h2>{content.showcase_title || 'Our Professional Web Design & Development Includes:'}</h2>
              <p className="sub">
                {content.showcase_subtext ||
                  'We handle every layer of the digital product lifecycle — from initial brand wireframes to full-stack code and post-launch conversion rate optimization.'}
              </p>

              <div className="wd-checklist-grid">
                <div className="wd-check-item"><span><CheckIcon /></span> Custom Figma UI/UX Prototypes</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Bespoke Shopify &amp; Shopify Plus Stores</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Next.js &amp; React Web App Development</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Custom WordPress Theme Engineering</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Zero-Downtime E-Commerce Migrations</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Core Web Vitals &amp; Speed Optimization</div>
                <div className="wd-check-item"><span><CheckIcon /></span> High-Converting Checkout &amp; Cart UX</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Mobile-First Responsive Design</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Brand Identity &amp; Design Systems</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Micro-Interactions &amp; WebGL Motion</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Structured Data &amp; LLM-Search Ready</div>
                <div className="wd-check-item"><span><CheckIcon /></span> Comprehensive 30-Day Launch Warranty</div>
              </div>

              <div style={{ marginTop: 32 }}>
                <Link href="/contact" className="btn btn-primary">
                  {content.showcase_btn || 'Speak With A Lead Designer'} <span className="arr"><ArrowRight /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. MID-PAGE CTA BANNER ─── */}
      <section className="wd-mid-banner">
        <div className="wrap">
          <div className="wd-mid-banner-inner reveal">
            <div className="wd-mid-banner-text">
              <span className="eyebrow" style={{ color: 'var(--accent)' }}>{content.mid_eyebrow || 'Ready To Build?'}</span>
              <h3>{content.mid_title || 'We are ready to design and launch your on-demand custom website.'}</h3>
              <p>{content.mid_subtext || 'Discuss your timeline, tech stack, and goals with our senior design architects today.'}</p>
            </div>
            <Link href="/contact" className="btn btn-primary btn-lg">
              {content.mid_btn || 'Start Your Project'} <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. SERVICES 3X3 GRID ─── */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">{content.svc_eyebrow || 'Our Core Specialties'}</span>
            <h2>{content.svc_heading ? content.svc_heading : <>Bespoke Web Design Services <em>We Offer.</em></>}</h2>
            <p className="sub">
              {content.svc_subtext ||
                'Every business requires a tailored approach. Here is how our specialized web design and development practices deliver measurable growth.'}
            </p>
          </div>

          <div className="wd-services-grid">
            {serviceItems.map((item, idx) => (
              <div className="wd-svc-card reveal" key={item.title}>
                <div className="wd-svc-card-head">
                  <span className="wd-svc-icon">
                    {item.iconType === 'palette' && <IconPalette />}
                    {item.iconType === 'cart' && <IconShoppingCart />}
                    {item.iconType === 'zap' && <IconZap />}
                    {item.iconType === 'file' && <IconFileText />}
                    {item.iconType === 'refresh' && <IconRefresh />}
                    {item.iconType === 'target' && <IconTarget />}
                    {item.iconType === 'mobile' && <IconSmartphone />}
                    {item.iconType === 'chart' && <IconBarChart />}
                    {item.iconType === 'shield' && <IconShield />}
                  </span>
                  <span className="wd-svc-tag">{item.tag}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul className="wd-svc-bullets">
                  {item.bullets.map(b => (
                    <li key={b}><span>•</span> {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. TECHNOLOGY STACK & FRAMEWORKS ─── */}
      <section className="section wd-tech-section">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Modern Tech Stack</span>
            <h2>Tools &amp; Frameworks We Use To <em>Deliver Excellence.</em></h2>
            <p className="sub">
              We build on modern, future-proof technologies that deliver exceptional speed, airtight security, and seamless developer experience.
            </p>
          </div>

          <div className="wd-tech-grid">
            {techStack.map(cat => (
              <div className="wd-tech-card reveal" key={cat.category}>
                <h4>{cat.category}</h4>
                <div className="wd-tech-tags">
                  {cat.items.map(item => (
                    <span className="wd-tech-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. WHY CHOOSE US (12 REASONS) ─── */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The Gen Ranq Advantage</span>
            <h2>Why High-Growth Brands Choose <em>Our Design Studio.</em></h2>
            <p className="sub">
              We combine boutique craftsmanship with engineering rigor to deliver digital products that outclass the market.
            </p>
          </div>

          <div className="wd-why-grid">
            {whyChooseUs.map((w, idx) => (
              <div className="wd-why-card reveal" key={w.title}>
                <div className="wd-why-num">{String(idx + 1).padStart(2, '0')}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. FEATURED CASE STUDIES / PORTFOLIO ─── */}
      <section className="section wd-portfolio-section">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Proven Results</span>
            <h2>Recent Work &amp; <em>Client Case Studies.</em></h2>
            <p className="sub">
              Real outcomes from real clients. Explore how our custom web design and Shopify builds have driven multi-million dollar growth.
            </p>
          </div>

          <div className="wd-portfolio-grid">
            {portfolioProjects.map(proj => (
              <div className="wd-port-card reveal" key={proj.name}>
                <div className={`wd-port-img ${proj.gradient}`}>
                  <span className="wd-port-pill">{proj.result}</span>
                  <div className="wd-port-badge-bottom">{proj.category}</div>
                </div>
                <div className="wd-port-content">
                  <div className="wd-port-tags">
                    {proj.tags.map(t => <span key={t} className="wd-port-tag">{t}</span>)}
                  </div>
                  <h3>{proj.name}</h3>
                  <p>{proj.desc}</p>
                  <Link href="/contact" className="wd-port-link">
                    Request Similar Build <span className="arr"><ArrowRight /></span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. STEP-BY-STEP PROCESS ─── */}
      <section className="section wd-process-section" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow" style={{ color: 'var(--accent)' }}>Our Methodology</span>
            <h2 style={{ color: 'var(--bg)' }}>Our Proven 5-Phase <em>Design &amp; Build Process.</em></h2>
            <p className="sub" style={{ color: 'rgba(255,255,255,0.7)' }}>
              From initial creative strategy to final QA and zero-downtime deployment, our structured workflow ensures quality and on-time delivery.
            </p>
          </div>

          <div className="wd-process-grid">
            {processSteps.map((step, idx) => (
              <div className="wd-step-card reveal" key={step.step}>
                <span className="wd-step-num">{step.step}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Book A Project Discovery Call <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. FAQ ACCORDION ─── */}
      <section className="section wd-faq-section" style={{ background: 'var(--surface)' }}>
        <div className="wrap" style={{ maxWidth: 960 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Common Questions</span>
            <h2>Frequently Asked <em>Questions.</em></h2>
            <p className="sub">
              Everything you need to know about our web design services, timelines, pricing, and technology stack.
            </p>
          </div>

          <div className="faq-list reveal">
            {webDesignFaqs.map((f, i) => (
              <details className="faq" key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. BOTTOM BIG CTA ─── */}
      <section className="section">
        <div className="wrap">
          <div className="big-cta reveal">
            <h2>
              Ready to elevate your brand with <em>world-class web design?</em>
            </h2>
            <p>
              Schedule a 30-minute discovery session with our senior design architects. We will review your current website, map out key conversion bottlenecks, and provide a fixed-price roadmap.
            </p>
            <div className="ctas">
              <Link href="/contact" className="btn btn-primary">
                Get Your Free Proposal
                <span className="arr"><ArrowRight /></span>
              </Link>
              <Link
                href="/services"
                className="btn"
                style={{ background: 'transparent', color: 'var(--dark-ink)', border: '1px solid var(--dark-border)' }}
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
