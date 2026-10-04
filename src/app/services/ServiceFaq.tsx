'use client'

export const servicesFaqs = [
  {
    q: 'Can I hire GENRANQ for a single service, or do you only offer bundled retainers?',
    a: 'You can engage us for a specific standalone service or as a full-service growth partner. Many clients start with a high-impact Website Redesign, Shopify build, or Technical SEO audit, and then transition into an ongoing growth retainer covering continuous development, CRO, and organic search. We tailor our engagement model directly to your primary growth bottleneck.',
  },
  {
    q: 'How do your design, engineering, and SEO teams collaborate on an integrated engagement?',
    a: 'Unlike traditional agencies where SEO is an afterthought or engineering is handed off to third parties, our strategists, UI/UX designers, and software engineers work together from day one. When building a website, our SEO team defines the keyword taxonomy and schema before design finishes, and our developers ensure perfect Core Web Vitals and zero performance bloat.',
  },
  {
    q: 'Who manages my account — will I be handed off between separate departments?',
    a: 'Every client is assigned a dedicated Senior Client Director with at least 8 years of cross-discipline experience, supported by direct Slack or Teams channels with the specialists working on your deliverables. We do not use non-technical account managers who act as communication bottlenecks.',
  },
  {
    q: 'How do your engagement contracts work — do you lock clients into long-term commitments?',
    a: 'We require an initial 90-day onboarding commitment to allow strategic audits, design sprints, and engineering deployments to ship and gain traction. Afterward, all engagements transition to flexible month-to-month terms. If we ever fail to deliver, you can cancel at any time with 30 days notice while retaining 100% of all code, designs, and assets.',
  },
  {
    q: 'How do you measure and report ROI across our digital channels?',
    a: 'We build live, transparent reporting dashboards connected to your Google Analytics 4, Search Console, Google Ads, and CRM data. Instead of vanity impressions, our monthly reviews focus on pipeline generation, qualified lead acquisition, average order value, conversion lift, and blended customer acquisition cost (CAC).',
  },
  {
    q: 'Can your team integrate with our existing in-house developers and marketing team?',
    a: 'Yes, frequently. We often operate as a specialized force multiplier for internal teams — providing technical SEO architecture, advanced Next.js engineering, or paid search scaling that in-house teams lack the bandwidth or specialization to execute.',
  },
  {
    q: 'What is your turnaround time for launching a project or deploying an engineering pod?',
    a: 'Dedicated developers and engineering pods can be vetted and onboarded within 3 to 5 business days. Custom website projects typically kick off within one week of proposal sign-off, with high-converting landing pages delivering in 1–2 weeks and full web platforms launching in 4–8 weeks.',
  },
  {
    q: 'Who retains ownership of the source code, creative designs, and analytics accounts?',
    a: 'You do — completely. All code repositories, Figma designs, tracking tags, and platform accounts are set up under your company\'s name. When milestones are completed, all intellectual property is 100% yours with zero proprietary dependencies.',
  },
]

export default function ServiceFaq() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="sec-head reveal">
          <span className="eyebrow">Service Partnership FAQ</span>
          <h2>Frequently asked questions about <em>our services.</em></h2>
          <p className="sub">Clear, upfront answers on how we collaborate, bill, structure retainers, and deliver compound business value.</p>
        </div>
        <div className="faq-list reveal">
          {servicesFaqs.map((f, i) => (
            <details className="faq" key={f.q} open={i === 0}>
              <summary>
                {f.q}
                <span className="faq-icon">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <div className="faq-body">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

