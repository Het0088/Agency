import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const POPUPS_FILE = path.join(process.cwd(), 'src', 'data', 'popups.json')

export function readLocalPopups(): any[] {
  try {
    if (fs.existsSync(POPUPS_FILE)) {
      return JSON.parse(fs.readFileSync(POPUPS_FILE, 'utf-8'))
    }
  } catch (err) {
    console.error('Error reading popups:', err)
  }
  return []
}

export async function GET() {
  try {
    const popups = readLocalPopups()
    const active = popups.filter((p: any) => p.enabled)
    return NextResponse.json({ popups: active }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load popups', popups: [] }, { status: 500 })
  }
}
