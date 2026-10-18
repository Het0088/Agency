import fs from 'fs'
import path from 'path'

export type SiteScripts = {
  head_code: string
  body_code: string
  footer_code: string
}

const SCRIPTS_FILE = path.join(process.cwd(), 'src', 'data', 'site-scripts.json')

let dbScriptsUnavailable = false

export async function getSiteScripts(): Promise<SiteScripts> {
  if (!dbScriptsUnavailable) {
    try {
      const { queryOne } = await import('./db')
      const row = await queryOne<{ head_code: string; body_code: string; footer_code: string }>(
        'SELECT head_code, body_code, footer_code FROM site_scripts WHERE id = 1'
      )
      if (row) {
        return {
          head_code: row.head_code || '',
          body_code: row.body_code || '',
          footer_code: row.footer_code || '',
        }
      }
    } catch {
      dbScriptsUnavailable = true
    }
  }

  try {
    if (fs.existsSync(SCRIPTS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SCRIPTS_FILE, 'utf-8'))
      return {
        head_code: data.head_code || '',
        body_code: data.body_code || '',
        footer_code: data.footer_code || '',
      }
    }
  } catch {}

  return {
    head_code: '',
    body_code: '',
    footer_code: '',
  }
}

export async function saveSiteScripts(scripts: SiteScripts): Promise<void> {
  try {
    const { query } = await import('./db')
    await query(`
      CREATE TABLE IF NOT EXISTS site_scripts (
        id INT PRIMARY KEY,
        head_code TEXT,
        body_code TEXT,
        footer_code TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    await query(
      `INSERT INTO site_scripts (id, head_code, body_code, footer_code)
       VALUES (1, ?, ?, ?)
       ON DUPLICATE KEY UPDATE head_code = VALUES(head_code), body_code = VALUES(body_code), footer_code = VALUES(footer_code)`,
      [scripts.head_code || '', scripts.body_code || '', scripts.footer_code || '']
    )
  } catch {}

  try {
    fs.writeFileSync(SCRIPTS_FILE, JSON.stringify(scripts, null, 2), 'utf-8')
  } catch (err) {
    console.error('Failed to write site scripts to file:', err)
  }
}
