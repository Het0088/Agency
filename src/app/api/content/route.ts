import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'

const API_KEY = process.env.CONTENT_API_KEY || 'omniranq-n8n-secret'

function authenticate(req: NextRequest): boolean {
  const key = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '')
  return key === API_KEY
}

function sanitize(val: unknown, maxLen = 2000): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLen).replace(/[<>]/g, '')
}

function makeId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') === 'blogs' ? 'blog' : 'article'
  const limit = Math.min(Number(searchParams.get('limit') || 10), 50)

  try {
    const items = await query(
      'SELECT id, tag, title, description AS `desc`, author, created_at AS date, read_time AS `read`, slug FROM posts WHERE type = ? AND published = 1 ORDER BY created_at DESC LIMIT ?',
      [type, limit]
    )
    return NextResponse.json({ items, total: items.length })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database error'
    return NextResponse.json({ error: msg, items: [], total: 0 }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const type = (body.type as string) === 'blogs' ? 'blog' : 'article'
  const title = sanitize(body.title, 500)
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 422 })
  }

  const id = sanitize(body.id, 100) || makeId(title)
  const tag = sanitize(body.tag, 100)
  const description = sanitize(body.desc || body.description, 5000)
  const content = typeof body.content === 'string' ? body.content.slice(0, 500000) : ''
  const author = sanitize(body.author, 200)
  const readTime = sanitize(body.read || body.read_time, 50)
  const slug = sanitize(body.slug, 200) || `/insights/${id}`
  const date = sanitize(body.date, 30) || new Date().toISOString().slice(0, 10)

  try {
    const existing = await queryOne('SELECT id FROM posts WHERE id = ?', [id])

    if (existing) {
      await query(
        'UPDATE posts SET type=?, tag=?, title=?, description=?, content=?, author=?, read_time=?, slug=?, created_at=? WHERE id=?',
        [type, tag, title, description, content, author, readTime, slug, date, id]
      )
    } else {
      await query(
        'INSERT INTO posts (id, type, tag, title, description, content, author, read_time, slug, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, type, tag, title, description, content, author, readTime, slug, date]
      )
    }

    const total = await query('SELECT COUNT(*) as cnt FROM posts WHERE type = ?', [type])
    return NextResponse.json({ ok: true, entry: { id, tag, title, description, author, date, read: readTime, slug }, total: (total[0] as { cnt: number }).cnt })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database error'
    return NextResponse.json({ error: msg }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const id = sanitize(body.id, 100)
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 422 })
  }

  try {
    const result = await query('DELETE FROM posts WHERE id = ?', [id])
    const affected = (result as unknown as { affectedRows?: number })?.affectedRows
    if (!affected) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, removed: id })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Database error'
    return NextResponse.json({ error: msg }, { status: 503 })
  }
}
