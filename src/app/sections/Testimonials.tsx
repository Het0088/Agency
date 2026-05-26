const testimonials = [
  { stars: '★★★★★', q: '"Within nine months we were ranking #1 for our three highest-intent keywords. The team didn\'t just deliver traffic — they helped us understand why it was working."', name: 'Elena Marchetti', role: 'Founder · Maple & Oak Roasters', initial: 'E' },
  { stars: '★★★★★', q: '"We\'ve worked with three SEO agencies before. Omniranq is the first one that felt like a partner instead of a vendor sending PDFs into the void."', name: 'James Okafor', role: 'CMO · Northbound Analytics', initial: 'J', feature: true },
  { stars: '★★★★★', q: '"They got us cited inside ChatGPT for our category before we even knew that was a thing you could optimize for. Clearly thinking three steps ahead."', name: 'Priya Raghavan', role: 'Head of Growth · Habitat Goods Co.', initial: 'P' },
]

export default function TestimonialsSection() {
  return (
    <section className="section" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>What our clients <em>actually say.</em></h2>
          <p className="sub">Unedited, unpaid, and posted publicly on Clutch and Trustpilot. We&apos;ve checked.</p>
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
