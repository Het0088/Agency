'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, IconSearch, IconClose, IconLock, IconBookOpen } from '@/components/Icons'

type Publication = {
  id: string
  title: string
  category: 'White Papers' | 'Research Reports' | 'Search Playbooks' | 'Industry News'
  tag: string
  date: string
  readTime: string
  pages?: string
  summary: string
  keyTakeaway: string
  downloadUrl: string
  gradient: string
  featured?: boolean
}

const publications: Publication[] = [
  {
    id: 'state-of-ai-search-2026',
    title: 'The State of Generative Engine Optimization (GEO) & AI Search 2026',
    category: 'Research Reports',
    tag: 'GEO & LLM Research',
    date: 'August 2026',
    readTime: '28 min read',
    pages: '44 pages',
    summary: 'A forensic audit of 12,000 queries across ChatGPT Search, Perplexity Pro, Google AI Overviews, and Claude 3.5 Sonnet to map which brand citations LLMs surface and why.',
    keyTakeaway: '87% of LLM citations originate from third-party consensus sources (Wikidata, Crunchbase, tier-1 trade media) rather than brand-owned landing pages.',
    downloadUrl: '/downloads/the-2026-ai-search-visibility-report.pdf',
    gradient: 'linear-gradient(135deg, #ff5a1f 0%, #ff8c42 100%)',
    featured: true,
  },
  {
    id: 'core-web-vitals-inp-handbook',
    title: 'Interaction to Next Paint (INP) Architecture & Sub-Second Execution',
    category: 'White Papers',
    tag: 'Technical Engineering',
    date: 'July 2026',
    readTime: '18 min read',
    pages: '32 pages',
    summary: 'How leading enterprise brands eliminate main-thread blocking, optimize long tasks in Next.js/React applications, and maintain a 99th percentile INP under 120ms.',
    keyTakeaway: 'Yielding to the main thread using scheduler.yield() and optimizing React 19 hydration reduced bounce rates by 24% across 8 tested e-commerce clients.',
    downloadUrl: '/downloads/inp-technical-whitepaper-2026.pdf',
    gradient: 'linear-gradient(135deg, #0e1410 0%, #1f2d24 100%)',
  },
  {
    id: 'programmatic-seo-at-scale',
    title: 'Programmatic Local Architecture: Scaling 1,000+ Location Pages Without Thin Content Penalties',
    category: 'Search Playbooks',
    tag: 'Local & Scale',
    date: 'June 2026',
    readTime: '22 min read',
    pages: '38 pages',
    summary: 'The technical database schema, dynamic token generation rules, and localized entity schema required to rank #1 in multi-location service markets.',
    keyTakeaway: 'Unique first-party review aggregations and local geo-coordinate schema prevents 99.4% of Google unindexed duplicate page classifications.',
    downloadUrl: '/downloads/the-2026-ai-search-visibility-report.pdf',
    gradient: 'linear-gradient(135deg, #2b3a4a 0%, #486581 100%)',
  },
  {
    id: 'brand-entity-seo-blueprint',
    title: 'Entity-First SEO: Constructing The Wikipedia, Wikidata & Knowledge Graph Loop',
    category: 'White Papers',
    tag: 'Entity & Knowledge Graph',
    date: 'May 2026',
    readTime: '15 min read',
    pages: '26 pages',
    summary: 'A step-by-step implementation guide on establishing unambiguous brand entity authority so Google Search and AI models treat your brand as an undisputed primary authority.',
    keyTakeaway: 'Establishing matching sameAs schema across Wikidata, Crunchbase, and government registry databases accelerates Knowledge Panel generation by 3.4x.',
    downloadUrl: '/downloads/brand-entity-seo-blueprint.pdf',
    gradient: 'linear-gradient(135deg, #1b3b36 0%, #2f6f63 100%)',
  },
  {
    id: 'google-march-core-algorithm-teardown',
    title: 'Google Core Update Forensic Teardown: How AI-Generated Spam Was Filtered Out',
    category: 'Industry News',
    tag: 'Algorithm Analysis',
    date: 'April 2026',
    readTime: '12 min read',
    pages: '18 pages',
    summary: 'Data analysis of 450 domains hit by recent Google quality algorithms, detailing exact crawl budget cutoffs, programmatic de-indexation triggers, and recovery protocols.',
    keyTakeaway: 'Sites with unedited AI copy suffered an average 68% organic visibility collapse, while human-edited technical analyses experienced a +42% traffic lift.',
    downloadUrl: '/downloads/the-2026-ai-search-visibility-report.pdf',
    gradient: 'linear-gradient(135deg, #3d1c1a 0%, #632d29 100%)',
  },
  {
    id: 'ecommerce-faceted-navigation-handbook',
    title: 'The Complete E-Commerce Faceted Navigation & Crawl Budget Masterclass',
    category: 'Search Playbooks',
    tag: 'E-Commerce SEO',
    date: 'March 2026',
    readTime: '20 min read',
    pages: '36 pages',
    summary: 'How Shopify Plus and custom headless stores manage millions of filter combinations without creating spider traps, index bloat, or canonical dilution.',
    keyTakeaway: 'AJAX-driven multi-select attributes combined with selective canonicalization recovered over 2.4 million crawled-not-indexed URLs for our retail clients.',
    downloadUrl: '/downloads/the-2026-ai-search-visibility-report.pdf',
    gradient: 'linear-gradient(135deg, #4a284e 0%, #76427d 100%)',
  },
]

