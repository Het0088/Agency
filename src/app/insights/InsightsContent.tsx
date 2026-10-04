'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowDown } from '@/components/Icons'

type Post = {
  slug: string
  gradient: string
  cover_image?: string | null
  label: string
  tag: string
  title: string
  desc: string
  author: string
  date: string
}
type Featured = {
  slug: string
  tag: string
  title: string
  desc: string
  cover_image?: string | null
  author: string
  date: string
  readTime: string
} | null

const categories = [
  { name: 'All posts' }, { name: 'AI Search' }, { name: 'Technical SEO' },
  { name: 'Editorial' }, { name: 'Local SEO' }, { name: 'Digital PR' },
  { name: 'Case study' }, { name: 'Industry report' },
]

export default function InsightsContent({ posts, featured }: { posts: Post[]; featured?: Featured }) {
  const [activeCat, setActiveCat] = useState('All posts')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeCat === 'All posts' ? posts : posts.filter(p => p.tag === activeCat)
  const visible = showAll ? filtered : filtered.slice(0, 9)

  return (
    <section className="section">
      <div className="wrap">
        {featured && (
          <Link href={`/insights/${featured.slug}`} className="blog-feature-link">
            <article className="blog-feature reveal">
              <div className="img" aria-hidden="true" style={{ overflow: 'hidden', position: 'relative' }}>
                {featured.cover_image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
              <div>
                <span className="feature-tag">Featured &middot; {featured.readTime} read</span>
                <h2>{featured.title}</h2>
                <p>{featured.desc}</p>
                <div className="meta">
                  <span className="author" style={{ color: 'var(--ink)', fontWeight: 500 }}>{featured.author}</span>
                  <span className="dot"></span><span>{featured.date}</span>
                  <span className="dot"></span><span>{featured.tag}</span>
                </div>
              </div>
            </article>
          </Link>
        )}

        <div className="cat-pills reveal">
          {categories.map((c) => (
            <button key={c.name} className={`cat-pill${activeCat === c.name ? ' active' : ''}`} onClick={() => { setActiveCat(c.name); setShowAll(false) }}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="posts-grid" style={{ alignItems: 'stretch' }}>
          {visible.map((p) => (
            <Link
              href={`/insights/${p.slug}`}
              key={p.slug}
              className="post-link"
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <article
                className="post reveal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: 16,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div
                  className={`img ${p.gradient}`}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 10,
                    aspectRatio: '16 / 10',
                    marginBottom: 16,
                    background: '#1a1e1b'
                  }}
                >
                  {p.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover_image}
                      alt={p.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      className="post-cover-img"
                    />
                  ) : (
                    <span className="label" style={{ position: 'absolute', top: 12, left: 14, color: '#fff', fontSize: 24, fontStyle: 'italic' }}>
                      {p.label}
                    </span>
                  )}
                </div>

                <span
                  className="tag"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#FF5A1F',
                    marginBottom: 8,
                    display: 'inline-block'
                  }}
                >
                  {p.tag}
                </span>

                <h3
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: 22,
                    fontWeight: 400,
                    lineHeight: 1.25,
                    color: '#121613',
                    margin: '0 0 10px',
                    transition: 'color 0.15s'
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: '#4A4E49',
                    margin: '0 0 16px',
                    flex: '1 1 auto',
                  }}
                >
                  {p.desc}
                </p>

                <div
                  className="meta"
                  style={{
                    marginTop: 'auto',
                    paddingTop: 14,
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    color: '#6B6F6A'
                  }}
                >
                  <span className="author" style={{ fontWeight: 600, color: '#121613' }}>{p.author}</span>
                  <span className="dot" style={{ width: 3, height: 3, borderRadius: '50%', background: '#6B6F6A' }}></span>
                  <span>{p.date}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {!showAll && filtered.length > 9 && (
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn btn-ghost" onClick={() => setShowAll(true)}>Load more posts <span className="arr"><ArrowDown /></span></button>
          </div>
        )}
      </div>

      <div className="wrap" style={{ marginTop: 96 }}>
        <div className="newsletter reveal" id="newsletter">
          <div>
            <span className="eyebrow" style={{ color: 'var(--dark-ink-soft)' }}>Newsletter</span>
            <h2>One email, <em>every Tuesday.</em></h2>
            <p>Field notes from our strategists, the week&apos;s most interesting SERP shifts, and one new playbook every issue. No fluff, no unsubscribe traps.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); const btn = (e.target as HTMLFormElement).querySelector('button'); if (btn) btn.textContent = 'Subscribed' }}>
            <input type="email" placeholder="you@yourcompany.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  )
}
