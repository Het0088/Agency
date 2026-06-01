import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

interface CardItem {
  num: string
  slug: string
  title: string
  tagline: string
  desc: string
  highlights: string[]
  result: string
}

export default function ServiceCards({ category, items }: { category: string; items: CardItem[] }) {
  return (
    <div className="svc-cards-grid">
      {items.map((svc) => (
        <Link key={svc.slug} href={`/services/${category}/${svc.slug}`} className="svc-card reveal">
          <div className="svc-card-top">
            <span className="svc-card-num">{svc.num}</span>
            <span className="svc-card-arrow"><ArrowRight /></span>
          </div>
          <h3>{svc.title}</h3>
          <p className="svc-card-tagline">{svc.tagline}</p>
          <p className="svc-card-desc">{svc.desc}</p>
          <div className="svc-card-highlights">
            {svc.highlights.map(h => (
              <span className="svc-card-tag" key={h}>{h}</span>
            ))}
          </div>
          <div className="svc-card-result">
            <span className="svc-card-result-icon">&uarr;</span> {svc.result}
          </div>
        </Link>
      ))}
    </div>
  )
}
