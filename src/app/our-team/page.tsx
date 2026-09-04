import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight, IconZap, IconLock, IconCode, IconTrendingUp } from '@/components/Icons'
import { getPageMeta } from '@/lib/get-meta'
import { getContent } from '@/lib/get-content'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/our-team')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: {
      title: m.og_title,
      description: m.og_description,
      url: m.canonical,
      type: 'website',
      ...(m.og_image ? { images: [{ url: m.og_image }] } : {}),
    },
  }
}

const teamMembers = [
  {
    name: 'Tomás Beltrán',
    role: 'Founder & Head of AI Search / GEO',
    experience: '12+ yrs experience',
    focus: 'LLM Citations, Knowledge Graph & Algorithm Reverse Engineering',
    bio: 'Former technical lead at global publisher networks. Tomás pioneered Gen Ranq’s proprietary GEO framework, analyzing over 100,000 AI search citations across Perplexity, ChatGPT, and Google AI Overviews.',
    gradient: 'linear-gradient(135deg, #ff5a1f 0%, #ff8c42 100%)',
    avatarChar: 'TB',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Daniel Whitford',
    role: 'Director of Technical SEO & Engineering',
    experience: '11+ yrs experience',
    focus: 'Core Web Vitals, Hydration Profiling & JavaScript Rendering',
    bio: 'Full-stack systems architect who audits and repairs complex enterprise web applications built in Next.js, Nuxt, and Shopify Plus. Has diagnosed and fixed over 1,500 crawl budget and indexing failures.',
    gradient: 'linear-gradient(135deg, #0e1410 0%, #1f2d24 100%)',
    avatarChar: 'DW',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Farah Khoury',
    role: 'Head of Local & Programmatic SEO',
    experience: '9+ yrs experience',
    focus: 'Multi-Location Architecture, Google Maps 3-Pack & Entity Verification',
    bio: 'Architect of programmatic multi-location engines that have taken local clinic and fitness chains from 4 studios to over 20 locations with zero duplicate content penalties.',
    gradient: 'linear-gradient(135deg, #2b3a4a 0%, #486581 100%)',
    avatarChar: 'FK',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Elena Marchetti',
    role: 'Lead Digital PR & Editorial Strategist',
    experience: '8+ yrs experience',
    focus: 'Tier-1 News Placements, Wikipedia / Wikidata Entities & Brand Authority',
    bio: 'Ex-investigative tech journalist with deep editorial relationships across Forbes, TechCrunch, and Bloomberg. Specializes in building unassailable off-page entity consensus for high-stakes brands.',
    gradient: 'linear-gradient(135deg, #1b3b36 0%, #2f6f63 100%)',
    avatarChar: 'EM',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'James Okafor',
    role: 'Senior Analytics & CRO Lead',
    experience: '10+ yrs experience',
    focus: 'GA4 Server-Side Tagging, Attribution Modeling & A/B Experimentation',
    bio: 'Data scientist obsessive about converting organic visibility into pipeline. Designs custom BigQuery data lakes and revenue attribution pipelines that prove client ROI to executive boards.',
    gradient: 'linear-gradient(135deg, #4a284e 0%, #76427d 100%)',
    avatarChar: 'JO',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Priya Sharma',
    role: 'Senior E-Commerce Search Architect',
    experience: '8+ yrs experience',
    focus: 'Shopify Plus, Faceted Navigation, Product Schema & Feed Optimization',
    bio: 'Engineered search architectures for 8-figure DTC e-commerce brands, eliminating crawl traps across millions of inventory SKUs and optimizing Google Merchant Center surfaces.',
    gradient: 'linear-gradient(135deg, #3d1c1a 0%, #632d29 100%)',
    avatarChar: 'PS',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Marcus Vance',
    role: 'Principal Frontend & Performance Engineer',
    experience: '9+ yrs experience',
    focus: 'Next.js 16, Sub-Second LCP, INP Reduction & Accessibility',
    bio: 'Performance purist who writes zero-bloat vanilla CSS and ultra-lean TypeScript. Specializes in transforming 4-second loading times into sub-300ms Core Web Vitals triumphs.',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    avatarChar: 'MV',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Chloe Bennett',
    role: 'Client Strategy & Execution Lead',
    experience: '7+ yrs experience',
    focus: 'Sprint Planning, Technical Roadmaps & Cross-Channel SEO Synergy',
    bio: 'Ensures strategic roadmaps are delivered on time, with zero blockers. Translates complex server-log telemetry into clear, revenue-focused deliverables that founders and CMOs love.',
    gradient: 'linear-gradient(135deg, #d35400 0%, #e67e22 100%)',
    avatarChar: 'CB',
    linkedin: 'https://linkedin.com',
  },
]

