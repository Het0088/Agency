import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { readLocalPopups } from '@/app/api/popups/route'

const POPUPS_FILE = path.join(process.cwd(), 'src', 'data', 'popups.json')

function writeLocalPopups(data: any[]) {
  try {
    fs.writeFileSync(POPUPS_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write popups file:', err)
  }
}

export async function GET() {
  const popups = readLocalPopups()
  return NextResponse.json({ popups, total: popups.length })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body || !body.id) {
      return NextResponse.json({ error: 'Popup id is required' }, { status: 400 })
    }

    const popups = readLocalPopups()
    const now = new Date().toISOString()
    const idx = popups.findIndex((p: any) => p.id === body.id)

    const updated = {
      ...body,
      updatedAt: now,
      createdAt: idx >= 0 ? popups[idx].createdAt || now : now,
    }

    if (idx >= 0) {
      popups[idx] = updated
    } else {
      popups.unshift(updated)
    }

    writeLocalPopups(popups)
    return NextResponse.json({ ok: true, popup: updated })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save popup' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const id = body?.id
    if (!id) {
      return NextResponse.json({ error: 'Popup ID required' }, { status: 400 })
    }

    const popups = readLocalPopups()
    const filtered = popups.filter((p: any) => p.id !== id)
    writeLocalPopups(filtered)
    return NextResponse.json({ ok: true, removed: id })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 })
  }
}
