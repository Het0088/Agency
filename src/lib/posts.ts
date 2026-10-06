import { query, queryOne } from '@/lib/db'
import fs from 'fs'
import path from 'path'

export type PostRecord = {
  id: string
  type: 'article' | 'blog' | 'news'
  tag: string
  title: string
  description: string
  content: string
  author: string
  read_time: string
  slug: string
  cover_gradient: string
  cover_image?: string
  featured: number | boolean
  published: number | boolean
  created_at: string
  updated_at: string
}


const POSTS_FILE = path.join(process.cwd(), 'src', 'data', 'posts.json')

function readFallbackPosts(): PostRecord[] {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

export async function getAllPublishedPosts(limit = 50): Promise<PostRecord[]> {
  try {
    const rows = await query<PostRecord>(
      'SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC LIMIT ?',
      [limit]
    )
    if (rows && rows.length) return rows
  } catch {
    // ignore
  }
  const fallback = readFallbackPosts()
  return fallback
    .filter(p => Boolean(p.published))
    .slice(0, limit)
}

export async function getPostBySlug(slug: string): Promise<PostRecord | null> {
  const normalized = slug.startsWith('/insights/') ? slug : '/insights/' + slug.replace(/^\//, '')
  try {
    const row = await queryOne<PostRecord>(
      'SELECT * FROM posts WHERE (slug = ? OR slug = ?) AND published = 1',
      [normalized, slug]
    )
    if (row) return row
  } catch {
    // ignore
  }
  const fallback = readFallbackPosts()
  const found = fallback.find(p => (p.slug === normalized || p.slug === slug) && Boolean(p.published))
  return found || null
}

export async function getRelatedPosts(excludeId: string, limit = 3): Promise<PostRecord[]> {
  try {
    const rows = await query<PostRecord>(
      'SELECT * FROM posts WHERE published = 1 AND id != ? ORDER BY created_at DESC LIMIT ?',
      [excludeId, limit]
    )
    if (rows && rows.length) return rows
  } catch {
    // ignore
  }
  const fallback = readFallbackPosts()
  return fallback
    .filter(p => p.id !== excludeId && Boolean(p.published))
    .slice(0, limit)
}
