'use client'

const faqs = [
  { q: 'How long until I see results from SEO?', a: "Honest answer: it depends on your starting point. Brand new sites usually need 6-9 months for meaningful traffic. Established sites with technical issues often see movement inside 90 days because we're unblocking work that already exists. We'll tell you what's realistic on the discovery call — not what you want to hear." },
  { q: "What's the minimum retainer?", a: "Our smallest retainer is $4,000/month, which covers a senior strategist, audits, on-page work, and 4 articles a month. Most small-business clients land between $4k and $8k. We'll quote you a number based on what would actually move the needle, not what would maximize our margin." },
  { q: 'Do I need to sign a long contract?', a: "90-day initial commitment to give the work time to ship. After that, month-to-month forever. If we're not delivering, you cancel — and you keep all the audits, content, dashboards, and access. Long contracts make agencies lazy. We don't want them." },
  { q: 'Will my SEO survive the AI takeover?', a: "It will if it's done right. The brands that get cited inside ChatGPT and Google AI Overviews are still the brands with real authority, real content, real entity signals — i.e. the brands that did SEO well. AI hasn't replaced SEO; it's raised the bar. We've been optimizing for LLM citations since 2023, and it's a standard part of every retainer." },
  { q: 'Who actually does the work on my account?', a: 'A senior strategist with at least 8 years of SEO experience, supported by specialists in technical, content, and digital PR. Same lead strategist for the lifetime of your retainer — no rotation, no handoffs, no "your account manager is leaving the company."' },
  { q: 'Do you work with my industry?', a: "We've done SEO for over 600 small businesses across e-commerce, B2B SaaS, local services, professional services, healthcare, fitness, hospitality, finance, education, and DTC brands. The principles are the same; the playbooks differ. We won't take you on if your industry isn't one we know how to help." },
  { q: "What if I've been burned by an SEO agency before?", a: "Most of our clients have. We start with a free audit so you can see how we think before you pay anything. We're transparent about what we're doing every week. We earn the renewal monthly. If you've been burned, ask us on the call — we'll show you exactly what was probably going wrong before." },
]

export default function ServiceFaq() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="sec-head reveal">
          <h2>Questions we get <em>most weeks.</em></h2>
          <p className="sub">If yours isn&apos;t here, ask us on the discovery call. We&apos;ll give you a real answer, not a sales answer.</p>
        </div>
        <div className="faq-list reveal">
          {faqs.map((f, i) => (
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
