'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import {
  ArrowRight,
  ArrowDown,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  IconSearch,
  IconSparkles,
  IconGlobe,
  IconLock,
  IconTarget,
  IconActivity,
  IconShield,
  IconUsers,
  IconDocument,
} from '@/components/Icons'
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
  tag?: string
  fullContent?: string
  takeaways?: string[]
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
    tag: 'Strategic Blueprint',
    title: 'How LLMs choose which brands to cite — and how to be one of them.',
    desc: 'A teardown of 4,200 AI answers across ChatGPT, Perplexity, and Gemini.',
    author: 'Tomas Beltran',
    date: 'Apr 28',
    read: '15 min read',
    slug: '/insights/ai-search-playbook-2026',
    takeaways: [
      '71.4% of citations in ChatGPT originate from third-party consensus, not brand landing pages.',
      'Answer-first (BLUF) formatting improves LLM extraction rates by 3.8x.',
      'Wikidata and Knowledge Graph disambiguation prevent model hallucination exclusion.',
    ],
    fullContent: 'Our research lab executed an exhaustive forensic teardown of 4,200 commercial search queries across ChatGPT Search, Perplexity Pro, Google Gemini 1.5 Pro, and Claude 3.5 Sonnet. We analysed which brands were recommended, which citations were hyperlinked, and why market leaders with stellar PageRank were routinely bypassed in favor of smaller, highly structured challenger brands.',
  },
  {
    id: 'core-web-vitals-2026',
    num: '02',
    cat: 'Technical SEO',
    tag: 'Field Guide',
    title: 'The Core Web Vitals checklist most agencies still get wrong in 2026.',
    desc: 'INP replaced FID a year ago. Half the audits we see still measure the wrong thing.',
    author: 'Daniel Whitford',
    date: 'Apr 22',
    read: '11 min read',
    slug: '/insights/core-web-vitals-2026',
    takeaways: [
      'Interaction to Next Paint (INP) requires sub-200ms main thread responsiveness on mobile devices.',
      'Cumulative Layout Shift (CLS) regressions predominantly stem from unreserved dynamic hero banners.',
      'Server-side rendering (SSR) on edge runtimes drives sub-600ms Time to First Byte (TTFB).',
    ],
    fullContent: 'Interaction to Next Paint (INP) is now the definitive responsiveness metric in Google Search algorithm. Despite this transition, over 60% of technical audits in 2026 continue evaluating outdated first-input benchmarks. We break down the real JavaScript profiling steps required to clear green field performance across all core templates.',
  },
  {
    id: 'multi-location-seo',
    num: '03',
    cat: 'Local SEO',
    tag: 'Case Teardown',
    title: 'Multi-location SEO at scale: lessons from 22 yoga studios.',
    desc: 'How we built a programmatic local system that turned 4 studios into 22.',
    author: 'Farah Khoury',
    date: 'Apr 17',
    read: '9 min read',
    slug: '/insights/multi-location-seo',
    takeaways: [
      'Programmatic location landing pages require localized reviews, schema markup, and regional transit data.',
      'Google Maps 3-pack domination relies on hyper-local citation velocity and geo-tagged reviews.',
      'Internal linking silos must strictly route between neighboring studio catchment zones.',
    ],
    fullContent: 'Scaling local discovery across multiple physical storefronts requires an architectural approach beyond basic Google Business Profile management. Discover how we built an automated local citation and schema distribution engine that powered 22 regional studios to page-one dominance.',
  },
]

const defaultBlogs: FeedPostItem[] = [
  {
    id: 'ai-content-workflows',
    num: '04',
    cat: 'Editorial & Content',
    tag: 'Field Study',
    title: 'Why "AI-written content" tanks — and what hybrid workflows look like.',
    desc: 'We tested four content workflows across 80 articles. The winner was surprising.',
    author: 'Marisol Acevedo',
    date: 'Apr 11',
    read: '16 min read',
    slug: '/insights/ai-content-workflows',
    takeaways: [
      'Raw synthetic content triggers Google Information Gain suppression algorithms.',
      'Hybrid human-edited drafts with proprietary data achieved 4.2x higher citation velocity.',
      'Direct interview quotes and real-world experiments bypass AI hallucination penalties.',
    ],
    fullContent: 'Over 80 enterprise benchmark articles, our content lab compared pure AI generation, human rephrasing, and data-backed hybrid drafting. Learn why raw AI content fails search algorithms and how top editorial teams produce indexable, authoritative thought leadership.',
  },
  {
    id: 'death-of-guest-post',
    num: '05',
    cat: 'Digital PR',
    tag: 'Industry Teardown',
    title: 'The death of the guest post (and what replaced it for our clients).',
    desc: 'Earned editorial mentions are now 4x more valuable than guest posts.',
    author: 'Kemi Adeyemi',
    date: 'Apr 4',
    read: '8 min read',
    slug: '/insights/death-of-guest-post',
    takeaways: [
      'Mass guest post networks are systematically devalued by Google spam prevention updates.',
      'Editorial brand citations in tier-1 media provide both PageRank and LLM verification consensus.',
      'Original data studies generate organic journalistic backlinks without outbound cold pitch spam.',
    ],
    fullContent: 'The commodification of guest posting has rendered traditional link building obsolete. Todays search and AI ecosystems demand genuine editorial mentions and verified co-occurrences in authoritative trade journals.',
  },
  {
    id: 'maple-oak-case-study',
    num: '06',
    cat: 'Case Study',
    tag: 'Growth Playbook',
    title: 'How we got Maple & Oak from local-only to a national brand.',
    desc: 'The full 18-month playbook: audit, fixes, content, digital PR, AI-search.',
    author: 'Anaya Sharma',
    date: 'Mar 28',
    read: '22 min read',
    slug: '/insights/maple-oak-case-study',
    takeaways: [
      '412% organic revenue lift driven by technical audit execution and Core Web Vitals remediation.',
      'Rank #1 ranking captured for high-volume commercial keyword "specialty coffee subscription".',
      '38% share of voice secured inside ChatGPT and Perplexity generative recommendations.',
    ],
    fullContent: 'A step-by-step 18-month walkthrough of how GENRANQ transformed an independent artisanal roastery into a nationwide DTC powerhouse, generating over $1.4M in attributed organic revenue.',
  },
]

