import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { defaultContent } from '@/lib/content-blocks'

const pageRoutes: Record<string, string[]> = {
  home: ['/', '/sitemap.xml'],
  about: ['/about'],
  contact: ['/contact'],
  services: ['/services'],
}

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS page_content (
    page VARCHAR(255) NOT NULL,
    block_key VARCHAR(100) NOT NULL,
    content TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (page, block_key)
  )
`

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const uniquePages = [...new Set(defaultContent.map(b => b.page))]
  const result: Record<string, Record<string, string>> = {}

  for (const p of uniquePages) {
    result[p] = {}
    for (const b of defaultContent.filter(x => x.page === p)) {
      result[p][b.key] = b.value
    }
  }

  try {
    await query(CREATE_TABLE, [])
    const rows = await query<{ page: string; block_key: string; content: string }>('SELECT * FROM page_content', [])
    for (const row of rows) {
      if (result[row.page]) result[row.page][row.block_key] = row.content
    }
    return NextResponse.json({ blocks: result, dbConnected: true })
  } catch {
    return NextResponse.json({ blocks: result, dbConnected: false, dbWarning: 'Database not connected. Showing defaults. Saves will not persist.' })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { page: string; key: string; content: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  if (!body.page || !body.key) return NextResponse.json({ error: 'page and key required' }, { status: 422 })

  try {
    await query(CREATE_TABLE, [])
    await query(
      `INSERT INTO page_content (page, block_key, content) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE content = VALUES(content), updated_at = CURRENT_TIMESTAMP`,
      [body.page, body.key, body.content || '']
    )
    const paths = pageRoutes[body.page] || [`/${body.page}`]
    for (const p of paths) revalidatePath(p)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Database error' }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { page: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  try {
    await query('DELETE FROM page_content WHERE page = ?', [body.page])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Database error' }, { status: 503 })
  }
}
