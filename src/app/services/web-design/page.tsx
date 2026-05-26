import type { Metadata } from 'next'
import Link from 'next/link'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BigCta from '@/components/BigCta'
import { ArrowRight } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Web Design Services — Custom, WordPress & E-commerce Design | Omniranq',
  description: 'SEO-first web design that converts. Custom websites, WordPress development, e-commerce stores, and website redesigns built for performance and search visibility.',
}

const subServices = [
  {
    id: 'custom',
    num: '01',
    title: 'Custom Web Design',
    tagline: 'Built from scratch, built for search.',
    desc: 'Every custom site we design starts with SEO architecture. Information hierarchy, URL structure, internal linking, and page speed are designed into the foundation, not bolted on after launch.',
    features: [
      'SEO-first information architecture and URL planning',
      'Custom UI/UX design with conversion optimization',
      'Mobile-first responsive design across all breakpoints',
      'Core Web Vitals optimization baked into the build',
      'Structured data and schema implementation',
      'Accessibility compliance (WCAG 2.1 AA)',
      'CMS integration (headless, WordPress, or custom)',
      'Post-launch SEO migration checklist and redirect mapping',
    ],
    result: 'Average 52% improvement in organic traffic post-redesign.',
  },
  {
    id: 'wordpress',
    num: '02',
    title: 'WordPress Design',
    tagline: 'The world\u2019s most popular CMS, done right.',
    desc: 'WordPress powers 43% of the web for a reason. We build custom WordPress themes that are fast, secure, SEO-optimized, and easy for your team to manage without developer support.',
    features: [
      'Custom theme development (no bloated page builders)',
      'Advanced Custom Fields for flexible content management',
      'Speed optimization (sub-2s load times)',
      'Security hardening and maintenance plans',
      'Plugin audit and recommendations',
      'Blog and content hub architecture',
      'WooCommerce integration for e-commerce',
      'Training for your team on content management',
    ],
    result: 'Average PageSpeed score of 92+ on all WordPress builds.',
  },
  {
    id: 'ecommerce',
    num: '03',
    title: 'E-commerce Design',
    tagline: 'Stores that sell, not just display.',
    desc: 'We design e-commerce experiences on Shopify, WooCommerce, and BigCommerce that prioritize conversion rate, product discoverability, and organic search traffic.',
    features: [
      'Shopify, WooCommerce, and BigCommerce development',
      'Product page design optimized for conversion',
      'Category and collection page architecture',
      'Shopping cart and checkout flow optimization',
      'Product schema and rich snippet implementation',
      'Inventory-aware SEO (handling out-of-stock, seasonal products)',
      'Payment gateway integration and security',
      'Mobile shopping experience optimization',
    ],
    result: 'Average 38% increase in e-commerce conversion rate.',
  },
  {
    id: 'redesign',
    num: '04',
    title: 'Website Redesign',
    tagline: 'Redesign without losing rankings.',
    desc: 'Most redesigns lose 30-60% of organic traffic because SEO is an afterthought. We run redesign projects with full redirect mapping, URL preservation, and content migration planning to protect your existing search equity.',
    features: [
      'Pre-redesign SEO audit and traffic baseline',
      'URL mapping and 301 redirect strategy',
      'Content migration planning with SEO prioritization',
      'Staged rollout with traffic monitoring at each phase',
      'Post-launch crawl verification and index monitoring',
      'Performance regression testing (speed, CWV, mobile usability)',
    ],
    result: 'Zero traffic loss across 24 managed redesigns in 2025.',
  },
]

const faqItems = [
  { q: 'How long does a website project take?', a: 'Custom sites typically take 8-12 weeks from kickoff to launch. WordPress sites take 6-8 weeks. E-commerce stores take 8-14 weeks depending on product catalog size and integrations.' },
  { q: 'Do you handle hosting?', a: 'We recommend hosting providers based on your platform and traffic needs. We can manage hosting for WordPress sites through our preferred infrastructure partner, or work with your existing host.' },
  { q: 'Will my site be SEO-ready at launch?', a: 'Yes. Every site we build includes proper meta tags, schema markup, XML sitemaps, robots.txt, Core Web Vitals optimization, and internal linking architecture. SEO is not an add-on; it is part of the build process.' },
  { q: 'What if I need ongoing updates after launch?', a: 'We offer maintenance retainers for ongoing updates, security patches, and content changes. Alternatively, we train your team to manage the CMS independently.' },
]

export default function WebDesignPage() {
  return (
    <>
      <Topbar text="SEO-first web design \u00B7 Zero traffic loss redesigns." linkText="Get started \u2192" linkHref="/contact" />
      <Nav active="services" />

      <header className="svc-page-hero">
        <div className="wrap">
          <div className="crumb"><Link href="/">Home</Link> / <Link href="/services">Services</Link> / Web Design</div>
          <div className="svc-page-hero-grid">
            <div className="reveal in">
              <span className="eyebrow">Web Design</span>
              <h1>Web design built for <em>search</em> and conversion.</h1>
              <p className="svc-page-hero-desc">Custom websites, WordPress, e-commerce, and redesigns. Every project starts with SEO architecture so your site ranks from day one.</p>
              <div className="svc-page-hero-actions">
                <Link href="/contact" className="btn btn-primary">Start a project <span className="arr"><ArrowRight /></span></Link>
                <a href="#custom" className="btn btn-ghost">See our services</a>
              </div>
            </div>
            <div className="svc-page-hero-stats reveal in">
              <div className="svc-page-stat"><span className="svc-page-stat-num">52%</span><span className="svc-page-stat-label">Avg. traffic gain post-redesign</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">92+</span><span className="svc-page-stat-label">Avg. PageSpeed score</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">0</span><span className="svc-page-stat-label">Traffic loss across 24 redesigns</span></div>
              <div className="svc-page-stat"><span className="svc-page-stat-num">120+</span><span className="svc-page-stat-label">Websites launched</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head reveal"><h2>Four ways to build, <em>one standard.</em></h2><p className="sub">Every project includes SEO architecture, Core Web Vitals optimization, and structured data from the foundation.</p></div>
          {subServices.map((svc) => (
            <div className="svc-detail-block reveal" key={svc.id} id={svc.id}>
              <div className="svc-detail-head"><span className="svc-detail-num">{svc.num}</span><div><h3>{svc.title}</h3><p className="svc-detail-tagline">{svc.tagline}</p></div></div>
              <p className="svc-detail-desc">{svc.desc}</p>
              <div className="svc-detail-features">{svc.features.map((f) => (<div className="svc-detail-feature" key={f}><span className="svc-detail-dot" />{f}</div>))}</div>
              <div className="svc-detail-result"><span className="svc-detail-result-icon">&uarr;</span> {svc.result}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mid-cta"><div className="wrap"><div className="mid-cta-inner reveal"><div className="mid-cta-text"><h3>Planning a redesign?</h3><p>Get a free pre-redesign SEO audit to protect your existing traffic.</p></div><Link href="/contact" className="btn btn-primary">Book a call <span className="arr"><ArrowRight /></span></Link></div></div></section>

      <section className="section"><div className="wrap"><div className="sec-head reveal"><h2>Common <em>questions.</em></h2></div><div className="faq-list">{faqItems.map((item) => (<details className="faq reveal" key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>))}</div></div></section>

      <BigCta heading="Better website." em="Better rankings." text="Talk to us about your next web project. We will show you how SEO-first design drives measurable business results." btnText="Start a conversation" btnHref="/contact" />
      <Footer />
    </>
  )
}
