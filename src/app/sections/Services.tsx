import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

const services = [
  { num: '01 / Search', title: 'SEO foundations', desc: 'The on-page, technical, and content fundamentals that make Google trust you. Our flagship — and what every other service builds on.' },
  { num: '02 / Local', title: 'Local & Maps', desc: 'Win the 3-pack and the "near me" queries that drive walk-ins, calls, and bookings — across multi-location businesses too.' },
  { num: '03 / Technical', title: 'Technical SEO', desc: 'Core Web Vitals, crawl budget, schema, faceted nav, JS rendering. The plumbing nobody else wants to touch — we love it.' },
  { num: '04 / Content', title: 'Editorial & content', desc: 'Long-form, programmatic, and answer-first content written by humans who know your industry — not interns and not AI slop.' },
  { num: '05 / Authority', title: 'Digital PR & links', desc: 'Editorial backlinks from publications your customers actually read. No PBNs, no link farms, no shortcuts that backfire.' },
  { num: '06 / AI / GEO', title: 'AI Search & GEO', desc: 'Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini. The new rules of being found — already in motion.' },
]

export default function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>What we do, <em>in plain English.</em></h2>
          <p className="sub">Six tightly-scoped services that compound when run together. No bloated retainers, no work-for-the-sake-of-work.</p>
        </div>
        <div className="services-grid">
          {services.map((s) => (
            <Link className="service reveal" href="/services" key={s.num}>
              <div className="service-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-arrow"><ArrowRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
