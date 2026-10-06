'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import './home.css'

export type FeedPostItem = {
  id: string
  num?: string
  cat: string
  title: string
  desc: string
  author: string
  date: string
  read: string
  slug: string
}

interface HomeClientProps {
  articles?: FeedPostItem[]
  blogs?: FeedPostItem[]
}

const defaultArticles: FeedPostItem[] = [
  {
    id: 'ai-search-playbook-2026',
    num: '01',
    cat: 'AI Search & GEO',
    title: 'How LLMs choose which brands to cite — and how to be one of them.',
    desc: 'A teardown of 4,200 AI answers across ChatGPT, Perplexity, and Gemini.',
    author: 'Tomas Beltran',
    date: 'Apr 28',
    read: '15 min read',
    slug: '/insights/ai-search-playbook-2026',
  },
  {
    id: 'core-web-vitals-2026',
    num: '02',
    cat: 'Technical SEO',
    title: 'The Core Web Vitals checklist most agencies still get wrong in 2026.',
    desc: 'INP replaced FID a year ago. Half the audits we see still measure the wrong thing.',
    author: 'Daniel Whitford',
    date: 'Apr 22',
    read: '11 min read',
    slug: '/insights/core-web-vitals-2026',
  },
  {
    id: 'multi-location-seo',
    num: '03',
    cat: 'Local SEO',
    title: 'Multi-location SEO at scale: lessons from 22 yoga studios.',
    desc: 'How we built a programmatic local system that turned 4 studios into 22.',
    author: 'Farah Khoury',
    date: 'Apr 17',
    read: '9 min read',
    slug: '/insights/multi-location-seo',
  },
]

const defaultBlogs: FeedPostItem[] = [
  {
    id: 'ai-content-workflows',
    num: '01',
    cat: 'Editorial & Content',
    title: 'Why "AI-written content" tanks — and what hybrid workflows look like.',
    desc: 'We tested four content workflows across 80 articles. The winner was surprising.',
    author: 'Marisol Acevedo',
    date: 'Apr 11',
    read: '16 min read',
    slug: '/insights/ai-content-workflows',
  },
  {
    id: 'death-of-guest-post',
    num: '02',
    cat: 'Digital PR',
    title: 'The death of the guest post (and what replaced it for our clients).',
    desc: 'Earned editorial mentions are now 4x more valuable than guest posts.',
    author: 'Kemi Adeyemi',
    date: 'Apr 4',
    read: '8 min read',
    slug: '/insights/death-of-guest-post',
  },
  {
    id: 'maple-oak-case-study',
    num: '03',
    cat: 'Case Study',
    title: 'How we got Maple & Oak from local-only to a national brand.',
    desc: 'The full 18-month playbook: audit, fixes, content, digital PR, AI-search.',
    author: 'Anaya Sharma',
    date: 'Mar 28',
    read: '22 min read',
    slug: '/insights/maple-oak-case-study',
  },
]

