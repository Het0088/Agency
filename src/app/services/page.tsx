import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceFaq from './ServiceFaq'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'SEO Services — Omniranq',
  description: 'Full-service SEO retainers that bring buyers, not browsers. Technical SEO, AI search optimization, editorial content, and digital PR — all in one retainer.',
}

const deliverables = [
  { num: '01', title: 'Forensic site audit', desc: 'A 60-90 page deep audit covering crawlability, indexation, on-page, content, links, technical health, and competitive positioning. Delivered in week 3.', items: ['Technical SEO audit (200+ checks)', 'Content gap analysis vs. top 10 competitors', 'Backlink profile health check', 'Core Web Vitals + speed audit'] },
  { num: '02', title: 'Keyword strategy', desc: 'We map every commercially relevant query to a page on your site. Then we prioritize ruthlessly — winnable, valuable, soon.', items: ['Topic clustering & pillar mapping', 'SERP intent analysis (informational vs. transactional)', 'Buyer-stage keyword segmentation', 'Quarterly refresh as SERPs shift'] },
  { num: '03', title: 'On-page optimization', desc: 'Every page that earns its keep gets the full treatment — titles, meta, headings, internal links, schema, content depth.', items: ['Title & meta rewrites with CTR testing', 'Internal linking architecture', 'Schema markup & structured data', 'Content refresh & depth audits'] },
  { num: '04', title: 'Technical SEO', desc: "The plumbing nobody else wants to touch — and what most agencies quietly skip. We do it ourselves, because nobody else is getting it right.", items: ['Crawl budget & log file analysis', 'Core Web Vitals remediation', 'JavaScript rendering & SSR audits', 'Faceted nav & e-comm indexation'] },
  { num: '05', title: 'Editorial content', desc: 'Long-form, programmatic, and answer-first content written by humans who know your industry. We hire ex-journalists, not interns.', items: ['4-8 long-form articles / month', 'Industry-expert writers, not generalists', 'Programmatic content for scale', 'Content refresh on existing assets'] },
  { num: '06', title: 'Digital PR & links', desc: 'Editorial backlinks from publications your customers actually read. No PBNs, no link farms, no anything that backfires in 18 months.', items: ['Data-driven PR campaigns', 'Expert commentary & HARO replacements', 'Strategic partnership outreach', 'Toxic link disavow & cleanup'] },
  { num: '07', title: 'AI search & GEO', desc: 'Get cited inside ChatGPT, Perplexity, Gemini, and Google AI Overviews. The new rules of being found.', items: ['Monthly LLM citation audit', 'Brand entity building (Wikidata, Wikipedia)', 'Answer-first content optimization', 'Share-of-voice in AI answers'] },
  { num: '08', title: 'Reporting & dashboards', desc: "A live dashboard you can check at any time, plus a monthly call with your strategist where we walk through what shipped, what moved, and what's next.", items: ['Live dashboard (Looker Studio)', 'Revenue attribution modeling', 'Monthly strategist call (45 min)', 'Quarterly deep-dive review'] },
]

const compareRows = [
  { lab: 'Senior strategist on every call', us: 'Always', them: 'Account manager, sometimes' },
  { lab: 'Month-to-month after onboarding', us: 'After 90 days', them: '12-month minimums' },
  { lab: 'Live dashboard with revenue attribution', us: 'Day one', them: 'Monthly PDFs' },
  { lab: 'AI Search & GEO included', us: 'Standard', them: 'Premium add-on or unavailable' },
  { lab: 'Content written by industry experts', us: 'Ex-journalists, in-house', them: 'Offshored generalists' },
  { lab: 'You own all the work + access', us: 'Always yours', them: 'Proprietary tools you lose access to' },
]

const industries = [
  { icon: '\u2301', title: 'E-commerce & DTC', desc: 'Shopify, WooCommerce, Magento. Faceted nav, schema, programmatic category pages.' },
  { icon: '\u25D0', title: 'B2B SaaS', desc: 'From bootstrapped to Series C. Comparison content, programmatic landing pages, integration SEO.' },
  { icon: '\u25B2', title: 'Local services', desc: 'Plumbers, dentists, lawyers, gyms. Multi-location 3-pack domination at scale.' },
  { icon: '\u25C7', title: 'Hospitality', desc: 'Hotels, restaurants, bookings. Schema for menus, events, rooms \u2014 plus AI-answer optimization.' },
  { icon: '\u2726', title: 'Health & wellness', desc: 'YMYL-grade E-E-A-T building. Author profiles, citations, medical-review workflows.' },
  { icon: '\u25C8', title: 'Finance & legal', desc: 'Compliance-aware content, jurisdictional landing pages, expert-author entity building.' },
  { icon: '\u232C', title: 'Education & courses', desc: 'Course schema, programmatic syllabus pages, AI Overview citations for "how to learn X."' },
  { icon: '\u2295', title: 'Specialty retail', desc: 'Independent shops, makers, niche brands. The category we cut our teeth on in 2014.' },
]

