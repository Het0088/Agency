export interface SubService {
  label: string
  href: string
  locSlug?: string
  local?: boolean
}

export interface ServiceCategory {
  id: string
  label: string
  href: string
  locSlug: string
  items: SubService[]
}

export interface CityItem {
  name: string
  slug: string
}

export interface CityRegion {
  region: string
  cities: CityItem[]
}

export interface DropdownItem {
  label: string
  href: string
  desc?: string
}

export interface NavItem {
  id: string
  label: string
  href: string
  type?: 'mega' | 'dropdown' | 'locations'
  items?: DropdownItem[]
}

export const SERVICES: ServiceCategory[] = [
  {
    id: 'seo',
    label: 'SEO Services',
    href: '/services/seo',
    locSlug: 'seo-services',
    items: [
      { label: 'Technical SEO', href: '/services/seo/technical-seo', locSlug: 'technical-seo' },
      { label: 'Local SEO', href: '/services/seo/local-seo', locSlug: 'local-seo' },
      { label: 'E-commerce SEO', href: '/services/seo/ecommerce-seo', locSlug: 'ecommerce-seo' },
      { label: 'Enterprise SEO', href: '/services/seo/enterprise-seo', locSlug: 'enterprise-seo' },
      { label: 'SEO Audits', href: '/services/seo/seo-audits', locSlug: 'seo-audit' },
    ],
  },
  {
    id: 'ai-search',
    label: 'AI Search & GEO',
    href: '/services/ai-search',
    locSlug: 'ai-search-optimization',
    items: [
      { label: 'ChatGPT Optimization', href: '/services/ai-search/chatgpt', locSlug: 'chatgpt-optimization' },
      { label: 'Google AI Overviews', href: '/services/ai-search/google-aio', locSlug: 'google-ai-overviews-optimization' },
      { label: 'Gemini Optimization', href: '/services/ai-search/gemini', locSlug: 'gemini-optimization' },
      { label: 'Perplexity SEO', href: '/services/ai-search/perplexity', locSlug: 'perplexity-seo' },
    ],
  },
  {
    id: 'content',
    label: 'Content Marketing',
    href: '/services/content-marketing',
    locSlug: 'content-marketing',
    items: [
      { label: 'SEO Content Writing', href: '/services/content-marketing/seo-writing', locSlug: 'seo-content-writing' },
      { label: 'Blog Management', href: '/services/content-marketing/blog-management', locSlug: 'blog-management' },
      { label: 'Copywriting', href: '/services/content-marketing/copywriting', locSlug: 'copywriting-services' },
      { label: 'Email Marketing', href: '/services/content-marketing/email-marketing', locSlug: 'email-marketing' },
    ],
  },
  {
    id: 'ppc',
    label: 'PPC & Paid Ads',
    href: '/services/ppc',
    locSlug: 'ppc-management',
    items: [
      { label: 'Google Ads', href: '/services/ppc/google-ads', locSlug: 'google-ads-management' },
      { label: 'Meta Ads', href: '/services/ppc/meta-ads', locSlug: 'meta-ads-management' },
      { label: 'YouTube Ads', href: '/services/ppc/youtube-ads', locSlug: 'youtube-ads-management' },
      { label: 'Programmatic', href: '/services/ppc/programmatic', locSlug: 'programmatic-advertising' },
    ],
  },
  {
    id: 'social',
    label: 'Social Media',
    href: '/services/social-media',
    locSlug: 'social-media-marketing',
    items: [
      { label: 'Social Management', href: '/services/social-media/management', locSlug: 'social-media-management' },
      { label: 'Social Advertising', href: '/services/social-media/advertising', locSlug: 'social-media-advertising' },
      { label: 'Brand Management', href: '/services/social-media/brand', locSlug: 'brand-management' },
    ],
  },
  {
    id: 'web',
    label: 'Web Design & Dev',
    href: '/services/web-development',
    locSlug: 'web-development',
    items: [
      { label: 'Website Development', href: '/services/web-development', locSlug: 'website-development' },
      { label: 'Custom Web Design', href: '/services/web-design', locSlug: 'web-design' },
      { label: 'Shopify & E-commerce', href: '/services/web-development/shopify-ecommerce', locSlug: 'shopify-development' },
      { label: 'Hire Dedicated Developers', href: '/hire-resource', local: false },
    ],
  },
  {
    id: 'links',
    label: 'Link Building',
    href: '/services/link-building',
    locSlug: 'link-building',
    items: [
      { label: 'Digital PR', href: '/services/link-building/digital-pr', locSlug: 'digital-pr' },
      { label: 'Guest Posting', href: '/services/link-building/guest-posting', locSlug: 'guest-posting' },
      { label: 'Outreach Campaigns', href: '/services/link-building/outreach', locSlug: 'outreach-campaigns' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & CRO',
    href: '/services/analytics',
    locSlug: 'cro-services',
    items: [
      { label: 'CRO Audits', href: '/services/analytics/cro-audits', locSlug: 'cro-audit' },
      { label: 'A/B Testing', href: '/services/analytics/ab-testing', locSlug: 'ab-testing' },
      { label: 'Reporting Dashboards', href: '/services/analytics/dashboards', locSlug: 'marketing-dashboards' },
    ],
  },
]

export const CITY_REGIONS: CityRegion[] = [
  {
    region: 'United States',
    cities: [
      { name: 'Houston', slug: 'houston' },
      { name: 'New York', slug: 'new-york' },
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Dallas', slug: 'dallas' },
      { name: 'Austin', slug: 'austin' },
      { name: 'Miami', slug: 'miami' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'Seattle', slug: 'seattle' },
      { name: 'Atlanta', slug: 'atlanta' },
      { name: 'Phoenix', slug: 'phoenix' },
      { name: 'Boston', slug: 'boston' },
    ],
  },
  {
    region: 'India',
    cities: [
      { name: 'Mumbai', slug: 'mumbai' },
      { name: 'Delhi', slug: 'delhi' },
      { name: 'Ahmedabad', slug: 'ahmedabad' },
      { name: 'Vadodara', slug: 'vadodara' },
      { name: 'Surat', slug: 'surat' },
    ],
  },
  {
    region: 'International',
    cities: [
      { name: 'London', slug: 'london' },
      { name: 'Dubai', slug: 'dubai' },
      { name: 'Melbourne', slug: 'melbourne' },
    ],
  },
]

export const cityHref = (locSlug: string, citySlug: string) => `/${locSlug}-${citySlug}`

export const ABOUT: DropdownItem[] = [
  { label: 'About Us', href: '/about', desc: 'Our story, values and how we work' },
  { label: 'Our Team', href: '/our-team', desc: 'The strategists and engineers behind GENRANQ' },
  { label: 'Our Work', href: '/#work', desc: 'Case studies and client results' },
]

export const RESOURCES: DropdownItem[] = [
  { label: 'Blog', href: '/resources/blog', desc: 'Guides, deep-dives and SEO playbooks' },
  { label: 'News', href: '/resources/news', desc: 'Company milestones and announcements' },
  { label: 'White Papers', href: '/resources/white-papers', desc: 'In-depth industry playbooks and reports' },
  { label: 'Publications', href: '/resources/publications', desc: 'Original research and teardowns' },
  { label: 'Glossary', href: '/glossary', desc: 'Definitions for modern search, LLMs and GEO' },
]

export const NAV: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '/services', type: 'mega' },
  { id: 'about', label: 'About Us', href: '/about', type: 'dropdown', items: ABOUT },
  { id: 'resources', label: 'Resources', href: '/resources/blog', type: 'dropdown', items: RESOURCES },
  { id: 'locations', label: 'Locations', href: '/locations', type: 'locations' },
  { id: 'contact', label: 'Contact Us', href: '/contact' },
]

export const localItems = (cat: ServiceCategory) => [
  { label: `All ${cat.label}`, short: cat.label, locSlug: cat.locSlug },
  ...cat.items.filter((i) => i.local !== false).map((i) => ({ label: i.label, short: i.label, locSlug: i.locSlug || cat.locSlug })),
]
