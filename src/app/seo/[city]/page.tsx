import type { Metadata } from 'next'
import { getCities, getCityBySlug } from '@/lib/excel'
import { notFound } from 'next/navigation'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import HeroSection from '@/app/sections/Hero'
import LogosSection from '@/app/sections/Logos'
import StatsSection from '@/app/sections/Stats'
import ServicesSection from '@/app/sections/Services'
import AiBlock from '@/app/sections/AiBlock'
import MarqueeSection from '@/app/sections/Marquee'
import ProcessSection from '@/app/sections/Process'
import CasesSection from '@/app/sections/Cases'
import TestimonialsSection from '@/app/sections/Testimonials'
import WhyUsSection from '@/app/sections/WhyUs'
import ArticlesBlogsSection from '@/app/sections/ArticlesBlog'
import { buildFaqSchema } from '@/lib/schema'

export async function generateStaticParams() {
  const cities = getCities()
  if (!cities.length) return []
  return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://genranq.com'
  const title = `SEO Agency in ${city.cityName}, ${city.state}`
  const description = `Top-rated SEO agency serving ${city.cityName}, ${city.state}. Get more traffic, leads, and revenue with proven local SEO strategies. Free audit available.`
  return {
    title,
    description,
    alternates: { canonical: `${base}/seo/${slug}` },
    openGraph: {
      title,
      description,
      url: `${base}/seo/${slug}`,
      type: 'website',
      siteName: 'Gen Ranq',
    },
  }
}

export default async function CitySeoPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)

  if (!city) {
    notFound()
  }

  const cityFaqs = [
    {
      q: `How does local SEO in ${city.cityName} differ from standard national campaigns?`,
      a: `Local SEO in ${city.cityName} focuses on dominating Google Maps 3-Pack rankings, localized proximity signals, regional NAP directory consistency, and acquiring high-authority backlinks from ${city.state} publications. This drives immediate phone calls, quote requests, and store visits rather than non-converting global traffic.`,
    },
    {
      q: `How long does it take for a ${city.cityName} business to achieve top 3 rankings?`,
      a: `Most ${city.cityName} businesses begin noticing Google Maps visibility jumps and long-tail keyword movement within 60 to 90 days. High-competition commercial queries typically compound into top 3 positions between months 4 and 6 as technical authority builds.`,
    },
    {
      q: `Do you manage our Google Business Profile in ${city.cityName}?`,
      a: `Yes. We provide complete Google Business Profile optimization and ongoing management: primary and secondary category calibration, weekly localized posts, customer review generation workflows, photo geotagging, and proactive Q&A management.`,
    },
    {
      q: `What ROI can our ${city.cityName} business realistically expect?`,
      a: `Across hundreds of small-to-midsize business clients, our retainers generate an average 8.5× return on capital over a 12-month period. We connect Google Analytics 4, phone call tracking, and lead CRM data directly into Looker Studio dashboards so you see exactly which sales originated from SEO.`,
    },
    {
      q: `How do your SEO strategies protect against Google algorithm updates?`,
      a: `We build enduring search foundations: sub-second Core Web Vitals, authoritative human-written editorial content, structured schema, and authentic digital PR. We strictly ban private blog networks (PBNs), automated spun copy, and link farms that trigger algorithmic penalties.`,
    },
    {
      q: `Can you optimize our ${city.cityName} company for ChatGPT and Perplexity AI search?`,
      a: `Yes. Every ${city.cityName} engagement incorporates Generative Engine Optimization (GEO). We structure your brand entities on Wikidata, optimize executive profiles, and craft answer-first content that LLMs prioritize when answering local recommendations in ${city.cityName}.`,
    },
  ]

  const faqSchema = buildFaqSchema(cityFaqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar text={`SEO specialized for businesses in ${city.cityName}.`} linkText="Get a local audit →" linkHref="/contact" />
      <Nav />
      <HeroSection
        eyebrow={`SEO Agency in ${city.cityName}, ${city.state}`}
        title={city.heroTitle ? <h1 dangerouslySetInnerHTML={{ __html: city.heroTitle }} /> : (
          <h1>
            The #1 SEO agency<br />
            for brands in<br />
            <em>{city.cityName}.</em>
          </h1>
        )}
        lede={city.heroSub || `We help ${city.cityName}-based businesses dominate their local and national search results with precision SEO, editorial content, and AI-driven optimization.`}
      />
      <LogosSection />
      <StatsSection />
      <ServicesSection />
      <AiBlock />
      <MarqueeSection />
      <ProcessSection />
      <CasesSection />
      <TestimonialsSection />
      <WhyUsSection />
      <ArticlesBlogsSection />
      <section className="section" id="faq">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="sec-head reveal">
            <span className="eyebrow">{city.cityName} Search FAQs</span>
            <h2>Frequently asked questions about <em>SEO in {city.cityName}.</em></h2>
            <p className="sub">Direct answers about timeline expectations, Google Maps dominance, and ROI measurement for {city.cityName} brands.</p>
          </div>
          <div className="faq-list reveal">
            {cityFaqs.map((item, i) => (
              <details className="faq" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <BigCta
        heading={`Ready to win in`}
        em={city.cityName + '?'}
        text={`Get a free 30-minute SEO audit of your ${city.cityName} business. No deck, no fluff — a real strategist, looking at your real site, telling you the three things to fix first.`}
        btnText="Book your free audit"
        btnHref="/contact"
        secondBtn={{ text: 'See our process', href: '/services' }}
      />
      <Footer />
    </>
  )
}