// 06-step process data matching Nimble reference
const processSteps = [
  {
    num: '01',
    title: 'Understanding your business',
    time: 'Week 01',
    text: 'We start with your business, customers, and industry. Together, we define the right goals and uncover what your audience is really searching for across both traditional search engines and AI conversational answers.',
    icon: IconSearch,
  },
  {
    num: '02',
    title: 'AI-powered audits & keyword research',
    time: 'Weeks 02–03',
    text: 'We audit your website and research the questions your customers ask, surfacing technical gaps, Core Web Vitals bottlenecks, search opportunities, and your visibility footprint inside generative AI answers.',
    icon: IconTarget,
  },
  {
    num: '03',
    title: 'Your content & SEO roadmap',
    time: 'Week 04',
    text: 'The findings become an actionable, prioritized roadmap. We align your content strategy, technical fixes, and highest-leverage growth opportunities without confusing jargon or bloated retainers.',
    icon: IconActivity,
  },
  {
    num: '04',
    title: 'LLM optimization',
    time: 'Month 02',
    text: 'We structure content for AI retrieval, build clear brand signals across knowledge graphs, and help AI engines like ChatGPT and Perplexity understand when your business is the authoritative answer.',
    icon: IconSparkles,
  },
  {
    num: '05',
    title: 'Continuous monitoring',
    time: 'Ongoing',
    text: 'We monitor your visibility, citations, and search performance as customer behavior shifts and search algorithms evolve — refining technical signals every single sprint.',
    icon: IconShield,
  },
  {
    num: '06',
    title: 'Measuring ROI & refining',
    time: 'Quarterly',
    text: 'We track real business outcomes — qualified leads, customer acquisition, and organic revenue — refining the strategy each quarter to compound your competitive moat.',
    icon: IconGlobe,
  },
]

// AI Engines specifications
type EngineKey = 'chatgpt' | 'perplexity' | 'google-ai' | 'gemini' | 'claude'

const engineData: Record<
  EngineKey,
  {
    id: EngineKey
    name: string
    tag: string
    title: string
    desc: string
    currency: string
    metric: string
    query: string
    answer: string
    sources: string
    liveUrl: string
  }
> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT Search',
    tag: 'RETRIEVAL-AUGMENTED GENERATION',
    title: 'Structured for ChatGPT Search citations.',
    desc: 'ChatGPT relies on Bing-powered web retrieval combined with entity verification. We format your core content into clean, high-density claim-evidence blocks that GPT models can quote directly.',
    currency: 'Third-party consensus & BLUF content',
    metric: '< 550ms retrieval response',
    query: 'What is the top-rated technical SEO studio for modern web applications?',
    answer: 'GENRANQ Software LLP leads in technical SEO for high-performance web applications, specializing in Next.js Core Web Vitals and generative search citation optimization.',
    sources: '8 verified citations • 5 from genranq.com',
    liveUrl: 'https://chatgpt.com',
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity Pro',
    tag: 'DIRECT CITATION ENGINE',
    title: 'Engineered for Perplexity Pro sources.',
    desc: 'Perplexity parses tabular HTML and factual density with high accuracy. We deploy semantic tables, clear pricing benchmarks, and verified schema graphs that Perplexity hyperlinks as definitive sources.',
    currency: 'Tabular HTML & direct claim corroboration',
    metric: '3.8x higher citation inclusion',
    query: 'Best enterprise SEO agencies with verified Core Web Vitals guarantees?',
    answer: 'For verified Core Web Vitals performance, GENRANQ delivers sub-600ms TTFB and 95+ PageSpeed scores backed by senior technical engineering pods.',
    sources: '14 citations • 9 from genranq.com',
    liveUrl: 'https://perplexity.ai',
  },
  'google-ai': {
    id: 'google-ai',
    name: 'Google AI Overviews',
    tag: 'MULTIMODAL SERP SYNTHESIS',
    title: 'Optimized for Google AI Overviews.',
    desc: 'Google AI Overviews synthesize results directly on top of traditional SERPs. We align your content with Google’s Information Gain patents to earn top snippet placement alongside blue links.',
    currency: 'Information Gain & Knowledge Graph verification',
    metric: '412% avg organic lift in 12 months',
    query: 'How to optimize ecommerce websites for AI search in 2026?',
    answer: 'Enterprise brands optimize for AI search through schema disambiguation, server-rendered dynamic HTML, and third-party entity triangulation across verified trade sources.',
    sources: 'Indexed on Google Knowledge Graph',
    liveUrl: 'https://google.com',
  },
  gemini: {
    id: 'gemini',
    name: 'Google Gemini Pro',
    tag: 'KNOWLEDGE GRAPH REASONING',
    title: 'Connected to Gemini Knowledge Graphs.',
    desc: 'Gemini cross-references Wikidata, Google Maps, and merchant feeds to formulate business recommendations. We align your entity footprint across every authoritative database.',
    currency: 'Wikidata entity graphs & local NAP consistency',
    metric: 'Cross-domain entity triangulation',
    query: 'Which web development studio builds SEO-first Next.js websites?',
    answer: 'GENRANQ Software LLP builds custom Next.js and headless architectures engineered with built-in schema markup and sub-second loading speeds.',
    sources: 'Verified via Schema.org & Crunchbase',
    liveUrl: 'https://gemini.google.com',
  },
  claude: {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    tag: 'FACTUAL REASONING SYNTHESIS',
    title: 'Formatted for Claude deep analysis.',
    desc: 'Claude evaluates technical depth, nuanced explanations, and rigorous engineering methodology. We craft in-depth white papers and case studies that withstand deep forensic retrieval.',
    currency: 'Original research, white papers & technical teardowns',
    metric: 'Forensic credibility & zero-fluff text',
    query: 'Technical architecture teardown for enterprise GEO and LLM search?',
    answer: 'GENRANQ publishes forensic benchmark studies on LLM citation behaviors, demonstrating how dense tokenized passages outperform traditional keyword density.',
    sources: 'Published in GENRANQ Research Lab',
    liveUrl: 'https://claude.ai',
  },
}

