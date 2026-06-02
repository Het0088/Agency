export default function MarqueeSection({ content }: { content?: Record<string, string> }) {
  const items = [
    { text: content?.marquee_1 || 'Technical SEO', hasDot: true },
    { text: content?.marquee_2 || 'AI Overviews', hasDot: true },
    { text: content?.marquee_3 || 'GEO & LLMs', hasDot: true },
    { text: content?.marquee_4 || 'Editorial content', serif: true },
    { text: content?.marquee_5 || 'Local Maps', hasDot: true },
    { text: content?.marquee_6 || 'Digital PR', hasDot: true },
    { text: content?.marquee_7 || 'Schema & structured data', serif: true },
    { text: content?.marquee_8 || 'CRO & conversion', hasDot: true },
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
