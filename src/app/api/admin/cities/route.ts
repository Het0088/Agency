import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { query, queryOne } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const CITIES_FILE = path.join(process.cwd(), 'src', 'data', 'cities.json')

function readLocalCities(): any[] {
  try {
    if (fs.existsSync(CITIES_FILE)) {
      return JSON.parse(fs.readFileSync(CITIES_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

function writeLocalCities(data: any[]) {
  try {
    fs.writeFileSync(CITIES_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write local cities:', err)
  }
}

function sanitize(val: unknown, maxLen = 2000): string {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLen)
}

function makeSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 150)
}

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS cities (
    slug VARCHAR(200) PRIMARY KEY,
    city_name VARCHAR(200) NOT NULL,
    state VARCHAR(100) DEFAULT '',
    country VARCHAR(100) NOT NULL DEFAULT 'United States',
    service VARCHAR(200) NOT NULL DEFAULT 'SEO Services',
    hero_heading TEXT,
    hero_subheading TEXT,
    description TEXT,
    meta_title VARCHAR(500),
    meta_description TEXT,
    phone VARCHAR(50),
    address VARCHAR(500),
    population VARCHAR(20),
    local_keywords TEXT,
    testimonial_name VARCHAR(200),
    testimonial_role VARCHAR(200),
    testimonial_quote TEXT,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (active),
    INDEX idx_country_state (country, state),
    INDEX idx_service (service)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

const HEADER_MAP: Record<string, string> = {
  slug: 'slug', city: 'city_name', cityname: 'city_name', city_name: 'city_name',
  state: 'state', country: 'country', service: 'service',
  hero_heading: 'hero_heading', heroheading: 'hero_heading', herotitle: 'hero_heading',
  hero_subheading: 'hero_subheading', herosubheading: 'hero_subheading', herosub: 'hero_subheading',
  description: 'description', meta_title: 'meta_title', metatitle: 'meta_title',
  meta_description: 'meta_description', metadescription: 'meta_description',
  phone: 'phone', address: 'address', population: 'population',
  local_keywords: 'local_keywords', localkeywords: 'local_keywords',
  testimonial_name: 'testimonial_name', testimonialname: 'testimonial_name',
  testimonial_role: 'testimonial_role', testimonialrole: 'testimonial_role',
  testimonial_quote: 'testimonial_quote', testimonialquote: 'testimonial_quote',
}

function normalizeKey(raw: string): string {
  const clean = raw.toLowerCase().replace(/[\s\-]+/g, '_').replace(/[^a-z_]/g, '')
  return HEADER_MAP[clean] || clean
}

export async function GET(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await query(CREATE_TABLE, [])
    const rows = await query('SELECT * FROM cities ORDER BY country, state, city_name', [])
    return NextResponse.json({ cities: rows, dbConnected: true })
  } catch {
    const list = readLocalCities()
    return NextResponse.json({
      cities: list,
      dbConnected: false,
      dbWarning: 'Using local file storage.'
    })
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('multipart/form-data')) {
    try {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv',
      ]
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!allowedTypes.includes(file.type) && !['xlsx', 'xls', 'csv'].includes(ext || '')) {
        return NextResponse.json({ error: 'Only .xlsx, .xls, or .csv files allowed' }, { status: 400 })
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const workbook = XLSX.read(buffer, { type: 'buffer' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const raw = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '' })

      if (!raw.length) return NextResponse.json({ error: 'Empty spreadsheet' }, { status: 400 })

      let inserted = 0
      let updated = 0
      let skipped = 0

      const localList = readLocalCities()

      for (const row of raw) {
        const normalized: Record<string, string> = {}
        for (const [k, v] of Object.entries(row)) {
          normalized[normalizeKey(k)] = String(v).trim()
        }

        const cityName = normalized.city_name
        if (!cityName) { skipped++; continue }

        const slug = normalized.slug || makeSlug(cityName + (normalized.state ? '-' + normalized.state : ''))

        try {
          await query(CREATE_TABLE, [])
          const existing = await query<{ slug: string }>('SELECT slug FROM cities WHERE slug = ?', [slug])
          if (existing.length) {
            await query(
              `UPDATE cities SET city_name=?, state=?, country=?, service=?, hero_heading=?, hero_subheading=?,
               description=?, meta_title=?, meta_description=?, phone=?, address=?, population=?,
               local_keywords=?, testimonial_name=?, testimonial_role=?, testimonial_quote=?
               WHERE slug=?`,
              [
                cityName, normalized.state || '', normalized.country || 'United States', normalized.service || 'SEO Services',
                normalized.hero_heading || '', normalized.hero_subheading || '', normalized.description || '',
                normalized.meta_title || '', normalized.meta_description || '', normalized.phone || '',
                normalized.address || '', normalized.population || '', normalized.local_keywords || '',
                normalized.testimonial_name || '', normalized.testimonial_role || '', normalized.testimonial_quote || '',
                slug
              ]
            )
            updated++
          } else {
            await query(
              `INSERT INTO cities (slug, city_name, state, country, service, hero_heading, hero_subheading,
               description, meta_title, meta_description, phone, address, population,
               local_keywords, testimonial_name, testimonial_role, testimonial_quote, active)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
              [
                slug, cityName, normalized.state || '', normalized.country || 'United States', normalized.service || 'SEO Services',
                normalized.hero_heading || '', normalized.hero_subheading || '', normalized.description || '',
                normalized.meta_title || '', normalized.meta_description || '', normalized.phone || '',
                normalized.address || '', normalized.population || '', normalized.local_keywords || '',
                normalized.testimonial_name || '', normalized.testimonial_role || '', normalized.testimonial_quote || ''
              ]
            )
            inserted++
          }
        } catch {
          // Local fallback
          const idx = localList.findIndex(c => c.slug === slug)
          const record = {
            slug,
            city_name: cityName,
            state: normalized.state || '',
            country: normalized.country || 'United States',
            service: normalized.service || 'SEO Services',
            hero_heading: normalized.hero_heading || '',
            hero_subheading: normalized.hero_subheading || '',
            description: normalized.description || '',
            meta_title: normalized.meta_title || '',
            meta_description: normalized.meta_description || '',
            phone: normalized.phone || '',
            address: normalized.address || '',
            population: normalized.population || '',
            local_keywords: normalized.local_keywords || '',
            testimonial_name: normalized.testimonial_name || '',
            testimonial_role: normalized.testimonial_role || '',
            testimonial_quote: normalized.testimonial_quote || '',
            active: true
          }
          if (idx >= 0) {
            localList[idx] = record
            updated++
          } else {
            localList.push(record)
            inserted++
          }
        }
      }

      writeLocalCities(localList)
      return NextResponse.json({ ok: true, inserted, updated, skipped, total: raw.length })
    } catch {
      return NextResponse.json({ error: 'Spreadsheet import failed' }, { status: 500 })
    }
  }

  let body: Record<string, unknown>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const cityName = sanitize(body.city_name, 200)
  if (!cityName) return NextResponse.json({ error: 'city_name required' }, { status: 422 })

  const slug = sanitize(body.slug, 200) || makeSlug(cityName + (body.state ? '-' + String(body.state) : ''))

  try {
    await query(CREATE_TABLE, [])
    await query(
      `INSERT INTO cities (slug, city_name, state, country, service, hero_heading, hero_subheading,
       description, meta_title, meta_description, phone, address, population,
       local_keywords, testimonial_name, testimonial_role, testimonial_quote, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         city_name=VALUES(city_name), state=VALUES(state), country=VALUES(country),
         service=VALUES(service), hero_heading=VALUES(hero_heading), hero_subheading=VALUES(hero_subheading),
         description=VALUES(description), meta_title=VALUES(meta_title), meta_description=VALUES(meta_description),
         phone=VALUES(phone), address=VALUES(address), population=VALUES(population),
         local_keywords=VALUES(local_keywords), testimonial_name=VALUES(testimonial_name),
         testimonial_role=VALUES(testimonial_role), testimonial_quote=VALUES(testimonial_quote),
         active=VALUES(active), updated_at=CURRENT_TIMESTAMP`,
      [
        slug,
        cityName,
        sanitize(body.state, 100),
        sanitize(body.country, 100) || 'United States',
        sanitize(body.service, 200) || 'SEO Services',
        sanitize(body.hero_heading, 2000),
        sanitize(body.hero_subheading, 2000),
        sanitize(body.description, 5000),
        sanitize(body.meta_title, 500),
        sanitize(body.meta_description, 2000),
        sanitize(body.phone, 50),
        sanitize(body.address, 500),
        sanitize(body.population, 20),
        sanitize(body.local_keywords, 2000),
        sanitize(body.testimonial_name, 200),
        sanitize(body.testimonial_role, 200),
        sanitize(body.testimonial_quote, 2000),
        body.active === false ? 0 : 1,
      ]
    )
  } catch {
    const list = readLocalCities()
    const idx = list.findIndex(c => c.slug === slug)
    const rec = {
      slug,
      city_name: cityName,
      state: sanitize(body.state, 100),
      country: sanitize(body.country, 100) || 'United States',
      service: sanitize(body.service, 200) || 'SEO Services',
      hero_heading: sanitize(body.hero_heading, 2000),
      hero_subheading: sanitize(body.hero_subheading, 2000),
      description: sanitize(body.description, 5000),
      meta_title: sanitize(body.meta_title, 500),
      meta_description: sanitize(body.meta_description, 2000),
      phone: sanitize(body.phone, 50),
      address: sanitize(body.address, 500),
      population: sanitize(body.population, 20),
      local_keywords: sanitize(body.local_keywords, 2000),
      testimonial_name: sanitize(body.testimonial_name, 200),
      testimonial_role: sanitize(body.testimonial_role, 200),
      testimonial_quote: sanitize(body.testimonial_quote, 2000),
      active: body.active !== false,
      updated_at: new Date().toISOString()
    }
    if (idx >= 0) list[idx] = rec
    else list.unshift(rec)
    writeLocalCities(list)
  }

  return NextResponse.json({ ok: true, slug })
}

export async function PUT(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const slug = sanitize(body.slug, 200)
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 422 })

  const fields: string[] = []
  const params: (string | number)[] = []

  const allowed: [string, string, number][] = [
    ['city_name', 'city_name', 200],
    ['state', 'state', 100],
    ['country', 'country', 100],
    ['service', 'service', 200],
    ['hero_heading', 'hero_heading', 2000],
    ['hero_subheading', 'hero_subheading', 2000],
    ['description', 'description', 5000],
    ['meta_title', 'meta_title', 500],
    ['meta_description', 'meta_description', 2000],
    ['phone', 'phone', 50],
    ['address', 'address', 500],
    ['population', 'population', 20],
    ['local_keywords', 'local_keywords', 2000],
    ['testimonial_name', 'testimonial_name', 200],
    ['testimonial_role', 'testimonial_role', 200],
    ['testimonial_quote', 'testimonial_quote', 2000],
  ]

  for (const [bodyKey, col, maxLen] of allowed) {
    if (body[bodyKey] !== undefined) {
      fields.push(`${col} = ?`)
      params.push(sanitize(body[bodyKey], maxLen))
    }
  }

  if (body.active !== undefined) {
    fields.push('active = ?')
    params.push(body.active ? 1 : 0)
  }

  if (!fields.length) return NextResponse.json({ error: 'Nothing to update' }, { status: 422 })

  try {
    params.push(slug)
    await query(`UPDATE cities SET ${fields.join(', ')} WHERE slug = ?`, params)
  } catch {
    const list = readLocalCities()
    const idx = list.findIndex(c => c.slug === slug)
    if (idx >= 0) {
      list[idx] = {
        ...list[idx],
        ...body,
        updated_at: new Date().toISOString()
      }
      writeLocalCities(list)
    }
  }

  return NextResponse.json({ ok: true, slug })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthenticated(req.headers.get('cookie'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const slug = sanitize(body.slug, 200)
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 422 })

  try {
    await query('DELETE FROM cities WHERE slug = ?', [slug])
  } catch {
    const list = readLocalCities()
    writeLocalCities(list.filter(c => c.slug !== slug))
  }

  return NextResponse.json({ ok: true, removed: slug })
}