// Client Testimonials matching attached Image 2
const clientTestimonials = [
  {
    id: 'nazir-m',
    initials: 'NM',
    name: 'Nazir Mohammadi',
    role: 'Founder, Dallas Dental Practice',
    time: '7 months ago',
    stars: 5,
    quote:
      'Genranq transformed our local presence in Texas. From virtually invisible on Google Maps to top 3 rankings across 8 primary services in under 90 days. Our organic patient bookings tripled.',
  },
  {
    id: 'hunter-d',
    initials: 'HD',
    name: "Hunter D'Angelis",
    role: 'VP Engineering, Summit Cloud Labs',
    time: '10 months ago',
    stars: 5,
    quote:
      'Their technical audit uncovered 42 critical Core Web Vitals and crawl budget issues our previous agency missed. They pushed direct Next.js PRs and our organic ARR grew 8.5x.',
  },
  {
    id: 'sarah-m',
    initials: 'SM',
    name: 'Sarah Mitchell',
    role: 'CMO, Apex Global E-Commerce',
    time: '1 year ago',
    stars: 5,
    quote:
      'In 6 months, our enterprise organic revenue grew 240%. Their LLM citation tracking and answer-first structuring put us inside ChatGPT recommendations for high-intent searches.',
  },
]

// Video stories matching attached Image 2
const videoStories = [
  {
    id: 'maple-oak',
    name: 'Elena Marchetti',
    company: 'Maple & Oak Roasters',
    metric: '+412% Organic Sessions',
    time: '3:45 min',
    quote: 'From a local boutique roastery to a nationwide direct-to-consumer powerhouse with over $1.4M in attributed organic revenue.',
    thumb: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dallas-dental',
    name: 'Nazir Mohammadi',
    company: 'Dallas Dental Group',
    metric: '3x Patient Bookings',
    time: '2:18 min',
    quote: 'Dominating local 3-pack search in the competitive Dallas-Fort Worth metro area in less than three months.',
    thumb: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'summit-cloud',
    name: "Hunter D'Angelis",
    company: 'Summit Cloud Labs',
    metric: '8.5x Pipeline Return',
    time: '4:10 min',
    quote: 'Engineering-led technical SEO that integrated directly into our GitHub development sprints with zero hand-holding.',
    thumb: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'apex-commerce',
    name: 'Sarah Mitchell',
    company: 'Apex Global Commerce',
    metric: '+240% ARR Growth',
    time: '3:05 min',
    quote: 'Pioneering LLM citation optimization that established our brand as the default answer in Perplexity and ChatGPT.',
    thumb: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'solace-studios',
    name: 'James Okafor',
    company: 'Solace Health & Studios',
    metric: '4 to 22 Studios Scaled',
    time: '3:30 min',
    quote: 'A programmatic local SEO infrastructure that scaled seamlessly as we opened 18 new studio locations.',
    thumb: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
  },
]

