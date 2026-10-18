'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export interface SubService {
  label: string
  href: string
  locSlug?: string
  local?: boolean
}

export interface ServiceCategory {
  id: string
  label: string
  href: string
  locSlug: string
  items: SubService[]
}

export interface CityItem {
  name: string
  slug: string
}

export interface CityRegion {
  region: string
  cities: CityItem[]
}

export interface DropdownItem {
  label: string
  href: string
  desc?: string
}

export interface NavItem {
  id: string
  label: string
  href: string
  type?: 'mega' | 'dropdown' | 'locations'
  items?: DropdownItem[]
}

export const SERVICES: ServiceCategory[] = [
  {
    id: 'seo',
    label: 'SEO Services',
    href: '/services/seo',
    locSlug: 'seo-services',
    items: [
      { label: 'Technical SEO', href: '/services/seo/technical-seo', locSlug: 'technical-seo' },
      { label: 'Local SEO', href: '/services/seo/local-seo', locSlug: 'local-seo' },
      { label: 'E-commerce SEO', href: '/services/seo/ecommerce-seo', locSlug: 'ecommerce-seo' },
      { label: 'Enterprise SEO', href: '/services/seo/enterprise-seo', locSlug: 'enterprise-seo' },
      { label: 'SEO Audits', href: '/services/seo/seo-audits', locSlug: 'seo-audit' },
    ],
  },
  {
    id: 'ai-search',
    label: 'AI Search & GEO',
    href: '/services/ai-search',
    locSlug: 'ai-search-optimization',
    items: [
      { label: 'ChatGPT Optimization', href: '/services/ai-search/chatgpt', locSlug: 'chatgpt-optimization' },
      { label: 'Google AI Overviews', href: '/services/ai-search/google-aio', locSlug: 'google-ai-overviews-optimization' },
      { label: 'Gemini Optimization', href: '/services/ai-search/gemini', locSlug: 'gemini-optimization' },
      { label: 'Perplexity SEO', href: '/services/ai-search/perplexity', locSlug: 'perplexity-seo' },
    ],
  },
  {
    id: 'content',
    label: 'Content Marketing',
    href: '/services/content-marketing',
    locSlug: 'content-marketing',
    items: [
      { label: 'SEO Content Writing', href: '/services/content-marketing/seo-writing', locSlug: 'seo-content-writing' },
      { label: 'Blog Management', href: '/services/content-marketing/blog-management', locSlug: 'blog-management' },
      { label: 'Copywriting', href: '/services/content-marketing/copywriting', locSlug: 'copywriting-services' },
      { label: 'Email Marketing', href: '/services/content-marketing/email-marketing', locSlug: 'email-marketing' },
    ],
  },
  {
    id: 'ppc',
    label: 'PPC & Paid Ads',
    href: '/services/ppc',
    locSlug: 'ppc-management',
    items: [
      { label: 'Google Ads', href: '/services/ppc/google-ads', locSlug: 'google-ads-management' },
      { label: 'Meta Ads', href: '/services/ppc/meta-ads', locSlug: 'meta-ads-management' },
      { label: 'YouTube Ads', href: '/services/ppc/youtube-ads', locSlug: 'youtube-ads-management' },
      { label: 'Programmatic', href: '/services/ppc/programmatic', locSlug: 'programmatic-advertising' },
    ],
  },
  {
    id: 'social',
    label: 'Social Media',
    href: '/services/social-media',
    locSlug: 'social-media-marketing',
    items: [
      { label: 'Social Management', href: '/services/social-media/management', locSlug: 'social-media-management' },
      { label: 'Social Advertising', href: '/services/social-media/advertising', locSlug: 'social-media-advertising' },
      { label: 'Brand Management', href: '/services/social-media/brand', locSlug: 'brand-management' },
    ],
  },
  {
    id: 'web',
    label: 'Web Design & Dev',
    href: '/services/web-development',
    locSlug: 'web-development',
    items: [
      { label: 'Website Development', href: '/services/web-development', locSlug: 'website-development' },
      { label: 'Custom Web Design', href: '/services/web-design', locSlug: 'web-design' },
      { label: 'Shopify & E-commerce', href: '/services/web-development/shopify-ecommerce', locSlug: 'shopify-development' },
      { label: 'Hire Dedicated Developers', href: '/hire-resource', local: false },
    ],
  },
  {
    id: 'links',
    label: 'Link Building',
    href: '/services/link-building',
    locSlug: 'link-building',
    items: [
      { label: 'Digital PR', href: '/services/link-building/digital-pr', locSlug: 'digital-pr' },
      { label: 'Guest Posting', href: '/services/link-building/guest-posting', locSlug: 'guest-posting' },
      { label: 'Outreach Campaigns', href: '/services/link-building/outreach', locSlug: 'outreach-campaigns' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & CRO',
    href: '/services/analytics',
    locSlug: 'cro-services',
    items: [
      { label: 'CRO Audits', href: '/services/analytics/cro-audits', locSlug: 'cro-audit' },
      { label: 'A/B Testing', href: '/services/analytics/ab-testing', locSlug: 'ab-testing' },
      { label: 'Reporting Dashboards', href: '/services/analytics/dashboards', locSlug: 'marketing-dashboards' },
    ],
  },
]

export const CITY_REGIONS: CityRegion[] = [
  {
    region: 'United States',
    cities: [
      { name: 'Houston', slug: 'houston' },
      { name: 'New York', slug: 'new-york' },
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Dallas', slug: 'dallas' },
      { name: 'Austin', slug: 'austin' },
      { name: 'Miami', slug: 'miami' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'Seattle', slug: 'seattle' },
      { name: 'Atlanta', slug: 'atlanta' },
      { name: 'Phoenix', slug: 'phoenix' },
      { name: 'Boston', slug: 'boston' },
    ],
  },
  {
    region: 'India',
    cities: [
      { name: 'Mumbai', slug: 'mumbai' },
      { name: 'Delhi', slug: 'delhi' },
      { name: 'Ahmedabad', slug: 'ahmedabad' },
      { name: 'Vadodara', slug: 'vadodara' },
      { name: 'Surat', slug: 'surat' },
    ],
  },
  {
    region: 'International',
    cities: [
      { name: 'London', slug: 'london' },
      { name: 'Dubai', slug: 'dubai' },
      { name: 'Melbourne', slug: 'melbourne' },
    ],
  },
]

export const cityHref = (locSlug: string, citySlug: string) => `/${locSlug}-${citySlug}`

export const ABOUT: DropdownItem[] = [
  { label: 'About Us', href: '/about', desc: 'Our story, values and how we work' },
  { label: 'Our Team', href: '/our-team', desc: 'The strategists and engineers behind GENRANQ' },
  { label: 'Our Work', href: '/#work', desc: 'Case studies and client results' },
]

export const RESOURCES: DropdownItem[] = [
  { label: 'Blog', href: '/resources/blog', desc: 'Guides, deep-dives and SEO playbooks' },
  { label: 'News', href: '/resources/news', desc: 'Company milestones and announcements' },
  { label: 'White Papers', href: '/resources/white-papers', desc: 'In-depth industry playbooks and reports' },
  { label: 'Publications', href: '/resources/publications', desc: 'Original research and teardowns' },
  { label: 'Glossary', href: '/glossary', desc: 'Definitions for modern search, LLMs and GEO' },
]

export const NAV: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '/services', type: 'mega' },
  { id: 'about', label: 'About Us', href: '/about', type: 'dropdown', items: ABOUT },
  { id: 'resources', label: 'Resources', href: '/resources/blog', type: 'dropdown', items: RESOURCES },
  { id: 'locations', label: 'Locations', href: '/locations', type: 'locations' },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
]

