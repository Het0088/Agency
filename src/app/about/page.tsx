import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'

export const metadata: Metadata = { title: 'About — We Strive Design' }

const timeline = [
  { yr: '2014 · Melbourne', title: 'Founded in a garage', desc: 'Two ex-in-house SEOs and a shared frustration with how agencies were treating small businesses. First retainer signed: a local pottery studio for $400/month.' },
  { yr: '2017 · 12 people', title: 'First international client', desc: "A Brooklyn coffee roaster found us through a blog post. We've worked together for 9 years and counting." },
  { yr: '2019 · London office', title: 'Second studio opens', desc: 'Five seniors relocate. We start the practice of weekly cross-office shipping reviews — every account, every week, in front of the whole team.' },
  { yr: '2022 · Bangalore', title: 'Third studio, 24-hour delivery', desc: 'Engineering and content production hub opens. Now every client gets work shipped while they sleep, every day.' },
  { yr: '2023 · GPT-4 launches', title: 'We pivot to AI Search early', desc: "While most agencies are still arguing whether AI will affect search, we ship our first GEO audits. By 2025 it's a third of our revenue." },
  { yr: '2026 · Today', title: '38 people, 600+ clients, 1 mission', desc: 'To make small businesses unmissable, even as the search world reinvents itself every six months.' },
]

const values = [
  { num: '01', title: 'Senior or nothing', desc: "If we can't put an 8+ year strategist on your account, we don't take it. No juniors learning on retainers. No exceptions, no compromises." },
  { num: '02', title: 'Show the work', desc: "Every deliverable, every audit, every report is in your shared folder the day it's made. Receipts over PowerPoints, always." },
  { num: '03', title: 'Revenue is the metric', desc: 'Rankings are interesting. Traffic is fine. Revenue is the only number we put on the cover of the monthly report.' },
  { num: '04', title: 'Ship, then think', desc: 'Two weeks of analysis is rarely worth one week of shipping. We bias toward small, fast, reversible bets — and learn from what moves.' },
  { num: '05', title: 'Tell the truth', desc: "Including the parts you don't want to hear. If your site can't rank, we'll say so on the call. Hope is not a strategy and lying is not a service." },
  { num: '06', title: 'Earn it monthly', desc: "Month-to-month after the first 90 days. We earn the renewal every cycle. Long contracts make agencies lazy. We refuse to be lazy." },
]

const team = [
  { initial: 'A', badge: 'Founder · Melbourne', name: 'Anaya Sharma', role: 'Founder & Head of Strategy · 14 yrs SEO' },
  { initial: 'D', badge: 'Co-Founder · Melbourne', name: 'Daniel Whitford', role: 'Co-Founder & Head of Engineering · 12 yrs technical SEO' },
  { initial: 'M', badge: 'London', name: 'Marisol Acevedo', role: 'Director, Editorial · ex-Condé Nast SEO' },
  { initial: 'R', badge: 'Bangalore', name: 'Rohan Iyer', role: 'Director, Engineering · ex-Shopify Plus' },
  { initial: 'K', badge: 'London', name: 'Kemi Adeyemi', role: 'Head of Digital PR · ex-Edelman' },
  { initial: 'T', badge: 'Melbourne', name: 'Tomás Beltrán', role: 'Head of AI Search & GEO · ex-Google' },
  { initial: 'F', badge: 'Bangalore', name: 'Farah Khoury', role: 'Lead Strategist, Local SEO · 9 yrs' },
  { initial: '+', badge: '31 more humans', name: '31 more strategists', role: 'Across Melbourne, London, and Bangalore' },
]

const press = [
  { num: '600+', lab: 'Clients since 2014' }, { num: '42', lab: 'Countries served' },
  { num: '38', lab: 'People on the team' }, { num: '3', lab: 'Studios worldwide' },
  { num: '94%', lab: 'Annual retention rate' }, { num: '12yrs', lab: 'Doing exactly this' },
]

export default function AboutPage() {
  return (
    <>
      <Topbar text="We're hiring 3 senior strategists." linkText="See roles →" linkHref="#careers" />
      <Nav active="about" />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / About</div>
          <h1>We&apos;re 38 people who genuinely care if your <em>phone rings.</em></h1>
          <p>We Strive Design is a global SEO studio for ambitious small businesses. We started in a Melbourne garage in 2014, picked up offices in London and Bangalore, and have shipped SEO strategy for 600+ brands across 42 countries since.</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="story-grid">
            <div className="reveal">
              <span className="eyebrow">Our story</span>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,56px)', lineHeight: 1.05, margin: '18px 0 24px', letterSpacing: '-0.02em' }}>A studio, not an <em className="serif-i" style={{ color: 'var(--accent)' }}>agency.</em></h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 18px' }}>We hate the word &quot;agency.&quot; It carries everything we wanted to leave behind — bloated retainers, account managers passing notes, juniors learning on client budgets, decks dressed up as strategy.</p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 18px' }}>A studio is small, senior, and accountable. The person who pitches you is the person who works on you. Every account is owned by a strategist with eight or more years in the trenches — not a sales guy who hands you off.</p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>We&apos;ve turned down clients we couldn&apos;t help. We&apos;ve fired clients we couldn&apos;t help fast enough. We sleep fine.</p>
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
            <h2>Six things we <em>actually believe.</em></h2>
            <p className="sub">Not poster slogans. The rules we&apos;ll fire ourselves over if we ever stop following them.</p>
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
            <h2>The people you&apos;ll <em>actually work with.</em></h2>
            <p className="sub">No &quot;Account Executives.&quot; No call-center middle layers. The strategist on your kickoff is the strategist on your retainer, every week, for as long as you stay.</p>
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
            <p className="serif" style={{ fontSize: 'clamp(28px,3.5vw,42px)', lineHeight: 1.25, margin: '24px 0 24px', color: 'var(--dark-ink)', fontStyle: 'italic' }}>&quot;We started this studio because we kept watching small business owners get talked down to by agencies that didn&apos;t really care if they succeeded.</p>
            <p className="serif" style={{ fontSize: 'clamp(28px,3.5vw,42px)', lineHeight: 1.25, margin: '0 0 32px', color: 'var(--dark-ink)', fontStyle: 'italic' }}>Twelve years later, we still get up every morning trying to be the partner those owners deserve. That&apos;s it. That&apos;s the whole pitch.&quot;</p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div className="avatar" style={{ width: 48, height: 48, fontSize: 22 }}>A</div>
              <div className="avatar" style={{ width: 48, height: 48, fontSize: 22, background: 'var(--dark-ink)', color: 'var(--ink)' }}>D</div>
              <div style={{ marginLeft: 8 }}>
                <div style={{ fontWeight: 600 }}>Anaya &amp; Daniel</div>
                <div style={{ fontSize: 13, color: 'var(--dark-ink-soft)' }}>Founders, We Strive Design</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BigCta heading="Want to" em="meet the team?" text="Book a 30-minute intro call with the strategist who would lead your account. No sales reps, no decks — just the person who'd actually do the work." btnText="Book your intro call" btnHref="/contact" />
      <Footer />
    </>
  )
}
