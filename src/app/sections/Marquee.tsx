export default function MarqueeSection() {
  const items = [
    { text: 'Technical SEO', hasDot: true },
    { text: 'AI Overviews', hasDot: true },
    { text: 'GEO & LLMs', hasDot: true },
    { text: 'Editorial content', serif: true },
    { text: 'Local Maps', hasDot: true },
    { text: 'Digital PR', hasDot: true },
    { text: 'Schema & structured data', serif: true },
    { text: 'CRO & conversion', hasDot: true },
  ]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`marquee-item${item.serif ? ' serif-i' : ''}`}>
            {item.text}
            {item.hasDot && <span className="dot"></span>}
          </span>
        ))}
      </div>
    </div>
  )
}
