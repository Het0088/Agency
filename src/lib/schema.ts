import { CityRow } from './cities'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://genranq.com'

export function buildLocalBusinessSchema(city: CityRow) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `GENRANQ — ${city.service} ${city.city}`,
    description: city.metaDescription || city.description,
    url: `${BASE_URL}/${city.slug}`,
    telephone: city.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: city.address,
      addressLocality: city.city,
      addressRegion: city.state,
      addressCountry: city.country,
    },
    areaServed: {
      '@type': 'City',
      name: city.city,
    },
    serviceType: city.service || 'Search Engine Optimization',
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  }
}

export function buildBreadcrumbSchema(city: CityRow) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: `${city.service} in ${city.city}`, item: `${BASE_URL}/${city.slug}` },
    ],
  }
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function buildArticleSchema(post: {
  title: string
  description?: string
  author: string
  created_at: string
  updated_at?: string
  slug: string
  cover_image?: string
}) {
  const url = post.slug.startsWith('http') ? post.slug : `${BASE_URL}${post.slug.startsWith('/') ? '' : '/'}${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.title,
    image: post.cover_image || `${BASE_URL}/logo.png`,
    author: {
      '@type': 'Person',
      name: post.author || 'GENRANQ Strategist',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GENRANQ Software LLP',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function buildGlossaryTermSchema(term: {
  title: string
  shortDef: string
  slug: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.shortDef,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'GENRANQ SEO & AI Search Glossary',
      url: `${BASE_URL}/glossary`,
    },
    url: `${BASE_URL}/glossary/${term.slug}`,
  }
}

export function buildNewsArticleSchema(news: {
  title: string
  description: string
  publishedDate: string
  url: string
  image?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.description,
    image: news.image || `${BASE_URL}/logo.png`,
    datePublished: news.publishedDate,
    dateModified: news.publishedDate,
    author: {
      '@type': 'Organization',
      name: news.author || 'GENRANQ Communications',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GENRANQ Software LLP',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': news.url.startsWith('http') ? news.url : `${BASE_URL}${news.url}`,
    },
  }
}

