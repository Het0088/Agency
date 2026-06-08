import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

export interface CityRow {
  city: string
  slug: string
  state: string
  country: string
  service: string
  title: string
  heroHeading: string
  heroSubheading: string
  description: string
  metaTitle: string
  metaDescription: string
  phone: string
  address: string
  population: string
  localKeywords: string
  testimonialName: string
  testimonialRole: string
  testimonialQuote: string
}

const EXCEL_PATH = path.join(process.cwd(), 'data', 'cities.xlsx')
const JSON_CACHE_PATH = path.join(process.cwd(), 'data', '.cities-cache.json')

let memoryCache: CityRow[] | null = null

function normalizeHeaders(raw: string): string {
  const map: Record<string, string> = {
    city: 'city', slug: 'slug', state: 'state', country: 'country',
    service: 'service', title: 'title',
    hero_heading: 'heroHeading', heroheading: 'heroHeading',
    hero_subheading: 'heroSubheading', herosubheading: 'heroSubheading',
    description: 'description',
    meta_title: 'metaTitle', metatitle: 'metaTitle',
    meta_description: 'metaDescription', metadescription: 'metaDescription',
    phone: 'phone', address: 'address', population: 'population',
    local_keywords: 'localKeywords', localkeywords: 'localKeywords',
    testimonial_name: 'testimonialName', testimonialname: 'testimonialName',
    testimonial_role: 'testimonialRole', testimonialrole: 'testimonialRole',
    testimonial_quote: 'testimonialQuote', testimonialquote: 'testimonialQuote',
  }
  const key = raw.toLowerCase().replace(/[\s\-]+/g, '_').replace(/[^a-z_]/g, '')
  return map[key] || key
}

function parseExcel(): CityRow[] {
  if (!fs.existsSync(EXCEL_PATH)) return []
  const wb = XLSX.readFile(EXCEL_PATH)
  const sheet = wb.Sheets[wb.SheetNames[0]]
  const raw = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '' })

  return raw.map(row => {
    const normalized: Record<string, string> = {}
    for (const [k, v] of Object.entries(row)) {
      normalized[normalizeHeaders(k)] = String(v).trim()
    }
    return normalized as unknown as CityRow
  }).filter(r => r.slug && r.city)
}

function loadFromFile(): CityRow[] {
  if (memoryCache) return memoryCache

  if (fs.existsSync(EXCEL_PATH)) {
    const excelMtime = fs.statSync(EXCEL_PATH).mtimeMs
    if (fs.existsSync(JSON_CACHE_PATH)) {
      const cacheMtime = fs.statSync(JSON_CACHE_PATH).mtimeMs
      if (cacheMtime >= excelMtime) {
        const cached = JSON.parse(fs.readFileSync(JSON_CACHE_PATH, 'utf-8'))
        memoryCache = cached
        return cached
      }
    }
    const parsed = parseExcel()
    fs.writeFileSync(JSON_CACHE_PATH, JSON.stringify(parsed, null, 2))
    memoryCache = parsed
    return parsed
  }

  if (fs.existsSync(JSON_CACHE_PATH)) {
    const cached = JSON.parse(fs.readFileSync(JSON_CACHE_PATH, 'utf-8'))
    memoryCache = cached
    return cached
  }

  const fallback = getFallbackCities()
  memoryCache = fallback
  return fallback
}

function dbRowToCityRow(r: Record<string, string>): CityRow {
  return {
    city: r.city_name || '',
    slug: r.slug || '',
    state: r.state || '',
    country: r.country || '',
    service: r.service || 'SEO Services',
    title: r.meta_title || `${r.service || 'SEO Services'} in ${r.city_name}`,
    heroHeading: r.hero_heading || '',
    heroSubheading: r.hero_subheading || '',
    description: r.description || '',
    metaTitle: r.meta_title || '',
    metaDescription: r.meta_description || '',
    phone: r.phone || '',
    address: r.address || '',
    population: r.population || '',
    localKeywords: r.local_keywords || '',
    testimonialName: r.testimonial_name || '',
    testimonialRole: r.testimonial_role || '',
    testimonialQuote: r.testimonial_quote || '',
  }
}

async function loadFromDb(): Promise<CityRow[]> {
  try {
    const { query } = await import('./db')
    const rows = await query<Record<string, string>>(
      'SELECT * FROM cities WHERE active = 1 ORDER BY country, state, city_name',
      []
    )
    return rows.map(dbRowToCityRow)
  } catch {
    return []
  }
}

async function loadFromDbBySlug(slug: string): Promise<CityRow | null> {
  try {
    const { queryOne } = await import('./db')
    const row = await queryOne<Record<string, string>>(
      'SELECT * FROM cities WHERE slug = ? AND active = 1',
      [slug]
    )
    return row ? dbRowToCityRow(row) : null
  } catch {
    return null
  }
}

