import type { Metadata } from 'next'
import WebDevClient from './WebDevClient'
import { buildFaqSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Website Design & Development Services — GENRANQ Software LLP',
  description: 'Custom websites engineered for speed, conversions, and organic search ranking. Built with Next.js, React, Shopify, and headless architectures.',
  alternates: { canonical: 'https://genranq.com/services/web-development' },
  openGraph: {
    title: 'Website Design & Development Services — GENRANQ Software LLP',
    description: 'Custom websites engineered for speed, conversions, and organic search ranking. Built with Next.js, React, Shopify, and headless architectures.',
    url: 'https://genranq.com/services/web-development',
    type: 'website',
  },
}

const webDevFaqs = [
  {
    q: 'Which technology stack is best for my website — Next.js, Shopify, WordPress, or Laravel?',
    a: 'It depends on your business goals and operational needs. For high-speed marketing websites and SaaS platforms, we build custom Next.js/React front ends with headless CMS for sub-second page loads. For e-commerce brands, we engineer custom Shopify and Shopify Plus storefronts. For editorial teams, we craft lightweight Gutenberg WordPress themes. For custom web apps, we engineer full-stack Laravel or Node.js applications.',
  },
  {
    q: 'How do you guarantee sub-second load times and 95+ PageSpeed scores?',
    a: 'Every website we build is engineered performance-first with next-gen image formats (AVIF/WebP), responsive loading, elimination of render-blocking assets, pre-rendered critical server components, and global edge caching via Cloudflare or Vercel.',
  },
  {
    q: 'Can you redesign our existing website without losing Google search rankings?',
    a: 'Yes. Before writing code, our SEO strategists crawl your site, map indexed URLs, top-ranking queries, and link equity. We preserve URL patterns where possible and implement a 1-to-1 301 redirect map for any restructured paths.',
  },
  {
    q: 'How does your custom design and development process work?',
    a: 'We operate in transparent 2-week sprints across six milestones: Discovery & Architecture, Wireframing & UX in Figma, UI Design Approval, Production Engineering, QA & Performance Tuning, and Zero-Downtime Launch.',
  },
  {
    q: 'Will our internal team be able to easily update copy, images, and pages?',
    a: 'Yes — 100%. We build modular, drag-and-drop block systems aligned with your brand guidelines and provide video training documentation for your team at handover.',
  },
  {
    q: 'How do you handle custom third-party integrations (CRM, payment gateways, ERP, APIs)?',
    a: 'We connect web platforms to CRMs (HubSpot, Salesforce), payment gateways (Stripe, PayPal, Razorpay), marketing automation (Klaviyo), and custom REST/GraphQL APIs with resilient webhook pipelines.',
  },
  {
    q: 'Who owns the source code, design files, repository, and intellectual property?',
    a: 'You do — 100%. Upon project completion, all intellectual property, Figma design files, GitHub repositories, and asset libraries are transferred completely to your organisation.',
  },
  {
    q: 'What warranties and post-launch maintenance plans do you provide?',
    a: 'Every new website includes 30 days of complimentary post-launch warranty support. Afterward, we offer flexible monthly care plans covering security, automated backups, 24/7 uptime monitoring, and feature sprints.',
  },
]

export default function WebDevelopmentPage() {
  const faqSchema = buildFaqSchema(webDevFaqs)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <WebDevClient />
    </>
  )
}
