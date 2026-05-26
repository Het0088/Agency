import { CheckIcon } from '@/components/Icons'

const reasons = [
  {
    num: '01',
    title: '93% of online experiences start with search',
    desc: 'If your business isn\'t visible when people search, you don\'t exist to them. SEO puts you where your customers are already looking.',
  },
  {
    num: '02',
    title: 'Organic traffic compounds — ads don\'t',
    desc: 'Paid ads stop the moment you stop paying. SEO builds an asset that grows month over month, generating leads while you sleep.',
  },
  {
    num: '03',
    title: 'Your competitors are already investing',
    desc: 'Every day you delay SEO, competitors are claiming the keywords, citations, and authority that should be yours.',
  },
  {
    num: '04',
    title: 'AI search is reshaping visibility',
    desc: 'ChatGPT, Perplexity, and Google AI Overviews are answering queries directly. Brands not optimized for AI retrieval are becoming invisible.',
  },
  {
    num: '05',
    title: 'Trust is earned through rankings',
    desc: 'Users trust organic results 5.66x more than paid ads. Page-one presence signals credibility and authority to your audience.',
  },
  {
    num: '06',
    title: 'SEO drives the highest-intent traffic',
    desc: 'People searching for what you sell are ready to buy. SEO captures demand at the exact moment of intent — no interruption, no convincing.',
  },
]

export default function WhyNeedSeo() {
  return (
    <section className="section why-seo">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>Why your business <em>needs SEO.</em></h2>
          <p className="sub">Every day without SEO is traffic, leads, and revenue you&#39;re handing to competitors. Here&#39;s why it matters more in 2026 than ever.</p>
        </div>
        <div className="why-seo-grid">
          {reasons.map((r) => (
            <div className="why-seo-card reveal" key={r.num}>
              <div className="why-seo-icon">
                <CheckIcon />
              </div>
              <span className="why-seo-num">{r.num}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