export function getAllCities(): CityRow[] {
  return loadFromFile()
}

export async function getAllCitiesAsync(): Promise<CityRow[]> {
  const dbCities = await loadFromDb()
  if (dbCities.length) return dbCities
  return loadFromFile()
}

export function getCityBySlug(slug: string): CityRow | undefined {
  return loadFromFile().find(c => c.slug === slug)
}

export async function getCityBySlugAsync(slug: string): Promise<CityRow | undefined> {
  const dbCity = await loadFromDbBySlug(slug)
  if (dbCity) return dbCity
  return loadFromFile().find(c => c.slug === slug)
}

export function getAllSlugs(): string[] {
  return loadFromFile().map(c => c.slug)
}

export function getCitiesByService(service: string): CityRow[] {
  return loadFromFile().filter(c => c.service?.toLowerCase() === service.toLowerCase())
}

export function getCitiesByCountry(country: string): CityRow[] {
  return loadFromFile().filter(c => c.country?.toLowerCase() === country.toLowerCase())
}

function getFallbackCities(): CityRow[] {
  return [
    { city: 'Mumbai', slug: 'seo-services-mumbai', state: 'Maharashtra', country: 'India', service: 'SEO Services', title: 'SEO Services in Mumbai', heroHeading: 'SEO agency in Mumbai.', heroSubheading: 'We help Mumbai businesses rank higher, get found in AI search, and grow revenue with data-driven SEO.', description: 'Mumbai\'s commercial capital is intensely competitive online. From Bandra boutiques to Andheri SaaS companies, we help Mumbai businesses rank where it matters.', metaTitle: 'SEO Agency in Mumbai — Omniranq', metaDescription: 'Expert SEO services in Mumbai. We help small businesses rank higher and grow revenue. 412% average traffic growth. Free audit.', phone: '+91 80 4567 4242', address: 'WeWork BKC, Mumbai 400051', population: '20.7M', localKeywords: 'Mumbai SEO agency, SEO services Mumbai, best SEO company Mumbai', testimonialName: 'Rajesh Mehta', testimonialRole: 'Founder, TechVault Mumbai', testimonialQuote: 'They took us from page 4 to the top 3 in 6 months. Revenue from organic is up 340%.' },
    { city: 'Delhi', slug: 'seo-services-delhi', state: 'Delhi', country: 'India', service: 'SEO Services', title: 'SEO Services in Delhi', heroHeading: 'SEO agency in Delhi.', heroSubheading: 'Helping Delhi businesses dominate search results with strategy-first SEO that drives real revenue.', description: 'Delhi\'s sprawling market means local search is everything. From Connaught Place consultancies to Gurgaon startups, proper SEO determines who gets found.', metaTitle: 'SEO Agency in Delhi — Omniranq', metaDescription: 'Expert SEO services in Delhi NCR. Technical SEO, content strategy, and link building that grows revenue. Free audit.', phone: '+91 11 4567 4242', address: 'Connaught Place, New Delhi 110001', population: '16.8M', localKeywords: 'Delhi SEO agency, SEO services Delhi, best SEO company Delhi NCR', testimonialName: 'Priya Sharma', testimonialRole: 'CMO, LearnPath Delhi', testimonialQuote: 'Their technical SEO work fixed issues three other agencies missed. Organic traffic doubled in 4 months.' },
    { city: 'Ahmedabad', slug: 'seo-services-ahmedabad', state: 'Gujarat', country: 'India', service: 'SEO Services', title: 'SEO Services in Ahmedabad', heroHeading: 'SEO agency in Ahmedabad.', heroSubheading: 'Strategic SEO for Ahmedabad businesses that want to grow beyond word-of-mouth.', description: 'Ahmedabad\'s entrepreneurial energy is unmatched — but most businesses here rely on referrals alone. SEO opens a channel that compounds month after month.', metaTitle: 'SEO Agency in Ahmedabad — Omniranq', metaDescription: 'SEO services in Ahmedabad. Technical SEO, content, and link building for Gujarat businesses. Free audit.', phone: '+91 79 4567 4242', address: 'SG Highway, Ahmedabad 380015', population: '8.6M', localKeywords: 'Ahmedabad SEO agency, SEO services Ahmedabad, SEO company Gujarat', testimonialName: 'Karan Patel', testimonialRole: 'Director, TextilePro Ahmedabad', testimonialQuote: 'We went from zero online presence to 50+ qualified leads per month from Google.' },
    { city: 'Vadodara', slug: 'seo-services-vadodara', state: 'Gujarat', country: 'India', service: 'SEO Services', title: 'SEO Services in Vadodara', heroHeading: 'SEO agency in Vadodara.', heroSubheading: 'Data-driven SEO that puts Vadodara businesses on the map — literally.', description: 'Vadodara businesses punch above their weight. We help them show up for the searches that matter — local and national.', metaTitle: 'SEO Agency in Vadodara — Omniranq', metaDescription: 'SEO services in Vadodara. Local SEO, technical audits, and content strategy for Vadodara businesses. Free audit.', phone: '+91 265 456 4242', address: 'Alkapuri, Vadodara 390007', population: '2.1M', localKeywords: 'Vadodara SEO agency, SEO services Vadodara, SEO company Baroda', testimonialName: 'Sneha Desai', testimonialRole: 'Owner, FreshBite Vadodara', testimonialQuote: 'Our local searches went from 20 to 400 per month. The ROI has been incredible.' },
    { city: 'Surat', slug: 'seo-services-surat', state: 'Gujarat', country: 'India', service: 'SEO Services', title: 'SEO Services in Surat', heroHeading: 'SEO agency in Surat.', heroSubheading: 'Helping Surat\'s diamond and textile hub shine online with search-first strategy.', description: 'Surat is one of India\'s fastest-growing cities. Businesses here need SEO that matches their ambition — not cookie-cutter packages.', metaTitle: 'SEO Agency in Surat — Omniranq', metaDescription: 'Expert SEO services in Surat. We help Surat businesses rank higher, drive traffic, and grow revenue. Free audit.', phone: '+91 261 456 4242', address: 'Vesu, Surat 395007', population: '7.8M', localKeywords: 'Surat SEO agency, SEO services Surat, best SEO company Surat', testimonialName: 'Amit Shah', testimonialRole: 'CEO, DiamondTech Surat', testimonialQuote: 'From invisible to #1 for our primary keyword. The content strategy was exceptional.' },
    { city: 'Melbourne', slug: 'seo-services-melbourne', state: 'Victoria', country: 'Australia', service: 'SEO Services', title: 'SEO Services in Melbourne', heroHeading: 'SEO agency in Melbourne.', heroSubheading: 'Melbourne\'s most competitive businesses trust us to drive organic growth.', description: 'Melbourne is home to one of Australia\'s most competitive small business landscapes. From Fitzroy cafes to South Yarra boutiques, local SEO determines who gets found first.', metaTitle: 'SEO Agency in Melbourne — Omniranq', metaDescription: 'Expert SEO services in Melbourne. 412% average traffic growth. Free audit for Melbourne businesses.', phone: '+61 3 9000 4242', address: 'Level 4, 22 Brunswick St, Fitzroy VIC 3065', population: '5.2M', localKeywords: 'Melbourne SEO agency, SEO services Melbourne, local SEO Melbourne', testimonialName: 'Sarah Chen', testimonialRole: 'Founder, Luminary Studio Melbourne', testimonialQuote: 'They understand Melbourne\'s market. Our bookings from search are up 280%.' },
    { city: 'London', slug: 'seo-services-london', state: '', country: 'United Kingdom', service: 'SEO Services', title: 'SEO Services in London', heroHeading: 'SEO agency in London.', heroSubheading: 'Senior-only SEO delivery for London businesses that refuse to settle for templates.', description: 'London\'s market is saturated with agencies — but most deliver PDFs, not results. We bring senior-only delivery to a city that deserves better.', metaTitle: 'SEO Agency in London — Omniranq', metaDescription: 'Expert SEO services in London. Technical SEO, content, and link building for London businesses. Free audit.', phone: '+44 20 4525 4242', address: '17 Curtain Road, Shoreditch EC2A 3LT', population: '9.0M', localKeywords: 'London SEO agency, SEO services London, best SEO company London', testimonialName: 'James Wright', testimonialRole: 'MD, Finch & Partners London', testimonialQuote: 'The best SEO investment we\'ve made. ROI was clear within 3 months.' },
    { city: 'Dubai', slug: 'seo-services-dubai', state: '', country: 'UAE', service: 'SEO Services', title: 'SEO Services in Dubai', heroHeading: 'SEO agency in Dubai.', heroSubheading: 'Dominate English and Arabic SERPs in the fastest-growing market on earth.', description: 'Dubai\'s rapid growth means new businesses appear daily — and the ones with strong search presence win.', metaTitle: 'SEO Agency in Dubai — Omniranq', metaDescription: 'Expert SEO services in Dubai. We help Dubai businesses rank higher in English and Arabic search. Free audit.', phone: '+971 4 567 4242', address: 'DIFC, Dubai', population: '3.5M', localKeywords: 'Dubai SEO agency, SEO services Dubai, best SEO company UAE', testimonialName: 'Omar Hassan', testimonialRole: 'Founder, LuxeStay Dubai', testimonialQuote: 'They delivered results faster than any agency we\'ve worked with in the region.' },
  ]
}
