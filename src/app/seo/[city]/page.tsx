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

export async function generateStaticParams() {
  const cities = getCities()
  if (!cities.length) return []
  
  return cities.map((city) => ({
    city: city.slug,
  }))
}

export default async function CitySeoPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)

  if (!city) {
    notFound()
  }

  return (
    <>
      <Topbar text={`SEO specialized for businesses in ${city.cityName}.`} linkText="Get a local audit →" linkHref="/contact" />
      <Nav />
      <HeroSection 
        eyebrow={`SEO Agency in ${city.cityName}, ${city.state}`}
        title={city.heroTitle ? <div dangerouslySetInnerHTML={{ __html: city.heroTitle }} /> : (
          <>
            The #1 SEO agency<br />
            for brands in<br />
            <em>{city.cityName}.</em>
          </>
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
