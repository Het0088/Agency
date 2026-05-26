'use client'

const faqs = [
  { q: 'How long until I see results from SEO?', a: 'It depends on your starting point. Brand new sites usually need 6-9 months for meaningful traffic. Established sites with technical issues often see movement inside 90 days because we\'re unblocking work that already exists. We\'ll tell you what\'s realistic on the discovery call.' },
  { q: 'What\'s the minimum retainer?', a: 'Our smallest retainer is $4,000/month, which covers a senior strategist, audits, on-page work, and 4 articles a month. Most small-business clients land between $4k and $8k. We quote based on what would actually move the needle, not what maximizes our margin.' },
  { q: 'Do I need to sign a long contract?', a: '90-day initial commitment to give the work time to ship. After that, month-to-month forever. If we\'re not delivering, you cancel and keep all audits, content, dashboards, and access.' },
  { q: 'Will my SEO survive the AI takeover?', a: 'It will if it\'s done right. The brands cited inside ChatGPT and Google AI Overviews are the brands with real authority, real content, real entity signals. AI hasn\'t replaced SEO; it\'s raised the bar. We\'ve been optimizing for LLM citations since 2023.' },
  { q: 'Who actually does the work on my account?', a: 'A senior strategist with at least 8 years of SEO experience, supported by specialists in technical, content, and digital PR. Same lead strategist for the lifetime of your retainer.' },
  { q: 'What makes Omniranq different from other SEO agencies?', a: 'We optimize for both traditional search and AI-driven retrieval. Most agencies still focus only on Google rankings. We ensure your brand is cited in ChatGPT, Perplexity, and Google AI Overviews alongside traditional organic results.' },
  { q: 'Do you guarantee first-page rankings?', a: 'No. Anyone who guarantees rankings is lying or gaming. We guarantee a transparent process, consistent execution, and measurable progress. Our 4.9/5 rating across 412 reviews exists because we deliver results, not promises.' },
]

export default function HomeFaq() {
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
