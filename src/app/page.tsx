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
import TestimonialsSection from './sections/Testimonials'
import WhyUsSection from './sections/WhyUs'

export default function Home() {
  return (
    <>
      <Topbar text="Now offering AI Search &amp; GEO optimization." linkText="Learn more →" linkHref="/services" />
      <Nav />
      <HeroSection />
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
        heading="Ready to be"
        em="unmissable?"
        text="Get a free 30-minute SEO audit. No deck, no fluff — a real strategist, looking at your real site, telling you the three things to fix first."
        btnText="Book your free audit"
        btnHref="/contact"
        secondBtn={{ text: 'See our process', href: '/services' }}
      />
      <Footer />
    </>
  )
}
