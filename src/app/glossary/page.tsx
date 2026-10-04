import type { Metadata } from 'next'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GlossaryClient from './GlossaryClient'
import { getAllGlossaryTerms } from '@/lib/glossary'

export const metadata: Metadata = {
  title: 'SEO & AI Search Glossary — Definitions of Modern Search Terms',
  description: 'Plain-English definitions of modern SEO, Generative Engine Optimisation (GEO), Core Web Vitals, and AI search terms we use every day at GENRANQ Software LLP.',
  alternates: { canonical: 'https://genranq.com/glossary' },
  openGraph: {
    title: 'SEO & AI Search Glossary — GENRANQ Software LLP',
    description: 'Plain-English definitions of modern SEO, GEO, and AI search terms.',
    url: 'https://genranq.com/glossary',
    type: 'website',
  },
}

export default async function GlossaryPage() {
  const terms = await getAllGlossaryTerms()
  const publishedTerms = terms.filter(t => t.published)

  return (
    <>
      <Topbar text="Discover modern search frameworks and playbooks." linkText="Consult with our strategists →" linkHref="/contact" />
      <Nav active="resources" />

      <header className="page-hero" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <div className="crumb">Home / Resources / SEO Glossary</div>
          <h1>
            The plain-English <em>search glossary.</em>
          </h1>
          <p style={{ maxWidth: 680 }}>
            Authoritative definitions of the SEO, Generative Engine Optimisation (GEO), Core Web Vitals, and web architecture terms we rely on every day. Written for business operators, engineers, and digital marketers.
          </p>
        </div>
      </header>

      <GlossaryClient terms={publishedTerms} />

      <Footer />
    </>
  )
}
