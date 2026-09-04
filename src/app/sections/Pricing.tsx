import Link from 'next/link'
import { ArrowRight, CheckIcon, IconLock, IconUsers, IconZap, IconSparkles } from '@/components/Icons'

type Props = {
  content?: Record<string, string>
}

const defaultPlans = [
  {
    key: 'plan_1',
    name: 'Essential Growth',
    badge: 'Starter',
    price: '$3,500',
    period: '/ month',
    desc: 'For high-intent small businesses and challenger brands establishing search and AI answer visibility.',
    features: [
      'Forensic Technical SEO audit & roadmap',
      '4 AI-optimized authority articles / month',
      'Google AI Overviews & ChatGPT citation hooks',
      'Local SEO & Google Business Profile ranking',
      'Core Web Vitals sub-second optimization',
      'Monthly share of voice reporting dashboard',
      'Dedicated Senior Strategist (no account managers)',
    ],
    ctaText: 'Start with Essential',
    popular: false,
  },
  {
    key: 'plan_2',
    name: 'Market Leader',
    badge: 'Most Popular',
    price: '$6,500',
    period: '/ month',
    desc: 'Full-spectrum SEO, GEO, and digital PR for companies aggressively taking market share from legacy incumbents.',
    features: [
      'Everything in Essential Growth, plus:',
      '8 Long-form strategic content teardowns / month',
      'Brand entity building (Wikidata, Crunchbase, Wikipedia signals)',
      'Digital PR & tier-1 editorial link acquisitions',
      'Perplexity, Claude & Gemini citation optimization',
      'Bi-weekly strategic sprint & ranking review calls',
      'Conversion Rate Optimization (CRO) A/B testing',
      'Direct private Slack channel with lead team',
    ],
    ctaText: 'Scale with Market Leader',
    popular: true,
  },
  {
    key: 'plan_3',
    name: 'Enterprise & Scale',
    badge: 'Full Arsenal',
    price: '$12,000',
    period: '/ month',
    desc: 'For multi-location brands, high-SKU e-commerce stores, and venture-backed SaaS requiring dedicated engineering.',
    features: [
      'Everything in Market Leader, plus:',
      '16 Comprehensive content clusters / month',
      'Programmatic SEO architecture & landing page engines',
      'Dedicated Full-Stack Developer allocation (20 hrs/mo)',
      'Multi-region & International hreflang SEO',
      'Custom LLM sentiment & brand prompt engineering',
      '24/7 Emergency response SLA & uptime monitoring',
      'Executive quarterly board-ready revenue reports',
    ],
    ctaText: 'Book Enterprise Discovery',
    popular: false,
  },
]

export default function PricingSection({ content = {} }: Props) {
  const eyebrow = content.pricing_eyebrow || 'Transparent Retainers'
  const heading = content.pricing_heading || 'Predictable Retainers. Real Revenue ROI.'
  const subtext = content.pricing_subtext || 'No lock-in contracts. 90-day initial execution sprint, then month-to-month. Every account is led by a senior strategist with 8+ years experience.'

  return (
    <section className="section pricing-section" id="pricing">
      <div className="wrap">
        <div className="sec-head reveal text-center" style={{ maxWidth: 840, margin: '0 auto 56px' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{heading.split('Real Revenue ROI.')[0]}<em>Real Revenue ROI.</em></h2>
          <p className="sub">{subtext}</p>
        </div>

        <div className="pricing-grid reveal">
          {defaultPlans.map((plan, i) => {
            const name = content[`${plan.key}_name`] || plan.name
            const badge = content[`${plan.key}_badge`] || plan.badge
            const price = content[`${plan.key}_price`] || plan.price
            const desc = content[`${plan.key}_desc`] || plan.desc
            const cta = content[`${plan.key}_cta`] || plan.ctaText

            return (
              <div className={`pricing-card${plan.popular ? ' pricing-card-popular' : ''}`} key={plan.key}>
                {plan.popular && <div className="pricing-popular-badge"><IconSparkles /> Most Selected</div>}
                
                <div className="pricing-card-head">
                  <span className="pricing-badge">{badge}</span>
                  <h3>{name}</h3>
                  <div className="pricing-price-wrap">
                    <span className="pricing-price">{price}</span>
                    <span className="pricing-period">{plan.period}</span>
                  </div>
                  <p className="pricing-desc">{desc}</p>
                </div>

                <div className="pricing-features">
                  <span className="pricing-features-title">What&apos;s Included:</span>
                  <ul>
                    {plan.features.map(feat => (
                      <li key={feat}>
                        <span className="pricing-check"><CheckIcon /></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-card-foot">
                  <Link
                    href={`/contact?plan=${encodeURIComponent(name)}`}
                    className={`btn ${plan.popular ? 'btn-primary' : 'btn-ghost'} pricing-btn`}
                  >
                    {cta} <span className="arr"><ArrowRight /></span>
                  </Link>
                  <span className="pricing-guarantee">Month-to-month after 90 days • Keep all assets</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pricing-footnote reveal">
          <div className="pricing-footnote-item">
            <strong><IconLock /> 100% Asset Ownership</strong>
            <span>You own all content, schema code, audits, and data forever.</span>
          </div>
          <div className="pricing-footnote-sep" />
          <div className="pricing-footnote-item">
            <strong><IconUsers /> No Junior Account Managers</strong>
            <span>Direct collaboration with the senior strategists doing the work.</span>
          </div>
          <div className="pricing-footnote-sep" />
          <div className="pricing-footnote-item">
            <strong><IconZap /> Free Discovery &amp; Audit</strong>
            <span>We analyze your current rankings &amp; gaps before you invest a dollar.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