const engagementModels = [
  {
    tag: 'Most popular',
    title: 'Monthly retainer',
    price: 'From $4,000/mo',
    desc: 'Ongoing, full-service SEO with a dedicated strategist. All 8 workstreams running in parallel. Month-to-month after 90-day onboarding.',
    features: ['Dedicated senior strategist', 'All 8 deliverables included', 'Live dashboard & monthly calls', 'Month-to-month after onboarding'],
    primary: true,
  },
  {
    tag: 'One-time',
    title: 'SEO audit',
    price: 'From $2,500',
    desc: 'A comprehensive 60-90 page audit with prioritized findings and a 90-minute walkthrough. Perfect before committing to a retainer.',
    features: ['200+ point technical audit', 'Content gap analysis', 'Competitive positioning report', '90-minute strategy call'],
    primary: false,
  },
  {
    tag: 'Consulting',
    title: 'Strategy sprint',
    price: 'From $6,000',
    desc: 'A focused 4-week engagement. We build your SEO roadmap, train your team, and hand over a 12-month execution plan.',
    features: ['4-week intensive engagement', 'Full keyword & content strategy', 'Team training sessions', '12-month execution plan'],
    primary: false,
  },
]

const trustBadges = [
  { label: 'Google Partner', sub: 'Certified' },
  { label: 'Clutch', sub: '4.9 / 5.0' },
  { label: 'Semrush', sub: 'Agency Partner' },
  { label: 'HubSpot', sub: 'Certified' },
]

