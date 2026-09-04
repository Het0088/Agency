import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/about')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import { getContent } from '@/lib/get-content'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'

export default async function AboutPage() {
  const content = await getContent('/about')

  const timeline = [
    {
      yr: content.timeline_1_yr || '2014 · Melbourne',
      title: content.timeline_1_title || 'Founded in a garage',
      desc: content.timeline_1_desc || 'Two ex-in-house SEOs and a shared frustration with how agencies were treating small businesses. First retainer signed: a local pottery studio for $400/month.'
    },
    {
      yr: content.timeline_2_yr || '2017 · 12 people',
      title: content.timeline_2_title || 'First international client',
      desc: content.timeline_2_desc || "A Brooklyn coffee roaster found us through a blog post. We've worked together for 9 years and counting."
    },
    {
      yr: content.timeline_3_yr || '2019 · London office',
      title: content.timeline_3_title || 'Second studio opens',
      desc: content.timeline_3_desc || 'Five seniors relocate. We start the practice of weekly cross-office shipping reviews — every account, every week, in front of the whole team.'
    },
    {
      yr: content.timeline_4_yr || '2022 · Bangalore',
      title: content.timeline_4_title || 'Third studio, 24-hour delivery',
      desc: content.timeline_4_desc || 'Engineering and content production hub opens. Now every client gets work shipped while they sleep, every day.'
    },
    {
      yr: content.timeline_5_yr || '2023 · GPT-4 launches',
      title: content.timeline_5_title || 'We pivot to AI Search early',
      desc: content.timeline_5_desc || "While most agencies are still arguing whether AI will affect search, we ship our first GEO audits. By 2025 it's a third of our revenue."
    },
    {
      yr: content.timeline_6_yr || '2026 · Today',
      title: content.timeline_6_title || '38 people, 600+ clients, 1 mission',
      desc: content.timeline_6_desc || 'To make small businesses unmissable, even as the search world reinvents itself every six months.'
    }
  ]

  const values = [
    {
      num: '01',
      title: content.val_1_title || 'Senior or nothing',
      desc: content.val_1_desc || "If we can't put an 8+ year strategist on your account, we don't take it. No juniors learning on retainers. No exceptions, no compromises."
    },
    {
      num: '02',
      title: content.val_2_title || 'Show the work',
      desc: content.val_2_desc || "Every deliverable, every audit, every report is in your shared folder the day it's made. Receipts over PowerPoints, always."
    },
    {
      num: '03',
      title: content.val_3_title || 'Revenue is the metric',
      desc: content.val_3_desc || 'Rankings are interesting. Traffic is fine. Revenue is the only number we put on the cover of the monthly report.'
    },
    {
      num: '04',
      title: content.val_4_title || 'Ship, then think',
      desc: content.val_4_desc || 'Two weeks of analysis is rarely worth one week of shipping. We bias toward small, fast, reversible bets — and learn from what moves.'
    },
    {
      num: '05',
      title: content.val_5_title || 'Tell the truth',
      desc: content.val_5_desc || "Including the parts you don't want to hear. If your site can't rank, we'll say so on the call. Hope is not a strategy and lying is not a service."
    },
    {
      num: '06',
      title: content.val_6_title || 'Earn it monthly',
      desc: content.val_6_desc || "Month-to-month after the first 90 days. We earn the renewal every cycle. Long contracts make agencies lazy. We refuse to be lazy."
    }
  ]

  const team = [
    {
      initial: (content.team_1_name || 'Anaya')[0],
      badge: content.team_1_badge || 'Founder · Melbourne',
      name: content.team_1_name || 'Anaya Sharma',
      role: content.team_1_role || 'Founder & Head of Strategy · 14 yrs SEO'
    },
    {
      initial: (content.team_2_name || 'Daniel')[0],
      badge: content.team_2_badge || 'Co-Founder · Melbourne',
      name: content.team_2_name || 'Daniel Whitford',
      role: content.team_2_role || 'Co-Founder & Head of Engineering · 12 yrs technical SEO'
    },
    {
      initial: (content.team_3_name || 'Marisol')[0],
      badge: content.team_3_badge || 'London',
      name: content.team_3_name || 'Marisol Acevedo',
      role: content.team_3_role || 'Director, Editorial · ex-Condé Nast SEO'
    },
    {
      initial: (content.team_4_name || 'Rohan')[0],
      badge: content.team_4_badge || 'Bangalore',
      name: content.team_4_name || 'Rohan Iyer',
      role: content.team_4_role || 'Director, Engineering · ex-Shopify Plus'
    },
    {
      initial: (content.team_5_name || 'Kemi')[0],
      badge: content.team_5_badge || 'London',
      name: content.team_5_name || 'Kemi Adeyemi',
      role: content.team_5_role || 'Head of Digital PR · ex-Edelman'
    },
    {
      initial: (content.team_6_name || 'Tomás')[0],
      badge: content.team_6_badge || 'Melbourne',
      name: content.team_6_name || 'Tomás Beltrán',
      role: content.team_6_role || 'Head of AI Search & GEO · ex-Google'
    },
    {
      initial: (content.team_7_name || 'Farah')[0],
      badge: content.team_7_badge || 'Bangalore',
      name: content.team_7_name || 'Farah Khoury',
      role: content.team_7_role || 'Lead Strategist, Local SEO · 9 yrs'
    },
    {
      initial: '+',
      badge: content.team_8_badge || '31 more humans',
      name: content.team_8_name || '31 more strategists',
      role: content.team_8_role || 'Across Melbourne, London, and Bangalore'
    }
  ]

  const press = [
    { num: content.press_1_num || '600+', lab: content.press_1_lab || 'Clients since 2014' },
    { num: content.press_2_num || '42', lab: content.press_2_lab || 'Countries served' },
    { num: content.press_3_num || '38', lab: content.press_3_lab || 'People on the team' },
    { num: content.press_4_num || '3', lab: content.press_4_lab || 'Studios worldwide' },
    { num: content.press_5_num || '94%', lab: content.press_5_lab || 'Annual retention rate' },
    { num: content.press_6_num || '12yrs', lab: content.press_6_lab || 'Doing exactly this' }
  ]

  const heroHeading = content.hero_heading || "We're 38 people who genuinely care if your phone rings."
  const heroSubtext = content.hero_subtext || 'Gen Ranq is a global SEO studio for ambitious small businesses. We started in a Melbourne garage in 2014, picked up offices in London and Bangalore, and have shipped SEO strategy for 600+ brands across 42 countries since.'

  const storyHeading = content.story_heading || 'A studio, not an agency.'
  const storyPara1 = content.story_para_1 || 'We hate the word "agency." It carries everything we wanted to leave behind — bloated retainers, account managers passing notes, juniors learning on client budgets, decks dressed up as strategy.'
  const storyPara2 = content.story_para_2 || 'A studio is small, senior, and accountable. The person who pitches you is the person who works on you. Every account is owned by a strategist with eight or more years in the trenches — not a sales guy who hands you off.'
  const storyPara3 = content.story_para_3 || "We've turned down clients we couldn't help. We've fired clients we couldn't help fast enough. We sleep fine."

  const valuesHeading = content.values_heading || 'Six things we actually believe.'
  const valuesSubtext = content.values_subtext || "Not poster slogans. The rules we'll fire ourselves over if we ever stop following them."

  const teamHeading = content.team_heading || "The people you'll actually work with."
  const teamSubtext = content.team_subtext || 'No "Account Executives." No call-center middle layers. The strategist on your kickoff is the strategist on your retainer, every week, for as long as you stay.'

  const foundersQuote1 = content.founders_quote_1 || '"We started this studio because we kept watching small business owners get talked down to by agencies that didn\'t really care if they succeeded.'
  const foundersQuote2 = content.founders_quote_2 || 'Twelve years later, we still get up every morning trying to be the partner those owners deserve. That\'s it. That\'s the whole pitch."'

  const ctaHeading = content.cta_heading || 'Want to meet the team?'
  const ctaText = content.cta_text || "Book a 30-minute intro call with the strategist who would lead your account. No sales reps, no decks — just the person who'd actually do the work."
  const ctaBtn = content.cta_btn || 'Book your intro call'

  return (
    <>
      <Topbar text="We're hiring 3 senior strategists." linkText="See roles →" linkHref="#careers" />
      <Nav active="about" />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / About</div>
          <h1 dangerouslySetInnerHTML={{ __html: heroHeading.replace('phone rings.', '<em>phone rings.</em>') }} />
          <p>{heroSubtext}</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="story-grid">
            <div className="reveal">
              <span className="eyebrow">Our story</span>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,56px)', lineHeight: 1.05, margin: '18px 0 24px', letterSpacing: '-0.02em' }} dangerouslySetInnerHTML={{ __html: storyHeading.replace('agency.', '<em class="serif-i" style="color: var(--accent)">agency.</em>') }} />
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 18px' }}>{storyPara1}</p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 18px' }}>{storyPara2}</p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>{storyPara3}</p>
            </div>
            <ul className="timeline reveal">
              {timeline.map((t) => (
                <li key={t.yr}>
                  <div className="yr">{t.yr}</div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 dangerouslySetInnerHTML={{ __html: valuesHeading.replace('actually believe.', '<em>actually believe.</em>') }} />
            <p className="sub">{valuesSubtext}</p>
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value reveal" key={v.num}>
                <div className="value-num">{v.num}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="press-row reveal">
            {press.map((p) => (
              <div className="press-item" key={p.lab}>
                <div className="num">{p.num}</div>
                <div className="lab">{p.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 dangerouslySetInnerHTML={{ __html: teamHeading.replace('actually work with.', '<em>actually work with.</em>') }} />
            <p className="sub">{teamSubtext}</p>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <div className="member reveal" key={m.name}>
                <div className="member-photo">{m.initial}<span className="badge">{m.badge}</span></div>
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ink)', color: 'var(--dark-ink)' }}>
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 800 }}>
            <span className="eyebrow" style={{ color: 'var(--dark-ink-soft)' }}>A note from the founders</span>
            <p className="serif" style={{ fontSize: 'clamp(28px,3.5vw,42px)', lineHeight: 1.25, margin: '24px 0 24px', color: 'var(--dark-ink)', fontStyle: 'italic' }}>{foundersQuote1}</p>
            <p className="serif" style={{ fontSize: 'clamp(28px,3.5vw,42px)', lineHeight: 1.25, margin: '0 0 32px', color: 'var(--dark-ink)', fontStyle: 'italic' }}>{foundersQuote2}</p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div className="avatar" style={{ width: 48, height: 48, fontSize: 22 }}>A</div>
              <div className="avatar" style={{ width: 48, height: 48, fontSize: 22, background: 'var(--dark-ink)', color: 'var(--ink)' }}>D</div>
              <div style={{ marginLeft: 8 }}>
                <div style={{ fontWeight: 600 }}>Anaya &amp; Daniel</div>
                <div style={{ fontSize: 13, color: 'var(--dark-ink-soft)' }}>Founders, Gen Ranq</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BigCta
        heading={ctaHeading.includes('meet the team?') ? ctaHeading.replace('meet the team?', '').trim() : ctaHeading}
        em={ctaHeading.includes('meet the team?') ? 'meet the team?' : ''}
        text={ctaText}
        btnText={ctaBtn}
        btnHref="/contact"
      />
      <Footer />
    </>
  )
}
