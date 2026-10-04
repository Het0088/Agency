import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getAllGlossaryTerms, getGlossaryTermBySlug } from '@/lib/glossary'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const terms = await getAllGlossaryTerms()
  return terms.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)
  if (!term) return { title: 'Term Not Found' }

  return {
    title: `What is ${term.title}? Definition & Guide | GENRANQ Glossary`,
    description: term.shortDef,
    alternates: { canonical: `https://genranq.com/glossary/${term.slug}` },
    openGraph: {
      title: `What is ${term.title}? | GENRANQ Software LLP`,
      description: term.shortDef,
      url: `https://genranq.com/glossary/${term.slug}`,
      type: 'article',
    },
  }
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)
  if (!term || !term.published) notFound()

  const allTerms = await getAllGlossaryTerms()
  const published = allTerms.filter(t => t.published)
  const currentIndex = published.findIndex(t => t.id === term.id)
  const prevTerm = currentIndex > 0 ? published[currentIndex - 1] : null
  const nextTerm = currentIndex < published.length - 1 ? published[currentIndex + 1] : null

  const relatedTerms = (term.related || [])
    .map(relId => published.find(t => t.id === relId || t.slug === relId))
    .filter(Boolean)

  const synonymsList = (term.synonyms || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const letters = Array.from(new Set(published.map(t => (t.title[0] || 'A').toUpperCase()))).sort()

  return (
    <>
      <Topbar text="Discover modern search frameworks and playbooks." linkText="Consult with our strategists →" linkHref="/contact" />
      <Nav active="resources" />

      {/* Hero Section */}
      <header className="page-hero" style={{ background: '#FAF8F4', paddingBottom: 48, borderBottom: '1px solid var(--border)' }}>
        <div className="wrap">
          <div className="crumb" style={{ marginBottom: 12 }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/glossary" style={{ color: 'inherit', textDecoration: 'none' }}>Glossary</Link>
            {' / '}
            <b style={{ color: 'var(--ink)' }}>{term.title}</b>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: '#FF5A1F',
              color: '#fff',
              padding: '3px 10px',
              borderRadius: 999
            }}>
              {term.category}
            </span>
            <span style={{ fontSize: 13, color: '#6B6F6A' }}>
              Updated {new Date(term.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#121613',
            margin: '0 0 24px',
            maxWidth: 820
          }}>
            What is {term.title}?
          </h1>

          {/* Structured Definition Card */}
          <div style={{
            background: '#fff',
            border: '2px solid #EAE5D9',
            borderRadius: 18,
            padding: '24px 28px',
            maxWidth: 820,
            boxShadow: '0 12px 32px -16px rgba(18,22,19,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF5A1F',
              }}>
                Definition
              </span>
            </div>
            <p style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: '#121613',
              margin: '0 0 14px',
              fontWeight: 500
            }}>
              {term.shortDef}
            </p>

            {synonymsList.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingTop: 14, borderTop: '1px solid #F1EEE6' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6B6F6A' }}>Also known as:</span>
                {synonymsList.map(syn => (
                  <span key={syn} style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#121613',
                    background: '#F1EEE6',
                    padding: '2px 10px',
                    borderRadius: 999
                  }}>
                    {syn}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content & Sidebar Layout */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 96 }}>
        <div className="wrap" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(300px, 360px)',
          gap: 48,
          alignItems: 'start'
        }}>
          {/* Left Column: Full Content */}
          <article className="prose-content" style={{ minWidth: 0 }}>
            {term.content ? (
              <div
                dangerouslySetInnerHTML={{ __html: term.content }}
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.75,
                  color: '#2A2E29',
                }}
              />
            ) : (
              <p style={{ fontSize: 16.5, lineHeight: 1.75, color: '#2A2E29' }}>
                Understanding {term.title} is essential for establishing competitive search rankings and earning authoritative citations across generative AI engines. Our strategists and technical architects work with this standard daily to deliver measurable search performance for high-growth businesses.
              </p>
            )}

            {/* Related Terms Section */}
            {relatedTerms.length > 0 && (
              <div style={{ marginTop: 56, paddingTop: 36, borderTop: '1px solid var(--border)' }}>
                <h3 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: 26,
                  fontWeight: 400,
                  color: '#121613',
                  marginBottom: 20
                }}>
                  Related <em>glossary terms.</em>
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 16
                }}>
                  {relatedTerms.map(rel => rel && (
                    <Link
                      key={rel.id}
                      href={`/glossary/${rel.slug}`}
                      style={{
                        display: 'block',
                        background: '#FCFBF8',
                        border: '1px solid var(--border)',
                        borderRadius: 14,
                        padding: '16px 18px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.15s'
                      }}
                    >
                      <b style={{ display: 'block', fontSize: 16, color: '#121613', marginBottom: 6 }}>
                        {rel.title}
                      </b>
                      <span style={{
                        fontSize: 13,
                        color: '#6B6F6A',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {rel.shortDef}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Previous & Next Term Links */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 16,
              marginTop: 48,
              paddingTop: 28,
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap'
            }}>
              {prevTerm ? (
                <Link
                  href={`/glossary/${prevTerm.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#FF5A1F', fontWeight: 600 }}>← Previous term</span>
                  <b style={{ fontSize: 15, color: '#121613', marginTop: 2 }}>{prevTerm.title}</b>
                </Link>
              ) : <div />}

              {nextTerm ? (
                <Link
                  href={`/glossary/${nextTerm.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#FF5A1F', fontWeight: 600 }}>Next term →</span>
                  <b style={{ fontSize: 15, color: '#121613', marginTop: 2 }}>{nextTerm.title}</b>
                </Link>
              ) : <div />}
            </div>

            {/* Back to Glossary Button */}
            <div style={{ marginTop: 40 }}>
              <Link href="/glossary" className="btn btn-ghost">
                ← Back to Full Search Glossary
              </Link>
            </div>
          </article>

          {/* Right Column: Sticky Sidebar */}
          <aside style={{ position: 'sticky', top: 96, display: 'grid', gap: 24 }}>
            {/* Browse A-Z Card */}
            <div style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: '22px',
              boxShadow: '0 4px 16px -6px rgba(0,0,0,0.05)'
            }}>
              <h5 style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11.5,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#6B6F6A',
                fontWeight: 600,
                margin: '0 0 14px'
              }}>
                Browse Glossary A–Z
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => {
                  const hasTerms = letters.includes(char)
                  return hasTerms ? (
                    <Link
                      key={char}
                      href={`/glossary#gl-${char}`}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: '#FCFBF8',
                        border: '1px solid var(--border)',
                        color: '#121613',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.15s'
                      }}
                    >
                      {char}
                    </Link>
                  ) : (
                    <span
                      key={char}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        color: '#D4CEBF',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 13,
                        fontWeight: 600
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Sidebar Lead Card */}
            <div style={{
              background: '#121613',
              color: '#fff',
              borderRadius: 20,
              padding: '28px 24px',
              boxShadow: '0 20px 40px -16px rgba(0,0,0,0.4)'
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FF5A1F',
                fontWeight: 600,
                display: 'block',
                marginBottom: 8
              }}>
                Implementation
              </span>
              <h3 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.25,
                color: '#fff',
                margin: '0 0 10px'
              }}>
                Need help putting this into <em style={{ fontStyle: 'italic', color: '#FF5A1F' }}>practice?</em>
              </h3>
              <p style={{ fontSize: 13.5, color: '#A0A49F', lineHeight: 1.55, margin: '0 0 20px' }}>
                Talk to our senior SEO strategists. We evaluate your current technical setup and provide an actionable roadmap within 4 business hours.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Consult with experts →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  )
}
