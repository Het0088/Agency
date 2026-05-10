const cases = [
  {
    tag: 'Specialty Retail · DTC', name: 'Maple & Oak Coffee Roasters', cat: 'From local roastery to national subscription brand',
    metrics: [
      { num: '+412', unit: '%', lab: 'Organic sessions' },
      { num: '14.2', unit: '×', lab: 'ROAS on retainer' },
      { num: '#1', unit: '', lab: '"specialty coffee subscription"' },
      { num: '38', unit: '%', lab: 'Cited in AI answers' },
    ],
  },
  {
    tag: 'Health & Wellness · Multi-location', name: 'Solace Yoga Studios', cat: 'From 4 studios to 22 in three years',
    metrics: [
      { num: '+286', unit: '%', lab: 'Local pack visibility' },
      { num: '5.8', unit: '×', lab: 'Bookings from search' },
      { num: '22', unit: '', lab: 'Locations dominating local 3-pack' },
      { num: '94', unit: '%', lab: 'Branded query share' },
    ],
  },
  {
    tag: 'B2B SaaS · Bootstrapped', name: 'Northbound Analytics', cat: 'Outranking VC-funded competitors with 1/10 the budget',
    metrics: [
      { num: '+612', unit: '%', lab: 'Demo signups from search' },
      { num: '11.4', unit: '×', lab: 'MRR attributed to SEO' },
      { num: '#2', unit: '', lab: 'Above 3 unicorns on category term' },
      { num: '42', unit: '', lab: 'Editorial backlinks earned' },
    ],
  },
]

export default function CasesSection() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Results that <em>actually move</em> revenue.</h2>
          <p className="sub">Twelve-month outcomes from real small-business clients. No vanity metrics — just qualified traffic and revenue.</p>
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
