'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { ArrowRight } from './Icons'

const serviceLinks = [
  { num: '01', label: 'SEO Foundations', desc: 'On-page, technical, and content fundamentals', href: '/services' },
  { num: '02', label: 'Local & Maps', desc: 'Win the 3-pack and near-me queries', href: '/services' },
  { num: '03', label: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, schema', href: '/services' },
  { num: '04', label: 'Editorial & Content', desc: 'Long-form content by industry experts', href: '/services' },
  { num: '05', label: 'Digital PR & Links', desc: 'Editorial backlinks from real publications', href: '/services' },
  { num: '06', label: 'AI Search & GEO', desc: 'Get cited in ChatGPT, Perplexity, AIO', href: '/services' },
]

export default function Nav({ active }: { active?: string }) {
  const [megaOpen, setMegaOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function enter() {
    if (timeout.current) clearTimeout(timeout.current)
    setMegaOpen(true)
  }

  function leave() {
    timeout.current = setTimeout(() => setMegaOpen(false), 200)
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">W</span>
          <span className="logo-text">
            <span>We Strive Design</span>
            <small>SEO Studio · Est. 2014</small>
          </span>
        </Link>
        <ul className="nav-links">
          <li
            className="nav-has-mega"
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            <Link href="/services" className={active === 'services' ? 'active has-caret' : 'has-caret'}>
              Services <span className="caret">▾</span>
            </Link>
            {megaOpen && (
              <div className="mega-menu" onMouseEnter={enter} onMouseLeave={leave}>
                <div className="mega-grid">
                  {serviceLinks.map(s => (
                    <Link key={s.num} href={s.href} className="mega-item">
                      <span className="mega-num">{s.num}</span>
                      <div>
                        <div className="mega-label">{s.label}</div>
                        <div className="mega-desc">{s.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mega-footer">
                  <Link href="/contact" className="btn btn-primary btn-sm">
                    Get a free audit <span className="arr"><ArrowRight /></span>
                  </Link>
                </div>
              </div>
            )}
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
      </div>
    </nav>
  )
}
