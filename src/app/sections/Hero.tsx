import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

export default function HeroSection({ 
  title, 
  eyebrow = "Global SEO Studio · 2014→2026", 
  lede 
}: { 
  title?: React.ReactNode, 
  eyebrow?: string, 
  lede?: string 
}) {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="reveal in">
            <span className="eyebrow">{eyebrow}</span>
            <h1>
              {title || (
                <>
                  Small businesses<br />
                  deserve to be<br />
                  <em>unmissable.</em>
                </>
              )}
            </h1>
            <p className="lede">
              {lede || "We're a 38-person SEO studio that helps independent shops, founders, and challenger brands win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next."}
            </p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn btn-primary">
                Get a free SEO audit
                <span className="arr"><ArrowRight /></span>
              </Link>
              <Link href="/services" className="btn btn-ghost">See how we work</Link>
            </div>
            <div className="hero-rating">
              <div className="stars">★★★★★</div>
              <div className="meta"><strong>4.9 / 5</strong> across 412 reviews · Clutch · Trustpilot · Google</div>
            </div>
          </div>

          <div className="hero-visual reveal in" aria-hidden="true">
            <div className="hero-visual-inner">
              <div className="hv-header">
                <div>
                  <div className="hv-tag">Rank tracker · live</div>
                  <div className="hv-title">Maple &amp; Oak<br />Coffee Roasters</div>
                </div>
                <span className="hv-pill"><span className="dot"></span>Trending up</span>
              </div>
              <div className="hv-chart">
                <svg viewBox="0 0 400 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#e8e3d6" strokeDasharray="2 4" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#e8e3d6" strokeDasharray="2 4" />
                  <line x1="0" y1="140" x2="400" y2="140" stroke="#e8e3d6" strokeDasharray="2 4" />
                  <path d="M0,150 C40,140 70,135 100,118 C140,98 170,84 210,68 C250,52 290,44 330,32 L400,22 L400,180 L0,180 Z" fill="url(#g1)" />
                  <path d="M0,150 C40,140 70,135 100,118 C140,98 170,84 210,68 C250,52 290,44 330,32 L400,22" fill="none" stroke="#ff5a1f" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="0" cy="150" r="3" fill="#ff5a1f" />
                  <circle cx="100" cy="118" r="3" fill="#ff5a1f" />
                  <circle cx="210" cy="68" r="3" fill="#ff5a1f" />
                  <circle cx="330" cy="32" r="3" fill="#ff5a1f" />
                  <circle cx="400" cy="22" r="4" fill="#ff5a1f" stroke="#fff" strokeWidth="2" />
                  <text x="0" y="172" fontFamily="Geist Mono, monospace" fontSize="9" fill="#8b9097">Jan</text>
                  <text x="195" y="172" fontFamily="Geist Mono, monospace" fontSize="9" fill="#8b9097">Apr</text>
                  <text x="385" y="172" fontFamily="Geist Mono, monospace" fontSize="9" fill="#8b9097">Jul</text>
                </svg>
              </div>
              <div className="hv-rows">
                <div className="hv-row">
                  <span className="kw">&quot;specialty coffee near me&quot;</span>
                  <span className="pos">#1</span>
                  <span className="delta">↑ 14</span>
                </div>
                <div className="hv-row">
                  <span className="kw">&quot;single origin roasters&quot;</span>
                  <span className="pos">#3</span>
                  <span className="delta">↑ 22</span>
                </div>
                <div className="hv-row">
                  <span className="kw">&quot;ethical coffee subscription&quot;</span>
                  <span className="pos">#2</span>
                  <span className="delta">↑ 31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
