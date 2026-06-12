import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query, queryOne } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { pageMetas } from '@/lib/page-metas'

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS page_meta (
    route VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL DEFAULT '',
    description TEXT,
    canonical VARCHAR(500),
    og_title VARCHAR(500),
    og_description TEXT,
    og_image VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`

function dbErr(e: unknown) {
  const msg = e instanceof Error ? e.message : 'Database error'
  const isConn = msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND')
  return NextResponse.json(
    { error: isConn ? 'Database not connected — set DB_HOST in .env.local' : msg },
    { status: 503 }
  )
}

function staticPages(map: Record<string, Record<string, string>> = {}) {
  return pageMetas
    .filter(p => !p.route.includes('['))
    .map(p => ({
      route: p.route,
      label: p.label,
      filePath: p.filePath,
      note: p.note || null,
      title: map[p.route]?.title || p.fields.title,
      description: map[p.route]?.description || p.fields.description,
      canonical: map[p.route]?.canonical || p.fields.canonical,
      og_title: map[p.route]?.og_title || p.fields.ogTitle || p.fields.title,
      og_description: map[p.route]?.og_description || p.fields.ogDescription || p.fields.description,
      og_image: map[p.route]?.og_image || '',
      saved: !!map[p.route],
    }))
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await query(CREATE_TABLE, [])
    const rows = await query<Record<string, string>>('SELECT * FROM page_meta', [])
    const map: Record<string, Record<string, string>> = {}
    for (const row of rows) map[row.route] = row
    return NextResponse.json({ pages: staticPages(map) })
  } catch (e) {
    const full = String(e) + (e instanceof Error ? ' ' + e.message : '')
    const isConn = full.includes('ECONNREFUSED') || full.includes('ENOTFOUND') || full.includes('ETIMEDOUT') || full.includes('AggregateError')
    return NextResponse.json({
      pages: staticPages(),
      dbWarning: isConn
        ? 'Database not connected. Connect your Hostinger MySQL to enable saving.'
        : (e instanceof Error ? e.message : 'Database error'),
    })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, string>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { route, title, description, canonical, og_title, og_description, og_image } = body
  if (!route || !title) return NextResponse.json({ error: 'route and title required' }, { status: 422 })

  try {
    await query(CREATE_TABLE, [])
    await query(
      `INSERT INTO page_meta (route, title, description, canonical, og_title, og_description, og_image)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title=VALUES(title), description=VALUES(description), canonical=VALUES(canonical),
         og_title=VALUES(og_title), og_description=VALUES(og_description), og_image=VALUES(og_image),
         updated_at=CURRENT_TIMESTAMP`,
      [route, title, description || '', canonical || '', og_title || title, og_description || description || '', og_image || '']
    )
    revalidatePath(route)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return dbErr(e)
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { route: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  try {
    await query('DELETE FROM page_meta WHERE route = ?', [body.route])
    revalidatePath(body.route)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return dbErr(e)
  }
}
