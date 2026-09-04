import { pageMetas } from './page-metas'

type MetaRow = {
  title: string
  description: string
  canonical: string
  og_title: string
  og_description: string
  og_image: string
}

export async function getPageMeta(route: string): Promise<MetaRow> {
  const defaults = pageMetas.find(p => p.route === route)
  const fallback: MetaRow = {
    title: defaults?.fields.title || 'Gen Ranq',
    description: defaults?.fields.description || '',
    canonical: defaults?.fields.canonical || 'https://genranq.com',
    og_title: defaults?.fields.ogTitle || defaults?.fields.title || 'Gen Ranq',
    og_description: defaults?.fields.ogDescription || defaults?.fields.description || '',
    og_image: defaults?.fields.ogImage || '',
  }

  try {
    const { queryOne } = await import('./db')
    const row = await queryOne<MetaRow>('SELECT * FROM page_meta WHERE route = ?', [route])
    if (row && row.title) {
      return {
        title: row.title || fallback.title,
        description: row.description || fallback.description,
        canonical: row.canonical || fallback.canonical,
        og_title: row.og_title || fallback.og_title,
        og_description: row.og_description || fallback.og_description,
        og_image: row.og_image || fallback.og_image,
      }
    }
  } catch {}

  return fallback
}