export default function ServicesPage() {
  return (
    <>
      <Topbar text="Free SEO audit \u00B7 30 minutes \u00B7 No obligation." linkText="Book \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Services / SEO</div>
          <div className="hero-grid" style={{ alignItems: 'end', gap: 60 }}>
            <div className="reveal in">
              <h1 style={{ maxWidth: 'none' }}>Search engine<br />optimization that<br />brings <em>buyers,</em> not browsers.</h1>
              <p style={{ maxWidth: 540 }}>Our flagship service. Every other service we offer &mdash; local, technical, content, links, AI search &mdash; is built on the foundations we lay here.</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
                <Link href="/contact" className="btn btn-primary">Get a free SEO audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#deliverables" className="btn btn-ghost">See what&apos;s included</a>
              </div>
            </div>
            <div className="svc-hero-visual reveal in" aria-hidden="true">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <div className="hv-tag">SERP movement &middot; last 90 days</div>
                  <div className="hv-title" style={{ fontSize: 18, marginTop: 4 }}>&quot;specialty coffee subscription&quot;</div>
                </div>
                <span className="hv-pill"><span className="dot"></span>Climbing</span>
              </div>
              {[
                { num: 1, kw: 'maple-oak.com', delta: '\u2191 14', top: true },
                { num: 2, kw: 'competitor-a.com', delta: '\u2193 1', down: true },
                { num: 3, kw: 'competitor-b.com', delta: '\u2193 2', down: true },
                { num: 4, kw: 'competitor-c.com', delta: '\u2014', neutral: true },
              ].map((r) => (
                <div className={`svc-rank${r.top ? ' top' : ''}`} key={r.num}>
                  <div className="svc-rank-num">{r.num}</div>
                  <div className="svc-rank-kw" style={r.top ? undefined : { color: 'var(--ink-soft)' }}>{r.kw}</div>
                  <div className="svc-rank-vol">22k/mo</div>
                  <div className="svc-rank-delta" style={r.down ? { color: '#c44', background: 'rgba(196,68,68,0.1)' } : r.neutral ? { color: 'var(--ink-mute)', background: 'var(--surface-2)' } : undefined}>{r.delta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="trust-strip">
        <div className="wrap">
          <div className="trust-grid">
            {trustBadges.map((b) => (
              <div className="trust-badge reveal" key={b.label}>
                <span className="trust-badge-label">{b.label}</span>
                <span className="trust-badge-sub">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap">
          <div className="stats-grid">
            <div className="stat reveal"><div className="stat-num">90<span className="unit">days</span></div><div className="stat-label">Until you see meaningful ranking movement on most sites</div></div>
            <div className="stat reveal"><div className="stat-num">412<span className="unit">%</span></div><div className="stat-label">Average organic traffic growth in the first 12 months</div></div>
            <div className="stat reveal"><div className="stat-num">8.5<span className="unit">&times;</span></div><div className="stat-label">Average return on retainer for small business clients</div></div>
            <div className="stat reveal"><div className="stat-num">94<span className="unit">%</span></div><div className="stat-label">Annual client retention rate</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="deliverables" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>What&apos;s <em>actually</em><br />in the retainer.</h2>
            <p className="sub">Eight workstreams that run in parallel from week one. No upsell tiers, no add-ons, no &quot;premium&quot; packages. One retainer, all of it.</p>
          </div>
          <div className="deliv-grid">
            {deliverables.map((d) => (
              <div className="deliv reveal" key={d.num}>
                <div className="deliv-num">{d.num}</div>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  <ul>{d.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner reveal">
            <div className="mid-cta-text">
              <h3>Ready to grow your business with SEO?</h3>
              <p>We&apos;ll help create an SEO plan that suits your specific needs.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Let&apos;s talk <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>The first 90 days, <em>day by day.</em></h2>
            <p className="sub">A typical retainer onboarding. You&apos;ll know what&apos;s happening every week &mdash; because you&apos;re in the shared folder watching it happen.</p>
          </div>
          <div className="process-grid">
            {[
              { num: 'W1', title: 'Discovery', desc: 'Kickoff with your strategist. Access setup. Goal alignment. We sit and listen for the first three hours.' },
              { num: 'W3', title: 'Audit ships', desc: "The full forensic audit lands in your inbox. We walk through findings on a 90-minute call. Plain English, prioritized fixes." },
              { num: 'W5', title: 'Sprint one', desc: 'First batch of technical fixes ship. First wave of content briefed. First PR campaign in market.' },
              { num: 'W12', title: 'First results', desc: "Most clients see their first ranking jumps and indexable wins by week 12. Some see them by week 6. We tell you which to expect." },
            ].map((s) => (
              <div className="proc reveal" key={s.num}><div className="proc-num">{s.num}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="models">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Choose your <em>engagement.</em></h2>
            <p className="sub">Three ways to work with us. Pick the model that fits your stage and budget.</p>
          </div>
          <div className="engage-grid">
            {engagementModels.map((m) => (
              <div className={`engage-card reveal${m.primary ? ' engage-primary' : ''}`} key={m.title}>
                <span className="engage-tag">{m.tag}</span>
                <h3>{m.title}</h3>
                <div className="engage-price">{m.price}</div>
                <p>{m.desc}</p>
                <ul className="engage-features">
                  {m.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link href="/contact" className={`btn ${m.primary ? 'btn-primary' : 'btn-ghost'} btn-sm`} style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                  {m.primary ? 'Start a retainer' : 'Learn more'} <span className="arr"><ArrowRight /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Us vs. <em>typical agencies.</em></h2>
            <p className="sub">Not throwing shade. Just being clear about how we&apos;re built differently &mdash; so you can decide if it&apos;s the right fit.</p>
          </div>
          <div className="compare reveal">
            <div className="compare-row head"><div>What you get</div><div className="col-us">Omniranq</div><div>Most agencies</div></div>
            {compareRows.map((r) => (
              <div className="compare-row" key={r.lab}>
                <div className="lab">{r.lab}</div>
                <div className="col-us"><span className="yes">{r.us}</span></div>
                <div className="no">{r.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner mid-cta-dark reveal">
            <div className="mid-cta-text">
              <h3>Not sure which service you need?</h3>
              <p>Book a 30-minute call with a senior strategist. No sales pitch &mdash; just honest advice.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a free call <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Industries we know <em>cold.</em></h2>
            <p className="sub">600+ retainers across these categories means we already know the SERPs, the seasonality, the link patterns, and the customer language. You skip 6 months of ramp-up.</p>
          </div>
          <div className="ind-grid">
            {industries.map((ind) => (
              <div className="ind reveal" key={ind.title}>
                <div className="ind-icon">{ind.icon}</div>
                <h4>{ind.title}</h4>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="logos-label">The tools we run inside the studio</div>
          <div className="tools-strip reveal">
            <span className="tool">AHREFS<span className="sub">Backlinks &amp; SERPs</span></span>
            <span className="tool">SEMRUSH<span className="sub">Keyword research</span></span>
            <span className="tool serif-i">Screaming Frog</span>
            <span className="tool">SISTRIX<span className="sub">Visibility index</span></span>
            <span className="tool">LOOKER<span className="sub">Studio dashboards</span></span>
            <span className="tool serif-i">Profound</span>
            <span className="tool">CLEARSCOPE<span className="sub">Content briefs</span></span>
          </div>
        </div>
      </section>

      <ServiceFaq />

      <BigCta heading="Free audit." em="No deck." text="30 minutes. A senior strategist looking at your real site, telling you the three things to fix first. Useful even if you never hire us." btnText="Book your free audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
