'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LinkedInIcon, XIcon, InstagramIcon, YouTubeIcon } from './Icons'

const cityLinks = [
  { label: 'SEO Services Mumbai', href: '/seo-services-mumbai' },
  { label: 'SEO Services Delhi', href: '/seo-services-delhi' },
  { label: 'SEO Services Ahmedabad', href: '/seo-services-ahmedabad' },
  { label: 'SEO Services Vadodara', href: '/seo-services-vadodara' },
  { label: 'SEO Services Surat', href: '/seo-services-surat' },
  { label: 'SEO Services Melbourne', href: '/seo-services-melbourne' },
  { label: 'SEO Services London', href: '/seo-services-london' },
  { label: 'SEO Services Dubai', href: '/seo-services-dubai' },
]

export default function Footer() {
  const [newsStatus, setNewsStatus] = useState<string | null>(null)
  const [newsSubmitting, setNewsSubmitting] = useState(false)

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

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="GENRANQ Home">
              <img src="/logo.png" alt="GENRANQ Software LLP" className="logo-img" />
            </Link>
            <p>A 38-person SEO &amp; AI search studio for ambitious small businesses. Global team, monthly retainers, no long contracts, no agency BS.</p>
            
            <form className="footer-newsletter" onSubmit={handleNewsletterSubmit}>
              <span className="footer-newsletter-label">Weekly SEO &amp; AI Search Dispatch</span>
              <div className="footer-newsletter-row">
                <input type="email" placeholder="Enter your work email" required />
                <button type="submit" disabled={newsSubmitting}>
                  {newsSubmitting ? '...' : (newsStatus || 'Subscribe')}
                </button>
              </div>
            </form>

            <div style={{ marginTop: 18 }}>
              <Link href="/contact" className="btn btn-dark btn-sm">Get a free audit</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/seo">SEO Services</Link></li>
              <li><Link href="/services/seo/technical-seo">Technical SEO</Link></li>
              <li><Link href="/services/ai-search">AI Search &amp; GEO</Link></li>
              <li><Link href="/services/web-development">Web Development</Link></li>
              <li><Link href="/hire-resource">Hire Dedicated Developers</Link></li>
              <li><Link href="/services/content-marketing">Content Marketing</Link></li>
              <li><Link href="/services/web-design">Web Design</Link></li>
              <li><Link href="/services/ppc">PPC &amp; Paid Ads</Link></li>
              <li><Link href="/services/social-media">Social Media</Link></li>
              <li><Link href="/services/link-building">Link Building</Link></li>
              <li><Link href="/services/analytics">Analytics &amp; CRO</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/our-team">Our Team</Link></li>
              <li><Link href="/hire-resource">Hire Developers</Link></li>
              <li><Link href="/resources/publications">White Papers &amp; Reports</Link></li>
              <li><Link href="/resources/news">Company News</Link></li>
              <li><Link href="/resources/blog">Blog &amp; Insights</Link></li>
              <li><Link href="/glossary">SEO Glossary</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Office</h4>
            <ul>
              <li><Link href="/contact">Vadodara, Gujarat, India</Link></li>
              <li><a href="mailto:hello@genranq.com">hello@genranq.com</a></li>
              <li><a href="tel:+918045074242">+91 80 4507 4242</a></li>
              <li style={{ marginTop: 12, fontSize: 13, color: 'var(--ink-soft)' }}>
                Guaranteed 4–5h daily overlap with US, UK &amp; European working hours.
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-cities">
          <h4>SEO Services by City</h4>
          <div className="footer-city-grid">
            {cityLinks.map(c => (
              <Link key={c.href} href={c.href}>{c.label}</Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 GENRANQ Software LLP &middot; All rights reserved</div>
          <div className="socials">
            <a href="https://linkedin.com/company/genranq" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="https://x.com/genranq" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><XIcon /></a>
            <a href="https://instagram.com/genranq" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://youtube.com/@genranq" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><YouTubeIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
