'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

type CardState = 'idle' | 'sending' | 'sent' | 'error'

function HeroContactCard({ cardTag, cardPill }: { cardTag?: string; cardPill?: string }) {
  const [state, setState] = useState<CardState>('idle')
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
      website: fd.get('website'),
      service: fd.get('service'),
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
      setErrorMsg(err instanceof Error ? err.message : 'Network error.')
    }
  }

  if (state === 'sent') {
    return (
      <div className="hero-card hero-card-done">
        <div className="hero-card-check">
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="serif">We&apos;ll be in touch <em className="serif-i" style={{ color: 'var(--accent)' }}>soon.</em></h3>
        <p>A strategist will reply within 4 business hours.</p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setState('idle')}>Send another</button>
      </div>
    )
  }

  return (
    <form className="hero-card" ref={formRef} onSubmit={handleSubmit}>
      <div className="hero-card-head">
        <span className="hero-card-tag">{cardTag || 'Get a free audit'}</span>
        <span className="hero-card-pill">{cardPill || 'Reply in 4h'}</span>
      </div>

      <div className="hero-card-fields">
        <input name="name" type="text" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Work email" required />
        <input name="website" type="url" placeholder="https://yoursite.com" />
        <select name="service" defaultValue="">
          <option value="" disabled>What do you need?</option>
          <option>Free SEO audit</option>
          <option>Full SEO retainer</option>
          <option>Technical SEO</option>
          <option>Local / Maps SEO</option>
          <option>AI Search &amp; GEO</option>
          <option>Not sure yet</option>
        </select>
        <textarea name="message" placeholder="Tell us briefly about your project..." rows={3} />
      </div>

      {errorMsg && (
        <div className="hero-card-error">{errorMsg}</div>
      )}

      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending...' : 'Get my free audit'}
        <span className="arr"><ArrowRight /></span>
      </button>

      <p className="hero-card-legal">No spam. No obligation. Your data stays private.</p>
    </form>
  )
}

export default function HeroSection({
  content,
  eyebrow,
  title,
  lede
}: {
  content?: Record<string, string>
  eyebrow?: string
  title?: React.ReactNode
  lede?: string
}) {
  const finalEyebrow = eyebrow || content?.hero_eyebrow || "Global SEO Studio · 2014→2026"
  const heading = content?.hero_heading || "Small businesses deserve to be unmissable."
  const subtext = lede || content?.hero_subtext || "We're a 38-person SEO studio that helps independent shops, founders, and challenger brands win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next."
  const ctaPrimary = content?.hero_cta_primary || "Get a free SEO audit"
  const ctaSecondary = content?.hero_cta_secondary || "See how we work"
  const ratingScore = content?.hero_rating_score || "4.9 / 5"
  const ratingText = content?.hero_rating_text || "across 412 reviews · Clutch · Trustpilot · Google"
  const cardTag = content?.hero_card_tag || "Get a free audit"
  const cardPill = content?.hero_card_pill || "Reply in 4h"

  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="reveal in">
            <span className="eyebrow">{finalEyebrow}</span>
            {title ? (
              title
            ) : (
              <h1 dangerouslySetInnerHTML={{ __html: heading.replace('unmissable.', '<em>unmissable.</em>') }} />
            )}
            <p className="lede">{subtext}</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">
                {ctaPrimary}
                <span className="arr"><ArrowRight /></span>
              </Link>
              <Link href="/services" className="btn btn-ghost">{ctaSecondary}</Link>
            </div>
            <div className="hero-rating">
              <div className="stars">★★★★★</div>
              <div className="meta"><strong>{ratingScore}</strong> {ratingText}</div>
            </div>
          </div>

          <div className="reveal in">
            <HeroContactCard cardTag={cardTag} cardPill={cardPill} />
          </div>
        </div>
      </div>
    </header>
  )
}
