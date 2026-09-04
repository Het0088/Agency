export type ContentBlock = {
  page: string
  section: string
  key: string
  label: string
  type: 'text' | 'textarea'
  value: string
}

export const defaultContent: ContentBlock[] = [

  // ─── HOMEPAGE: Topbar ───
  { page: '/', section: 'Topbar', key: 'topbar_text', label: 'Announcement Text', type: 'text', value: 'Now offering AI Search & GEO optimization.' },
  { page: '/', section: 'Topbar', key: 'topbar_link_text', label: 'Announcement Link Text', type: 'text', value: 'Learn more →' },

  // ─── HOMEPAGE: Hero ───
  { page: '/', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow Text', type: 'text', value: 'Global SEO Studio · 2014→2026' },
  { page: '/', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Small businesses deserve to be unmissable.' },
  { page: '/', section: 'Hero', key: 'hero_subtext', label: 'Sub-Heading', type: 'textarea', value: "We're a 38-person SEO studio that helps independent shops, founders, and challenger brands win the search results that matter — across Google, ChatGPT, Perplexity, and whatever comes next." },
  { page: '/', section: 'Hero', key: 'hero_cta_primary', label: 'Primary Button', type: 'text', value: 'Get a free SEO audit' },
  { page: '/', section: 'Hero', key: 'hero_cta_secondary', label: 'Secondary Button', type: 'text', value: 'See how we work' },
  { page: '/', section: 'Hero', key: 'hero_rating_score', label: 'Rating Score', type: 'text', value: '4.9 / 5' },
  { page: '/', section: 'Hero', key: 'hero_rating_text', label: 'Rating Text', type: 'text', value: 'across 412 reviews · Clutch · Trustpilot · Google' },
  { page: '/', section: 'Hero', key: 'hero_card_tag', label: 'Form Card Tag', type: 'text', value: 'Get a free audit' },
  { page: '/', section: 'Hero', key: 'hero_card_pill', label: 'Form Card Pill', type: 'text', value: 'Reply in 4h' },

  // ─── HOMEPAGE: Logos ───
  { page: '/', section: 'Logos', key: 'logos_label', label: 'Label Text', type: 'text', value: 'Trusted by 600+ small businesses worldwide' },

  // ─── HOMEPAGE: Stats ───
  { page: '/', section: 'Stats', key: 'stat_1_num', label: 'Stat 1 Number', type: 'text', value: '412' },
  { page: '/', section: 'Stats', key: 'stat_1_unit', label: 'Stat 1 Unit', type: 'text', value: '%' },
  { page: '/', section: 'Stats', key: 'stat_1_label', label: 'Stat 1 Label', type: 'text', value: 'Average organic traffic growth in 12 months' },
  { page: '/', section: 'Stats', key: 'stat_2_num', label: 'Stat 2 Number', type: 'text', value: '8.5' },
  { page: '/', section: 'Stats', key: 'stat_2_unit', label: 'Stat 2 Unit', type: 'text', value: '×' },
  { page: '/', section: 'Stats', key: 'stat_2_label', label: 'Stat 2 Label', type: 'text', value: 'Average return on retainer for small business clients' },
  { page: '/', section: 'Stats', key: 'stat_3_num', label: 'Stat 3 Number', type: 'text', value: '600' },
  { page: '/', section: 'Stats', key: 'stat_3_unit', label: 'Stat 3 Unit', type: 'text', value: '+' },
  { page: '/', section: 'Stats', key: 'stat_3_label', label: 'Stat 3 Label', type: 'text', value: 'Brands grown across 42 countries since 2014' },
  { page: '/', section: 'Stats', key: 'stat_4_num', label: 'Stat 4 Number', type: 'text', value: '12' },
  { page: '/', section: 'Stats', key: 'stat_4_unit', label: 'Stat 4 Unit', type: 'text', value: 'yrs' },
  { page: '/', section: 'Stats', key: 'stat_4_label', label: 'Stat 4 Label', type: 'text', value: 'Doing exactly this — no pivots, no fads' },

  // ─── HOMEPAGE: Why Need SEO ───
  { page: '/', section: 'Why Need SEO', key: 'whyseo_heading', label: 'Section Heading', type: 'text', value: 'Why your business needs SEO.' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_subtext', label: 'Section Subtext', type: 'textarea', value: "Every day without SEO is traffic, leads, and revenue you're handing to competitors. Here's why it matters more in 2026 than ever." },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_1_title', label: 'Reason 1 Title', type: 'text', value: '93% of online experiences start with search' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_1_desc', label: 'Reason 1 Text', type: 'textarea', value: "If your business isn't visible when people search, you don't exist to them. SEO puts you where your customers are already looking." },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_2_title', label: 'Reason 2 Title', type: 'text', value: "Organic traffic compounds — ads don't" },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_2_desc', label: 'Reason 2 Text', type: 'textarea', value: 'Paid ads stop the moment you stop paying. SEO builds an asset that grows month over month, generating leads while you sleep.' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_3_title', label: 'Reason 3 Title', type: 'text', value: 'Your competitors are already investing' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_3_desc', label: 'Reason 3 Text', type: 'textarea', value: 'Every day you delay SEO, competitors are claiming the keywords, citations, and authority that should be yours.' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_4_title', label: 'Reason 4 Title', type: 'text', value: 'AI search is reshaping visibility' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_4_desc', label: 'Reason 4 Text', type: 'textarea', value: 'ChatGPT, Perplexity, and Google AI Overviews are answering queries directly. Brands not optimized for AI retrieval are becoming invisible.' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_5_title', label: 'Reason 5 Title', type: 'text', value: 'Trust is earned through rankings' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_5_desc', label: 'Reason 5 Text', type: 'textarea', value: 'Users trust organic results 5.66x more than paid ads. Page-one presence signals credibility and authority to your audience.' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_6_title', label: 'Reason 6 Title', type: 'text', value: 'SEO drives the highest-intent traffic' },
  { page: '/', section: 'Why Need SEO', key: 'whyseo_6_desc', label: 'Reason 6 Text', type: 'textarea', value: 'People searching for what you sell are ready to buy. SEO captures demand at the exact moment of intent — no interruption, no convincing.' },

  // ─── HOMEPAGE: Services ───
  { page: '/', section: 'Services', key: 'svc_heading', label: 'Section Heading', type: 'text', value: 'What we do, in plain English.' },
  { page: '/', section: 'Services', key: 'svc_subtext', label: 'Section Subtext', type: 'textarea', value: 'Six tightly-scoped services that compound when run together. No bloated retainers, no work-for-the-sake-of-work.' },
  { page: '/', section: 'Services', key: 'svc_1_title', label: 'Service 1 Title', type: 'text', value: 'SEO foundations' },
  { page: '/', section: 'Services', key: 'svc_1_desc', label: 'Service 1 Text', type: 'textarea', value: 'The on-page, technical, and content fundamentals that make Google trust you. Our flagship — and what every other service builds on.' },
  { page: '/', section: 'Services', key: 'svc_2_title', label: 'Service 2 Title', type: 'text', value: 'Local & Maps' },
  { page: '/', section: 'Services', key: 'svc_2_desc', label: 'Service 2 Text', type: 'textarea', value: 'Win the 3-pack and the "near me" queries that drive walk-ins, calls, and bookings — across multi-location businesses too.' },
  { page: '/', section: 'Services', key: 'svc_3_title', label: 'Service 3 Title', type: 'text', value: 'Technical SEO' },
  { page: '/', section: 'Services', key: 'svc_3_desc', label: 'Service 3 Text', type: 'textarea', value: 'Core Web Vitals, crawl budget, schema, faceted nav, JS rendering. The plumbing nobody else wants to touch — we love it.' },
  { page: '/', section: 'Services', key: 'svc_4_title', label: 'Service 4 Title', type: 'text', value: 'Editorial & content' },
  { page: '/', section: 'Services', key: 'svc_4_desc', label: 'Service 4 Text', type: 'textarea', value: 'Long-form, programmatic, and answer-first content written by humans who know your industry — not interns and not AI slop.' },
  { page: '/', section: 'Services', key: 'svc_5_title', label: 'Service 5 Title', type: 'text', value: 'Digital PR & links' },
  { page: '/', section: 'Services', key: 'svc_5_desc', label: 'Service 5 Text', type: 'textarea', value: 'Editorial backlinks from publications your customers actually read. No PBNs, no link farms, no shortcuts that backfire.' },
  { page: '/', section: 'Services', key: 'svc_6_title', label: 'Service 6 Title', type: 'text', value: 'AI Search & GEO' },
  { page: '/', section: 'Services', key: 'svc_6_desc', label: 'Service 6 Text', type: 'textarea', value: 'Get cited inside ChatGPT, Perplexity, Google AI Overviews, and Gemini. The new rules of being found — already in motion.' },

  // ─── HOMEPAGE: SEO Process ───
  { page: '/', section: 'SEO Process', key: 'seoproc_eyebrow', label: 'Eyebrow', type: 'text', value: 'How we work' },
  { page: '/', section: 'SEO Process', key: 'seoproc_heading', label: 'Section Heading', type: 'text', value: 'Our AI SEO Process' },
  { page: '/', section: 'SEO Process', key: 'seoproc_subtext', label: 'Section Subtext', type: 'textarea', value: 'A well-defined, structured process built on industry best practices to address the unique needs of each client.' },
  { page: '/', section: 'SEO Process', key: 'seoproc_1_title', label: 'Step 1 Title', type: 'text', value: 'Understanding Your Business' },
  { page: '/', section: 'SEO Process', key: 'seoproc_1_desc', label: 'Step 1 Text', type: 'textarea', value: 'The process begins with gaining a clear understanding of your business and industry to ensure the strategy aligns with your goals.' },
  { page: '/', section: 'SEO Process', key: 'seoproc_2_title', label: 'Step 2 Title', type: 'text', value: 'AI-Powered Audits and Keyword Research' },
  { page: '/', section: 'SEO Process', key: 'seoproc_2_desc', label: 'Step 2 Text', type: 'textarea', value: 'AI tools are used to conduct detailed audits of your website and perform keyword research, identifying key opportunities for improvement.' },
  { page: '/', section: 'SEO Process', key: 'seoproc_3_title', label: 'Step 3 Title', type: 'text', value: 'Personalized Content and SEO Recommendations' },
  { page: '/', section: 'SEO Process', key: 'seoproc_3_desc', label: 'Step 3 Text', type: 'textarea', value: 'Based on findings, we develop tailored content strategies and provide SEO recommendations to enhance both content and site performance.' },
  { page: '/', section: 'SEO Process', key: 'seoproc_4_title', label: 'Step 4 Title', type: 'text', value: 'LLM Optimization' },
  { page: '/', section: 'SEO Process', key: 'seoproc_4_desc', label: 'Step 4 Text', type: 'textarea', value: 'We research and optimize your brand to boost visibility in LLM searches, driving higher brand awareness where high-intent searches are happening.' },
  { page: '/', section: 'SEO Process', key: 'seoproc_5_title', label: 'Step 5 Title', type: 'text', value: 'Continuous Monitoring and Optimization' },
  { page: '/', section: 'SEO Process', key: 'seoproc_5_desc', label: 'Step 5 Text', type: 'textarea', value: 'The strategy is regularly monitored using AI tools, ensuring it remains effective and adapts to industry changes and algorithm updates.' },
  { page: '/', section: 'SEO Process', key: 'seoproc_6_title', label: 'Step 6 Title', type: 'text', value: 'Measuring ROI and Refining the Strategy' },
  { page: '/', section: 'SEO Process', key: 'seoproc_6_desc', label: 'Step 6 Text', type: 'textarea', value: 'We track your performance and refine the strategy as necessary, optimizing results and achieving business goals with every action.' },

  // ─── HOMEPAGE: AI Block ───
  { page: '/', section: 'AI Block', key: 'ai_eyebrow', label: 'Eyebrow', type: 'text', value: 'The new search era' },
  { page: '/', section: 'AI Block', key: 'ai_heading', label: 'Heading', type: 'text', value: "AI didn't kill SEO. It raised the stakes." },
  { page: '/', section: 'AI Block', key: 'ai_subtext', label: 'Body Text', type: 'textarea', value: "Half of search journeys now start in ChatGPT, Perplexity, or Google's AI Overviews. The brands cited inside those answers are the brands that win the next decade. We optimize for both — the blue links and the AI answers." },
  { page: '/', section: 'AI Block', key: 'ai_point_1', label: 'Bullet 1', type: 'textarea', value: 'GEO audits across ChatGPT, Perplexity, Claude, Gemini, and Google AIO — see exactly where you\'re cited (and where you\'re invisible).' },
  { page: '/', section: 'AI Block', key: 'ai_point_2', label: 'Bullet 2', type: 'textarea', value: 'Answer-first content structured for LLM retrieval — semantic markup, claim-evidence pairs, citation hooks.' },
  { page: '/', section: 'AI Block', key: 'ai_point_3', label: 'Bullet 3', type: 'textarea', value: 'Brand entity building across Wikipedia, Wikidata, Crunchbase, and the open web LLMs train on.' },
  { page: '/', section: 'AI Block', key: 'ai_point_4', label: 'Bullet 4', type: 'textarea', value: 'Monthly mention reports showing your share of voice in AI answers vs. competitors — the metric that will matter in 2027.' },
  { page: '/', section: 'AI Block', key: 'ai_cta', label: 'CTA Button', type: 'text', value: 'Read the AI SEO playbook' },

  // ─── HOMEPAGE: Process ───
  { page: '/', section: 'Process', key: 'proc_heading', label: 'Section Heading', type: 'text', value: 'Four steps, repeated forever.' },
  { page: '/', section: 'Process', key: 'proc_subtext', label: 'Section Subtext', type: 'textarea', value: "SEO is not a project. It's a discipline. Here's the loop we run with every client, every month, for as long as the work compounds." },
  { page: '/', section: 'Process', key: 'proc_1_title', label: 'Step 1 Title', type: 'text', value: 'Audit & map' },
  { page: '/', section: 'Process', key: 'proc_1_desc', label: 'Step 1 Text', type: 'textarea', value: 'Three weeks of forensic analysis across your site, content, links, and the SERPs you want to own. We come back with a 90-day roadmap.' },
  { page: '/', section: 'Process', key: 'proc_2_title', label: 'Step 2 Title', type: 'text', value: 'Build & ship' },
  { page: '/', section: 'Process', key: 'proc_2_desc', label: 'Step 2 Text', type: 'textarea', value: 'Technical fixes, on-page work, and content production run in parallel. Most clients see indexable changes inside week 4.' },
  { page: '/', section: 'Process', key: 'proc_3_title', label: 'Step 3 Title', type: 'text', value: 'Earn authority' },
  { page: '/', section: 'Process', key: 'proc_3_desc', label: 'Step 3 Text', type: 'textarea', value: 'Digital PR, partnerships, and editorial outreach — links and brand mentions from outlets your customers actually read.' },
  { page: '/', section: 'Process', key: 'proc_4_title', label: 'Step 4 Title', type: 'text', value: 'Measure & iterate' },
  { page: '/', section: 'Process', key: 'proc_4_desc', label: 'Step 4 Text', type: 'textarea', value: 'Monthly dashboards show traffic, rankings, AI mentions, and revenue. We meet, we adjust, we ship the next sprint.' },

  // ─── HOMEPAGE: Mid-Page CTA ───
  { page: '/', section: 'Mid CTA', key: 'mid_cta_heading', label: 'CTA Heading', type: 'text', value: 'Ready to outrank your competitors?' },
  { page: '/', section: 'Mid CTA', key: 'mid_cta_text', label: 'CTA Text', type: 'textarea', value: 'Get a free 30-minute strategy call with one of our senior SEO strategists. No pitch, just actionable insights.' },
  { page: '/', section: 'Mid CTA', key: 'mid_cta_btn', label: 'CTA Button Text', type: 'text', value: 'Book your free call' },

  // ─── HOMEPAGE: Cases ───
  { page: '/', section: 'Case Studies', key: 'cases_heading', label: 'Section Heading', type: 'text', value: 'Results that actually move revenue.' },
  { page: '/', section: 'Case Studies', key: 'cases_subtext', label: 'Section Subtext', type: 'textarea', value: 'Twelve-month outcomes from real small-business clients. No vanity metrics — just qualified traffic and revenue.' },
  { page: '/', section: 'Case Studies', key: 'case_1_name', label: 'Case 1 Name', type: 'text', value: 'Maple & Oak Coffee Roasters' },
  { page: '/', section: 'Case Studies', key: 'case_1_tag', label: 'Case 1 Tag', type: 'text', value: 'Specialty Retail · DTC' },
  { page: '/', section: 'Case Studies', key: 'case_1_cat', label: 'Case 1 Subtitle', type: 'text', value: 'From local roastery to national subscription brand' },
  { page: '/', section: 'Case Studies', key: 'case_2_name', label: 'Case 2 Name', type: 'text', value: 'Solace Yoga Studios' },
  { page: '/', section: 'Case Studies', key: 'case_2_tag', label: 'Case 2 Tag', type: 'text', value: 'Health & Wellness · Multi-location' },
  { page: '/', section: 'Case Studies', key: 'case_2_cat', label: 'Case 2 Subtitle', type: 'text', value: 'From 4 studios to 22 in three years' },
  { page: '/', section: 'Case Studies', key: 'case_3_name', label: 'Case 3 Name', type: 'text', value: 'Northbound Analytics' },
  { page: '/', section: 'Case Studies', key: 'case_3_tag', label: 'Case 3 Tag', type: 'text', value: 'B2B SaaS · Bootstrapped' },
  { page: '/', section: 'Case Studies', key: 'case_3_cat', label: 'Case 3 Subtitle', type: 'text', value: 'Outranking VC-funded competitors with 1/10 the budget' },

  // ─── HOMEPAGE: Pricing ───
  { page: '/', section: 'Pricing', key: 'pricing_eyebrow', label: 'Eyebrow', type: 'text', value: 'Transparent Retainers' },
  { page: '/', section: 'Pricing', key: 'pricing_heading', label: 'Section Heading', type: 'text', value: 'Predictable Retainers. Real Revenue ROI.' },
  { page: '/', section: 'Pricing', key: 'pricing_subtext', label: 'Section Subtext', type: 'textarea', value: 'No lock-in contracts. 90-day initial execution sprint, then month-to-month. Every account is led by a senior strategist with 8+ years experience.' },
  { page: '/', section: 'Pricing', key: 'plan_1_name', label: 'Tier 1 Name', type: 'text', value: 'Essential Growth' },
  { page: '/', section: 'Pricing', key: 'plan_1_badge', label: 'Tier 1 Badge', type: 'text', value: 'Starter' },
  { page: '/', section: 'Pricing', key: 'plan_1_price', label: 'Tier 1 Price', type: 'text', value: '$3,500' },
  { page: '/', section: 'Pricing', key: 'plan_1_desc', label: 'Tier 1 Description', type: 'textarea', value: 'For high-intent small businesses and challenger brands establishing search and AI answer visibility.' },
  { page: '/', section: 'Pricing', key: 'plan_1_cta', label: 'Tier 1 CTA Button', type: 'text', value: 'Start with Essential' },
  { page: '/', section: 'Pricing', key: 'plan_2_name', label: 'Tier 2 Name', type: 'text', value: 'Market Leader' },
  { page: '/', section: 'Pricing', key: 'plan_2_badge', label: 'Tier 2 Badge', type: 'text', value: 'Most Popular' },
  { page: '/', section: 'Pricing', key: 'plan_2_price', label: 'Tier 2 Price', type: 'text', value: '$6,500' },
  { page: '/', section: 'Pricing', key: 'plan_2_desc', label: 'Tier 2 Description', type: 'textarea', value: 'Full-spectrum SEO, GEO, and digital PR for companies aggressively taking market share from legacy incumbents.' },
  { page: '/', section: 'Pricing', key: 'plan_2_cta', label: 'Tier 2 CTA Button', type: 'text', value: 'Scale with Market Leader' },
  { page: '/', section: 'Pricing', key: 'plan_3_name', label: 'Tier 3 Name', type: 'text', value: 'Enterprise & Scale' },
  { page: '/', section: 'Pricing', key: 'plan_3_badge', label: 'Tier 3 Badge', type: 'text', value: 'Full Arsenal' },
  { page: '/', section: 'Pricing', key: 'plan_3_price', label: 'Tier 3 Price', type: 'text', value: '$12,000' },
  { page: '/', section: 'Pricing', key: 'plan_3_desc', label: 'Tier 3 Description', type: 'textarea', value: 'For multi-location brands, high-SKU e-commerce stores, and venture-backed SaaS requiring dedicated engineering.' },
  { page: '/', section: 'Pricing', key: 'plan_3_cta', label: 'Tier 3 CTA Button', type: 'text', value: 'Book Enterprise Discovery' },

  // ─── HOMEPAGE: Testimonials ───
  { page: '/', section: 'Testimonials', key: 'testi_heading', label: 'Section Heading', type: 'text', value: 'What our clients actually say.' },
  { page: '/', section: 'Testimonials', key: 'testi_subtext', label: 'Section Subtext', type: 'textarea', value: "Unedited, unpaid, and posted publicly on Clutch and Trustpilot. We've checked." },
  { page: '/', section: 'Testimonials', key: 'testi_1_quote', label: 'Testimonial 1 Quote', type: 'textarea', value: '"Within nine months we were ranking #1 for our three highest-intent keywords. The team didn\'t just deliver traffic — they helped us understand why it was working."' },
  { page: '/', section: 'Testimonials', key: 'testi_1_name', label: 'Testimonial 1 Name', type: 'text', value: 'Elena Marchetti' },
  { page: '/', section: 'Testimonials', key: 'testi_1_role', label: 'Testimonial 1 Role', type: 'text', value: 'Founder · Maple & Oak Roasters' },
  { page: '/', section: 'Testimonials', key: 'testi_2_quote', label: 'Testimonial 2 Quote', type: 'textarea', value: '"We\'ve worked with three SEO agencies before. Gen Ranq is the first one that felt like a partner instead of a vendor sending PDFs into the void."' },
  { page: '/', section: 'Testimonials', key: 'testi_2_name', label: 'Testimonial 2 Name', type: 'text', value: 'James Okafor' },
  { page: '/', section: 'Testimonials', key: 'testi_2_role', label: 'Testimonial 2 Role', type: 'text', value: 'CMO · Northbound Analytics' },
  { page: '/', section: 'Testimonials', key: 'testi_3_quote', label: 'Testimonial 3 Quote', type: 'textarea', value: '"They got us cited inside ChatGPT for our category before we even knew that was a thing you could optimize for. Clearly thinking three steps ahead."' },
  { page: '/', section: 'Testimonials', key: 'testi_3_name', label: 'Testimonial 3 Name', type: 'text', value: 'Priya Raghavan' },
  { page: '/', section: 'Testimonials', key: 'testi_3_role', label: 'Testimonial 3 Role', type: 'text', value: 'Head of Growth · Habitat Goods Co.' },

  // ─── HOMEPAGE: Why Us ───
  { page: '/', section: 'Why Us', key: 'whyus_heading', label: 'Section Heading', type: 'text', value: 'What sets us apart.' },
  { page: '/', section: 'Why Us', key: 'whyus_subtext', label: 'Section Subtext', type: 'textarea', value: "Four things we do differently — and why they matter when you're betting your growth on a partner." },
  { page: '/', section: 'Why Us', key: 'whyus_1_name', label: 'Item 1 Title', type: 'text', value: 'Senior-only delivery' },
  { page: '/', section: 'Why Us', key: 'whyus_1_desc', label: 'Item 1 Text', type: 'textarea', value: 'Every account is led by a strategist with 8+ years of experience. No juniors learning on your retainer, no offshored execution, no "Account Manager" passing notes between departments.' },
  { page: '/', section: 'Why Us', key: 'whyus_2_name', label: 'Item 2 Title', type: 'text', value: 'Revenue over rankings' },
  { page: '/', section: 'Why Us', key: 'whyus_2_desc', label: 'Item 2 Text', type: 'textarea', value: 'We track keyword positions, sure. But the only number that matters in our monthly report is qualified, attributable revenue — tied back to the work we shipped.' },
  { page: '/', section: 'Why Us', key: 'whyus_3_name', label: 'Item 3 Title', type: 'text', value: 'No long contracts' },
  { page: '/', section: 'Why Us', key: 'whyus_3_desc', label: 'Item 3 Text', type: 'textarea', value: "Month-to-month after the first 90 days. We earn the renewal every cycle. If we're not delivering, you walk — and you keep all the work, deliverables, and dashboards." },
  { page: '/', section: 'Why Us', key: 'whyus_4_name', label: 'Item 4 Title', type: 'text', value: 'Built for the AI era' },
  { page: '/', section: 'Why Us', key: 'whyus_4_desc', label: 'Item 4 Text', type: 'textarea', value: "We've been optimizing for LLM citations since GPT-4 launched. Most agencies are still figuring out what GEO means. We've shipped it for 80+ clients." },

  // ─── HOMEPAGE: FAQ ───
  { page: '/', section: 'FAQ', key: 'faq_heading', label: 'Section Heading', type: 'text', value: 'Questions we get most weeks.' },
  { page: '/', section: 'FAQ', key: 'faq_subtext', label: 'Section Subtext', type: 'textarea', value: "If yours isn't here, ask us on the discovery call. We'll give you a real answer, not a sales answer." },
  { page: '/', section: 'FAQ', key: 'faq_1_q', label: 'FAQ 1 Question', type: 'text', value: 'How long until I see results from SEO?' },
  { page: '/', section: 'FAQ', key: 'faq_1_a', label: 'FAQ 1 Answer', type: 'textarea', value: "It depends on your starting point. Brand new sites usually need 6-9 months for meaningful traffic. Established sites with technical issues often see movement inside 90 days because we're unblocking work that already exists. We'll tell you what's realistic on the discovery call." },
  { page: '/', section: 'FAQ', key: 'faq_2_q', label: 'FAQ 2 Question', type: 'text', value: "What's the minimum retainer?" },
  { page: '/', section: 'FAQ', key: 'faq_2_a', label: 'FAQ 2 Answer', type: 'textarea', value: 'Our smallest retainer is $4,000/month, which covers a senior strategist, audits, on-page work, and 4 articles a month. Most small-business clients land between $4k and $8k. We quote based on what would actually move the needle, not what maximizes our margin.' },
  { page: '/', section: 'FAQ', key: 'faq_3_q', label: 'FAQ 3 Question', type: 'text', value: 'Do I need to sign a long contract?' },
  { page: '/', section: 'FAQ', key: 'faq_3_a', label: 'FAQ 3 Answer', type: 'textarea', value: "90-day initial commitment to give the work time to ship. After that, month-to-month forever. If we're not delivering, you cancel and keep all audits, content, dashboards, and access." },
  { page: '/', section: 'FAQ', key: 'faq_4_q', label: 'FAQ 4 Question', type: 'text', value: 'Will my SEO survive the AI takeover?' },
  { page: '/', section: 'FAQ', key: 'faq_4_a', label: 'FAQ 4 Answer', type: 'textarea', value: "It will if it's done right. The brands cited inside ChatGPT and Google AI Overviews are the brands with real authority, real content, real entity signals. AI hasn't replaced SEO; it's raised the bar. We've been optimizing for LLM citations since 2023." },
  { page: '/', section: 'FAQ', key: 'faq_5_q', label: 'FAQ 5 Question', type: 'text', value: 'Who actually does the work on my account?' },
  { page: '/', section: 'FAQ', key: 'faq_5_a', label: 'FAQ 5 Answer', type: 'textarea', value: 'A senior strategist with at least 8 years of SEO experience, supported by specialists in technical, content, and digital PR. Same lead strategist for the lifetime of your retainer.' },
  { page: '/', section: 'FAQ', key: 'faq_6_q', label: 'FAQ 6 Question', type: 'text', value: 'What makes Gen Ranq different from other SEO agencies?' },
  { page: '/', section: 'FAQ', key: 'faq_6_a', label: 'FAQ 6 Answer', type: 'textarea', value: 'We optimize for both traditional search and AI-driven retrieval. Most agencies still focus only on Google rankings. We ensure your brand is cited in ChatGPT, Perplexity, and Google AI Overviews alongside traditional organic results.' },
  { page: '/', section: 'FAQ', key: 'faq_7_q', label: 'FAQ 7 Question', type: 'text', value: 'Do you guarantee first-page rankings?' },
  { page: '/', section: 'FAQ', key: 'faq_7_a', label: 'FAQ 7 Answer', type: 'textarea', value: 'No. Anyone who guarantees rankings is lying or gaming. We guarantee a transparent process, consistent execution, and measurable progress. Our 4.9/5 rating across 412 reviews exists because we deliver results, not promises.' },

  // ─── HOMEPAGE: Bottom CTA ───
  { page: '/', section: 'Bottom CTA', key: 'cta_heading', label: 'Heading', type: 'text', value: 'Ready to be unmissable?' },
  { page: '/', section: 'Bottom CTA', key: 'cta_text', label: 'Body Text', type: 'textarea', value: 'Get a free 30-minute SEO audit. No deck, no fluff — a real strategist, looking at your real site, telling you the three things to fix first.' },
  { page: '/', section: 'Bottom CTA', key: 'cta_btn', label: 'Primary Button', type: 'text', value: 'Book your free audit' },
  { page: '/', section: 'Bottom CTA', key: 'cta_btn2', label: 'Secondary Button', type: 'text', value: 'See our process' },

  // ─── ABOUT PAGE ───
  { page: '/about', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: "We're 38 people who genuinely care if your phone rings." },
  { page: '/about', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Gen Ranq is a global SEO studio for ambitious small businesses. We started in a Melbourne garage in 2014, picked up offices in London and Bangalore, and have shipped SEO strategy for 600+ brands across 42 countries since.' },
  { page: '/about', section: 'Our Story', key: 'story_heading', label: 'Story Heading', type: 'text', value: 'A studio, not an agency.' },
  { page: '/about', section: 'Our Story', key: 'story_para_1', label: 'Story Paragraph 1', type: 'textarea', value: 'We hate the word "agency." It carries everything we wanted to leave behind — bloated retainers, account managers passing notes, juniors learning on client budgets, decks dressed up as strategy.' },
  { page: '/about', section: 'Our Story', key: 'story_para_2', label: 'Story Paragraph 2', type: 'textarea', value: 'A studio is small, senior, and accountable. The person who pitches you is the person who works on you. Every account is owned by a strategist with eight or more years in the trenches — not a sales guy who hands you off.' },
  { page: '/about', section: 'Our Story', key: 'story_para_3', label: 'Story Paragraph 3', type: 'textarea', value: "We've turned down clients we couldn't help. We've fired clients we couldn't help fast enough. We sleep fine." },
  { page: '/about', section: 'Values', key: 'values_heading', label: 'Values Heading', type: 'text', value: 'Six things we actually believe.' },
  { page: '/about', section: 'Values', key: 'values_subtext', label: 'Values Subtext', type: 'textarea', value: "Not poster slogans. The rules we'll fire ourselves over if we ever stop following them." },
  { page: '/about', section: 'Values', key: 'val_1_title', label: 'Value 1 Title', type: 'text', value: 'Senior or nothing' },
  { page: '/about', section: 'Values', key: 'val_1_desc', label: 'Value 1 Text', type: 'textarea', value: "If we can't put an 8+ year strategist on your account, we don't take it. No juniors learning on retainers. No exceptions, no compromises." },
  { page: '/about', section: 'Values', key: 'val_2_title', label: 'Value 2 Title', type: 'text', value: 'Show the work' },
  { page: '/about', section: 'Values', key: 'val_2_desc', label: 'Value 2 Text', type: 'textarea', value: "Every deliverable, every audit, every report is in your shared folder the day it's made. Receipts over PowerPoints, always." },
  { page: '/about', section: 'Values', key: 'val_3_title', label: 'Value 3 Title', type: 'text', value: 'Revenue is the metric' },
  { page: '/about', section: 'Values', key: 'val_3_desc', label: 'Value 3 Text', type: 'textarea', value: 'Rankings are interesting. Traffic is fine. Revenue is the only number we put on the cover of the monthly report.' },
  { page: '/about', section: 'Values', key: 'val_4_title', label: 'Value 4 Title', type: 'text', value: 'Ship, then think' },
  { page: '/about', section: 'Values', key: 'val_4_desc', label: 'Value 4 Text', type: 'textarea', value: 'Two weeks of analysis is rarely worth one week of shipping. We bias toward small, fast, reversible bets — and learn from what moves.' },
  { page: '/about', section: 'Values', key: 'val_5_title', label: 'Value 5 Title', type: 'text', value: 'Tell the truth' },
  { page: '/about', section: 'Values', key: 'val_5_desc', label: 'Value 5 Text', type: 'textarea', value: "Including the parts you don't want to hear. If your site can't rank, we'll say so on the call. Hope is not a strategy and lying is not a service." },
  { page: '/about', section: 'Values', key: 'val_6_title', label: 'Value 6 Title', type: 'text', value: 'Earn it monthly' },
  { page: '/about', section: 'Values', key: 'val_6_desc', label: 'Value 6 Text', type: 'textarea', value: "Month-to-month after the first 90 days. We earn the renewal every cycle. Long contracts make agencies lazy. We refuse to be lazy." },
  { page: '/about', section: 'Team', key: 'team_heading', label: 'Team Heading', type: 'text', value: "The people you'll actually work with." },
  { page: '/about', section: 'Team', key: 'team_subtext', label: 'Team Subtext', type: 'textarea', value: 'No "Account Executives." No call-center middle layers. The strategist on your kickoff is the strategist on your retainer, every week, for as long as you stay.' },
  { page: '/about', section: 'Founders Note', key: 'founders_quote_1', label: 'Quote Part 1', type: 'textarea', value: '"We started this studio because we kept watching small business owners get talked down to by agencies that didn\'t really care if they succeeded.' },
  { page: '/about', section: 'Founders Note', key: 'founders_quote_2', label: 'Quote Part 2', type: 'textarea', value: 'Twelve years later, we still get up every morning trying to be the partner those owners deserve. That\'s it. That\'s the whole pitch."' },
  { page: '/about', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Want to meet the team?' },
  { page: '/about', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: "Book a 30-minute intro call with the strategist who would lead your account. No sales reps, no decks — just the person who'd actually do the work." },
  { page: '/about', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your intro call' },

  // ─── CONTACT PAGE ───
  { page: '/contact', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: "Let's talk." },
  { page: '/contact', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: "Fill the form, send an email, or pick up the phone — whichever feels easier. Either way, the strategist who'd lead your account replies. No SDRs, no sales reps, no funnels." },
  { page: '/contact', section: 'Hero', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Most replies within 4 business hours · Mon–Fri.' },

  // ─── SERVICE PAGES ───
  { page: '/services', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Everything you need to dominate search.' },
  { page: '/services', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Eight disciplines, one studio. We handle SEO, AI search, content, paid media, web design, link building, social, and analytics — so you don\'t need eight agencies.' },
  { page: '/services', section: 'Stats', key: 'stats_1_num', label: 'Stat 1 Value', type: 'text', value: '8' },
  { page: '/services', section: 'Stats', key: 'stats_1_unit', label: 'Stat 1 Unit', type: 'text', value: 'services' },
  { page: '/services', section: 'Stats', key: 'stats_1_label', label: 'Stat 1 Label', type: 'text', value: 'Full disciplines under one roof' },
  { page: '/services', section: 'Stats', key: 'stats_2_num', label: 'Stat 2 Value', type: 'text', value: '30' },
  { page: '/services', section: 'Stats', key: 'stats_2_unit', label: 'Stat 2 Unit', type: 'text', value: '+' },
  { page: '/services', section: 'Stats', key: 'stats_2_label', label: 'Stat 2 Label', type: 'text', value: 'Specialized sub-services' },
  { page: '/services', section: 'Stats', key: 'stats_3_num', label: 'Stat 3 Value', type: 'text', value: '412' },
  { page: '/services', section: 'Stats', key: 'stats_3_unit', label: 'Stat 3 Unit', type: 'text', value: '%' },
  { page: '/services', section: 'Stats', key: 'stats_3_label', label: 'Stat 3 Label', type: 'text', value: 'Average organic traffic growth' },
  { page: '/services', section: 'Stats', key: 'stats_4_num', label: 'Stat 4 Value', type: 'text', value: '94' },
  { page: '/services', section: 'Stats', key: 'stats_4_unit', label: 'Stat 4 Unit', type: 'text', value: '%' },
  { page: '/services', section: 'Stats', key: 'stats_4_label', label: 'Stat 4 Label', type: 'text', value: 'Annual client retention rate' },

  { page: '/services', section: 'Mid CTA', key: 'mid_cta_heading', label: 'Mid CTA Heading', type: 'text', value: 'Not sure which service you need?' },
  { page: '/services', section: 'Mid CTA', key: 'mid_cta_subtext', label: 'Mid CTA Subtext', type: 'textarea', value: 'Book a 30-minute call with a senior strategist. No sales pitch — just honest advice.' },
  { page: '/services', section: 'Mid CTA', key: 'mid_cta_btn', label: 'Mid CTA Button', type: 'text', value: 'Book a free call' },

  { page: '/services', section: 'Engagement', key: 'engage_heading', label: 'Section Heading', type: 'text', value: 'Choose your engagement.' },
  { page: '/services', section: 'Engagement', key: 'engage_subtext', label: 'Section Subtext', type: 'textarea', value: 'Three ways to work with us. Pick the model that fits your stage and budget.' },

  { page: '/services', section: 'Engagement Model 1', key: 'engage_1_tag', label: 'Model 1 Tag', type: 'text', value: 'Most popular' },
  { page: '/services', section: 'Engagement Model 1', key: 'engage_1_title', label: 'Model 1 Title', type: 'text', value: 'Monthly retainer' },
  { page: '/services', section: 'Engagement Model 1', key: 'engage_1_price', label: 'Model 1 Price', type: 'text', value: 'From $4,000/mo' },
  { page: '/services', section: 'Engagement Model 1', key: 'engage_1_desc', label: 'Model 1 Description', type: 'textarea', value: 'Ongoing, full-service SEO with a dedicated strategist. All workstreams running in parallel. Month-to-month after 90-day onboarding.' },
  { page: '/services', section: 'Engagement Model 1', key: 'engage_1_features', label: 'Model 1 Features (comma separated)', type: 'textarea', value: 'Dedicated senior strategist, All deliverables included, Live dashboard & monthly calls, Month-to-month after onboarding' },

  { page: '/services', section: 'Engagement Model 2', key: 'engage_2_tag', label: 'Model 2 Tag', type: 'text', value: 'One-time' },
  { page: '/services', section: 'Engagement Model 2', key: 'engage_2_title', label: 'Model 2 Title', type: 'text', value: 'SEO audit' },
  { page: '/services', section: 'Engagement Model 2', key: 'engage_2_price', label: 'Model 2 Price', type: 'text', value: 'From $2,500' },
  { page: '/services', section: 'Engagement Model 2', key: 'engage_2_desc', label: 'Model 2 Description', type: 'textarea', value: 'A comprehensive 60-90 page audit with prioritized findings and a 90-minute walkthrough.' },
  { page: '/services', section: 'Engagement Model 2', key: 'engage_2_features', label: 'Model 2 Features (comma separated)', type: 'textarea', value: '200+ point technical audit, Content gap analysis, Competitive positioning report, 90-minute strategy call' },

  { page: '/services', section: 'Engagement Model 3', key: 'engage_3_tag', label: 'Model 3 Tag', type: 'text', value: 'Consulting' },
  { page: '/services', section: 'Engagement Model 3', key: 'engage_3_title', label: 'Model 3 Title', type: 'text', value: 'Strategy sprint' },
  { page: '/services', section: 'Engagement Model 3', key: 'engage_3_price', label: 'Model 3 Price', type: 'text', value: 'From $6,000' },
  { page: '/services', section: 'Engagement Model 3', key: 'engage_3_desc', label: 'Model 3 Description', type: 'textarea', value: 'A focused 4-week engagement. We build your roadmap, train your team, and hand over a 12-month execution plan.' },
  { page: '/services', section: 'Engagement Model 3', key: 'engage_3_features', label: 'Model 3 Features (comma separated)', type: 'textarea', value: '4-week intensive engagement, Full keyword & content strategy, Team training sessions, 12-month execution plan' },

  { page: '/services', section: 'Compare', key: 'compare_heading', label: 'Compare Heading', type: 'text', value: 'Us vs. typical agencies.' },
  { page: '/services', section: 'Compare', key: 'compare_subtext', label: 'Compare Subtext', type: 'textarea', value: 'Not throwing shade. Just being clear about how we\'re built differently.' },

  { page: '/services', section: 'Compare Row 1', key: 'compare_1_lab', label: 'Row 1 Metric', type: 'text', value: 'Senior strategist on every call' },
  { page: '/services', section: 'Compare Row 1', key: 'compare_1_us', label: 'Row 1 Us', type: 'text', value: 'Always' },
  { page: '/services', section: 'Compare Row 1', key: 'compare_1_them', label: 'Row 1 Them', type: 'text', value: 'Account manager, sometimes' },

  { page: '/services', section: 'Compare Row 2', key: 'compare_2_lab', label: 'Row 2 Metric', type: 'text', value: 'Month-to-month after onboarding' },
  { page: '/services', section: 'Compare Row 2', key: 'compare_2_us', label: 'Row 2 Us', type: 'text', value: 'After 90 days' },
  { page: '/services', section: 'Compare Row 2', key: 'compare_2_them', label: 'Row 2 Them', type: 'text', value: '12-month minimums' },

  { page: '/services', section: 'Compare Row 3', key: 'compare_3_lab', label: 'Row 3 Metric', type: 'text', value: 'Live dashboard with revenue attribution' },
  { page: '/services', section: 'Compare Row 3', key: 'compare_3_us', label: 'Row 3 Us', type: 'text', value: 'Day one' },
  { page: '/services', section: 'Compare Row 3', key: 'compare_3_them', label: 'Row 3 Them', type: 'text', value: 'Monthly PDFs' },

  { page: '/services', section: 'Compare Row 4', key: 'compare_4_lab', label: 'Row 4 Metric', type: 'text', value: 'AI Search & GEO included' },
  { page: '/services', section: 'Compare Row 4', key: 'compare_4_us', label: 'Row 4 Us', type: 'text', value: 'Standard' },
  { page: '/services', section: 'Compare Row 4', key: 'compare_4_them', label: 'Row 4 Them', type: 'text', value: 'Premium add-on or unavailable' },

  { page: '/services', section: 'Compare Row 5', key: 'compare_5_lab', label: 'Row 5 Metric', type: 'text', value: 'Content written by industry experts' },
  { page: '/services', section: 'Compare Row 5', key: 'compare_5_us', label: 'Row 5 Us', type: 'text', value: 'Ex-journalists, in-house' },
  { page: '/services', section: 'Compare Row 5', key: 'compare_5_them', label: 'Row 5 Them', type: 'text', value: 'Offshored generalists' },

  { page: '/services', section: 'Compare Row 6', key: 'compare_6_lab', label: 'Row 6 Metric', type: 'text', value: 'You own all the work + access' },
  { page: '/services', section: 'Compare Row 6', key: 'compare_6_us', label: 'Row 6 Us', type: 'text', value: 'Always yours' },
  { page: '/services', section: 'Compare Row 6', key: 'compare_6_them', label: 'Row 6 Them', type: 'text', value: 'Proprietary tools you lose access to' },

  { page: '/insights', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Field notes from the search era.' },
  { page: '/insights', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Playbooks, teardowns, and deep dives on search, LLM optimization, and technical SEO from our senior practitioners.' },
  // ─── ABOUT PAGE: Timeline ───
  { page: '/about', section: 'Timeline', key: 'timeline_1_yr', label: 'Timeline 1 Year/Loc', type: 'text', value: '2014 · Melbourne' },
  { page: '/about', section: 'Timeline', key: 'timeline_1_title', label: 'Timeline 1 Title', type: 'text', value: 'Founded in a garage' },
  { page: '/about', section: 'Timeline', key: 'timeline_1_desc', label: 'Timeline 1 Text', type: 'textarea', value: 'Two ex-in-house SEOs and a shared frustration with how agencies were treating small businesses. First retainer signed: a local pottery studio for $400/month.' },
  { page: '/about', section: 'Timeline', key: 'timeline_2_yr', label: 'Timeline 2 Year/Loc', type: 'text', value: '2017 · 12 people' },
  { page: '/about', section: 'Timeline', key: 'timeline_2_title', label: 'Timeline 2 Title', type: 'text', value: 'First international client' },
  { page: '/about', section: 'Timeline', key: 'timeline_2_desc', label: 'Timeline 2 Text', type: 'textarea', value: "A Brooklyn coffee roaster found us through a blog post. We've worked together for 9 years and counting." },
  { page: '/about', section: 'Timeline', key: 'timeline_3_yr', label: 'Timeline 3 Year/Loc', type: 'text', value: '2019 · London office' },
  { page: '/about', section: 'Timeline', key: 'timeline_3_title', label: 'Timeline 3 Title', type: 'text', value: 'Second studio opens' },
  { page: '/about', section: 'Timeline', key: 'timeline_3_desc', label: 'Timeline 3 Text', type: 'textarea', value: 'Five seniors relocate. We start the practice of weekly cross-office shipping reviews — every account, every week, in front of the whole team.' },
  { page: '/about', section: 'Timeline', key: 'timeline_4_yr', label: 'Timeline 4 Year/Loc', type: 'text', value: '2022 · Bangalore' },
  { page: '/about', section: 'Timeline', key: 'timeline_4_title', label: 'Timeline 4 Title', type: 'text', value: 'Third studio, 24-hour delivery' },
  { page: '/about', section: 'Timeline', key: 'timeline_4_desc', label: 'Timeline 4 Text', type: 'textarea', value: 'Engineering and content production hub opens. Now every client gets work shipped while they sleep, every day.' },
  { page: '/about', section: 'Timeline', key: 'timeline_5_yr', label: 'Timeline 5 Year/Loc', type: 'text', value: '2023 · GPT-4 launches' },
  { page: '/about', section: 'Timeline', key: 'timeline_5_title', label: 'Timeline 5 Title', type: 'text', value: 'We pivot to AI Search early' },
  { page: '/about', section: 'Timeline', key: 'timeline_5_desc', label: 'Timeline 5 Text', type: 'textarea', value: "While most agencies are still arguing whether AI will affect search, we ship our first GEO audits. By 2025 it's a third of our revenue." },
  { page: '/about', section: 'Timeline', key: 'timeline_6_yr', label: 'Timeline 6 Year/Loc', type: 'text', value: '2026 · Today' },
  { page: '/about', section: 'Timeline', key: 'timeline_6_title', label: 'Timeline 6 Title', type: 'text', value: '38 people, 600+ clients, 1 mission' },
  { page: '/about', section: 'Timeline', key: 'timeline_6_desc', label: 'Timeline 6 Text', type: 'textarea', value: 'To make small businesses unmissable, even as the search world reinvents itself every six months.' },

  // ─── ABOUT PAGE: Press Stats ───
  { page: '/about', section: 'Press Stats', key: 'press_1_num', label: 'Stat 1 Num', type: 'text', value: '600+' },
  { page: '/about', section: 'Press Stats', key: 'press_1_lab', label: 'Stat 1 Label', type: 'text', value: 'Clients since 2014' },
  { page: '/about', section: 'Press Stats', key: 'press_2_num', label: 'Stat 2 Num', type: 'text', value: '42' },
  { page: '/about', section: 'Press Stats', key: 'press_2_lab', label: 'Stat 2 Label', type: 'text', value: 'Countries served' },
  { page: '/about', section: 'Press Stats', key: 'press_3_num', label: 'Stat 3 Num', type: 'text', value: '38' },
  { page: '/about', section: 'Press Stats', key: 'press_3_lab', label: 'Stat 3 Label', type: 'text', value: 'People on the team' },
  { page: '/about', section: 'Press Stats', key: 'press_4_num', label: 'Stat 4 Num', type: 'text', value: '3' },
  { page: '/about', section: 'Press Stats', key: 'press_4_lab', label: 'Stat 4 Label', type: 'text', value: 'Studios worldwide' },
  { page: '/about', section: 'Press Stats', key: 'press_5_num', label: 'Stat 5 Num', type: 'text', value: '94%' },
  { page: '/about', section: 'Press Stats', key: 'press_5_lab', label: 'Stat 5 Label', type: 'text', value: 'Annual retention rate' },
  { page: '/about', section: 'Press Stats', key: 'press_6_num', label: 'Stat 6 Num', type: 'text', value: '12yrs' },
  { page: '/about', section: 'Press Stats', key: 'press_6_lab', label: 'Stat 6 Label', type: 'text', value: 'Doing exactly this' },

  // ─── ABOUT PAGE: Team ───
  { page: '/about', section: 'Team', key: 'team_1_name', label: 'Team 1 Name', type: 'text', value: 'Anaya Sharma' },
  { page: '/about', section: 'Team', key: 'team_1_role', label: 'Team 1 Role', type: 'text', value: 'Founder & Head of Strategy · 14 yrs SEO' },
  { page: '/about', section: 'Team', key: 'team_1_badge', label: 'Team 1 Badge', type: 'text', value: 'Founder · Melbourne' },
  { page: '/about', section: 'Team', key: 'team_2_name', label: 'Team 2 Name', type: 'text', value: 'Daniel Whitford' },
  { page: '/about', section: 'Team', key: 'team_2_role', label: 'Team 2 Role', type: 'text', value: 'Co-Founder & Head of Engineering · 12 yrs technical SEO' },
  { page: '/about', section: 'Team', key: 'team_2_badge', label: 'Team 2 Badge', type: 'text', value: 'Co-Founder · Melbourne' },
  { page: '/about', section: 'Team', key: 'team_3_name', label: 'Team 3 Name', type: 'text', value: 'Marisol Acevedo' },
  { page: '/about', section: 'Team', key: 'team_3_role', label: 'Team 3 Role', type: 'text', value: 'Director, Editorial · ex-Condé Nast SEO' },
  { page: '/about', section: 'Team', key: 'team_3_badge', label: 'Team 3 Badge', type: 'text', value: 'London' },
  { page: '/about', section: 'Team', key: 'team_4_name', label: 'Team 4 Name', type: 'text', value: 'Rohan Iyer' },
  { page: '/about', section: 'Team', key: 'team_4_role', label: 'Team 4 Role', type: 'text', value: 'Director, Engineering · ex-Shopify Plus' },
  { page: '/about', section: 'Team', key: 'team_4_badge', label: 'Team 4 Badge', type: 'text', value: 'Bangalore' },
  { page: '/about', section: 'Team', key: 'team_5_name', label: 'Team 5 Name', type: 'text', value: 'Kemi Adeyemi' },
  { page: '/about', section: 'Team', key: 'team_5_role', label: 'Team 5 Role', type: 'text', value: 'Head of Digital PR · ex-Edelman' },
  { page: '/about', section: 'Team', key: 'team_5_badge', label: 'Team 5 Badge', type: 'text', value: 'London' },
  { page: '/about', section: 'Team', key: 'team_6_name', label: 'Team 6 Name', type: 'text', value: 'Tomás Beltrán' },
  { page: '/about', section: 'Team', key: 'team_6_role', label: 'Team 6 Role', type: 'text', value: 'Head of AI Search & GEO · ex-Google' },
  { page: '/about', section: 'Team', key: 'team_6_badge', label: 'Team 6 Badge', type: 'text', value: 'Melbourne' },
  { page: '/about', section: 'Team', key: 'team_7_name', label: 'Team 7 Name', type: 'text', value: 'Farah Khoury' },
  { page: '/about', section: 'Team', key: 'team_7_role', label: 'Team 7 Role', type: 'text', value: 'Lead Strategist, Local SEO · 9 yrs' },
  { page: '/about', section: 'Team', key: 'team_7_badge', label: 'Team 7 Badge', type: 'text', value: 'Bangalore' },
  { page: '/about', section: 'Team', key: 'team_8_name', label: 'Team 8 Name', type: 'text', value: '31 more strategists' },
  { page: '/about', section: 'Team', key: 'team_8_role', label: 'Team 8 Role', type: 'text', value: 'Across Melbourne, London, and Bangalore' },
  { page: '/about', section: 'Team', key: 'team_8_badge', label: 'Team 8 Badge', type: 'text', value: '31 more humans' },

  // ─── CONTACT PAGE: FAQ ───
  { page: '/contact', section: 'FAQ', key: 'faq_1_q', label: 'FAQ 1 Question', type: 'text', value: 'How fast will I hear back?' },
  { page: '/contact', section: 'FAQ', key: 'faq_1_a', label: 'FAQ 1 Answer', type: 'textarea', value: "Within 4 business hours, Mon–Fri. The reply will come from the strategist who'd actually lead your account, not an SDR. We sometimes batch over weekends." },
  { page: '/contact', section: 'FAQ', key: 'faq_2_q', label: 'FAQ 2 Question', type: 'text', value: 'Do I need to provide a brief?' },
  { page: '/contact', section: 'FAQ', key: 'faq_2_a', label: 'FAQ 2 Answer', type: 'textarea', value: "No. A few honest sentences in the form is plenty. Most useful info comes out of the discovery call, not a polished brief. We just need enough to know if we're the right fit before we book a call." },
  { page: '/contact', section: 'FAQ', key: 'faq_3_q', label: 'FAQ 3 Question', type: 'text', value: 'Is the audit really free?' },
  { page: '/contact', section: 'FAQ', key: 'faq_3_a', label: 'FAQ 3 Answer', type: 'textarea', value: "Yes — for businesses that look like a plausible fit. It's a real audit, written by a senior strategist, and it's yours to keep whether you hire us or not. Worth doing even if you have an in-house team." },
  { page: '/contact', section: 'FAQ', key: 'faq_4_q', label: 'FAQ 4 Question', type: 'text', value: "What if I'm a tiny business / pre-revenue?" },
  { page: '/contact', section: 'FAQ', key: 'faq_4_a', label: 'FAQ 4 Answer', type: 'textarea', value: "Tell us. If we can't help, we'll say so on the call and point you at someone who can — or just at the right DIY resources. We've sent dozens of businesses to better-fit partners. We won't take work we can't deliver on." },
  { page: '/contact', section: 'FAQ', key: 'faq_5_q', label: 'FAQ 5 Question', type: 'text', value: 'Can I just call?' },
  { page: '/contact', section: 'FAQ', key: 'faq_5_a', label: 'FAQ 5 Answer', type: 'textarea', value: "Of course. Numbers above. If we don't pick up, we're on a client call — leave a message and we'll ring back same business day." },

  // ─── CONTACT PAGE: Details ───
  { page: '/contact', section: 'Contact Info', key: 'direct_heading', label: 'Direct Heading', type: 'text', value: 'Or reach out directly.' },
  { page: '/contact', section: 'Contact Info', key: 'direct_sub', label: 'Direct Subtitle', type: 'text', value: 'The fastest way to get a real answer is the form on the left. But these go to humans, too.' },
  { page: '/contact', section: 'Contact Info', key: 'direct_email', label: 'Direct Email', type: 'text', value: 'hello@genranq.com' },
  { page: '/contact', section: 'Contact Info', key: 'direct_phone', label: 'Direct Phone', type: 'text', value: '+91 80 4567 4242' },
  { page: '/contact', section: 'Contact Info', key: 'next_eyebrow', label: 'Next steps eyebrow', type: 'text', value: 'What happens next' },
  { page: '/contact', section: 'Contact Info', key: 'next_step_1', label: 'Next Step 1', type: 'text', value: 'Within 4 hours — A senior strategist replies with 2-3 calendar slots.' },
  { page: '/contact', section: 'Contact Info', key: 'next_step_2', label: 'Next Step 2', type: 'text', value: '30-min discovery call — We listen first, ask sharp questions second.' },
  { page: '/contact', section: 'Contact Info', key: 'next_step_3', label: 'Next Step 3', type: 'text', value: 'Free audit (within 7 days) — A real, written audit. Useful even if you never hire us.' },
  { page: '/contact', section: 'Contact Info', key: 'next_step_4', label: 'Next Step 4', type: 'text', value: 'Proposal call — If it\'s a fit, we walk through scope & price together.' },

  // ─── CONTACT PAGE: Studio ───
  { page: '/contact', section: 'Studio', key: 'studio_heading', label: 'Studio Heading', type: 'text', value: 'Our studio.' },
  { page: '/contact', section: 'Studio', key: 'studio_subtext', label: 'Studio Subtext', type: 'textarea', value: "Based in India, working with businesses worldwide. Drop by or call — we'll buy the coffee." },
  { page: '/contact', section: 'Studio', key: 'studio_city', label: 'Studio City', type: 'text', value: 'Bangalore' },
  { page: '/contact', section: 'Studio', key: 'studio_country', label: 'Studio Country', type: 'text', value: 'India' },
  { page: '/contact', section: 'Studio', key: 'studio_address', label: 'Studio Address', type: 'textarea', value: '1st Floor, Indiqube Alpha\nOuter Ring Road, Bellandur\nBangalore 560103, India' },
  { page: '/contact', section: 'Studio', key: 'studio_ph', label: 'Studio Phone', type: 'text', value: '+91 80 4567 4242' },
  { page: '/contact', section: 'Studio', key: 'studio_hours', label: 'Studio Hours', type: 'text', value: 'Mon–Fri · 09:30–18:30 IST' },

  // ─── CONTACT PAGE: Email CTA ───
  { page: '/contact', section: 'Email CTA', key: 'email_cta_heading', label: 'Email CTA Heading', type: 'text', value: 'Or just email us.' },
  { page: '/contact', section: 'Email CTA', key: 'email_cta_subtext', label: 'Email CTA Subtext', type: 'textarea', value: "If forms aren't your thing, hello@genranq.com lands in the same inbox and gets the same reply. We don't mind." },

  // ─── /services/seo: Hero ───
  { page: '/services/seo', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'AI-Powered SEO Studio · Est. 2014' },
  { page: '/services/seo', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Search rankings driven by artificial intelligence.' },
  { page: '/services/seo', section: 'Hero', key: 'hero_subtext', label: 'Subtext', type: 'textarea', value: 'Gen Ranq combines deep SEO expertise with AI tools to grow your organic traffic, authority, and revenue — faster than traditional methods alone.' },
  { page: '/services/seo', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get a Free SEO Audit' },
  { page: '/services/seo', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See How It Works' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '412%' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. traffic growth' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: '600+' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'Brands grown' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '94%' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'Client retention' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '8.5×' },
  { page: '/services/seo', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'Avg. retainer ROI' },

  // ─── /services/seo: Contact Banner ───
  { page: '/services/seo', section: 'Contact Banner', key: 'contact_heading', label: 'Banner Heading', type: 'text', value: 'Get your free SEO audit today.' },
  { page: '/services/seo', section: 'Contact Banner', key: 'contact_desc', label: 'Banner Desc', type: 'textarea', value: '200+ checks. No obligation. Our team reviews your site and delivers a custom AI SEO growth plan within 48 hours.' },
  { page: '/services/seo', section: 'Contact Banner', key: 'contact_btn', label: 'Banner Button', type: 'text', value: 'Send My Free Audit Request' },

  // ─── /services/seo: Intro ───
  { page: '/services/seo', section: 'Intro', key: 'intro_eyebrow', label: 'Eyebrow', type: 'text', value: 'Artificial Intelligence SEO' },
  { page: '/services/seo', section: 'Intro', key: 'intro_heading', label: 'Heading', type: 'text', value: 'AI SEO Services built for the modern search landscape.' },
  { page: '/services/seo', section: 'Intro', key: 'intro_p1', label: 'Paragraph 1', type: 'textarea', value: 'Over the past few years, one force has reshaped every business landscape — artificial intelligence. The kind of AI-driven applications emerging in SEO and digital marketing are unprecedented.' },
  { page: '/services/seo', section: 'Intro', key: 'intro_p2', label: 'Paragraph 2', type: 'textarea', value: "When Google's AI Overviews, ChatGPT citations, and Perplexity search changed the rules, we were ready. Gen Ranq deploys proven AI-powered tools and strategies to put your brand in front of buyers — not just browsers." },
  { page: '/services/seo', section: 'Intro', key: 'intro_p3', label: 'Paragraph 3', type: 'textarea', value: 'If you want to stay ahead by investing in emerging technologies and revolutionary strategies, it is time to look at AI SEO.' },
  { page: '/services/seo', section: 'Intro', key: 'intro_cta', label: 'CTA Link', type: 'text', value: 'See our AI SEO process →' },

  // ─── /services/seo: Process ───
  { page: '/services/seo', section: 'Process', key: 'proc_eyebrow', label: 'Eyebrow', type: 'text', value: 'Our Method' },
  { page: '/services/seo', section: 'Process', key: 'proc_heading', label: 'Heading', type: 'text', value: "Gen Ranq's AI SEO Process" },
  { page: '/services/seo', section: 'Process', key: 'proc_sub', label: 'Subtext', type: 'textarea', value: 'Our AI-driven SEO process is well-defined, structured in industry best practices, and tailored to the unique needs of each client.' },
  { page: '/services/seo', section: 'Process', key: 'proc_1_title', label: 'Step 1 Title', type: 'text', value: 'Understanding Your Business' },
  { page: '/services/seo', section: 'Process', key: 'proc_1_desc', label: 'Step 1 Desc', type: 'textarea', value: 'We begin by gaining a clear understanding of your business, industry, and objectives to ensure the strategy aligns with your growth goals.' },
  { page: '/services/seo', section: 'Process', key: 'proc_2_title', label: 'Step 2 Title', type: 'text', value: 'AI-Powered Audits & Keyword Research' },
  { page: '/services/seo', section: 'Process', key: 'proc_2_desc', label: 'Step 2 Desc', type: 'textarea', value: 'AI tools conduct detailed audits of your website and perform keyword research, identifying key opportunities for improvement and growth.' },
  { page: '/services/seo', section: 'Process', key: 'proc_3_title', label: 'Step 3 Title', type: 'text', value: 'Personalised Content & SEO Recommendations' },
  { page: '/services/seo', section: 'Process', key: 'proc_3_desc', label: 'Step 3 Desc', type: 'textarea', value: 'Based on findings, we develop tailored content strategies and provide SEO recommendations to enhance both content and site performance.' },
  { page: '/services/seo', section: 'Process', key: 'proc_4_title', label: 'Step 4 Title', type: 'text', value: 'LLM Optimisation' },
  { page: '/services/seo', section: 'Process', key: 'proc_4_desc', label: 'Step 4 Desc', type: 'textarea', value: 'We research and optimise your brand to boost visibility in LLM searches — ChatGPT, Gemini, Perplexity — driving higher discoverability across AI platforms.' },
  { page: '/services/seo', section: 'Process', key: 'proc_5_title', label: 'Step 5 Title', type: 'text', value: 'Continuous Monitoring & Optimisation' },
  { page: '/services/seo', section: 'Process', key: 'proc_5_desc', label: 'Step 5 Desc', type: 'textarea', value: 'The strategy is regularly monitored using AI tools, ensuring it remains effective and adapts to industry changes and algorithm updates.' },
  { page: '/services/seo', section: 'Process', key: 'proc_6_title', label: 'Step 6 Title', type: 'text', value: 'Measuring ROI & Refining the Strategy' },
  { page: '/services/seo', section: 'Process', key: 'proc_6_desc', label: 'Step 6 Desc', type: 'textarea', value: 'We track your performance and refine the strategy as necessary, optimising results and achieving business goals systematically.' },

  // ─── /services/seo: Why Us ───
  { page: '/services/seo', section: 'Why Us', key: 'whyus_eyebrow', label: 'Eyebrow', type: 'text', value: 'Why Gen Ranq' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_heading', label: 'Heading', type: 'text', value: 'World-class AI SEO. Real competitive advantage.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_sub', label: 'Subtext', type: 'textarea', value: 'Gen Ranq is a natural choice for ambitious brands looking for an AI marketing partner that manages the complexity of modern search without compromising on performance or precision.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_1_title', label: 'Card 1 Title', type: 'text', value: 'Genuine Enterprise Capabilities' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'We have built in-house AI capabilities that allow us to work on websites with thousands of pages and scale up our efforts as your business grows.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_2_title', label: 'Card 2 Title', type: 'text', value: 'Expertise Across the Entire Search Landscape' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'From technical SEO to video, local, e-commerce, and AI search optimisation — our team covers the full spectrum to deliver the best growth for your business.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_3_title', label: 'Card 3 Title', type: 'text', value: 'Portfolio of Marquee Brands' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'Our client portfolio includes some of the leading brands across industries including Healthcare, Finance, E-commerce, Education, and more.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_4_title', label: 'Card 4 Title', type: 'text', value: '38-Person Specialist Studio' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_4_desc', label: 'Card 4 Desc', type: 'textarea', value: 'Our global team across Melbourne, London, and Bangalore works exclusively on SEO and AI search — not as a side offering within a generalist agency.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_5_title', label: 'Card 5 Title', type: 'text', value: '10+ Years of Search Expertise' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_5_desc', label: 'Card 5 Desc', type: 'textarea', value: 'Founded in 2014, we have guided 600+ brands through every major search algorithm shift — from Panda and Penguin to AI Overviews and GEO.' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_6_title', label: 'Card 6 Title', type: 'text', value: 'Data-Driven, No Long Contracts' },
  { page: '/services/seo', section: 'Why Us', key: 'whyus_6_desc', label: 'Card 6 Desc', type: 'textarea', value: 'Monthly retainers with full transparency. We earn your business every month with measurable results — 8.5× average return on retainer spend.' },

  // ─── /services/seo: AI Advantages ───
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_eyebrow', label: 'Eyebrow', type: 'text', value: 'AI Advantage' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_heading', label: 'Heading', type: 'text', value: 'AI makes SEO faster and more effective.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_sub', label: 'Subtext', type: 'textarea', value: 'AI SEO services bring measurable advantages over traditional methods — here is what you gain when you partner with Gen Ranq.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_1_title', label: 'Card 1 Title', type: 'text', value: 'Accelerated Keyword Research' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'AI quickly identifies the best keyword opportunities, streamlining the research process and improving accuracy well beyond manual analysis.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_2_title', label: 'Card 2 Title', type: 'text', value: 'Optimised Content Recommendations' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'AI enhances content relevance and structure, making it more engaging for both users and search engines — including AI answer engines.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_3_title', label: 'Card 3 Title', type: 'text', value: 'Trend Prediction for SEO' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'AI helps your business stay ahead by forecasting SEO and search trends before they peak — so you capture traffic before competitors react.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_4_title', label: 'Card 4 Title', type: 'text', value: 'Continuous SEO Optimisation' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_4_desc', label: 'Card 4 Desc', type: 'textarea', value: 'AI monitors and adjusts your SEO performance in real time, enabling ongoing improvements without waiting for quarterly reviews.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_5_title', label: 'Card 5 Title', type: 'text', value: 'Scalable & Cost-Effective SEO' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_5_desc', label: 'Card 5 Desc', type: 'textarea', value: 'AI automates many SEO tasks, making it easier to scale your efforts while reducing per-unit cost — ideal for multi-location and enterprise brands.' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_6_title', label: 'Card 6 Title', type: 'text', value: 'GEO & LLM Visibility' },
  { page: '/services/seo', section: 'AI Advantages', key: 'adv_6_desc', label: 'Card 6 Desc', type: 'textarea', value: 'We optimise your brand to appear in ChatGPT, Google AI Overviews, Gemini, and Perplexity — the new frontier of AI-powered search.' },

  // ─── /services/seo: Rules ───
  { page: '/services/seo', section: 'Rules', key: 'rules_heading', label: 'Heading', type: 'text', value: 'The rules have changed.' },
  { page: '/services/seo', section: 'Rules', key: 'rules_sub', label: 'Subtext', type: 'textarea', value: "SEO in 2026 looks nothing like it did three years ago. Here's what's shifted — and why AI-first optimisation is now non-negotiable." },
  { page: '/services/seo', section: 'Rules', key: 'old_1', label: 'Old Rule 1', type: 'text', value: 'Ranking in Google was the only game' },
  { page: '/services/seo', section: 'Rules', key: 'new_1', label: 'New Rule 1', type: 'text', value: 'Being retrieved, cited, and trusted across Google and AI' },
  { page: '/services/seo', section: 'Rules', key: 'old_2', label: 'Old Rule 2', type: 'text', value: 'Keyword stuffing' },
  { page: '/services/seo', section: 'Rules', key: 'new_2', label: 'New Rule 2', type: 'text', value: "Content meets Google's E-E-A-T criteria" },
  { page: '/services/seo', section: 'Rules', key: 'old_3', label: 'Old Rule 3', type: 'text', value: 'Every link counted (quantity over quality)' },
  { page: '/services/seo', section: 'Rules', key: 'new_3', label: 'New Rule 3', type: 'text', value: 'GEO — cited in ChatGPT, Gemini, Perplexity' },
  { page: '/services/seo', section: 'Rules', key: 'old_4', label: 'Old Rule 4', type: 'text', value: 'Optimised mainly for bots' },
  { page: '/services/seo', section: 'Rules', key: 'new_4', label: 'New Rule 4', type: 'text', value: 'AEO — appear in AI answers and voice search' },
  { page: '/services/seo', section: 'Rules', key: 'old_5', label: 'Old Rule 5', type: 'text', value: 'Quick traffic hacks' },
  { page: '/services/seo', section: 'Rules', key: 'new_5', label: 'New Rule 5', type: 'text', value: 'AIO — structure content for AI workflows' },
  { page: '/services/seo', section: 'Rules', key: 'old_6', label: 'Old Rule 6', type: 'text', value: 'Gaming algorithms' },
  { page: '/services/seo', section: 'Rules', key: 'new_6', label: 'New Rule 6', type: 'text', value: 'SXO — align content with UX and conversions' },
  { page: '/services/seo', section: 'Rules', key: 'old_7', label: 'Old Rule 7', type: 'text', value: 'Clicks equal victory' },
  { page: '/services/seo', section: 'Rules', key: 'new_7', label: 'New Rule 7', type: 'text', value: 'Long-term authority building' },
  { page: '/services/seo', section: 'Rules', key: 'old_8', label: 'Old Rule 8', type: 'text', value: 'Page-one rankings were the goal' },
  { page: '/services/seo', section: 'Rules', key: 'new_8', label: 'New Rule 8', type: 'text', value: 'Visibility across Google, AI, and voice' },

  // ─── /services/seo: Sub-Services ───
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_eyebrow', label: 'Eyebrow', type: 'text', value: 'Our SEO Services' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_heading', label: 'Heading', type: 'text', value: 'Full-spectrum search optimisation.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_sub', label: 'Subtext', type: 'textarea', value: 'The following SEO services from Gen Ranq help businesses rank higher, get cited more, and reach buyers across every modern search platform.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_1_title', label: 'Service 1 Title', type: 'text', value: 'Technical SEO' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_1_desc', label: 'Service 1 Desc', type: 'textarea', value: 'We fix crawl issues, indexation gaps, rendering problems, and Core Web Vitals — the foundation everything else is built on.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_2_title', label: 'Service 2 Title', type: 'text', value: 'Local SEO' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_2_desc', label: 'Service 2 Desc', type: 'textarea', value: 'Multi-location SEO systems that dominate the 3-pack. From single storefronts to 200+ locations.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_3_title', label: 'Service 3 Title', type: 'text', value: 'E-commerce SEO' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_3_desc', label: 'Service 3 Desc', type: 'textarea', value: 'Product schema, faceted navigation, category architecture, and inventory-aware indexation for online stores.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_4_title', label: 'Service 4 Title', type: 'text', value: 'Enterprise SEO' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_4_desc', label: 'Service 4 Desc', type: 'textarea', value: 'Cross-functional roadmapping, migration planning, and programmatic page generation for large organizations.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_5_title', label: 'Service 5 Title', type: 'text', value: 'SEO Audits' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_5_desc', label: 'Service 5 Desc', type: 'textarea', value: 'A forensic 60-90 page audit covering every dimension of your search presence. No retainer required.' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_6_title', label: 'Service 6 Title', type: 'text', value: 'AI Search & GEO' },
  { page: '/services/seo', section: 'Sub-Services', key: 'svc_6_desc', label: 'Service 6 Desc', type: 'textarea', value: 'Optimize your brand to be cited in ChatGPT, Gemini, Perplexity, and Google AI Overviews.' },

  // ─── /services/seo: Industries ───
  { page: '/services/seo', section: 'Industries', key: 'ind_eyebrow', label: 'Eyebrow', type: 'text', value: 'Industries We Work With' },
  { page: '/services/seo', section: 'Industries', key: 'ind_heading', label: 'Heading', type: 'text', value: 'Gen Ranq delivers tailored SEO for businesses just like yours.' },
  { page: '/services/seo', section: 'Industries', key: 'ind_sub', label: 'Subtext', type: 'textarea', value: "We work with clients from over 300 different industries. Here are just some of the sectors we serve — if yours isn't listed, get in touch." },
  { page: '/services/seo', section: 'Industries', key: 'ind_1', label: 'Industry 1', type: 'text', value: 'Accountants SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_2', label: 'Industry 2', type: 'text', value: 'Construction SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_3', label: 'Industry 3', type: 'text', value: 'E-commerce SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_4', label: 'Industry 4', type: 'text', value: 'Healthcare SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_5', label: 'Industry 5', type: 'text', value: 'Real Estate SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_6', label: 'Industry 6', type: 'text', value: 'Legal & Law Firm SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_7', label: 'Industry 7', type: 'text', value: 'Restaurant & Hospitality SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_8', label: 'Industry 8', type: 'text', value: 'Education SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_9', label: 'Industry 9', type: 'text', value: 'HVAC & Trade SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_10', label: 'Industry 10', type: 'text', value: 'Financial Services SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_11', label: 'Industry 11', type: 'text', value: 'Hotel & Accommodation SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_12', label: 'Industry 12', type: 'text', value: 'Automotive SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_13', label: 'Industry 13', type: 'text', value: 'Doctors & Medical SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_14', label: 'Industry 14', type: 'text', value: 'Security Companies SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_15', label: 'Industry 15', type: 'text', value: 'Fitness & Wellness SEO' },
  { page: '/services/seo', section: 'Industries', key: 'ind_16', label: 'Industry 16', type: 'text', value: 'Logistics & Freight SEO' },

  // ─── /services/seo: Testimonials ───
  { page: '/services/seo', section: 'Testimonials', key: 'testi_eyebrow', label: 'Eyebrow', type: 'text', value: 'Client Testimonials' },
  { page: '/services/seo', section: 'Testimonials', key: 'testi_heading', label: 'Heading', type: 'text', value: 'What our clients say about Gen Ranq.' },
  { page: '/services/seo', section: 'Testimonials', key: 'testi_sub', label: 'Subtext', type: 'textarea', value: "With hundreds of 5-star reviews, Gen Ranq can create a tailored plan to meet your company's online marketing goals — and deliver on it." },
  { page: '/services/seo', section: 'Testimonials', key: 'testi_count', label: 'Review Count', type: 'text', value: '480 Google Reviews' },
  { page: '/services/seo', section: 'Testimonials', key: 'testi_score', label: 'Review Score', type: 'text', value: '4.9' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_1_name', label: 'Review 1 Name', type: 'text', value: 'Nazir Mohammadi' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_1_time', label: 'Review 1 Time', type: 'text', value: '7 months ago' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_1_text', label: 'Review 1 Text', type: 'textarea', value: 'Extremely reliable and super friendly staff. The team helped us with our digital strategy. Would recommend to everyone who wants to get their SEO done properly.' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_2_name', label: 'Review 2 Name', type: 'text', value: "Hunter D'Angelis" },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_2_time', label: 'Review 2 Time', type: 'text', value: '10 months ago' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_2_text', label: 'Review 2 Text', type: 'textarea', value: 'The Gen Ranq team have been incredible to work with. From the very beginning they crafted a clear SEO strategy and have delivered measurable results month after month.' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_3_name', label: 'Review 3 Name', type: 'text', value: 'Sarah Mitchell' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_3_time', label: 'Review 3 Time', type: 'text', value: '3 months ago' },
  { page: '/services/seo', section: 'Testimonials', key: 'rev_3_text', label: 'Review 3 Text', type: 'textarea', value: "Our organic traffic grew by 280% in the first 90 days. The AI SEO approach is genuinely different — we're now appearing in ChatGPT and Google AI Overviews too." },

  // ─── /services/seo: FAQs ───
  { page: '/services/seo', section: 'FAQ', key: 'faq_1_q', label: 'FAQ 1 Question', type: 'text', value: 'How long does SEO take to show results?' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_1_a', label: 'FAQ 1 Answer', type: 'textarea', value: 'Most clients see measurable ranking improvements within 90 days. Significant traffic growth typically occurs between months 4-6. The timeline depends on your starting position, competition level, and the technical health of your site.' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_2_q', label: 'FAQ 2 Question', type: 'text', value: 'What makes your SEO different from other agencies?' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_2_a', label: 'FAQ 2 Answer', type: 'textarea', value: 'Three things: we only do SEO (no distractions), every client works with a senior strategist (not an account manager), and we include AI search optimization as standard in every retainer.' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_3_q', label: 'FAQ 3 Question', type: 'text', value: 'Do you require long-term contracts?' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_3_a', label: 'FAQ 3 Answer', type: 'textarea', value: 'We ask for a 90-day onboarding commitment because SEO needs time to work. After that, we are month-to-month. We keep clients by delivering results, not by locking them in.' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_4_q', label: 'FAQ 4 Question', type: 'text', value: 'Can you work with our in-house team?' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_4_a', label: 'FAQ 4 Answer', type: 'textarea', value: 'Yes. Many of our enterprise clients have internal SEO teams. We function as a strategic extension, handling the work your team does not have bandwidth or specialization for.' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_5_q', label: 'FAQ 5 Question', type: 'text', value: 'What is included in a free SEO audit?' },
  { page: '/services/seo', section: 'FAQ', key: 'faq_5_a', label: 'FAQ 5 Answer', type: 'textarea', value: 'A 200+ point technical crawl, Core Web Vitals check, content gap analysis, backlink profile overview, and AI search readiness score — delivered with a 30-minute strategy call.' },

  // ─── /services/seo: Topbar ───
  { page: '/services/seo', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Free SEO audit · 200+ checks · No obligation.' },
  { page: '/services/seo', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link Text', type: 'text', value: 'Book →' },
  { page: '/services/seo', section: 'Topbar', key: 'topbar_cta', label: 'Bottom CTA Text', type: 'text', value: 'Book Your Free Audit' },



  // ─── /services/ai-search: Topbar ───
  { page: '/services/ai-search', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'AI Search is here. Is your brand visible?' },
  { page: '/services/ai-search', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Free AI audit →' },

  // ─── /services/ai-search: Hero ───
  { page: '/services/ai-search', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'AI Search & GEO' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Get cited in the answers people trust.' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_desc', label: 'Description', type: 'textarea', value: 'ChatGPT, Gemini, Perplexity, and Google AI Overviews are replacing the blue links. We make sure your brand shows up when AI answers the questions your customers ask.' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get a free AI audit' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See all AI services' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '340%' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. brand mention increase' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: '4' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'AI platforms optimized' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '120' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'Days to measurable results' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '93%' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'Positive citation sentiment' },

  // ─── /services/ai-search: Services Section ───
  { page: '/services/ai-search', section: 'Services', key: 'sec_heading', label: 'Section Heading', type: 'text', value: 'Four AI platforms, one strategy.' },
  { page: '/services/ai-search', section: 'Services', key: 'sec_sub', label: 'Section Subtext', type: 'textarea', value: 'We optimize your visibility across every AI search platform that matters today.' },

  // ─── /services/ai-search: Service Cards ───
  { page: '/services/ai-search', section: 'Card 1', key: 'card_1_title', label: 'Card 1 Title', type: 'text', value: 'ChatGPT Optimization' },
  { page: '/services/ai-search', section: 'Card 1', key: 'card_1_tagline', label: 'Card 1 Tagline', type: 'text', value: 'Be the brand ChatGPT recommends.' },
  { page: '/services/ai-search', section: 'Card 1', key: 'card_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'We engineer the conditions that make ChatGPT cite your brand consistently across millions of daily search queries.' },
  { page: '/services/ai-search', section: 'Card 1', key: 'card_1_highlights', label: 'Card 1 Highlights (comma sep)', type: 'textarea', value: 'Entity optimization, Citation tracking, LLM content engineering, Competitor displacement' },
  { page: '/services/ai-search', section: 'Card 1', key: 'card_1_result', label: 'Card 1 Result', type: 'text', value: '340% avg. brand mention increase' },
  { page: '/services/ai-search', section: 'Card 2', key: 'card_2_title', label: 'Card 2 Title', type: 'text', value: 'Google AI Overviews' },
  { page: '/services/ai-search', section: 'Card 2', key: 'card_2_tagline', label: 'Card 2 Tagline', type: 'text', value: 'Get featured above the blue links.' },
  { page: '/services/ai-search', section: 'Card 2', key: 'card_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'AI Overviews appear on 40%+ of queries. We optimize your content specifically for AIO inclusion and citation.' },
  { page: '/services/ai-search', section: 'Card 2', key: 'card_2_highlights', label: 'Card 2 Highlights (comma sep)', type: 'textarea', value: 'Trigger query mapping, AIO content formatting, E-E-A-T signals, Weekly tracking' },
  { page: '/services/ai-search', section: 'Card 2', key: 'card_2_result', label: 'Card 2 Result', type: 'text', value: '12 new AIO citations per month (avg)' },
  { page: '/services/ai-search', section: 'Card 3', key: 'card_3_title', label: 'Card 3 Title', type: 'text', value: 'Gemini Optimization' },
  { page: '/services/ai-search', section: 'Card 3', key: 'card_3_tagline', label: 'Card 3 Tagline', type: 'text', value: 'Own the Google AI ecosystem.' },
  { page: '/services/ai-search', section: 'Card 3', key: 'card_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'Gemini powers Google Search AI, Android assistants, and enterprise tools. We ensure your brand is a recognized entity.' },
  { page: '/services/ai-search', section: 'Card 3', key: 'card_3_highlights', label: 'Card 3 Highlights (comma sep)', type: 'textarea', value: 'Knowledge Panel, Entity recognition, Cross-platform testing, Schema alignment' },
  { page: '/services/ai-search', section: 'Card 3', key: 'card_3_result', label: 'Card 3 Result', type: 'text', value: '85% Knowledge Panel activation rate' },
  { page: '/services/ai-search', section: 'Card 4', key: 'card_4_title', label: 'Card 4 Title', type: 'text', value: 'Perplexity SEO' },
  { page: '/services/ai-search', section: 'Card 4', key: 'card_4_tagline', label: 'Card 4 Tagline', type: 'text', value: 'Be the source Perplexity cites.' },
  { page: '/services/ai-search', section: 'Card 4', key: 'card_4_desc', label: 'Card 4 Desc', type: 'textarea', value: 'Perplexity always cites sources. We optimize your content library to be its preferred source for your industry.' },
  { page: '/services/ai-search', section: 'Card 4', key: 'card_4_highlights', label: 'Card 4 Highlights (comma sep)', type: 'textarea', value: 'Source authority audit, Data-first content, Citation tracking, Competitive benchmarks' },
  { page: '/services/ai-search', section: 'Card 4', key: 'card_4_result', label: 'Card 4 Result', type: 'text', value: '25+ citations per month (top clients)' },

  // ─── /services/ai-search: FAQs ───
  { page: '/services/ai-search', section: 'FAQ', key: 'faq_1_q', label: 'FAQ 1 Question', type: 'text', value: 'What is Generative Engine Optimization (GEO)?' },
  { page: '/services/ai-search', section: 'FAQ', key: 'faq_1_a', label: 'FAQ 1 Answer', type: 'textarea', value: 'GEO is the practice of optimizing your brand and content to be cited by AI-powered search engines like ChatGPT, Gemini, Perplexity, and Google AI Overviews. It is the natural evolution of SEO for the AI era.' },
  { page: '/services/ai-search', section: 'FAQ', key: 'faq_2_q', label: 'FAQ 2 Question', type: 'text', value: 'Does AI search replace traditional SEO?' },
  { page: '/services/ai-search', section: 'FAQ', key: 'faq_2_a', label: 'FAQ 2 Answer', type: 'textarea', value: 'No. AI search builds on top of traditional SEO. Strong technical foundations, authoritative content, and quality backlinks are still the signals these AI systems use to determine trustworthiness.' },
  { page: '/services/ai-search', section: 'FAQ', key: 'faq_3_q', label: 'FAQ 3 Question', type: 'text', value: 'Can you guarantee AI citations?' },
  { page: '/services/ai-search', section: 'FAQ', key: 'faq_3_a', label: 'FAQ 3 Answer', type: 'textarea', value: 'No honest agency can guarantee specific AI outputs. What we guarantee is a systematic, data-driven approach that has produced measurable results for every client we have served.' },

  // ─── /services/ai-search: Bottom CTA ───
  { page: '/services/ai-search', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Free AI search audit.' },
  { page: '/services/ai-search', section: 'Bottom CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'See where you stand.' },
  { page: '/services/ai-search', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'We will test your brand across ChatGPT, Gemini, and Perplexity with 50+ industry prompts. Free. No obligation.' },
  { page: '/services/ai-search', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your AI audit' },

  // ─── /services/content-marketing: Topbar ───
  { page: '/services/content-marketing', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Content that ranks and converts. Free audit.' },
  { page: '/services/content-marketing', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Book →' },

  // ─── /services/content-marketing: Hero ───
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'Content Marketing' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Content that earns links, trust, and traffic.' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_desc', label: 'Description', type: 'textarea', value: 'Strategic editorial content built for search, social, and AI visibility. Written by humans who know your industry.' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get a content audit' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See all services' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '4.2x' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. traffic increase from content' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: '180%' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'Avg. session increase in 6 months' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '35%' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'Avg. conversion rate lift' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '42x' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'Avg. email marketing ROI' },

  // ─── /services/content-marketing: Services Section ───
  { page: '/services/content-marketing', section: 'Services', key: 'sec_heading', label: 'Section Heading', type: 'text', value: 'Four content disciplines, one voice.' },
  { page: '/services/content-marketing', section: 'Services', key: 'sec_sub', label: 'Section Subtext', type: 'textarea', value: 'From SEO articles to email sequences, every word serves your growth strategy.' },

  // ─── /services/content-marketing: Service Cards ───
  { page: '/services/content-marketing', section: 'Card 1', key: 'card_1_title', label: 'Card 1 Title', type: 'text', value: 'SEO Content Writing' },
  { page: '/services/content-marketing', section: 'Card 1', key: 'card_1_tagline', label: 'Card 1 Tagline', type: 'text', value: 'Content that ranks and converts.' },
  { page: '/services/content-marketing', section: 'Card 1', key: 'card_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'Long-form, answer-first articles written by ex-journalists. Built to rank, satisfy intent, and drive action.' },
  { page: '/services/content-marketing', section: 'Card 1', key: 'card_1_highlights', label: 'Card 1 Highlights (comma sep)', type: 'textarea', value: 'SERP-targeted briefs, Human-written, Clearscope scoring, Snippet optimization' },
  { page: '/services/content-marketing', section: 'Card 1', key: 'card_1_result', label: 'Card 1 Result', type: 'text', value: '4.2x avg. traffic increase from content' },
  { page: '/services/content-marketing', section: 'Card 2', key: 'card_2_title', label: 'Card 2 Title', type: 'text', value: 'Blog Management' },
  { page: '/services/content-marketing', section: 'Card 2', key: 'card_2_tagline', label: 'Card 2 Tagline', type: 'text', value: 'A fully managed editorial operation.' },
  { page: '/services/content-marketing', section: 'Card 2', key: 'card_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'We handle calendars, writers, publishing, and performance tracking so you can focus on your business.' },
  { page: '/services/content-marketing', section: 'Card 2', key: 'card_2_highlights', label: 'Card 2 Highlights (comma sep)', type: 'textarea', value: 'Editorial calendars, Writer management, CMS publishing, Performance tracking' },
  { page: '/services/content-marketing', section: 'Card 2', key: 'card_2_result', label: 'Card 2 Result', type: 'text', value: '180% avg. session increase in 6 months' },
  { page: '/services/content-marketing', section: 'Card 3', key: 'card_3_title', label: 'Card 3 Title', type: 'text', value: 'Copywriting' },
  { page: '/services/content-marketing', section: 'Card 3', key: 'card_3_tagline', label: 'Card 3 Tagline', type: 'text', value: 'Words that move people to act.' },
  { page: '/services/content-marketing', section: 'Card 3', key: 'card_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'Conversion-focused copy for landing pages, product descriptions, emails, and ad campaigns.' },
  { page: '/services/content-marketing', section: 'Card 3', key: 'card_3_highlights', label: 'Card 3 Highlights (comma sep)', type: 'textarea', value: 'Landing page copy, Product descriptions, Email sequences, A/B test variants' },
  { page: '/services/content-marketing', section: 'Card 3', key: 'card_3_result', label: 'Card 3 Result', type: 'text', value: '35% avg. conversion rate lift' },
  { page: '/services/content-marketing', section: 'Card 4', key: 'card_4_title', label: 'Card 4 Title', type: 'text', value: 'Email Marketing' },
  { page: '/services/content-marketing', section: 'Card 4', key: 'card_4_tagline', label: 'Card 4 Tagline', type: 'text', value: 'The highest-ROI channel, done right.' },
  { page: '/services/content-marketing', section: 'Card 4', key: 'card_4_desc', label: 'Card 4 Desc', type: 'textarea', value: 'Lifecycle email strategy from welcome sequences to win-back campaigns, fully managed and continuously optimized.' },
  { page: '/services/content-marketing', section: 'Card 4', key: 'card_4_highlights', label: 'Card 4 Highlights (comma sep)', type: 'textarea', value: 'Automated sequences, Segmentation, A/B testing, Revenue attribution' },
  { page: '/services/content-marketing', section: 'Card 4', key: 'card_4_result', label: 'Card 4 Result', type: 'text', value: '42x avg. ROI on email marketing' },

  // ─── /services/content-marketing: Bottom CTA ───
  { page: '/services/content-marketing', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Free content audit.' },
  { page: '/services/content-marketing', section: 'Bottom CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'Find the gaps.' },
  { page: '/services/content-marketing', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'We will analyze your existing content and show you the top 10 opportunities to grow organic traffic this quarter.' },
  { page: '/services/content-marketing', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your content audit' },

  // ─── /services/link-building: Topbar ───
  { page: '/services/link-building', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Links from sites your customers read.' },
  { page: '/services/link-building', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Free audit →' },

  // ─── /services/link-building: Hero ───
  { page: '/services/link-building', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'Link Building & Digital PR' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Links that move the needle.' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_desc', label: 'Description', type: 'textarea', value: 'White-hat authority building through digital PR, guest content, and strategic outreach. Every link is editorial, relevant, and permanent.' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get a link audit' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See all services' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '15' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. placements per campaign' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: 'DR 55+' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'Avg. placement quality' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '20' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'New referring domains per month' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '0' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'PBN or link farm links ever' },

  // ─── /services/link-building: Services Section ───
  { page: '/services/link-building', section: 'Services', key: 'sec_heading', label: 'Section Heading', type: 'text', value: 'Three approaches, zero shortcuts.' },
  { page: '/services/link-building', section: 'Services', key: 'sec_sub', label: 'Section Subtext', type: 'textarea', value: 'Every link we build is editorial, relevant, and will still be live in five years.' },

  // ─── /services/link-building: Service Cards ───
  { page: '/services/link-building', section: 'Card 1', key: 'card_1_title', label: 'Card 1 Title', type: 'text', value: 'Digital PR' },
  { page: '/services/link-building', section: 'Card 1', key: 'card_1_tagline', label: 'Card 1 Tagline', type: 'text', value: 'Coverage that builds authority.' },
  { page: '/services/link-building', section: 'Card 1', key: 'card_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'Data-driven PR campaigns that generate editorial coverage, high-authority backlinks, and brand awareness simultaneously.' },
  { page: '/services/link-building', section: 'Card 1', key: 'card_1_highlights', label: 'Card 1 Highlights (comma sep)', type: 'textarea', value: 'Data-driven campaigns, Journalist outreach, Original research, Coverage tracking' },
  { page: '/services/link-building', section: 'Card 1', key: 'card_1_result', label: 'Card 1 Result', type: 'text', value: '15 avg. placements per campaign' },
  { page: '/services/link-building', section: 'Card 2', key: 'card_2_title', label: 'Card 2 Title', type: 'text', value: 'Guest Posting' },
  { page: '/services/link-building', section: 'Card 2', key: 'card_2_tagline', label: 'Card 2 Tagline', type: 'text', value: 'Strategic, editorial placements.' },
  { page: '/services/link-building', section: 'Card 2', key: 'card_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'Guest content placement on authoritative sites in your industry. Every placement is editorial, relevant, and permanent.' },
  { page: '/services/link-building', section: 'Card 2', key: 'card_2_highlights', label: 'Card 2 Highlights (comma sep)', type: 'textarea', value: 'Authority sites only, Expert writers, Anchor strategy, No PBNs ever' },
  { page: '/services/link-building', section: 'Card 2', key: 'card_2_result', label: 'Card 2 Result', type: 'text', value: 'DR 55+ avg. placement quality' },
  { page: '/services/link-building', section: 'Card 3', key: 'card_3_title', label: 'Card 3 Title', type: 'text', value: 'Outreach Campaigns' },
  { page: '/services/link-building', section: 'Card 3', key: 'card_3_tagline', label: 'Card 3 Tagline', type: 'text', value: 'Earn links others cannot.' },
  { page: '/services/link-building', section: 'Card 3', key: 'card_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'Broken link building, unlinked mention reclamation, resource page placement, and strategic partnerships.' },
  { page: '/services/link-building', section: 'Card 3', key: 'card_3_highlights', label: 'Card 3 Highlights (comma sep)', type: 'textarea', value: 'Broken link building, Mention reclamation, Resource pages, Toxic link cleanup' },
  { page: '/services/link-building', section: 'Card 3', key: 'card_3_result', label: 'Card 3 Result', type: 'text', value: '20 new referring domains per month' },

  // ─── /services/link-building: Bottom CTA ───
  { page: '/services/link-building', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Free link audit.' },
  { page: '/services/link-building', section: 'Bottom CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'See your profile.' },
  { page: '/services/link-building', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'We will audit your backlink profile and show you exactly where your competitors are earning links you are missing.' },
  { page: '/services/link-building', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your link audit' },

  // ─── /services/ppc: Topbar ───
  { page: '/services/ppc', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Maximize your ad spend. Free PPC audit available.' },
  { page: '/services/ppc', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Book →' },

  // ─── /services/ppc: Hero ───
  { page: '/services/ppc', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'PPC & Paid Ads' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Paid media that pays back.' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_desc', label: 'Description', type: 'textarea', value: 'Performance-driven campaigns across Google, Meta, YouTube, and programmatic. Every dollar tracked, every campaign optimized for revenue.' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get a free PPC audit' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See all services' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '3.2x' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. ROAS improvement' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: '$2M+' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'Monthly ad spend managed' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '90' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'Days to measurable ROAS lift' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '94%' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'Client retention rate' },

  // ─── /services/ppc: Services Section ───
  { page: '/services/ppc', section: 'Services', key: 'sec_heading', label: 'Section Heading', type: 'text', value: 'Four channels, one dashboard.' },
  { page: '/services/ppc', section: 'Services', key: 'sec_sub', label: 'Section Subtext', type: 'textarea', value: 'Every campaign tracked in real-time with revenue attribution.' },

  // ─── /services/ppc: Service Cards ───
  { page: '/services/ppc', section: 'Card 1', key: 'card_1_title', label: 'Card 1 Title', type: 'text', value: 'Google Ads' },
  { page: '/services/ppc', section: 'Card 1', key: 'card_1_tagline', label: 'Card 1 Tagline', type: 'text', value: 'ROAS-driven, not spend-driven.' },
  { page: '/services/ppc', section: 'Card 1', key: 'card_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'Search, Shopping, Display, and Performance Max campaigns built to maximize return on ad spend.' },
  { page: '/services/ppc', section: 'Card 1', key: 'card_1_highlights', label: 'Card 1 Highlights (comma sep)', type: 'textarea', value: 'Campaign architecture, Negative keywords, Quality score, Attribution modeling' },
  { page: '/services/ppc', section: 'Card 1', key: 'card_1_result', label: 'Card 1 Result', type: 'text', value: '3.2x avg. ROAS improvement' },
  { page: '/services/ppc', section: 'Card 2', key: 'card_2_title', label: 'Card 2 Title', type: 'text', value: 'Meta Ads' },
  { page: '/services/ppc', section: 'Card 2', key: 'card_2_tagline', label: 'Card 2 Tagline', type: 'text', value: 'Full-funnel Facebook & Instagram.' },
  { page: '/services/ppc', section: 'Card 2', key: 'card_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'Awareness to conversion across Meta platforms with creative strategy and Conversion API setup included.' },
  { page: '/services/ppc', section: 'Card 2', key: 'card_2_highlights', label: 'Card 2 Highlights (comma sep)', type: 'textarea', value: 'Lookalike audiences, Creative strategy, Retargeting, iOS 14+ tracking' },
  { page: '/services/ppc', section: 'Card 2', key: 'card_2_result', label: 'Card 2 Result', type: 'text', value: '2.8x avg. ROAS' },
  { page: '/services/ppc', section: 'Card 3', key: 'card_3_title', label: 'Card 3 Title', type: 'text', value: 'YouTube Ads' },
  { page: '/services/ppc', section: 'Card 3', key: 'card_3_tagline', label: 'Card 3 Tagline', type: 'text', value: 'Video that drives action.' },
  { page: '/services/ppc', section: 'Card 3', key: 'card_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'TrueView, Bumper, and In-Feed campaigns with precise intent-based targeting on the second-largest search engine.' },
  { page: '/services/ppc', section: 'Card 3', key: 'card_3_highlights', label: 'Card 3 Highlights (comma sep)', type: 'textarea', value: 'TrueView & Bumper, Intent targeting, Brand lift, Video remarketing' },
  { page: '/services/ppc', section: 'Card 3', key: 'card_3_result', label: 'Card 3 Result', type: 'text', value: '65% lower CPV vs. benchmarks' },
  { page: '/services/ppc', section: 'Card 4', key: 'card_4_title', label: 'Card 4 Title', type: 'text', value: 'Programmatic Advertising' },
  { page: '/services/ppc', section: 'Card 4', key: 'card_4_tagline', label: 'Card 4 Tagline', type: 'text', value: 'Automated, data-driven media buying.' },
  { page: '/services/ppc', section: 'Card 4', key: 'card_4_desc', label: 'Card 4 Desc', type: 'textarea', value: 'Cross-channel campaigns across display, video, native, and connected TV using DV360 and The Trade Desk.' },
  { page: '/services/ppc', section: 'Card 4', key: 'card_4_highlights', label: 'Card 4 Highlights (comma sep)', type: 'textarea', value: 'DSP management, Cross-channel, Brand safety, Incrementality testing' },
  { page: '/services/ppc', section: 'Card 4', key: 'card_4_result', label: 'Card 4 Result', type: 'text', value: '40% avg. media efficiency gain' },

  // ─── /services/ppc: Bottom CTA ───
  { page: '/services/ppc', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Free PPC audit.' },
  { page: '/services/ppc', section: 'Bottom CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'Find the waste.' },
  { page: '/services/ppc', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'We will analyze your current campaigns and show you exactly where budget is being wasted and where to scale.' },
  { page: '/services/ppc', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your PPC audit' },

  // ─── /services/social-media: Topbar ───
  { page: '/services/social-media', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Social media that drives business results.' },
  { page: '/services/social-media', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Get started →' },

  // ─── /services/social-media: Hero ───
  { page: '/services/social-media', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'Social Media Marketing' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Social that drives real business.' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_desc', label: 'Description', type: 'textarea', value: 'Strategy, content, community management, and paid social that builds brand awareness and drives qualified traffic.' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get a social audit' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See all services' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '156%' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. follower growth' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: '2.4x' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'Avg. paid social ROAS' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '78%' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'Brand sentiment improvement' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '45%' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'Avg. engagement rate increase' },

  // ─── /services/social-media: Services Section ───
  { page: '/services/social-media', section: 'Services', key: 'sec_heading', label: 'Section Heading', type: 'text', value: 'Three disciplines, one brand voice.' },
  { page: '/services/social-media', section: 'Services', key: 'sec_sub', label: 'Section Subtext', type: 'textarea', value: 'Organic growth, paid amplification, and brand protection under one strategy.' },

  // ─── /services/social-media: Service Cards ───
  { page: '/services/social-media', section: 'Card 1', key: 'card_1_title', label: 'Card 1 Title', type: 'text', value: 'Social Media Management' },
  { page: '/services/social-media', section: 'Card 1', key: 'card_1_tagline', label: 'Card 1 Tagline', type: 'text', value: 'Your brand, always on.' },
  { page: '/services/social-media', section: 'Card 1', key: 'card_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'Content creation, scheduling, community engagement, and performance reporting across all major platforms.' },
  { page: '/services/social-media', section: 'Card 1', key: 'card_1_highlights', label: 'Card 1 Highlights (comma sep)', type: 'textarea', value: 'Content creation, Community management, Multi-platform, Monthly analytics' },
  { page: '/services/social-media', section: 'Card 1', key: 'card_1_result', label: 'Card 1 Result', type: 'text', value: '156% avg. follower growth' },
  { page: '/services/social-media', section: 'Card 2', key: 'card_2_title', label: 'Card 2 Title', type: 'text', value: 'Social Advertising' },
  { page: '/services/social-media', section: 'Card 2', key: 'card_2_tagline', label: 'Card 2 Tagline', type: 'text', value: 'Paid social that pays back.' },
  { page: '/services/social-media', section: 'Card 2', key: 'card_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'Campaigns across Meta, LinkedIn, TikTok, and X with a focus on measurable ROAS, not vanity metrics.' },
  { page: '/services/social-media', section: 'Card 2', key: 'card_2_highlights', label: 'Card 2 Highlights (comma sep)', type: 'textarea', value: 'Cross-platform, Creative testing, Retargeting, Attribution' },
  { page: '/services/social-media', section: 'Card 2', key: 'card_2_result', label: 'Card 2 Result', type: 'text', value: '2.4x avg. ROAS' },
  { page: '/services/social-media', section: 'Card 3', key: 'card_3_title', label: 'Card 3 Title', type: 'text', value: 'Brand Management' },
  { page: '/services/social-media', section: 'Card 3', key: 'card_3_tagline', label: 'Card 3 Tagline', type: 'text', value: 'Build it. Protect it. Grow it.' },
  { page: '/services/social-media', section: 'Card 3', key: 'card_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'Strategic brand positioning, reputation monitoring, and influencer partnerships across digital channels.' },
  { page: '/services/social-media', section: 'Card 3', key: 'card_3_highlights', label: 'Card 3 Highlights (comma sep)', type: 'textarea', value: 'Brand voice, Reputation monitoring, Influencer strategy, Sentiment tracking' },
  { page: '/services/social-media', section: 'Card 3', key: 'card_3_result', label: 'Card 3 Result', type: 'text', value: '78% brand sentiment improvement' },

  // ─── /services/social-media: Bottom CTA ───
  { page: '/services/social-media', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Free social audit.' },
  { page: '/services/social-media', section: 'Bottom CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'See what is working.' },
  { page: '/services/social-media', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'We will review your social presence, content performance, and competitor landscape. Free. No obligation.' },
  { page: '/services/social-media', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your social audit' },

  // ─── /services/analytics: Topbar ───
  { page: '/services/analytics', section: 'Topbar', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Know what works. Cut what doesn\'t.' },
  { page: '/services/analytics', section: 'Topbar', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Free audit →' },

  // ─── /services/analytics: Hero ───
  { page: '/services/analytics', section: 'Hero', key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', value: 'Analytics & CRO' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_heading', label: 'Heading', type: 'text', value: 'Know what works. Cut what doesn\'t.' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_desc', label: 'Description', type: 'textarea', value: 'Analytics, conversion rate optimization, and reporting that tells you what to do next — not just what happened.' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_cta1', label: 'Primary CTA', type: 'text', value: 'Get an analytics audit' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_cta2', label: 'Secondary CTA', type: 'text', value: 'See all services' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat1_num', label: 'Stat 1 Number', type: 'text', value: '32%' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. conversion rate increase' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat2_num', label: 'Stat 2 Number', type: 'text', value: '100%' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat2_label', label: 'Stat 2 Label', type: 'text', value: 'Data ownership guaranteed' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat3_num', label: 'Stat 3 Number', type: 'text', value: '48h' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat3_label', label: 'Stat 3 Label', type: 'text', value: 'Dashboard setup time' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat4_num', label: 'Stat 4 Number', type: 'text', value: '94%' },
  { page: '/services/analytics', section: 'Hero', key: 'hero_stat4_label', label: 'Stat 4 Label', type: 'text', value: 'Client retention rate' },

  // ─── /services/analytics: Services Section ───
  { page: '/services/analytics', section: 'Services', key: 'sec_heading', label: 'Section Heading', type: 'text', value: 'Three services, total clarity.' },
  { page: '/services/analytics', section: 'Services', key: 'sec_sub', label: 'Section Subtext', type: 'textarea', value: 'From tracking setup to conversion optimization, we make your data work for you.' },

  // ─── /services/analytics: Service Cards ───
  { page: '/services/analytics', section: 'Card 1', key: 'card_1_title', label: 'Card 1 Title', type: 'text', value: 'Tracking & Implementation' },
  { page: '/services/analytics', section: 'Card 1', key: 'card_1_tagline', label: 'Card 1 Tagline', type: 'text', value: 'Measure everything that matters.' },
  { page: '/services/analytics', section: 'Card 1', key: 'card_1_desc', label: 'Card 1 Desc', type: 'textarea', value: 'GA4, GTM, server-side tagging, Conversion API — set up once, trust the data forever.' },
  { page: '/services/analytics', section: 'Card 1', key: 'card_1_highlights', label: 'Card 1 Highlights (comma sep)', type: 'textarea', value: 'GA4 migration, GTM setup, Server-side tagging, Conversion API' },
  { page: '/services/analytics', section: 'Card 1', key: 'card_1_result', label: 'Card 1 Result', type: 'text', value: '100% data accuracy guarantee' },
  { page: '/services/analytics', section: 'Card 2', key: 'card_2_title', label: 'Card 2 Title', type: 'text', value: 'Custom Dashboards' },
  { page: '/services/analytics', section: 'Card 2', key: 'card_2_tagline', label: 'Card 2 Tagline', type: 'text', value: 'Decisions at a glance.' },
  { page: '/services/analytics', section: 'Card 2', key: 'card_2_desc', label: 'Card 2 Desc', type: 'textarea', value: 'Looker Studio and custom dashboards that show the metrics that actually matter for your business.' },
  { page: '/services/analytics', section: 'Card 2', key: 'card_2_highlights', label: 'Card 2 Highlights (comma sep)', type: 'textarea', value: 'Looker Studio, Real-time data, Revenue attribution, Automated reports' },
  { page: '/services/analytics', section: 'Card 2', key: 'card_2_result', label: 'Card 2 Result', type: 'text', value: '48h average setup time' },
  { page: '/services/analytics', section: 'Card 3', key: 'card_3_title', label: 'Card 3 Title', type: 'text', value: 'Conversion Rate Optimization' },
  { page: '/services/analytics', section: 'Card 3', key: 'card_3_tagline', label: 'Card 3 Tagline', type: 'text', value: 'More revenue from existing traffic.' },
  { page: '/services/analytics', section: 'Card 3', key: 'card_3_desc', label: 'Card 3 Desc', type: 'textarea', value: 'Systematic A/B testing and UX optimization to turn more visitors into customers without increasing ad spend.' },
  { page: '/services/analytics', section: 'Card 3', key: 'card_3_highlights', label: 'Card 3 Highlights (comma sep)', type: 'textarea', value: 'A/B testing, Heatmaps, User recordings, Funnel analysis' },
  { page: '/services/analytics', section: 'Card 3', key: 'card_3_result', label: 'Card 3 Result', type: 'text', value: '32% avg. conversion rate lift' },

  // ─── /services/analytics: Bottom CTA ───
  { page: '/services/analytics', section: 'Bottom CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Free analytics audit.' },
  { page: '/services/analytics', section: 'Bottom CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'See the gaps.' },
  { page: '/services/analytics', section: 'Bottom CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'We will review your tracking setup and show you exactly what data you are missing and what it is costing you.' },
  { page: '/services/analytics', section: 'Bottom CTA', key: 'cta_btn', label: 'CTA Button', type: 'text', value: 'Book your analytics audit' },

  // ─── /services/web-design: Topbar & Hero ───
  { page: '/services/web-design', section: 'Hero', key: 'topbar_text', label: 'Topbar Text', type: 'text', value: 'Websites built for search & conversion from day one.' },
  { page: '/services/web-design', section: 'Hero', key: 'topbar_link', label: 'Topbar Link', type: 'text', value: 'Get free proposal →' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_badge', label: 'Hero Badge', type: 'text', value: 'Bespoke Web Design & Shopify Studio' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_title', label: 'Hero Title', type: 'text', value: 'High-Converting Web Design & Shopify Stores Built for Revenue.' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_lede', label: 'Hero Description', type: 'textarea', value: 'We craft bespoke websites with next-gen speed, interactive UX, and measurable ROI. From custom Figma prototypes to sub-second Next.js and Shopify builds, our team turns visitors into loyal customers.' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_form_title', label: 'Form Title', type: 'text', value: 'Get a Free Custom Proposal' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_form_sub', label: 'Form Subtext', type: 'textarea', value: 'Tell us about your project — we will reply with an estimate & timeline within 4 hours.' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_form_btn', label: 'Form Submit Button', type: 'text', value: 'Get Free Proposal' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_rating_text', label: 'Rating Text', type: 'text', value: '4.9 / 5 across 412+ verified reviews on Clutch, Google & Trustpilot' },

  // ─── /services/web-design: Capabilities & Mockup ───
  { page: '/services/web-design', section: 'Capabilities', key: 'showcase_eyebrow', label: 'Eyebrow', type: 'text', value: 'Full-Spectrum Capabilities' },
  { page: '/services/web-design', section: 'Capabilities', key: 'showcase_title', label: 'Section Title', type: 'text', value: 'Our Professional Web Design & Development Includes:' },
  { page: '/services/web-design', section: 'Capabilities', key: 'showcase_subtext', label: 'Section Subtext', type: 'textarea', value: 'We handle every layer of the digital product lifecycle — from initial brand wireframes to full-stack code and post-launch conversion rate optimization.' },
  { page: '/services/web-design', section: 'Capabilities', key: 'showcase_btn', label: 'CTA Button', type: 'text', value: 'Speak With A Lead Designer' },

  // ─── /services/web-design: Mid Banner ───
  { page: '/services/web-design', section: 'Mid Banner', key: 'mid_eyebrow', label: 'Banner Eyebrow', type: 'text', value: 'Ready To Build?' },
  { page: '/services/web-design', section: 'Mid Banner', key: 'mid_title', label: 'Banner Title', type: 'text', value: 'We are ready to design and launch your on-demand custom website.' },
  { page: '/services/web-design', section: 'Mid Banner', key: 'mid_subtext', label: 'Banner Subtext', type: 'textarea', value: 'Discuss your timeline, tech stack, and goals with our senior design architects today.' },
  { page: '/services/web-design', section: 'Mid Banner', key: 'mid_btn', label: 'Banner Button', type: 'text', value: 'Start Your Project' },

  // ─── /services/web-design: Services Grid ───
  { page: '/services/web-design', section: 'Specialties', key: 'svc_eyebrow', label: 'Eyebrow', type: 'text', value: 'Our Core Specialties' },
  { page: '/services/web-design', section: 'Specialties', key: 'svc_heading', label: 'Heading', type: 'text', value: 'Bespoke Web Design Services We Offer.' },
  { page: '/services/web-design', section: 'Specialties', key: 'svc_subtext', label: 'Subtext', type: 'textarea', value: 'Every business requires a tailored approach. Here is how our specialized web design and development practices deliver measurable growth.' },

  // ─── /our-team: Topbar & Hero ───
  { page: '/our-team', section: 'Hero', key: 'topbar_text', label: 'Announcement Text', type: 'text', value: 'Now hiring senior technical SEOs and GEO research engineers.' },
  { page: '/our-team', section: 'Hero', key: 'topbar_link', label: 'Announcement Link', type: 'text', value: 'View open positions →' },
  { page: '/our-team', section: 'Hero', key: 'hero_badge', label: 'Hero Badge', type: 'text', value: 'The Practitioners' },
  { page: '/our-team', section: 'Hero', key: 'hero_title', label: 'Hero Heading', type: 'text', value: 'The Senior Strategists & Engineers Behind Your Organic Revenue.' },
  { page: '/our-team', section: 'Hero', key: 'hero_lede', label: 'Hero Lede Text', type: 'textarea', value: 'We are 38 senior search specialists, full-stack engineers, and editorial investigators. No junior account reps, no outsourced white-labeling — just direct access to the people doing the work.' },

  // ─── /our-team: Principles ───
  { page: '/our-team', section: 'Principles', key: 'principle_1_title', label: 'Principle 1 Title', type: 'text', value: 'No Junior Account Hand-Offs' },
  { page: '/our-team', section: 'Principles', key: 'principle_1_desc', label: 'Principle 1 Description', type: 'textarea', value: 'You never speak with an intern or middle-man coordinator. Every strategy meeting, Slack message, and pull request is handled by a senior practitioner with 7+ years in search.' },
  { page: '/our-team', section: 'Principles', key: 'principle_2_title', label: 'Principle 2 Title', type: 'text', value: '100% Asset & Code Ownership' },
  { page: '/our-team', section: 'Principles', key: 'principle_2_desc', label: 'Principle 2 Description', type: 'textarea', value: 'You own every line of schema, every technical audit, every keyword database, and every creative asset forever. No proprietary platform lock-in.' },
  { page: '/our-team', section: 'Principles', key: 'principle_3_title', label: 'Principle 3 Title', type: 'text', value: 'Code-Level Execution' },
  { page: '/our-team', section: 'Principles', key: 'principle_3_desc', label: 'Principle 3 Description', type: 'textarea', value: 'We don’t just deliver 50-page PDF audit decks and tell your engineers to fix them. We submit clean GitHub pull requests and test them in staging ourselves.' },
  { page: '/our-team', section: 'Principles', key: 'principle_4_title', label: 'Principle 4 Title', type: 'text', value: 'Revenue Over Vanity Traffic' },
  { page: '/our-team', section: 'Principles', key: 'principle_4_desc', label: 'Principle 4 Description', type: 'textarea', value: 'Ranking for 100,000 zero-intent queries does not pay bills. We relentlessly optimize for high-commercial buyer queries and primary AI citations that convert.' },

  // ─── /our-team: Team Grid & Careers ───
  { page: '/our-team', section: 'Team Grid', key: 'team_eyebrow', label: 'Eyebrow', type: 'text', value: 'Leadership & Lead Strategists' },
  { page: '/our-team', section: 'Team Grid', key: 'team_heading', label: 'Heading', type: 'text', value: 'Meet the team on your Slack channel.' },
  { page: '/our-team', section: 'Team Grid', key: 'team_subtext', label: 'Subtext', type: 'textarea', value: 'Every client retainer is led by hands-on specialists who have spent a decade in the trenches of technical search and algorithmic recovery.' },
  { page: '/our-team', section: 'Careers', key: 'careers_badge', label: 'Careers Badge', type: 'text', value: 'Join Our Crew' },
  { page: '/our-team', section: 'Careers', key: 'careers_heading', label: 'Careers Heading', type: 'text', value: "We're always looking for rare search talent." },
  { page: '/our-team', section: 'Careers', key: 'careers_subtext', label: 'Careers Subtext', type: 'textarea', value: 'We hire only senior practitioners (5+ years hands-on). Competitive compensation, asynchronous workflow, zero micromanagement, and generous profit sharing.' },
  { page: '/our-team', section: 'Big CTA', key: 'cta_heading', label: 'CTA Heading', type: 'text', value: 'Ready to collaborate with senior' },
  { page: '/our-team', section: 'Big CTA', key: 'cta_em', label: 'CTA Emphasis', type: 'text', value: 'practitioners?' },
  { page: '/our-team', section: 'Big CTA', key: 'cta_text', label: 'CTA Text', type: 'textarea', value: 'Book a free 30-minute forensic strategy call directly with a lead strategist. No sales pitch, just actionable data.' },
  { page: '/our-team', section: 'Big CTA', key: 'cta_btn_text', label: 'CTA Button Text', type: 'text', value: 'Schedule Strategy Session' },

  // ─── /resources/publications: Hero & Featured ───
  { page: '/resources/publications', section: 'Hero', key: 'topbar_text', label: 'Announcement Text', type: 'text', value: 'New Research: The 2026 Generative Engine Optimization Benchmark Study is live.' },
  { page: '/resources/publications', section: 'Hero', key: 'topbar_link', label: 'Announcement Link', type: 'text', value: 'Download free PDF →' },
  { page: '/resources/publications', section: 'Hero', key: 'hero_badge', label: 'Hero Badge', type: 'text', value: 'Gen Ranq Research Lab' },
  { page: '/resources/publications', section: 'Hero', key: 'hero_title', label: 'Hero Title', type: 'text', value: 'Publications, Research & Search Playbooks' },
  { page: '/resources/publications', section: 'Hero', key: 'hero_lede', label: 'Hero Description', type: 'textarea', value: 'Original benchmark studies, technical white papers, and forensic teardowns written by senior SEO engineers. No fluff, pure empirical data.' },
  { page: '/resources/publications', section: 'Featured', key: 'featured_title', label: 'Featured Title', type: 'text', value: 'The State of Generative Engine Optimization (GEO) & AI Search 2026' },
  { page: '/resources/publications', section: 'Featured', key: 'featured_summary', label: 'Featured Summary', type: 'textarea', value: 'A forensic audit of 12,000 queries across ChatGPT Search, Perplexity Pro, Google AI Overviews, and Claude 3.5 Sonnet to map which brand citations LLMs surface and why.' },
  { page: '/resources/publications', section: 'Featured', key: 'featured_takeaway', label: 'Featured Key Finding', type: 'textarea', value: '87% of LLM citations originate from third-party consensus sources (Wikidata, Crunchbase, tier-1 trade media) rather than brand-owned landing pages.' },
  { page: '/resources/publications', section: 'Featured', key: 'featured_btn', label: 'Featured Button Text', type: 'text', value: 'Download Full PDF (Free)' },
  { page: '/resources/publications', section: 'Featured', key: 'featured_note', label: 'Featured Note', type: 'text', value: 'No credit card required • Instant access' },
  { page: '/resources/publications', section: 'Bespoke Advisory', key: 'cta_badge', label: 'Advisory Badge', type: 'text', value: 'Bespoke Research' },
  { page: '/resources/publications', section: 'Bespoke Advisory', key: 'cta_title', label: 'Advisory Title', type: 'text', value: 'Need a custom technical audit or competitor research teardown?' },
  { page: '/resources/publications', section: 'Bespoke Advisory', key: 'cta_desc', label: 'Advisory Description', type: 'textarea', value: 'Our research and technical SEO team conducts private forensic audits and share-of-voice analyses for high-growth enterprises.' },
  { page: '/resources/publications', section: 'Bespoke Advisory', key: 'cta_btn', label: 'Advisory Button Text', type: 'text', value: 'Commission an Audit' },

  // ─── /services/seo/technical-seo ───
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'topbar_text', label: 'Topbar Announcement', type: 'text', value: 'Specialist Technical Audit: Surface hidden crawl & Core Web Vitals bottlenecks.' },
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'topbar_link', label: 'Topbar Link Text', type: 'text', value: 'Request free audit →' },
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'hero_badge', label: 'Hero Badge', type: 'text', value: 'Technical SEO Services' },
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'hero_title', label: 'Hero Heading', type: 'text', value: 'Forensic Technical SEO Services That Safeguard Revenue.' },
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'hero_lede', label: 'Hero Description', type: 'textarea', value: 'We resolve crawl budget traps, Core Web Vitals degradation, hydration delays, and faceted indexing bloat. Engineered for Next.js, headless architectures, and enterprise platforms.' },
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'hero_cta_btn', label: 'Hero Form Button', type: 'text', value: 'Get A Free Audit' },
  { page: '/services/seo/technical-seo', section: 'Hero', key: 'hero_guarantee', label: 'Guarantee Note', type: 'text', value: '100% Confidential • Signed NDA protection as standard' },

  // Stats
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_1_val', label: 'Stat 1 Value', type: 'text', value: '40%' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_1_label', label: 'Stat 1 Label', type: 'text', value: 'Avg. Organic Traffic Lift' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_2_val', label: 'Stat 2 Value', type: 'text', value: '200+' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_2_label', label: 'Stat 2 Label', type: 'text', value: 'Forensic Audits Delivered' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_3_val', label: 'Stat 3 Value', type: 'text', value: '60' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_3_label', label: 'Stat 3 Label', type: 'text', value: 'Days to Green Vitals' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_4_val', label: 'Stat 4 Value', type: 'text', value: '94%' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_4_label', label: 'Stat 4 Label', type: 'text', value: 'Client Retention Rate' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_5_val', label: 'Stat 5 Value', type: 'text', value: '3×' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_5_label', label: 'Stat 5 Label', type: 'text', value: 'Increase in AI Citations' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_6_val', label: 'Stat 6 Value', type: 'text', value: '24/7' },
  { page: '/services/seo/technical-seo', section: 'Stats', key: 'stat_6_label', label: 'Stat 6 Label', type: 'text', value: 'Continuous Uptime & Indexing' },

  // Why Section
  { page: '/services/seo/technical-seo', section: 'Why AI SEO', key: 'why_eyebrow', label: 'Eyebrow', type: 'text', value: 'Next-Gen SEO Paradigm' },
  { page: '/services/seo/technical-seo', section: 'Why AI SEO', key: 'why_heading', label: 'Heading', type: 'text', value: 'Why classic SEO alone fails in the AI search era.' },
  { page: '/services/seo/technical-seo', section: 'Why AI SEO', key: 'why_subtext', label: 'Subtext', type: 'textarea', value: 'Search engines and LLMs no longer just match keywords. They evaluate technical rendering speed, structured data entities, and authority consensus.' },

  // Platforms
  { page: '/services/seo/technical-seo', section: 'Platforms', key: 'plat_badge', label: 'Badge', type: 'text', value: 'Next-Gen Search Matrix' },
  { page: '/services/seo/technical-seo', section: 'Platforms', key: 'plat_heading', label: 'Heading', type: 'text', value: 'Rank across Search & AI platforms.' },
  { page: '/services/seo/technical-seo', section: 'Platforms', key: 'plat_subtext', label: 'Description', type: 'textarea', value: 'Search behaviour is changing. Users now expect direct answers, comprehensive summaries, and AI-curated insights. We engineer your technical infrastructure so your company ranks on classic engines and modern AI answer platforms alike.' },
  { page: '/services/seo/technical-seo', section: 'Platforms', key: 'plat_cta', label: 'CTA Button', type: 'text', value: 'Unlock AI SEO Now' },

  // Services Matrix
  { page: '/services/seo/technical-seo', section: 'Services Matrix', key: 'svc_eyebrow', label: 'Eyebrow', type: 'text', value: 'Services Matrix' },
  { page: '/services/seo/technical-seo', section: 'Services Matrix', key: 'svc_heading', label: 'Heading', type: 'text', value: 'Comprehensive SEO services — 9 core disciplines.' },
  { page: '/services/seo/technical-seo', section: 'Services Matrix', key: 'svc_subtext', label: 'Subtext', type: 'textarea', value: 'We cover every technical layer: from rendering pipelines and crawl traps to enterprise architecture and index pruning.' },

  // Reporting
  { page: '/services/seo/technical-seo', section: 'Reporting', key: 'report_badge', label: 'Badge', type: 'text', value: 'Radical Transparency' },
  { page: '/services/seo/technical-seo', section: 'Reporting', key: 'report_heading', label: 'Heading', type: 'text', value: 'Reporting & communication built for leaders.' },
  { page: '/services/seo/technical-seo', section: 'Reporting', key: 'report_subtext', label: 'Description', type: 'textarea', value: 'No dense 80-page automated PDF exports that nobody reads. We operate with clean, live Looker Studio telemetry and direct communication with the senior team doing the work.' },

  // Security
  { page: '/services/seo/technical-seo', section: 'Security', key: 'sec_eyebrow', label: 'Eyebrow', type: 'text', value: 'Trust & Protection' },
  { page: '/services/seo/technical-seo', section: 'Security', key: 'sec_heading', label: 'Heading', type: 'text', value: 'Data security & operational integrity.' },
  { page: '/services/seo/technical-seo', section: 'Security', key: 'sec_subtext', label: 'Subtext', type: 'textarea', value: 'Our commitment: measurable growth, responsible execution, and absolute confidentiality.' },

  // Tech Stack
  { page: '/services/seo/technical-seo', section: 'Tech Stack', key: 'tools_eyebrow', label: 'Eyebrow', type: 'text', value: 'Enterprise Tech Stack' },
  { page: '/services/seo/technical-seo', section: 'Tech Stack', key: 'tools_heading', label: 'Heading', type: 'text', value: 'Tools which we use.' },
  { page: '/services/seo/technical-seo', section: 'Tech Stack', key: 'tools_subtext', label: 'Subtext', type: 'textarea', value: 'The battle-tested software matrix that powers data-driven strategy, precise tracking, and seamless execution.' },

  // Pricing
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_badge', label: 'Badge', type: 'text', value: 'Investment' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_heading', label: 'Heading', type: 'text', value: 'Transparent Retainers & Pricing.' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_subtext', label: 'Subtext', type: 'textarea', value: 'Predictable monthly pricing with zero surprise add-ons. 90-day initial sprint, then flexible month-to-month.' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_plan_title', label: 'Plan Title', type: 'text', value: 'AI-Driven SEO Growth Program' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_plan_desc', label: 'Plan Description', type: 'textarea', value: 'Consistent visibility across Google Search, Maps, and AI-powered discovery platforms.' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_price_val', label: 'Price Value', type: 'text', value: '₹15,000 – ₹1,00,000' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_price_unit', label: 'Price Unit', type: 'text', value: '/ month*' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_price_sub', label: 'Price Asterisk Note', type: 'text', value: '*Customised based on scope, competition & AI SEO depth' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_btn_text', label: 'Button Text', type: 'text', value: 'Request a Custom AI SEO Strategy' },
  { page: '/services/seo/technical-seo', section: 'Pricing', key: 'pricing_note', label: 'Pricing Note', type: 'text', value: 'Month-to-month after 90 days • You own all code & assets' },

  // Final CTA
  { page: '/services/seo/technical-seo', section: 'Final CTA', key: 'cta_badge', label: 'Badge', type: 'text', value: 'Take Action' },
  { page: '/services/seo/technical-seo', section: 'Final CTA', key: 'cta_heading', label: 'Heading', type: 'text', value: 'Get a free SEO audit today.' },
  { page: '/services/seo/technical-seo', section: 'Final CTA', key: 'cta_subtext', label: 'Description', type: 'textarea', value: 'We analyse your server response times, index coverage, crawl efficiency, and entity footprint to surface high-leverage growth opportunities. No sales decks, just real findings.' },
  { page: '/services/seo/technical-seo', section: 'Final CTA', key: 'cta_btn_text', label: 'Button Text', type: 'text', value: 'Get a Free SEO Audit Today' },
  { page: '/services/seo/technical-seo', section: 'Final CTA', key: 'cta_note', label: 'Final Note', type: 'text', value: '100% Free • Delivered within 24 hours by a Senior SEO' },
]



export function getDefaults(page: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const b of defaultContent) {
    if (b.page === page) out[b.key] = b.value
  }
  return out
}

export function getBlockMeta(page: string): ContentBlock[] {
  return defaultContent.filter(b => b.page === page)
}
