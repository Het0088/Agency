import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import {
  getAllGlossaryTerms,
  saveGlossaryTerm,
  deleteGlossaryTerm,
  type GlossaryTerm,
} from '@/lib/glossary'

export async function GET(req: NextRequest) {
  try {
    const terms = await getAllGlossaryTerms()
    return NextResponse.json({ terms })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to fetch glossary terms' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    if (!body.title) {
      return NextResponse.json({ error: 'Term title is required' }, { status: 400 })
    }

    const slug = (body.slug || body.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const newTerm: GlossaryTerm = {
      id: body.id || `gl_${Date.now()}`,
      title: body.title.trim(),
      slug,
      letter: (body.title.trim()[0] || 'A').toUpperCase(),
      category: body.category || 'AI Search',
      shortDef: body.shortDef || '',
      synonyms: body.synonyms || '',
      content: body.content || '',
      related: Array.isArray(body.related) ? body.related : [],
      autoLink: Boolean(body.autoLink),
      published: body.published !== false,
      updatedAt: new Date().toISOString(),
    }

    const saved = await saveGlossaryTerm(newTerm)
    return NextResponse.json({ ok: true, term: saved }, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to create term' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    if (!body.id || !body.title) {
      return NextResponse.json({ error: 'Term id and title are required' }, { status: 400 })
    }

    const slug = (body.slug || body.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const updatedTerm: GlossaryTerm = {
      id: body.id,
      title: body.title.trim(),
      slug,
      letter: (body.title.trim()[0] || 'A').toUpperCase(),
      category: body.category || 'AI Search',
      shortDef: body.shortDef || '',
      synonyms: body.synonyms || '',
      content: body.content || '',
      related: Array.isArray(body.related) ? body.related : [],
      autoLink: Boolean(body.autoLink),
      published: body.published !== false,
      updatedAt: new Date().toISOString(),
    }

    const saved = await saveGlossaryTerm(updatedTerm)
    return NextResponse.json({ ok: true, term: saved })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to update term' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    if (!body.id) {
      return NextResponse.json({ error: 'Term id is required' }, { status: 400 })
    }

    const ok = await deleteGlossaryTerm(body.id)
    if (!ok) {
      return NextResponse.json({ error: 'Term not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Failed to delete term' },
      { status: 500 }
    )
  }
}
