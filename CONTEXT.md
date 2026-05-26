# Agency Website — Full Development Context

## Project Overview

- **Repo**: `d:\Ideas\Agency` / GitHub: `Het0088/Agency`
- **Live URL**: `https://kyure.vercel.app/` (Preview deployments go here)
- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **Language**: TypeScript + React 19
- **Styling**: Vanilla CSS (`src/app/globals.css`) — no Tailwind
- **Deployment**: Vercel (branch: `main`)

---

## Design System

- **Font**: Instrument Serif (display), Geist (body), Geist Mono (labels)
- **Accent color**: `#ff5a1f` (ember orange)
- **Background**: white / cream surface `#faf7f0` / dark `#0e1410`
- **Key pattern**: `.reveal` class sets `opacity: 0` on elements. JS adds `.in` class when element enters viewport. If `.in` is never added, content is invisible.

---

## Directory Structure

```
d:\Ideas\Agency\
├── data/                    ← Put cities.xlsx here
├── src/
│   ├── app/
│   │   ├── page.tsx         ← Homepage
│   │   ├── layout.tsx       ← Global layout (wraps RevealProvider)
│   │   ├── globals.css      ← All styles (~67KB)
│   │   ├── about/
│   │   ├── contact/
│   │   │   ├── page.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts ← Email handler (Nodemailer)
│   │   ├── sections/        ← Homepage sections (Hero, Stats, etc.)
│   │   │   └── Hero.tsx     ← Now accepts props for dynamic content
│   │   └── seo/
│   │       └── [city]/
│   │           └── page.tsx ← Dynamic city SEO pages
│   ├── components/
│   │   ├── RevealProvider.tsx  ← Scroll animation engine
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── BigCta.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── Topbar.tsx
│   │   └── Icons.tsx
│   └── lib/
│       └── excel.ts         ← Reads data/cities.xlsx
├── next.config.ts
├── package.json
└── .env.local               ← SMTP credentials (never commit)
```

---

## Key Files — Current State

### `src/components/RevealProvider.tsx`
Handles scroll-reveal animations and counter animations globally.
- Uses `IntersectionObserver` to add `.in` to `.reveal` elements
- Calls `observeAll()` + `requestAnimationFrame(observeAll)` + `setTimeout(observeAll, 150)` to handle elements already in viewport on load (critical for production/Vercel)
- Uses `usePathname` as dependency so observers re-init on route changes
- Second `useEffect` handles `[data-count]` elements with easing animation
- Both effects depend on `[pathname]`

### `src/app/api/contact/route.ts`
Contact form API endpoint using **Nodemailer** (NOT Resend — removed).
- SMTP config via env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- Destination: `NOTIFY_EMAIL` env var
- Rate limiting: 3 requests per IP per 60 seconds, in-memory Map
- Bot protection: timing check via `_t` field (client sends `Date.now()` at page load; if elapsed < 2000ms, it's a bot). No hidden honeypot fields — they caused autofill issues with Chrome/university email autofill.
- Input sanitization: strips `<>`, max 2000 chars
- Email validation via regex

### `src/app/contact/ContactForm.tsx`
- `loadedAt = useRef(Date.now())` — set at component mount
- Sends `_t: loadedAt.current` in payload for bot timing check
- No hidden honeypot field (intentionally removed)
- Budget is a chip selector (not a form field), passed directly in payload

### `next.config.ts`
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
};
export default nextConfig;
```
Note: `turbopack` is a **top-level key** in Next.js 16, NOT under `experimental`. Do not move it into `experimental.turbo` — that causes a TypeScript build error.

### `src/lib/excel.ts`
Reads `data/cities.xlsx` using the `xlsx` npm package.
- `getCities()` returns all rows as `CityData[]`
- `getCityBySlug(slug)` finds a row by slug field
- Returns `[]` gracefully if file doesn't exist yet

### `src/app/seo/[city]/page.tsx`
Dynamic city SEO pages.
- `generateStaticParams()` reads Excel at build time, generates one page per city row
- Page uses `HeroSection` with city-specific `eyebrow`, `title`, `lede` props
- Falls back to generic text if optional columns are empty
- Returns `notFound()` if slug doesn't match any Excel row

### `src/app/sections/Hero.tsx`
Now accepts optional props:
```ts
{ title?: React.ReactNode, eyebrow?: string, lede?: string }
```
Falls back to default homepage content if props are not provided.

---

## Environment Variables

### `.env.local` (local dev — never commit)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hetpatel2220087607@gmail.com
SMTP_PASS="vupo eczu ptgl jszs"
NOTIFY_EMAIL=hetpatel222008@gmail.com
```

**Critical**: `SMTP_PASS` contains spaces (Gmail App Password format). Must be quoted in `.env.local`.

### Vercel Environment Variables
Same keys must be set in Vercel dashboard under Settings → Environment Variables for the production deployment to work.

---

## Vercel Deployment — Known Issues

1. **Production vs Preview mismatch**: New commits to `main` were creating Preview deployments instead of Production. The Production deployment was from an older manual redeploy. Fix: Go to Vercel → Settings → Git → verify Production Branch is `main`. Promote the latest preview to Production if needed.

2. **Turbopack lockfile warning** (local only): `D:\Ideas\` parent directory has a `package-lock.json`. This makes Turbopack think it's the workspace root. Fixed by `turbopack.root: __dirname` in `next.config.ts`.

3. **`.next` cache corruption**: If the dev server crashes (OOM), the `.next` folder gets corrupted. Fix: kill all Node processes, then `Remove-Item -Recurse -Force .next`, then `npm run dev`.

---

## npm Package Notes

- `xlsx` — already installed, used for Excel parsing
- `nodemailer` + `@types/nodemailer` — installed, replaces `resend`
- `resend` — still in `package.json` but no longer used in code

---

## City SEO Pages — Next Steps (Pending)

The infrastructure is built. User needs to:
1. Provide the Excel file format (column names from their spreadsheet)
2. Drop `cities.xlsx` into `d:\Ideas\Agency\data/`
3. The code will automatically read it, create `/seo/[slug]` pages for every row, and inject city-specific text into the Hero, Topbar eyebrow, and CTA

### Current expected Excel columns:
| Column | Required | Purpose |
|---|---|---|
| `slug` | Yes | URL segment (e.g. `new-york` → `/seo/new-york`) |
| `cityName` | Yes | Display name (e.g. `New York`) |
| `state` | Yes | State code for eyebrow (e.g. `NY`) |
| `heroTitle` | No | Custom H1 HTML (can use `<em>` for orange italic) |
| `heroSub` | No | Custom lede paragraph |

**User said their Excel has a different format** — they were about to share it when the session ended. Ask them for the column names before making assumptions.

---

## Rules / Conventions

- No comments in code
- No emojis in code
- Human-like variable/function names
- PowerShell on Windows — use `;` not `&&` to chain commands
- Do not use `&&` in PowerShell — it causes parse errors
