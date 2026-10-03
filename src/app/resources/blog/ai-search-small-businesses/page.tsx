import type { Metadata } from 'next'
import BlogArticleClient from '../BlogArticleClient'

export const metadata: Metadata = {
  title: 'AI Search for Small Businesses: What Gets You Cited vs What Gets You Ignored | GENRANQ Blog',
  description: 'A forensic teardown of how ChatGPT, Google AI Overviews, Perplexity, and Claude select sources to cite — and the 4 structural changes small businesses must make to get recommended.',
  alternates: { canonical: 'https://genranq.com/resources/blog/ai-search-small-businesses' },
}

export default function BlogSlugPage() {
  return <BlogArticleClient />
}
