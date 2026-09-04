import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'
import { getContent } from '@/lib/get-content'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/seo')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import Image from 'next/image'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  ArrowRight, IconBuilding, IconSearch, IconDocument, IconZap, IconActivity,
  IconDollarSign, IconMonitor, IconGlobe, IconUsers, IconLayers, IconClock,
  IconBarChart, IconMapPin, IconShoppingCart, IconShield, IconMessageSquare,
  IconTrendingUp, IconTarget, CheckIcon, IconClose
} from '@/components/Icons'

const procIcons = [<IconBuilding key={0}/>, <IconSearch key={1}/>, <IconDocument key={2}/>, <IconZap key={3}/>, <IconActivity key={4}/>, <IconDollarSign key={5}/>]
const whyIcons = [<IconMonitor key={0}/>, <IconGlobe key={1}/>, <IconUsers key={2}/>, <IconLayers key={3}/>, <IconClock key={4}/>, <IconBarChart key={5}/>]
const advIcons = [<IconSearch key={0}/>, <IconDocument key={1}/>, <IconTrendingUp key={2}/>, <IconActivity key={3}/>, <IconDollarSign key={4}/>, <IconShield key={5}/>]
const svcIcons = [<IconZap key={0}/>, <IconMapPin key={1}/>, <IconShoppingCart key={2}/>, <IconBuilding key={3}/>, <IconSearch key={4}/>, <IconTarget key={5}/>]
const svcSlugs = ['technical-seo', 'local-seo', 'ecommerce-seo', 'enterprise-seo', 'seo-audits', 'chatgpt']
const svcHrefs = [null, null, null, null, null, '/services/ai-search']
const indIcons = [<IconDollarSign key={0}/>, <IconBuilding key={1}/>, <IconShoppingCart key={2}/>, <IconShield key={3}/>, <IconMapPin key={4}/>, <IconDocument key={5}/>, <IconUsers key={6}/>, <IconLayers key={7}/>, <IconZap key={8}/>, <IconBarChart key={9}/>, <IconGlobe key={10}/>, <IconActivity key={11}/>, <IconClock key={12}/>, <IconMonitor key={13}/>, <IconTrendingUp key={14}/>, <IconMessageSquare key={15}/>]

