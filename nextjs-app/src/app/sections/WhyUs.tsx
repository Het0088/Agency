const items = [
  { num: '/01', name: 'Senior-only\ndelivery', desc: 'Every account is led by a strategist with 8+ years of experience. No juniors learning on your retainer, no offshored execution, no "Account Manager" passing notes between departments.' },
  { num: '/02', name: 'Revenue\nover rankings', desc: 'We track keyword positions, sure. But the only number that matters in our monthly report is qualified, attributable revenue — tied back to the work we shipped.' },
  { num: '/03', name: 'No long\ncontracts', desc: "Month-to-month after the first 90 days. We earn the renewal every cycle. If we're not delivering, you walk — and you keep all the work, deliverables, and dashboards." },
  { num: '/04', name: 'Built for\nthe AI era', desc: "We've been optimizing for LLM citations since GPT-4 launched. Most agencies are still figuring out what GEO means. We've shipped it for 80+ clients." },
]

export default function WhyUsSection() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>What sets us <em>apart.</em></h2>
          <p className="sub">Four things we do differently — and why they matter when you&apos;re betting your growth on a partner.</p>
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
