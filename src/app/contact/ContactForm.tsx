'use client'

import { useState, useRef } from 'react'
import { ArrowRight } from '@/components/Icons'

const budgetOptions = ['Under $4k', '$4k–$8k', '$8k–$15k', '$15k+', 'Not sure']

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [budget, setBudget] = useState('$4k–$8k')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setErrorMsg('')

    const fd = new FormData(formRef.current!)
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company'),
      website: fd.get('website'),
      service: fd.get('service'),
      budget,
      message: fd.get('message'),
      website_url_confirm_hp: fd.get('website_url_confirm_hp'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong.')
      }

      setState('sent')
      formRef.current?.reset()
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Network error. Please try again.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="form reveal in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, textAlign: 'center', gap: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', display: 'grid', placeItems: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 className="serif" style={{ fontSize: 'clamp(28px,3.5vw,42px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          We&apos;ll be in touch <em className="serif-i" style={{ color: 'var(--accent)' }}>soon.</em>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', maxWidth: 400, lineHeight: 1.55 }}>
          A senior strategist will reply within 4 business hours with calendar slots for your discovery call.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setState('idle')}>Send another</button>
      </div>
    )
  }

  return (
    <form className="form reveal in" ref={formRef} onSubmit={handleSubmit}>
      <span className="eyebrow">Project enquiry</span>
      <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1, margin: '14px 0 28px', letterSpacing: '-0.02em' }}>
        Tell us a bit about <em className="serif-i" style={{ color: 'var(--accent)' }}>your business.</em>
      </h2>

      <div style={{ position: 'absolute', left: -9999, opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input type="text" name="website_url_confirm_hp" tabIndex={-1} autoComplete="new-password" data-1p-ignore data-lpignore="true" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Full name</label>
          <input id="f-name" name="name" type="text" placeholder="Anaya Sharma" required />
        </div>
        <div className="field">
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" name="email" type="email" placeholder="anaya@yourcompany.com" required />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-co">Company</label>
          <input id="f-co" name="company" type="text" placeholder="Your company" />
        </div>
        <div className="field">
          <label htmlFor="f-site">Website</label>
          <input id="f-site" name="website" type="url" placeholder="https://yoursite.com" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-svc">What do you need help with?</label>
        <select id="f-svc" name="service">
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
        <textarea id="f-msg" name="message" placeholder="A few sentences about where you're stuck, what you've tried, what success looks like…" />
      </div>

      {errorMsg && (
        <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, color: '#b91c1c', fontSize: 14 }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', maxWidth: 380, lineHeight: 1.5 }}>
          By submitting, you agree to our privacy policy. We won&apos;t share your data, ever — not even with our own marketing tools.
        </div>
        <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send enquiry'}
          <span className="arr"><ArrowRight /></span>
        </button>
      </div>
    </form>
  )
}
