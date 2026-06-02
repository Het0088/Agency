import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight } from '@/components/Icons'

export default function NotFound() {
  return (
    <>
      <Topbar text="Page not found. Let us help you find what you need." linkText="Go home →" linkHref="/" />
      <Nav />
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(80px, 12vw, 160px)', lineHeight: 1, color: 'var(--accent)', marginBottom: 16 }}>404</div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, marginBottom: 16 }}>Page not <em>found.</em></h1>
          <p style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto 32px' }}>The page you are looking for does not exist or has been moved. Let us point you in the right direction.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">Go home <span className="arr"><ArrowRight /></span></Link>
            <Link href="/services" className="btn btn-ghost">See our services</Link>
            <Link href="/contact" className="btn btn-ghost">Contact us</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