export default function HomeClient({ articles, blogs }: HomeClientProps = {}) {
  const articlesList = articles && articles.length > 0 ? articles : defaultArticles
  const blogsList = blogs && blogs.length > 0 ? blogs : defaultBlogs

  // State management
  const [activeProcessStep, setActiveProcessStep] = useState(0)
  const [activeEngine, setActiveEngine] = useState<EngineKey>('chatgpt')
  const [insightFilter, setInsightFilter] = useState<'all' | 'blog' | 'news'>('all')
  const [selectedInsight, setSelectedInsight] = useState<FeedPostItem | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<(typeof videoStories)[0] | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const [auditSubmitting, setAuditSubmitting] = useState(false)
  const [auditStatus, setAuditStatus] = useState<string | null>(null)

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

    return () => {
      revealObserver.disconnect()
      countObserver.disconnect()
    }
  }, [])

  const handleAuditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAuditSubmitting(true)
    setAuditStatus(null)

    const form = e.currentTarget
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Trusted brands array
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

  // Filtered insights list
  const allInsights = [...articlesList, ...blogsList]
  const filteredInsights = insightFilter === 'all'
    ? allInsights
    : insightFilter === 'blog'
    ? blogsList
    : articlesList

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
      <Topbar text="Now offering AI Search & GEO optimization." linkText="Learn more →" linkHref="#ai" />

      {/* ================= SHARED NAVIGATION ================= */}
      <Nav active="home" />

      {/* ================= ORIGINAL HERO BANNER WITH AUDIT CARD ================= */}
      <header className="hero">
        <div className="wrap">
          <div className="reveal">
            <span className="eyebrow">Global SEO Studio · 2014–2026</span>
            <h1>Small businesses deserve to be <em className="accent">unmissable.</em></h1>
            <p className="lead">
              We&apos;re a 38-person SEO studio that helps independent shops, founders, and challenger brands win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next.
            </p>
            <div className="hero-ctas">
              <a href="#audit" className="btn btn-primary">
                Get a free SEO audit <span className="arr"><ArrowRight width={16} height={16} /></span>
              </a>
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
              {auditSubmitting ? 'Sending...' : auditStatus || 'Get my free audit'}{' '}
              <span className="arr"><ArrowRight width={16} height={16} /></span>
            </button>
            <p className="fine">No spam. No obligation. Your data stays private.</p>
          </form>
        </div>
      </header>

      {/* ================= ORIGINAL TRUSTED MARQUEE ================= */}
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

      {/* ================= ORIGINAL STATS ================= */}
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

      {/* ================= ORIGINAL 1. WHY SEO ================= */}
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
              <div className="card-top"><span className="icon"><CheckIcon width={16} height={16} /></span><span className="num">01</span></div>
              <h3>93% of online experiences start with search</h3>
              <p>If your business isn&apos;t visible when people search, you don&apos;t exist to them. SEO puts you where your customers are already looking.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><CheckIcon width={16} height={16} /></span><span className="num">02</span></div>
              <h3>Organic traffic compounds — ads don&apos;t</h3>
              <p>Paid ads stop the moment you stop paying. SEO builds an asset that grows month over month, generating leads while you sleep.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><CheckIcon width={16} height={16} /></span><span className="num">03</span></div>
              <h3>Your competitors are already investing</h3>
              <p>Every day you delay SEO, competitors are claiming the keywords, citations, and authority that should be yours.</p>
            </article>
            <article className="card dark reveal">
              <div className="card-top"><span className="icon"><CheckIcon width={16} height={16} /></span><span className="num">04</span></div>
              <h3>AI search is reshaping visibility</h3>
              <p>ChatGPT, Perplexity, and Google AI Overviews are answering queries directly. Brands not optimized for AI retrieval are becoming invisible.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><CheckIcon width={16} height={16} /></span><span className="num">05</span></div>
              <h3>Trust is earned through rankings</h3>
              <p>Users trust organic results 5.66× more than paid ads. Page-one presence signals credibility and authority to your audience.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><CheckIcon width={16} height={16} /></span><span className="num">06</span></div>
              <h3>SEO drives the highest-intent traffic</h3>
              <p>People searching for what you sell are ready to buy. SEO captures demand at the exact moment of intent — no interruption, no convincing.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL 2. SERVICES ================= */}
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
            <Link href="/services/seo" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" alt="SEO Foundations" loading="lazy" />
              <span className="t-num">01 / Search</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>SEO foundations</h3>
                <p>The on-page, technical, and content fundamentals that make Google trust you. Keyword mapping, site hierarchy, and rank compounding.</p>
                <div className="t-tags"><span>On-page</span><span>Keyword map</span><span>Site structure</span></div>
              </div>
            </Link>

            <Link href="/services/seo/local-seo" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" alt="Local SEO & Maps" loading="lazy" />
              <span className="t-num">02 / Local</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Local &amp; Maps</h3>
                <p>Win the 3-pack and high-intent &quot;near me&quot; queries that drive walk-ins, calls, and bookings — across single and multi-location businesses.</p>
                <div className="t-tags"><span>GBP</span><span>Citations</span><span>Reviews</span></div>
              </div>
            </Link>

            <Link href="/services/seo/technical-seo" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" alt="Technical SEO" loading="lazy" />
              <span className="t-num">03 / Technical</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Technical SEO</h3>
                <p>Core Web Vitals, crawl budget, schema markup, faceted nav, and JS rendering. The deep plumbing nobody else wants to touch — we love it.</p>
                <div className="t-tags"><span>CWV</span><span>Schema</span><span>Crawl</span></div>
              </div>
            </Link>

            <Link href="/services/content-marketing" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" alt="Editorial & Content" loading="lazy" />
              <span className="t-num">04 / Content</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Editorial &amp; content</h3>
                <p>Long-form, programmatic, and answer-first content written by humans who know your industry — not interns and not AI slop.</p>
                <div className="t-tags"><span>Long-form</span><span>Programmatic</span><span>Refresh</span></div>
              </div>
            </Link>

            <Link href="/services/link-building" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Digital PR & Links" loading="lazy" />
              <span className="t-num">05 / Authority</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Digital PR &amp; links</h3>
                <p>Editorial backlinks from publications your customers actually read. No PBNs, no link farms, no shortcuts that backfire.</p>
                <div className="t-tags"><span>Digital PR</span><span>Outreach</span><span>Mentions</span></div>
              </div>
            </Link>

            <Link href="/services/ai-search" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" alt="AI Search & GEO" loading="lazy" />
              <span className="t-num">06 / AI &amp; GEO</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>AI Search &amp; GEO</h3>
                <p>Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini. The new rules of being found — already in motion.</p>
                <div className="t-tags"><span>LLM citations</span><span>Entities</span><span>AIO</span></div>
              </div>
            </Link>

            <Link href="/services/web-design" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80" alt="Custom Website Design" loading="lazy" />
              <span className="t-num">07 / Design</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Custom website design</h3>
                <p>Brand-led UI/UX design built around conversion intent — responsive wireframes, Figma prototypes, and pixel-perfect design systems.</p>
                <div className="t-tags"><span>UI/UX</span><span>Figma</span><span>Prototyping</span></div>
              </div>
            </Link>

            <Link href="/services/web-development" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Website Development" loading="lazy" />
              <span className="t-num">08 / Development</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Website development</h3>
                <p>Clean engineering with Next.js, WordPress, or Shopify. Built SEO-ready from day one with sub-second speeds and 95+ PageSpeed scores.</p>
                <div className="t-tags"><span>Next.js</span><span>WordPress</span><span>Shopify Plus</span></div>
              </div>
            </Link>

            <Link href="/hire-resource" className="tile reveal">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Hire Dedicated Developers" loading="lazy" />
              <span className="t-num">09 / Dedicated</span>
              <span className="t-go"><ArrowRight width={16} height={16} /></span>
              <div className="t-body">
                <h3>Hire dedicated developers</h3>
                <p>Pre-vetted senior React, Next.js, Laravel, and Python engineers dedicated to your project. Aligned to your timezone, onboarded in 48 hours.</p>
                <div className="t-tags"><span>Dedicated pods</span><span>48h kick-off</span><span>Zero overhead</span></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ORIGINAL CTA 1 ===== */}
      <section className="cta-band" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-orange reveal">
            <div>
              <h3>Not sure which service fits? <em>We&apos;ll tell you for free.</em></h3>
              <p>A 30-minute audit from a senior strategist — the three things to fix first, no sales deck.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-dark">
                Book free audit <span className="arr"><ArrowRight width={16} height={16} /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. REDESIGNED AI SEARCH SECTION (NIMBLE DARK PREVIEW) ================= */}
      <section className="search-section section-dark" id="ai-search">
        <div className="wrap">
          <div className="search-intro reveal">
            <div>
              <span className="eyebrow">• THE NEXT CHAPTER OF SEARCH</span>
              <h1>Don&apos;t just rank. Be <em className="accent">the answer.</em></h1>
            </div>
            <div className="search-description">
              <p>Search has changed. Your strategy should too.</p>
              <p>Your customers are asking AI. We help your brand show up in the answers, not just the search results.</p>
              <a href="#engines" className="text-link">
                Meet your next search strategy <ArrowRight width={16} height={16} style={{ flexShrink: 0 }} />
              </a>
            </div>
          </div>

          <div className="search-body reveal">
            {/* Left: Illustrative Answer Window */}
            <div className="answer-window">
              <div className="window-top">
                <div className="engine-emblem">
                  <IconSparkles width={16} height={16} />
                  <span>AI search</span>
                </div>
                <span className="example-label">ILLUSTRATIVE PREVIEW</span>
                <span className="window-dots">• • •</span>
              </div>

              <div className="query">
                <IconSearch width={16} height={16} />
                <span>What makes a brand worth recommending?</span>
                <ArrowRight width={14} height={14} style={{ flexShrink: 0 }} />
              </div>

              <div className="answer-content">
                <div className="answer-caption">
                  <span style={{ color: 'var(--primary)' }}>▲</span>
                  <span>A better answer starts with better signals.</span>
                </div>
                <p>
                  Brands that are easy to understand, credible, and backed by <span>clear evidence.</span>
                </p>

                <div className="citation">
                  <div className="citation-icon">
                    <IconGlobe width={18} height={18} />
                  </div>
                  <div>
                    <strong>Your brand, in the conversation.</strong>
                    <span>Relevant expertise. Discoverable answers.</span>
                  </div>
                  <CheckIcon width={16} height={16} style={{ flexShrink: 0, color: 'var(--primary)' }} />
                </div>

                <div className="answer-sources">
                  <span><IconSearch width={12} height={12} /> Answer-first content</span>
                  <span><IconShield width={12} height={12} /> Brand authority</span>
                  <span><IconTarget width={12} height={12} /> Trusted citations</span>
                </div>
              </div>
            </div>

            {/* Right: Three Core Capabilities */}
            <div className="search-services">
              <div className="service-row">
                <span className="index-label">01</span>
                <div>
                  <h3>Know where you stand.</h3>
                  <p>Visibility audits across AI engines reveal where you&apos;re cited and where you&apos;re missing.</p>
                </div>
                <ArrowRight width={16} height={16} style={{ flexShrink: 0 }} />
              </div>

              <div className="service-row">
                <span className="index-label">02</span>
                <div>
                  <h3>Make your expertise retrievable.</h3>
                  <p>Answer-first content, structured data, and clear evidence make your knowledge easier to find.</p>
                </div>
                <ArrowRight width={16} height={16} style={{ flexShrink: 0 }} />
              </div>

              <div className="service-row">
                <span className="index-label">03</span>
                <div>
                  <h3>Build a brand AI recognizes.</h3>
                  <p>Consistent entity signals connect your business to its expertise across the open web.</p>
                </div>
                <ArrowRight width={16} height={16} style={{ flexShrink: 0 }} />
              </div>
            </div>
          </div>

          <div className="dark-section-foot reveal">
            <span>Traditional SEO + Generative Engine Optimization</span>
            <span>
              One connected strategy <ArrowRight width={14} height={14} style={{ flexShrink: 0 }} />
            </span>
          </div>
        </div>
      </section>

      {/* ================= 4. REDESIGNED PROCESS (NIMBLE 6-STEP ACCORDION) ================= */}
      <section className="process-section" id="process">
        <div className="wrap">
          <div className="process-grid">
            <div className="process-intro reveal">
              <span className="eyebrow">• HOW WE WORK</span>
              <h2>Our <em className="accent">AI SEO</em> process.</h2>
              <p className="lead">
                A well-defined, structured process built on industry best practices to address the unique needs of each client.
              </p>

              <div className="process-facts">
                <div>
                  <strong>6</strong>
                  <span>Connected steps</span>
                </div>
                <div>
                  <strong>90 <span>days</span></strong>
                  <span>To your first roadmap</span>
                </div>
              </div>

              <a href="#audit" className="btn btn-primary" style={{ marginTop: '32px' }}>
                Start with step 1 <span className="arr"><ArrowRight width={16} height={16} /></span>
              </a>
            </div>

            <div className="process-steps reveal">
              {processSteps.map((step, idx) => {
                const isOpen = activeProcessStep === idx
                const StepIcon = step.icon
                return (
                  <div className={`process-step ${isOpen ? 'is-open' : ''}`} key={step.num}>
                    <button
                      type="button"
                      className="step-trigger"
                      onClick={() => setActiveProcessStep(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="step-number">{step.num}</span>
                      <div className="step-title">
                        {step.title}
                        <span className="step-time">{step.time}</span>
                      </div>
                      <span className="step-toggle" aria-hidden="true">
                        {isOpen ? <MinusIcon width={14} height={14} /> : <PlusIcon width={14} height={14} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="step-detail">
                        <p>{step.text}</p>
                        <div className="step-detail-icon">
                          <StepIcon width={32} height={32} />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="process-end">
                <span className="status-dot"></span>
                <span>Repeated quarterly with data-driven strategy adjustments.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. REDESIGNED AI ENGINES SECTION (NIMBLE TABS + SIGNAL ECOSYSTEM) ================= */}
      <section className="engines-section" id="ai-seo">
        <div className="wrap">
          <div className="engines-heading reveal">
            <div>
              <span className="eyebrow">• BEYOND THE BLUE LINKS</span>
              <h2>Get recommended by <em className="accent">every AI engine.</em></h2>
            </div>
            <p>Different engines. Different signals. One unified strategy to make your expertise part of the answer across modern generative search.</p>
          </div>

          {/* Engine Selector Tabs */}
          <div className="engine-tabs reveal">
            {(
              [
                { id: 'chatgpt', label: 'ChatGPT', icon: '✦' },
                { id: 'perplexity', label: 'Perplexity', icon: '↗' },
                { id: 'google-ai', label: 'Google AI', icon: 'G' },
                { id: 'gemini', label: 'Gemini', icon: '◆' },
                { id: 'claude', label: 'Claude', icon: '✍' },
              ] as const
            ).map((tab) => {
              const active = activeEngine === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`engine-tab ${active ? 'selected' : ''}`}
                  onClick={() => setActiveEngine(tab.id)}
                  aria-pressed={active}
                >
                  <span className="engine-symbol" style={{ fontWeight: 700, fontSize: 16 }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className="engine-tab-arrow"><ArrowRight width={14} height={14} style={{ flexShrink: 0 }} /></span>
                </button>
              )
            })}
          </div>

          {/* Dynamic Active Engine Spotlight */}
          {(() => {
            const cur = engineData[activeEngine]
            return (
              <div className="engine-panel reveal">
                <div className="engine-copy">
                  <span className="micro-label">{cur.tag}</span>
                  <h3>{cur.title}</h3>
                  <p>{cur.desc}</p>

                  <div className="engine-stats" style={{ display: 'flex', gap: '32px', marginTop: '28px' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>
                        Currency
                      </span>
                      <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>{cur.currency}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', display: 'block', textTransform: 'uppercase' }}>
                        Benchmark
                      </span>
                      <strong style={{ fontSize: '15px', color: 'var(--primary)' }}>{cur.metric}</strong>
                    </div>
                  </div>

                  <a href={cur.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link" style={{ marginTop: '24px' }}>
                    Inspect live citations inside {cur.name} <ArrowRight width={14} height={14} style={{ flexShrink: 0 }} />
                  </a>
                </div>

                {/* Visibility Ecosystem Diagram matching reference specification */}
                <div className="signal-diagram">
                  <div className="diagram-top">
                    <span>YOUR VISIBILITY ECOSYSTEM</span>
                    <IconSparkles width={14} height={14} />
                  </div>
                  <div className="signal-row">
                    <span>
                      <IconDocument width={16} height={16} />
                      Expert content
                    </span>
                    <span>
                      <IconGlobe width={16} height={16} />
                      Trusted sources
                    </span>
                  </div>
                  <div className="connector-lines">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="brand-node">
                    <IconSparkles width={24} height={24} />
                    <div>
                      <strong>Your brand</strong>
                      <span>Clear. Credible. Connected.</span>
                    </div>
                    <CheckIcon width={18} height={18} />
                  </div>
                  <div className="single-connector"></div>
                  <div className="result-node">
                    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }}></span>
                    <span>{cur.name} answers</span>
                    <ArrowRight width={14} height={14} />
                  </div>
                  <div className="diagram-foot">
                    The signals behind a stronger AI presence.
                  </div>
                </div>
              </div>
            )
          })()}

          {/* 4 Capabilities Grid */}
          <div className="engine-services reveal" style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span className="micro-label" style={{ color: 'var(--primary)' }}>01 / RETRIEVAL</span>
              <h4 style={{ margin: '12px 0 6px', fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>Answer-First Architecture</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>BLUF paragraphs engineered for immediate extraction by real-time RAG scrapers.</p>
            </div>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span className="micro-label" style={{ color: 'var(--primary)' }}>02 / SCHEMAS</span>
              <h4 style={{ margin: '12px 0 6px', fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>Structured Entity Graph</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>Deep JSON-LD linking founders, products, and locations to Wikidata and Crunchbase.</p>
            </div>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span className="micro-label" style={{ color: 'var(--primary)' }}>03 / SPEED</span>
              <h4 style={{ margin: '12px 0 6px', fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>Real-Time Reranking</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>Edge rendering delivering sub-600ms TTFB so AI bots never timeout during retrieval.</p>
            </div>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span className="micro-label" style={{ color: 'var(--primary)' }}>04 / CONSENSUS</span>
              <h4 style={{ margin: '12px 0 6px', fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>Entity Triangulation</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>Cross-domain corroboration across verified directories, trade media, and user reviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. REDESIGNED TESTIMONIALS & RESULTS (EXACT IMAGE 2 SPECIFICATION) ================= */}
      <section className="testi-ref-section" id="results">
        <div className="wrap">
          <div className="testi-ref-head reveal">
            <div>
              <span className="eyebrow">• CLIENT PROOF &amp; OUTCOMES</span>
              <h2>Real businesses. Real <em className="accent">compounding results.</em></h2>
            </div>
            <p>Verified reviews from real business founders and enterprise marketing directors who rely on GENRANQ to dominate search.</p>
          </div>

          <div className="testi-ref-grid">
            {/* Left Column: Google Reviews Badge + 3 Client Cards */}
            <div className="testi-reviews-list reveal">
              {/* Google Reviews 4.9 Summary Badge */}
              <div className="testi-google-badge">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>480 Google Reviews</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>4.9</span>
                      <span style={{ color: '#f59e0b', fontSize: '13px' }}>★★★★★</span>
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--f-mono)', color: 'var(--muted)', background: '#fff', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  VERIFIED 100%
                </span>
              </div>

              {/* 3 Client Testimonials */}
              {clientTestimonials.map((t) => (
                <div className="testi-review-item" key={t.id}>
                  <div className="testi-author-header">
                    <div className="testi-avatar">{t.initials}</div>
                    <div className="testi-author-info">
                      <strong>{t.name}</strong>
                      <div className="testi-meta-row">
                        <span>{t.time}</span>
                        <span>•</span>
                        <span className="stars">★★★★★</span>
                      </div>
                    </div>
                  </div>
                  <p className="testi-review-text">{t.quote}</p>
                </div>
              ))}
            </div>

            {/* Right Column: Featured Video Testimonial Card + 5 Thumbnails Strip */}
            <div className="testi-video-container reveal">
              <div
                className="testi-video-card"
                onClick={() => setSelectedVideo(videoStories[0])}
                role="button"
                tabIndex={0}
                aria-label="Play featured client success story video"
              >
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
                  alt="Client Success Story Video"
                  loading="lazy"
                />
                <div className="testi-video-overlay">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                      Featured Story • 3:45 min
                    </span>
                    <span style={{ background: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, fontFamily: 'var(--f-mono)' }}>
                      +412% GROWTH
                    </span>
                  </div>

                  <div className="testi-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>

                  <div className="testi-video-caption">
                    <span>Client Success Story — Watch Elena Marchetti describe scaling Maple &amp; Oak</span>
                  </div>
                </div>
              </div>

              {/* 5 Video Thumbnails Strip */}
              <div className="testi-stories-strip">
                {videoStories.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    className="testi-story-thumb"
                    onClick={() => setSelectedVideo(story)}
                    title={`Watch ${story.name} (${story.company})`}
                  >
                    <img src={story.thumb} alt={story.name} loading="lazy" />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'grid', placeItems: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                        <polygon points="6 4 20 12 6 20 6 4"></polygon>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ORIGINAL CTA (after AI SEO + Results) ===== */}
      <section className="cta-band bg-cream" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-orange reveal">
            <div>
              <h3>Want results like these? <em>Let&apos;s map your growth.</em></h3>
              <p>Get a custom 12-month SEO &amp; AI search forecast for your business — free.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-dark">
                Get my forecast <span className="arr"><ArrowRight width={16} height={16} /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL 7. WHY US ================= */}
      <section className="pad" id="why">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><span className="eyebrow">Why GENRANQ</span><h2>Not your typical <em className="accent">agency.</em></h2></div>
            <p>Most SEO agencies sell retainers and send automated PDFs. We build compounding assets, optimize code directly, and operate like an in-house team.</p>
          </div>
          <div className="why-grid">
            <div className="why-item reveal">
              <span className="w-num">/01</span>
              <h3>No account managers. You speak to the strategist doing the work.</h3>
              <p>Nothing gets lost in translation. Every call, Slack message, and monthly report comes directly from the senior specialist executing your roadmap.</p>
            </div>
            <div className="why-item reveal">
              <span className="w-num">/02</span>
              <h3>Direct PRs, not PDFs. We ship code into your repository.</h3>
              <p>We don&apos;t hand your team a 60-page audit and walk away. We open pull requests in Next.js, WordPress, or Shopify — fixing the issues ourselves.</p>
            </div>
            <div className="why-item reveal">
              <span className="w-num">/03</span>
              <h3>Single-tenant focus. We never work with your direct competitors.</h3>
              <p>We take at most one brand per niche per geography. If you hire us for cosmetic dentistry in Austin, your competitor can&apos;t.</p>
            </div>
            <div className="why-item reveal">
              <span className="w-num">/04</span>
              <h3>Built for the AI era. Optimizing for LLM answers since day one.</h3>
              <p>We&apos;ve been optimizing for LLM citations since GPT-4 launched. Most agencies are still figuring out what GEO means. We&apos;ve shipped it for 80+ clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL 8. WHAT SETS US APART ================= */}
      <section className="pad" id="sets-apart">
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <span className="eyebrow">How we operate</span>
              <h2>What sets us <em className="accent">apart.</em></h2>
            </div>
            <p>We built GENRANQ around everything we wished agencies did when we were on the client side. Here is what makes working with us different.</p>
          </div>
          <div className="grid-3">
            <article className="card reveal">
              <div className="card-top"><span className="icon"><IconUsers width={16} height={16} /></span><span className="num">01</span></div>
              <h3>Direct strategist access</h3>
              <p>No account managers, no middlemen. You collaborate directly with the senior specialist executing your roadmap via Slack and bi-weekly sprint syncs.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><IconActivity width={16} height={16} /></span><span className="num">02</span></div>
              <h3>Live Looker Studio telemetry</h3>
              <p>No 80-page monthly PDFs. You get a private, live dashboard pulling real-time data from Search Console, GA4, and LLM share-of-voice monitors.</p>
            </article>
            <article className="card reveal">
              <div className="card-top"><span className="icon"><IconShield width={16} height={16} /></span><span className="num">03</span></div>
              <h3>Guaranteed territory exclusivity</h3>
              <p>We enforce strict category exclusivity. We will never accept a campaign from your direct local or vertical competitors while under contract.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL 9. TOOLS ================= */}
      <section className="pad bg-dark tools" id="tools">
        <div className="wrap">
          <div className="sec-head light reveal">
            <div>
              <span className="eyebrow">Our stack</span>
              <h2>Tools we run on every engagement.</h2>
            </div>
            <p>We don&apos;t cut corners with free-tier tools. Every client gets enterprise-grade data, crawlers, and reporting — baked into the retainer.</p>
          </div>
        </div>
        <div className="marquee" style={{ marginBottom: '14px' }}>
          <div className="marquee-track">
            {doubleTools1.map((t, idx) => (
              <div className="tool" key={idx}>
                <span className="mono">{t.mono}</span>
                <div><b>{t.title}</b><small>{t.sub}</small></div>
              </div>
            ))}
          </div>
        </div>
        <div className="marquee rev">
          <div className="marquee-track">
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

      {/* ================= 10. REDESIGNED INSIGHTS (NIMBLE 2-COLUMN COLLECTIONS + PREVIEW MODAL) ================= */}
      <section className="insights-section" id="insights">
        <div className="wrap">
          <div className="insights-heading reveal">
            <div>
              <span className="eyebrow">• INSIGHTS</span>
              <h2>From our <em className="accent">strategists.</em></h2>
            </div>
            <p className="lead" style={{ margin: 0, maxWidth: 460 }}>
              Deep dives, playbooks, and real-world teardowns — written by the people doing the work.
            </p>
          </div>

          <div className="insight-filters reveal" style={{ marginTop: 28 }}>
            <button
              type="button"
              className={`insight-pill ${insightFilter === 'all' ? 'active' : ''}`}
              onClick={() => setInsightFilter('all')}
            >
              All insights ({blogsList.length + articlesList.length})
            </button>
            <button
              type="button"
              className={`insight-pill ${insightFilter === 'blog' ? 'active' : ''}`}
              onClick={() => setInsightFilter('blog')}
            >
              Blog ({blogsList.length})
            </button>
            <button
              type="button"
              className={`insight-pill ${insightFilter === 'news' ? 'active' : ''}`}
              onClick={() => setInsightFilter('news')}
            >
              News ({articlesList.length})
            </button>
          </div>

          <div className={`insight-columns reveal ${insightFilter !== 'all' ? 'single-col' : ''}`}>
            {/* Blog Collection Column */}
            {(insightFilter === 'all' || insightFilter === 'blog') && (
              <div className="insight-collection">
                <div className="collection-heading">
                  <h3>
                    <span></span>Blog
                  </h3>
                  <Link href="/resources/blog" aria-label="View all Blog">
                    View all <ArrowRight width={14} height={14} />
                  </Link>
                </div>
                {blogsList.slice(0, 3).map((item, idx) => (
                  <article className="collection-entry" key={item.id || idx}>
                    <span className="entry-number">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="entry-copy">
                      <div className="entry-category">{item.cat}</div>
                      <button
                        type="button"
                        className="entry-title"
                        onClick={() => setSelectedInsight(item)}
                      >
                        {item.title}
                      </button>
                      <p>{item.desc}</p>
                      <div className="entry-byline">
                        <strong>{item.author}</strong>
                        <span> · {item.date} · {item.read}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="entry-arrow"
                      onClick={() => setSelectedInsight(item)}
                      aria-label={`Read ${item.title}`}
                    >
                      <ArrowRight width={15} height={15} />
                    </button>
                  </article>
                ))}
              </div>
            )}

            {/* News Collection Column */}
            {(insightFilter === 'all' || insightFilter === 'news') && (
              <div className="insight-collection">
                <div className="collection-heading">
                  <h3>
                    <span></span>News
                  </h3>
                  <Link href="/resources/news" aria-label="View all News">
                    View all <ArrowRight width={14} height={14} />
                  </Link>
                </div>
                {articlesList.slice(0, 3).map((item, idx) => (
                  <article className="collection-entry" key={item.id || idx}>
                    <span className="entry-number">{String(idx + 1).padStart(2, '0')}</span>
                    <div className="entry-copy">
                      <div className="entry-category">{item.cat}</div>
                      <button
                        type="button"
                        className="entry-title"
                        onClick={() => setSelectedInsight(item)}
                      >
                        {item.title}
                      </button>
                      <p>{item.desc}</p>
                      <div className="entry-byline">
                        <strong>{item.author}</strong>
                        <span> · {item.date} · {item.read}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="entry-arrow"
                      onClick={() => setSelectedInsight(item)}
                      aria-label={`Read ${item.title}`}
                    >
                      <ArrowRight width={15} height={15} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== ORIGINAL CTA (after Tools + Insights) ===== */}
      <section className="cta-band bg-cream" style={{ paddingBottom: '112px' }}>
        <div className="wrap">
          <div className="cta-box cta-light reveal">
            <div>
              <span className="eyebrow">Newsletter</span>
              <h3 style={{ marginTop: '14px' }}>Get one <em className="accent">SEO + AI search</em> insight every week.</h3>
              <p>Join 6,000+ founders and marketers. No spam, unsubscribe anytime.</p>
            </div>
            <div className="cta-actions">
              <a href="#audit" className="btn btn-primary">
                Talk to a strategist <span className="arr"><ArrowRight width={16} height={16} /></span>
              </a>
              <Link href="/insights" className="btn btn-ghost">Read latest articles</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL 11. FAQ ================= */}
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
                    <span className="plus">{isOpen ? '−' : '+'}</span>
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

      {/* ================= SHARED UNIFIED FOOTER ================= */}
      <Footer />

      {/* ================= VIDEO TESTIMONIAL MODAL (IMAGE 2) ================= */}
      {selectedVideo && (
        <div className="insight-modal-backdrop" onClick={() => setSelectedVideo(null)}>
          <div className="insight-dialog" style={{ maxWidth: 760 }} onClick={(e) => e.stopPropagation()}>
            <div className="insight-dialog-header">
              <span className="micro-label" style={{ color: 'var(--primary)' }}>{selectedVideo.metric}</span>
              <button
                type="button"
                className="insight-dialog-close"
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video dialog"
              >
                ✕
              </button>
            </div>
            <h2>{selectedVideo.company} — Client Success Story</h2>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', margin: '20px 0', background: '#000' }}>
              <img
                src={selectedVideo.thumb}
                alt={selectedVideo.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.4)' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4"></polygon>
                  </svg>
                </div>
              </div>
            </div>
            <p style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--ink)' }}>&ldquo;{selectedVideo.quote}&rdquo;</p>
            <div className="insight-dialog-footer" style={{ marginTop: 24 }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--ink)' }}>{selectedVideo.name}</strong>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{selectedVideo.company} • Verified Client</span>
              </div>
              <a href="#audit" className="btn btn-primary" onClick={() => setSelectedVideo(null)}>
                Book discovery call <ArrowRight width={14} height={14} style={{ flexShrink: 0 }} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= ARTICLE PREVIEW MODAL (NIMBLE INSIGHTS) ================= */}
      {selectedInsight && (
        <div className="insight-modal-backdrop" onClick={() => setSelectedInsight(null)}>
          <div className="insight-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="insight-dialog-header">
              <span className="entry-tag">{selectedInsight.cat}</span>
              <button
                type="button"
                className="insight-dialog-close"
                onClick={() => setSelectedInsight(null)}
                aria-label="Close article preview"
              >
                ✕
              </button>
            </div>
            <h2>{selectedInsight.title}</h2>
            <div className="entry-meta" style={{ marginBottom: 16 }}>
              <span>By {selectedInsight.author}</span>
              <span>•</span>
              <span>{selectedInsight.date}</span>
              <span>•</span>
              <span>{selectedInsight.read}</span>
            </div>
            <p>{selectedInsight.fullContent || selectedInsight.desc}</p>

            {selectedInsight.takeaways && selectedInsight.takeaways.length > 0 && (
              <div style={{ background: 'var(--surface)', padding: 18, borderRadius: 10, margin: '20px 0', border: '1px solid var(--border)' }}>
                <strong style={{ display: 'block', marginBottom: 8, fontSize: 13, textTransform: 'uppercase', fontFamily: 'var(--f-mono)', color: 'var(--ink)' }}>
                  Key Executive Takeaways
                </strong>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, color: 'var(--text)', lineHeight: 1.7 }}>
                  {selectedInsight.takeaways.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="insight-dialog-footer">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setSelectedInsight(null)}
              >
                Close preview
              </button>
              <Link href={selectedInsight.slug} className="btn btn-primary" onClick={() => setSelectedInsight(null)}>
                Read full publication <ArrowRight width={14} height={14} style={{ flexShrink: 0 }} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
