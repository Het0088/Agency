'use client'

import { useState, useRef } from 'react'
import { ArrowRight } from '@/components/Icons'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const loadedAt = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'sending') return

    setState('sending')
    setErrorMsg('')

    const fd = new FormData(formRef.current!)
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      company: fd.get('company'),
      website: fd.get('website'),
      service: fd.get('service'),
      budget: fd.get('budget'),
      message: fd.get('message'),
      _t: loadedAt.current,
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
      <div className="cform" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--orange)', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 20px', fontSize: 28 }}>
          ✓
        </div>
        <h3 style={{ fontSize: 32, marginBottom: 12 }}>Message received!</h3>
        <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 440, margin: '0 auto 28px', lineHeight: 1.6 }}>
          Thank you for reaching out. A senior strategist or developer will review your details and reply within 4 business hours.
        </p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setState('idle')}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="cform" ref={formRef} onSubmit={handleSubmit}>
      <h3>Tell us where you stand</h3>
      <p className="sub">Fields marked * are required. We sign NDAs before discussing confidential details.</p>

      {state === 'error' && (
        <div style={{ background: '#FEECEC', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: 20, fontSize: 14 }}>
          {errorMsg}
        </div>
      )}

      <div className="fgrid">
        <div>
          <label htmlFor="f-name">Full name *</label>
          <input id="f-name" name="name" type="text" placeholder="Your name" required />
        </div>

        <div>
          <label htmlFor="f-email">Work email *</label>
          <input id="f-email" name="email" type="email" placeholder="you@company.com" required />
        </div>

        <div>
          <label htmlFor="f-phone">Phone number *</label>
          <input id="f-phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
        </div>

        <div>
          <label htmlFor="f-co">Company name</label>
          <input id="f-co" name="company" type="text" placeholder="Company or brand" />
        </div>

        <div>
          <label htmlFor="f-service">Service required</label>
          <select id="f-service" name="service" defaultValue="AI SEO & GEO">
            <option value="AI SEO & GEO">AI SEO & GEO (ChatGPT / Perplexity)</option>
            <option value="Technical SEO Audit">200-Point Technical SEO Audit</option>
            <option value="Website Design & Development">Website Design & Development</option>
            <option value="Hire Dedicated Developers">Hire Dedicated Developers</option>
            <option value="Local SEO & Maps">Local SEO & Google 3-Pack</option>
            <option value="Content & Link Building">Content & Authority Link Building</option>
            <option value="General Consultation">General Consultation / Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="f-budget">Estimated budget</label>
          <select id="f-budget" name="budget" defaultValue="₹1L – ₹3L">
            <option value="< ₹1L">&lt; ₹1L</option>
            <option value="₹1L – ₹3L">₹1L – ₹3L / month</option>
            <option value="₹3L – ₹8L">₹3L – ₹8L / month</option>
            <option value="₹8L+">₹8L+ / Enterprise</option>
          </select>
        </div>

        <div className="full">
          <label htmlFor="f-site">Website or store URL</label>
          <input id="f-site" name="website" type="url" placeholder="https://yourwebsite.com" />
        </div>

        <div className="full">
          <label htmlFor="f-msg">Tell us about your project *</label>
          <textarea
            id="f-msg"
            name="message"
            placeholder="What are your goals, current bottlenecks, target keywords, or timeline?"
            required
          />
        </div>
      </div>

      <label className="consent">
        <input type="checkbox" required />
        <span>I agree to the privacy policy and consent to GENRANQ contacting me regarding my enquiry.</span>
      </label>

      <button className="btn btn-primary" type="submit" disabled={state === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
        {state === 'sending' ? (
          'Sending your enquiry…'
        ) : (
          <>
            Send enquiry <span className="arr"><ArrowRight /></span>
          </>
        )}
      </button>
    </form>
  )
}