const defaultPrinciples = [
  {
    iconType: 'zap',
    titleKey: 'principle_1_title',
    descKey: 'principle_1_desc',
    defTitle: 'No Junior Account Hand-Offs',
    defDesc: 'You never speak with an intern or middle-man coordinator. Every strategy meeting, Slack message, and pull request is handled by a senior practitioner with 7+ years in search.',
  },
  {
    iconType: 'lock',
    titleKey: 'principle_2_title',
    descKey: 'principle_2_desc',
    defTitle: '100% Asset & Code Ownership',
    defDesc: 'You own every line of schema, every technical audit, every keyword database, and every creative asset forever. No proprietary platform lock-in.',
  },
  {
    iconType: 'code',
    titleKey: 'principle_3_title',
    descKey: 'principle_3_desc',
    defTitle: 'Code-Level Execution',
    defDesc: 'We don’t just deliver 50-page PDF audit decks and tell your engineers to fix them. We submit clean GitHub pull requests and test them in staging ourselves.',
  },
  {
    iconType: 'trending',
    titleKey: 'principle_4_title',
    descKey: 'principle_4_desc',
    defTitle: 'Revenue Over Vanity Traffic',
    defDesc: 'Ranking for 100,000 zero-intent queries does not pay bills. We relentlessly optimize for high-commercial buyer queries and primary AI citations that convert.',
  },
]

const openRoles = [
  {
    title: 'Senior Technical SEO Architect',
    type: 'Full-time · Remote (US / Europe / India)',
    team: 'Technical Engineering',
  },
  {
    title: 'LLM / GEO Research Engineer',
    type: 'Full-time · Remote',
    team: 'AI Search Lab',
  },
  {
    title: 'Senior Digital PR Specialist',
    type: 'Full-time · Remote (UK / US)',
    team: 'Brand Authority',
  },
]

