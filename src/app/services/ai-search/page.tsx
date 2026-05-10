import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'AI Search & GEO Services — ChatGPT, Gemini, Perplexity Optimization | We Strive Design',
  description: 'Get your brand cited in ChatGPT, Google AI Overviews, Gemini, and Perplexity. Generative Engine Optimization (GEO) is the new frontier of visibility.',
}

const subServices = [
  {
    id: 'chatgpt',
    num: '01',
    title: 'ChatGPT Optimization',
    tagline: 'Be the brand ChatGPT recommends.',
    desc: 'ChatGPT Search processes millions of queries daily. When someone asks "best SEO agency for e-commerce," does your brand appear? We engineer the conditions that make ChatGPT cite you consistently.',
    features: [
      'ChatGPT brand mention audit across 50+ industry-specific prompts',
      'Entity optimization on Wikipedia, Wikidata, and Crunchbase',
      'Content restructuring for answer extraction by LLMs',
      'Third-party mention generation through digital PR',
      'Competitor displacement strategy for high-value queries',
      'Monthly citation tracking with sentiment analysis',
    ],
    result: 'Avg. 340% increase in ChatGPT brand mentions within 120 days.',
  },
  {
    id: 'google-aio',
    num: '02',
    title: 'Google AI Overviews',
    tagline: 'Get featured above the blue links.',
    desc: 'Google AI Overviews now appear on 40%+ of informational queries. They pull from indexed web pages, but the selection criteria differ from traditional rankings. We optimize specifically for AIO inclusion.',
    features: [
      'AI Overview trigger query identification for your industry',
      'Content formatting for AIO extraction (lists, tables, definitions)',
      'Structured data enhancement for AI-parseable content',
      'Source authority building through E-E-A-T signals',
      'Competitor AIO displacement analysis',
      'Weekly AIO appearance tracking and reporting',
    ],
    result: 'Clients average 12 new AI Overview citations per month.',
  },
  {
    id: 'gemini',
    num: '03',
    title: 'Gemini Optimization',
    tagline: 'Visibility inside Google\u2019s AI ecosystem.',
    desc: 'Gemini powers Google Search AI, Android assistants, and enterprise tools. It draws from the same knowledge graph as Search but applies different relevance models. We ensure your brand is recognized as an entity across the entire Gemini ecosystem.',
    features: [
      'Google Knowledge Panel creation and optimization',
      'Gemini-specific entity recognition testing',
      'Schema markup alignment with Google AI parsing',
      'Brand authority building through Google Merchant and Business Profile',
      'Cross-platform visibility testing (Search, Workspace, Android)',
      'Quarterly Gemini readiness assessments',
    ],
    result: 'Average Knowledge Panel activation rate of 85% within 90 days.',
  },
  {
    id: 'perplexity',
    num: '04',
    title: 'Perplexity SEO',
    tagline: 'Win the answer engine that cites sources.',
    desc: 'Perplexity is unique: it always cites sources. This makes it the highest-value AI search platform for brands that can produce authoritative content. We optimize your content library to be Perplexity\u2019s preferred source.',
    features: [
      'Source authority audit for Perplexity citation eligibility',
      'Content depth optimization for complex query handling',
      'Data-first content creation (original research, surveys, reports)',
      'Publication placement for citation diversity',
      'Perplexity Pro and Enterprise visibility testing',
      'Monthly citation tracking with competitive benchmarking',
    ],
    result: 'Top clients achieve 25+ Perplexity citations per month.',
  },
]

const whyNow = [
  { num: '40%', label: 'of Google queries now show AI Overviews' },
  { num: '100M+', label: 'monthly active users on Perplexity' },
  { num: '73%', label: 'of Gen Z uses AI tools for product research' },
  { num: '2026', label: 'is the year AI search eclipses traditional for discovery' },
]

const faqItems = [
  { q: 'Is AI search optimization different from traditional SEO?', a: 'Yes. Traditional SEO focuses on ranking in a list of blue links. AI search optimization focuses on being cited as a source in AI-generated answers. The skills overlap (content quality, authority, structured data) but the tactics and measurement are different.' },
  { q: 'Can you guarantee my brand will appear in ChatGPT?', a: 'No honest agency can guarantee AI citations. What we can guarantee is a systematic approach that maximizes your probability of being cited. Our clients see an average 340% increase in AI mentions within 4 months.' },
  { q: 'How do you track AI search performance?', a: 'We run automated prompt testing across ChatGPT, Gemini, Perplexity, and Google AI Overviews on a weekly cadence. We track citation frequency, accuracy, sentiment, and competitive share of voice.' },
  { q: 'Do I need traditional SEO before AI search optimization?', a: 'A baseline of technical SEO and content quality helps. But we often run both in parallel. AI search optimization actually improves traditional rankings too, since both reward authoritative, well-structured content.' },
  { q: 'What is Generative Engine Optimization (GEO)?', a: 'GEO is the discipline of optimizing your brand, content, and digital presence to be cited by AI-powered search engines and assistants. It combines entity building, content engineering, digital PR, and structured data.' },
]

export default function AiSearchPage() {
  return (
    <>
      <Topbar text="New: 2026 AI Search Playbook \u2014 free 84-page PDF." linkText="Get it \u2192" linkHref="/insights" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / AI Search &amp; GEO</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">AI Search &amp; GEO</span>
              <h1>Get cited inside <em>AI answers.</em> Not just ranked.</h1>
              <p className="svc-page-hero-desc">ChatGPT, Gemini, Perplexity, and Google AI Overviews are rewriting how people find brands. We make sure yours is the one they recommend.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Get an AI search audit <span className="arr"><ArrowRight /></span></Link>
                <a href="#chatgpt" className="btn btn-ghost">See our approach</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              {whyNow.map((s) => (
                <div className="svc-page-stat" key={s.label}>
                  <span className="svc-page-stat-num">{s.num}</span>
                  <span className="svc-page-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Four platforms, <em>one strategy.</em></h2>
            <p className="sub">AI search is fragmenting across platforms. Each has different citation logic. We optimize for all of them simultaneously.</p>
          </div>

          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head">
                <span className="svc-detail-num">{svc.num}</span>
                <div>
                  <h3>{svc.title}</h3>
                  <p className="svc-detail-tagline">{svc.tagline}</p>
                </div>
              </div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">
                {svc.features.map((f) => (
                  <div className="svc-detail-feature" key={f}>
                    <span className="svc-detail-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="svc-detail-result">
                <span className="svc-detail-result-icon">&uarr;</span> {svc.result}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner mid-cta-dark reveal">
            <div className="mid-cta-text">
              <h3>Want to know if AI search tools mention your brand?</h3>
              <p>We will run a free 15-minute live demo showing what ChatGPT and Perplexity say about you right now.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Book a demo <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>Common <em>questions.</em></h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq reveal" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <BigCta heading="Free AI search audit." em="See where you stand." text="We will query ChatGPT, Gemini, and Perplexity with your brand name and show you exactly what they say. 30 minutes, no obligation." btnText="Book your audit" btnHref="/contact" />
      <Footer />
    </>
  )
}
