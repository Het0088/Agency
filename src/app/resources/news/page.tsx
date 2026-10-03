import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight, IconClock } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Company News & Press Releases — GENRANQ Software LLP',
  description: 'Official announcements, product launches, corporate milestones, and media resources from GENRANQ Software LLP.',
  alternates: { canonical: 'https://genranq.com/resources/news' },
}

export default function NewsIndexPage() {
  return (
    <>
      <Topbar text="Media relations & press inquiries: press@genranq.com" linkText="Media Kit →" linkHref="/contact" />
      <Nav />
      
      <main style={{ padding: '80px 0 120px', minHeight: '80vh', background: '#F9F6EF' }}>
        <div className="wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--accent, #FF5A1F)',
              display: 'inline-block',
              marginBottom: 16
            }}>
              Official Newsroom
            </span>
            <h1 style={{
              fontFamily: 'var(--f-display, serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 400,
              color: 'var(--ink, #121613)',
              lineHeight: 1.15,
              marginBottom: 16
            }}>
              Company Announcements &amp; Updates
            </h1>
            <p style={{
              fontSize: 17,
              color: '#6B6F6A',
              maxWidth: 640,
              margin: '0 auto'
            }}>
              The latest milestones, technology releases, and regional delivery expansions from GENRANQ.
            </p>
          </div>

          {/* Featured Press Release */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #E9E3D6',
            borderRadius: 18,
            padding: '40px',
            marginBottom: 48,
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 36,
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <span style={{
                  background: '#FFE8DC',
                  color: '#FF5A1F',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono, monospace)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 10px',
                  borderRadius: 6
                }}>
                  Corporate Expansion
                </span>
                <span style={{ fontSize: 13, color: '#6B6F6A' }}>October 2026</span>
              </div>

              <h2 style={{
                fontFamily: 'var(--f-display, serif)',
                fontSize: 'clamp(24px, 3.2vw, 32px)',
                fontWeight: 400,
                color: '#121613',
                lineHeight: 1.25,
                marginBottom: 16
              }}>
                <Link href="/resources/news/vadodara-delivery-centre" style={{ color: 'inherit', textDecoration: 'none' }}>
                  GENRANQ Crosses 120 Engineers and Opens New Delivery Centre in Vadodara
                </Link>
              </h2>

              <p style={{ fontSize: 15, color: '#4A4F4B', lineHeight: 1.6, marginBottom: 24 }}>
                New 18,000 sq ft campus expands engineering capacity across AI Search optimization, full-stack web platforms, and dedicated developer client pods.
              </p>

              <Link
                href="/resources/news/vadodara-delivery-centre"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                Read Full Story <ArrowRight />
              </Link>
            </div>

            <div style={{
              background: '#121613',
              borderRadius: 14,
              padding: '32px',
              color: '#F4F2EC'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#A8ABA4',
                display: 'block',
                marginBottom: 14
              }}>
                Key Highlights
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#FF5A1F' }}>✓</span>
                  <span>120+ full-time engineers on permanent payroll</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#FF5A1F' }}>✓</span>
                  <span>Dedicated AI Search &amp; LLM Reverse-Engineering Lab</span>
                </li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#FF5A1F' }}>✓</span>
                  <span>Direct client pods serving North America, Europe &amp; India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Media Contact Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #E9E3D6',
            borderRadius: 14,
            padding: '28px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20
          }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#121613', marginBottom: 4 }}>
                Press &amp; Media Inquiries
              </h3>
              <p style={{ fontSize: 14, color: '#6B6F6A', margin: 0 }}>
                Need executive commentary, high-res brand assets, or expert commentary on AI search?
              </p>
            </div>
            <a
              href="mailto:press@genranq.com"
              className="btn btn-ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              Contact Press Team <ArrowRight />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
