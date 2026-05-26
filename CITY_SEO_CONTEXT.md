# City SEO Pages — Programmatic Location Feature Context

## Goal

Generate hundreds of unique SEO landing pages for US cities automatically from a single Excel spreadsheet. Each city gets its own URL and unique text. No manual page creation needed.

**Example output:**
- `yourdomain.com/seo/new-york` → shows "The #1 SEO agency for brands in **New York**."
- `yourdomain.com/seo/chicago` → shows "The #1 SEO agency for brands in **Chicago**."
- `yourdomain.com/seo/los-angeles` → shows "The #1 SEO agency for brands in **Los Angeles**."

---

## Status: Infrastructure Built, Excel File Pending

The code is fully written and deployed. The **only missing piece** is the actual `cities.xlsx` file. The user has a spreadsheet with many US cities but has not yet confirmed the column names. Ask for the column names before assuming anything.

---

## How It Works (3 Files)

### File 1: `src/lib/excel.ts`
The data bridge. Reads the Excel file at build time (or request time in dev).

```typescript
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface CityData {
  slug: string;
  cityName: string;
  state: string;
  heroTitle?: string;
  heroSub?: string;
  aboutText?: string;
  [key: string]: any;
}

export function getCities(): CityData[] {
  const filePath = path.join(process.cwd(), 'data/cities.xlsx');
  if (!fs.existsSync(filePath)) return [];
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
}

export function getCityBySlug(slug: string): CityData | undefined {
  return getCities().find(c => c.slug === slug);
}
```

- File path: `data/cities.xlsx` (relative to project root `d:\Ideas\Agency\data\cities.xlsx`)
- Returns empty array if file doesn't exist (safe fallback, build won't break)
- `xlsx` npm package is already installed

### File 2: `src/app/seo/[city]/page.tsx`
The dynamic page template. One file handles all cities.

```typescript
export async function generateStaticParams() {
  const cities = getCities()
  return cities.map((city) => ({ city: city.slug }))
}

export default async function CitySeoPage({ params }) {
  const city = getCityBySlug(slug)
  if (!city) notFound()
  // renders full page with city-specific text
}
```

**What changes per city:**
| Element | Source |
|---|---|
| Topbar announcement text | `city.cityName` |
| Hero eyebrow label | `city.cityName + city.state` |
| Hero H1 title | `city.heroTitle` (or auto-generated fallback) |
| Hero lede paragraph | `city.heroSub` (or auto-generated fallback) |
| CTA heading | `city.cityName` |
| CTA body text | `city.cityName` |

**What stays the same per city:** Logos, Stats, Services, AI Block, Marquee, Process, Cases, Testimonials, WhyUs sections — all static.

### File 3: `src/app/sections/Hero.tsx`
The Hero component was updated to accept optional props:

```typescript
export default function HeroSection({
  title,
  eyebrow = "Global SEO Studio · 2014→2026",
  lede
}: {
  title?: React.ReactNode,
  eyebrow?: string,
  lede?: string
}) { ... }
```

- When called from homepage (`/`): no props passed → uses default text
- When called from city page (`/seo/new-york`): city-specific props injected

---

## Excel File Requirements

**File location**: `d:\Ideas\Agency\data\cities.xlsx`

**Current assumed column structure** (user has NOT confirmed this — ask them):

| Column Name | Required | Example Value | Description |
|---|---|---|---|
| `slug` | YES | `new-york` | Becomes the URL. Lowercase, hyphens only, no spaces |
| `cityName` | YES | `New York` | Display name used in headings and CTAs |
| `state` | YES | `NY` | State code used in eyebrow label |
| `heroTitle` | optional | `<em>Dominate</em> New York search results` | Custom H1. Can contain HTML. Falls back to auto-generated if empty |
| `heroSub` | optional | `We help New York businesses...` | Custom lede paragraph. Falls back to auto-generated if empty |

**If user's Excel has different column names**, update the `CityData` interface in `src/lib/excel.ts` and the references in `src/app/seo/[city]/page.tsx` to match.

---

## Auto-Generated Fallback Text

If `heroTitle` and `heroSub` columns are empty or missing, the page auto-generates:

**H1:**
```
The #1 SEO agency
for brands in
[cityName].
```

**Lede:**
```
We help [cityName]-based businesses dominate their local and national search results
with precision SEO, editorial content, and AI-driven optimization.
```

**CTA:**
```
Get a free 30-minute SEO audit of your [cityName] business. No deck, no fluff —
a real strategist, looking at your real site, telling you the three things to fix first.
```

This means you can have an Excel with just `slug`, `cityName`, `state` columns and the site will still produce 100% unique, city-specific pages.

---

## Build Behavior

When `npm run build` runs on Vercel:

1. `generateStaticParams()` reads the entire Excel file
2. For each row it creates a static HTML page at `/seo/[slug]`
3. If Excel has 500 cities → 500 static pages are generated automatically
4. Each page has unique H1, unique meta content, unique URL — perfect for local SEO

**Important**: After updating the Excel file, you must redeploy (push to `main` on GitHub) for new cities to appear. The Excel is read at **build time**, not at runtime.

---

## To Activate (Steps for user)

1. Drop `cities.xlsx` into `d:\Ideas\Agency\data\`
2. Make sure Excel column names match what `src/lib/excel.ts` expects
3. Commit and push: `git add -A; git commit -m "add cities data"; git push origin main`
4. Vercel will auto-build and generate all city pages
5. Visit `yourdomain.com/seo/[any-slug-from-excel]` to verify

---

## What the Next Agent Should Do

1. **Ask user for their Excel column names** — this is the critical unknown
2. Update `CityData` interface in `src/lib/excel.ts` to match actual columns
3. Update `src/app/seo/[city]/page.tsx` to use the actual column names
4. Optionally add more dynamic sections (e.g. custom testimonials per city, custom services per city) by adding more columns to Excel and more props to the relevant section components
5. Add `generateMetadata()` to `src/app/seo/[city]/page.tsx` for proper per-city `<title>` and `<meta description>` tags — this is not done yet and is important for SEO

---

## Missing: SEO Metadata (Not Yet Done)

The city pages currently do not set `<title>` or `<meta description>` per city. This must be added:

```typescript
export async function generateMetadata({ params }) {
  const { city: slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}
  return {
    title: `SEO Agency in ${city.cityName}, ${city.state} | We Strive Design`,
    description: `Top-rated SEO agency serving ${city.cityName}. Get more traffic, leads, and revenue with our proven local SEO strategies.`,
  }
}
```

Add this function to `src/app/seo/[city]/page.tsx` before `export default`.
