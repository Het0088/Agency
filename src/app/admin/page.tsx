import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import AdminDashboard from './AdminDashboard'
import { getTokenValue, getCookieName } from '@/lib/auth'

export const metadata: Metadata = { title: 'Admin', robots: 'noindex, nofollow' }

export default async function AdminPage() {
  const jar = await cookies()
  const token = jar.get(getCookieName())?.value
  const authenticated = token === getTokenValue()

  return <AdminDashboard authenticated={authenticated} />
}