const Chevron = () => (
  <svg className="gq-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Arrow = () => <span aria-hidden="true" className="gq-arrow">→</span>

const localItems = (cat: ServiceCategory) => [
  { label: `All ${cat.label}`, short: cat.label, locSlug: cat.locSlug },
  ...cat.items.filter((i) => i.local !== false).map((i) => ({ label: i.label, short: i.label, locSlug: i.locSlug || cat.locSlug })),
]

/* ── Services mega menu ── */
function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="gq-mega">
      <aside className="gq-mega-side">
        <p className="gq-eyebrow">Our services</p>
        <p className="gq-side-title">
          Grow your <em>brand</em> with data-driven strategy.
        </p>
        <div className="gq-stats">
          <div>
            <strong>412%</strong>
            <span>Avg. traffic growth</span>
          </div>
          <div>
            <strong>94%</strong>
            <span>Client retention</span>
          </div>
        </div>
        <Link href="/contact" className="gq-btn gq-btn-solid" onClick={onNavigate}>
          Get a free audit <Arrow />
        </Link>
      </aside>

      <div className="gq-mega-main">
        <div className="gq-mega-grid">
          {SERVICES.map((cat) => (
            <div className="gq-col" key={cat.id}>
              <Link href={cat.href} className="gq-col-head" onClick={onNavigate}>
                {cat.label}
              </Link>
              <ul>
                {cat.items.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} onClick={onNavigate}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gq-mega-foot">
          <span>Not sure where to start? A senior strategist will tell you, free.</span>
          <Link href="/services" onClick={onNavigate}>
            View all services <Arrow />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Locations: category → sub-service → city ── */
function LocationsBody({ catId, onNavigate, compact }: { catId: string; onNavigate: () => void; compact?: boolean }) {
  const cat = SERVICES.find((c) => c.id === catId) || SERVICES[0]
  const options = localItems(cat)
  const [sel, setSel] = useState(0)

  useEffect(() => {
    setSel(0)
  }, [catId])

  const cur = options[sel] || options[0]

  return (
    <div className="gq-loc-body">
      {!compact && (
        <div className="gq-loc-head">
          <p className="gq-col-head gq-static">{cat.label} by city</p>
          <Link href={`/locations#${cat.id}`} className="gq-textlink" onClick={onNavigate}>
            All {cat.label.toLowerCase()} locations <Arrow />
          </Link>
        </div>
      )}
      <div className="gq-chips" role="tablist" aria-label={`${cat.label} sub-services`}>
        {options.map((o, i) => (
          <button
            key={o.locSlug}
            type="button"
            role="tab"
            aria-selected={i === sel}
            className="gq-chip"
            onClick={() => setSel(i)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="gq-regions">
        {CITY_REGIONS.map((r) => (
          <div className="gq-region" key={r.region}>
            <p className="gq-region-name">{r.region}</p>
            <ul className={r.cities.length > 6 ? 'gq-two' : ''}>
              {r.cities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHref(cur.locSlug, c.slug)} onClick={onNavigate}>
                    {cur.short} in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function LocationsPanel({ onNavigate }: { onNavigate: () => void }) {
  const [catId, setCatId] = useState(SERVICES[0].id)
  return (
    <div className="gq-mega">
      <aside className="gq-mega-side gq-loc-side">
        <p className="gq-eyebrow">Locations</p>
        <ul className="gq-loc-tabs" role="tablist" aria-orientation="vertical" aria-label="Service category">
          {SERVICES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                role="tab"
                aria-selected={c.id === catId}
                onMouseEnter={() => setCatId(c.id)}
                onFocus={() => setCatId(c.id)}
                onClick={() => setCatId(c.id)}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        <Link href="/locations" className="gq-btn gq-btn-solid" onClick={onNavigate}>
          All locations <Arrow />
        </Link>
      </aside>
      <div className="gq-mega-main">
        <LocationsBody catId={catId} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

/* ── Simple dropdown (About / Resources) ── */
function DropdownPanel({ items, onNavigate }: { items: DropdownItem[]; onNavigate: () => void }) {
  return (
    <ul className="gq-drop">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} onClick={onNavigate}>
            <strong>{it.label}</strong>
            {it.desc && <span>{it.desc}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* ── Mobile drawer ── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sec, setSec] = useState<string | null>(null)
  const [sub, setSub] = useState<string | null>(null)
  const toggle = (id: string) => {
    setSec(sec === id ? null : id)
    setSub(null)
  }

  return (
    <div className={`gq-mobile ${open ? 'is-open' : ''}`} id="gq-mobile" hidden={!open}>
      <ul className="gq-m-list">
        {NAV.map((n) => {
          if (!n.type) {
            return (
              <li key={n.id}>
                <Link href={n.href} className="gq-m-row" onClick={onClose}>
                  {n.label}
                </Link>
              </li>
            )
          }
          const isOpen = sec === n.id
          return (
            <li key={n.id}>
              <button type="button" className="gq-m-row" aria-expanded={isOpen} onClick={() => toggle(n.id)}>
                {n.label} <span className="gq-m-sign" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="gq-m-sub">
                  {n.type === 'dropdown' &&
                    n.items?.map((it) => (
                      <Link key={it.href} href={it.href} className="gq-m-link" onClick={onClose}>
                        {it.label}
                      </Link>
                    ))}

                  {(n.type === 'mega' || n.type === 'locations') &&
                    SERVICES.map((cat) => {
                      const o = sub === cat.id
                      return (
                        <div key={cat.id} className="gq-m-group">
                          <button
                            type="button"
                            className="gq-m-row gq-m-row-sm"
                            aria-expanded={o}
                            onClick={() => setSub(o ? null : cat.id)}
                          >
                            {n.type === 'locations' ? `${cat.label} by city` : cat.label}
                            <span className="gq-m-sign" aria-hidden="true">{o ? '−' : '+'}</span>
                          </button>
                          {o && n.type === 'mega' && (
                            <div className="gq-m-sub gq-m-sub-2">
                              <Link href={cat.href} className="gq-m-link gq-m-strong" onClick={onClose}>
                                All {cat.label}
                              </Link>
                              {cat.items.map((it) => (
                                <Link key={it.label} href={it.href} className="gq-m-link" onClick={onClose}>
                                  {it.label}
                                </Link>
                              ))}
                            </div>
                          )}
                          {o && n.type === 'locations' && (
                            <div className="gq-m-sub gq-m-sub-2">
                              <LocationsBody catId={cat.id} onNavigate={onClose} compact />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  {n.type === 'locations' && (
                    <Link href="/locations" className="gq-m-link gq-m-strong" onClick={onClose}>
                      View all locations →
                    </Link>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <Link href="/contact" className="gq-btn gq-btn-solid gq-m-cta" onClick={onClose}>
        Get a free audit <Arrow />
      </Link>
    </div>
  )
}

/* ── Main Nav Component ── */
export default function Nav({ active }: { active?: string }) {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const close = () => {
    setOpen(null)
    setMobile(false)
  }

  const hoverOpen = (id: string) => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(id)
  }

  const hoverClose = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(null), 180)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [])

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  return (
    <header className="gq-header" ref={ref} onMouseLeave={hoverClose} role="banner">
      <div className="gq-bar">
        <Link href="/" className="gq-logo" onClick={close} aria-label="GENRANQ Home">
          {/* Logo preserved: exact existing client logo file and format */}
          <img src="/logo.png" alt="GENRANQ Software LLP" className="logo-img" />
        </Link>

        <nav className="gq-nav" aria-label="Main">
          <ul>
            {NAV.map((n) => {
              const isActive = active === n.id
              return (
                <li key={n.id} onMouseEnter={() => (n.type ? hoverOpen(n.id) : hoverClose())}>
                  {n.type ? (
                    <button
                      type="button"
                      className={`gq-top ${isActive ? 'gq-active' : ''}`}
                      aria-expanded={open === n.id}
                      aria-controls={`gq-panel-${n.id}`}
                      onClick={() => setOpen(open === n.id ? null : n.id)}
                    >
                      {n.label} <Chevron />
                    </button>
                  ) : (
                    <Link
                      href={n.href}
                      className={`gq-top ${isActive ? 'gq-active' : ''}`}
                      onClick={close}
                    >
                      {n.label}
                    </Link>
                  )}
                  {n.type === 'dropdown' && open === n.id && n.items && (
                    <div className="gq-drop-wrap" id={`gq-panel-${n.id}`} onMouseEnter={() => hoverOpen(n.id)}>
                      <DropdownPanel items={n.items} onNavigate={close} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="gq-actions">
          <Link href="/contact" className="gq-btn gq-btn-dark" onClick={close}>
            Get a free audit
          </Link>
          <button
            type="button"
            className="gq-burger"
            aria-expanded={mobile}
            aria-controls="gq-mobile"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            onClick={() => setMobile(!mobile)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {(open === 'services' || open === 'locations') && (
        <div className="gq-panel" id={`gq-panel-${open}`} onMouseEnter={() => hoverOpen(open)}>
          {open === 'services' ? <ServicesPanel onNavigate={close} /> : <LocationsPanel onNavigate={close} />}
        </div>
      )}

      <MobileMenu open={mobile} onClose={close} />
    </header>
  )
}
