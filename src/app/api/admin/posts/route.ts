import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

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

function dbError(e: unknown) {
  const msg = e instanceof Error ? e.message : 'Database error'
  const isConn = msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND')
  return NextResponse.json(
    { error: isConn ? 'Database not connected. Set DB_HOST in .env.local to your Hostinger MySQL host.' : msg, items: [], total: 0 },
    { status: 503 }
  )
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const limit = Math.min(Number(searchParams.get('limit') || 50), 100)
  const drafts = searchParams.get('drafts') === '1'

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

  try {
    const rows = await query(sql, params)
    return NextResponse.json({ items: rows, total: rows.length })
  } catch (e) {
    return dbError(e)
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
  const author = sanitize(body.author, 200)
  const readTime = sanitize(body.read_time || body.readTime, 50)
  const slug = sanitize(body.slug, 200) || makeSlug(title)
  const coverGradient = GRADIENTS.includes(String(body.cover_gradient)) ? String(body.cover_gradient) : GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
  const featured = body.featured ? 1 : 0
  const published = body.published === false ? 0 : 1

  try {
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
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    return dbError(e)
  }
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

    if (!fields.length) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 422 })
    }

    params.push(id)
    await query(`UPDATE posts SET ${fields.join(', ')} WHERE id = ?`, params)

    return NextResponse.json({ ok: true, id })
  } catch (e) {
    return dbError(e)
  }
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
    const result = await query('DELETE FROM posts WHERE id = ?', [id])
    const affected = (result as unknown as { affectedRows?: number })?.affectedRows
    if (!affected) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, removed: id })
  } catch (e) {
    return dbError(e)
  }
}
