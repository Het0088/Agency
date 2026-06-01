import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getTokenValue, getCookieName } from '@/lib/auth'

const MAX_AGE = 60 * 60 * 24 * 7

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password.trim() : ''
  const expected = process.env.ADMIN_PASSWORD || 'Valga@123'

  if (password !== expected) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }

  const jar = await cookies()
  jar.set(getCookieName(), getTokenValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const jar = await cookies()
  jar.delete(getCookieName())
  return NextResponse.json({ ok: true })
}
