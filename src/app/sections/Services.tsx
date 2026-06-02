import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

export default function ServicesSection({ content }: { content?: Record<string, string> }) {
  const services = [
    { num: '01 / Search', title: content?.svc_1_title || 'SEO foundations', desc: content?.svc_1_desc || 'The on-page, technical, and content fundamentals that make Google trust you. Our flagship — and what every other service builds on.' },
    { num: '02 / Local', title: content?.svc_2_title || 'Local & Maps', desc: content?.svc_2_desc || 'Win the 3-pack and the "near me" queries that drive walk-ins, calls, and bookings — across multi-location businesses too.' },
    { num: '03 / Technical', title: content?.svc_3_title || 'Technical SEO', desc: content?.svc_3_desc || 'Core Web Vitals, crawl budget, schema, faceted nav, JS rendering. The plumbing nobody else wants to touch — we love it.' },
    { num: '04 / Content', title: content?.svc_4_title || 'Editorial & content', desc: content?.svc_4_desc || 'Long-form, programmatic, and answer-first content written by humans who know your industry — not interns and not AI slop.' },
    { num: '05 / Authority', title: content?.svc_5_title || 'Digital PR & links', desc: content?.svc_5_desc || 'Editorial backlinks from publications your customers actually read. No PBNs, no link farms, no shortcuts that backfire.' },
    { num: '06 / AI / GEO', title: content?.svc_6_title || 'AI Search & GEO', desc: content?.svc_6_desc || 'Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini. The new rules of being found — already in motion.' },
  ]

  const heading = content?.svc_heading || 'What we do, in plain English.'
  const subtext = content?.svc_subtext || 'Six tightly-scoped services that compound when run together. No bloated retainers, no work-for-the-sake-of-work.'

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 dangerouslySetInnerHTML={{ __html: heading.replace('plain English.', '<em>plain English.</em>') }} />
          <p className="sub">{subtext}</p>
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
