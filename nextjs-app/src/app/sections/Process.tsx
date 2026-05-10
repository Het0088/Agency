const steps = [
  { num: '01', title: 'Audit & map', desc: 'Three weeks of forensic analysis across your site, content, links, and the SERPs you want to own. We come back with a 90-day roadmap.' },
  { num: '02', title: 'Build & ship', desc: 'Technical fixes, on-page work, and content production run in parallel. Most clients see indexable changes inside week 4.' },
  { num: '03', title: 'Earn authority', desc: 'Digital PR, partnerships, and editorial outreach — links and brand mentions from outlets your customers actually read.' },
  { num: '04', title: 'Measure & iterate', desc: 'Monthly dashboards show traffic, rankings, AI mentions, and revenue. We meet, we adjust, we ship the next sprint.' },
]

export default function ProcessSection() {
  return (
    <section className="section process">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Four steps, <em>repeated forever.</em></h2>
          <p className="sub">SEO is not a project. It&apos;s a discipline. Here&apos;s the loop we run with every client, every month, for as long as the work compounds.</p>
        </div>
        <div className="process-grid">
          {steps.map((s) => (
            <div className="proc reveal" key={s.num}>
              <div className="proc-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
