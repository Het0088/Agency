'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowDown } from '@/components/Icons'

type Post = { slug: string; gradient: string; label: string; tag: string; title: string; desc: string; author: string; date: string }
type Featured = { slug: string; tag: string; title: string; desc: string; author: string; date: string; readTime: string } | null

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
              <div className="img" aria-hidden="true"></div>
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

        <div className="posts-grid">
          {visible.map((p) => (
            <Link href={`/insights/${p.slug}`} key={p.slug} className="post-link">
              <article className="post reveal">
                <div className={`img ${p.gradient}`}><span className="label">{p.label}</span></div>
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="meta">
                  <span className="author">{p.author}</span>
                  <span className="dot"></span><span>{p.date}</span>
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
