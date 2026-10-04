import type { Metadata } from 'next'
import { getPageMeta } from '@/lib/get-meta'

export async function generateMetadata(): Promise<Metadata> {
  const m = await getPageMeta('/services/web-design')
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
import { getContent } from '@/lib/get-content'
import { buildFaqSchema } from '@/lib/schema'
import WebDesignClient from './WebDesignClient'

export const webDesignFaqs = [
  {
    q: 'What design deliverables are included with our project (Figma design systems, tokens, assets)?',
    a: 'You receive complete, production-ready Figma design files including an atomic component library, responsive layout grids, scalable typography hierarchies, color token variables, custom iconography, micro-interaction guidelines, and clickable interactive prototypes for both mobile and desktop viewports.',
  },
  {
    q: 'How many design revision rounds are included in your process?',
    a: 'We provide unlimited design iterations during the wireframing and initial style-direction phase. Once a core aesthetic direction is chosen, each high-fidelity page template includes up to three rounds of focused revisions. We never advance to frontend development until you have explicitly reviewed and approved 100% of the Figma designs.',
  },
  {
    q: 'How do you approach UX research, competitor audits, and customer journey mapping?',
    a: 'Before sketching layouts, our design architects analyze your current website heatmaps, drop-off points, and conversion analytics. We conduct deep competitor teardowns across your vertical and interview key customer personas to construct low-friction user journeys, intuitive navigation architectures, and clear value-proposition hierarchies.',
  },
  {
    q: 'How do your designs translate into code without losing visual fidelity or micro-animations?',
    a: 'Because our UI/UX designers and frontend engineers work as an integrated in-house team, there is zero disconnect between Figma and the final browser build. Developers inspect component tokens directly and implement silky CSS animations, hover states, and responsive breakpoints with 1-to-1 pixel precision. Every build undergoes rigorous design QA before release.',
  },
  {
    q: 'What makes your e-commerce and Shopify store designs convert higher than standard themes?',
    a: 'Standard commercial themes are bloated with generic code and unoptimized conversion funnels. We engineer bespoke Shopify stores focused on Average Order Value (AOV) and conversion rate: streamlined 1-click cart drawers, sticky mobile add-to-cart buttons, dynamic product bundle builders, prominent trust badges, and lightning-fast checkout paths.',
  },
  {
    q: 'Do you design responsive viewports for mobile phones, tablets, and ultrawide screens?',
    a: 'Yes. Over 65% of modern web traffic arrives on handheld devices. We design every page layout mobile-first with thumb-friendly tap targets, legible typographic scales, and fluid responsive breakpoints tested across iOS, Android, tablets, laptops, and 4K desktop displays.',
  },
  {
    q: 'Can you modernize our brand identity and website without confusing our existing loyal customers?',
    a: 'Yes. Evolutionary redesign is our specialty. We preserve your recognized brand equity, core colors, and familiar navigation conventions while dramatically elevating typography, spacing, visual contrast, visual hierarchy, and modern micro-interactions so your brand feels forward-thinking, authoritative, and trustworthy.',
  },
  {
    q: 'Who owns the design files, Figma components, typography licenses, and creative assets?',
    a: 'You do. Upon project completion and final milestone clearance, 100% of all intellectual property, Figma design files, custom illustrations, graphic assets, and style guides are transferred completely to your company. You have full commercial ownership with zero recurring royalty fees.',
  },
]

export default async function WebDesignPage() {
  const c = await getContent('/services/web-design')

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://genranq.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://genranq.com/services' },
      { '@type': 'ListItem', position: 3, name: 'Web Design', item: 'https://genranq.com/services/web-design' },
    ],
  }

  const faqSchema = buildFaqSchema(webDesignFaqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Topbar
        text={c.topbar_text || 'Websites built for search & conversion from day one.'}
        linkText={c.topbar_link || 'Get free proposal →'}
        linkHref="/contact"
      />
      <Nav active="services" />
      <WebDesignClient content={c} />
      <Footer />
    </>
  )
}