type Props = {
  content?: Record<string, string>
}

const categories = ['All', 'Research Reports', 'White Papers', 'Search Playbooks', 'Industry News'] as const

export default function PublicationsClient({ content = {} }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [search, setSearch] = useState<string>('')
  const [downloadToast, setDownloadToast] = useState<string | null>(null)

  const triggerDownload = (pub: Publication) => {
    setDownloadToast(`Downloading "${pub.title.slice(0, 42)}..." (PDF ✓)`)
    setTimeout(() => {
      setDownloadToast(null)
    }, 4500)
  }

  const filtered = publications.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch = search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.tag.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  const rawFeatured = publications.find(p => p.featured)
  const featured = rawFeatured ? {
    ...rawFeatured,
    title: content.featured_title || rawFeatured.title,
    summary: content.featured_summary || rawFeatured.summary,
    keyTakeaway: content.featured_takeaway || rawFeatured.keyTakeaway,
  } : null

  return (
    <div className="pub-page">
      {/* ── Hero ── */}
      <section className="pub-hero">
        <div className="wrap">
          <div className="pub-hero-inner">
            <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
              <ol style={{ display: 'inline-flex', alignItems: 'center', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: 'var(--ink-soft)' }}>
                <li><Link href="/" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Home</Link></li>
                <li>/</li>
                <li><Link href="/insights" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Resources</Link></li>
                <li>/</li>
                <li aria-current="page" style={{ color: 'var(--accent)', fontWeight: 600 }}>Publications &amp; Research</li>
              </ol>
            </nav>
            <span className="pub-badge">{content.hero_badge || 'Gen Ranq Research Lab'}</span>
            <h1 className="pub-title">
              {content.hero_title ? (
                content.hero_title
              ) : (
                <>
                  Publications, <em>Research</em> &amp; Search Playbooks
                </>
              )}
            </h1>
            <p className="pub-lede">
              {content.hero_lede ||
                'Original benchmark studies, technical white papers, and forensic teardowns written by senior SEO engineers. No fluff, pure empirical data.'}
            </p>


            <div className="pub-controls">
              <div className="pub-filter-chips">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`pub-chip${selectedCategory === cat ? ' active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="pub-search-box">
                <span className="pub-search-icon"><IconSearch /></span>
                <input
                  type="text"
                  placeholder="Search publications, topics, or keywords..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button type="button" onClick={() => setSearch('')} aria-label="Clear search">
                    <IconClose />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Publication Banner ── */}
      {selectedCategory === 'All' && !search && featured && (
        <section className="pub-featured-section">
          <div className="wrap">
            <div className="pub-featured-card">
              <div className="pub-featured-cover" style={{ background: featured.gradient }}>
                <span className="pub-featured-tag">{featured.tag}</span>
                <div className="pub-cover-meta">
                  <span>{featured.pages}</span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>
              </div>

              <div className="pub-featured-content">
                <div className="pub-meta-row">
                  <span className="pub-pill">{featured.category}</span>
                  <span className="pub-read-time">{featured.readTime}</span>
                </div>
                <h2>{featured.title}</h2>
                <p className="pub-desc">{featured.summary}</p>
                <div className="pub-takeaway">
                  <strong>Key Finding:</strong>
                  <span>{featured.keyTakeaway}</span>
                </div>

                <div className="pub-action-row">
                  <a
                    href={featured.downloadUrl || '/downloads/the-2026-ai-search-visibility-report.pdf'}
                    download="the-2026-ai-search-visibility-report.pdf"
                    className="btn btn-primary"
                    onClick={() => triggerDownload(featured)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    {content.featured_btn || 'Download Full PDF (Free)'} <span className="arr"><ArrowRight /></span>
                  </a>
                  <span className="pub-free-note">
                    <IconLock /> {content.featured_note || 'Instant PDF download • No credit card required'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Publications Grid ── */}
      <section className="section pub-grid-section">
        <div className="wrap">
          <div className="pub-grid-header">
            <h3>All Research &amp; White Papers</h3>
            <span className="pub-count">Showing {filtered.length} {filtered.length === 1 ? 'publication' : 'publications'}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="pub-empty">
              <div className="pub-empty-icon"><IconBookOpen /></div>
              <h4>No publications matched your search</h4>
              <p>Try searching for broader keywords like &quot;LLM&quot;, &quot;technical&quot;, or clear your filter.</p>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setSelectedCategory('All'); setSearch('') }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="pub-grid">
              {filtered.map(pub => (
                <article className="pub-card" key={pub.id}>
                  <div className="pub-card-cover" style={{ background: pub.gradient }}>
                    <span className="pub-card-tag">{pub.tag}</span>
                    <span className="pub-card-pages">{pub.pages}</span>
                  </div>

                  <div className="pub-card-body">
                    <div className="pub-meta-row">
                      <span className="pub-pill">{pub.category}</span>
                      <span className="pub-read-time">{pub.readTime}</span>
                    </div>

                    <h4>{pub.title}</h4>
                    <p>{pub.summary}</p>

                    <div className="pub-card-takeaway">
                      <strong>Takeaway:</strong> {pub.keyTakeaway}
                    </div>

                    <div className="pub-card-foot">
                      <span className="pub-card-date">{pub.date}</span>
                      <a
                        href={pub.downloadUrl || '/downloads/the-2026-ai-search-visibility-report.pdf'}
                        download={pub.downloadUrl ? pub.downloadUrl.split('/').pop() : 'whitepaper.pdf'}
                        className="pub-download-link"
                        onClick={() => triggerDownload(pub)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download PDF <span className="arr"><ArrowRight /></span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom Research Advisory CTA ── */}
      <section className="pub-cta-section">
        <div className="wrap">
          <div className="pub-cta-box">
            <div className="pub-cta-text">
              <span className="pub-badge">{content.cta_badge || 'Bespoke Research'}</span>
              <h3>{content.cta_title || 'Need a custom technical audit or competitor research teardown?'}</h3>
              <p>
                {content.cta_desc ||
                  'Our research and technical SEO team conducts private forensic audits and share-of-voice analyses for high-growth enterprises.'}
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              {content.cta_btn || 'Commission an Audit'} <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Download Feedback Toast */}
      {downloadToast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#111412',
            color: '#fff',
            padding: '14px 22px',
            borderRadius: 14,
            boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 99999,
            border: '1.5px solid var(--orange)',
            fontFamily: 'var(--f-body)',
            fontSize: 14,
          }}
        >
          <span style={{ color: '#1f9d55', fontSize: 18, fontWeight: 'bold' }}>✓</span>
          <span>{downloadToast}</span>
        </div>
      )}
    </div>
  )
}
