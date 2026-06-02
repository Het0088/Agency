import { getDefaults } from './content-blocks'

export async function getContent(page: string): Promise<Record<string, string>> {
  const defaults = getDefaults(page)

  try {
    const { query } = await import('./db')
    const rows = await query<{ block_key: string; content: string }>(
      'SELECT block_key, content FROM page_content WHERE page = ?',
      [page]
    )
    for (const row of rows) {
      if (row.block_key in defaults) defaults[row.block_key] = row.content
    }
  } catch {}

  return defaults
}
