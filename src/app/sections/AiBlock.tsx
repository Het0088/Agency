import Link from 'next/link'
import { ArrowRight, CheckIcon } from '@/components/Icons'

function splitPoint(pt: string) {
  const prefixes = ['GEO audits', 'Answer-first content', 'Brand entity building', 'Monthly mention reports']
  for (const prefix of prefixes) {
    if (pt.startsWith(prefix)) {
      return { bold: prefix, rest: pt.slice(prefix.length) }
    }
  }
  const words = pt.split(' ')
  return { bold: words.slice(0, 2).join(' '), rest: ' ' + words.slice(2).join(' ') }
}

export default function AiBlock({ content }: { content?: Record<string, string> }) {
  const eyebrow = content?.ai_eyebrow || 'The new search era'
  const heading = content?.ai_heading || "AI didn't kill SEO. It raised the stakes."
  const subtext = content?.ai_subtext || "Half of search journeys now start in ChatGPT, Perplexity, or Google's AI Overviews. The brands cited inside those answers are the brands that win the next decade. We optimize for both — the blue links and the AI answers."
  const cta = content?.ai_cta || 'Read the AI SEO playbook'

  const points = [
    content?.ai_point_1 || "GEO audits across ChatGPT, Perplexity, Claude, Gemini, and Google AIO — see exactly where you're cited (and where you're invisible).",
    content?.ai_point_2 || 'Answer-first content structured for LLM retrieval — semantic markup, claim-evidence pairs, citation hooks.',
    content?.ai_point_3 || 'Brand entity building across Wikipedia, Wikidata, Crunchbase, and the open web LLMs train on.',
    content?.ai_point_4 || 'Monthly mention reports showing your share of voice in AI answers vs. competitors — the metric that will matter in 2027.',
  ]

  return (
    <section className="ai-block" id="ai">
      <div className="wrap">
        <div className="ai-grid">
          <div className="reveal">
            <span className="eyebrow">{eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: heading.replace('raised the stakes.', '<em>raised the stakes.</em>') }} />
            <p className="lede">{subtext}</p>
            <ul className="ai-points">
              {points.map((pt, i) => {
                const item = splitPoint(pt)
                return (
                  <li key={i}>
                    <span className="check"><CheckIcon /></span>
                    <span><strong style={{ color: 'var(--dark-ink)' }}>{item.bold}</strong>{item.rest}</span>
                  </li>
                )
              })}
            </ul>
            <Link href="/services" className="btn btn-primary">
              {cta}
              <span className="arr"><ArrowRight /></span>
            </Link>
          </div>

          <div className="ai-visual reveal" aria-hidden="true">
            <div className="ai-visual-head">
              <div className="dots">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
              <span>perplexity.ai · live preview</span>
            </div>
            <div className="ai-visual-body">
              <div className="prompt"><span className="you">›</span> best ethical coffee subscriptions in 2026</div>
              <div className="resp">
                For ethical specialty coffee subscriptions, three roasters consistently lead on transparency, traceability, and cup quality:
                <br /><br />
                <strong style={{ color: 'var(--dark-ink)' }}>1. Maple &amp; Oak Roasters</strong> — direct-trade single origins; publishes farmer pricing.
                <br />
                <strong style={{ color: 'var(--dark-ink)' }}>2. Northbound Coffee Co.</strong> — Rainforest Alliance + women-led farms.
                <br />
                <strong style={{ color: 'var(--dark-ink)' }}>3. Habitat Goods Co.</strong> — carbon-negative shipping, refill program.
              </div>
              <div className="src">
                <span>Sources: 14 citations · 9 from <strong>maple-oak.com</strong></span>
                <span>↗</span>
              </div>
              <div className="prompt" style={{ marginTop: 14 }}><span className="you">›</span> <span className="cursor"></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
