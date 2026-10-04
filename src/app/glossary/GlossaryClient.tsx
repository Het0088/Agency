'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { GlossaryTerm } from '@/lib/glossary'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryClient({ terms }: { terms: GlossaryTerm[] }) {
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  const lettersWithTerms = useMemo(() => {
    return new Set(terms.map(t => (t.title[0] || 'A').toUpperCase()))
  }, [terms])

  const filtered = useMemo(() => {
    return terms.filter(t => {
      const matchSearch = !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.shortDef.toLowerCase().includes(search.toLowerCase()) ||
        (t.synonyms && t.synonyms.toLowerCase().includes(search.toLowerCase()))
      const firstLetter = (t.title[0] || 'A').toUpperCase()
      const matchLetter = !activeLetter || firstLetter === activeLetter
      return matchSearch && matchLetter
    })
  }, [terms, search, activeLetter])

  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {}
    filtered.forEach(t => {
      const l = (t.title[0] || 'A').toUpperCase()
      if (!map[l]) map[l] = []
      map[l].push(t)
    })
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  return (
    <>
      {/* Sticky A-Z Bar */}
      <div className="az-bar-wrap" style={{
        position: 'sticky',
        top: 72,
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 20px -8px rgba(0,0,0,0.06)'
      }}>
        <div className="wrap" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '12px 24px',
          flexWrap: 'wrap'
        }}>
          {/* Alphabet pills */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setActiveLetter(null)}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                border: '1px solid',
                borderColor: !activeLetter ? '#FF5A1F' : 'var(--border)',
                background: !activeLetter ? '#FF5A1F' : '#fff',
                color: !activeLetter ? '#fff' : 'var(--ink)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              All ({terms.length})
            </button>
            {ALPHABET.map(letter => {
              const hasItems = lettersWithTerms.has(letter)
              const isActive = activeLetter === letter
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!hasItems}
                  onClick={() => setActiveLetter(isActive ? null : letter)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: isActive ? '#FF5A1F' : (hasItems ? 'var(--border)' : 'transparent'),
                    background: isActive ? '#FF5A1F' : (hasItems ? '#fff' : 'transparent'),
                    color: isActive ? '#fff' : (hasItems ? 'var(--ink)' : '#CFC8B8'),
                    cursor: hasItems ? 'pointer' : 'default',
                    opacity: hasItems ? 1 : 0.4,
                    transition: 'all 0.15s'
                  }}
                  title={hasItems ? `Filter by ${letter}` : `No terms starting with ${letter}`}
                >
                  {letter}
                </button>
              )
            })}
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', minWidth: 240 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search 20+ search terms..."
              style={{
                width: '100%',
                padding: '8px 14px 8px 34px',
                borderRadius: 999,
                border: '1px solid var(--border)',
                fontSize: 13,
                outline: 'none',
                background: '#fff',
                color: 'var(--ink)',
              }}
            />
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="#6B6F6A"
              strokeWidth="2.2"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Glossary Groups */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <div className="wrap">
          {grouped.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FCFBF8', borderRadius: 16, border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 18, color: 'var(--ink-soft)' }}>
                No glossary terms found matching &ldquo;{search}&rdquo;.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => { setSearch(''); setActiveLetter(null) }}
                style={{ marginTop: 12 }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            grouped.map(([letter, groupTerms]) => (
              <div
                key={letter}
                id={`gl-${letter}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(70px, 90px) minmax(0, 1fr)',
                  gap: 28,
                  padding: '36px 0',
                  borderBottom: '1px solid var(--border)',
                  scrollMarginTop: 140,
                }}
              >
                {/* Big Letter Heading */}
                <h2 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 64,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#FF5A1F',
                  lineHeight: 1,
                  margin: 0,
                  userSelect: 'none'
                }}>
                  {letter}
                </h2>

                {/* Terms Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 16,
                  alignItems: 'stretch'
                }}>
                  {groupTerms.map(term => (
                    <Link
                      key={term.id}
                      href={`/glossary/${term.slug}`}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#fff',
                        border: '1px solid var(--border)',
                        borderRadius: 16,
                        padding: '22px 50px 22px 24px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 2px 8px -2px rgba(18,22,19,0.04)',
                        height: '100%',
                      }}
                      className="glossary-card-hover"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10.5,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#FF5A1F',
                          background: 'rgba(255,90,31,0.08)',
                          padding: '2px 8px',
                          borderRadius: 999
                        }}>
                          {term.category}
                        </span>
                        {term.synonyms && (
                          <span style={{ fontSize: 11, color: '#6B6F6A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {term.synonyms.split(',')[0]}
                          </span>
                        )}
                      </div>

                      <b style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#121613',
                        lineHeight: 1.25,
                        marginBottom: 10
                      }}>
                        {term.title}
                      </b>

                      <span style={{
                        fontSize: 13.5,
                        color: '#4A4E49',
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: '1 1 auto',
                      }}>
                        {term.shortDef}
                      </span>

                      {/* Arrow Icon */}
                      <i style={{
                        position: 'absolute',
                        right: 18,
                        top: 22,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: '#F1EEE6',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#121613',
                        transition: 'all 0.2s ease',
                      }}>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </i>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Scoped CSS hover effect */}
      <style jsx global>{`
        .glossary-card-hover:hover {
          border-color: #FF5A1F !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -8px rgba(255,90,31,0.18) !important;
        }
        .glossary-card-hover:hover b {
          color: #FF5A1F !important;
        }
        .glossary-card-hover:hover i {
          background: #FF5A1F !important;
          color: #fff !important;
        }
        @media (max-width: 768px) {
          .az-bar-wrap {
            top: 60px !important;
          }
        }
      `}</style>
    </>
  )
}
