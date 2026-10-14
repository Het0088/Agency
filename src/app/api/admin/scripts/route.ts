import { NextRequest, NextResponse } from 'next/server'
import { getSiteScripts, saveSiteScripts, type SiteScripts } from '@/lib/site-scripts'
import { isAuthenticated } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const scripts = await getSiteScripts()
  return NextResponse.json(scripts)
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = (await req.json()) as Partial<SiteScripts>
    const current = await getSiteScripts()
    const updated: SiteScripts = {
      head_code: body.head_code !== undefined ? body.head_code : current.head_code,
      body_code: body.body_code !== undefined ? body.body_code : current.body_code,
      footer_code: body.footer_code !== undefined ? body.footer_code : current.footer_code,
    }

    await saveSiteScripts(updated)
    return NextResponse.json({ ok: true, scripts: updated })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save scripts' }, { status: 500 })
  }
}
