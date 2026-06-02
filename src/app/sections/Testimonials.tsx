export default function TestimonialsSection({ content }: { content?: Record<string, string> }) {
  const testimonials = [
    { stars: '★★★★★', q: content?.testi_1_quote || '"Within nine months we were ranking #1 for our three highest-intent keywords. The team didn\'t just deliver traffic — they helped us understand why it was working."', name: content?.testi_1_name || 'Elena Marchetti', role: content?.testi_1_role || 'Founder · Maple & Oak Roasters', initial: (content?.testi_1_name || 'Elena')[0] },
    { stars: '★★★★★', q: content?.testi_2_quote || '"We\'ve worked with three SEO agencies before. Omniranq is the first one that felt like a partner instead of a vendor sending PDFs into the void."', name: content?.testi_2_name || 'James Okafor', role: content?.testi_2_role || 'CMO · Northbound Analytics', initial: (content?.testi_2_name || 'James')[0], feature: true },
    { stars: '★★★★★', q: content?.testi_3_quote || '"They got us cited inside ChatGPT for our category before we even knew that was a thing you could optimize for. Clearly thinking three steps ahead."', name: content?.testi_3_name || 'Priya Raghavan', role: content?.testi_3_role || 'Head of Growth · Habitat Goods Co.', initial: (content?.testi_3_name || 'Priya')[0] },
  ]

  const heading = content?.testi_heading || 'What our clients actually say.'
  const subtext = content?.testi_subtext || "Unedited, unpaid, and posted publicly on Clutch and Trustpilot. We've checked."

  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 dangerouslySetInnerHTML={{ __html: heading.replace('actually say.', '<em>actually say.</em>') }} />
          <p className="sub">{subtext}</p>
        </div>
        <div className="testi-grid">
          {testimonials.map((t) => (
            <div className={`testi${t.feature ? ' feature' : ''} reveal`} key={t.name}>
              <div className="stars">{t.stars}</div>
              <p className="q">{t.q}</p>
              <div className="testi-author">
                <div className="avatar">{t.initial}</div>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
