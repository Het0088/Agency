import crypto from 'crypto'

const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Valga@123'
const COOKIE_NAME = 'omniranq_admin'
const HMAC_SECRET = process.env.HMAC_SECRET || 'omniranq-session-key-2026'

export function getTokenValue(): string {
  return crypto.createHmac('sha256', HMAC_SECRET).update(ADMIN_PASS).digest('hex')
}

export function getCookieName(): string {
  return COOKIE_NAME
}

export function isAuthenticated(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false
  const token = getTokenValue()
  const match = cookieHeader.split(';').find(c => c.trim().startsWith(COOKIE_NAME + '='))
  if (!match) return false
  return match.split('=')[1]?.trim() === token
}
