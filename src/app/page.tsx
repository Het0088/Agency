import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/')
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: { canonical: m.canonical },
    openGraph: { title: m.og_title, description: m.og_description, url: m.canonical, type: 'website', ...(m.og_image ? { images: [{ url: m.og_image }] } : {}) },
  }
}

import { getContent } from '@/lib/get-content'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import HeroSection from './sections/Hero'
import LogosSection from './sections/Logos'
import StatsSection from './sections/Stats'
import ServicesSection from './sections/Services'
import AiBlock from './sections/AiBlock'
import MarqueeSection from './sections/Marquee'
import ProcessSection from './sections/Process'
import CasesSection from './sections/Cases'
import PricingSection from './sections/Pricing'
import TestimonialsSection from './sections/Testimonials'
import WhyUsSection from './sections/WhyUs'
import ArticlesBlogsSection from './sections/ArticlesBlog'
import WhyNeedSeo from './sections/WhyNeedSeo'
import SeoProcess from './sections/SeoProcess'
import HomeFaq from './sections/HomeFaq'

import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

export default async function Home() {
  const content = await getContent('/')

  return (
    <>
      <Topbar
        text={content.topbar_text || 'Now offering AI Search & GEO optimization.'}
        linkText={content.topbar_link_text || 'Learn more →'}
        linkHref="/services"
      />
      <Nav />
      <HeroSection content={content} />
      <LogosSection content={content} />
      <StatsSection content={content} />
      <WhyNeedSeo content={content} />
      <ServicesSection content={content} />
      <SeoProcess content={content} />
      <AiBlock content={content} />
      <MarqueeSection content={content} />
      <ProcessSection content={content} />

      <section className="mid-cta">
        <div className="wrap">
          <div className="mid-cta-inner mid-cta-dark reveal">
            <div className="mid-cta-text">
              <h3>{content.mid_cta_heading || 'Ready to outrank your competitors?'}</h3>
              <p>{content.mid_cta_text || 'Get a free 30-minute strategy call with one of our senior SEO strategists. No pitch, just actionable insights.'}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              {content.mid_cta_btn || 'Book your free call'}
              <span className="arr"><ArrowRight /></span>
            </Link>
          </div>
        </div>
      </section>

      <CasesSection content={content} />
      <PricingSection content={content} />
      <TestimonialsSection content={content} />
      <WhyUsSection content={content} />
      <ArticlesBlogsSection />
      <HomeFaq content={content} />
      <BigCta
        heading={content.cta_heading?.includes('unmissable?') ? content.cta_heading.replace('unmissable?', '').trim() : (content.cta_heading || 'Ready to be')}
        em={content.cta_heading?.includes('unmissable?') ? 'unmissable?' : 'unmissable?'}
        text={content.cta_text || 'Get a free 30-minute SEO audit. No deck, no fluff — a real strategist, looking at your real site, telling you the three things to fix first.'}
        btnText={content.cta_btn || 'Book your free audit'}
        btnHref="/contact"
        secondBtn={{ text: content.cta_btn2 || 'See our process', href: '/services' }}
      />
      <Footer />
    </>
  )
}
