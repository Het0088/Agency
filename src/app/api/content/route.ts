import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const API_KEY = process.env.CONTENT_API_KEY || 'omniranq-n8n-secret'

const DATA_DIR = path.join(process.cwd(), 'src', 'data')

function authenticate(req: NextRequest): boolean {
  const key = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '')
  return key === API_KEY
}

function sanitize(val: unknown): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, 2000).replace(/[<>]/g, '')
}

function readFile(name: string) {
  const filePath = path.join(DATA_DIR, name)
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeFile(name: string, data: unknown[]) {
  const filePath = path.join(DATA_DIR, name)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'articles'
  const limit = Math.min(Number(searchParams.get('limit') || 10), 50)

  const fileName = type === 'blogs' ? 'blogs.json' : 'articles.json'
  const items = readFile(fileName)
  const sorted = items.sort((a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date))

  return NextResponse.json({ items: sorted.slice(0, limit), total: sorted.length })
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

  const type = (body.type as string) || 'articles'
  const fileName = type === 'blogs' ? 'blogs.json' : 'articles.json'

  const id = sanitize(body.id) || sanitize(body.title)?.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80)
  const title = sanitize(body.title)
  const tag = sanitize(body.tag)
  const desc = sanitize(body.desc)
  const author = sanitize(body.author)
  const read = sanitize(body.read)
  const slug = sanitize(body.slug) || `/insights/${id}`
  const date = sanitize(body.date) || new Date().toISOString().slice(0, 10)

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 422 })
  }

  const entry = { id, tag, title, desc, author, date, read, slug }

  const items = readFile(fileName)
  const existingIdx = items.findIndex((i: { id: string }) => i.id === id)

  if (existingIdx >= 0) {
    items[existingIdx] = { ...items[existingIdx], ...entry }
  } else {
    items.unshift(entry)
  }

  writeFile(fileName, items)

  return NextResponse.json({ ok: true, entry, total: items.length })
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

  const type = (body.type as string) || 'articles'
  const id = sanitize(body.id)
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 422 })
  }

  const fileName = type === 'blogs' ? 'blogs.json' : 'articles.json'
  const items = readFile(fileName)
  const filtered = items.filter((i: { id: string }) => i.id !== id)

  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
  }

  writeFile(fileName, filtered)

  return NextResponse.json({ ok: true, removed: id, total: filtered.length })
}
