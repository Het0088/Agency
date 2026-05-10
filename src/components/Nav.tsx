'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowRight } from './Icons'

const serviceCategories = [
  {
    title: 'SEO Services',
    href: '/services/seo',
    items: [
      { label: 'Technical SEO', href: '/services/seo#technical-seo' },
      { label: 'Local SEO', href: '/services/seo#local-seo' },
      { label: 'E-commerce SEO', href: '/services/seo#ecommerce-seo' },
      { label: 'Enterprise SEO', href: '/services/seo#enterprise-seo' },
      { label: 'SEO Audits', href: '/services/seo#seo-audits' },
    ],
  },
  {
    title: 'AI Search & GEO',
    href: '/services/ai-search',
    items: [
      { label: 'ChatGPT Optimization', href: '/services/ai-search#chatgpt' },
      { label: 'Google AI Overviews', href: '/services/ai-search#google-aio' },
      { label: 'Gemini Optimization', href: '/services/ai-search#gemini' },
      { label: 'Perplexity SEO', href: '/services/ai-search#perplexity' },
    ],
  },
  {
    title: 'Content Marketing',
    href: '/services/content-marketing',
    items: [
      { label: 'SEO Content Writing', href: '/services/content-marketing#seo-writing' },
      { label: 'Blog Management', href: '/services/content-marketing#blog-management' },
      { label: 'Copywriting', href: '/services/content-marketing#copywriting' },
      { label: 'Email Marketing', href: '/services/content-marketing#email-marketing' },
    ],
  },
  {
    title: 'PPC & Paid Ads',
    href: '/services/ppc',
    items: [
      { label: 'Google Ads', href: '/services/ppc#google-ads' },
      { label: 'Meta Ads', href: '/services/ppc#meta-ads' },
      { label: 'YouTube Ads', href: '/services/ppc#youtube-ads' },
      { label: 'Programmatic', href: '/services/ppc#programmatic' },
    ],
  },
  {
    title: 'Social Media',
    href: '/services/social-media',
    items: [
      { label: 'Social Management', href: '/services/social-media#management' },
      { label: 'Social Advertising', href: '/services/social-media#advertising' },
      { label: 'Brand Management', href: '/services/social-media#brand' },
    ],
  },
  {
    title: 'Web Design',
    href: '/services/web-design',
    items: [
      { label: 'Custom Web Design', href: '/services/web-design#custom' },
      { label: 'WordPress Design', href: '/services/web-design#wordpress' },
      { label: 'E-commerce Design', href: '/services/web-design#ecommerce' },
      { label: 'Website Redesign', href: '/services/web-design#redesign' },
    ],
  },
  {
    title: 'Link Building',
    href: '/services/link-building',
    items: [
      { label: 'Digital PR', href: '/services/link-building#digital-pr' },
      { label: 'Guest Posting', href: '/services/link-building#guest-posting' },
      { label: 'Outreach Campaigns', href: '/services/link-building#outreach' },
    ],
  },
  {
    title: 'Analytics & CRO',
    href: '/services/analytics',
    items: [
      { label: 'CRO Audits', href: '/services/analytics#cro-audits' },
      { label: 'A/B Testing', href: '/services/analytics#ab-testing' },
      { label: 'Reporting Dashboards', href: '/services/analytics#dashboards' },
    ],
  },
]

const mobileNavLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/#work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav({ active }: { active?: string }) {
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current)
    setMegaOpen(true)
  }, [])

  const leave = useCallback(() => {
    timeout.current = setTimeout(() => setMegaOpen(false), 250)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">W</span>
          <span className="logo-text">
            <span>We Strive Design</span>
            <small>SEO Studio &middot; Est. 2014</small>
          </span>
        </Link>

        <ul className="nav-links">
          <li
            className="nav-has-mega"
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            <Link
              href="/services"
              className={active === 'services' ? 'active has-caret' : 'has-caret'}
            >
              Services <span className="caret">&#x25BE;</span>
            </Link>
            <div
              className={`mega-menu${megaOpen ? ' open' : ''}`}
              onMouseEnter={enter}
              onMouseLeave={leave}
            >
              <div className="mega-sidebar">
                <div className="mega-sidebar-head">
                  <span className="mega-sidebar-tag">Our Services</span>
                  <h3>Grow your <em>brand</em> with data-driven strategy.</h3>
                </div>
                <div className="mega-sidebar-stats">
                  <div className="mega-stat">
                    <span className="mega-stat-num">412%</span>
                    <span className="mega-stat-label">Avg. traffic growth</span>
                  </div>
                  <div className="mega-stat">
                    <span className="mega-stat-num">94%</span>
                    <span className="mega-stat-label">Client retention</span>
                  </div>
                </div>
                <Link href="/contact" className="btn btn-primary btn-sm mega-sidebar-cta">
                  Get a free audit <span className="arr"><ArrowRight /></span>
                </Link>
              </div>
              <div className="mega-categories">
                {serviceCategories.map((cat) => (
                  <div className="mega-cat" key={cat.title}>
                    <Link href={cat.href} className="mega-cat-title">{cat.title}</Link>
                    <ul className="mega-cat-list">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li><Link href="/about" className={active === 'about' ? 'active' : ''}>About</Link></li>
          <li><Link href="/#work">Work</Link></li>
          <li><Link href="/insights" className={active === 'insights' ? 'active' : ''}>Insights</Link></li>
        </ul>

        <div className="nav-cta">
          <Link href="/contact" className="btn btn-dark btn-sm">
            Get a free audit
            <span className="arr"><ArrowRight /></span>
          </Link>
        </div>

        <button
          className={`hamburger${mobileOpen ? ' active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-inner">
          {mobileNavLinks.map((link) =>
            link.label === 'Services' ? (
              <div className="mobile-accordion" key={link.label}>
                <button
                  className={`mobile-accordion-trigger${mobileServicesOpen ? ' open' : ''}`}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <span className="mobile-accordion-icon">{mobileServicesOpen ? '\u2212' : '+'}</span>
                </button>
                {mobileServicesOpen && (
                  <div className="mobile-accordion-body">
                    {serviceCategories.map((cat) => (
                      <div className="mobile-cat" key={cat.title}>
                        <Link
                          href={cat.href}
                          className="mobile-cat-title"
                          onClick={() => setMobileOpen(false)}
                        >
                          {cat.title}
                        </Link>
                        {cat.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="mobile-cat-item"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="btn btn-primary mobile-nav-cta"
            onClick={() => setMobileOpen(false)}
          >
            Get a free audit <span className="arr"><ArrowRight /></span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
