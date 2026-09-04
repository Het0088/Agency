import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import BlogPostClient from './BlogPostClient'
import { query, queryOne } from '@/lib/db'

export const dynamic = 'force-dynamic'

type PostRow = {
  id: string
  tag: string
  title: string
  description: string
  content: string
  author: string
  read_time: string
  slug: string
  cover_gradient: string
  created_at: string
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await queryOne<PostRow>(
    'SELECT title, description FROM posts WHERE slug = ? AND published = 1',
    ['/insights/' + slug]
  )
  if (!post) return { title: 'Post Not Found', robots: { index: false } }
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://genranq.com'
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${base}/insights/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${base}/insights/${slug}`,
      type: 'article',
      siteName: 'Gen Ranq',
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await queryOne<PostRow>(
    'SELECT * FROM posts WHERE slug = ? AND published = 1',
    ['/insights/' + slug]
  )

  if (!post) {
    return (
      <>
        <Topbar text="Free SEO audit" linkText="Book →" linkHref="/contact" />
        <Nav active="insights" />
        <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
          <h1>Post not found.</h1>
          <Link href="/insights" className="btn btn-ghost" style={{ marginTop: 24 }}>Back to Insights</Link>
        </div>
        <Footer />
      </>
    )
  }

  const related = await query<PostRow>(
    'SELECT slug, tag, title, author, created_at, cover_gradient FROM posts WHERE published = 1 AND id != ? ORDER BY created_at DESC LIMIT 3',
    [post.id]
  )

  const postDate = new Date(post.created_at)
  const dateStr = postDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <>
      <Topbar text="New insights published weekly." linkText="Read →" linkHref="/insights" />
      <Nav active="insights" />

      <header className="article-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {post.tag}
          </div>
          <span className="article-tag">{post.tag}</span>
          <h1>{post.title}</h1>
          <p className="article-meta-desc">{post.description}</p>
          <div className="article-author-row">
            <div className="article-author-avatar">{post.author.charAt(0)}</div>
            <div>
              <div className="article-author-name">{post.author}</div>
              <div className="article-author-info">{dateStr} &middot; {post.read_time} read</div>
            </div>
          </div>
        </div>
      </header>

      <BlogPostClient html={post.content || ''} />

      {related.length > 0 && (
        <section className="section" style={{ background: 'var(--surface)' }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <h2>Related <em>reading.</em></h2>
            </div>
            <div className="posts-grid">
              {related.map(r => {
                const rSlug = r.slug.replace('/insights/', '')
                const rDate = new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                return (
                  <Link href={`/insights/${rSlug}`} key={r.id} className="post-link">
                    <article className="post reveal">
                      <div className={`img ${r.cover_gradient || 'g2'}`}><span className="label">{r.tag.charAt(0)}</span></div>
                      <span className="tag">{r.tag}</span>
                      <h3>{r.title}</h3>
                      <div className="meta">
                        <span className="author">{r.author}</span>
                        <span className="dot"></span><span>{rDate}</span>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <BigCta heading="Free audit." em="No deck." text="30 minutes with a senior strategist. Useful even if you never hire us." btnText="Book your free audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
