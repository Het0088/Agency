import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight, IconClock } from '@/components/Icons'
import { buildNewsArticleSchema } from '@/lib/schema'

const ARTICLE_DATA = {
  title: 'GENRANQ Launches Proprietary Neural-Rank AI Search Indexing Platform for Global Enterprise Brands',
  description: 'GENRANQ Software LLP announces the release of Neural-Rank, an automated audit and real-time monitoring suite tracking over 250,000 enterprise citations across ChatGPT, Perplexity, and Gemini.',
  publishedDate: '2026-10-06T09:00:00.000Z',
  url: 'https://genranq.com/resources/news/enterprise-ai-search-indexing-platform',
  image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  author: 'GENRANQ Press Office',
}

export const metadata: Metadata = {
  title: `${ARTICLE_DATA.title} | GENRANQ News`,
  description: ARTICLE_DATA.description,
  alternates: { canonical: ARTICLE_DATA.url },
  openGraph: {
    title: ARTICLE_DATA.title,
    description: ARTICLE_DATA.description,
    url: ARTICLE_DATA.url,
    type: 'article',
    images: [{ url: ARTICLE_DATA.image }],
  },
}

export default function NeuralRankNewsPage() {
  const schema = buildNewsArticleSchema(ARTICLE_DATA)

  return (
    <>
      <Topbar text="Official Press Release • Technology Innovation" linkText="Contact Media Relations →" linkHref="mailto:press@genranq.com" />
      <Nav active="resources" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article style={{ background: '#FAF8F4', padding: '60px 0 120px', minHeight: '85vh' }}>
        <div className="wrap" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 20, fontSize: 13, color: '#6B6F6A' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/resources/news" style={{ color: 'inherit', textDecoration: 'none' }}>News</Link>
            {' / '}
            <span style={{ color: '#121613' }}>Product Launch</span>
          </nav>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
              <span style={{
                background: '#FF5A1F',
                color: '#fff',
                fontSize: 11,
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '4px 10px',
                borderRadius: 6
              }}>
                Product Announcement
              </span>
              <span style={{ fontSize: 13, color: '#6B6F6A', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <IconClock /> Published October 6, 2026
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.2,
              color: '#121613',
              marginBottom: 20
            }}>
              GENRANQ Launches Proprietary Neural-Rank AI Search Indexing Platform for Global Enterprise Brands
            </h1>

            <p style={{ fontSize: 18, color: '#4A4F4B', lineHeight: 1.6, margin: 0 }}>
              The new intelligence suite tracks multi-engine prompt impressions, maps real-time citation frequency, and pinpoints semantic gaps across ChatGPT, Perplexity Pro, and Gemini.
            </p>
          </div>

          {/* Featured Press Image */}
          <div style={{ marginBottom: 40, borderRadius: 16, overflow: 'hidden', border: '1px solid #E9E3D6', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
            <img
              src={ARTICLE_DATA.image}
              alt="GENRANQ Neural-Rank AI Search Indexing Command Center"
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 460, objectFit: 'cover' }}
            />
            <div style={{ padding: '12px 18px', background: '#fff', fontSize: 12.5, color: '#6B6F6A', borderTop: '1px solid #F1EEE6', fontStyle: 'italic' }}>
              Figure 1: The Neural-Rank multi-model citation monitoring engine, mapping commercial prompt share of voice across global markets.
            </div>
          </div>

          {/* Key Facts Summary Box */}
          <div style={{ background: '#fff', border: '1px solid #E9E3D6', borderRadius: 14, padding: '28px 32px', marginBottom: 44, boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: 16, fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FF5A1F', margin: '0 0 16px' }}>
              Announcement at a Glance
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, fontSize: 14 }}>
              <div>
                <b style={{ display: 'block', color: '#121613', marginBottom: 2 }}>Technology</b>
                <span style={{ color: '#555' }}>Neural-Rank Citation Intelligence v1.0</span>
              </div>
              <div>
                <b style={{ display: 'block', color: '#121613', marginBottom: 2 }}>Engines Monitored</b>
                <span style={{ color: '#555' }}>ChatGPT, Perplexity Pro, Google AIO, Gemini</span>
              </div>
              <div>
                <b style={{ display: 'block', color: '#121613', marginBottom: 2 }}>Monthly Prompt Capacity</b>
                <span style={{ color: '#555' }}>Over 250,000 synthetic buyer queries</span>
              </div>
              <div>
                <b style={{ display: 'block', color: '#121613', marginBottom: 2 }}>Target Market</b>
                <span style={{ color: '#555' }}>Global B2B, E-commerce &amp; SaaS Enterprises</span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div style={{ fontSize: 16, lineHeight: 1.75, color: '#2C332E' }}>
            <p style={{ fontWeight: 600, fontSize: 17, color: '#121613' }}>
              <span style={{ color: '#FF5A1F' }}>VADODARA, INDIA &amp; SAN FRANCISCO — October 6, 2026 —</span> GENRANQ Software LLP, a premier software engineering and search performance studio serving over 600 clients worldwide, today unveiled <strong>Neural-Rank</strong>, an enterprise-grade artificial intelligence indexing and citation monitoring platform.
            </p>

            <p>
              As generative answer engines fundamentally reshape customer discovery, enterprise brands face an unprecedented measurement void. Traditional rank trackers monitor static position ranks on standard Google results, but completely fail to observe whether an AI model actively endorses a brand, summarizes its capabilities, or omits it during conversational buying decisions.
            </p>

            <p>
              Neural-Rank directly resolves this challenge by systematically sampling hundreds of commercial prompt variations every 24 hours. The platform queries OpenAI ChatGPT-4o, Perplexity Pro, Google Gemini 1.5 Pro, and Claude 3.5 Sonnet, recording not only whether a brand is cited, but also evaluating the exact citation link, the sentiment of the recommendation, and the specific third-party consensus sources that influenced the model.
            </p>

            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, color: '#121613', margin: '40px 0 16px', lineHeight: 1.25 }}>
              Closing the Visibility Gap in the Generative Era
            </h2>

            <p>
              Over the last 12 months, search traffic patterns have experienced their most drastic shift in two decades. Recent industry studies confirm that over 48% of high-intent B2B and consumer queries now generate AI synthesis answers before users scroll to organic listings.
            </p>

            <div style={{
              borderLeft: '4px solid #FF5A1F',
              background: '#FFF6F0',
              padding: '20px 24px',
              borderRadius: '0 10px 10px 0',
              margin: '32px 0'
            }}>
              <p style={{ fontSize: 17, fontStyle: 'italic', color: '#121613', margin: '0 0 10px' }}>
                &ldquo;Legacy SEO measurement is blind to generative conversations. A client can rank number one on traditional Google yet be completely absent when a prospective customer asks Perplexity or ChatGPT for the top three vendors in their space. Neural-Rank transforms generative optimization from an educated guess into a predictable, engineered science.&rdquo;
              </p>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FF5A1F' }}>
                — Rohan Patel, Chief Executive Officer, GENRANQ Software LLP
              </div>
            </div>

            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, color: '#121613', margin: '40px 0 16px', lineHeight: 1.25 }}>
              Core Architectural Highlights of Neural-Rank
            </h2>

            <p>
              Developed over fourteen months by GENRANQ&apos;s internal AI research unit in Vadodara, Neural-Rank integrates three proprietary modules:
            </p>

            <ul style={{ paddingLeft: 20, margin: '16px 0 28px' }}>
              <li style={{ marginBottom: 12 }}>
                <strong>Multi-Engine Prompt Simulation:</strong> Simulates genuine multi-turn buyer persona conversations across global geolocations, mapping how AI assistants refine their vendor shortlists.
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>Semantic Vector Gap Analysis:</strong> Compares client content embeddings against the top cited sources to pinpoint exact missing technical definitions, metrics, or schema entities required for model confidence.
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong>Consensus Triangulation Tracker:</strong> Identifies which external review platforms, authoritative press articles, and community discussions are directly fueling LLM recommendations.
              </li>
            </ul>

            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, color: '#121613', margin: '40px 0 16px', lineHeight: 1.25 }}>
              Proven Real-World Beta Performance
            </h2>

            <p>
              During its private beta testing across thirty-four mid-market and enterprise accounts in fintech, healthtech, and cloud infrastructure, clients utilizing Neural-Rank recommendations achieved an average <strong>310% increase in generative citation frequency</strong> within 90 days of implementation.
            </p>

            <p>
              Furthermore, referral traffic originating directly from conversational assistants grew by 184%, demonstrating that AI answer citations drive highly qualified prospects with superior conversion rates compared to conventional organic search clicks.
            </p>

            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, color: '#121613', margin: '40px 0 16px', lineHeight: 1.25 }}>
              Availability and Enterprise Onboarding
            </h2>

            <p>
              Neural-Rank is available immediately for all GENRANQ enterprise retainer clients and as a standalone intelligence engagement for global brands. Implementation includes a comprehensive baseline audit, competitor citation mapping, custom schema restructuring, and bi-weekly executive reporting.
            </p>

            <div style={{
              background: '#121613',
              color: '#fff',
              borderRadius: 16,
              padding: '36px 32px',
              margin: '40px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 11, color: '#FF5A1F', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                Request a Live Demonstration
              </span>
              <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 24, fontWeight: 400, color: '#fff', margin: 0 }}>
                Discover where your brand stands inside ChatGPT &amp; Perplexity today.
              </h3>
              <p style={{ color: '#A0A49F', fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>
                Our senior AI search architects will run a complimentary 50-prompt diagnostic of your enterprise space and deliver an actionable citation teardown within 24 hours.
              </p>
              <div>
                <Link href="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Book Executive Demo <ArrowRight />
                </Link>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E9E3D6', margin: '48px 0' }} />

            <div style={{ fontSize: 14, color: '#6B6F6A' }}>
              <h4 style={{ color: '#121613', fontSize: 15, marginBottom: 8 }}>About GENRANQ Software LLP</h4>
              <p style={{ margin: '0 0 16px', lineHeight: 1.6 }}>
                GENRANQ Software LLP is an award-winning software engineering and search growth company founded in 2014. With delivery facilities in Vadodara, Gujarat, and client pods in North America and Europe, GENRANQ provides Generative Engine Optimization (GEO), advanced technical SEO, high-performance web development, and dedicated engineering pods to ambitious businesses worldwide.
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div><strong>Media Contact:</strong> press@genranq.com</div>
                <div><strong>Corporate Phone:</strong> +91 80 4507 4242</div>
                <div><strong>Web:</strong> <a href="https://genranq.com" style={{ color: '#FF5A1F' }}>genranq.com</a></div>
              </div>
            </div>

          </div>
        </div>
      </article>

      <Footer />
    </>
  )
}
