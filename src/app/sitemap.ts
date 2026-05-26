import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/cities'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://omniranq.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/seo',
    '/services/ai-search',
    '/services/content-marketing',
    '/services/ppc',
    '/services/social-media',
    '/services/web-design',
    '/services/link-building',
    '/services/analytics',
    '/insights',
    '/contact',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : path.startsWith('/services/') ? 0.85 : 0.8,
  }))

  const cityPages = getAllSlugs().map(slug => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...cityPages]
}
