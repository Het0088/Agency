'use client'

import { useState } from 'react'
import { ArrowDown } from '@/components/Icons'

type Post = { gradient: string; label: string; tag: string; title: string; desc: string; author: string; date: string }

const categories = [
  { name: 'All posts', ct: 142 }, { name: 'AI Search & GEO', ct: 38 }, { name: 'Technical SEO', ct: 29 },
  { name: 'Content & editorial', ct: 24 }, { name: 'Local SEO', ct: 18 }, { name: 'Digital PR & links', ct: 14 },
  { name: 'Case studies', ct: 12 }, { name: 'Industry reports', ct: 7 },
]

export default function InsightsContent({ posts }: { posts: Post[] }) {
  const [activeCat, setActiveCat] = useState('All posts')

  return (
    <section className="section">
      <div className="wrap">
        <article className="blog-feature reveal">
          <div className="img" aria-hidden="true"></div>
          <div>
            <span className="feature-tag">★ Featured · 18 min read</span>
            <h2>The 2026 AI Search Playbook: how to get cited inside ChatGPT, Perplexity, and Google AIO.</h2>
            <p>An 84-page deep-dive on Generative Engine Optimization — what works in 2026, what&apos;s already obsolete, and the exact 12-step audit we run for every client. Co-authored by our Head of AI Search, ex-Google.</p>
            <div className="meta">
              <span className="author" style={{ color: 'var(--ink)', fontWeight: 500 }}>Tomás Beltrán</span>
              <span className="dot"></span><span>May 4, 2026</span>
              <span className="dot"></span><span>AI Search · GEO</span>
            </div>
          </div>
        </article>

        <div className="cat-pills reveal">
          {categories.map((c) => (
            <button key={c.name} className={`cat-pill${activeCat === c.name ? ' active' : ''}`} onClick={() => setActiveCat(c.name)}>
              {c.name} <span className="ct">{c.ct}</span>
            </button>
          ))}
        </div>

        <div className="posts-grid">
          {posts.map((p) => (
            <article className="post reveal" key={p.title}>
              <div className={`img ${p.gradient}`}><span className="label">{p.label}</span></div>
              <span className="tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="meta">
                <span className="author">{p.author}</span>
                <span className="dot"></span><span>{p.date}</span>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#" className="btn btn-ghost">Load more posts <span className="arr"><ArrowDown /></span></a>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: 96 }}>
        <div className="newsletter reveal" id="newsletter">
          <div>
            <span className="eyebrow" style={{ color: 'var(--dark-ink-soft)' }}>Newsletter · 14,200 readers</span>
            <h2>One email, <em>every Tuesday.</em></h2>
            <p>Field notes from our strategists, the week&apos;s most interesting SERP shifts, and one new playbook every issue. No fluff, no unsubscribe traps.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); const btn = (e.target as HTMLFormElement).querySelector('button'); if (btn) btn.textContent = 'Subscribed ✓' }}>
            <input type="email" placeholder="you@yourcompany.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  )
}
