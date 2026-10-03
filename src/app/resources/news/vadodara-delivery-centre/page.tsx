import type { Metadata } from 'next'
import NewsArticleClient from '../NewsArticleClient'

export const metadata: Metadata = {
  title: 'GENRANQ Crosses 120 Engineers and Opens New Delivery Centre in Vadodara | GENRANQ News',
  description: 'GENRANQ Software LLP announces the opening of its state-of-the-art 18,000 sq ft delivery centre in Vadodara, Gujarat, expanding engineering capacity past 120 full-time specialists.',
  alternates: { canonical: 'https://genranq.com/resources/news/vadodara-delivery-centre' },
  openGraph: {
    title: 'GENRANQ Crosses 120 Engineers and Opens New Delivery Centre in Vadodara | GENRANQ News',
    description: 'GENRANQ Software LLP announces the opening of its state-of-the-art 18,000 sq ft delivery centre in Vadodara, Gujarat, expanding engineering capacity past 120 full-time specialists.',
    url: 'https://genranq.com/resources/news/vadodara-delivery-centre',
    type: 'article',
  },
}

export default function VadodaraNewsPage() {
  return <NewsArticleClient />
}
