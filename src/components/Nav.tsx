'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowRight } from './Icons'

const serviceCategories = [
  {
    title: 'SEO Services',
    href: '/services',
    items: [
      { label: 'Technical SEO', href: '/services' },
      { label: 'Local SEO', href: '/services' },
      { label: 'E-commerce SEO', href: '/services' },
      { label: 'Enterprise SEO', href: '/services' },
      { label: 'SEO Audits', href: '/services' },
    ],
  },
  {
    title: 'AI Search & GEO',
    href: '/services',
    items: [
      { label: 'ChatGPT Optimization', href: '/services' },
      { label: 'Google AI Overviews', href: '/services' },
      { label: 'Gemini Optimization', href: '/services' },
      { label: 'Perplexity SEO', href: '/services' },
    ],
  },
  {
    title: 'Content Marketing',
    href: '/services',
    items: [
      { label: 'SEO Content Writing', href: '/services' },
      { label: 'Blog Management', href: '/services' },
      { label: 'Copywriting', href: '/services' },
      { label: 'Email Marketing', href: '/services' },
    ],
  },
  {
    title: 'PPC & Paid Ads',
    href: '/services',
    items: [
      { label: 'Google Ads', href: '/services' },
      { label: 'Meta Ads', href: '/services' },
      { label: 'YouTube Ads', href: '/services' },
      { label: 'Programmatic', href: '/services' },
    ],
  },
  {
    title: 'Social Media',
    href: '/services',
    items: [
      { label: 'Social Management', href: '/services' },
      { label: 'Social Advertising', href: '/services' },
      { label: 'Brand Management', href: '/services' },
    ],
  },
  {
    title: 'Web Design',
    href: '/services',
    items: [
      { label: 'Custom Web Design', href: '/services' },
      { label: 'WordPress Design', href: '/services' },
      { label: 'E-commerce Design', href: '/services' },
      { label: 'Website Redesign', href: '/services' },
    ],
  },
  {
    title: 'Link Building',
    href: '/services',
    items: [
      { label: 'Digital PR', href: '/services' },
      { label: 'Guest Posting', href: '/services' },
      { label: 'Outreach Campaigns', href: '/services' },
    ],
  },
  {
    title: 'Analytics & CRO',
    href: '/services',
    items: [
      { label: 'CRO Audits', href: '/services' },
      { label: 'A/B Testing', href: '/services' },
      { label: 'Reporting Dashboards', href: '/services' },
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
