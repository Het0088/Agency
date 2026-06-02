const icons = [
  <svg key="1" viewBox="0 0 24 24" fill="none"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
]

export default function SeoProcess({ content }: { content?: Record<string, string> }) {
  const steps = [
    {
      num: '1',
      title: content?.seoproc_1_title || 'Understanding Your Business',
      desc: content?.seoproc_1_desc || 'The process begins with gaining a clear understanding of your business and industry to ensure the strategy aligns with your goals.',
    },
    {
      num: '2',
      title: content?.seoproc_2_title || 'AI-Powered Audits and Keyword Research',
      desc: content?.seoproc_2_desc || 'AI tools are used to conduct detailed audits of your website and perform keyword research, identifying key opportunities for improvement.',
    },
    {
      num: '3',
      title: content?.seoproc_3_title || 'Personalized Content and SEO Recommendations',
      desc: content?.seoproc_3_desc || 'Based on findings, we develop tailored content strategies and provide SEO recommendations to enhance both content and site performance.',
    },
    {
      num: '4',
      title: content?.seoproc_4_title || 'LLM Optimization',
      desc: content?.seoproc_4_desc || 'We research and optimize your brand to boost visibility in LLM searches, driving higher brand awareness where high-intent searches are happening.',
    },
    {
      num: '5',
      title: content?.seoproc_5_title || 'Continuous Monitoring and Optimization',
      desc: content?.seoproc_5_desc || 'The strategy is regularly monitored using AI tools, ensuring it remains effective and adapts to industry changes and algorithm updates.',
    },
    {
      num: '6',
      title: content?.seoproc_6_title || 'Measuring ROI and Refining the Strategy',
      desc: content?.seoproc_6_desc || 'We track your performance and refine the strategy as necessary, optimizing results and achieving business goals with every action.',
    },
  ]

  const eyebrow = content?.seoproc_eyebrow || 'How we work'
  const heading = content?.seoproc_heading || 'Our AI SEO Process'
  const subtext = content?.seoproc_subtext || 'A well-defined, structured process built on industry best practices to address the unique needs of each client.'

  return (
    <section className="section seo-proc">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: heading.replace('AI SEO Process', '<em>AI SEO Process</em>') }} />
          </div>
          <p className="sub">{subtext}</p>
        </div>
        <div className="seo-proc-grid">
          {steps.map((s, i) => (
            <div className="seo-proc-card reveal" key={s.num}>
              <div className="seo-proc-head">
                <span className="seo-proc-icon">{icons[i]}</span>
                <span className="seo-proc-num">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
