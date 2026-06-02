export default function ProcessSection({ content }: { content?: Record<string, string> }) {
  const steps = [
    { num: '01', title: content?.proc_1_title || 'Audit & map', desc: content?.proc_1_desc || 'Three weeks of forensic analysis across your site, content, links, and the SERPs you want to own. We come back with a 90-day roadmap.' },
    { num: '02', title: content?.proc_2_title || 'Build & ship', desc: content?.proc_2_desc || 'Technical fixes, on-page work, and content production run in parallel. Most clients see indexable changes inside week 4.' },
    { num: '03', title: content?.proc_3_title || 'Earn authority', desc: content?.proc_3_desc || 'Digital PR, partnerships, and editorial outreach — links and brand mentions from outlets your customers actually read.' },
    { num: '04', title: content?.proc_4_title || 'Measure & iterate', desc: content?.proc_4_desc || 'Monthly dashboards show traffic, rankings, AI mentions, and revenue. We meet, we adjust, we ship the next sprint.' },
  ]

  const heading = content?.proc_heading || 'Four steps, repeated forever.'
  const subtext = content?.proc_subtext || "SEO is not a project. It's a discipline. Here's the loop we run with every client, every month, for as long as the work compounds."

  return (
    <section className="section process">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 dangerouslySetInnerHTML={{ __html: heading.replace('repeated forever.', '<em>repeated forever.</em>') }} />
          <p className="sub">{subtext}</p>
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
