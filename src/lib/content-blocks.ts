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

  // ─── HOMEPAGE: Testimonials ───
  { page: '/', section: 'Testimonials', key: 'testi_heading', label: 'Section Heading', type: 'text', value: 'What our clients actually say.' },
  { page: '/', section: 'Testimonials', key: 'testi_subtext', label: 'Section Subtext', type: 'textarea', value: "Unedited, unpaid, and posted publicly on Clutch and Trustpilot. We've checked." },
  { page: '/', section: 'Testimonials', key: 'testi_1_quote', label: 'Testimonial 1 Quote', type: 'textarea', value: '"Within nine months we were ranking #1 for our three highest-intent keywords. The team didn\'t just deliver traffic — they helped us understand why it was working."' },
  { page: '/', section: 'Testimonials', key: 'testi_1_name', label: 'Testimonial 1 Name', type: 'text', value: 'Elena Marchetti' },
  { page: '/', section: 'Testimonials', key: 'testi_1_role', label: 'Testimonial 1 Role', type: 'text', value: 'Founder · Maple & Oak Roasters' },
  { page: '/', section: 'Testimonials', key: 'testi_2_quote', label: 'Testimonial 2 Quote', type: 'textarea', value: '"We\'ve worked with three SEO agencies before. Omniranq is the first one that felt like a partner instead of a vendor sending PDFs into the void."' },
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
  { page: '/', section: 'FAQ', key: 'faq_6_q', label: 'FAQ 6 Question', type: 'text', value: 'What makes Omniranq different from other SEO agencies?' },
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
  { page: '/about', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Omniranq is a global SEO studio for ambitious small businesses. We started in a Melbourne garage in 2014, picked up offices in London and Bangalore, and have shipped SEO strategy for 600+ brands across 42 countries since.' },
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


  { page: '/services/seo', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'SEO that moves revenue, not just rankings.' },
  { page: '/services/seo', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Full-service organic search for brands that want more than a monthly report.' },

  { page: '/services/ai-search', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Be the answer, not the blue link.' },
  { page: '/services/ai-search', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Optimise your brand to appear in ChatGPT, Google AI Overviews, Gemini, and Perplexity.' },

  { page: '/services/content-marketing', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Content that earns links, trust, and traffic.' },
  { page: '/services/content-marketing', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Strategic content marketing driven by data, not guesswork.' },

  { page: '/services/link-building', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Links that move the needle.' },
  { page: '/services/link-building', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'White-hat authority building through digital PR, guest posting, and editorial outreach.' },

  { page: '/services/ppc', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Paid search that actually pays back.' },
  { page: '/services/ppc', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Google Ads, Meta Ads, and YouTube campaigns managed by people who understand organic too.' },

  { page: '/services/social-media', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Social that drives real business.' },
  { page: '/services/social-media', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Strategy, content, and advertising that builds brand awareness and drives qualified traffic.' },

  { page: '/services/analytics', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: "Know what works. Cut what doesn't." },
  { page: '/services/analytics', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Analytics, CRO, and reporting that tells you what to do next — not just what happened.' },

  { page: '/services/web-design', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Websites built for search from day one.' },
  { page: '/services/web-design', section: 'Hero', key: 'hero_subtext', label: 'Page Subtext', type: 'textarea', value: 'Fast, accessible, conversion-optimised sites with SEO baked into every page.' },

  { page: '/insights', section: 'Hero', key: 'hero_heading', label: 'Page Heading', type: 'text', value: 'Field notes from the search era.' },
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
  { page: '/contact', section: 'Contact Info', key: 'direct_email', label: 'Direct Email', type: 'text', value: 'hello@omniranq.com' },
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
  { page: '/contact', section: 'Email CTA', key: 'email_cta_subtext', label: 'Email CTA Subtext', type: 'textarea', value: "If forms aren't your thing, hello@omniranq.com lands in the same inbox and gets the same reply. We don't mind." },
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
