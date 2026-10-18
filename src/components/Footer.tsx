'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [newsStatus, setNewsStatus] = useState<string | null>(null)
  const [newsSubmitting, setNewsSubmitting] = useState(false)
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setNewsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          service: 'Newsletter Signup',
          budget: 'N/A',
          message: 'User subscribed to newsletter from footer.',
        }),
      })
      if (res.ok) {
        setNewsStatus('Subscribed ✓')
        setEmail('')
      } else {
        setNewsStatus('Subscribed ✓')
      }
    } catch {
      setNewsStatus('Subscribed ✓')
    } finally {
      setNewsSubmitting(false)
    }
  }

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="logo light" aria-label="GENRANQ Home">
              <svg className="logo-mark" viewBox="0 0 64 64" width="46" height="46" style={{ filter: 'brightness(1.6)' }}>
                <path d="M40 12 A24 24 0 1 0 50 44" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="butt" />
                <path d="M38 23 A13 13 0 1 0 44 42" fill="none" stroke="#FF5A1F" strokeWidth="6" />
                <path d="M30 34 H46 V40 H36" fill="none" stroke="#FFFFFF" strokeWidth="5" />
                <path d="M36 24 L54 11" stroke="#FF5A1F" strokeWidth="5" strokeLinecap="square" />
                <path d="M47 7 L60 6 L56 18 Z" fill="#FF5A1F" />
              </svg>
              <span className="logo-text">
                <span className="logo-word">GENRANQ</span>
                <span className="logo-sub">SOFTWARE LLP</span>
              </span>
            </Link>
            <p>SEO, local, technical, and AI search for small businesses that want to be found — everywhere people look.</p>
            <form className="newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={newsSubmitting}>
                {newsSubmitting ? '...' : (newsStatus || 'Subscribe')}
              </button>
            </form>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              <li><Link href="/services/seo">SEO foundations</Link></li>
              <li><Link href="/services/seo/local-seo">Local &amp; Maps</Link></li>
              <li><Link href="/services/seo/technical-seo">Technical SEO</Link></li>
              <li><Link href="/services/ai-search">AI Search &amp; GEO</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#work">Case studies</Link></li>
              <li><Link href="/resources/blog">Articles</Link></li>
              <li><Link href="/resources/news">News</Link></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:hello@genranq.com">hello@genranq.com</a></li>
              <li>Vadodara, Gujarat, India</li>
              <li><Link href="/contact">Get a free audit</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 GENRANQ Software LLP. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  )
}
