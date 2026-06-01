const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'Valga@123'
const COOKIE_NAME = 'omniranq_admin'

export function getTokenValue(): string {
  return Buffer.from(ADMIN_PASS).toString('base64')
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
