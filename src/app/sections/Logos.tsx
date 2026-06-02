export default function LogosSection({ content }: { content?: Record<string, string> }) {
  return (
    <section className="logos">
      <div className="wrap">
        <div className="logos-label">{content?.logos_label || 'Trusted by 600+ small businesses worldwide'}</div>
        <div className="logos-row">
          <span className="logo-item">Maple <span className="sub">&amp; Oak</span></span>
          <span className="logo-item serif-i">Northbound</span>
          <span className="logo-item">FERN<span className="sub">Studios</span></span>
          <span className="logo-item">Habitat <span className="sub">Goods Co.</span></span>
          <span className="logo-item serif-i">Cresta</span>
          <span className="logo-item">SOLACE<span className="sub">Yoga</span></span>
          <span className="logo-item">Birch<span className="sub">Architects</span></span>
        </div>
      </div>
    </section>
  )
}
