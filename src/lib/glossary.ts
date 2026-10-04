import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

export type GlossaryTerm = {
  id: string
  title: string
  slug: string
  letter: string
  category: string
  shortDef: string
  synonyms: string
  content: string
  related: string[]
  autoLink: boolean
  published: boolean
  updatedAt: string
}

const GLOSSARY_FILE = path.join(process.cwd(), 'src', 'data', 'glossary.json')

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    const raw = await readFile(GLOSSARY_FILE, 'utf-8')
    const terms = JSON.parse(raw) as GlossaryTerm[]
    return terms.sort((a, b) => a.title.localeCompare(b.title))
  } catch {
    return []
  }
}

export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  const terms = await getAllGlossaryTerms()
  const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '')
  return terms.find(t => t.slug.toLowerCase() === clean) || null
}

export async function saveGlossaryTerm(term: GlossaryTerm): Promise<GlossaryTerm> {
  const terms = await getAllGlossaryTerms()
  const idx = terms.findIndex(t => t.id === term.id || t.slug === term.slug)
  
  const updatedTerm: GlossaryTerm = {
    ...term,
    letter: (term.title[0] || 'A').toUpperCase(),
    updatedAt: new Date().toISOString(),
  }

  let nextTerms: GlossaryTerm[]
  if (idx >= 0) {
    nextTerms = [...terms]
    nextTerms[idx] = updatedTerm
  } else {
    nextTerms = [...terms, updatedTerm]
  }

  nextTerms.sort((a, b) => a.title.localeCompare(b.title))
  await mkdir(path.dirname(GLOSSARY_FILE), { recursive: true })
  await writeFile(GLOSSARY_FILE, JSON.stringify(nextTerms, null, 2), 'utf-8')
  return updatedTerm
}

export async function deleteGlossaryTerm(id: string): Promise<boolean> {
  const terms = await getAllGlossaryTerms()
  const nextTerms = terms.filter(t => t.id !== id && t.slug !== id)
  if (nextTerms.length === terms.length) return false
  await writeFile(GLOSSARY_FILE, JSON.stringify(nextTerms, null, 2), 'utf-8')
  return true
}
