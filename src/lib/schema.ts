import { CityRow } from './cities'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://omniranq.com'

export function buildLocalBusinessSchema(city: CityRow) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Omniranq — ${city.service} ${city.city}`,
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
