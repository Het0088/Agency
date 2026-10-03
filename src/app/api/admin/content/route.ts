import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { query } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import { defaultContent } from '@/lib/content-blocks'
import fs from 'fs'
import path from 'path'

const CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'page-content.json')

function readLocalContent(): Record<string, Record<string, string>> {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'))
    }
  } catch {}
  return {}
}

function writeLocalContent(data: Record<string, Record<string, string>>) {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write local content:', err)
  }
}

const pageRoutes: Record<string, string[]> = {
  '/': ['/', '/sitemap.xml'],
  '/about': ['/about'],
  '/contact': ['/contact'],
  '/services': ['/services'],
  '/services/seo': ['/services/seo'],
  '/services/ai-search': ['/services/ai-search'],
  '/services/content-marketing': ['/services/content-marketing'],
  '/services/link-building': ['/services/link-building'],
  '/services/ppc': ['/services/ppc'],
  '/services/social-media': ['/services/social-media'],
  '/services/analytics': ['/services/analytics'],
  '/services/web-design': ['/services/web-design'],
  '/insights': ['/insights'],
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
    // Local fallback overlay
    const local = readLocalContent()
    for (const [page, blocks] of Object.entries(local)) {
      if (!result[page]) result[page] = {}
      for (const [k, v] of Object.entries(blocks)) {
        result[page][k] = v
      }
    }
    return NextResponse.json({ blocks: result, dbConnected: false, dbWarning: 'Using local file storage.' })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const page = typeof body.page === 'string' ? body.page : ''
  if (!page) return NextResponse.json({ error: 'page required' }, { status: 422 })

  // Support both bulk blocks and single block update
  const blocksToSave: Record<string, string> = {}
  if (body.blocks && typeof body.blocks === 'object') {
    for (const [k, v] of Object.entries(body.blocks as Record<string, unknown>)) {
      blocksToSave[k] = typeof v === 'string' ? v : String(v ?? '')
    }
  } else if (typeof body.key === 'string') {
    blocksToSave[body.key] = typeof body.content === 'string' ? body.content : String(body.content ?? '')
  }

  if (!Object.keys(blocksToSave).length) {
    return NextResponse.json({ error: 'No content blocks provided' }, { status: 422 })
  }

  try {
    await query(CREATE_TABLE, [])
    for (const [key, content] of Object.entries(blocksToSave)) {
      await query(
        `INSERT INTO page_content (page, block_key, content) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE content = VALUES(content), updated_at = CURRENT_TIMESTAMP`,
        [page, key, content]
      )
    }
  } catch {
    // Local fallback
    const local = readLocalContent()
    if (!local[page]) local[page] = {}
    for (const [k, v] of Object.entries(blocksToSave)) {
      local[page][k] = v
    }
    writeLocalContent(local)
  }

  const paths = pageRoutes[page] || [`/${page.replace(/^\//, '')}`]
  for (const p of paths) {
    try { revalidatePath(p) } catch {}
  }

  return NextResponse.json({ ok: true, savedCount: Object.keys(blocksToSave).length })
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
  } catch {
    const local = readLocalContent()
    delete local[body.page]
    writeLocalContent(local)
  }

  return NextResponse.json({ ok: true })
}
