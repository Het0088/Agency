import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'
import { query } from '@/lib/db'

type Entry = {
  id: string
  tag: string
  title: string
  description: string
  author: string
  created_at: string
  read_time: string
  slug: string
}

function formatDate(raw: string): string {
  const d = new Date(raw)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function EntryCard({ item, num }: { item: Entry; num: string }) {
  return (
    <Link href={item.slug} className="ab-entry">
      <span className="ab-entry-num">{num}</span>
      <div className="ab-entry-content">
        <span className="ab-entry-tag">{item.tag}</span>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        <div className="ab-entry-foot">
          <span className="ab-entry-author">{item.author}</span>
          <span className="ab-entry-sep"></span>
          <span>{formatDate(item.created_at)} · {item.read_time}</span>
        </div>
      </div>
      <span className="ab-entry-arrow">
        <ArrowRight />
      </span>
    </Link>
  )
}

import fallbackArticles from '@/data/articles.json'
import fallbackBlogs from '@/data/blogs.json'

export default async function ArticlesBlogsSection() {
  let articles: Entry[] = []
  let blogs: Entry[] = []

  try {
    articles = await query<Entry>(
      'SELECT id, tag, title, description, author, created_at, read_time, slug FROM posts WHERE type = ? AND published = 1 ORDER BY created_at DESC LIMIT 3',
      ['article']
    )
    blogs = await query<Entry>(
      'SELECT id, tag, title, description, author, created_at, read_time, slug FROM posts WHERE type = ? AND published = 1 ORDER BY created_at DESC LIMIT 3',
      ['blog']
    )
  } catch {}

  if (!articles.length) {
    articles = fallbackArticles.slice(0, 3).map(a => ({
      id: a.id,
      tag: a.tag,
      title: a.title,
      description: a.desc,
      author: a.author,
      created_at: a.date,
      read_time: a.read,
      slug: a.slug,
    }))
  }

  if (!blogs.length) {
    blogs = fallbackBlogs.slice(0, 3).map(b => ({
      id: b.id,
      tag: b.tag,
      title: b.title,
      description: b.desc,
      author: b.author,
      created_at: b.date,
      read_time: b.read,
      slug: b.slug,
    }))
  }

  return (
    <section className="section ab-section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 className="serif">From our <em>strategists.</em></h2>
          <p className="sub">Deep dives, playbooks, and real-world teardowns — written by the people doing the work.</p>
        </div>

        <div className="ab-grid reveal">
          <div className="ab-col">
            <div className="ab-col-head">
              <span className="eyebrow">Articles</span>
              <Link href="/insights" className="ab-view-all">
                View all
                <span className="ab-view-arr"><ArrowRight /></span>
              </Link>
            </div>
            <div className="ab-col-list">
              {articles.map((a, i) => <EntryCard key={a.id} item={a} num={String(i + 1).padStart(2, '0')} />)}
            </div>
          </div>

          <div className="ab-col">
            <div className="ab-col-head">
              <span className="eyebrow">Blog</span>
              <Link href="/insights" className="ab-view-all">
                View all
                <span className="ab-view-arr"><ArrowRight /></span>
              </Link>
            </div>
            <div className="ab-col-list">
              {blogs.map((b, i) => <EntryCard key={b.id} item={b} num={String(i + 1).padStart(2, '0')} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
