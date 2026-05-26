import Link from 'next/link'
import { LinkedInIcon, XIcon, InstagramIcon, YouTubeIcon } from './Icons'

const cityLinks = [
  { label: 'SEO Services Mumbai', href: '/seo-services-mumbai' },
  { label: 'SEO Services Delhi', href: '/seo-services-delhi' },
  { label: 'SEO Services Ahmedabad', href: '/seo-services-ahmedabad' },
  { label: 'SEO Services Vadodara', href: '/seo-services-vadodara' },
  { label: 'SEO Services Surat', href: '/seo-services-surat' },
  { label: 'SEO Services Bangalore', href: '/seo-services-bangalore' },
  { label: 'SEO Services Pune', href: '/seo-services-pune' },
  { label: 'SEO Services Hyderabad', href: '/seo-services-hyderabad' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <img src="/logo.png" alt="" className="logo-icon" />
              <span className="logo-wordmark">
                <span className="logo-name">
                  <span className="logo-omni">OMNI</span><span className="logo-space"> </span><span className="logo-ranq">RANQ</span>
                </span>
                <span className="logo-rule"></span>
                <span className="logo-tagline">SEO <span className="logo-dot">&bull;</span> GROWTH <span className="logo-dot">&bull;</span> PERFORMANCE</span>
              </span>
            </Link>
            <p>A 38-person SEO studio for ambitious small businesses. Global team, monthly retainers, no long contracts, no agency BS.</p>
            <Link href="/contact" className="btn btn-dark btn-sm">Get a free audit</Link>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/seo">SEO Services</Link></li>
              <li><Link href="/services/ai-search">AI Search &amp; GEO</Link></li>
              <li><Link href="/services/content-marketing">Content Marketing</Link></li>
              <li><Link href="/services/ppc">PPC &amp; Paid Ads</Link></li>
              <li><Link href="/services/social-media">Social Media</Link></li>
              <li><Link href="/services/web-design">Web Design</Link></li>
              <li><Link href="/services/link-building">Link Building</Link></li>
              <li><Link href="/services/analytics">Analytics &amp; CRO</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#work">Case studies</Link></li>
              <li><Link href="/insights">Insights &amp; blog</Link></li>
              <li><Link href="/about#careers">Careers (3 open)</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Offices</h4>
            <ul>
              <li><Link href="/contact">Melbourne</Link></li>
              <li><Link href="/contact">London</Link></li>
              <li><Link href="/contact">Bangalore</Link></li>
              <li><a href="mailto:hello@omniranq.com">hello@omniranq.com</a></li>
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
          <div>&copy; 2026 Omniranq &middot; All rights reserved</div>
          <div className="socials">
            <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="#" aria-label="Twitter"><XIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
