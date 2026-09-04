export type PageMeta = {
  route: string
  label: string
  filePath: string
  note?: string
  fields: {
    title: string
    description: string
    canonical: string
    ogTitle?: string
    ogDescription?: string
    ogImage?: string
  }
}

export const pageMetas: PageMeta[] = [
  {
    route: '/',
    label: 'Homepage',
    filePath: 'src/app/page.tsx',
    fields: {
      title: 'Gen Ranq — AI-Powered SEO Agency',
      description: 'Gen Ranq is an AI-powered SEO agency helping brands grow organic traffic, authority, and revenue faster.',
      canonical: 'https://genranq.com',
    },
  },
  {
    route: '/about',
    label: 'About',
    filePath: 'src/app/about/page.tsx',
    fields: {
      title: 'About Us — Search Expertise & Leadership',
      description: 'Meet the team behind Gen Ranq. 10+ years of search expertise, 600+ brands grown, and a 94% client retention rate.',
      canonical: 'https://genranq.com/about',
    },
  },
  {
    route: '/contact',
    label: 'Contact',
    filePath: 'src/app/contact/page.tsx',
    fields: {
      title: 'Contact Us — Get a Free 200-Point SEO Audit',
      description: 'Book a free 200-point SEO audit. No obligation. Our team delivers a custom AI SEO growth plan within 48 hours.',
      canonical: 'https://genranq.com/contact',
    },
  },
  {
    route: '/services',
    label: 'Services (Hub)',
    filePath: 'src/app/services/page.tsx',
    fields: {
      title: 'SEO & Digital Marketing Services',
      description: 'Full-spectrum SEO services: Technical, Local, E-commerce, Enterprise, Content, Link Building, PPC, and AI Search.',
      canonical: 'https://genranq.com/services',
    },
  },
  {
    route: '/services/seo',
    label: 'SEO Services',
    filePath: 'src/app/services/seo/page.tsx',
    fields: {
      title: 'SEO Services — Technical, Local, E-commerce & Enterprise',
      description: 'Full-service SEO that drives revenue. Technical audits, local 3-pack domination, e-commerce indexation, and enterprise-scale keyword strategy.',
      canonical: 'https://genranq.com/services/seo',
    },
  },
  {
    route: '/services/ai-search',
    label: 'AI Search & GEO',
    filePath: 'src/app/services/ai-search/page.tsx',
    fields: {
      title: 'AI Search Optimisation & GEO — ChatGPT, Gemini, Perplexity',
      description: 'Optimise your brand to appear in ChatGPT, Google AI Overviews, Gemini and Perplexity. GEO and AEO services by Gen Ranq.',
      canonical: 'https://genranq.com/services/ai-search',
    },
  },
  {
    route: '/services/content-marketing',
    label: 'Content Marketing',
    filePath: 'src/app/services/content-marketing/page.tsx',
    fields: {
      title: 'Content Marketing Services & Strategy',
      description: 'Strategic content marketing that drives organic traffic, earns backlinks, and builds topical authority for your brand.',
      canonical: 'https://genranq.com/services/content-marketing',
    },
  },
  {
    route: '/services/link-building',
    label: 'Link Building',
    filePath: 'src/app/services/link-building/page.tsx',
    fields: {
      title: 'Link Building Services — White-Hat Authority Links',
      description: 'High-authority, white-hat link building campaigns that grow your domain rating and improve rankings across competitive keywords.',
      canonical: 'https://genranq.com/services/link-building',
    },
  },
  {
    route: '/services/ppc',
    label: 'PPC / Paid Ads',
    filePath: 'src/app/services/ppc/page.tsx',
    fields: {
      title: 'PPC & Google Ads Management',
      description: 'ROI-focused paid search and Google Ads management. We build, manage, and optimise campaigns that convert.',
      canonical: 'https://genranq.com/services/ppc',
    },
  },
  {
    route: '/services/social-media',
    label: 'Social Media',
    filePath: 'src/app/services/social-media/page.tsx',
    fields: {
      title: 'Social Media Marketing Services',
      description: 'Social media strategy, content, and advertising that builds brand awareness and drives qualified traffic.',
      canonical: 'https://genranq.com/services/social-media',
    },
  },
  {
    route: '/services/analytics',
    label: 'Analytics',
    filePath: 'src/app/services/analytics/page.tsx',
    fields: {
      title: 'SEO Analytics & Performance Reporting',
      description: 'Clear, actionable SEO reporting. We track what matters — rankings, traffic, conversions — and present it plainly.',
      canonical: 'https://genranq.com/services/analytics',
    },
  },
  {
    route: '/services/web-design',
    label: 'Web Design',
    filePath: 'src/app/services/web-design/page.tsx',
    fields: {
      title: 'SEO-Optimised Web Design Services',
      description: 'Fast, accessible, conversion-optimised websites built with SEO baked in from day one.',
      canonical: 'https://genranq.com/services/web-design',
    },
  },
  {
    route: '/insights',
    label: 'Insights (Blog Hub)',
    filePath: 'src/app/insights/page.tsx',
    fields: {
      title: 'SEO Insights, Research & Tactical Guides',
      description: 'Expert SEO insights, guides, and research from the Gen Ranq team. Stay ahead of algorithm updates and AI search trends.',
      canonical: 'https://genranq.com/insights',
    },
  },
  {
    route: '/insights/[slug]',
    label: 'Individual Blog Post',
    filePath: 'src/app/insights/[slug]/page.tsx',
    note: 'Title and description are pulled dynamically from the database. Edit them in the Posts tab above.',
    fields: {
      title: '{{post.title}}',
      description: '{{post.description}}',
      canonical: 'https://genranq.com/insights/{{post.slug}}',
    },
  },
  {
    route: '/seo/[city]',
    label: 'City SEO Pages',
    filePath: 'src/app/seo/[city]/page.tsx',
    note: 'Title and description are generated dynamically from the city name. Edit the template in the file below.',
    fields: {
      title: 'SEO Agency in {{city}}',
      description: 'Local SEO services in {{city}}. We help {{city}} businesses rank higher, attract more customers, and grow revenue.',
      canonical: 'https://genranq.com/seo/{{city-slug}}',
    },
  },
  {
    route: '/services/[category]/[slug]',
    label: 'Sub-Service Pages',
    filePath: 'src/app/services/[category]/[slug]/page.tsx',
    note: 'All sub-service metadata is defined in src/lib/services-data.ts. Edit the title/description fields for each service entry there.',
    fields: {
      title: '{{service.name}}',
      description: '{{service.description}}',
      canonical: 'https://genranq.com/services/{{category}}/{{slug}}',
    },
  },
  {
    route: '/our-team',
    label: 'Our Team',
    filePath: 'src/app/our-team/page.tsx',
    fields: {
      title: 'Our Team — Meet The Senior SEO Strategists & Engineers',
      description: 'Meet the 38 senior strategists, technical SEOs, and developers behind Gen Ranq. No account managers, just direct collaboration with practitioners.',
      canonical: 'https://genranq.com/our-team',
    },
  },
  {
    route: '/resources/publications',
    label: 'Publications & Research',
    filePath: 'src/app/resources/publications/page.tsx',
    fields: {
      title: 'Publications, White Papers & SEO Research Reports',
      description: 'Original benchmark studies, technical white papers, and forensic search teardowns by senior SEO engineers.',
      canonical: 'https://genranq.com/resources/publications',
    },
  },
  {
    route: '/services/seo/technical-seo',
    label: 'Technical SEO Services',
    filePath: 'src/app/services/seo/technical-seo/page.tsx',
    fields: {
      title: 'Technical SEO Services & AI Search Audit',
      description: 'Forensic technical SEO services that eliminate crawl errors, optimize Core Web Vitals, and prepare your domain for ChatGPT, Perplexity, and AI Overviews.',
      canonical: 'https://genranq.com/services/seo/technical-seo',
    },
  },
]