export default async function OurTeamPage() {
  const c = await getContent('/our-team')

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://genranq.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://genranq.com/about' },
      { '@type': 'ListItem', position: 3, name: 'Our Team', item: 'https://genranq.com/our-team' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <Topbar
        text={c.topbar_text || 'Now hiring senior technical SEOs and GEO research engineers.'}
        linkText={c.topbar_link || 'View open positions →'}
        linkHref="#careers"
      />
      <Nav active="team" />

      <main className="team-page">
        {/* ── Hero ── */}
        <section className="team-hero">
          <div className="wrap">
            <div className="team-hero-inner">
              <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
                <ol style={{ display: 'inline-flex', alignItems: 'center', gap: 8, listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: 'var(--ink-soft)' }}>
                  <li><Link href="/" style={{ color: 'var(--ink)', textDecoration: 'none' }}>Home</Link></li>
                  <li>/</li>
                  <li><Link href="/about" style={{ color: 'var(--ink)', textDecoration: 'none' }}>About</Link></li>
                  <li>/</li>
                  <li aria-current="page" style={{ color: 'var(--accent)', fontWeight: 600 }}>Our Team</li>
                </ol>
              </nav>
              <span className="team-badge">{c.hero_badge || 'The Practitioners'}</span>
              <h1 className="team-title">
                {c.hero_title ? (
                  c.hero_title
                ) : (
                  <>
                    The Senior Strategists &amp; Engineers <em>Behind Your Organic Revenue.</em>
                  </>
                )}
              </h1>
              <p className="team-lede">
                {c.hero_lede ||
                  'We are 38 senior search specialists, full-stack engineers, and editorial investigators. No junior account reps, no outsourced white-labeling — just direct access to the people doing the work.'}
              </p>
            </div>
          </div>
        </section>

        {/* ── Principles Strip ── */}
        <section className="team-principles-section">
          <div className="wrap">
            <div className="team-principles-grid">
              {defaultPrinciples.map(p => (
                <div className="team-principle-card" key={p.titleKey}>
                  <div className="team-principle-icon">
                    {p.iconType === 'zap' && <IconZap />}
                    {p.iconType === 'lock' && <IconLock />}
                    {p.iconType === 'code' && <IconCode />}
                    {p.iconType === 'trending' && <IconTrendingUp />}
                  </div>
                  <h4>{c[p.titleKey] || p.defTitle}</h4>
                  <p>{c[p.descKey] || p.defDesc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team Grid ── */}
        <section className="section team-grid-section">
          <div className="wrap">
            <div className="sec-head text-center" style={{ maxWidth: 780, margin: '0 auto 56px' }}>
              <span className="eyebrow">{c.team_eyebrow || 'Leadership & Lead Strategists'}</span>
              <h2 className="serif">
                {c.team_heading ? c.team_heading : <>Meet the team on <em>your Slack channel.</em></>}
              </h2>
              <p className="sub">
                {c.team_subtext ||
                  'Every client retainer is led by hands-on specialists who have spent a decade in the trenches of technical search and algorithmic recovery.'}
              </p>
            </div>

            <div className="team-grid">
              {teamMembers.map(member => (
                <div className="team-card" key={member.name}>
                  <div className="team-avatar-wrap">
                    <div className="team-avatar" style={{ background: member.gradient }}>
                      <span>{member.avatarChar}</span>
                    </div>
                    <div className="team-avatar-badge">{member.experience}</div>
                  </div>

                  <div className="team-card-content">
                    <div className="team-name-row">
                      <h3>{member.name}</h3>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="team-linkedin"
                        aria-label={`${member.name} LinkedIn Profile`}
                      >
                        in
                      </a>
                    </div>
                    <span className="team-role">{member.role}</span>
                    <span className="team-focus">Specialty: {member.focus}</span>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hiring / Careers Section ── */}
        <section className="team-careers-section" id="careers">
          <div className="wrap">
            <div className="team-careers-box">
              <div className="team-careers-head">
                <span className="team-badge">{c.careers_badge || 'Join Our Crew'}</span>
                <h3 className="serif">
                  {c.careers_heading ? c.careers_heading : <>We&apos;re always looking for <em>rare search talent.</em></>}
                </h3>
                <p>
                  {c.careers_subtext ||
                    'We hire only senior practitioners (5+ years hands-on). Competitive compensation, asynchronous workflow, zero micromanagement, and generous profit sharing.'}
                </p>
              </div>

              <div className="team-roles-list">
                {openRoles.map(role => (
                  <div className="team-role-item" key={role.title}>
                    <div>
                      <h4>{role.title}</h4>
                      <span>{role.type} • {role.team}</span>
                    </div>
                    <Link href="/contact?ref=careers" className="btn btn-ghost btn-sm">
                      Apply Now <span className="arr"><ArrowRight /></span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Big CTA ── */}
        <BigCta
          heading={c.cta_heading || 'Ready to collaborate with senior'}
          em={c.cta_em || 'practitioners?'}
          text={
            c.cta_text ||
            'Book a free 30-minute forensic strategy call directly with a lead strategist. No sales pitch, just actionable data.'
          }
          btnText={c.cta_btn_text || 'Schedule Strategy Session'}
          btnHref="/contact"
        />
      </main>

      <Footer />
    </>
  )
}

