import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/ai-search')
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import ServiceCards from '@/components/ServiceCards'
import { ArrowRight } from '@/components/Icons'


const cards = [
  { num: '01', slug: 'chatgpt', title: 'ChatGPT Optimization', tagline: 'Be the brand ChatGPT recommends.', desc: 'We engineer the conditions that make ChatGPT cite your brand consistently across millions of daily search queries.', highlights: ['Entity optimization', 'Citation tracking', 'LLM content engineering', 'Competitor displacement'], result: '340% avg. brand mention increase' },
  { num: '02', slug: 'google-aio', title: 'Google AI Overviews', tagline: 'Get featured above the blue links.', desc: 'AI Overviews appear on 40%+ of queries. We optimize your content specifically for AIO inclusion and citation.', highlights: ['Trigger query mapping', 'AIO content formatting', 'E-E-A-T signals', 'Weekly tracking'], result: '12 new AIO citations per month (avg)' },
  { num: '03', slug: 'gemini', title: 'Gemini Optimization', tagline: 'Own the Google AI ecosystem.', desc: 'Gemini powers Google Search AI, Android assistants, and enterprise tools. We ensure your brand is a recognized entity.', highlights: ['Knowledge Panel', 'Entity recognition', 'Cross-platform testing', 'Schema alignment'], result: '85% Knowledge Panel activation rate' },
  { num: '04', slug: 'perplexity', title: 'Perplexity SEO', tagline: 'Be the source Perplexity cites.', desc: 'Perplexity always cites sources. We optimize your content library to be its preferred source for your industry.', highlights: ['Source authority audit', 'Data-first content', 'Citation tracking', 'Competitive benchmarks'], result: '25+ citations per month (top clients)' },
]

const faqItems = [
  { q: 'What is Generative Engine Optimization (GEO)?', a: 'GEO is the practice of optimizing your brand and content to be cited by AI-powered search engines like ChatGPT, Gemini, Perplexity, and Google AI Overviews. It is the natural evolution of SEO for the AI era.' },
  { q: 'Does AI search replace traditional SEO?', a: 'No. AI search builds on top of traditional SEO. Strong technical foundations, authoritative content, and quality backlinks are still the signals these AI systems use to determine trustworthiness.' },
  { q: 'Can you guarantee AI citations?', a: 'No honest agency can guarantee specific AI outputs. What we guarantee is a systematic, data-driven approach that has produced measurable results for every client we have served.' },
]

export default function AiSearchPage() {
  return (
    <>
      <Topbar text="AI Search is here. Is your brand visible?" linkText="Free AI audit →" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / AI Search</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">AI Search & GEO</span>
              <h1>Get cited in the answers <em>people trust.</em></h1>
              <p className="svc-page-hero-desc">ChatGPT, Gemini, Perplexity, and Google AI Overviews are replacing the blue links. We make sure your brand shows up when AI answers the questions your customers ask.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get a free AI audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#services" className="btn btn-ghost">See all AI services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">340%</span><span className="svc-page-stat-label">Avg. brand mention increase</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">4</span><span className="svc-page-stat-label">AI platforms optimized</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">120</span><span className="svc-page-stat-label">Days to measurable results</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">93%</span><span className="svc-page-stat-label">Positive citation sentiment</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services" style={{ background: 'var(--surface)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four AI platforms, <em>one strategy.</em></h2>
            <p className="sub">We optimize your visibility across every AI search platform that matters today.</p>
          </div>
          <ServiceCards category="ai-search" items={cards} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal"><h2>Common <em>questions.</em></h2></div>
          <div className="faq-list">
            {faqItems.map(item => (
              <details className="faq reveal" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <BigCta heading="Free AI search audit." em="See where you stand." text="We will test your brand across ChatGPT, Gemini, and Perplexity with 50+ industry prompts. Free. No obligation." btnText="Book your AI audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
