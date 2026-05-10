import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import InsightsContent from './InsightsContent'

export const metadata: Metadata = { title: 'Insights — We Strive Design' }

const posts = [
  { gradient: 'g1', label: 'A', tag: 'AI Search', title: 'How LLMs choose which brands to cite — and how to be one of them.', desc: 'A teardown of 4,200 AI answers across ChatGPT, Perplexity, and Gemini, looking for the patterns in which sources get cited and which don\'t.', author: 'Tomás Beltrán', date: 'Apr 28 · 14 min read' },
  { gradient: 'g2', label: 'T', tag: 'Technical SEO', title: 'The Core Web Vitals checklist most agencies are still getting wrong in 2026.', desc: 'INP replaced FID a year ago. Half the audits we see still measure the wrong thing. Here\'s the corrected playbook.', author: 'Daniel Whitford', date: 'Apr 22 · 11 min read' },
  { gradient: 'g3', label: 'L', tag: 'Local SEO', title: 'Multi-location SEO at scale: lessons from 22 yoga studios in 3 years.', desc: 'How we built a programmatic local SEO system that turned a 4-studio brand into a 22-location category leader without diluting any single location.', author: 'Farah Khoury', date: 'Apr 17 · 9 min read' },
  { gradient: 'g4', label: 'E', tag: 'Editorial', title: 'Why "AI-written content" tanks — and what hybrid workflows actually look like.', desc: 'We tested four content workflows across 80 articles. Pure AI lost. Pure human won, but slowly. The middle ground that won most was surprising.', author: 'Marisol Acevedo', date: 'Apr 11 · 16 min read' },
  { gradient: 'g5', label: 'P', tag: 'Digital PR', title: 'The death of the guest post (and what replaced it for our clients).', desc: 'Earned editorial mentions are now 4x more valuable than guest posts and 12x harder to fake. Why we shifted the entire link practice in 2024.', author: 'Kemi Adeyemi', date: 'Apr 4 · 8 min read' },
  { gradient: 'g6', label: 'C', tag: 'Case study', title: 'How we got Maple & Oak from local-only to a national subscription brand.', desc: 'The full 18-month playbook: audit, technical fixes, programmatic content, digital PR, AI-search optimization. Numbers, screenshots, mistakes.', author: 'Anaya Sharma', date: 'Mar 28 · 22 min read' },
  { gradient: 'g2', label: 'G', tag: 'AI Search', title: 'Brand entity SEO: the Wikipedia-Wikidata-Crunchbase loop that LLMs train on.', desc: "If your brand isn't a recognized entity in the open web, LLMs won't reliably cite you. Here's the 7-step entity-building protocol.", author: 'Tomás Beltrán', date: 'Mar 21 · 13 min read' },
  { gradient: 'g3', label: 'S', tag: 'Technical SEO', title: 'JavaScript SEO in 2026: what Googlebot and GPTBot do differently.', desc: "Most SPA frameworks ship fine for Google now. But LLM crawlers behave differently. We tested every major framework so you don't have to.", author: 'Rohan Iyer', date: 'Mar 15 · 12 min read' },
  { gradient: 'g1', label: 'R', tag: 'Industry report', title: 'The State of Small Business SEO 2026 — full report, 412 brands surveyed.', desc: "Our annual research drop. What's working, what's not, what budgets look like, and where AI search is reshaping outcomes for SMBs.", author: 'Anaya Sharma', date: 'Mar 8 · Industry report' },
]

export default function InsightsPage() {
  return (
    <>
      <Topbar text="New: The 2026 AI Search Playbook — free 84-page PDF." linkText="Get it →" linkHref="#newsletter" />
      <Nav active="insights" />

      <header className="page-hero">
        <div className="wrap">
          <div className="crumb">Home / Insights</div>
          <h1>Field notes from <em>the search era.</em></h1>
          <p>Long-form essays, playbooks, and teardowns from our strategists. Written for operators who want to understand how search actually works in 2026 — not for ranking on &quot;what is SEO.&quot;</p>
        </div>
      </header>

      <InsightsContent posts={posts} />
      <Footer />
    </>
  )
}
