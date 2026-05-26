import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'
import articlesData from '@/data/articles.json'
import blogsData from '@/data/blogs.json'

type Entry = {
  id: string
  tag: string
  title: string
  desc: string
  author: string
  date: string
  read: string
  slug: string
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getLatest(items: Entry[], count: number): (Entry & { num: string })[] {
  return [...items]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count)
    .map((item, i) => ({ ...item, num: String(i + 1).padStart(2, '0') }))
}

function EntryCard({ item }: { item: Entry & { num: string } }) {
  return (
    <Link href={item.slug} className="ab-entry">
      <span className="ab-entry-num">{item.num}</span>
      <div className="ab-entry-content">
        <span className="ab-entry-tag">{item.tag}</span>
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
        <div className="ab-entry-foot">
          <span className="ab-entry-author">{item.author}</span>
          <span className="ab-entry-sep"></span>
          <span>{formatDate(item.date)} · {item.read}</span>
        </div>
      </div>
      <span className="ab-entry-arrow">
        <ArrowRight />
      </span>
    </Link>
  )
}

export default function ArticlesBlogsSection() {
  const articles = getLatest(articlesData as Entry[], 3)
  const blogs = getLatest(blogsData as Entry[], 3)

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
              {articles.map((a) => <EntryCard key={a.id} item={a} />)}
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
              {blogs.map((b) => <EntryCard key={b.id} item={b} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
