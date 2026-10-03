import type { Metadata } from 'next'
import BlogArticleClient from '@/app/resources/blog/BlogArticleClient'

export const metadata: Metadata = {
  title: 'AI Search for Small Businesses: What Gets You Cited vs What Gets You Ignored | GENRANQ Insights',
  description: 'A forensic teardown of how ChatGPT, Google AI Overviews, Perplexity, and Claude select sources to cite — and the 4 structural changes small businesses must make to get recommended.',
  alternates: { canonical: 'https://genranq.com/insights/ai-search-small-businesses' },
  openGraph: {
    title: 'AI Search for Small Businesses: What Gets You Cited vs What Gets You Ignored | GENRANQ Insights',
    description: 'A forensic teardown of how ChatGPT, Google AI Overviews, Perplexity, and Claude select sources to cite — and the 4 structural changes small businesses must make to get recommended.',
    url: 'https://genranq.com/insights/ai-search-small-businesses',
    type: 'article',
  },
}

export default function AiSearchArticlePage() {
  return <BlogArticleClient />
}
