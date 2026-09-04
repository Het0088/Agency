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
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="Gen Ranq Home">
              <img src="/logo.png" alt="Gen Ranq Software LLP" className="logo-img" />
            </Link>
            <p>A 38-person SEO studio for ambitious small businesses. Global team, monthly retainers, no long contracts, no agency BS.</p>
            <Link href="/contact" className="btn btn-dark btn-sm">Get a free audit</Link>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services/seo">SEO Services</Link></li>
              <li><Link href="/services/seo/technical-seo">Technical SEO</Link></li>
              <li><Link href="/services/ai-search">AI Search &amp; GEO</Link></li>
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
              <li><Link href="/about">About</Link></li>
              <li><Link href="/our-team">Our Team</Link></li>
              <li><Link href="/resources/publications">Publications &amp; Research</Link></li>
              <li><Link href="/resources/blog">Blog &amp; Insights</Link></li>
              <li><Link href="/#work">Case Studies</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Office</h4>
            <ul>
              <li><Link href="/contact">Bangalore, India</Link></li>
              <li><a href="mailto:hello@genranq.com">hello@genranq.com</a></li>
              <li><a href="tel:+918045674242">+91 80 4567 4242</a></li>
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
          <div>&copy; 2026 Gen Ranq Software LLP &middot; All rights reserved</div>
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
