import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ContactForm from './ContactForm'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = { title: 'Contact — Omniranq' }

const faqs = [
  { q: 'How fast will I hear back?', a: "Within 4 business hours, Mon–Fri. The reply will come from the strategist who'd actually lead your account, not an SDR. We sometimes batch over weekends." },
  { q: 'Do I need to provide a brief?', a: "No. A few honest sentences in the form is plenty. Most useful info comes out of the discovery call, not a polished brief. We just need enough to know if we're the right fit before we book a call." },
  { q: 'Is the audit really free?', a: "Yes — for businesses that look like a plausible fit. It's a real audit, written by a senior strategist, and it's yours to keep whether you hire us or not. Worth doing even if you have an in-house team." },
  { q: 'What if I\'m a tiny business / pre-revenue?', a: "Tell us. If we can't help, we'll say so on the call and point you at someone who can — or just at the right DIY resources. We've sent dozens of businesses to better-fit partners. We won't take work we can't deliver on." },
  { q: 'Can I just call?', a: "Of course. Numbers above. If we don't pick up, we're on a client call — leave a message and we'll ring back same business day." },
]

const offices = [
  { city: 'Melbourne', country: 'Australia · HQ', address: 'Level 4, 22 Brunswick St\nFitzroy VIC 3065\nAustralia', ph: '+61 3 9000 4242', hours: 'Mon–Fri · 09:00–18:00 AEDT' },
  { city: 'London', country: 'United Kingdom', address: '17 Curtain Road\nShoreditch, EC2A 3LT\nUnited Kingdom', ph: '+44 20 4525 4242', hours: 'Mon–Fri · 09:00–18:00 GMT' },
  { city: 'Bangalore', country: 'India', address: '1st Floor, Indiqube Alpha\nOuter Ring Road, Bellandur\nBangalore 560103, India', ph: '+91 80 4567 4242', hours: 'Mon–Fri · 09:30–18:30 IST' },
]

export default function ContactPage() {
  return (
    <>
      <Topbar text="Most replies within 4 business hours · Mon–Fri." />
      <Nav />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Contact</div>
          <h1>Let&apos;s <em>talk.</em></h1>
          <p>Fill the form, send an email, or pick up the phone — whichever feels easier. Either way, the strategist who&apos;d lead your account replies. No SDRs, no sales reps, no funnels.</p>
        </div>
      </header>

      <section className="section" id="form">
        <div className="wrap">
          <div className="contact-grid">
            <ContactForm />

            <div className="reveal">
              <div className="contact-info">
                <h3>Or reach out directly.</h3>
                <p>The fastest way to get a real answer is the form on the left. But these all go to humans, too.</p>
                {[
                  { lab: 'Email', val: <a href="mailto:hello@omniranq.com">hello@omniranq.com</a> },
                  { lab: 'Press', val: <a href="mailto:press@omniranq.com">press@omniranq.com</a> },
                  { lab: 'Careers', val: <a href="mailto:join@omniranq.com">join@omniranq.com</a> },
                  { lab: 'Phone (AU)', val: '+61 3 9000 4242' },
                  { lab: 'Phone (UK)', val: '+44 20 4525 4242' },
                  { lab: 'Phone (IN)', val: '+91 80 4567 4242' },
                ].map((r) => (
                  <div className="contact-row" key={r.lab}>
                    <span className="lab">{r.lab}</span>
                    <span className="val">{r.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 24, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>What happens next</div>
                <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                  <li><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Within 4 hours</strong> — A senior strategist replies with 2-3 calendar slots.</li>
                  <li><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>30-min discovery call</strong> — We listen first, ask sharp questions second.</li>
                  <li><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Free audit (within 7 days)</strong> — A real, written audit. Useful even if you never hire us.</li>
                  <li><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Proposal call</strong> — If it&apos;s a fit, we walk through scope &amp; price together.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Three studios, <em>one team.</em></h2>
            <p className="sub">We follow the sun across Australia, the UK, and India — so work ships continuously. Visit any of them; we&apos;ll buy the coffee.</p>
          </div>
          <div className="offices">
            {offices.map((o) => (
              <div className="office reveal" key={o.city}>
                <div className="city">{o.city}</div>
                <div className="country">{o.country}</div>
                <address>{o.address.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</address>
                <div className="ph">{o.ph}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{o.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <h2>Quick <em>answers.</em></h2>
            <p className="sub">The questions we get most via the contact form. If yours isn&apos;t here, just ask.</p>
          </div>
          <div className="faq-list reveal">
            {faqs.map((f, i) => (
              <details className="faq" key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="big-cta reveal">
            <h2>Or just <em>email us.</em></h2>
            <p>If forms aren&apos;t your thing, hello@omniranq.com lands in the same inbox and gets the same reply. We don&apos;t mind.</p>
            <div className="ctas">
              <a href="mailto:hello@omniranq.com" className="btn btn-primary">
                hello@omniranq.com
                <span className="arr"><ArrowRight /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
