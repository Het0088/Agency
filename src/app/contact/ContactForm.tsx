'use client'

import { useState } from 'react'
import { ArrowRight } from '@/components/Icons'

const budgetOptions = ['Under $4k', '$4k–$8k', '$8k–$15k', '$15k+', 'Not sure']

export default function ContactForm() {
  const [budget, setBudget] = useState('$4k–$8k')
  const [sent, setSent] = useState(false)

  return (
    <form className="form reveal" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <span className="eyebrow">Project enquiry</span>
      <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1, margin: '14px 0 28px', letterSpacing: '-0.02em' }}>
        Tell us a bit about <em className="serif-i" style={{ color: 'var(--accent)' }}>your business.</em>
      </h2>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Full name</label>
          <input id="f-name" type="text" placeholder="Anaya Sharma" required />
        </div>
        <div className="field">
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" type="email" placeholder="anaya@yourcompany.com" required />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-co">Company</label>
          <input id="f-co" type="text" placeholder="Your company" />
        </div>
        <div className="field">
          <label htmlFor="f-site">Website</label>
          <input id="f-site" type="url" placeholder="https://yoursite.com" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-svc">What do you need help with?</label>
        <select id="f-svc">
          <option>Full SEO retainer</option>
          <option>Free SEO audit (no obligation)</option>
          <option>Technical SEO project</option>
          <option>Local / Maps SEO</option>
          <option>AI Search &amp; GEO</option>
          <option>Editorial content</option>
          <option>Digital PR &amp; links</option>
          <option>Not sure yet — let&apos;s talk</option>
        </select>
      </div>

      <div className="field">
        <label>Monthly budget</label>
        <div className="budget-chips">
          {budgetOptions.map((b) => (
            <button type="button" key={b} className={`chip${budget === b ? ' active' : ''}`} onClick={() => setBudget(b)}>{b}</button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-msg">What&apos;s going on?</label>
        <textarea id="f-msg" placeholder="A few sentences about where you're stuck, what you've tried, what success looks like…" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', maxWidth: 380, lineHeight: 1.5 }}>
          By submitting, you agree to our privacy policy. We won&apos;t share your data, ever — not even with our own marketing tools.
        </div>
        <button type="submit" className="btn btn-primary">
          {sent ? 'Sent ✓' : 'Send enquiry'}
          <span className="arr"><ArrowRight /></span>
        </button>
      </div>
    </form>
  )
}
