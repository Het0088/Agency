export default function StatsSection({ content }: { content?: Record<string, string> }) {
  return (
    <section className="stats">
      <div className="wrap">
        <div className="stats-grid">
          <div className="stat reveal">
            <div className="stat-num"><span data-count={content?.stat_1_num || '412'} data-decimals="0">0</span><span className="unit">{content?.stat_1_unit || '%'}</span></div>
            <div className="stat-label">{content?.stat_1_label || 'Average organic traffic growth in 12 months'}</div>
          </div>
          <div className="stat reveal">
            <div className="stat-num"><span data-count={content?.stat_2_num || '8.5'} data-decimals="1">0</span><span className="unit">{content?.stat_2_unit || '×'}</span></div>
            <div className="stat-label">{content?.stat_2_label || 'Average return on retainer for small business clients'}</div>
          </div>
          <div className="stat reveal">
            <div className="stat-num"><span data-count={content?.stat_3_num || '600'} data-decimals="0">0</span><span className="unit">{content?.stat_3_unit || '+'}</span></div>
            <div className="stat-label">{content?.stat_3_label || 'Brands grown across 42 countries since 2014'}</div>
          </div>
          <div className="stat reveal">
            <div className="stat-num"><span data-count={content?.stat_4_num || '12'} data-decimals="0">0</span><span className="unit">{content?.stat_4_unit || 'yrs'}</span></div>
            <div className="stat-label">{content?.stat_4_label || 'Doing exactly this — no pivots, no fads'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
