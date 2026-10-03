import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query, queryOne } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

function sanitize(val: unknown, maxLen = 2000): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLen)
}

function makeSlug(title: string): string {
  return '/insights/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

function makeId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 100)
}

const GRADIENTS = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6']

const POSTS_FILE = path.join(process.cwd(), 'src', 'data', 'posts.json')

function readLocalPosts(): any[] {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

function writeLocalPosts(data: any[]) {
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write local posts:', err)
  }
}

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(100) PRIMARY KEY,
    type VARCHAR(20) NOT NULL DEFAULT 'article',
    tag VARCHAR(100) NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    content MEDIUMTEXT,
    author VARCHAR(200) NOT NULL DEFAULT 'Gen Ranq Team',
    read_time VARCHAR(50) DEFAULT '5 min',
    slug VARCHAR(200) NOT NULL UNIQUE,
    cover_gradient VARCHAR(20) DEFAULT 'g1',
    featured TINYINT(1) DEFAULT 0,
    published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type_pub (type, published),
    INDEX idx_slug (slug),
    INDEX idx_created (created_at DESC)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const limit = Math.min(Number(searchParams.get('limit') || 50), 100)
  const authed = isAuthenticated(req.headers.get('cookie'))
  const drafts = searchParams.get('drafts') === '1' && authed

  try {
    await query(CREATE_TABLE, [])
    let sql = 'SELECT * FROM posts'
    const params: (string | number | boolean | null)[] = []
    const conditions: string[] = []

    if (type === 'article' || type === 'blog') {
      conditions.push('type = ?')
      params.push(type)
    }

    if (!drafts) {
      conditions.push('published = 1')
    }

    if (conditions.length) {
      sql += ' WHERE ' + conditions.join(' AND ')
    }

    sql += ' ORDER BY created_at DESC LIMIT ?'
    params.push(limit)

    const rows = await query(sql, params)
    return NextResponse.json({ items: rows, total: rows.length, dbConnected: true })
  } catch {
    // Local fallback
    const all = readLocalPosts()
    const filtered = all.filter(p => {
      const matchType = !type || p.type === type
      const matchPub = drafts || p.published === 1 || p.published === true
      return matchType && matchPub
    })
    return NextResponse.json({
      items: filtered.slice(0, limit),
      total: filtered.length,
      dbConnected: false,
      dbWarning: 'Using local file storage.'
    })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const title = sanitize(body.title, 500)
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 422 })
  }

  const id = sanitize(body.id, 100) || makeId(title)
  const type = body.type === 'blog' ? 'blog' : 'article'
  const tag = sanitize(body.tag, 100)
  const description = sanitize(body.description, 5000)
  const content = typeof body.content === 'string' ? body.content.slice(0, 500000) : ''
  const author = sanitize(body.author, 200) || 'Gen Ranq Team'
  const readTime = sanitize(body.read_time || body.readTime, 50) || '5 min read'
  const slug = sanitize(body.slug, 200) || makeSlug(title)
  const coverGradient = GRADIENTS.includes(String(body.cover_gradient)) ? String(body.cover_gradient) : 'g1'
  const featured = body.featured ? 1 : 0
  const published = body.published === false ? 0 : 1

  try {
    await query(CREATE_TABLE, [])
    const existing = await queryOne('SELECT id FROM posts WHERE id = ?', [id])
    if (existing) {
      await query(
        `UPDATE posts SET type=?, tag=?, title=?, description=?, content=?, author=?, read_time=?, slug=?, cover_gradient=?, featured=?, published=? WHERE id=?`,
        [type, tag, title, description, content, author, readTime, slug, coverGradient, featured, published, id]
      )
    } else {
      await query(
        `INSERT INTO posts (id, type, tag, title, description, content, author, read_time, slug, cover_gradient, featured, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, type, tag, title, description, content, author, readTime, slug, coverGradient, featured, published]
      )
    }
  } catch {
    // Local fallback
    const list = readLocalPosts()
    const now = new Date().toISOString()
    const idx = list.findIndex(p => p.id === id || p.slug === slug)
    const newRecord = {
      id, type, tag, title, description, content, author,
      read_time: readTime, slug, cover_gradient: coverGradient,
      featured, published,
      created_at: idx >= 0 ? list[idx].created_at : now,
      updated_at: now
    }
    if (idx >= 0) list[idx] = newRecord
    else list.unshift(newRecord)
    writeLocalPosts(list)
  }

  try { revalidatePath('/insights'); revalidatePath(slug) } catch {}
  return NextResponse.json({ ok: true, id })
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const id = sanitize(body.id, 100)
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 422 })
  }

  try {
    const existing = await queryOne('SELECT * FROM posts WHERE id = ?', [id])
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const fields: string[] = []
    const params: (string | number | boolean | null)[] = []

    const allowed: [string, string, number][] = [
      ['type', 'type', 10],
      ['tag', 'tag', 100],
      ['title', 'title', 500],
      ['description', 'description', 5000],
      ['author', 'author', 200],
      ['read_time', 'read_time', 50],
      ['slug', 'slug', 200],
      ['cover_gradient', 'cover_gradient', 10],
    ]

    for (const [bodyKey, col, maxLen] of allowed) {
      if (body[bodyKey] !== undefined) {
        fields.push(`${col} = ?`)
        params.push(sanitize(body[bodyKey], maxLen))
      }
    }

    if (body.content !== undefined) {
      fields.push('content = ?')
      params.push(typeof body.content === 'string' ? body.content.slice(0, 500000) : '')
    }

    if (body.featured !== undefined) {
      fields.push('featured = ?')
      params.push(body.featured ? 1 : 0)
    }

    if (body.published !== undefined) {
      fields.push('published = ?')
      params.push(body.published ? 1 : 0)
    }

    if (fields.length) {
      params.push(id)
      await query(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`, params)
    }
  } catch {
    // Local fallback
    const list = readLocalPosts()
    const idx = list.findIndex(p => p.id === id)
    if (idx >= 0) {
      const p = list[idx]
      list[idx] = {
        ...p,
        ...(body.type !== undefined ? { type: body.type } : {}),
        ...(body.tag !== undefined ? { tag: sanitize(body.tag, 100) } : {}),
        ...(body.title !== undefined ? { title: sanitize(body.title, 500) } : {}),
        ...(body.description !== undefined ? { description: sanitize(body.description, 5000) } : {}),
        ...(body.content !== undefined ? { content: body.content } : {}),
        ...(body.author !== undefined ? { author: sanitize(body.author, 200) } : {}),
        ...(body.read_time !== undefined ? { read_time: sanitize(body.read_time, 50) } : {}),
        ...(body.slug !== undefined ? { slug: sanitize(body.slug, 200) } : {}),
        ...(body.cover_gradient !== undefined ? { cover_gradient: body.cover_gradient } : {}),
        ...(body.featured !== undefined ? { featured: body.featured ? 1 : 0 } : {}),
        ...(body.published !== undefined ? { published: body.published ? 1 : 0 } : {}),
        updated_at: new Date().toISOString()
      }
      writeLocalPosts(list)
    }
  }

  try { revalidatePath('/insights') } catch {}
  return NextResponse.json({ ok: true, id })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const id = sanitize(body.id, 100)
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 422 })
  }

  try {
    await query('DELETE FROM posts WHERE id = ?', [id])
  } catch {
    // Local fallback
    const list = readLocalPosts()
    writeLocalPosts(list.filter(p => p.id !== id))
  }

  try { revalidatePath('/insights') } catch {}
  return NextResponse.json({ ok: true, removed: id })
}
