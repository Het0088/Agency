import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/contact')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import { getContent } from '@/lib/get-content'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ContactForm from './ContactForm'
import { ArrowRight } from '@/components/Icons'

export default async function ContactPage() {
  const content = await getContent('/contact')

  const faqs = [
    {
      q: content.faq_1_q || 'How fast will I hear back?',
      a: content.faq_1_a || "Within 4 business hours, Mon–Fri. The reply will come from the strategist who'd actually lead your account, not an SDR. We sometimes batch over weekends."
    },
    {
      q: content.faq_2_q || 'Do I need to provide a brief?',
      a: content.faq_2_a || "No. A few honest sentences in the form is plenty. Most useful info comes out of the discovery call, not a polished brief. We just need enough to know if we're the right fit before we book a call."
    },
    {
      q: content.faq_3_q || 'Is the audit really free?',
      a: content.faq_3_a || "Yes — for businesses that look like a plausible fit. It's a real audit, written by a senior strategist, and it's yours to keep whether you hire us or not. Worth doing even if you have an in-house team."
    },
    {
      q: content.faq_4_q || "What if I'm a tiny business / pre-revenue?",
      a: content.faq_4_a || "Tell us. If we can't help, we'll say so on the call and point you at someone who can — or just at the right DIY resources. We've sent dozens of businesses to better-fit partners. We won't take work we can't deliver on."
    },
    {
      q: content.faq_5_q || 'Can I just call?',
      a: content.faq_5_a || "Of course. Numbers above. If we don't pick up, we're on a client call — leave a message and we'll ring back same business day."
    }
  ]

  const heroHeading = content.hero_heading || "Let's talk."
  const heroSubtext = content.hero_subtext || "Fill the form, send an email, or pick up the phone — whichever feels easier. Either way, the strategist who'd lead your account replies. No SDRs, no sales reps, no funnels."
  const topbarText = content.topbar_text || 'Most replies within 4 business hours · Mon–Fri.'

  const directHeading = content.direct_heading || 'Or reach out directly.'
  const directSub = content.direct_sub || 'The fastest way to get a real answer is the form on the left. But these go to humans, too.'
  const directEmail = content.direct_email || 'hello@omniranq.com'
  const directPhone = content.direct_phone || '+91 80 4567 4242'

  const nextEyebrow = content.next_eyebrow || 'What happens next'
  const nextStep1 = content.next_step_1 || 'Within 4 hours — A senior strategist replies with 2-3 calendar slots.'
  const nextStep2 = content.next_step_2 || '30-min discovery call — We listen first, ask sharp questions second.'
  const nextStep3 = content.next_step_3 || 'Free audit (within 7 days) — A real, written audit. Useful even if you never hire us.'
  const nextStep4 = content.next_step_4 || 'Proposal call — If it\'s a fit, we walk through scope & price together.'

  const studioHeading = content.studio_heading || 'Our studio.'
  const studioSubtext = content.studio_subtext || "Based in India, working with businesses worldwide. Drop by or call — we'll buy the coffee."
  const studioCity = content.studio_city || 'Bangalore'
  const studioCountry = content.studio_country || 'India'
  const studioAddress = content.studio_address || '1st Floor, Indiqube Alpha\nOuter Ring Road, Bellandur\nBangalore 560103, India'
  const studioPh = content.studio_ph || '+91 80 4567 4242'
  const studioHours = content.studio_hours || 'Mon–Fri · 09:30–18:30 IST'

  const emailCtaHeading = content.email_cta_heading || 'Or just email us.'
  const emailCtaSubtext = content.email_cta_subtext || "If forms aren't your thing, hello@omniranq.com lands in the same inbox and gets the same reply. We don't mind."

  return (
    <>
      <Topbar text={topbarText} />
      <Nav />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Contact</div>
          <h1 dangerouslySetInnerHTML={{ __html: heroHeading.replace('talk.', '<em>talk.</em>') }} />
          <p>{heroSubtext}</p>
        </div>
      </header>

      <section className="section" id="form">
        <div className="wrap">
          <div className="contact-grid">
            <ContactForm />

            <div className="reveal">
              <div className="contact-info">
                <h3>{directHeading}</h3>
                <p>{directSub}</p>
                <div className="contact-row">
                  <span className="lab">Email</span>
                  <span className="val"><a href={`mailto:${directEmail}`}>{directEmail}</a></span>
                </div>
                <div className="contact-row">
                  <span className="lab">Phone (IN)</span>
                  <span className="val">{directPhone}</span>
                </div>
              </div>

              <div style={{ marginTop: 24, padding: 24, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>{nextEyebrow}</div>
                <ol style={{ paddingLeft: 18, margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                  <li>{nextStep1}</li>
                  <li>{nextStep2}</li>
                  <li>{nextStep3}</li>
                  <li>{nextStep4}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 dangerouslySetInnerHTML={{ __html: studioHeading.replace('studio.', '<em>studio.</em>') }} />
            <p className="sub">{studioSubtext}</p>
          </div>
          <div className="offices">
            <div className="office reveal">
              <div className="city">{studioCity}</div>
              <div className="country">{studioCountry}</div>
              <address>
                {studioAddress.split('\n').map((line, idx) => (
                  <span key={idx}>{line}<br /></span>
                ))}
              </address>
              <div className="ph">{studioPh}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{studioHours}</div>
            </div>
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
            <h2 dangerouslySetInnerHTML={{ __html: emailCtaHeading.replace('email us.', '<em>email us.</em>') }} />
            <p>{emailCtaSubtext}</p>
            <div className="ctas">
              <a href={`mailto:${directEmail}`} className="btn btn-primary">
                {directEmail}
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
