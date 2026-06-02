import { CheckIcon } from '@/components/Icons'


export default function WhyNeedSeo({ content }: { content?: Record<string, string> }) {
  const reasons = [
    {
      num: '01',
      title: content?.whyseo_1_title || '93% of online experiences start with search',
      desc: content?.whyseo_1_desc || "If your business isn't visible when people search, you don't exist to them. SEO puts you where your customers are already looking.",
    },
    {
      num: '02',
      title: content?.whyseo_2_title || "Organic traffic compounds — ads don't",
      desc: content?.whyseo_2_desc || 'Paid ads stop the moment you stop paying. SEO builds an asset that grows month over month, generating leads while you sleep.',
    },
    {
      num: '03',
      title: content?.whyseo_3_title || 'Your competitors are already investing',
      desc: content?.whyseo_3_desc || 'Every day you delay SEO, competitors are claiming the keywords, citations, and authority that should be yours.',
    },
    {
      num: '04',
      title: content?.whyseo_4_title || 'AI search is reshaping visibility',
      desc: content?.whyseo_4_desc || 'ChatGPT, Perplexity, and Google AI Overviews are answering queries directly. Brands not optimized for AI retrieval are becoming invisible.',
    },
    {
      num: '05',
      title: content?.whyseo_5_title || 'Trust is earned through rankings',
      desc: content?.whyseo_5_desc || 'Users trust organic results 5.66x more than paid ads. Page-one presence signals credibility and authority to your audience.',
    },
    {
      num: '06',
      title: content?.whyseo_6_title || 'SEO drives the highest-intent traffic',
      desc: content?.whyseo_6_desc || 'People searching for what you sell are ready to buy. SEO captures demand at the exact moment of intent — no interruption, no convincing.',
    },
  ]

  const heading = content?.whyseo_heading || 'Why your business needs SEO.'
  const subtext = content?.whyseo_subtext || "Every day without SEO is traffic, leads, and revenue you're handing to competitors. Here's why it matters more in 2026 than ever."

  return (
    <section className="section why-seo">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2 dangerouslySetInnerHTML={{ __html: heading.replace('needs SEO.', '<em>needs SEO.</em>') }} />
          <p className="sub">{subtext}</p>
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
