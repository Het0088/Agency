import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY
    if (!key) return null
    _resend = new Resend(key)
  }
  return _resend
}
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'hello@westrivedesign.com'

const RATE_LIMIT = new Map<string, number>()
const RATE_WINDOW = 60_000
const MAX_PER_WINDOW = 3

function sanitize(val: unknown): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, 2000).replace(/[<>]/g, '')
}

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function checkRate(ip: string): boolean {
  const now = Date.now()
  const last = RATE_LIMIT.get(ip)
  if (last && now - last < RATE_WINDOW / MAX_PER_WINDOW) return false
  RATE_LIMIT.set(ip, now)
  if (RATE_LIMIT.size > 10000) {
    const cutoff = now - RATE_WINDOW
    for (const [k, v] of RATE_LIMIT) { if (v < cutoff) RATE_LIMIT.delete(k) }
  }
  return true
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)

  if (!checkRate(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = sanitize(body.name)
  const email = sanitize(body.email)
  const company = sanitize(body.company)
  const website = sanitize(body.website)
  const service = sanitize(body.service)
  const budget = sanitize(body.budget)
  const message = sanitize(body.message)
  const honeypot = sanitize(body.fax_number)

  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  if (!name || name.length < 2) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 })
  }
  if (!email || !validateEmail(email)) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 422 })
  }

  const timestamp = new Date().toISOString()

  try {
    const resend = getResend()
    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured. Please email us directly.' }, { status: 503 })
    }
    await resend.emails.send({
      from: 'We Strive Design <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name} — ${company || 'No company'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0e1410">
          <h2 style="margin:0 0 24px;font-size:24px;font-weight:500">New project enquiry</h2>
          <table style="width:100%;border-collapse:collapse;font-size:15px">
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;color:#5a6166;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;font-weight:500">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;color:#5a6166">Email</td><td style="padding:10px 0;border-bottom:1px solid #e8e3d6"><a href="mailto:${email}" style="color:#ff5a1f">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;color:#5a6166">Company</td><td style="padding:10px 0;border-bottom:1px solid #e8e3d6">${company || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;color:#5a6166">Website</td><td style="padding:10px 0;border-bottom:1px solid #e8e3d6">${website ? `<a href="${website}" style="color:#ff5a1f">${website}</a>` : '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;color:#5a6166">Service</td><td style="padding:10px 0;border-bottom:1px solid #e8e3d6">${service || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #e8e3d6;color:#5a6166">Budget</td><td style="padding:10px 0;border-bottom:1px solid #e8e3d6"><strong>${budget || '—'}</strong></td></tr>
          </table>
          ${message ? `<div style="margin:24px 0 0;padding:20px;background:#faf7f0;border:1px solid #e8e3d6;border-radius:12px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8b9097;margin-bottom:8px">Message</div><div style="font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</div></div>` : ''}
          <div style="margin:24px 0 0;font-size:12px;color:#8b9097">Submitted at ${timestamp} from ${ip}</div>
        </div>
      `,
    })
  } catch (err) {
    console.error('[CONTACT] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again or email us directly.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