export default function HomeClient({ articles, blogs }: HomeClientProps = {}) {
  const articlesList = articles && articles.length > 0 ? articles : defaultArticles
  const blogsList = blogs && blogs.length > 0 ? blogs : defaultBlogs
  const [navOpen, setNavOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [auditSubmitting, setAuditSubmitting] = useState(false)
  const [auditStatus, setAuditStatus] = useState<string | null>(null)
  const [newsSubmitting, setNewsSubmitting] = useState(false)
  const [newsStatus, setNewsStatus] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    // 1. Reveal on scroll
    const reveals = root.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach((el) => revealObserver.observe(el))

    // 2. Count-up stats
    const countEls = root.querySelectorAll('[data-count]')
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const end = parseFloat(el.dataset.count || '0')
          const dec = parseInt(el.dataset.dec || '0', 10)
          let startTime: number | null = null

          const step = (ts: number) => {
            if (!startTime) startTime = ts
            const p = Math.min((ts - startTime) / 1400, 1)
            const v = end * (1 - Math.pow(1 - p, 3))
            el.textContent = v.toFixed(dec)
            if (p < 1) {
              requestAnimationFrame(step)
            } else {
              el.textContent = end.toFixed(dec)
            }
          }
          requestAnimationFrame(step)
          countObserver.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    countEls.forEach((el) => countObserver.observe(el))

    // 3. AI share of voice bars
    const dashEls = root.querySelectorAll('.dash')
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar i')
            bars.forEach((bar) => {
              const el = bar as HTMLElement
              if (el.dataset.w) {
                el.style.width = el.dataset.w + '%'
              }
            })
            barObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    dashEls.forEach((d) => barObserver.observe(d))

    return () => {
      revealObserver.disconnect()
      countObserver.disconnect()
      barObserver.disconnect()
    }
  }, [])

  const handleAuditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuditSubmitting(true)
    setAuditStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = (form.querySelector('input[name="name"]') as HTMLInputElement)?.value || ''
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value || ''
    const url = (form.querySelector('input[name="url"]') as HTMLInputElement)?.value || ''
    const service = (form.querySelector('select[name="service"]') as HTMLSelectElement)?.value || 'SEO foundations'
    const message = (form.querySelector('textarea[name="notes"]') as HTMLTextAreaElement)?.value || ''

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          url,
          service: `Home Free Audit: ${service}`,
          budget: 'Free Audit',
          message: `Website: ${url} | Notes: ${message}`,
        }),
      })

      if (res.ok) {
        setAuditStatus('Request sent ✓')
        form.reset()
      } else {
        setAuditStatus('Error sending. Try again.')
      }
    } catch {
      setAuditStatus('Error sending. Try again.')
    } finally {
      setAuditSubmitting(false)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNewsSubmitting(true)
    const form = e.currentTarget
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
    const email = emailInput?.value || ''

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          service: 'Newsletter Signup',
          budget: 'N/A',
          message: 'User subscribed to weekly SEO + AI search newsletter from footer.',
        }),
      })
      if (res.ok) {
        setNewsStatus('Subscribed ✓')
        form.reset()
      } else {
        setNewsStatus('Subscribed ✓')
      }
    } catch {
      setNewsStatus('Subscribed ✓')
    } finally {
      setNewsSubmitting(false)
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Trusted brands array (doubled for infinite seamless marquee)
  const brands = [
    { name: 'Maple', sub: '& Oak', italic: false },
    { name: 'Northbound', sub: 'Coffee Co.', italic: true },
    { name: 'FERN', sub: 'Studios', italic: false },
    { name: 'Habitat', sub: 'Goods Co.', italic: false },
    { name: 'Cresta', sub: 'Skincare', italic: true },
    { name: 'SOLACE', sub: 'Yoga', italic: false },
    { name: 'Birch', sub: 'Architects', italic: false },
    { name: 'Lumen', sub: 'Dental', italic: true },
  ]
  const doubleBrands = [...brands, ...brands]

  // Tools Track 1
  const tools1 = [
    { mono: 'GSC', title: 'Search Console', sub: 'Indexing & queries' },
    { mono: 'GA4', title: 'Google Analytics 4', sub: 'Traffic & conversions' },
    { mono: 'Ah', title: 'Ahrefs', sub: 'Backlinks & keywords' },
    { mono: 'Se', title: 'Semrush', sub: 'Competitor research' },
    { mono: 'SF', title: 'Screaming Frog', sub: 'Technical crawls' },
    { mono: 'Su', title: 'Surfer SEO', sub: 'Content optimization' },
    { mono: 'LS', title: 'Looker Studio', sub: 'Client dashboards' },
    { mono: 'PSI', title: 'PageSpeed Insights', sub: 'Core Web Vitals' },
  ]
  const doubleTools1 = [...tools1, ...tools1]

  // Tools Track 2
  const tools2 = [
    { mono: 'GQ', title: 'GENRANQ AI Tracker', sub: 'LLM citation tracking' },
    { mono: 'Py', title: 'Python', sub: 'Automation & scripts' },
    { mono: 'BQ', title: 'BigQuery', sub: 'Data warehouse' },
    { mono: 'Nx', title: 'Next.js', sub: 'Fast, SEO-ready sites' },
    { mono: 'WP', title: 'WordPress', sub: 'CMS builds' },
    { mono: 'Sh', title: 'Shopify', sub: 'E-commerce SEO' },
    { mono: '{ }', title: 'Schema.org', sub: 'Structured data' },
    { mono: 'CF', title: 'Cloudflare', sub: 'CDN & performance' },
  ]
  const doubleTools2 = [...tools2, ...tools2]

  const faqs = [
    {
      q: 'How long until we see results?',
      a: 'Technical and on-page fixes usually show movement in 4–8 weeks. Meaningful traffic and revenue growth typically lands between months 3 and 6, compounding from there.',
    },
    {
      q: 'Do you work with businesses outside India?',
      a: 'Yes — we’ve grown brands across 42 countries. Strategy calls run on your time zone and reporting is in your currency.',
    },
    {
      q: 'What does a retainer cost?',
      a: 'Pricing depends on scope and competition. After the free audit we send a fixed monthly quote — no hidden fees, no surprise add-ons.',
    },
    {
      q: 'What is GEO and do I need it?',
      a: 'Generative Engine Optimization makes your brand show up inside AI answers from ChatGPT, Perplexity, and Google AI Overviews. If your customers research before buying, you need it.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'After the first 90 days, everything is month-to-month. You keep all work, content, and dashboards if you leave.',
    },
  ]

  return (
    <div className="home-root" ref={containerRef}>
      {/* ===== SVG SPRITE ===== */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <symbol id="g-mark" viewBox="0 0 64 64">
            <path d="M40 12 A24 24 0 1 0 50 44" fill="none" stroke="#1F2320" strokeWidth="7" strokeLinecap="butt" />
            <path d="M38 23 A13 13 0 1 0 44 42" fill="none" stroke="#FF5A1F" strokeWidth="6" />
            <path d="M30 34 H46 V40 H36" fill="none" stroke="#1F2320" strokeWidth="5" />
            <path d="M36 24 L54 11" stroke="#FF5A1F" strokeWidth="5" strokeLinecap="square" />
            <path d="M47 7 L60 6 L56 18 Z" fill="#FF5A1F" />
          </symbol>
          <symbol id="arrow" viewBox="0 0 16 16">
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>
          <symbol id="check" viewBox="0 0 16 16">
            <path d="M3 8.5l3.2 3L13 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>
        </defs>
      </svg>

      {/* ================= TOP BAR ================= */}
      <div className="topbar">
        <b>● Now offering AI Search &amp; GEO optimization.</b> <a href="#ai">Learn more →</a>
      </div>

      {/* ================= NAV ================= */}
      <nav className={`nav ${navOpen ? 'open' : ''}`} id="nav">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="GENRANQ Software LLP">
            <svg className="logo-mark"><use href="#g-mark" /></svg>
            <span className="logo-text">
              <span className="logo-word">GENRANQ</span>
              <span className="logo-sub">SOFTWARE LLP</span>
            </span>
          </Link>
          <div className="nav-links">
            <a href="#services" onClick={() => setNavOpen(false)}>Services</a>
            <a href="#ai-seo" onClick={() => setNavOpen(false)}>AI SEO</a>
            <a href="#why" onClick={() => setNavOpen(false)}>Why us</a>
            <a href="#results" onClick={() => setNavOpen(false)}>Results</a>
            <a href="#insights" onClick={() => setNavOpen(false)}>Insights</a>
            <a href="#faq" onClick={() => setNavOpen(false)}>FAQ</a>
          </div>
          <a href="#audit" className="btn btn-dark" onClick={() => setNavOpen(false)}>
            Get a free audit <svg><use href="#arrow" /></svg>
          </a>
          <button
            className="menu-btn"
            aria-label="Menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M3 6h14M3 14h14" stroke="#121613" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Global SEO Studio · 2014–2026</span>
            <h1>Small businesses deserve to be <em className="accent">unmissable.</em></h1>
            <p className="lead">
              We&apos;re a 38-person SEO studio that helps independent shops, founders, and challenger brands win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next.
            </p>
            <div className="hero-ctas">
              <a href="#audit" className="btn btn-primary">Get a free SEO audit <svg><use href="#arrow" /></svg></a>
              <a href="#process" className="btn btn-ghost">See how we work</a>
            </div>
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span><b>4.9 / 5</b> across 412 reviews · Clutch · Trustpilot · Google</span>
            </div>
          </div>

          <form className="audit-card reveal" id="audit" onSubmit={handleAuditSubmit}>
            <div className="audit-top">
              <span className="eyebrow">Get a free audit</span>
              <span className="pill">Reply in 4h</span>
            </div>
            <h3>See the 3 things holding your site back.</h3>
            <div className="field-row">
              <div className="field">
                <input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="field">
                <input type="email" name="email" placeholder="Work email" required />
              </div>
            </div>
            <div className="field">
              <input type="url" name="url" placeholder="https://yoursite.com" />
            </div>
            <div className="field">
              <select name="service" defaultValue="What do you need?">
                <option value="What do you need?">What do you need?</option>
                <option value="SEO foundations">SEO foundations</option>
                <option value="Local & Maps">Local &amp; Maps</option>
                <option value="Technical SEO">Technical SEO</option>
                <option value="Content">Content</option>
                <option value="Digital PR">Digital PR</option>
                <option value="AI Search & GEO">AI Search &amp; GEO</option>
              </select>
            </div>
            <div className="field">
              <textarea name="notes" placeholder="Tell us briefly about your project…"></textarea>
            </div>
            <button className="btn btn-primary" type="submit" disabled={auditSubmitting}>
              {auditSubmitting ? 'Sending...' : auditStatus || 'Get my free audit'} <svg><use href="#arrow" /></svg>
            </button>
            <p className="fine">No spam. No obligation. Your data stays private.</p>
          </form>
        </div>
      </header>

      {/* ================= TRUSTED SLIDER ================= */}
      <section className="trusted">
        <div className="wrap"><span className="eyebrow">Trusted by 600+ small businesses worldwide</span></div>
        <div className="marquee">
          <div className="marquee-track" id="track">
            {doubleBrands.map((b, idx) => (
              <div className="brand" key={idx}>
                <span className={`b-name ${b.italic ? 'i' : ''}`}>{b.name}</span>
                <span className="b-sub">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats bg-cream">
        <div className="wrap stats-grid">
          <div className="stat reveal">
            <div className="stat-num"><span data-count="412">0</span><small>%</small></div>
            <p>Average organic traffic growth in 12 months</p>
          </div>
          <div className="stat reveal">
            <div className="stat-num"><span data-count="8.5" data-dec="1">0</span><small>×</small></div>
            <p>Average return on retainer for small business clients</p>
          </div>
          <div className="stat reveal">
            <div className="stat-num"><span data-count="600">0</span><small>+</small></div>
            <p>Brands grown across 42 countries since 2014</p>
          </div>
          <div className="stat reveal">
            <div className="stat-num"><span data-count="12">0</span><small>yrs</small></div>
            <p>Doing exactly this — no pivots, no fads</p>
          </div>
        </div>
      </section>

      {/* ================= 1. WHY SEO ================= */}
      <section className="pad bg-cream" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Why it matters</span>
              <h2>Why your business <em className="accent">needs SEO.</em></h2>
            </div>
            <p>Every day without SEO is traffic, leads, and revenue you&apos;re handing to competitors. Here&apos;s why it matters more in 2026 than ever.</p>
          </div>
          <div className="grid-3">
            <article className="card reveal">
              <div className="card-top"><span className="icon"><svg><use href="#check" /></svg></span><span className="num">01</span></div>
              <h3>93% of online experiences start with search</h3>
              <p>If your business isn&apos;t visible when people search, you don&apos;t exist to them. SEO puts you where your customers are already looking.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><svg><use href="#check" /></svg></span><span className="num">02</span></div>
              <h3>Organic traffic compounds — ads don&apos;t</h3>
              <p>Paid ads stop the moment you stop paying. SEO builds an asset that grows month over month, generating leads while you sleep.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><svg><use href="#check" /></svg></span><span className="num">03</span></div>
              <h3>Your competitors are already investing</h3>
              <p>Every day you delay SEO, competitors are claiming the keywords, citations, and authority that should be yours.</p>
            </article>
            <article className="card dark reveal">
              <div className="card-top"><span className="icon"><svg><use href="#check" /></svg></span><span className="num">04</span></div>
              <h3>AI search is reshaping visibility</h3>
              <p>ChatGPT, Perplexity, and Google AI Overviews are answering queries directly. Brands not optimized for AI retrieval are becoming invisible.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><svg><use href="#check" /></svg></span><span className="num">05</span></div>
              <h3>Trust is earned through rankings</h3>
              <p>Users trust organic results 5.66× more than paid ads. Page-one presence signals credibility and authority to your audience.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><svg><use href="#check" /></svg></span><span className="num">06</span></div>
              <h3>SEO drives the highest-intent traffic</h3>
              <p>People searching for what you sell are ready to buy. SEO captures demand at the exact moment of intent — no interruption, no convincing.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= 2. SERVICES ================= */}
      <section className="pad" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Services</span>
              <h2>What we do, in <em className="accent">plain English.</em></h2>
            </div>
            <p>Full-spectrum search, engineering, and digital growth services that compound when run together. No bloated retainers, no work-for-the-sake-of-work.</p>
          </div>
          <div className="grid-3">
            {/* 01: SEO Foundations */}
            <Link href="/services/seo" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="SEO Foundations"
                loading="lazy"
              />
              <span className="t-num">01 / Search</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>SEO foundations</h3>
                <p>The on-page, technical, and content fundamentals that make Google trust you. Keyword mapping, site hierarchy, and rank compounding.</p>
                <div className="t-tags">
                  <span>On-page</span>
                  <span>Keyword map</span>
                  <span>Site structure</span>
                </div>
              </div>
            </Link>

            {/* 02: Local SEO & Maps */}
            <Link href="/services/seo/local-seo" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Local SEO & Maps"
                loading="lazy"
              />
              <span className="t-num">02 / Local</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Local &amp; Maps</h3>
                <p>Win the 3-pack and high-intent &quot;near me&quot; queries that drive walk-ins, calls, and bookings — across single and multi-location businesses.</p>
                <div className="t-tags">
                  <span>GBP</span>
                  <span>Citations</span>
                  <span>Reviews</span>
                </div>
              </div>
            </Link>

            {/* 03: Technical SEO */}
            <Link href="/services/seo/technical-seo" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                alt="Technical SEO"
                loading="lazy"
              />
              <span className="t-num">03 / Technical</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Technical SEO</h3>
                <p>Core Web Vitals, crawl budget, schema markup, faceted nav, and JS rendering. The deep plumbing nobody else wants to touch — we love it.</p>
                <div className="t-tags">
                  <span>CWV</span>
                  <span>Schema</span>
                  <span>Crawl</span>
                </div>
              </div>
            </Link>

            {/* 04: Editorial & Content */}
            <Link href="/services/content-marketing" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
                alt="Editorial & Content"
                loading="lazy"
              />
              <span className="t-num">04 / Content</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Editorial &amp; content</h3>
                <p>Long-form, programmatic, and answer-first content written by humans who know your industry — not interns and not AI slop.</p>
                <div className="t-tags">
                  <span>Long-form</span>
                  <span>Programmatic</span>
                  <span>Refresh</span>
                </div>
              </div>
            </Link>

            {/* 05: Digital PR & Links */}
            <Link href="/services/link-building" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                alt="Digital PR & Links"
                loading="lazy"
              />
              <span className="t-num">05 / Authority</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Digital PR &amp; links</h3>
                <p>Editorial backlinks from publications your customers actually read. No PBNs, no link farms, no shortcuts that backfire.</p>
                <div className="t-tags">
                  <span>Digital PR</span>
                  <span>Outreach</span>
                  <span>Mentions</span>
                </div>
              </div>
            </Link>

            {/* 06: AI Search & GEO */}
            <Link href="/services/ai-search" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                alt="AI Search & GEO"
                loading="lazy"
              />
              <span className="t-num">06 / AI &amp; GEO</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>AI Search &amp; GEO</h3>
                <p>Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini. The new rules of being found — already in motion.</p>
                <div className="t-tags">
                  <span>LLM citations</span>
                  <span>Entities</span>
                  <span>AIO</span>
                </div>
              </div>
            </Link>

            {/* 07: Custom Web Design */}
            <Link href="/services/web-design" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80"
                alt="Custom Website Design"
                loading="lazy"
              />
              <span className="t-num">07 / Design</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Custom website design</h3>
                <p>Brand-led UI/UX design built around conversion intent — responsive wireframes, Figma prototypes, and pixel-perfect design systems.</p>
                <div className="t-tags">
                  <span>UI/UX</span>
                  <span>Figma</span>
                  <span>Prototyping</span>
                </div>
              </div>
            </Link>

            {/* 08: Web Development */}
            <Link href="/services/web-development" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                alt="Website Development"
                loading="lazy"
              />
              <span className="t-num">08 / Development</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Website development</h3>
                <p>Clean engineering with Next.js, WordPress, or Shopify. Built SEO-ready from day one with sub-second speeds and 95+ PageSpeed scores.</p>
                <div className="t-tags">
                  <span>Next.js</span>
                  <span>WordPress</span>
                  <span>Shopify Plus</span>
                </div>
              </div>
            </Link>

            {/* 09: Hire Dedicated Developers */}
            <Link href="/hire-resource" className="tile reveal">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Hire Dedicated Developers"
                loading="lazy"
              />
              <span className="t-num">09 / Dedicated</span>
              <span className="t-go">
                <svg><use href="#arrow" /></svg>
              </span>
              <div className="t-body">
                <h3>Hire dedicated developers</h3>
                <p>Pre-vetted senior React, Next.js, Laravel, and Python engineers dedicated to your project. Aligned to your timezone, onboarded in 48 hours.</p>
                <div className="t-tags">
                  <span>Dedicated pods</span>
                  <span>48h kick-off</span>
                  <span>Zero overhead</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA 1 ===== */}
      <section className="cta-band" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-orange reveal">
            <div>
              <h3>Not sure which service fits? <em>We&apos;ll tell you for free.</em></h3>
              <p>A 30-minute audit from a senior strategist — the three things to fix first, no sales deck.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-dark">Book free audit <svg><use href="#arrow" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. PROCESS (timeline) ================= */}
      <section className="pad bg-cream" id="process">
        <div className="wrap process-wrap">
          <div className="process-intro reveal">
            <span className="eyebrow">How we work</span>
            <h2>Our <em className="accent">AI SEO</em> process.</h2>
            <p className="lead">A well-defined, structured process built on industry best practices to address the unique needs of each client.</p>
            <div className="process-meta">
              <div><b>90</b><span>days to first measurable wins</span></div>
              <div><b>6</b><span>steps, repeated every quarter</span></div>
            </div>
            <a href="#audit" className="btn btn-primary" style={{ marginTop: '28px' }}>
              Start with step 1 <svg><use href="#arrow" /></svg>
            </a>
          </div>
          <div className="timeline">
            <div className="step reveal">
              <div className="step-dot">1</div>
              <div className="step-body">
                <div className="step-head"><h3>Understanding your business</h3><span className="phase">Week 1</span></div>
                <p>We start by understanding your business, customers, and industry so the strategy aligns with your goals.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-dot">2</div>
              <div className="step-body">
                <div className="step-head"><h3>AI-powered audits &amp; keyword research</h3><span className="phase">Week 2–3</span></div>
                <p>AI tools run detailed audits of your website and keyword research, surfacing the biggest opportunities.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-dot">3</div>
              <div className="step-body">
                <div className="step-head"><h3>Personalized content &amp; SEO roadmap</h3><span className="phase">Week 4</span></div>
                <p>Based on findings, we build tailored content strategies and SEO recommendations for content and site performance.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-dot">4</div>
              <div className="step-body">
                <div className="step-head"><h3>LLM optimization</h3><span className="phase">Month 2</span></div>
                <p>We optimize your brand for visibility in LLM searches, building awareness where high-intent searches happen.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-dot">5</div>
              <div className="step-body">
                <div className="step-head"><h3>Continuous monitoring</h3><span className="phase">Ongoing</span></div>
                <p>The strategy is monitored with AI tools so it stays effective through industry changes and algorithm updates.</p>
              </div>
            </div>
            <div className="step reveal">
              <div className="step-dot">6</div>
              <div className="step-body">
                <div className="step-head"><h3>Measuring ROI &amp; refining</h3><span className="phase">Quarterly</span></div>
                <p>We track performance and refine the strategy, optimizing results and hitting business goals with every action.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. AI SECTION ================= */}
      <section className="pad bg-dark ai" id="ai">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">The new search era</span>
            <h2>AI didn&apos;t kill SEO. It <em className="accent">raised the stakes.</em></h2>
            <p className="lead">Half of search journeys now start in ChatGPT, Perplexity, or Google&apos;s AI Overviews. The brands cited inside those answers win the next decade. We optimize for both — the blue links and the AI answers.</p>
            <ul className="checks">
              <li>
                <span className="tick"><svg><use href="#check" /></svg></span>
                <span><b>GEO audits</b> across ChatGPT, Perplexity, Claude, Gemini, and Google AIO — see where you&apos;re cited and where you&apos;re invisible.</span>
              </li>
              <li>
                <span className="tick"><svg><use href="#check" /></svg></span>
                <span><b>Answer-first content</b> structured for LLM retrieval — semantic markup, claim-evidence pairs, citation hooks.</span>
              </li>
              <li>
                <span className="tick"><svg><use href="#check" /></svg></span>
                <span><b>Brand entity building</b> across Wikipedia, Wikidata, Crunchbase, and the open web LLMs train on.</span>
              </li>
              <li>
                <span className="tick"><svg><use href="#check" /></svg></span>
                <span><b>Monthly mention reports</b> showing your share of voice in AI answers vs. competitors.</span>
              </li>
            </ul>
          </div>
          <div className="terminal reveal">
            <div className="term-bar"><i></i><i></i><i></i><span>perplexity.ai · live preview</span></div>
            <div className="term-body">
              <div className="q">best ethical coffee subscriptions in 2026</div>
              <p style={{ marginTop: '10px' }}>For ethical specialty coffee subscriptions, three roasters consistently lead on transparency, traceability, and cup quality:</p>
              <ol>
                <li>1. <b>Maple &amp; Oak Roasters</b> — direct-trade single origins; publishes farmer pricing.</li>
                <li>2. <b>Northbound Coffee Co.</b> — Rainforest Alliance + women-led farms.</li>
                <li>3. <b>Habitat Goods Co.</b> — carbon-negative shipping, refill program.</li>
              </ol>
              <div className="sources"><span>Sources: 14 citations · 9 from <em>maple-oak.com</em></span><span>↗</span></div>
              <div style={{ marginTop: '18px' }}><span style={{ color: 'var(--orange)' }}>›</span><span className="cursor"></span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA 2 ===== */}
      <section className="cta-band" style={{ padding: '112px 0' }}>
        <div className="wrap">
          <div className="cta-box cta-light reveal">
            <div>
              <span className="eyebrow">Free AI visibility check</span>
              <h3 style={{ marginTop: '14px' }}>Is ChatGPT recommending <em className="accent">your competitors</em> instead of you?</h3>
              <div className="cta-stats"><span><b>5</b> AI engines checked</span><span><b>48h</b> turnaround</span><span><b>₹0</b> cost</span></div>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-primary">Check my AI visibility <svg><use href="#arrow" /></svg></a>
              <Link href="/insights" className="btn btn-ghost">Read the AI SEO playbook</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. AI SEO ================= */}
      <section className="pad bg-cream" id="ai-seo">
        <div className="wrap">
          <div className="aiseo-top">
            <div className="reveal">
              <span className="eyebrow">AI SEO · GEO · AEO</span>
              <h2>Get recommended by <em className="accent">every AI engine.</em></h2>
              <p className="lead">Your customers now ask AI before they ask Google. We make sure your brand is the answer — tracked, measured, and reported every month.</p>
              <div className="engines">
                <span>ChatGPT</span><span>Perplexity</span><span>Google AI Overviews</span><span>Gemini</span><span>Claude</span><span>Copilot</span>
              </div>
            </div>
            <div className="dash reveal">
              <div className="dash-head"><b>AI share of voice</b><span>▲ 3.4× in 6 months</span></div>
              <div className="bar-row"><span className="lbl">ChatGPT</span><div className="bar"><i data-w="82"></i></div><span className="val">82%</span></div>
              <div className="bar-row"><span className="lbl">Perplexity</span><div className="bar"><i data-w="74"></i></div><span className="val">74%</span></div>
              <div className="bar-row"><span className="lbl">AI Overviews</span><div className="bar"><i data-w="61"></i></div><span className="val">61%</span></div>
              <div className="bar-row"><span className="lbl">Gemini</span><div className="bar"><i data-w="55"></i></div><span className="val">55%</span></div>
              <div className="bar-row"><span className="lbl">Claude</span><div className="bar"><i data-w="48"></i></div><span className="val">48%</span></div>
              <div className="dash-foot"><span>Sample client · 240 tracked prompts</span><span>Citations: <b>1,284</b></span></div>
            </div>
          </div>
          <div className="grid-4">
            <article className="ai-card reveal"><span className="step-n">01 — Audit</span><h3>AI visibility audit</h3><p>We run hundreds of buyer prompts across AI engines to map where you&apos;re cited, where competitors win, and why.</p></article>
            <article className="ai-card reveal"><span className="step-n">02 — Structure</span><h3>Answer-first content</h3><p>Pages rebuilt with clear claims, facts, FAQs, and schema so LLMs can extract and quote you with confidence.</p></article>
            <article className="ai-card reveal"><span className="step-n">03 — Entity</span><h3>Brand entity signals</h3><p>Consistent brand data across Wikidata, directories, reviews, and publications that AI models learn from.</p></article>
            <article className="ai-card reveal"><span className="step-n">04 — Track</span><h3>Prompt tracking</h3><p>Monthly reports on mentions, citations, and sentiment across every major AI engine — vs. your competitors.</p></article>
          </div>
        </div>
      </section>

      {/* ================= 6. RESULTS ================= */}
      <section className="pad bg-cream" id="results">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow">Case studies</span><h2>Results that <em className="accent">actually move</em> revenue.</h2></div>
            <p>Twelve-month outcomes from real small-business clients. No vanity metrics — just qualified traffic and revenue.</p>
          </div>
          <div className="grid-3">
            <article className="case reveal">
              <div className="case-body">
                <span className="tag">Specialty retail · DTC</span>
                <h3>Maple &amp; Oak Coffee Roasters</h3>
                <p className="sub">From local roastery to national subscription brand</p>
                <div className="metrics">
                  <div className="metric"><b>+412<small>%</small></b><span>Organic sessions</span></div>
                  <div className="metric"><b>14.2<small>×</small></b><span>ROAS on retainer</span></div>
                  <div className="metric"><b>#1</b><span>&quot;specialty coffee subscription&quot;</span></div>
                  <div className="metric"><b>38<small>%</small></b><span>Cited in AI answers</span></div>
                </div>
                <a href="#audit" className="read">Read case study <svg width="14" height="14"><use href="#arrow" /></svg></a>
              </div>
              <div className="quote"><span className="avatar">E</span><div><b>Elena Marchetti</b><span>Founder · Maple &amp; Oak Roasters</span></div></div>
            </article>
            <article className="case featured reveal">
              <div className="case-body">
                <span className="tag">Health &amp; wellness · Multi-location</span>
                <h3>Solace Yoga Studios</h3>
                <p className="sub">From 4 studios to 22 in three years</p>
                <div className="metrics">
                  <div className="metric"><b>+286<small>%</small></b><span>Local pack visibility</span></div>
                  <div className="metric"><b>5.8<small>×</small></b><span>Bookings from search</span></div>
                  <div className="metric"><b>22</b><span>Locations in local 3-pack</span></div>
                  <div className="metric"><b>94<small>%</small></b><span>Branded query share</span></div>
                </div>
                <a href="#audit" className="read">Read case study <svg width="14" height="14"><use href="#arrow" /></svg></a>
              </div>
              <div className="quote"><span className="avatar">J</span><div><b>James Okafor</b><span>CMO · Northbound Analytics</span></div></div>
            </article>
            <article className="case reveal">
              <div className="case-body">
                <span className="tag">B2B SaaS · Bootstrapped</span>
                <h3>Northbound Analytics</h3>
                <p className="sub">Outranking VC-funded competitors with 1/10 the budget</p>
                <div className="metrics">
                  <div className="metric"><b>+612<small>%</small></b><span>Demo signups from search</span></div>
                  <div className="metric"><b>11.4<small>×</small></b><span>MRR attributed to SEO</span></div>
                  <div className="metric"><b>#2</b><span>Above 3 unicorns on category term</span></div>
                  <div className="metric"><b>42</b><span>Editorial backlinks earned</span></div>
                </div>
                <a href="#audit" className="read">Read case study <svg width="14" height="14"><use href="#arrow" /></svg></a>
              </div>
              <div className="quote"><span className="avatar">P</span><div><b>Priya Raghavan</b><span>Head of Growth · Habitat Goods Co.</span></div></div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CTA (after AI SEO + Results) ===== */}
      <section className="cta-band bg-cream" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-orange reveal">
            <div>
              <h3>Want results like these? <em>Let&apos;s map your growth.</em></h3>
              <p>Get a custom 12-month SEO &amp; AI search forecast for your business — free.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-dark">Get my forecast <svg><use href="#arrow" /></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. WHY GENRANQ ================= */}
      <section className="pad" id="why">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Why GENRANQ</span>
              <h2>SEO experts who <em className="accent">also build software.</em></h2>
            </div>
            <p>We&apos;re not just marketers. GENRANQ Software LLP combines SEO strategists and in-house engineers — so strategy and execution never get lost in translation.</p>
          </div>
          <div className="why-wrap">
            <div className="why-hero reveal">
              <span className="logo light">
                <svg className="logo-mark" style={{ filter: 'brightness(1.6)' }}><use href="#g-mark" /></svg>
                <span className="logo-text">
                  <span className="logo-word">GENRANQ</span>
                  <span className="logo-sub">SOFTWARE LLP</span>
                </span>
              </span>
              <h3>One team for strategy, content, and code.</h3>
              <p>When your SEO plan needs a faster site, new templates, or schema at scale, our developers ship it — no waiting on a third-party agency or your busy dev team.</p>
              <div className="why-nums">
                <div><b>38</b><span>In-house experts</span></div>
                <div><b>97<small>%</small></b><span>Client retention</span></div>
                <div><b>4<small>h</small></b><span>Avg. reply time</span></div>
              </div>
            </div>
            <div className="why-list">
              <article className="why-item reveal">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                  </svg>
                </span>
                <h3>In-house developers</h3>
                <p>Technical fixes, speed, and schema shipped by our own engineers.</p>
              </article>
              <article className="why-item reveal">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
                  </svg>
                </span>
                <h3>Transparent reporting</h3>
                <p>Live dashboards with traffic, leads, and revenue — updated daily.</p>
              </article>
              <article className="why-item reveal">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                  </svg>
                </span>
                <h3>Dedicated strategist</h3>
                <p>One senior point of contact who knows your business inside out.</p>
              </article>
              <article className="why-item reveal">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
                  </svg>
                </span>
                <h3>Small-business pricing</h3>
                <p>Enterprise-grade SEO at plans built for growing businesses.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. WHAT SETS US APART (4 boxes) ================= */}
      <section className="pad bg-cream">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Our difference</span>
              <h2>What sets us <em className="accent">apart.</em></h2>
            </div>
            <p>Four things we do differently — and why they matter when you&apos;re betting your growth on a partner.</p>
          </div>
          <div className="grid-2">
            <article className="apart reveal">
              <span className="big">01</span>
              <div>
                <h3>Senior-only delivery</h3>
                <p>Every account is led by a strategist with 8+ years of experience. No juniors learning on your retainer, no offshored execution, no &quot;Account Manager&quot; passing notes between departments.</p>
                <div className="proof"><b>8+ yrs</b> minimum strategist experience</div>
              </div>
            </article>
            <article className="apart reveal">
              <span className="big">02</span>
              <div>
                <h3>Revenue over rankings</h3>
                <p>We track keyword positions, sure. But the only number that matters in our monthly report is qualified, attributable revenue — tied back to the work we shipped.</p>
                <div className="proof"><b>100%</b> of reports tied to revenue</div>
              </div>
            </article>
            <article className="apart reveal">
              <span className="big">03</span>
              <div>
                <h3>No long contracts</h3>
                <p>Month-to-month after the first 90 days. We earn the renewal every cycle. If we&apos;re not delivering, you walk — and you keep all the work, deliverables, and dashboards.</p>
                <div className="proof"><b>90 days</b> then month-to-month</div>
              </div>
            </article>
            <article className="apart reveal">
              <span className="big">04</span>
              <div>
                <h3>Built for the AI era</h3>
                <p>We&apos;ve been optimizing for LLM citations since GPT-4 launched. Most agencies are still figuring out what GEO means. We&apos;ve shipped it for 80+ clients.</p>
                <div className="proof"><b>80+</b> GEO programs shipped</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CTA (after Why GENRANQ + Apart) ===== */}
      <section className="cta-band bg-cream" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-dark reveal">
            <div>
              <h3>Ready to be <em className="accent">unmissable?</em></h3>
              <p>Talk to a senior strategist this week. No deck, no fluff — just your site and a plan.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-primary">Book your free audit <svg><use href="#arrow" /></svg></a>
              <a href="#process" className="btn btn-ghost-dark">See our process</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. TOOLS & TECHNOLOGY (slider) ================= */}
      <section className="pad tools" id="tools">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Tools &amp; technology</span>
              <h2>The stack behind <em className="accent">every ranking.</em></h2>
            </div>
            <p>Industry-leading SEO platforms, analytics, and engineering tools — combined with our own in-house AI tracking.</p>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track tools-track">
            {doubleTools1.map((t, idx) => (
              <div className="tool" key={idx}>
                <span className="mono">{t.mono}</span>
                <div><b>{t.title}</b><small>{t.sub}</small></div>
              </div>
            ))}
          </div>
        </div>
        <div className="marquee rev">
          <div className="marquee-track tools-track">
            {doubleTools2.map((t, idx) => (
              <div className="tool" key={idx}>
                <span className="mono">{t.mono}</span>
                <div><b>{t.title}</b><small>{t.sub}</small></div>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap">
          <div className="tool-cats reveal">
            <span><b>40+</b> tools</span>
            <span>SEO research</span>
            <span>Analytics</span>
            <span>AI tracking</span>
            <span>Development</span>
            <span>Automation</span>
          </div>
        </div>
      </section>

      {/* ================= 10. ARTICLES & NEWS ================= */}
      <section className="pad bg-cream" id="insights">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">Insights</span>
              <h2>From our <em className="accent">strategists.</em></h2>
            </div>
            <p>Deep dives, playbooks, and real-world teardowns — written by the people doing the work.</p>
          </div>
          <div className="feeds">
            <div className="feed reveal">
              <div className="feed-head">
                <span className="eyebrow">Articles</span>
                <Link href="/insights">View all <svg width="14" height="14"><use href="#arrow" /></svg></Link>
              </div>
              {articlesList.map((item, idx) => (
                <Link href={item.slug} className="post" key={item.id || idx}>
                  <span className="n">{item.num || String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="cat">{item.cat}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="by"><b>{item.author}</b> · {item.date} · {item.read}</div>
                  </div>
                  <span className="arrow"><svg width="14" height="14"><use href="#arrow" /></svg></span>
                </Link>
              ))}
            </div>

            <div className="feed reveal">
              <div className="feed-head">
                <span className="eyebrow">News &amp; Blogs</span>
                <Link href="/insights">View all <svg width="14" height="14"><use href="#arrow" /></svg></Link>
              </div>
              {blogsList.map((item, idx) => (
                <Link href={item.slug} className="post" key={item.id || idx}>
                  <span className="n">{item.num || String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="cat">{item.cat}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="by"><b>{item.author}</b> · {item.date} · {item.read}</div>
                  </div>
                  <span className="arrow"><svg width="14" height="14"><use href="#arrow" /></svg></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA (after Tools + Articles & News) ===== */}
      <section className="cta-band bg-cream" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-light reveal">
            <div>
              <span className="eyebrow">Newsletter</span>
              <h3 style={{ marginTop: '14px' }}>Get one <em className="accent">SEO + AI search</em> insight every week.</h3>
              <p>Join 6,000+ founders and marketers. No spam, unsubscribe anytime.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-primary">Talk to a strategist <svg><use href="#arrow" /></svg></a>
              <Link href="/insights" className="btn btn-ghost">Read latest articles</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 11. FAQ ================= */}
      <section className="pad" id="faq">
        <div className="wrap faq-wrap">
          <div className="reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions we get <em className="accent">most weeks.</em></h2>
            <p className="lead">If yours isn&apos;t here, ask us on the discovery call. We&apos;ll give you a real answer, not a sales answer.</p>
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div className={`faq ${isOpen ? 'open' : ''}`} key={idx}>
                  <button onClick={() => toggleFaq(idx)} aria-expanded={isOpen}>
                    {faq.q}
                    <span className="plus">+</span>
                  </button>
                  <div
                    className="ans"
                    style={{
                      maxHeight: isOpen ? '400px' : '0px',
                    }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <Link href="/" className="logo light">
                <svg className="logo-mark" style={{ filter: 'brightness(1.6)' }}><use href="#g-mark" /></svg>
                <span className="logo-text">
                  <span className="logo-word">GENRANQ</span>
                  <span className="logo-sub">SOFTWARE LLP</span>
                </span>
              </Link>
              <p>SEO, local, technical, and AI search for small businesses that want to be found — everywhere people look.</p>
              <form className="newsletter" onSubmit={handleNewsletterSubmit}>
                <input type="email" placeholder="Your email" required />
                <button type="submit" disabled={newsSubmitting}>
                  {newsSubmitting ? '...' : newsStatus || 'Subscribe'}
                </button>
              </form>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><Link href="/services/seo">SEO foundations</Link></li>
                <li><Link href="/services/seo">Local &amp; Maps</Link></li>
                <li><Link href="/services/seo/technical-seo">Technical SEO</Link></li>
                <li><Link href="/services/ai-search">AI Search &amp; GEO</Link></li>
              </ul>
            </div>
            <div>
              <h5>Company</h5>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><a href="#results">Case studies</a></li>
                <li><Link href="/insights">Articles</Link></li>
                <li><Link href="/insights">News</Link></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href="mailto:hello@genranq.com">hello@genranq.com</a></li>
                <li>Vadodara, Gujarat, India</li>
                <li><a href="#audit">Get a free audit</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 GENRANQ Software LLP. All rights reserved.</span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
