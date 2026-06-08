import { MetadataRoute } from 'next'
import { getCities } from '@/lib/excel'
import { getAllCities } from '@/lib/cities'
import { getSubServiceSlugs } from '@/lib/services-data'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://omniranq.com'
const NOW = new Date().toISOString().split('T')[0]

async function getPublishedPosts(): Promise<{ slug: string; created_at: string }[]> {
  try {
    const { query } = await import('@/lib/db')
    return await query<{ slug: string; created_at: string }>(
      'SELECT slug, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC'
    )
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/about', priority: 0.8, freq: 'monthly' as const },
    { path: '/services', priority: 0.9, freq: 'weekly' as const },
    { path: '/services/seo', priority: 0.85, freq: 'weekly' as const },
    { path: '/services/ai-search', priority: 0.85, freq: 'weekly' as const },
    { path: '/services/content-marketing', priority: 0.85, freq: 'monthly' as const },
    { path: '/services/ppc', priority: 0.85, freq: 'monthly' as const },
    { path: '/services/social-media', priority: 0.85, freq: 'monthly' as const },
    { path: '/services/web-design', priority: 0.85, freq: 'monthly' as const },
    { path: '/services/link-building', priority: 0.85, freq: 'monthly' as const },
    { path: '/services/analytics', priority: 0.85, freq: 'monthly' as const },
    { path: '/insights', priority: 0.8, freq: 'daily' as const },
    { path: '/contact', priority: 0.7, freq: 'monthly' as const },
  ].map(p => ({
    url: `${BASE}${p.path}`,
    lastModified: NOW,
    changeFrequency: p.freq,
    priority: p.priority,
  }))

  const subServicePages = getSubServiceSlugs().map(([category, slug]) => ({
    url: `${BASE}/services/${category}/${slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const posts = await getPublishedPosts()
  const postPages = posts.map(p => {
    const postSlug = p.slug.startsWith('/insights/') ? p.slug : `/insights/${p.slug}`
    const modified = p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : NOW
    return {
      url: `${BASE}${postSlug}`,
      lastModified: modified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const seenSlugs = new Set<string>()

  const primaryCityPages = getAllCities().map(city => {
    seenSlugs.add(city.slug)
    return {
      url: `${BASE}/${city.slug}`,
      lastModified: NOW,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const excelCityPages = getCities()
    .filter(city => !seenSlugs.has(city.slug))
    .map(city => ({
      url: `${BASE}/seo/${city.slug}`,
      lastModified: NOW,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...subServicePages, ...postPages, ...primaryCityPages, ...excelCityPages]
}
