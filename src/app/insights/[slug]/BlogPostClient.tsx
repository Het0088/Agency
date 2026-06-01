'use client'

import TableOfContents from '@/components/TableOfContents'

export default function BlogPostClient({ html }: { html: string }) {
  return (
    <article className="article-layout">
      <div className="wrap">
        <TableOfContents />
        <div className="article-body">
          <div dangerouslySetInnerHTML={{ __html: html }} />

          <div className="article-cta-inline">
            <h3>Get your free AI search audit</h3>
            <p>See where your brand stands in ChatGPT, Gemini, and Perplexity. 30 minutes, no obligation.</p>
            <a href="/contact" className="btn btn-primary btn-sm">Book a call</a>
          </div>
        </div>
      </div>
    </article>
  )
}