export default async function SeoServicesPage() {
  const c = await getContent('/services/seo')

  const processSteps = Array.from({length: 6}, (_, i) => ({
    icon: procIcons[i], num: String(i + 1),
    title: c[`proc_${i+1}_title`], desc: c[`proc_${i+1}_desc`],
  }))

  const whyUs = Array.from({length: 6}, (_, i) => ({
    icon: whyIcons[i], title: c[`whyus_${i+1}_title`], desc: c[`whyus_${i+1}_desc`],
  }))

  const advantages = Array.from({length: 6}, (_, i) => ({
    icon: advIcons[i], title: c[`adv_${i+1}_title`], desc: c[`adv_${i+1}_desc`],
  }))

  const oldRules = Array.from({length: 8}, (_, i) => c[`old_${i+1}`])
  const newRules = Array.from({length: 8}, (_, i) => c[`new_${i+1}`])

  const seoServices = Array.from({length: 6}, (_, i) => ({
    icon: svcIcons[i], slug: svcSlugs[i],
    title: c[`svc_${i+1}_title`], desc: c[`svc_${i+1}_desc`],
    href: svcHrefs[i],
  }))

  const industries = Array.from({length: 16}, (_, i) => ({
    icon: indIcons[i], label: c[`ind_${i+1}`],
  }))

  const reviews = [
    { initial: c.rev_1_name?.[0] || 'N', color: '#0e1410', name: c.rev_1_name, ago: c.rev_1_time, text: c.rev_1_text },
    { initial: c.rev_2_name?.[0] || 'H', color: '#ff5a1f', name: c.rev_2_name, ago: c.rev_2_time, text: c.rev_2_text },
    { initial: c.rev_3_name?.[0] || 'S', color: '#1a6b4d', name: c.rev_3_name, ago: c.rev_3_time, text: c.rev_3_text },
  ]

  const faqs = Array.from({length: 5}, (_, i) => ({
    q: c[`faq_${i+1}_q`], a: c[`faq_${i+1}_a`],
  }))

  return (
    <>
      <Topbar text={c.topbar_text} linkText={c.topbar_link} linkHref="/contact" />
      <Nav active="services" />

      <header className="ref-hero">
        <div className="wrap">
          <div className="ref-hero-inner">
            <div className="ref-hero-copy">
              <span className="ref-eyebrow">{c.hero_eyebrow}</span>
              <h1>{c.hero_heading?.split(/artificial intelligence/i).map((part, i, arr) =>
                i < arr.length - 1 ? <span key={i}>{part}<em>artificial intelligence.</em></span> : part
              ) || c.hero_heading}</h1>
              <p className="ref-hero-sub">{c.hero_subtext}</p>
              <div className="ref-hero-actions">
                <Link href="/contact" className="btn btn-primary">{c.hero_cta1} <span className="arr"><ArrowRight /></span></Link>
                <a href="#process" className="btn btn-ghost">{c.hero_cta2}</a>
              </div>
              <div className="ref-hero-stats">
                <div className="ref-stat"><div className="ref-stat-num">{c.hero_stat1_num}</div><div className="ref-stat-label">{c.hero_stat1_label}</div></div>
                <div className="ref-stat"><div className="ref-stat-num">{c.hero_stat2_num}</div><div className="ref-stat-label">{c.hero_stat2_label}</div></div>
                <div className="ref-stat"><div className="ref-stat-num">{c.hero_stat3_num}</div><div className="ref-stat-label">{c.hero_stat3_label}</div></div>
                <div className="ref-stat"><div className="ref-stat-num">{c.hero_stat4_num}</div><div className="ref-stat-label">{c.hero_stat4_label}</div></div>
              </div>
            </div>
            <div className="ref-hero-visual">
              <div className="ref-hero-img-main">
                <Image src="/images/hero-seo-main.jpg" alt="AI SEO Strategy & Analysis" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-hero-img-sub">
                <Image src="/images/hero-seo-team.jpg" alt="Team & Collaboration" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-hero-badge"><IconTarget /></div>
            </div>
          </div>
        </div>
      </header>

      <section className="ref-contact-banner" id="contact-top">
        <div className="wrap">
          <div className="ref-contact-inner">
            <div className="ref-contact-copy">
              <h2>{c.contact_heading?.split(/free SEO audit/i).map((part, i, arr) =>
                i < arr.length - 1 ? <span key={i}>{part}<em>free SEO audit</em></span> : part
              ) || c.contact_heading}</h2>
              <p>{c.contact_desc}</p>
            </div>
            <form className="ref-contact-form" action="/contact" method="get">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <input type="tel" placeholder="Phone Number" />
              <input type="url" placeholder="Website URL" />
              <textarea placeholder="Tell us about your SEO goals…" rows={3} />
              <div className="ref-form-submit">
                <button type="submit" className="btn btn-primary">{c.contact_btn} <span className="arr"><ArrowRight /></span></button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-intro-grid">
            <div className="ref-intro-images">
              <div className="ref-intro-img-lg">
                <Image src="/images/intro-strategy.jpg" alt="AI Strategy & Team" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-intro-img-sm">
                <Image src="/images/intro-office.jpg" alt="Office & Work" fill style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
              <div className="ref-intro-float" style={{ top: '205px', left: '58%' }}><IconSearch /></div>
              <div className="ref-intro-float" style={{ bottom: '140px', left: '18px' }}><IconZap /></div>
            </div>
            <div className="ref-intro-text reveal">
              <span className="eyebrow">{c.intro_eyebrow}</span>
              <h2>{c.intro_heading?.split(/modern search landscape/i).map((part, i, arr) =>
                i < arr.length - 1 ? <span key={i}>{part}<em>modern search landscape.</em></span> : part
              ) || c.intro_heading}</h2>
              <p>{c.intro_p1}</p>
              <p>{c.intro_p2}</p>
              <p>{c.intro_p3}</p>
              <a href="#process" className="ref-cta-link">{c.intro_cta}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-section-dark section" id="process">
        <div className="wrap">
          <div className="ref-process-header reveal">
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>{c.proc_eyebrow}</span>
            <h2 style={{ color: 'var(--dark-ink)' }}>{c.proc_heading?.split(/AI SEO Process/i).map((part, i, arr) =>
              i < arr.length - 1 ? <span key={i}>{part}<em>AI SEO Process</em></span> : part
            ) || c.proc_heading}</h2>
            <p style={{ color: 'var(--dark-ink-soft)', maxWidth: 620, margin: '12px auto 0' }}>{c.proc_sub}</p>
          </div>
          <div className="ref-process-grid">
            {processSteps.map(s => (
              <div className="ref-process-card reveal" key={s.num}>
                <div className="ref-process-num">{s.num}</div>
                <div className="ref-process-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="ref-features-header reveal">
            <span className="eyebrow">{c.whyus_eyebrow}</span>
            <h2>{c.whyus_heading?.split(/Real competitive advantage/i).map((part, i, arr) =>
              i < arr.length - 1 ? <span key={i}>{part}<em>Real competitive advantage.</em></span> : part
            ) || c.whyus_heading}</h2>
            <p className="sub">{c.whyus_sub}</p>
          </div>
          <div className="ref-features-grid">
            {whyUs.map(f => (
              <div className="ref-feature-card reveal" key={f.title}>
                <div className="ref-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-features-header reveal">
            <span className="eyebrow">{c.adv_eyebrow}</span>
            <h2>{c.adv_heading?.split(/faster and more effective/i).map((part, i, arr) =>
              i < arr.length - 1 ? <span key={i}>{part}<em>faster and more effective.</em></span> : part
            ) || c.adv_heading}</h2>
            <p className="sub">{c.adv_sub}</p>
          </div>
          <div className="ref-features-grid">
            {advantages.map(a => (
              <div className="ref-adv-card reveal" key={a.title}>
                <div className="ref-feature-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="ref-rules-header reveal">
            <h2>{c.rules_heading?.split(/changed/i).map((part, i, arr) =>
              i < arr.length - 1 ? <span key={i}>{part}<em>changed.</em></span> : part
            ) || c.rules_heading}</h2>
            <p>{c.rules_sub}</p>
          </div>
          <div className="ref-rules-table reveal">
            <div className="ref-rules-head">
              <div className="ref-rules-col-label ref-col-old"><span className="ref-rules-dot ref-dot-old" />OLD SEO</div>
              <div className="ref-rules-col-label ref-col-new"><span className="ref-rules-dot ref-dot-new" />NEW SEO</div>
            </div>
            {oldRules.map((old, i) => (
              <div className="ref-rules-row" key={i}>
                <div className="ref-rules-cell ref-cell-old">
                  <span className="ref-cell-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ref-cell-icon ref-cell-x"><IconClose /></span>
                  {old}
                </div>
                <div className="ref-rules-cell">
                  <span className="ref-cell-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ref-cell-icon ref-cell-check"><CheckIcon /></span>
                  {newRules[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-features-header reveal">
            <span className="eyebrow">{c.svc_eyebrow}</span>
            <h2>{c.svc_heading?.split(/optimisation/i).map((part, i, arr) =>
              i < arr.length - 1 ? <span key={i}>{part}<em>optimisation.</em></span> : part
            ) || c.svc_heading}</h2>
            <p className="sub">{c.svc_sub}</p>
          </div>
          <div className="ref-features-grid">
            {seoServices.map(s => (
              <Link href={s.href || `/services/seo/${s.slug}`} className="ref-services-card reveal" key={s.slug}>
                <div className="ref-feature-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="ref-card-arrow"><ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="ref-industries-header reveal">
            <div>
              <span className="eyebrow">{c.ind_eyebrow}</span>
              <h2>{c.ind_heading}</h2>
            </div>
            <p>{c.ind_sub}</p>
          </div>
          <div className="ref-industries-grid">
            {industries.map(ind => (
              <Link href="/contact" className="ref-industry-tile reveal" key={ind.label}>
                <div className="ref-industry-icon">{ind.icon}</div>
                <span>{ind.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="ref-testimonials-header reveal">
            <div>
              <span className="eyebrow">{c.testi_eyebrow}</span>
              <h2>{c.testi_heading}</h2>
            </div>
            <p>{c.testi_sub}</p>
          </div>
          <div className="ref-testimonials-grid">
            <div className="ref-reviews-panel reveal">
              <div className="ref-google-bar">
                <div className="ref-google-g">G</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>{c.testi_count}</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                    {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#FBBC04', fontSize: 16 }}>{s}</span>)}
                    <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 6, color: 'var(--ink)' }}>{c.testi_score}</span>
                  </div>
                </div>
              </div>
              {reviews.map(r => (
                <div className="ref-review-card" key={r.name}>
                  <div className="ref-reviewer-row">
                    <div className="ref-reviewer-avatar" style={{ background: r.color }}>{r.initial}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{r.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 1 }}>★★★★★ · {r.ago}</div>
                    </div>
                  </div>
                  <p className="ref-review-text">{r.text}</p>
                </div>
              ))}
            </div>
            <div className="ref-video-panel reveal">
              <div className="ref-video-thumb">
                <div className="ref-video-play">▶</div>
                <div className="ref-video-label">Client Success Story — Watch Now</div>
              </div>
              <div className="ref-video-thumbs-row">
                {[0,1,2,3].map(i => <div className="ref-video-mini" key={i}>▶</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="ref-faq-box reveal">
            <div className="ref-faq-header">
              <h2>Frequently Asked Questions</h2>
            </div>
            {faqs.map(f => (
              <details className="ref-faq-item" key={f.q}>
                <summary className="ref-faq-question">
                  {f.q}
                  <span className="ref-faq-toggle">+</span>
                </summary>
                <div className="ref-faq-answer">{f.a}</div>
              </details>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/contact" className="btn btn-primary" style={{ borderRadius: 999 }}>
              {c.topbar_cta} <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
