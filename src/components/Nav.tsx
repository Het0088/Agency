'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  SERVICES,
  CITY_REGIONS,
  cityHref,
  ABOUT,
  RESOURCES,
  NAV,
  localItems,
  type SubService,
  type ServiceCategory,
  type CityItem,
  type CityRegion,
  type DropdownItem,
  type NavItem,
} from '@/lib/nav-data'

export {
  SERVICES,
  CITY_REGIONS,
  cityHref,
  ABOUT,
  RESOURCES,
  NAV,
  localItems,
  type SubService,
  type ServiceCategory,
  type CityItem,
  type CityRegion,
  type DropdownItem,
  type NavItem,
}

const Chevron = () => (
  <svg className="gq-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Arrow = () => <span aria-hidden="true" className="gq-arrow">→</span>

/* ── Services mega menu ── */
function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="gq-mega">
      <aside className="gq-mega-side">
        <p className="gq-eyebrow">Our services</p>
        <p className="gq-side-title">
          Grow your <em>brand</em> with data-driven strategy.
        </p>
        <div className="gq-stats">
          <div>
            <strong>412%</strong>
            <span>Avg. traffic growth</span>
          </div>
          <div>
            <strong>94%</strong>
            <span>Client retention</span>
          </div>
        </div>
        <Link href="/contact" className="gq-btn gq-btn-solid" onClick={onNavigate}>
          Get a free audit <Arrow />
        </Link>
      </aside>

      <div className="gq-mega-main">
        <div className="gq-mega-grid">
          {SERVICES.map((cat) => (
            <div className="gq-col" key={cat.id}>
              <Link href={cat.href} className="gq-col-head" onClick={onNavigate}>
                {cat.label}
              </Link>
              <ul>
                {cat.items.map((it) => (
                  <li key={it.label}>
                    <Link href={it.href} onClick={onNavigate}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gq-mega-foot">
          <span>Not sure where to start? A senior strategist will tell you, free.</span>
          <Link href="/services" onClick={onNavigate}>
            View all services <Arrow />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ── Locations: category → sub-service → city ── */
function LocationsBody({ catId, onNavigate, compact }: { catId: string; onNavigate: () => void; compact?: boolean }) {
  const cat = SERVICES.find((c) => c.id === catId) || SERVICES[0]
  const options = localItems(cat)
  const [sel, setSel] = useState(0)

  useEffect(() => {
    setSel(0)
  }, [catId])

  const cur = options[sel] || options[0]

  return (
    <div className="gq-loc-body">
      {!compact && (
        <div className="gq-loc-head">
          <p className="gq-col-head gq-static">{cat.label} by city</p>
          <Link href={`/locations#${cat.id}`} className="gq-textlink" onClick={onNavigate}>
            All {cat.label.toLowerCase()} locations <Arrow />
          </Link>
        </div>
      )}
      <div className="gq-chips" role="tablist" aria-label={`${cat.label} sub-services`}>
        {options.map((o, i) => (
          <button
            key={o.locSlug}
            type="button"
            role="tab"
            aria-selected={i === sel}
            className="gq-chip"
            onClick={() => setSel(i)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="gq-regions">
        {CITY_REGIONS.map((r) => (
          <div className="gq-region" key={r.region}>
            <p className="gq-region-name">{r.region}</p>
            <ul className={r.cities.length > 6 ? 'gq-two' : ''}>
              {r.cities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHref(cur.locSlug, c.slug)} onClick={onNavigate}>
                    {cur.short} in {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function LocationsPanel({ onNavigate }: { onNavigate: () => void }) {
  const [catId, setCatId] = useState(SERVICES[0].id)
  return (
    <div className="gq-mega">
      <aside className="gq-mega-side gq-loc-side">
        <p className="gq-eyebrow">Locations</p>
        <ul className="gq-loc-tabs" role="tablist" aria-orientation="vertical" aria-label="Service category">
          {SERVICES.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                role="tab"
                aria-selected={c.id === catId}
                onMouseEnter={() => setCatId(c.id)}
                onFocus={() => setCatId(c.id)}
                onClick={() => setCatId(c.id)}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
        <Link href="/locations" className="gq-btn gq-btn-solid" onClick={onNavigate}>
          All locations <Arrow />
        </Link>
      </aside>
      <div className="gq-mega-main">
        <LocationsBody catId={catId} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

/* ── Simple dropdown (About / Resources) ── */
function DropdownPanel({ items, onNavigate }: { items: DropdownItem[]; onNavigate: () => void }) {
  return (
    <ul className="gq-drop">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} onClick={onNavigate}>
            <strong>{it.label}</strong>
            {it.desc && <span>{it.desc}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* ── Mobile drawer ── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sec, setSec] = useState<string | null>(null)
  const [sub, setSub] = useState<string | null>(null)
  const toggle = (id: string) => {
    setSec(sec === id ? null : id)
    setSub(null)
  }

  return (
    <div className={`gq-mobile ${open ? 'is-open' : ''}`} id="gq-mobile" hidden={!open}>
      <ul className="gq-m-list">
        {NAV.map((n) => {
          if (!n.type) {
            return (
              <li key={n.id}>
                <Link href={n.href} className="gq-m-row" onClick={onClose}>
                  {n.label}
                </Link>
              </li>
            )
          }
          const isOpen = sec === n.id
          return (
            <li key={n.id}>
              <button type="button" className="gq-m-row" aria-expanded={isOpen} onClick={() => toggle(n.id)}>
                {n.label} <span className="gq-m-sign" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="gq-m-sub">
                  {n.type === 'dropdown' &&
                    n.items?.map((it) => (
                      <Link key={it.href} href={it.href} className="gq-m-link" onClick={onClose}>
                        {it.label}
                      </Link>
                    ))}

                  {(n.type === 'mega' || n.type === 'locations') &&
                    SERVICES.map((cat) => {
                      const o = sub === cat.id
                      return (
                        <div key={cat.id} className="gq-m-group">
                          <button
                            type="button"
                            className="gq-m-row gq-m-row-sm"
                            aria-expanded={o}
                            onClick={() => setSub(o ? null : cat.id)}
                          >
                            {n.type === 'locations' ? `${cat.label} by city` : cat.label}
                            <span className="gq-m-sign" aria-hidden="true">{o ? '−' : '+'}</span>
                          </button>
                          {o && n.type === 'mega' && (
                            <div className="gq-m-sub gq-m-sub-2">
                              <Link href={cat.href} className="gq-m-link gq-m-strong" onClick={onClose}>
                                All {cat.label}
                              </Link>
                              {cat.items.map((it) => (
                                <Link key={it.label} href={it.href} className="gq-m-link" onClick={onClose}>
                                  {it.label}
                                </Link>
                              ))}
                            </div>
                          )}
                          {o && n.type === 'locations' && (
                            <div className="gq-m-sub gq-m-sub-2">
                              <LocationsBody catId={cat.id} onNavigate={onClose} compact />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  {n.type === 'locations' && (
                    <Link href="/locations" className="gq-m-link gq-m-strong" onClick={onClose}>
                      View all locations →
                    </Link>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <Link href="/contact" className="gq-btn gq-btn-solid gq-m-cta" onClick={onClose}>
        Get a free audit <Arrow />
      </Link>
    </div>
  )
}

/* ── Main Nav Component ── */
export default function Nav({ active }: { active?: string }) {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const close = () => {
    setOpen(null)
    setMobile(false)
  }

  const hoverOpen = (id: string) => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(id)
  }

  const hoverClose = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(null), 180)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [])

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  return (
    <header className="gq-header" ref={ref} onMouseLeave={hoverClose} role="banner">
      <div className="gq-bar">
        <Link href="/" className="gq-logo" onClick={close} aria-label="GENRANQ Home">
          {/* Logo preserved: exact existing client logo file and format */}
          <img src="/logo.png" alt="GENRANQ Software LLP" className="logo-img" />
        </Link>

        <nav className="gq-nav" aria-label="Main">
          <ul>
            {NAV.map((n) => {
              const isActive = active === n.id
              return (
                <li key={n.id} onMouseEnter={() => (n.type ? hoverOpen(n.id) : hoverClose())}>
                  {n.type ? (
                    <button
                      type="button"
                      className={`gq-top ${isActive ? 'gq-active' : ''}`}
                      aria-expanded={open === n.id}
                      aria-controls={`gq-panel-${n.id}`}
                      onClick={() => setOpen(open === n.id ? null : n.id)}
                    >
                      {n.label} <Chevron />
                    </button>
                  ) : (
                    <Link
                      href={n.href}
                      className={`gq-top ${isActive ? 'gq-active' : ''}`}
                      onClick={close}
                    >
                      {n.label}
                    </Link>
                  )}
                  {n.type === 'dropdown' && open === n.id && n.items && (
                    <div className="gq-drop-wrap" id={`gq-panel-${n.id}`} onMouseEnter={() => hoverOpen(n.id)}>
                      <DropdownPanel items={n.items} onNavigate={close} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="gq-actions">
          <Link href="/contact" className="gq-btn gq-btn-dark" onClick={close}>
            Get a free audit
          </Link>
          <button
            type="button"
            className="gq-burger"
            aria-expanded={mobile}
            aria-controls="gq-mobile"
            aria-label={mobile ? 'Close menu' : 'Open menu'}
            onClick={() => setMobile(!mobile)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {(open === 'services' || open === 'locations') && (
        <div className="gq-panel" id={`gq-panel-${open}`} onMouseEnter={() => hoverOpen(open)}>
          {open === 'services' ? <ServicesPanel onNavigate={close} /> : <LocationsPanel onNavigate={close} />}
        </div>
      )}

      <MobileMenu open={mobile} onClose={close} />
    </header>
  )
}
