'use client'

import React, { useEffect, useState, useMemo, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface PopupData {
  id: string
  name: string
  enabled: boolean
  layout: 'center' | 'slide' | 'bar' | 'full'
  theme?: 'light' | 'dark' | 'orange' | 'cream'
  image?: string
  eyebrow?: string
  title: string
  text?: string
  bullets?: string[]
  fields?: {
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    message?: boolean
    service?: boolean
  }
  buttonLabel?: string
  successTitle?: string
  successText?: string
  dismissLabel?: string
  trigger?: {
    type: 'delay' | 'scroll' | 'exit' | 'click' | 'load'
    delay?: number
    scroll?: number
  }
  frequency?: 'session' | 'once' | 'always'
  device?: 'all' | 'desktop' | 'mobile'
  target?: {
    all?: boolean
    pageTypes?: string[]
    sections?: string[]
    include?: string[]
    exclude?: string[]
  }
  priority?: number
}

function renderAccent(text: string) {
  if (!text) return ''
  return text.replace(/\*([^*]+)\*/g, '<span style="color:#FF5A1F;font-weight:700;">$1</span>')
}

export default function SitePopup() {
  const pathname = usePathname()
  const [popups, setPopups] = useState<PopupData[]>([])
  const [activePopup, setActivePopup] = useState<PopupData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [formStartTime, setFormStartTime] = useState(0)

  // 1. Fetch active popups on mount and sync with CMS storage
  useEffect(() => {
    let mounted = true

    // Check localStorage gq_cms first for instant synchronization with admin panel
    try {
      const raw = localStorage.getItem('gq_cms')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && Array.isArray(parsed.popups) && parsed.popups.length) {
          if (mounted) setPopups(parsed.popups.filter((p: any) => p.enabled !== false))
        }
      }
    } catch {}

    fetch('/api/popups')
      .then(r => r.json())
      .then(d => {
        if (mounted && d && Array.isArray(d.popups) && d.popups.length) {
          setPopups(d.popups)
        }
      })
      .catch(err => {
        console.warn('Could not fetch popups:', err)
      })
    return () => { mounted = false }
  }, [])

  // 2. Identify candidate popup for the current route
  const candidate = useMemo(() => {
    if (!popups.length) return null

    // Determine current page type / section from pathname
    const path = pathname || '/'
    let currentKind = 'home'
    let currentSec = ''

    if (path === '/') {
      currentKind = 'home'
    } else if (path.startsWith('/services')) {
      currentKind = 'service'
    } else if (path.startsWith('/insights') || path.startsWith('/blog')) {
      currentKind = 'blog'
      currentSec = 'blog'
    } else if (path.startsWith('/glossary')) {
      currentKind = 'glossary'
      currentSec = 'glossary'
    } else if (path.startsWith('/news')) {
      currentKind = 'news'
      currentSec = 'news'
    } else if (path.startsWith('/contact')) {
      currentKind = 'contact'
    } else {
      currentKind = 'standard'
    }

    // Rank matching popups
    const matched = popups.filter(p => {
      if (!p.enabled) return false
      const t = p.target || {}

      // Exclusions
      if ((t.exclude || []).some(x => path === x || path.includes(x))) return false

      // Inclusions
      if ((t.include || []).some(x => path === x || path.includes(x))) return true

      // Section check
      if (currentSec && (t.sections || []).includes(currentSec)) return true

      // Page type check
      if ((t.pageTypes || []).includes(currentKind)) return true

      // All pages check
      if (t.all) return true

      return false
    })

    if (!matched.length) return null

    // Sort by priority (lower number = higher priority)
    matched.sort((a, b) => (a.priority || 5) - (b.priority || 5))
    return matched[0]
  }, [popups, pathname])

  // 3. Listen for manual click events (e.g. #popup-<id> or CustomEvent 'gq-popup')
  useEffect(() => {
    const handleCustomPopup = (e: any) => {
      const id = e.detail
      const found = popups.find(p => p.id === id) || candidate
      if (found) {
        setIsSubmitted(false)
        setFormStartTime(Date.now())
        setActivePopup(found)
      }
    }

    const handleAnchorClicks = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a')
      if (!target) return
      const href = target.getAttribute('href') || ''
      if (href.startsWith('#popup')) {
        e.preventDefault()
        const id = href.replace(/^#popup-?/, '')
        const found = popups.find(p => p.id === id) || candidate
        if (found) {
          setIsSubmitted(false)
          setFormStartTime(Date.now())
          setActivePopup(found)
        }
      }
    }

    window.addEventListener('gq-popup', handleCustomPopup)
    document.addEventListener('click', handleAnchorClicks)
    return () => {
      window.removeEventListener('gq-popup', handleCustomPopup)
      document.removeEventListener('click', handleAnchorClicks)
    }
  }, [popups, candidate])

  // 4. Automatic Trigger Execution (delay, scroll, exit, load)
  useEffect(() => {
    if (!candidate) return

    const p = candidate
    const trig = p.trigger || { type: 'delay', delay: 3 }

    // Check device
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    if (p.device === 'desktop' && isMobile) return
    if (p.device === 'mobile' && !isMobile) return

    // Check test / force params from URL
    const hasForceParam = typeof window !== 'undefined' && (
      window.location.search.includes('forcePopup') ||
      window.location.search.includes('test') ||
      window.location.search.includes('preview') ||
      window.location.hash.startsWith('#popup')
    )

    // Check frequency
    const storageKey = `gq_pp_${p.id}`
    if (!hasForceParam) {
      if (p.frequency === 'once') {
        try {
          if (localStorage.getItem(storageKey)) return
        } catch {}
      } else if (p.frequency === 'session') {
        try {
          if (sessionStorage.getItem(storageKey)) return
        } catch {}
      }
    }

    const show = () => {
      setIsSubmitted(false)
      setFormStartTime(Date.now())
      setActivePopup(p)
      cleanup()
    }

    let timer: any = null

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        show()
        return
      }
      const scrollPercent = (window.scrollY / docHeight) * 100
      if (scrollPercent >= (trig.scroll || 35)) {
        show()
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY < 15) {
        show()
      }
    }

    const cleanup = () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseout', onMouseOut)
    }

    if (trig.type === 'load') {
      timer = setTimeout(show, 400)
    } else if (trig.type === 'delay') {
      const delayMs = (trig.delay ?? 3) * 1000
      timer = setTimeout(show, Math.max(300, delayMs))
    } else if (trig.type === 'scroll') {
      window.addEventListener('scroll', onScroll, { passive: true })
    } else if (trig.type === 'exit') {
      document.addEventListener('mouseout', onMouseOut)
      timer = setTimeout(show, 12000) // fallback for exit intent
    } else {
      timer = setTimeout(show, 3000)
    }

    return cleanup
  }, [candidate])

  const handleClose = () => {
    if (activePopup) {
      const storageKey = `gq_pp_${activePopup.id}`
      try {
        if (activePopup.frequency === 'once') {
          localStorage.setItem(storageKey, '1')
        } else if (activePopup.frequency === 'session') {
          sessionStorage.setItem(storageKey, '1')
        }
      } catch {}
    }
    setActivePopup(null)
    setIsSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activePopup || isSubmitting) return

    setIsSubmitting(true)

    const payload = {
      name: formData.name || 'Website Visitor',
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service || (activePopup.fields?.service ? document.title.split('—')[0].trim() : ''),
      message: formData.message,
      source: pathname || '/',
      sourceTitle: typeof document !== 'undefined' ? document.title : 'GENRANQ Website',
      sourceKind: pathname === '/' ? 'home' : (pathname?.replace(/^\//, '').split('/')[0] || 'page'),
      form: 'popup',
      formName: activePopup.name,
      popupId: activePopup.id,
      _t: formStartTime || Date.now() - 5000
    }

    try {
      // 1. Send to admin leads API
      await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      // 2. Also send to /api/contact for notification pipelines
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {})

      // 3. Synchronize with CMS in-browser leads storage if available
      try {
        const raw = localStorage.getItem('gq_cms')
        if (raw) {
          const cmsData = JSON.parse(raw)
          if (cmsData && Array.isArray(cmsData.leads)) {
            const leadRecord = {
              id: 'lead-' + Date.now(),
              ...payload,
              status: 'new',
              notes: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
            cmsData.leads.unshift(leadRecord)
            localStorage.setItem('gq_cms', JSON.stringify(cmsData))
          }
        }
      } catch {}

      // Mark frequency as seen after submission
      try {
        const storageKey = `gq_pp_${activePopup.id}`
        if (activePopup.frequency === 'once') {
          localStorage.setItem(storageKey, '1')
        } else {
          sessionStorage.setItem(storageKey, '1')
        }
      } catch {}

      setIsSubmitted(true)
    } catch (err) {
      console.error('Lead submit error:', err)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!activePopup) return null

  const p = activePopup
  const theme = p.theme || 'dark'
  const isDark = theme === 'dark'
  const isOrange = theme === 'orange'
  const isCream = theme === 'cream'

  const bgStyle = isDark
    ? '#111412'
    : isOrange
    ? '#FF5A1F'
    : isCream
    ? '#FAF7F0'
    : '#FFFFFF'

  const textStyle = isDark || isOrange ? '#FFFFFF' : '#121613'
  const subTextStyle = isDark ? '#A3A8A3' : isOrange ? '#FFE8DC' : '#5A615C'
  const cardBorder = isDark ? '1px solid rgba(255,255,255,0.12)' : isOrange ? 'none' : '1px solid #E5E0D5'
  const inputBg = isDark ? '#1C221D' : isOrange ? '#FFFFFF' : '#FFFFFF'
  const inputColor = isDark ? '#FFFFFF' : '#121613'
  const inputBorder = isDark ? '1px solid #2F3830' : isOrange ? 'none' : '1px solid #D9D4C7'

  const f = {
    name: true,
    email: true,
    phone: true,
    company: true,
    service: false,
    message: false,
    ...(p.fields || {})
  }

  // Common Form Component
  const renderForm = () => {
    if (isSubmitted) {
      return (
        <div style={{ textAlign: 'center', padding: '24px 10px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: isOrange ? '#FFFFFF' : '#FF5A1F',
            color: isOrange ? '#FF5A1F' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 auto 16px'
          }}>
            ✓
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px', color: textStyle }}>
            {p.successTitle || 'Thank you!'}
          </h4>
          <p style={{ fontSize: '14px', color: subTextStyle, margin: '0 0 20px', lineHeight: 1.5 }}>
            {p.successText || "We'll be in touch with your audit shortly."}
          </p>
          <button
            type="button"
            onClick={handleClose}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              background: isOrange ? '#121613' : '#FF5A1F',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {f.name && (
          <div>
            <input
              type="text"
              placeholder="Your name *"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                border: inputBorder,
                background: inputBg,
                color: inputColor,
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        )}

        {f.email && (
          <div>
            <input
              type="email"
              placeholder="Work email *"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                border: inputBorder,
                background: inputBg,
                color: inputColor,
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: f.phone && f.company ? '1fr 1fr' : '1fr', gap: '10px' }}>
          {f.phone && (
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                border: inputBorder,
                background: inputBg,
                color: inputColor,
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          )}

          {f.company && (
            <input
              type="text"
              placeholder="Website / Company"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                border: inputBorder,
                background: inputBg,
                color: inputColor,
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          )}
        </div>

        {f.service && (
          <div>
            <input
              type="text"
              placeholder="Service interested in"
              value={formData.service}
              onChange={e => setFormData({ ...formData, service: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                border: inputBorder,
                background: inputBg,
                color: inputColor,
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        )}

        {f.message && (
          <div>
            <textarea
              rows={2}
              placeholder="How can we help?"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '8px',
                border: inputBorder,
                background: inputBg,
                color: inputColor,
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: '4px',
            padding: '13px 20px',
            borderRadius: '8px',
            background: isOrange ? '#121613' : '#FF5A1F',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'opacity 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {isSubmitting ? 'Sending…' : (p.buttonLabel || 'Book my free audit')} →
        </button>

        {p.dismissLabel && p.dismissLabel !== '×' && (
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: subTextStyle,
              fontSize: '12px',
              cursor: 'pointer',
              marginTop: '4px'
            }}
          >
            {p.dismissLabel}
          </button>
        )}
      </form>
    )
  }

  // TOP BAR LAYOUT
  if (p.layout === 'bar') {
    return (
      <aside
        role="dialog"
        aria-label={p.name}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          background: bgStyle,
          color: textStyle,
          borderBottom: cardBorder,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          animation: 'slideDown 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {p.eyebrow && (
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.15)' }}>
              {p.eyebrow}
            </span>
          )}
          <span
            style={{ fontSize: '14px', fontWeight: '600' }}
            dangerouslySetInnerHTML={{ __html: renderAccent(p.title) }}
          />
          {p.text && <span style={{ fontSize: '13px', color: subTextStyle }}>{p.text}</span>}
        </div>
        <div style={{ minWidth: '280px' }}>
          {renderForm()}
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          style={{
            background: 'transparent',
            border: 'none',
            color: textStyle,
            fontSize: '22px',
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          ×
        </button>
      </aside>
    )
  }

  // SLIDE-IN (BOTTOM RIGHT) LAYOUT
  if (p.layout === 'slide') {
    return (
      <aside
        role="dialog"
        aria-label={p.name}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '90%',
          maxWidth: '380px',
          zIndex: 99999,
          background: bgStyle,
          color: textStyle,
          border: cardBorder,
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
          padding: '24px',
          boxSizing: 'border-box',
          animation: 'slideUp 0.35s ease'
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            background: 'transparent',
            border: 'none',
            color: subTextStyle,
            fontSize: '22px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        {p.eyebrow && (
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FF5A1F', marginBottom: '6px' }}>
            {p.eyebrow}
          </div>
        )}

        <h3
          style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px', lineHeight: 1.3 }}
          dangerouslySetInnerHTML={{ __html: renderAccent(p.title) }}
        />

        {p.text && (
          <p style={{ fontSize: '13px', color: subTextStyle, margin: '0 0 16px', lineHeight: 1.5 }}>
            {p.text}
          </p>
        )}

        {renderForm()}
      </aside>
    )
  }

  // CENTER MODAL (OR FULL SCREEN)
  const isFull = p.layout === 'full'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFull ? '0' : '20px',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 14, 12, 0.72)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)'
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          width: isFull ? '100vw' : '100%',
          maxWidth: isFull ? '100vw' : '540px',
          height: isFull ? '100vh' : 'auto',
          maxHeight: isFull ? '100vh' : '90vh',
          overflowY: 'auto',
          background: bgStyle,
          color: textStyle,
          border: isFull ? 'none' : cardBorder,
          borderRadius: isFull ? '0' : '20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.38)',
          padding: isFull ? '60px 24px' : '36px',
          boxSizing: 'border-box',
          zIndex: 1,
          animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '18px',
            background: 'transparent',
            border: 'none',
            color: subTextStyle,
            fontSize: '26px',
            lineHeight: 1,
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ×
        </button>

        {p.eyebrow && (
          <div style={{
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#FF5A1F',
            background: isDark ? 'rgba(255,90,31,0.12)' : 'rgba(255,90,31,0.08)',
            padding: '4px 10px',
            borderRadius: '6px',
            marginBottom: '12px'
          }}>
            {p.eyebrow}
          </div>
        )}

        <h3
          style={{ fontSize: isFull ? '32px' : '24px', fontWeight: '700', margin: '0 0 10px', lineHeight: 1.25, letterSpacing: '-0.02em' }}
          dangerouslySetInnerHTML={{ __html: renderAccent(p.title) }}
        />

        {p.text && (
          <p style={{ fontSize: '15px', color: subTextStyle, margin: '0 0 16px', lineHeight: 1.55 }}>
            {p.text}
          </p>
        )}

        {p.bullets && p.bullets.length > 0 && (
          <ul style={{
            margin: '0 0 20px',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {p.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: textStyle }}>
                <span style={{ color: '#FF5A1F', fontWeight: '700' }}>✓</span> {b}
              </li>
            ))}
          </ul>
        )}

        {renderForm()}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
