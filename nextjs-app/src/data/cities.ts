export interface CityData {
  slug: string
  name: string
  state?: string
  country: string
  population?: string
  intro: string
  localKeywords: string[]
}

const cities: CityData[] = [
  {
    slug: 'melbourne',
    name: 'Melbourne',
    state: 'Victoria',
    country: 'Australia',
    population: '5.2M',
    intro: 'Melbourne is home to one of Australia\'s most competitive small business landscapes. From Fitzroy cafés to South Yarra boutiques, local SEO determines who gets found first.',
    localKeywords: ['Melbourne SEO agency', 'SEO services Melbourne', 'local SEO Melbourne'],
  },
  {
    slug: 'sydney',
    name: 'Sydney',
    state: 'New South Wales',
    country: 'Australia',
    population: '5.4M',
    intro: 'Sydney businesses compete in one of the densest digital markets in the Asia-Pacific. Winning local search here means dominating the 3-pack across dozens of suburbs.',
    localKeywords: ['Sydney SEO company', 'SEO services Sydney', 'local SEO Sydney'],
  },
  {
    slug: 'london',
    name: 'London',
    country: 'United Kingdom',
    population: '9.0M',
    intro: 'London\'s market is saturated with agencies — but most deliver PDFs, not results. We bring senior-only delivery to a city that deserves better than offshore templates.',
    localKeywords: ['London SEO agency', 'SEO services London', 'best SEO company London'],
  },
  {
    slug: 'new-york',
    name: 'New York',
    state: 'New York',
    country: 'United States',
    population: '8.3M',
    intro: 'New York small businesses face some of the most competitive SERPs on the planet. From Brooklyn startups to Manhattan professional services, we help you stand out.',
    localKeywords: ['New York SEO agency', 'NYC SEO services', 'SEO company New York'],
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    population: '12.3M',
    intro: 'India\'s tech capital runs on search. Whether you\'re a SaaS startup in Koramangala or a wellness brand in Indiranagar, ranking locally drives revenue.',
    localKeywords: ['Bangalore SEO services', 'SEO company Bangalore', 'SEO agency Bengaluru'],
  },
  {
    slug: 'toronto',
    name: 'Toronto',
    state: 'Ontario',
    country: 'Canada',
    population: '2.9M',
    intro: 'Toronto\'s diverse business community spans e-commerce, fintech, and professional services. Local SEO here means winning bilingual searches and multi-neighbourhood visibility.',
    localKeywords: ['Toronto SEO agency', 'SEO services Toronto', 'best SEO company Toronto'],
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    population: '3.5M',
    intro: 'Dubai\'s rapid growth means new businesses appear daily — and the ones with strong search presence win. We help you dominate both English and Arabic SERPs.',
    localKeywords: ['Dubai SEO agency', 'SEO services Dubai', 'best SEO company UAE'],
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    population: '5.9M',
    intro: 'Singapore punches above its weight in digital commerce. Small businesses here compete with regional giants — and proper SEO is the equalizer.',
    localKeywords: ['Singapore SEO agency', 'SEO services Singapore', 'SEO company Singapore'],
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    state: 'California',
    country: 'United States',
    population: '4.0M',
    intro: 'LA\'s sprawling market means local search is everything. From Santa Monica fitness studios to Downtown law firms, the 3-pack decides who gets the call.',
    localKeywords: ['Los Angeles SEO agency', 'LA SEO services', 'SEO company Los Angeles'],
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    population: '20.7M',
    intro: 'India\'s commercial capital is intensely competitive online. From Bandra boutiques to Andheri SaaS companies, we help Mumbai businesses rank where it matters.',
    localKeywords: ['Mumbai SEO agency', 'SEO services Mumbai', 'best SEO company Mumbai'],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find(c => c.slug === slug)
}

export function getAllCitySlugs(): string[] {
  return cities.map(c => c.slug)
}

export default cities
