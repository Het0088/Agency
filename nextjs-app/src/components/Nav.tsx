import Link from 'next/link'
import { ArrowRight } from './Icons'

export default function Nav({ active }: { active?: string }) {
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
          <li><Link href="/services" className={active === 'services' ? 'active' : ''}>Services</Link></li>
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
