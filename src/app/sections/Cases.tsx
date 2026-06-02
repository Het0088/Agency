export default function CasesSection({ content }: { content?: Record<string, string> }) {
  const cases = [
    {
      tag: content?.case_1_tag || 'Specialty Retail · DTC',
      name: content?.case_1_name || 'Maple & Oak Coffee Roasters',
      cat: content?.case_1_cat || 'From local roastery to national subscription brand',
      metrics: [
        { num: content?.case_1_m1_num || '+412', unit: content?.case_1_m1_unit || '%', lab: content?.case_1_m1_lab || 'Organic sessions' },
        { num: content?.case_1_m2_num || '14.2', unit: content?.case_1_m2_unit || '×', lab: content?.case_1_m2_lab || 'ROAS on retainer' },
        { num: content?.case_1_m3_num || '#1', unit: content?.case_1_m3_unit || '', lab: content?.case_1_m3_lab || '"specialty coffee subscription"' },
        { num: content?.case_1_m4_num || '38', unit: content?.case_1_m4_unit || '%', lab: content?.case_1_m4_lab || 'Cited in AI answers' },
      ],
    },
    {
      tag: content?.case_2_tag || 'Health & Wellness · Multi-location',
      name: content?.case_2_name || 'Solace Yoga Studios',
      cat: content?.case_2_cat || 'From 4 studios to 22 in three years',
      metrics: [
        { num: content?.case_2_m1_num || '+286', unit: content?.case_2_m1_unit || '%', lab: content?.case_2_m1_lab || 'Local pack visibility' },
        { num: content?.case_2_m2_num || '5.8', unit: content?.case_2_m2_unit || '×', lab: content?.case_2_m2_lab || 'Bookings from search' },
        { num: content?.case_2_m3_num || '22', unit: content?.case_2_m3_unit || '', lab: content?.case_2_m3_lab || 'Locations dominating local 3-pack' },
        { num: content?.case_2_m4_num || '94', unit: content?.case_2_m4_unit || '%', lab: content?.case_2_m4_lab || 'Branded query share' },
      ],
    },
    {
      tag: content?.case_3_tag || 'B2B SaaS · Bootstrapped',
      name: content?.case_3_name || 'Northbound Analytics',
      cat: content?.case_3_cat || 'Outranking VC-funded competitors with 1/10 the budget',
      metrics: [
        { num: content?.case_3_m1_num || '+612', unit: content?.case_3_m1_unit || '%', lab: content?.case_3_m1_lab || 'Demo signups from search' },
        { num: content?.case_3_m2_num || '11.4', unit: content?.case_3_m2_unit || '×', lab: content?.case_3_m2_lab || 'MRR attributed to SEO' },
        { num: content?.case_3_m3_num || '#2', unit: content?.case_3_m3_unit || '', lab: content?.case_3_m3_lab || 'Above 3 unicorns on category term' },
        { num: content?.case_3_m4_num || '42', unit: content?.case_3_m4_unit || '', lab: content?.case_3_m4_lab || 'Editorial backlinks earned' },
      ],
    },
  ]

  const heading = content?.cases_heading || 'Results that actually move revenue.'
  const subtext = content?.cases_subtext || 'Twelve-month outcomes from real small-business clients. No vanity metrics — just qualified traffic and revenue.'

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 dangerouslySetInnerHTML={{ __html: heading.replace('actually move', '<em>actually move</em>') }} />
          <p className="sub">{subtext}</p>
        </div>
        <div className="cases-grid">
          {cases.map((c) => (
            <article className="case reveal" key={c.name}>
              <div className="case-tag">{c.tag}</div>
              <h3 className="case-name">{c.name}</h3>
              <div className="case-cat">{c.cat}</div>
              <div className="case-metrics">
                {c.metrics.map((m) => (
                  <div className="case-metric" key={m.lab}>
                    <div className="num">{m.num}{m.unit && <em>{m.unit}</em>}</div>
                    <div className="lab">{m.lab}</div>
                  </div>
                ))}
              </div>
              <a href="#" className="case-link">Read case study <span>→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
