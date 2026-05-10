import { MetadataRoute } from 'next'
import { getAllCitySlugs } from '@/data/cities'

const BASE = 'https://westrivedesign.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/services', '/insights', '/contact'].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }))

  const cityPages = getAllCitySlugs().map(slug => ({
    url: `${BASE}/seo/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...cityPages]
}
