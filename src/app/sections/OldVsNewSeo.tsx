const oldSeo = [
  'Ranking in Google was the only game',
  'Keyword stuffing',
  'Every link counted (quantity over quality)',
  'Optimized mainly for bots',
  'Quick traffic hacks',
  'Gaming algorithms',
  'Clicks equal victory',
  'Page-one rankings were the goal',
]

const newSeo = [
  'Being retrieved, cited, and trusted across Google and AI',
  'Content meets Google\'s E-E-A-T criteria',
  'GEO — cited in ChatGPT, Gemini, Perplexity',
  'AEO — appear in AI answers and voice search',
  'AIO — structure content for AI workflows',
  'SXO — align content with UX and conversions',
  'Long-term authority building',
  'Visibility across Google, AI, and voice',
]

export default function OldVsNewSeo() {
  return (
    <section className="section ovn-section">
      <div className="wrap">
        <div className="sec-head reveal">
          <h2>The rules have <em>changed</em></h2>
          <p className="sub">SEO in 2026 looks nothing like it did three years ago. Here&#39;s what&#39;s shifted.</p>
        </div>
        <div className="ovn-wrap reveal">
          <div className="ovn-grid">
            <div className="ovn-col">
              <div className="ovn-col-head ovn-head-old">
                <span className="eyebrow" style={{ color: 'inherit', margin: 0 }}>Old SEO</span>
              </div>
              {oldSeo.map((item, i) => (
                <div className="ovn-row" key={i}>
                  <span className="ovn-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ovn-indicator ovn-ind-old">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="ovn-col">
              <div className="ovn-col-head ovn-head-new">
                <span className="eyebrow" style={{ color: 'inherit', margin: 0 }}>New SEO</span>
              </div>
              {newSeo.map((item, i) => (
                <div className="ovn-row" key={i}>
                  <span className="ovn-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ovn-indicator ovn-ind-new">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
