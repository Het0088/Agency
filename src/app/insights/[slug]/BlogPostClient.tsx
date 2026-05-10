'use client'

import TableOfContents from '@/components/TableOfContents'

type ContentBlock = { type: 'h2' | 'h3' | 'p' | 'ul'; text: string; items?: string[] }

export default function BlogPostClient({ post }: { post: { content: ContentBlock[] } }) {
  return (
    <article className="article-layout">
      <div className="wrap">
        <TableOfContents />
        <div className="article-body">
          {post.content.map((block, i) => {
            switch (block.type) {
              case 'h2':
                return <h2 key={i} id={`heading-${i}`}>{block.text}</h2>
              case 'h3':
                return <h3 key={i} id={`heading-${i}`}>{block.text}</h3>
              case 'p':
                return <p key={i}>{block.text}</p>
              case 'ul':
                return (
                  <ul key={i}>
                    {block.items?.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )
              default:
                return null
            }
          })}

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
