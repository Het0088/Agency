import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageMeta } from '@/lib/get-meta'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight, CheckIcon } from '@/components/Icons'
import { buildFaqSchema } from '@/lib/schema'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/about')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: {
      title: m.og_title,
      description: m.og_description,
      url: m.canonical,
      type: 'website',
      siteName: 'GENRANQ',
      ...(m.og_image ? { images: [{ url: m.og_image }] } : {}),
    },
  }
}

export default async function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://genranq.com/' },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://genranq.com/about' },
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GENRANQ Software LLP',
    url: 'https://genranq.com',
    logo: 'https://genranq.com/logo.png',
    foundingDate: '2014',
    founder: [
      { '@type': 'Person', name: 'Anaya Sharma' },
      { '@type': 'Person', name: 'Daniel Whitford' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-80-4507-4242',
      contactType: 'customer support',
      email: 'hello@genranq.com',
    },
  }

  const aboutFaqs = [
    {
      q: 'Who owns GENRANQ Software LLP and how long have you been in business?',
      a: 'GENRANQ Software LLP is an independent, bootstrapped software and digital growth firm founded in 2014, headquartered in Vadodara, Gujarat, India. Over the last 12 years, we have grown organically to a 120+ person cross-functional team delivering search optimization and full-stack software development for 600+ businesses across 42 countries.',
    },
    {
      q: 'How is GENRANQ different from traditional digital marketing agencies?',
      a: 'Most digital agencies are marketing-only shops that produce slide decks and tell your engineers what to fix. GENRANQ Software LLP integrates senior search strategists with in-house software engineers. When our audits identify Core Web Vitals bottlenecks, indexation flaws, schema opportunities, or API integrations, our engineers write and deploy the production code directly.',
    },
    {
      q: 'Why do you enforce a strict senior-only delivery model?',
      a: 'In modern search and software development, junior staff learning on client accounts leads to missed deadlines and costly algorithmic penalties. Every GENRANQ client account is led by practitioners with at least 8+ years of specialized experience in search architecture, engineering, or editorial strategy, ensuring immediate institutional competence from day one.',
    },
    {
      q: 'How do you handle real-time collaboration with overseas clients?',
      a: 'We structure our working hours to provide a guaranteed 4 to 5 hour daily overlap with North American, European, and Australian business schedules. We integrate directly into your company Slack, Microsoft Teams, Jira, or Linear workspaces with transparent weekly video sprint demos.',
    },
    {
      q: 'Who owns the code, intellectual property, and content produced?',
      a: 'You own 100% of the code, designs, content, schema, custom scripts, and data dashboards we build. All source files are pushed directly to your Git repositories and Figma workspaces. If you ever pause or transition, you walk away with everything with zero proprietary lock-in.',
    },
    {
      q: 'What are your standard contract terms and cancellation policies?',
      a: 'We believe in earning our partnership every single month. Following an initial 90-day baseline sprint to establish foundational architecture and benchmarks, all our retainers operate on flexible month-to-month terms with a simple 30-day notice period.',
    },
  ]

  const faqSchema = buildFaqSchema(aboutFaqs)

  const counters = [
    { value: '412', suffix: '%', label: 'Average organic traffic growth in 12 months' },
    { value: '8.5', suffix: '×', label: 'Average return on retainer for small business clients' },
    { value: '600', suffix: '+', label: 'Brands grown across 42 countries since 2014' },
    { value: '12', suffix: 'yrs', label: 'Doing exactly this — no pivots, no fads' },
  ]

  const apartItems = [
    {
      big: '01',
      title: 'Senior-only delivery',
      desc: 'Every account is led by a strategist with 8+ years of experience. No juniors learning on your retainer, no offshored third parties, and no "Account Manager" passing notes between departments.',
      proofBold: '8+ yrs',
      proof: 'minimum strategist experience',
    },
    {
      big: '02',
      title: 'Revenue over rankings',
      desc: 'We track keyword positions, sure. But the only number that matters in our monthly report is qualified, attributable revenue — tied directly to the engineering and content we shipped.',
      proofBold: '100%',
      proof: 'of reports tied to revenue',
    },
    {
      big: '03',
      title: 'No long contracts',
      desc: 'Month-to-month after the first 90 days. We earn the renewal every single cycle. If we are not delivering, you walk — and you keep all the code, deliverables, and dashboards.',
      proofBold: '90 days',
      proof: 'then month-to-month flexibility',
    },
    {
      big: '04',
      title: 'Built for the AI era',
      desc: 'We have been optimizing for LLM citations since GPT-4 launched. Most agencies are still figuring out what GEO means. We have shipped it for 80+ clients across ChatGPT, Gemini, and Perplexity.',
      proofBold: '80+',
      proof: 'GEO & AI search programs shipped',
    },
  ]

  const team = [
    {
      name: 'Anaya Sharma',
      role: 'Founder & Head of Strategy',
      exp: '14+ yrs',
      badge: 'Vadodara',
      initial: 'A',
      color: '#FF5A1F',
      chips: ['SEO Strategy', 'AI Search (GEO)', 'Technical Architecture'],
      projects: '240+ accounts',
    },
    {
      name: 'Daniel Whitford',
      role: 'Co-Founder & Head of Engineering',
      exp: '12+ yrs',
      badge: 'Systems',
      initial: 'D',
      color: '#121613',
      chips: ['Core Web Vitals', 'Next.js', 'Distributed Systems'],
      projects: '180+ architectures',
    },
    {
      name: 'Arjun P.',
      role: 'Senior Laravel & PHP Lead',
      exp: '6+ yrs',
      badge: 'Full-Stack',
      initial: 'A',
      color: '#E94A10',
      chips: ['Laravel', 'Vue.js', 'MySQL', 'AWS'],
      projects: '42 projects',
    },
    {
      name: 'Rahul K.',
      role: 'Lead Next.js & React Developer',
      exp: '5+ yrs',
      badge: 'Frontend',
      initial: 'R',
      color: '#2A2F2B',
      chips: ['Next.js', 'TypeScript', 'Tailwind', 'Performance'],
      projects: '36 web apps',
    },
    {
      name: 'Kavya D.',
      role: 'Senior Shopify Plus Developer',
      exp: '6+ yrs',
      badge: 'E-commerce',
      initial: 'K',
      color: '#FF5A1F',
      chips: ['Liquid', 'Hydrogen', 'GraphQL', 'Shopify Plus'],
      projects: '55 stores built',
    },
    {
      name: 'Vikas J.',
      role: 'Python & AI Engineer',
      exp: '8+ yrs',
      badge: 'AI & Data',
      initial: 'V',
      color: '#121613',
      chips: ['Python', 'LangChain', 'FastAPI', 'PyTorch'],
      projects: '19 AI products',
    },
  ]

  const timeline = [
    {
      year: '2014',
      tag: 'Vadodara, India',
      title: 'Founded as a 4-person studio',
      desc: 'Frustrated by opaque agencies that sold retainers without shipping technical code, our founders started GENRANQ to unite senior SEO strategy with in-house software engineering.',
    },
    {
      year: '2017',
      tag: 'Global Expansion',
      title: 'First 50 international clients',
      desc: 'Expanded beyond local businesses to international clients across the US, UK, and Australia seeking technical SEO and custom development.',
    },
    {
      year: '2020',
      tag: 'Engineering Hub',
      title: 'Dedicated developer divisions launched',
      desc: 'Formalized our dedicated engineering pods for Next.js, Laravel, Shopify, and React — allowing clients to execute site speed and custom features instantly.',
    },
    {
      year: '2023',
      tag: 'The AI Shift',
      title: 'Pioneered GEO (Generative Engine Optimization)',
      desc: 'Launched forensic AI search optimization when ChatGPT and AI Overviews disrupted traditional search, helping clients secure brand citations inside LLMs.',
    },
    {
      year: '2026',
      tag: 'Today',
      title: '120+ team members, 600+ brands grown',
      desc: 'Operating from Vadodara across 42 countries. One cross-functional team of engineers, technical SEOs, and content strategists focused on real revenue.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Topbar text="● Now offering AI Search & GEO optimisation." linkText="Learn more →" linkHref="/services/ai-search" />
      <Nav active="about" />

      {/* ===== HERO SECTION ===== */}
      <header className="page-hero">
        <div className="wrap">
          <div className="crumbs" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
            <Link href="/" style={{ color: 'inherit' }}>Home</Link> / <b style={{ color: 'var(--ink)' }}>About Us</b>
          </div>
          <span className="eyebrow" style={{ marginBottom: 18 }}>About GENRANQ</span>
          <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 68px)', margin: '16px 0 24px' }}>
            SEO experts who <em className="accent">also build software.</em>
          </h1>
          <p className="lead" style={{ maxWidth: 720, fontSize: 18, lineHeight: 1.65, color: 'var(--muted)', marginBottom: 36 }}>
            GENRANQ Software LLP is a Vadodara-based software and search growth company founded in 2014. We started as a four-person SEO studio for local businesses and today run SEO, AI search (GEO), website design and development, and dedicated developer teams for 600+ businesses across 42 countries.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, maxWidth: 960, marginBottom: 36 }}>
            {['Founded 2014 in Vadodara', '120+ in-house team', '600+ clients, 42 countries', '94% client retention'].map((check) => (
              <div key={check} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--cream)', padding: '12px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--orange-soft)', color: 'var(--orange)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <CheckIcon />
                </span>
                {check}
              </div>
            ))}
          </div>

          <div className="hero-ctas" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#team" className="btn btn-primary">
              Meet our team <span style={{ marginLeft: 6 }}>↓</span>
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Talk to a strategist <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== 2. COUNTERS & STATS SECTION ===== */}
      <section className="pad bg-cream">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: 48 }}>
            <div>
              <span className="eyebrow">Proven track record</span>
              <h2>Twelve years of <em className="accent">measurable impact.</em></h2>
            </div>
            <p>Every metric tied back to client pipeline, search domination, and qualified revenue.</p>
          </div>

          <div className="stats-grid-4">
            {counters.map((c) => (
              <div className="stat-box" key={c.label}>
                <b>{c.value}<small>{c.suffix}</small></b>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. WHY GENRANQ ===== */}
      <section className="pad" id="why">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Why GENRANQ</span>
              <h2>One team for <em className="accent">strategy, content, and code.</em></h2>
            </div>
            <p>
              We are not just marketers. GENRANQ Software LLP combines SEO strategists and in-house engineers — so technical recommendations are deployed immediately without waiting on third parties.
            </p>
          </div>

          <div className="why-wrap">
            <div className="why-hero">
              <div className="logo light" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <span style={{ fontFamily: 'var(--f-logo)', fontSize: 26, fontWeight: 700, color: 'var(--orange)', letterSpacing: '0.02em' }}>
                  GENRANQ
                </span>
                <span style={{ fontSize: 10, letterSpacing: '0.35em', color: '#B8BAB4', fontWeight: 600 }}>
                  SOFTWARE LLP
                </span>
              </div>

              <h3>Technical speed meets commercial strategy.</h3>
              <p>
                When your SEO audit uncovers slow Core Web Vitals, broken render trees, or programmatic schema opportunities, our engineers fix it in the codebase directly. No endless slide decks.
              </p>

              <div className="why-nums">
                <div>
                  <b>120<small>+</small></b>
                  <span>In-house experts</span>
                </div>
                <div>
                  <b>97<small>%</small></b>
                  <span>Client retention</span>
                </div>
                <div>
                  <b>4<small>h</small></b>
                  <span>Avg. reply time</span>
                </div>
              </div>
            </div>

            <div className="why-list">
              <article className="why-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
                </span>
                <h3>In-house developers</h3>
                <p>Technical fixes, site speed, schema markup, and headless CMS integrations shipped directly by our own engineers.</p>
              </article>

              <article className="why-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M7 15l4-4 3 3 5-6"/></svg>
                </span>
                <h3>Transparent reporting</h3>
                <p>Real-time client portal with keyword rankings, organic traffic, AI citation tracking, and qualified pipeline.</p>
              </article>

              <article className="why-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
                </span>
                <h3>Dedicated strategist</h3>
                <p>Direct communication with senior practitioners who own your roadmap — no call centers or junior account managers.</p>
              </article>

              <article className="why-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                </span>
                <h3>Small-business pricing</h3>
                <p>Enterprise-grade search intelligence and web performance packaged into predictable, transparent monthly retainers.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. MEET THE TEAM ===== */}
      <section className="pad bg-cream" id="team">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Our people</span>
              <h2>The engineers &amp; strategists <em className="accent">behind your growth.</em></h2>
            </div>
            <p>
              We believe great outcomes require senior practitioners. Here are some of the technical architects, developers, and search strategists ready to accelerate your brand.
            </p>
          </div>

          <div className="dev-grid">
            {team.map((m) => (
              <article className="dev" key={m.name}>
                <div className="dev-head">
                  <span className="dev-av" style={{ background: m.color }}>{m.initial}</span>
                  <div>
                    <h3>{m.name}</h3>
                    <span className="role-t">{m.role}</span>
                  </div>
                </div>
                <div className="meta">
                  <div>
                    <b>{m.exp}</b>
                    <span>Experience</span>
                  </div>
                  <div>
                    <b>{m.projects}</b>
                    <span>Delivered</span>
                  </div>
                </div>
                <div className="chips">
                  {m.chips.map((chip) => (
                    <span key={chip}>{chip}</span>
                  ))}
                </div>
                <div className="foot">
                  <small>● Active Strategist</small>
                  <Link href="/contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
                    Work with {m.name.split(' ')[0]}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/our-team" className="btn btn-dark">
              View our complete 38-person directory &amp; engineering pods <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 5. WHAT SETS US APART (4 BOXES) ===== */}
      <section className="pad">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Our difference</span>
              <h2>What sets us <em className="accent">apart.</em></h2>
            </div>
            <p>Four foundational standards we do differently — and why they protect your investment and accelerate ROI.</p>
          </div>

          <div className="apart-grid">
            {apartItems.map((item) => (
              <article className="apart" key={item.big}>
                <span className="big">{item.big}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="proof">
                    <b>{item.proofBold}</b> {item.proof}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TIMELINE / OUR STORY ===== */}
      <section className="pad bg-cream">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Our Journey</span>
              <h2>Twelve years of <em className="accent">continuous craft.</em></h2>
            </div>
            <p>From a small studio in Vadodara to a multi-disciplinary partner powering organic revenue worldwide.</p>
          </div>

          <div style={{ display: 'grid', gap: 20 }}>
            {timeline.map((t, i) => (
              <div
                key={t.year}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: '32px 36px',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: 32,
                  alignItems: 'start',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--f-display)', fontSize: 36, color: 'var(--orange)', fontWeight: 500, lineHeight: 1 }}>
                    {t.year}
                  </div>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>
                    {t.tag}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: 22, marginBottom: 8, color: 'var(--ink)' }}>{t.title}</h3>
                  <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. FAQ SECTION ===== */}
      <section className="pad" id="faq">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">Agency FAQs</span>
            <h2>Frequently asked questions about <em className="accent">GENRANQ.</em></h2>
            <p className="lead" style={{ marginTop: 12 }}>
              Everything you need to know about our corporate registration, team composition, timezone workflows, and contract terms.
            </p>
          </div>
          <div className="faq-list reveal">
            {aboutFaqs.map((item, i) => (
              <details className="faq" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. CTA SECTION ===== */}
      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-box cta-dark">
            <div>
              <h3>
                Ready to work with a partner that <em className="accent">actually delivers?</em>
              </h3>
              <p>
                Talk to a senior strategist this week. No pitch decks, no junior handoffs — just an honest assessment of your search and web growth potential.
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Book a consultation <span className="arr"><ArrowRight /></span>
              </Link>
              <Link href="/services" className="btn btn-ghost-dark">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
