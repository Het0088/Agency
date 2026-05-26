import * as XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'

export interface CityData {
  slug: string
  cityName: string
  state: string
  heroTitle?: string
  heroSub?: string
  aboutText?: string
  [key: string]: string | undefined
}

const DATA_DIR = path.join(process.cwd(), 'data')
const VALID_EXT = ['.xlsx', '.csv', '.xls']

function findCityFiles(): string[] {
  if (!fs.existsSync(DATA_DIR)) return []
  return fs.readdirSync(DATA_DIR)
    .filter(f => f.startsWith('cities') && VALID_EXT.includes(path.extname(f).toLowerCase()))
    .map(f => path.join(DATA_DIR, f))
}

function readSheet(filePath: string): CityData[] {
  const buf = fs.readFileSync(filePath)
  const workbook = XLSX.read(buf, { type: 'buffer' })
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  return XLSX.utils.sheet_to_json(worksheet)
}

let cache: CityData[] | null = null
let cacheTime = 0
const TTL = 30_000

export function getCities(): CityData[] {
  if (cache && Date.now() - cacheTime < TTL) return cache

  const files = findCityFiles()
  if (!files.length) return []

  const all: CityData[] = []
  const seen = new Set<string>()

  for (const file of files) {
    const rows = readSheet(file)
    for (const row of rows) {
      if (row.slug && row.cityName && !seen.has(row.slug)) {
        seen.add(row.slug)
        all.push(row)
      }
    }
  }

  cache = all
  cacheTime = Date.now()
  return cache
}

export function getCityBySlug(slug: string): CityData | undefined {
  return getCities().find(c => c.slug === slug)
}
