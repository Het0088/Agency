import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import InsightsContent from './InsightsContent'
import { query } from '@/lib/db'

export const metadata: Metadata = { title: 'Insights — Omniranq' }

export const dynamic = 'force-dynamic'

type PostRow = {
  slug: string
  cover_gradient: string
  tag: string
  title: string
  description: string
  author: string
  created_at: string
  read_time: string
  featured: number
}

export default async function InsightsPage() {
  let posts: PostRow[] = []
  let featuredPost: PostRow | null = null

  try {
    posts = await query<PostRow>(
      'SELECT slug, cover_gradient, tag, title, description, author, created_at, read_time, featured FROM posts WHERE published = 1 ORDER BY created_at DESC LIMIT 50'
    )
    featuredPost = posts.find(p => p.featured) || posts[0] || null
  } catch {
    posts = []
  }

  const mapped = posts.map(p => ({
    slug: p.slug.replace('/insights/', ''),
    gradient: p.cover_gradient || 'g1',
    label: p.tag.charAt(0).toUpperCase(),
    tag: p.tag,
    title: p.title,
    desc: p.description || '',
    author: p.author,
    date: formatReadable(p.created_at, p.read_time),
  }))

  const feat = featuredPost ? {
    slug: featuredPost.slug.replace('/insights/', ''),
    tag: featuredPost.tag,
    title: featuredPost.title,
    desc: featuredPost.description || '',
    author: featuredPost.author,
    date: formatReadable(featuredPost.created_at, featuredPost.read_time),
    readTime: featuredPost.read_time,
  } : null

  return (
    <>
      <Topbar text="New insights published weekly." linkText="Subscribe →" linkHref="#newsletter" />
      <Nav active="insights" />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Insights</div>
          <h1>Field notes from <em>the search era.</em></h1>
          <p>Long-form essays, playbooks, and teardowns from our strategists. Written for operators who want to understand how search actually works in 2026 &mdash; not for ranking on &quot;what is SEO.&quot;</p>
        </div>
      </header>

      <InsightsContent posts={mapped} featured={feat} />
      <Footer />
    </>
  )
}

function formatReadable(dateStr: string, readTime: string): string {
  const d = new Date(dateStr)
  const month = d.toLocaleDateString('en-US', { month: 'short' })
  const day = d.getDate()
  return `${month} ${day} · ${readTime} read`
}
