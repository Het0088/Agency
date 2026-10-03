import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query, queryOne } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { pageMetas } from '@/lib/page-metas'
import fs from 'fs'
import path from 'path'

const META_FILE = path.join(process.cwd(), 'src', 'data', 'page-meta.json')

function readLocalMeta(): Record<string, Record<string, string>> {
  try {
    if (fs.existsSync(META_FILE)) {
      return JSON.parse(fs.readFileSync(META_FILE, 'utf-8'))
    }
  } catch {}
  return {}
}

function writeLocalMeta(data: Record<string, Record<string, string>>) {
  try {
    fs.writeFileSync(META_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write local meta:', err)
  }
}

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
    return NextResponse.json({ pages: staticPages(map), dbConnected: true })
  } catch {
    const local = readLocalMeta()
    return NextResponse.json({
      pages: staticPages(local),
      dbConnected: false,
      dbWarning: 'Using local file storage.'
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
  } catch {
    // Local fallback
    const local = readLocalMeta()
    local[route] = {
      route,
      title,
      description: description || '',
      canonical: canonical || '',
      og_title: og_title || title,
      og_description: og_description || description || '',
      og_image: og_image || '',
    }
    writeLocalMeta(local)
  }

  try { revalidatePath(route) } catch {}
  return NextResponse.json({ ok: true })
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
  } catch {
    const local = readLocalMeta()
    delete local[body.route]
    writeLocalMeta(local)
  }

  try { revalidatePath(body.route) } catch {}
  return NextResponse.json({ ok: true })
}
