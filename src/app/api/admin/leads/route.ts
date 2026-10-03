import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const LEADS_FILE = path.join(process.cwd(), 'src', 'data', 'leads.json')

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    company VARCHAR(255),
    website VARCHAR(255),
    service VARCHAR(255),
    budget VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at DESC)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

function readFallbackLeads() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'))
    }
  } catch {
    // ignore
  }
  return []
}

function writeFallbackLeads(leads: unknown[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write leads file:', err)
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await query(CREATE_TABLE, [])
    const leads = await query('SELECT * FROM leads ORDER BY created_at DESC', [])
    return NextResponse.json({ leads, total: leads.length, fromDb: true })
  } catch {
    const leads = readFallbackLeads()
    return NextResponse.json({ leads, total: leads.length, fromDb: false, dbWarning: 'Database not connected, reading local storage.' })
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, status } = await req.json()
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 })
    }

    try {
      await query('UPDATE leads SET status = ? WHERE id = ?', [status, id])
    } catch {
      // Fallback
      const leads = readFallbackLeads()
      const updated = leads.map((l: { id: string }) => l.id === id ? { ...l, status } : l)
      writeFallbackLeads(updated)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    try {
      await query('DELETE FROM leads WHERE id = ?', [id])
    } catch {
      const leads = readFallbackLeads()
      const filtered = leads.filter((l: { id: string }) => l.id !== id)
      writeFallbackLeads(filtered)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 })
  }
}
