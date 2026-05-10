import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import BlogPostClient from './BlogPostClient'

const posts: Record<string, {
  title: string
  meta: string
  tag: string
  author: string
  role: string
  date: string
  readTime: string
  content: { type: 'h2' | 'h3' | 'p' | 'ul'; text: string; items?: string[] }[]
  related: { tag: string; title: string; author: string; date: string; slug: string }[]
}> = {
  'ai-search-playbook-2026': {
    title: 'The 2026 AI Search Playbook: how to get cited inside ChatGPT, Perplexity, and Google AIO.',
    meta: 'A deep-dive on Generative Engine Optimization — what works in 2026, what\'s already obsolete, and the exact 12-step audit we run for every client.',
    tag: 'AI Search',
    author: 'Tom\u00E1s Beltr\u00E1n',
    role: 'Head of AI Search',
    date: 'May 4, 2026',
    readTime: '18 min read',
    content: [
      { type: 'p', text: 'The way people find information online has fundamentally changed. Large language models now mediate discovery for millions of users daily, and the brands that appear in those AI-generated answers are capturing attention, trust, and revenue that used to flow through traditional search results.' },
      { type: 'h2', text: 'Why AI search matters for your brand' },
      { type: 'p', text: 'Google AI Overviews now appear on over 40% of informational queries. ChatGPT Search handles millions of queries per day. Perplexity has grown from zero to 100M monthly active users in under 18 months. The pattern is clear: AI-mediated discovery is no longer experimental. It is the primary channel for a growing share of your potential customers.' },
      { type: 'p', text: 'The brands that get cited in these AI answers enjoy a compound advantage. Each citation reinforces entity recognition across models, making future citations more likely. This is the new flywheel, and it rewards early movers disproportionately.' },
      { type: 'h2', text: 'The 12-step GEO audit framework' },
      { type: 'p', text: 'Over the past 18 months, we have run this audit for 140+ clients across B2B SaaS, e-commerce, local services, and professional services verticals. These are the exact steps we follow, in order.' },
      { type: 'h3', text: 'Step 1: Entity baseline assessment' },
      { type: 'p', text: 'Before optimizing anything, we establish your current entity footprint. We query each major LLM with your brand name, your founder names, and your core product terms, documenting what each model knows and where the gaps are.' },
      { type: 'ul', text: '', items: ['Query ChatGPT, Gemini, Perplexity, and Claude with 15-20 brand-specific prompts', 'Document citation sources for each response', 'Map entity attributes each model has associated with your brand', 'Score overall entity completeness on a 0-100 scale'] },
      { type: 'h3', text: 'Step 2: Knowledge graph integration' },
      { type: 'p', text: 'LLMs train on structured knowledge bases. If your brand is not in Wikidata, if your founders lack Wikipedia entries where warranted, if your Crunchbase profile is incomplete or inconsistent, you are invisible to the training pipeline. We close these gaps systematically.' },
      { type: 'h3', text: 'Step 3: Content structure optimization' },
      { type: 'p', text: 'AI models extract answers from content differently than search engines do. They prioritize definitive statements, data-backed claims, and clear attribution. We restructure your existing content to be machine-parseable while remaining human-readable.' },
      { type: 'h2', text: 'Building topical authority for LLMs' },
      { type: 'p', text: 'Traditional SEO built authority through backlinks. AI search builds authority through consistent, comprehensive coverage of a topic across multiple sources. The model needs to encounter your brand in enough contexts to consider it authoritative.' },
      { type: 'h3', text: 'The content web strategy' },
      { type: 'p', text: 'We create what we call a "content web" \u2014 a networked system of assets that ensures your brand appears in the forums, publications, data sources, and community spaces that LLMs use as training and retrieval data.' },
      { type: 'h3', text: 'Digital PR for AI citation' },
      { type: 'p', text: 'Traditional digital PR focused on backlinks and brand awareness. AI-era digital PR focuses on generating the kind of third-party mentions that models use as corroborating evidence. The tactics overlap, but the prioritization is different.' },
      { type: 'h2', text: 'Measuring AI search performance' },
      { type: 'p', text: 'You cannot optimize what you do not measure. We have built a proprietary tracking system that monitors your brand citations across ChatGPT, Gemini, Perplexity, and Google AI Overviews on a weekly cadence.' },
      { type: 'h3', text: 'Key metrics we track' },
      { type: 'ul', text: '', items: ['Share of voice: how often your brand appears vs. competitors in AI answers', 'Citation accuracy: whether the information attributed to you is correct', 'Sentiment: the tone and framing of how your brand is described', 'Source diversity: how many distinct sources the model uses when citing you'] },
      { type: 'h2', text: 'Common mistakes we see' },
      { type: 'p', text: 'After auditing 140+ brands, patterns emerge. These are the five mistakes that cost brands the most AI visibility.' },
      { type: 'ul', text: '', items: ['Treating AI optimization as a one-time project rather than an ongoing discipline', 'Ignoring structured data and knowledge base entries', 'Publishing content that is optimized for keywords but not for answer extraction', 'Neglecting third-party mentions and earned media', 'Failing to monitor and correct inaccurate AI-generated statements about their brand'] },
      { type: 'h2', text: 'What to do next' },
      { type: 'p', text: 'If you are serious about AI search visibility, the first step is understanding where you stand today. Our free 30-minute audit will show you exactly which LLMs know about your brand, what they get wrong, and what to fix first.' },
    ],
    related: [
      { tag: 'AI Search', title: 'Brand entity SEO: the Wikipedia-Wikidata-Crunchbase loop.', author: 'Tom\u00E1s Beltr\u00E1n', date: 'Mar 21', slug: 'brand-entity-seo' },
      { tag: 'Technical SEO', title: 'JavaScript SEO in 2026: what Googlebot and GPTBot do differently.', author: 'Rohan Iyer', date: 'Mar 15', slug: 'javascript-seo-2026' },
      { tag: 'Case study', title: 'How we got Maple & Oak from local-only to a national brand.', author: 'Anaya Sharma', date: 'Mar 28', slug: 'maple-oak-case-study' },
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} \u2014 We Strive Design`,
    description: post.meta,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]

  if (!post) {
    return (
      <>
        <Topbar text="Free SEO audit" linkText="Book \u2192" linkHref="/contact" />
        <Nav active="insights" />
        <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
          <h1>Post not found.</h1>
          <Link href="/insights" className="btn btn-ghost" style={{ marginTop: 24 }}>Back to Insights</Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Topbar text="New: The 2026 AI Search Playbook." linkText="Read \u2192" linkHref="/insights/ai-search-playbook-2026" />
      <Nav active="insights" />

      <header className="article-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/insights">Insights</Link> / {post.tag}
          </div>
          <span className="article-tag">{post.tag}</span>
          <h1>{post.title}</h1>
          <p className="article-meta-desc">{post.meta}</p>
          <div className="article-author-row">
            <div className="article-author-avatar">{post.author.charAt(0)}</div>
            <div>
              <div className="article-author-name">{post.author}</div>
              <div className="article-author-info">{post.role} &middot; {post.date} &middot; {post.readTime}</div>
            </div>
          </div>
        </div>
      </header>

      <BlogPostClient post={post} />

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Related <em>reading.</em></h2>
          </div>
          <div className="posts-grid">
            {post.related.map(r => (
              <article className="post reveal" key={r.slug}>
                <div className="img g2"><span className="label">{r.tag.charAt(0)}</span></div>
                <span className="tag">{r.tag}</span>
                <h3>{r.title}</h3>
                <div className="meta">
                  <span className="author">{r.author}</span>
                  <span className="dot"></span><span>{r.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BigCta heading="Free audit." em="No deck." text="30 minutes with a senior strategist. Useful even if you never hire us." btnText="Book your free audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
