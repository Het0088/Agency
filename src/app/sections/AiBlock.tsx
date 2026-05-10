import Link from 'next/link'
import { ArrowRight, CheckIcon } from '@/components/Icons'

export default function AiBlock() {
  return (
    <section className="ai-block" id="ai">
      <div className="wrap">
        <div className="ai-grid">
          <div className="reveal">
            <span className="eyebrow">The new search era</span>
            <h2>AI didn&apos;t kill SEO. It <em>raised the stakes.</em></h2>
            <p className="lede">Half of search journeys now start in ChatGPT, Perplexity, or Google&apos;s AI Overviews. The brands cited inside those answers are the brands that win the next decade. We optimize for both — the blue links and the AI answers.</p>
            <ul className="ai-points">
              {[
                { bold: 'GEO audits', rest: ' across ChatGPT, Perplexity, Claude, Gemini, and Google AIO — see exactly where you\'re cited (and where you\'re invisible).' },
                { bold: 'Answer-first content', rest: ' structured for LLM retrieval — semantic markup, claim-evidence pairs, citation hooks.' },
                { bold: 'Brand entity building', rest: ' across Wikipedia, Wikidata, Crunchbase, and the open web LLMs train on.' },
                { bold: 'Monthly mention reports', rest: ' showing your share of voice in AI answers vs. competitors — the metric that will matter in 2027.' },
              ].map((item) => (
                <li key={item.bold}>
                  <span className="check"><CheckIcon /></span>
                  <span><strong style={{ color: 'var(--dark-ink)' }}>{item.bold}</strong>{item.rest}</span>
                </li>
              ))}
            </ul>
            <Link href="/services" className="btn btn-primary">
              Read the AI SEO playbook
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
