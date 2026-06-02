export default function WhyUsSection({ content }: { content?: Record<string, string> }) {
  const items = [
    { num: '/01', name: content?.whyus_1_name || 'Senior-only\ndelivery', desc: content?.whyus_1_desc || 'Every account is led by a strategist with 8+ years of experience. No juniors learning on your retainer, no offshored execution, no "Account Manager" passing notes between departments.' },
    { num: '/02', name: content?.whyus_2_name || 'Revenue\nover rankings', desc: content?.whyus_2_desc || 'We track keyword positions, sure. But the only number that matters in our monthly report is qualified, attributable revenue — tied back to the work we shipped.' },
    { num: '/03', name: content?.whyus_3_name || 'No long\ncontracts', desc: content?.whyus_3_desc || "Month-to-month after the first 90 days. We earn the renewal every cycle. If we're not delivering, you walk — and you keep all the work, deliverables, and dashboards." },
    { num: '/04', name: content?.whyus_4_name || 'Built for\nthe AI era', desc: content?.whyus_4_desc || "We've been optimizing for LLM citations since GPT-4 launched. Most agencies are still figuring out what GEO means. We've shipped it for 80+ clients." },
  ]

  const heading = content?.whyus_heading || 'What sets us apart.'
  const subtext = content?.whyus_subtext || 'Four things we do differently — and why they matter when you\'re betting your growth on a partner.'

  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 dangerouslySetInnerHTML={{ __html: heading.replace('apart.', '<em>apart.</em>') }} />
          <p className="sub">{subtext}</p>
        </div>
        <div className="why-grid">
          {items.map((w) => (
            <div className="why reveal" key={w.num}>
              <div className="why-num">{w.num}</div>
              <div className="why-name" dangerouslySetInnerHTML={{ __html: w.name.replace('\n', '<br/>') }} />
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
