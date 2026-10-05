'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { defaultContent } from '@/lib/content-blocks'
import './admin.css'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })

// ─── TYPES ────────────────────────────────────────────────────────
type Post = {
  id: string
  type: 'article' | 'blog'
  tag: string
  title: string
  description: string
  content: string
  author: string
  read_time: string
  slug: string
  cover_gradient: string
  featured: number
  published: number
  created_at: string
  updated_at: string
}

type FormData = {
  id: string
  type: 'article' | 'blog'
  tag: string
  title: string
  description: string
  content: string
  author: string
  read_time: string
  slug: string
  cover_gradient: string
  featured: boolean
  published: boolean
}

type CityRecord = {
  slug: string
  city_name: string
  state: string
  country: string
  service: string
  active: boolean
  created_at?: string
  updated_at?: string
}

type LivePage = {
  route: string
  label: string
  filePath: string
  note: string | null
  title: string
  description: string
  canonical: string
  og_title: string
  og_description: string
  og_image: string
  saved: boolean
}

type Lead = {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  website?: string | null
  service?: string | null
  budget?: string | null
  message?: string | null
  status: 'new' | 'contacted' | 'archived'
  created_at: string
}

type MediaItem = {
  filename: string
  url: string
}

type GlossaryTerm = {
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

const emptyGlossaryTerm: GlossaryTerm = {
  id: '',
  title: '',
  slug: '',
  letter: 'A',
  category: 'AI Search',
  shortDef: '',
  synonyms: '',
  content: '',
  related: [],
  autoLink: true,
  published: true,
  updatedAt: '',
}

type Toast = {
  id: number
  msg: string
  type: 'ok' | 'err'
}

const emptyForm: FormData = {
  id: '', type: 'article', tag: '', title: '', description: '',
  content: '', author: 'GENRANQ Team', read_time: '5 min read', slug: '', cover_gradient: 'g1',
  featured: false, published: true,
}


const PAGE_LABELS: Record<string, string> = {
  '/': 'Homepage',
  '/about': 'About Us',
  '/contact': 'Contact Us',
  '/our-team': 'Our Team',
  '/resources/publications': 'Publications & Research',
  '/services': 'Services Hub',
  '/services/seo': 'SEO Services',
  '/services/seo/technical-seo': 'Technical SEO',
  '/services/ai-search': 'AI Search & GEO',
  '/services/content-marketing': 'Content Marketing',
  '/services/link-building': 'Link Building',
  '/services/ppc': 'PPC / Paid Ads',
  '/services/social-media': 'Social Media',
  '/services/analytics': 'Analytics & Tracking',
  '/services/web-design': 'Web Design & CRO',
  '/insights': 'Insights Hub',
}

// ─── LOGO MARK (MATCHING REFERENCE) ───────────────────────────────
function LogoMark({ light = false, size = 32 }: { light?: boolean; size?: number }) {
  const ink = light ? '#E8E6E0' : '#121613'
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <path d="M40 12 A24 24 0 1 0 50 44" fill="none" stroke={ink} strokeWidth="7" />
      <path d="M38 23 A13 13 0 1 0 44 42" fill="none" stroke="#FF5A1F" strokeWidth="6" />
      <path d="M30 34 H46 V40 H36" fill="none" stroke={ink} strokeWidth="5" />
      <path d="M36 24 L54 11" stroke="#FF5A1F" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

// ─── LOGIN SCREEN ──────────────────────────────────────────────────
function LoginScreen() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      window.location.reload()
    } else {
      setError('Invalid password. Please check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="adm">
      <div className="login">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="brand dark" style={{ padding: '0 0 14px', borderBottom: '1px solid #E6E0D2' }}>
            <LogoMark size={36} />
            <div>
              <b>GENRANQ</b>
              <small style={{ color: '#6B6F6A' }}>CMS PORTAL</small>
            </div>
          </div>
          <h1 style={{ marginTop: 6, fontSize: 26 }}>Welcome back</h1>
          <p className="muted small" style={{ marginBottom: 8 }}>
            Enter your admin key to access the content and SEO dashboard.
          </p>

          <div className="field">
            <label className="lbl" htmlFor="adm-pass">Master Password</label>
            <input
              id="adm-pass"
              className="inp"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoFocus
              required
            />
          </div>

          {error && <div className="err" style={{ background: '#FFF6F6', padding: '8px 12px', borderRadius: 8 }}>{error}</div>}

          <button type="submit" className="b b-primary full" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Authenticating...' : 'Sign in to Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── CHAR HINT HELPER ──────────────────────────────────────────────
function charHint(val: string, max: number, min = 0) {
  const len = (val || '').length
  if (len === 0) return { text: `0 / ${max}`, color: 'var(--a-muted)', state: 'empty' }
  if (min && len < min) return { text: `${len} / ${max} (aim for ${min}+)`, color: 'var(--a-amber)', state: 'warn' }
  if (len <= max) return { text: `${len} / ${max}`, color: 'var(--a-green)', state: 'ok' }
  return { text: `${len} / ${max} (+${len - max} over)`, color: 'var(--a-red)', state: 'bad' }
}

function timeAgo(dateInput?: string | number | Date | null): string {
  if (!dateInput) return 'just now'
  const time = typeof dateInput === 'object' ? dateInput.getTime() : new Date(dateInput).getTime()
  if (isNaN(time)) return 'just now'
  const diffSec = Math.max(0, Math.floor((Date.now() - time) / 1000))
  if (diffSec < 45) return 'just now'
  if (diffSec < 90) return '1 min ago'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin} min ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? 's' : ''} ago`
  const diffDays = Math.floor(diffHr / 24)
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  return new Date(time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function scoreColor(score: number): string {
  if (score >= 80) return '#1F9D55'
  if (score >= 50) return '#C98A00'
  return '#D64545'
}

type SeoCheck = {
  label: string
  status: 'good' | 'warn' | 'bad'
  tip: string
}

function calculatePostSeo(post: FormData): { score: number; checks: SeoCheck[] } {
  const checks: SeoCheck[] = []
  let score = 0

  // 1. Meta title length (recommended: 40-60 chars)
  const titleLen = (post.title || '').trim().length
  if (titleLen >= 40 && titleLen <= 65) {
    score += 20
    checks.push({ label: `Meta title length (${titleLen} chars)`, status: 'good', tip: 'Optimal length between 40 and 65 characters' })
  } else if (titleLen > 0 && titleLen < 40) {
    score += 10
    checks.push({ label: `Meta title length (${titleLen} chars)`, status: 'warn', tip: 'A bit short. Aim for 40-60 characters for better CTR' })
  } else if (titleLen > 65) {
    score += 10
    checks.push({ label: `Meta title length (${titleLen} chars)`, status: 'warn', tip: 'Over 65 chars, Google may truncate it in search results' })
  } else {
    checks.push({ label: 'Meta title missing', status: 'bad', tip: 'Add a compelling title to rank on Google' })
  }

  // 2. Meta description length (recommended: 120-160 chars)
  const descLen = (post.description || '').trim().length
  if (descLen >= 120 && descLen <= 165) {
    score += 20
    checks.push({ label: `Meta description length (${descLen} chars)`, status: 'good', tip: 'Optimal length for search snippets (120-165 chars)' })
  } else if (descLen >= 50 && descLen < 120) {
    score += 12
    checks.push({ label: `Meta description length (${descLen} chars)`, status: 'warn', tip: 'Aim for 120-160 chars to maximize SERP snippet real estate' })
  } else if (descLen > 165) {
    score += 12
    checks.push({ label: `Meta description length (${descLen} chars)`, status: 'warn', tip: 'Longer than 165 chars; Google will truncate with an ellipsis' })
  } else {
    checks.push({ label: 'Meta description missing', status: 'bad', tip: 'Add a summary so Google does not pick random text' })
  }

  // 3. Clean search slug
  const slug = (post.slug || '').trim()
  if (slug && /^\/insights\/[a-z0-9-]+$/.test(slug)) {
    score += 15
    checks.push({ label: 'Clean search-friendly URL slug', status: 'good', tip: 'Lowercase with hyphens, ideal for indexing' })
  } else if (slug) {
    score += 8
    checks.push({ label: 'URL slug format', status: 'warn', tip: 'Ensure slug starts with /insights/ and uses lowercase letters' })
  } else {
    checks.push({ label: 'URL slug missing', status: 'bad', tip: 'Slug is required for post URL routing' })
  }

  // 4. Content body word count
  const rawText = (post.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = rawText ? rawText.split(' ').filter(Boolean).length : 0
  if (words >= 300) {
    score += 20
    checks.push({ label: `Content depth (${words} words)`, status: 'good', tip: 'Good in-depth content (300+ words)' })
  } else if (words >= 80) {
    score += 10
    checks.push({ label: `Content depth (${words} words)`, status: 'warn', tip: 'Content is short. In-depth articles (300+ words) rank higher' })
  } else {
    checks.push({ label: 'Thin or empty content', status: 'bad', tip: 'Add substantive paragraphs and insights for Google indexing' })
  }

  // 5. Headings (H2 / H3 tags)
  const hasHeadings = /<h[2-4][^>]*>/i.test(post.content || '')
  if (hasHeadings) {
    score += 15
    checks.push({ label: 'Semantic sub-headings (H2/H3)', status: 'good', tip: 'Proper heading hierarchy found in content' })
  } else {
    checks.push({ label: 'Semantic sub-headings missing', status: 'warn', tip: 'Break up content with H2 and H3 tags for readability and SEO' })
  }

  // 6. Category / Tag
  if ((post.tag || '').trim()) {
    score += 10
    checks.push({ label: `Categorized as “${post.tag}”`, status: 'good', tip: 'Enables topical clustering & internal navigation' })
  } else {
    checks.push({ label: 'Category / Tag missing', status: 'warn', tip: 'Assign a topic or category tag for topical authority' })
  }

  return { score: Math.min(100, score), checks }
}

// ─── MAIN ADMIN DASHBOARD ──────────────────────────────────────────
export default function AdminDashboard({ authenticated }: { authenticated: boolean }) {
  const [view, setView] = useState<'dashboard' | 'posts' | 'glossary' | 'content' | 'seo' | 'cities' | 'leads' | 'media' | 'settings' | 'system'>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  // Posts State
  const [posts, setPosts] = useState<Post[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsFilter, setPostsFilter] = useState<'all' | 'article' | 'blog'>('all')
  const [postsSearch, setPostsSearch] = useState('')
  const [postMode, setPostMode] = useState<'list' | 'edit'>('list')
  const [editingPost, setEditingPost] = useState<FormData>(emptyForm)
  const [postDirty, setPostDirty] = useState(false)
  const [postLastSaved, setPostLastSaved] = useState<Date | string | null>(null)
  const [, setLiveTick] = useState(0)

  // Live timer tick every 10 seconds so "Saved X min ago" updates live in real-time
  useEffect(() => {
    const timer = setInterval(() => setLiveTick(t => t + 1), 10000)
    return () => clearInterval(timer)
  }, [])

  // Glossary State
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([])
  const [glossaryLoading, setGlossaryLoading] = useState(true)
  const [glossarySearch, setGlossarySearch] = useState('')
  const [glossaryLetter, setGlossaryLetter] = useState<string | null>(null)
  const [editingGlossaryTerm, setEditingGlossaryTerm] = useState<GlossaryTerm | null>(null)

  // SEO State
  const [seoPages, setSeoPages] = useState<LivePage[]>([])
  const [seoLoading, setSeoLoading] = useState(true)
  const [seoSearch, setSeoSearch] = useState('')
  const [openSeoRoute, setOpenSeoRoute] = useState<string | null>(null)

  // Content Blocks State
  const [contentBlocks, setContentBlocks] = useState<Record<string, Record<string, string>>>({})
  const [savedContentBlocks, setSavedContentBlocks] = useState<Record<string, Record<string, string>>>({})
  const [selectedContentPage, setSelectedContentPage] = useState<string>('/')
  const [contentSearch, setContentSearch] = useState('')
  const [contentLoading, setContentLoading] = useState(true)
  const [contentUploadingKey, setContentUploadingKey] = useState<string | null>(null)

  // Cities State
  const [cities, setCities] = useState<CityRecord[]>([])
  const [citiesLoading, setCitiesLoading] = useState(true)
  const [citySearch, setCitySearch] = useState('')
  const [editingCity, setEditingCity] = useState<CityRecord | null | 'new'>(null)
  const [uploadingCities, setUploadingCities] = useState(false)

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadsLoading, setLeadsLoading] = useState(true)
  const [leadsFilter, setLeadsFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all')
  const [leadsSearch, setLeadsSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Media State
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([])
  const [mediaSearch, setMediaSearch] = useState('')
  const [mediaUploading, setMediaUploading] = useState(false)

  // DB Connection Warning
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; message: string }>({ connected: true, message: '' })

  const notify = useCallback((msg: string, type: 'ok' | 'err' = 'ok') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), type === 'err' ? 5000 : 3000)
  }, [])

  // ─── FETCH DATA ──────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    setPostsLoading(true)
    try {
      const res = await fetch('/api/admin/posts?drafts=1')
      const data = await res.json()
      if (res.status === 503) {
        setDbStatus({ connected: false, message: data.error || 'Database not connected' })
      } else {
        setPosts(data.items || [])
      }
    } catch {
      setDbStatus({ connected: false, message: 'Could not connect to database server' })
    }
    setPostsLoading(false)
  }, [])

  const fetchSeo = useCallback(async () => {
    setSeoLoading(true)
    try {
      const res = await fetch('/api/admin/meta')
      const data = await res.json()
      if (data.pages) setSeoPages(data.pages)
    } catch {
      // ignore
    }
    setSeoLoading(false)
  }, [])

  const fetchContent = useCallback(async () => {
    setContentLoading(true)
    try {
      const res = await fetch('/api/admin/content')
      const data = await res.json()
      if (data.blocks) {
        setContentBlocks(data.blocks)
        setSavedContentBlocks(JSON.parse(JSON.stringify(data.blocks)))
      }
    } catch {
      // ignore
    }
    setContentLoading(false)
  }, [])

  const fetchCities = useCallback(async () => {
    setCitiesLoading(true)
    try {
      const res = await fetch('/api/admin/cities')
      const data = await res.json()
      setCities(data.cities || [])
    } catch {
      // ignore
    }
    setCitiesLoading(false)
  }, [])

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true)
    try {
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      setLeads(data.leads || [])
    } catch {
      // ignore
    }
    setLeadsLoading(false)
  }, [])

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/upload')
      const data = await res.json()
      if (data.files) setMediaFiles(data.files)
    } catch {
      // ignore
    }
  }, [])

  const fetchGlossary = useCallback(async () => {
    setGlossaryLoading(true)
    try {
      const res = await fetch('/api/admin/glossary')
      const data = await res.json()
      if (data.terms) setGlossaryTerms(data.terms)
    } catch {
      // ignore
    }
    setGlossaryLoading(false)
  }, [])

  useEffect(() => {
    if (authenticated) {
      fetchPosts()
      fetchGlossary()
      fetchSeo()
      fetchContent()
      fetchCities()
      fetchLeads()
      fetchMedia()
    }
  }, [authenticated, fetchPosts, fetchGlossary, fetchSeo, fetchContent, fetchCities, fetchLeads, fetchMedia])

  if (!authenticated) return <LoginScreen />

  // Quick Action Handlers
  function handleQuickNewPost() {
    setEditingPost(emptyForm)
    setPostDirty(false)
    setPostLastSaved(null)
    setPostMode('edit')
    setView('posts')
    setMobileMenuOpen(false)
  }

  function handleOpenEditPost(post: Post) {
    setEditingPost({
      id: post.id,
      type: post.type,
      tag: post.tag,
      title: post.title,
      description: post.description || '',
      content: post.content || '',
      author: post.author,
      read_time: post.read_time,
      slug: post.slug,
      cover_gradient: post.cover_gradient,
      featured: !!post.featured,
      published: !!post.published,
    })
    setPostDirty(false)
    setPostLastSaved(post.updated_at || post.created_at || new Date())
    setPostMode('edit')
  }

  async function handleDuplicatePost(post: FormData | Post) {
    const copyTitle = `${post.title || 'Untitled'} (Copy)`
    const copySlug = `/insights/${(post.slug || 'copy').replace(/^\/insights\//, '').replace(/[^a-z0-9-]+/gi, '')}-${Date.now().toString().slice(-4)}`
    const newDoc: FormData = {
      id: '',
      type: (post.type as 'article' | 'blog') || 'article',
      tag: post.tag || '',
      title: copyTitle,
      description: post.description || '',
      content: post.content || '',
      author: post.author || 'Gen Ranq Team',
      read_time: post.read_time || '5 min read',
      slug: copySlug,
      cover_gradient: post.cover_gradient || 'g1',
      featured: false,
      published: false,
    }

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newDoc,
          featured: 0,
          published: false,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        notify('Post duplicated as draft ✓')
        setEditingPost({ ...newDoc, id: data.id || '' })
        setPostDirty(false)
        setPostLastSaved(new Date())
        setPostMode('edit')
        await fetchPosts()
      } else {
        notify('Failed to duplicate post', 'err')
      }
    } catch {
      notify('Network error duplicating post', 'err')
    }
  }

  function handleQuickNewGlossaryTerm() {
    setEditingGlossaryTerm(emptyGlossaryTerm)
    setView('glossary')
    setMobileMenuOpen(false)
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    window.location.reload()
  }

  // ─── GLOSSARY HANDLERS ───────────────────────────────────────────
  async function handleSaveGlossaryTerm(term: GlossaryTerm) {
    const isNew = !term.id
    const method = isNew ? 'POST' : 'PUT'
    try {
      const res = await fetch('/api/admin/glossary', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(term),
      })
      if (res.ok) {
        notify(isNew ? 'New glossary term created!' : 'Glossary term updated!')
        setEditingGlossaryTerm(null)
        fetchGlossary()
      } else {
        const err = await res.json()
        notify(err.error || 'Failed to save glossary term', 'err')
      }
    } catch {
      notify('Network error saving glossary term', 'err')
    }
  }

  async function handleDeleteGlossaryTerm(id: string) {
    if (!confirm('Are you sure you want to delete this glossary term?')) return
    try {
      const res = await fetch('/api/admin/glossary', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        notify('Glossary term deleted')
        fetchGlossary()
      } else {
        notify('Failed to delete term', 'err')
      }
    } catch {
      notify('Error deleting glossary term', 'err')
    }
  }

  async function handleToggleGlossaryAutoLink(term: GlossaryTerm) {
    try {
      const res = await fetch('/api/admin/glossary', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...term, autoLink: !term.autoLink }),
      })
      if (res.ok) {
        notify(`Auto-link set to ${!term.autoLink ? 'Enabled' : 'Disabled'}`)
        fetchGlossary()
      }
    } catch {
      notify('Failed to update auto-link', 'err')
    }
  }

  async function handleDeleteMedia(filename: string) {
    if (!confirm(`Are you sure you want to permanently delete "${filename}"?`)) return
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      })
      if (res.ok) {
        notify('Image deleted from server')
        setMediaFiles(prev => prev.filter(f => f.filename !== filename))
      } else {
        notify('Failed to delete image', 'err')
      }
    } catch {
      notify('Error deleting image', 'err')
    }
  }

  // ─── POSTS HANDLERS ──────────────────────────────────────────────
  async function handleSavePost(data: FormData, stayInEditor = false, overridePublished?: boolean) {
    const isEdit = !!data.id
    const method = isEdit ? 'PUT' : 'POST'
    const targetPublished = overridePublished !== undefined ? overridePublished : data.published
    const payload = {
      ...data,
      published: targetPublished,
      featured: data.featured ? 1 : 0,
    }

    try {
      const res = await fetch('/api/admin/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const resData = await res.json()
        const newId = resData.id || data.id
        notify(overridePublished === false ? 'Post unpublished (saved as draft)' : isEdit ? 'Post updated successfully ✓' : 'New post published successfully ✓')
        setPostDirty(false)
        setPostLastSaved(new Date())

        if (stayInEditor) {
          setEditingPost(p => ({ ...p, id: newId, published: targetPublished }))
        } else {
          setPostMode('list')
          setEditingPost(emptyForm)
        }
        await fetchPosts()
      } else {
        const err = await res.json()
        notify(err.error || 'Failed to save post', 'err')
      }
    } catch {
      notify('Network error saving post', 'err')
    }
  }

  async function handleDeletePost(id: string) {
    if (!confirm('Are you sure you want to permanently delete this post?')) return
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        notify('Post deleted')
        fetchPosts()
      } else {
        notify('Failed to delete post', 'err')
      }
    } catch {
      notify('Network error', 'err')
    }
  }

  async function handleTogglePublish(post: Post) {
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, published: !post.published }),
      })
      if (res.ok) {
        notify(`Post set to ${!post.published ? 'Published' : 'Draft'}`)
        fetchPosts()
      }
    } catch {
      notify('Failed to update status', 'err')
    }
  }

  // ─── SEO HANDLERS ────────────────────────────────────────────────
  async function handleSaveSeo(page: LivePage) {
    try {
      const res = await fetch('/api/admin/meta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page),
      })
      if (res.ok) {
        notify(`SEO for ${page.route} saved`)
        setSeoPages(ps => ps.map(p => p.route === page.route ? { ...page, saved: true } : p))
      } else {
        notify('Failed to save SEO meta', 'err')
      }
    } catch {
      notify('Error saving SEO', 'err')
    }
  }

  async function handleResetSeo(route: string) {
    if (!confirm(`Reset ${route} SEO to code defaults?`)) return
    try {
      const res = await fetch('/api/admin/meta', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route }),
      })
      if (res.ok) {
        notify('Reset to default')
        fetchSeo()
      }
    } catch {
      notify('Reset failed', 'err')
    }
  }

  // ─── CONTENT HANDLERS ────────────────────────────────────────────
  async function handleSaveContent(page: string) {
    const pageBlocks = contentBlocks[page] || {}
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, blocks: pageBlocks }),
      })
      if (res.ok) {
        notify(`Content for ${PAGE_LABELS[page] || page} saved!`)
        setSavedContentBlocks(prev => ({
          ...prev,
          [page]: { ...pageBlocks }
        }))
      } else {
        notify('Failed to save content', 'err')
      }
    } catch {
      notify('Error saving content', 'err')
    }
  }

  // ─── LEADS HANDLERS ──────────────────────────────────────────────
  async function handleUpdateLeadStatus(id: string, status: Lead['status']) {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        notify(`Lead status updated to ${status}`)
        setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l))
      }
    } catch {
      notify('Failed to update lead', 'err')
    }
  }

  async function handleDeleteLead(id: string) {
    if (!confirm('Delete this inquiry?')) return
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        notify('Inquiry deleted')
        setLeads(ls => ls.filter(l => l.id !== id))
        if (selectedLead?.id === id) setSelectedLead(null)
      }
    } catch {
      notify('Failed to delete lead', 'err')
    }
  }

  function handleExportLeadsCsv() {
    if (!leads.length) {
      notify('No leads to export', 'err')
      return
    }
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Website', 'Service', 'Budget', 'Status', 'Date', 'Message']
    const rows = leads.map(l => [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      l.status,
      l.created_at,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `genranq-leads-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    notify('Leads exported as CSV')
  }

  // ─── MEDIA UPLOAD HANDLER ─────────────────────────────────────────
  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setMediaUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        notify('Image uploaded successfully!')
        setMediaFiles(mf => [{ filename: data.filename, url: data.url }, ...mf])
      } else {
        notify(data.error || 'Upload failed', 'err')
      }
    } catch {
      notify('Upload request failed', 'err')
    }
    setMediaUploading(false)
    e.target.value = ''
  }

  // ─── CONTENT BLOCK IMAGE UPLOAD HANDLER ──────────────────────────
  async function handleContentImageUpload(file: File, blockKey: string, pageRoute: string) {
    if (!file) return
    setContentUploadingKey(blockKey)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setContentBlocks(prev => ({
          ...prev,
          [pageRoute]: {
            ...(prev[pageRoute] || {}),
            [blockKey]: data.url
          }
        }))
        setMediaFiles(mf => [{ filename: data.filename, url: data.url }, ...mf])
        notify('Image uploaded and set successfully!')
      } else {
        notify(data.error || 'Upload failed', 'err')
      }
    } catch {
      notify('Upload request failed', 'err')
    }
    setContentUploadingKey(null)
  }

  // ─── DERIVED METRICS ──────────────────────────────────────────────
  const newLeadsCount = leads.filter(l => l.status === 'new').length
  const articleCount = posts.filter(p => p.type === 'article').length
  const blogCount = posts.filter(p => p.type === 'blog').length
  const draftCount = posts.filter(p => !p.published).length

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchType = postsFilter === 'all' || p.type === postsFilter
      const matchSearch = !postsSearch || p.title.toLowerCase().includes(postsSearch.toLowerCase()) || p.tag.toLowerCase().includes(postsSearch.toLowerCase())
      return matchType && matchSearch
    })
  }, [posts, postsFilter, postsSearch])

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchStatus = leadsFilter === 'all' || l.status === leadsFilter
      const matchSearch = !leadsSearch ||
        l.name.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        l.email.toLowerCase().includes(leadsSearch.toLowerCase()) ||
        (l.company && l.company.toLowerCase().includes(leadsSearch.toLowerCase()))
      return matchStatus && matchSearch
    })
  }, [leads, leadsFilter, leadsSearch])

  const filteredGlossaryTerms = useMemo(() => {
    return glossaryTerms.filter(t => {
      const matchSearch = !glossarySearch ||
        t.title.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        t.shortDef.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        (t.synonyms && t.synonyms.toLowerCase().includes(glossarySearch.toLowerCase()))
      const firstLetter = (t.title[0] || 'A').toUpperCase()
      const matchLetter = !glossaryLetter || firstLetter === glossaryLetter
      return matchSearch && matchLetter
    })
  }, [glossaryTerms, glossarySearch, glossaryLetter])

  const filteredMediaFiles = useMemo(() => {
    return mediaFiles.filter(f => !mediaSearch || f.filename.toLowerCase().includes(mediaSearch.toLowerCase()))
  }, [mediaFiles, mediaSearch])


  return (
    <div className="adm">
      <div className={`shell${mobileMenuOpen ? ' menu-open' : ''}`}>
        
        {/* ─── LEFT SIDEBAR (STICKY, DARK #121613) ─── */}
        <aside className="side">
          <a
            href="#"
            className="brand"
            onClick={e => { e.preventDefault(); setView('dashboard'); setPostMode('list') }}
          >
            <LogoMark light size={34} />
            <div>
              <b>GENRANQ</b>
              <small>CMS ENGINE</small>
            </div>
          </a>

          <nav>
            {/* Overview */}
            <div className="nav-g">
              <h6>Overview</h6>
              <a
                href="#"
                className={view === 'dashboard' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('dashboard'); setMobileMenuOpen(false) }}
              >
                <span className="ic">◧</span>
                <span>Dashboard</span>
              </a>
            </div>

            {/* Content Group */}
            <div className="nav-g">
              <h6>Content</h6>
              <a
                href="#"
                className={view === 'posts' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('posts'); setPostMode('list'); setMobileMenuOpen(false) }}
              >
                <span className="ic">▤</span>
                <span>Blog & Insights</span>
                {draftCount > 0 && <span className="tag" style={{ marginLeft: 'auto' }}>{draftCount} d</span>}
              </a>
              <a
                href="#"
                className={view === 'glossary' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('glossary'); setMobileMenuOpen(false) }}
              >
                <span className="ic" style={{ fontWeight: 700, fontSize: 13 }}>Aa</span>
                <span>SEO Glossary</span>
                {glossaryTerms.length > 0 && <span className="tag" style={{ marginLeft: 'auto' }}>{glossaryTerms.length}</span>}
              </a>
              <a
                href="#"
                className={view === 'content' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('content'); setMobileMenuOpen(false) }}
              >
                <span className="ic">✏</span>
                <span>Page Copy Editor</span>
              </a>
              <a
                href="#"
                className={view === 'seo' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('seo'); setMobileMenuOpen(false) }}
              >
                <span className="ic">◎</span>
                <span>Page SEO & Meta</span>
              </a>
              <a
                href="#"
                className={view === 'cities' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('cities'); setMobileMenuOpen(false) }}
              >
                <span className="ic">◈</span>
                <span>City Pages (pSEO)</span>
              </a>
              <a
                href="#"
                className={view === 'media' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('media'); setMobileMenuOpen(false) }}
              >
                <span className="ic">◫</span>
                <span>Media Library</span>
              </a>
            </div>

            {/* Growth & Inquiries */}
            <div className="nav-g">
              <h6>Growth & Inquiries</h6>
              <a
                href="#"
                className={view === 'leads' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('leads'); setMobileMenuOpen(false) }}
              >
                <span className="ic">✉</span>
                <span>Contact Inquiries</span>
                {newLeadsCount > 0 && (
                  <em className="nav-badge">{newLeadsCount}</em>
                )}
              </a>
            </div>

            {/* Settings & System */}
            <div className="nav-g">
              <h6>Settings</h6>
              <a
                href="#"
                className={view === 'settings' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('settings'); setMobileMenuOpen(false) }}
              >
                <span className="ic">⚙</span>
                <span>Site & Office Info</span>
              </a>
              <a
                href="#"
                className={view === 'system' ? 'on' : ''}
                onClick={e => { e.preventDefault(); setView('system'); setMobileMenuOpen(false) }}
              >
                <span className="ic">⚡</span>
                <span>Database & Health</span>
              </a>
              <a
                href="/admin-cms.html"
                target="_blank"
                rel="noopener"
                style={{ color: '#FF5A1F', fontWeight: 600 }}
              >
                <span className="ic">★</span>
                <span>CMS v3 (39 Sections) ↗</span>
                <span className="tag" style={{ marginLeft: 'auto', background: '#FF5A1F', color: '#fff', border: 'none' }}>v3</span>
              </a>
            </div>
          </nav>

          <div className="side-foot">
            <a href="/" target="_blank" rel="noopener">View website ↗</a>
            <a href="/glossary" target="_blank" rel="noopener">View glossary ↗</a>
            <a href="/admin-cms.html" target="_blank" rel="noopener" style={{ color: '#FF5A1F' }}>Launch CMS v3 ↗</a>
            <a href="/sitemap.xml" target="_blank" rel="noopener">sitemap.xml ↗</a>
          </div>
        </aside>

        {/* ─── MAIN CONTENT COLUMN ─── */}
        <div className="main">
          {/* Top Sticky Bar */}
          <header className="topbar-a">
            <button
              className="burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <div className="quick">
              <a href="#" onClick={e => { e.preventDefault(); handleQuickNewPost() }}>+ New Post</a>
              <a href="#" onClick={e => { e.preventDefault(); handleQuickNewGlossaryTerm() }} style={{ background: '#FFF4ED', borderColor: '#FF5A1F', color: '#E94A10' }}>+ New Term</a>
              <a href="/admin-cms.html" target="_blank" rel="noopener" style={{ background: '#FFE8DC', borderColor: '#FF5A1F', color: '#E94A10' }}>
                Open CMS v3 ↗
              </a>
              <a href="/" target="_blank" rel="noopener">View Site ↗</a>
              <a href="#" onClick={e => { e.preventDefault(); fetchPosts(); fetchGlossary(); fetchLeads(); notify('Refreshed latest data') }}>↻ Refresh</a>
            </div>

            <div className="me">
              <div className="av">A</div>
              <div>
                <b>Admin</b>
                <small>Super Admin</small>
              </div>
              <button onClick={handleLogout} title="Sign Out">Sign Out</button>
            </div>
          </header>

          {/* Database Notice if offline */}
          {!dbStatus.connected && (
            <div className="mode-banner" style={{ background: '#FFF4E8', borderColor: '#FFD7C2', color: '#8F340E' }}>
              <span>
                <strong>Database notice:</strong> {dbStatus.message || 'MySQL not connected. Running in safe mode with local storage.'}
              </span>
              <button
                className="b sm"
                onClick={() => setView('system')}
                style={{ background: '#fff', borderColor: '#FFC5A3' }}
              >
                View connection setup →
              </button>
            </div>
          )}

          {/* Page Container */}
          <main className="content">

            {/* ══════════════════════════════════════════════════════════════
                VIEW 1: DASHBOARD OVERVIEW
            ══════════════════════════════════════════════════════════════ */}
            {view === 'dashboard' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Dashboard</h1>
                    <p>GENRANQ content management, programmatic engine & inbound pipeline.</p>
                  </div>
                  <div className="row">
                    <button className="b b-primary" onClick={handleQuickNewPost}>+ New Post</button>
                    <button className="b" onClick={handleQuickNewGlossaryTerm}>+ New Glossary Term</button>
                    <a href="/contact" target="_blank" rel="noopener" className="b">Test Form ↗</a>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="kpis">
                  <div className="kpi" onClick={() => { setView('posts'); setPostMode('list') }} style={{ cursor: 'pointer' }}>
                    <b>{posts.length}</b>
                    <span>Total Posts</span>
                  </div>
                  <div className="kpi" onClick={() => { setView('posts'); setPostsFilter('article') }} style={{ cursor: 'pointer' }}>
                    <b>{articleCount}</b>
                    <span>Articles</span>
                  </div>
                  <div className="kpi" onClick={() => { setView('posts'); setPostsFilter('blog') }} style={{ cursor: 'pointer' }}>
                    <b>{blogCount}</b>
                    <span>Blogs</span>
                  </div>
                  <div className="kpi" onClick={() => setView('glossary')} style={{ cursor: 'pointer' }}>
                    <b style={{ color: 'var(--a-orange)' }}>{glossaryTerms.length}</b>
                    <span>SEO Glossary</span>
                  </div>
                  <div className="kpi" onClick={() => setView('seo')} style={{ cursor: 'pointer' }}>
                    <b>{seoPages.length || 16}</b>
                    <span>SEO Routes</span>
                  </div>
                  <div className="kpi" onClick={() => setView('cities')} style={{ cursor: 'pointer' }}>
                    <b>{cities.length || '150+'}</b>
                    <span>City Pages</span>
                  </div>
                  <div className="kpi" onClick={() => setView('media')} style={{ cursor: 'pointer' }}>
                    <b>{mediaFiles.length}</b>
                    <span>Media Assets</span>
                  </div>
                  <div className="kpi" onClick={() => setView('leads')} style={{ cursor: 'pointer' }}>
                    <b style={{ color: newLeadsCount > 0 ? 'var(--a-orange)' : undefined }}>
                      {leads.length}
                    </b>
                    <span>Inquiries {newLeadsCount > 0 ? `(${newLeadsCount} new)` : ''}</span>
                  </div>
                </div>


                {/* 2-Column Dashboard Grid */}
                <div className="dash-grid">
                  
                  {/* Left Column: Recent Leads */}
                  <div className="card">
                    <div className="card-h">
                      <h3>
                        <span>✉</span>
                        <span>Recent Inquiries</span>
                        {newLeadsCount > 0 && <span className="pill ok">{newLeadsCount} new</span>}
                      </h3>
                      <a href="#" onClick={e => { e.preventDefault(); setView('leads') }}>View all leads →</a>
                    </div>
                    <div className="card-b" style={{ padding: 0 }}>
                      {leads.length === 0 ? (
                        <div className="empty">No inquiries received yet.</div>
                      ) : (
                        <table className="tbl small">
                          <thead>
                            <tr>
                              <th>Sender</th>
                              <th>Service</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads.slice(0, 6).map(lead => (
                              <tr key={lead.id}>
                                <td>
                                  <div className="t-title">{lead.name}</div>
                                  <div className="t-sub">{lead.email}</div>
                                </td>
                                <td>
                                  <span style={{ fontSize: 12, color: 'var(--a-muted)' }}>{lead.service || 'General'}</span>
                                </td>
                                <td>
                                  <span className={`pill ${lead.status === 'new' ? 'ok' : lead.status === 'contacted' ? 'warn' : ''}`}>
                                    {lead.status}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="b sm"
                                    onClick={() => { setSelectedLead(lead); setView('leads') }}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Quick Management & Health */}
                  <div className="stack">
                    {/* Database Health Card */}
                    <div className="card">
                      <div className="card-h">
                        <h3>
                          <span>⚡</span>
                          <span>System & Database Health</span>
                        </h3>
                        <span className={`pill ${dbStatus.connected ? 'ok' : 'warn'}`}>
                          {dbStatus.connected ? 'MySQL Active' : 'Local Fallback'}
                        </span>
                      </div>
                      <div className="card-b">
                        <p style={{ fontSize: 13.5, color: 'var(--a-muted)', lineHeight: 1.6 }}>
                          Database credentials read from <code>.env.local</code>. All published posts, copy overrides, SEO metadata, and contact leads are synchronized.
                        </p>
                        <div className="row wrap-row" style={{ marginTop: 8 }}>
                          <button className="b sm" onClick={() => setView('system')}>Connection Details</button>
                          <a href="/sitemap.xml" target="_blank" rel="noopener" className="b sm">Check Sitemap XML</a>
                          <button className="b sm" onClick={handleExportLeadsCsv}>Export Leads (.csv)</button>
                        </div>
                      </div>
                    </div>

                    {/* Recent Content Card */}
                    <div className="card">
                      <div className="card-h">
                        <h3>
                          <span>▤</span>
                          <span>Recent Posts & Insights</span>
                        </h3>
                        <a href="#" onClick={e => { e.preventDefault(); setView('posts'); setPostMode('list') }}>Manage all →</a>
                      </div>
                      <div className="card-b" style={{ padding: 0 }}>
                        <table className="tbl small">
                          <tbody>
                            {posts.slice(0, 5).map(post => (
                              <tr key={post.id}>
                                <td>
                                  <div className="t-title">{post.title}</div>
                                  <div className="t-sub">{post.tag} · {post.type}</div>
                                </td>
                                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                  <span className={`pill ${post.published ? 'ok' : 'draft'}`} style={{ marginRight: 8 }}>
                                    {post.published ? 'Live' : 'Draft'}
                                  </span>
                                  <button
                                    className="b sm"
                                    onClick={() => {
                                      setEditingPost({
                                        id: post.id, type: post.type, tag: post.tag, title: post.title,
                                        description: post.description || '', content: post.content || '',
                                        author: post.author, read_time: post.read_time, slug: post.slug,
                                        cover_gradient: post.cover_gradient, featured: !!post.featured, published: !!post.published,
                                      })
                                      setPostMode('edit')
                                      setView('posts')
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 2: POSTS & INSIGHTS (LIST & RICH EDITOR)
            ══════════════════════════════════════════════════════════════ */}
            {view === 'posts' && postMode === 'list' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Blog & Insights</h1>
                    <p>Create and edit articles, case studies, and blogs published on GENRANQ.</p>
                  </div>
                  <button className="b b-primary" onClick={handleQuickNewPost}>+ New Post</button>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="card" style={{ padding: '14px 18px', marginBottom: 16 }}>
                  <div className="row wrap-row between">
                    <div className="row wrap-row">
                      <input
                        className="inp"
                        placeholder="Search posts by title or tag..."
                        value={postsSearch}
                        onChange={e => setPostsSearch(e.target.value)}
                        style={{ width: 280 }}
                      />
                      <div className="row" style={{ gap: 4 }}>
                        {(['all', 'article', 'blog'] as const).map(t => (
                          <button
                            key={t}
                            className={`b sm ${postsFilter === t ? 'b-dark' : ''}`}
                            onClick={() => setPostsFilter(t)}
                          >
                            {t === 'all' ? 'All Content' : t === 'article' ? 'Articles' : 'Blogs'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="muted small">
                      Showing {filteredPosts.length} of {posts.length} entries
                    </div>
                  </div>
                </div>

                {/* Posts Table */}
                <div className="card table-card">
                  {postsLoading ? (
                    <div className="loading">Loading posts from database...</div>
                  ) : filteredPosts.length === 0 ? (
                    <div className="empty">
                      No posts found matching your criteria.{' '}
                      <a href="#" onClick={e => { e.preventDefault(); handleQuickNewPost() }}>Create your first post</a>.
                    </div>
                  ) : (
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>Title & Slug</th>
                          <th>Type</th>
                          <th>Category</th>
                          <th>Author</th>
                          <th>Status</th>
                          <th>Updated</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPosts.map(post => (
                          <tr key={post.id} style={{ opacity: post.published ? 1 : 0.75 }}>
                            <td>
                              <div className="t-title">
                                {post.title}
                                {post.featured ? <span className="tag">Featured</span> : null}
                              </div>
                              <div className="t-sub">
                                <a href={post.slug} target="_blank" rel="noopener">
                                  {post.slug} ↗
                                </a>
                              </div>
                            </td>
                            <td>
                              <span className="pill">{post.type}</span>
                            </td>
                            <td>
                              <span style={{ fontSize: 13, fontWeight: 500 }}>{post.tag}</span>
                            </td>
                            <td style={{ fontSize: 13, color: 'var(--a-muted)' }}>
                              {post.author}
                            </td>
                            <td>
                              <button
                                className={`pill ${post.published ? 'ok' : 'draft'}`}
                                onClick={() => handleTogglePublish(post)}
                                style={{ border: 'none', cursor: 'pointer' }}
                                title="Click to toggle publish status"
                              >
                                {post.published ? '● Published' : '○ Draft'}
                              </button>
                            </td>
                            <td style={{ fontSize: 12, color: 'var(--a-muted)', whiteSpace: 'nowrap' }}>
                              {new Date(post.updated_at || post.created_at).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric'
                              })}
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                className="b sm"
                                onClick={() => handleOpenEditPost(post)}
                                style={{ marginRight: 6 }}
                              >
                                Edit
                              </button>
                              <button
                                className="b sm b-danger"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 2 (SUBVIEW): POST EDITOR WITH RICHTEXTEDITOR & REAL-TIME SEO
            ══════════════════════════════════════════════════════════════ */}
            {view === 'posts' && postMode === 'edit' && (() => {
              const seoReport = calculatePostSeo(editingPost)
              const previewUrl = editingPost.slug || '/insights'

              return (
                <div className="editor">
                  {/* Top Action Bar matching user screenshot & reference genranq-cms-dashboard.html */}
                  <div className="page-head" style={{ marginBottom: 18 }}>
                    <div className="row" style={{ gap: 12 }}>
                      <button
                        className="b sm"
                        onClick={() => { setPostMode('list'); setEditingPost(emptyForm); setPostDirty(false) }}
                        title="Back to post listing"
                      >
                        ← Posts
                      </button>
                      <div>
                        <h1 style={{ fontSize: 24, margin: 0, lineHeight: 1.2 }}>
                          {editingPost.id ? (editingPost.title || 'Untitled') : 'Create New Post'}
                        </h1>
                        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--a-muted)' }}>
                          <span className="pill" style={{ marginRight: 8 }}>{editingPost.type}</span>
                          <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener"
                            style={{ color: 'var(--a-orange)', textDecoration: 'none' }}
                          >
                            {previewUrl} ↗
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="row wrap-row" style={{ gap: 8, alignItems: 'center' }}>
                      {/* Real-time Saved status indicator */}
                      {postDirty ? (
                        <span className="pill warn" style={{ fontWeight: 600 }}>
                          ● Unsaved changes
                        </span>
                      ) : postLastSaved ? (
                        <span
                          className="muted small"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: '#F1EEE6',
                            padding: '4px 10px',
                            borderRadius: 999,
                            fontWeight: 500,
                            color: '#555C53'
                          }}
                        >
                          Saved {timeAgo(postLastSaved)}
                        </span>
                      ) : null}

                      {/* Duplicate Button */}
                      {editingPost.id ? (
                        <button
                          type="button"
                          className="b"
                          onClick={() => handleDuplicatePost(editingPost)}
                          title="Duplicate this post as a draft"
                        >
                          <span style={{ fontSize: 13, marginRight: 2 }}>⧉</span> Duplicate
                        </button>
                      ) : null}

                      {/* Preview Button */}
                      <button
                        type="button"
                        className="b"
                        onClick={() => window.open(previewUrl, '_blank')}
                        title="Open live preview in new window"
                      >
                        Preview
                      </button>

                      {/* Unpublish Button (shown if post is published) */}
                      {editingPost.id && editingPost.published ? (
                        <button
                          type="button"
                          className="b"
                          onClick={() => handleSavePost(editingPost, true, false)}
                          title="Set post to draft mode"
                        >
                          Unpublish
                        </button>
                      ) : null}

                      {/* Update / Publish Button */}
                      <button
                        type="button"
                        className="b b-primary"
                        onClick={() => handleSavePost(editingPost, true, true)}
                        style={{ minWidth: 92, fontWeight: 700 }}
                      >
                        {editingPost.id ? 'Update' : 'Publish'}
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Grid: Main Content + Side SEO Score */}
                  <div className="ed-grid">
                    <div className="ed-main stack">
                      {/* Post Configuration */}
                      <div className="card">
                        <div className="card-h">
                          <h3><span>▤</span> Post Configuration</h3>
                          <div className="row">
                            <label className="toggle">
                              <input
                                type="checkbox"
                                checked={editingPost.published}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, published: e.target.checked }))
                                  setPostDirty(true)
                                }}
                              />
                              <span className="sw" />
                              <span>Published</span>
                            </label>
                            <label className="toggle" style={{ marginLeft: 16 }}>
                              <input
                                type="checkbox"
                                checked={editingPost.featured}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, featured: e.target.checked }))
                                  setPostDirty(true)
                                }}
                              />
                              <span className="sw" />
                              <span>Featured on Home</span>
                            </label>
                          </div>
                        </div>
                        <div className="card-b">
                          <div className="grid2">
                            <div className="field">
                              <label className="lbl">Post Type</label>
                              <select
                                className="inp"
                                value={editingPost.type}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, type: e.target.value as 'article' | 'blog' }))
                                  setPostDirty(true)
                                }}
                              >
                                <option value="article">Article / Deep Dive</option>
                                <option value="blog">Blog / Editorial Post</option>
                              </select>
                            </div>
                            <div className="field">
                              <label className="lbl">Category / Tag</label>
                              <input
                                className="inp"
                                placeholder="AI Search, Technical SEO, Case Study..."
                                value={editingPost.tag}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, tag: e.target.value }))
                                  setPostDirty(true)
                                }}
                              />
                            </div>
                          </div>

                          <div className="field">
                            <label className="lbl">
                              <span>Title</span>
                              <em className={editingPost.title.length > 65 ? 'over' : ''}>
                                {editingPost.title.length} / 60
                              </em>
                            </label>
                            <input
                              className="inp"
                              placeholder="Compelling headline..."
                              value={editingPost.title}
                              onChange={e => {
                                const title = e.target.value
                                setEditingPost(p => ({
                                  ...p,
                                  title,
                                  slug: p.id ? p.slug : ('/insights/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80))
                                }))
                                setPostDirty(true)
                              }}
                              style={{ fontSize: 16, fontWeight: 600 }}
                            />
                          </div>

                          <div className="grid2">
                            <div className="field">
                              <label className="lbl">URL Slug</label>
                              <input
                                className="inp code"
                                placeholder="/insights/post-slug"
                                value={editingPost.slug}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, slug: e.target.value }))
                                  setPostDirty(true)
                                }}
                              />
                            </div>
                            <div className="field">
                              <label className="lbl">Author Name</label>
                              <input
                                className="inp"
                                placeholder="Gen Ranq Team"
                                value={editingPost.author}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, author: e.target.value }))
                                  setPostDirty(true)
                                }}
                              />
                            </div>
                          </div>

                          <div className="grid2">
                            <div className="field">
                              <label className="lbl">Read Time</label>
                              <input
                                className="inp"
                                placeholder="5 min read"
                                value={editingPost.read_time}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, read_time: e.target.value }))
                                  setPostDirty(true)
                                }}
                              />
                            </div>
                            <div className="field">
                              <label className="lbl">Card Cover Style</label>
                              <select
                                className="inp"
                                value={editingPost.cover_gradient}
                                onChange={e => {
                                  setEditingPost(p => ({ ...p, cover_gradient: e.target.value }))
                                  setPostDirty(true)
                                }}
                              >
                                <option value="g1">Dark Charcoal Minimal (g1)</option>
                                <option value="g2">Deep Orange Gradient (g2)</option>
                                <option value="g3">Warm Cream Clean (g3)</option>
                                <option value="g4">Forest Slate Emerald (g4)</option>
                                <option value="g5">Midnight Navy Tech (g5)</option>
                                <option value="g6">Sunset Studio Radial (g6)</option>
                              </select>
                            </div>
                          </div>

                          <div className="field">
                            <label className="lbl">
                              <span>Meta Description (Search & Social Preview)</span>
                              <em className={editingPost.description.length > 165 ? 'over' : ''}>
                                {editingPost.description.length} / 160
                              </em>
                            </label>
                            <textarea
                              className="inp"
                              rows={2}
                              placeholder="Brief 150-character summary for Google search results and sharing..."
                              value={editingPost.description}
                              onChange={e => {
                                setEditingPost(p => ({ ...p, description: e.target.value }))
                                setPostDirty(true)
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Rich Text Editor Card */}
                      <div className="card">
                        <div className="card-h">
                          <h3><span>✏</span> Post Content & Rich Editor</h3>
                          <span className="small muted">
                            Supports headings, bold, links, bullet lists, blockquotes, and instant image uploads!
                          </span>
                        </div>
                        <div className="card-b" style={{ padding: 14 }}>
                          <RichTextEditor
                            value={editingPost.content}
                            onChange={html => {
                              setEditingPost(p => ({ ...p, content: html }))
                              setPostDirty(true)
                            }}
                            placeholder="Write your article body here... Use toolbar buttons above to format text, add hyperlinks, and upload media images."
                          />
                        </div>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="row between" style={{ paddingTop: 10, paddingBottom: 20 }}>
                        <button
                          className="b"
                          onClick={() => { setPostMode('list'); setEditingPost(emptyForm); setPostDirty(false) }}
                        >
                          ← Back to post list
                        </button>
                        <div className="row" style={{ gap: 8 }}>
                          {editingPost.id && editingPost.published ? (
                            <button
                              type="button"
                              className="b"
                              onClick={() => handleSavePost(editingPost, true, false)}
                            >
                              Unpublish
                            </button>
                          ) : null}
                          <button
                            className="b b-primary"
                            onClick={() => handleSavePost(editingPost, true, true)}
                            style={{ padding: '10px 22px' }}
                          >
                            {editingPost.id ? 'Save & Update Post' : 'Create & Publish Post'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Side Column: Real-Time Live SEO Score Widget */}
                    <aside className="ed-side stack">
                      <div className="card">
                        <div className="card-h">
                          <h3>SEO score</h3>
                          <div className="row">
                            <span
                              className="score"
                              style={{
                                ['--c' as any]: scoreColor(seoReport.score),
                                color: scoreColor(seoReport.score),
                                border: `3px solid ${scoreColor(seoReport.score)}`,
                                borderRadius: '50%',
                                width: 44,
                                height: 44,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: 16,
                                background: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                              }}
                            >
                              {seoReport.score}
                            </span>
                          </div>
                        </div>
                        <div className="card-b" style={{ padding: '14px 16px' }}>
                          <ul className="checks" style={{ display: 'grid', gap: 10 }}>
                            {seoReport.checks.map((c, idx) => (
                              <li
                                key={idx}
                                className={c.status}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 8,
                                  fontSize: 13,
                                  lineHeight: 1.4
                                }}
                              >
                                <span
                                  style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    marginTop: 4,
                                    flexShrink: 0,
                                    backgroundColor: c.status === 'good' ? '#1F9D55' : c.status === 'warn' ? '#C98A00' : '#D64545'
                                  }}
                                />
                                <div>
                                  <div style={{ fontWeight: 600, color: 'var(--a-ink)' }}>{c.label}</div>
                                  {c.status !== 'good' && (
                                    <small style={{ color: 'var(--a-muted)', display: 'block', fontSize: 11.5, marginTop: 1 }}>
                                      {c.tip}
                                    </small>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Google Search Live Preview Card */}
                      <div className="card">
                        <div className="card-h">
                          <h4 className="mini-h" style={{ margin: 0 }}>SERP Snippet Preview</h4>
                        </div>
                        <div className="card-b" style={{ padding: 14 }}>
                          <div className="serp" style={{ fontSize: 12 }}>
                            <span className="serp-url" style={{ fontSize: 11 }}>
                              genranq.com › insights {editingPost.slug ? `› ${editingPost.slug.replace(/^\/insights\/?/, '')}` : ''}
                            </span>
                            <span className="serp-title" style={{ fontSize: 16, fontWeight: 500, color: '#1a0dab' }}>
                              {(editingPost.title || 'Untitled Post').slice(0, 60)}
                              {editingPost.title.length > 60 ? '…' : ''}
                            </span>
                            <span className="serp-desc" style={{ fontSize: 12, color: '#4d5156', lineHeight: 1.4 }}>
                              {(editingPost.description || 'Add a meta description to see how Google search results will display this article to visitors.').slice(0, 160)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Meta Stats Card */}
                      <div className="card">
                        <div className="card-h">
                          <h4 className="mini-h" style={{ margin: 0 }}>Content Health</h4>
                        </div>
                        <div className="card-b" style={{ padding: 14 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div style={{ background: '#FAF8F3', padding: '10px 12px', borderRadius: 8 }}>
                              <div style={{ fontSize: 11, color: 'var(--a-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Words</div>
                              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>
                                {(editingPost.content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length}
                              </div>
                            </div>
                            <div style={{ background: '#FAF8F3', padding: '10px 12px', borderRadius: 8 }}>
                              <div style={{ fontSize: 11, color: 'var(--a-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Status</div>
                              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4, color: editingPost.published ? 'var(--a-green)' : 'var(--a-amber)' }}>
                                {editingPost.published ? 'Published' : 'Draft'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              )
            })()}


            {/* ══════════════════════════════════════════════════════════════
                VIEW: SEO GLOSSARY MANAGEMENT
            ══════════════════════════════════════════════════════════════ */}
            {view === 'glossary' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>SEO Glossary</h1>
                    <p>Manage definitions, synonyms, and auto-linking for 20+ search and AI concepts.</p>
                  </div>
                  <div className="row">
                    <a href="/glossary" target="_blank" rel="noopener" className="b sm">
                      View Live Glossary ↗
                    </a>
                    <button
                      className="b b-primary"
                      onClick={() => setEditingGlossaryTerm(emptyGlossaryTerm)}
                    >
                      + Add Glossary Term
                    </button>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="filters">
                  <input
                    className="inp"
                    type="search"
                    placeholder="Search terms, synonyms, definitions..."
                    value={glossarySearch}
                    onChange={e => setGlossarySearch(e.target.value)}
                    style={{ maxWidth: 300 }}
                  />
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                      className={`b sm${!glossaryLetter ? ' b-primary' : ''}`}
                      onClick={() => setGlossaryLetter(null)}
                    >
                      All ({glossaryTerms.length})
                    </button>
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(char => {
                      const count = glossaryTerms.filter(t => (t.title[0] || 'A').toUpperCase() === char).length
                      if (count === 0) return null
                      return (
                        <button
                          key={char}
                          className={`b sm${glossaryLetter === char ? ' b-primary' : ''}`}
                          onClick={() => setGlossaryLetter(glossaryLetter === char ? null : char)}
                        >
                          {char} ({count})
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Terms Table */}
                <div className="card table-card">
                  {glossaryLoading ? (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--a-muted)' }}>
                      Loading glossary terms...
                    </div>
                  ) : filteredGlossaryTerms.length === 0 ? (
                    <div className="empty">No glossary terms match your search.</div>
                  ) : (
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>Term Title & Slug</th>
                          <th>Category</th>
                          <th>Short Definition</th>
                          <th>Synonyms</th>
                          <th>Auto-Link</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGlossaryTerms.map(term => (
                          <tr key={term.id}>
                            <td>
                              <a
                                href="#"
                                className="t-title"
                                onClick={e => { e.preventDefault(); setEditingGlossaryTerm(term) }}
                              >
                                {term.title}
                              </a>
                              <div className="t-sub">
                                <code>/glossary/{term.slug}</code>
                              </div>
                            </td>
                            <td>
                              <span className="tag" style={{ marginLeft: 0 }}>
                                {term.category}
                              </span>
                            </td>
                            <td style={{ maxWidth: 320 }}>
                              <p style={{ margin: 0, fontSize: 13, color: 'var(--a-ink)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {term.shortDef}
                              </p>
                            </td>
                            <td style={{ maxWidth: 180 }}>
                              <span style={{ fontSize: 12, color: 'var(--a-muted)' }}>
                                {term.synonyms || '—'}
                              </span>
                            </td>
                            <td>
                              <label className="toggle" style={{ margin: 0 }} title="Auto-link this term inside blog posts">
                                <input
                                  type="checkbox"
                                  checked={term.autoLink}
                                  onChange={() => handleToggleGlossaryAutoLink(term)}
                                />
                                <span className="sw" />
                              </label>
                            </td>
                            <td>
                              <span className={`pill ${term.published ? 'ok' : 'draft'}`}>
                                {term.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                className="b sm"
                                onClick={() => setEditingGlossaryTerm(term)}
                                style={{ marginRight: 6 }}
                              >
                                Edit
                              </button>
                              <a
                                href={`/glossary/${term.slug}`}
                                target="_blank"
                                rel="noopener"
                                className="b sm"
                                style={{ marginRight: 6 }}
                              >
                                View ↗
                              </a>
                              <button
                                className="b sm b-danger"
                                onClick={() => handleDeleteGlossaryTerm(term.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 3: PAGE COPY EDITOR (CONTENT BLOCKS)
            ══════════════════════════════════════════════════════════════ */}
            {view === 'content' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Page Copy Editor</h1>
                    <p>Customize hero headlines, value propositions, stats, and text across all website pages.</p>
                  </div>
                  <button
                    className="b b-primary"
                    onClick={() => handleSaveContent(selectedContentPage)}
                  >
                    Save All Changes on this Page
                  </button>
                </div>

                {/* Page Selector Tabs */}
                <div className="tabs" style={{ marginBottom: 20 }}>
                  {Object.entries(PAGE_LABELS).map(([route, label]) => (
                    <button
                      key={route}
                      className={selectedContentPage === route ? 'on' : ''}
                      onClick={() => setSelectedContentPage(route)}
                    >
                      <span>{label}</span>
                      <span className="tb">{route}</span>
                    </button>
                  ))}
                </div>

                {/* Search across blocks */}
                <div className="card" style={{ padding: '12px 18px', marginBottom: 20 }}>
                  <div className="row wrap-row between">
                    <input
                      className="inp"
                      placeholder="Search copy blocks on this page..."
                      value={contentSearch}
                      onChange={e => setContentSearch(e.target.value)}
                      style={{ maxWidth: 340 }}
                    />
                    <div className="small muted">
                      Editing: <strong>{PAGE_LABELS[selectedContentPage] || selectedContentPage}</strong>
                    </div>
                  </div>
                </div>

                {/* Grouped Section Blocks */}
                {contentLoading ? (
                  <div className="loading">Loading content blocks...</div>
                ) : (
                  (() => {
                    const pageMeta = defaultContent.filter(b => b.page === selectedContentPage)
                    const sections = Array.from(new Set(pageMeta.map(b => b.section || 'General')))
                    const currentBlocks = contentBlocks[selectedContentPage] || {}
                    const savedBlocks = savedContentBlocks[selectedContentPage] || {}

                    return (
                      <div className="stack">
                        {sections.map(sec => {
                          const blocksInSec = pageMeta.filter(b => (b.section || 'General') === sec && (!contentSearch || b.label.toLowerCase().includes(contentSearch.toLowerCase()) || b.key.toLowerCase().includes(contentSearch.toLowerCase()) || (currentBlocks[b.key] || '').toLowerCase().includes(contentSearch.toLowerCase())))
                          if (!blocksInSec.length) return null

                          return (
                            <div key={sec} className="card">
                              <div className="card-h">
                                <h3><span>§</span> {sec} Section</h3>
                                <button
                                  className="b sm"
                                  onClick={() => handleSaveContent(selectedContentPage)}
                                >
                                  Save Section
                                </button>
                              </div>
                              <div className="card-b">
                                {blocksInSec.map(b => {
                                  const val = currentBlocks[b.key] !== undefined ? currentBlocks[b.key] : b.value
                                  const savedVal = savedBlocks[b.key] !== undefined ? savedBlocks[b.key] : b.value
                                  const isModified = val !== savedVal

                                  return (
                                    <div key={b.key} className="field" style={{ background: isModified ? '#FFF9F3' : undefined, padding: isModified ? '10px 12px' : 0, borderRadius: 8 }}>
                                      <div className="lbl">
                                        <span>
                                          {b.label}
                                          {isModified && <span className="tag" style={{ marginLeft: 8 }}>Modified</span>}
                                        </span>
                                        <code>{b.key}</code>
                                      </div>
                                      {b.type === 'image' ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                          {/* Preview & Current Value */}
                                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            {val ? (
                                              <div style={{ position: 'relative', width: 90, height: 60, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--a-border)', flexShrink: 0, background: '#111' }}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={val} alt={b.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                              </div>
                                            ) : (
                                              <div style={{ width: 90, height: 60, borderRadius: 8, background: 'var(--a-subtle)', border: '1px dashed var(--a-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--a-muted)', flexShrink: 0 }}>
                                                No image
                                              </div>
                                            )}
                                            <input
                                              className="inp"
                                              placeholder="/images/... or https://..."
                                              value={val}
                                              onChange={e => {
                                                const newVal = e.target.value
                                                setContentBlocks(prev => ({
                                                  ...prev,
                                                  [selectedContentPage]: {
                                                    ...(prev[selectedContentPage] || {}),
                                                    [b.key]: newVal
                                                  }
                                                }))
                                              }}
                                              style={{ flex: 1 }}
                                            />
                                          </div>

                                          {/* Drag and Drop Zone */}
                                          <div
                                            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                                            onDragEnter={e => { e.preventDefault(); e.stopPropagation(); }}
                                            onDrop={e => {
                                              e.preventDefault()
                                              e.stopPropagation()
                                              const file = e.dataTransfer.files?.[0]
                                              if (file) handleContentImageUpload(file, b.key, selectedContentPage)
                                            }}
                                            style={{
                                              border: '2px dashed var(--a-border)',
                                              borderRadius: 10,
                                              padding: '16px 20px',
                                              textAlign: 'center',
                                              background: contentUploadingKey === b.key ? '#FFF7F2' : 'var(--a-subtle)',
                                              cursor: 'pointer',
                                              transition: 'border-color .15s ease, background-color .15s ease'
                                            }}
                                            onClick={() => {
                                              const input = document.getElementById(`upload-${b.key}`) as HTMLInputElement
                                              input?.click()
                                            }}
                                          >
                                            <input
                                              id={`upload-${b.key}`}
                                              type="file"
                                              accept="image/*"
                                              style={{ display: 'none' }}
                                              onChange={e => {
                                                const file = e.target.files?.[0]
                                                if (file) handleContentImageUpload(file, b.key, selectedContentPage)
                                                e.target.value = ''
                                              }}
                                            />
                                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--a-text)', marginBottom: 2 }}>
                                              {contentUploadingKey === b.key ? 'Uploading image...' : 'Drag & drop image here, or click to browse'}
                                            </div>
                                            <div style={{ fontSize: 11, color: 'var(--a-muted)' }}>
                                              PNG, JPG, WEBP, SVG or GIF up to 10MB · Automatically uploads & updates this block
                                            </div>
                                          </div>
                                        </div>
                                      ) : b.type === 'textarea' ? (
                                        <RichTextEditor
                                          value={val}
                                          onChange={newVal => {
                                            setContentBlocks(prev => ({
                                              ...prev,
                                              [selectedContentPage]: {
                                                ...(prev[selectedContentPage] || {}),
                                                [b.key]: newVal
                                              }
                                            }))
                                          }}
                                        />
                                      ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            {(b.key.includes('heading') || b.key.includes('title') || b.label.toLowerCase().includes('heading') || b.label.toLowerCase().includes('title')) && (
                                              <select
                                                className="inp"
                                                style={{ width: 85, fontWeight: 700, fontFamily: 'monospace', color: 'var(--a-orange)', background: '#FFF9F3', flexShrink: 0 }}
                                                title="Choose SEO heading tag for this block"
                                                value={contentBlocks[selectedContentPage]?.[`${b.key}_tag`] || (b.key.includes('hero_heading') ? 'h1' : b.key.includes('heading') ? 'h2' : 'h3')}
                                                onChange={e => {
                                                  const tagVal = e.target.value
                                                  setContentBlocks(prev => ({
                                                    ...prev,
                                                    [selectedContentPage]: {
                                                      ...(prev[selectedContentPage] || {}),
                                                      [`${b.key}_tag`]: tagVal
                                                    }
                                                  }))
                                                }}
                                              >
                                                <option value="h1">H1</option>
                                                <option value="h2">H2</option>
                                                <option value="h3">H3</option>
                                                <option value="h4">H4</option>
                                                <option value="h5">H5</option>
                                                <option value="h6">H6</option>
                                                <option value="p">p</option>
                                                <option value="span">span</option>
                                              </select>
                                            )}
                                            <input
                                              className="inp"
                                              value={val}
                                              onChange={e => {
                                                const newVal = e.target.value
                                                setContentBlocks(prev => ({
                                                  ...prev,
                                                  [selectedContentPage]: {
                                                    ...(prev[selectedContentPage] || {}),
                                                    [b.key]: newVal
                                                  }
                                                }))
                                              }}
                                              style={{ flex: 1 }}
                                            />
                                          </div>
                                          {(b.key.includes('heading') || b.key.includes('title') || b.label.toLowerCase().includes('heading') || b.label.toLowerCase().includes('title')) && (
                                            <span style={{ fontSize: 11, color: 'var(--a-muted)' }}>
                                              SEO Tag: currently renders as <code>&lt;{contentBlocks[selectedContentPage]?.[`${b.key}_tag`] || (b.key.includes('hero_heading') ? 'h1' : b.key.includes('heading') ? 'h2' : 'h3')}&gt;</code> for Google hierarchy.
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()
                )}
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 4: PAGE SEO & META TAGS (WITH SERP PREVIEWS)
            ══════════════════════════════════════════════════════════════ */}
            {view === 'seo' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Page SEO & Meta Tags</h1>
                    <p>Edit titles, meta descriptions, and Open Graph tags with live Google SERP preview.</p>
                  </div>
                  <input
                    className="inp"
                    placeholder="Search routes..."
                    value={seoSearch}
                    onChange={e => setSeoSearch(e.target.value)}
                    style={{ width: 240 }}
                  />
                </div>

                {seoLoading ? (
                  <div className="loading">Loading routes...</div>
                ) : (
                  <div className="stack">
                    {seoPages
                      .filter(p => !seoSearch || p.route.toLowerCase().includes(seoSearch.toLowerCase()) || p.label.toLowerCase().includes(seoSearch.toLowerCase()))
                      .map(p => {
                        const isOpen = openSeoRoute === p.route
                        const titleHint = charHint(p.title, 60, 40)
                        const descHint = charHint(p.description, 160, 120)

                        return (
                          <div key={p.route} className="card">
                            <div
                              className="card-h"
                              style={{ cursor: 'pointer' }}
                              onClick={() => setOpenSeoRoute(isOpen ? null : p.route)}
                            >
                              <div className="row">
                                <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, color: 'var(--a-orange)' }}>
                                  {p.route}
                                </span>
                                <span style={{ fontWeight: 600 }}>{p.label}</span>
                                {p.saved && <span className="pill ok">Saved in DB</span>}
                              </div>
                              <div className="row">
                                <span className="small muted">{p.filePath}</span>
                                <span style={{ fontSize: 13, marginLeft: 8 }}>{isOpen ? '▲' : '▼'}</span>
                              </div>
                            </div>

                            {isOpen && (
                              <div className="card-b">
                                {/* Google SERP Preview Box */}
                                <div className="field">
                                  <label className="lbl">Google Search Result Preview</label>
                                  <div className="serp">
                                    <div className="serp-url">https://genranq.com{p.route === '/' ? '' : p.route}</div>
                                    <div className="serp-title">{p.title || 'Page Title'}</div>
                                    <div className="serp-desc">{p.description || 'Meta description shown to prospective visitors in search results...'}</div>
                                  </div>
                                </div>

                                {/* Title Field */}
                                <div className="field">
                                  <div className="lbl">
                                    <span>Page Title</span>
                                    <em style={{ color: titleHint.color }}>{titleHint.text}</em>
                                  </div>
                                  <input
                                    className="inp"
                                    value={p.title}
                                    onChange={e => {
                                      const title = e.target.value
                                      setSeoPages(ps => ps.map(x => x.route === p.route ? { ...x, title } : x))
                                    }}
                                  />
                                </div>

                                {/* Description Field */}
                                <div className="field">
                                  <div className="lbl">
                                    <span>Meta Description</span>
                                    <em style={{ color: descHint.color }}>{descHint.text}</em>
                                  </div>
                                  <textarea
                                    className="inp"
                                    rows={3}
                                    value={p.description}
                                    onChange={e => {
                                      const description = e.target.value
                                      setSeoPages(ps => ps.map(x => x.route === p.route ? { ...x, description } : x))
                                    }}
                                  />
                                </div>

                                {/* Canonical Field */}
                                <div className="field">
                                  <label className="lbl">Canonical URL</label>
                                  <input
                                    className="inp"
                                    value={p.canonical || `https://genranq.com${p.route === '/' ? '' : p.route}`}
                                    onChange={e => {
                                      const canonical = e.target.value
                                      setSeoPages(ps => ps.map(x => x.route === p.route ? { ...x, canonical } : x))
                                    }}
                                  />
                                </div>

                                {/* Open Graph Fields */}
                                <div className="grid2" style={{ marginTop: 6 }}>
                                  <div className="field">
                                    <label className="lbl">OG Social Title</label>
                                    <input
                                      className="inp"
                                      value={p.og_title || p.title}
                                      onChange={e => {
                                        const og_title = e.target.value
                                        setSeoPages(ps => ps.map(x => x.route === p.route ? { ...x, og_title } : x))
                                      }}
                                    />
                                  </div>
                                  <div className="field">
                                    <label className="lbl">OG Social Image URL</label>
                                    <input
                                      className="inp"
                                      placeholder="https://genranq.com/og-image.jpg"
                                      value={p.og_image || ''}
                                      onChange={e => {
                                        const og_image = e.target.value
                                        setSeoPages(ps => ps.map(x => x.route === p.route ? { ...x, og_image } : x))
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="row between" style={{ marginTop: 12 }}>
                                  <button
                                    className="b sm b-danger"
                                    onClick={() => handleResetSeo(p.route)}
                                  >
                                    Reset to Default
                                  </button>
                                  <button
                                    className="b sm b-primary"
                                    onClick={() => handleSaveSeo(p)}
                                  >
                                    Save Changes Live
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 5: CITY LANDING PAGES (PROGRAMMATIC SEO)
            ══════════════════════════════════════════════════════════════ */}
            {view === 'cities' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>City Pages (Programmatic SEO)</h1>
                    <p>Manage localized service landing pages, bulk import cities via Excel/CSV, and edit slugs.</p>
                  </div>
                  <div className="row">
                    <label className="b sm" style={{ cursor: 'pointer' }}>
                      {uploadingCities ? 'Uploading...' : 'Import Excel / CSV'}
                      <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={async e => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          setUploadingCities(true)
                          const fd = new FormData()
                          fd.append('file', file)
                          try {
                            const res = await fetch('/api/admin/cities', { method: 'POST', body: fd })
                            const d = await res.json()
                            if (res.ok) {
                              notify(`Uploaded: ${d.inserted} new, ${d.updated} updated`)
                              fetchCities()
                            } else {
                              notify(d.error || 'Upload error', 'err')
                            }
                          } catch {
                            notify('Upload failed', 'err')
                          }
                          setUploadingCities(false)
                          e.target.value = ''
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button className="b sm b-primary" onClick={() => setEditingCity('new')}>
                      + Add Single City
                    </button>
                  </div>
                </div>

                {/* Cities KPI */}
                <div className="kpis" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="kpi">
                    <b>{cities.length}</b>
                    <span>Total Cities Loaded</span>
                  </div>
                  <div className="kpi">
                    <b style={{ color: 'var(--a-green)' }}>{cities.filter(c => c.active).length}</b>
                    <span>Active Indexed Pages</span>
                  </div>
                  <div className="kpi">
                    <b>{[...new Set(cities.map(c => c.country).filter(Boolean))].length}</b>
                    <span>Target Countries</span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="card" style={{ padding: '12px 18px', marginBottom: 16 }}>
                  <input
                    className="inp"
                    placeholder="Search by city name, state, country, or slug..."
                    value={citySearch}
                    onChange={e => setCitySearch(e.target.value)}
                    style={{ maxWidth: 360 }}
                  />
                </div>

                {/* Cities Table */}
                <div className="card table-card">
                  {citiesLoading ? (
                    <div className="loading">Loading city records...</div>
                  ) : (
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>City & State</th>
                          <th>Country</th>
                          <th>Service Offered</th>
                          <th>URL Slug</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cities
                          .filter(c => !citySearch || c.city_name.toLowerCase().includes(citySearch.toLowerCase()) || c.country.toLowerCase().includes(citySearch.toLowerCase()) || c.slug.toLowerCase().includes(citySearch.toLowerCase()))
                          .slice(0, 50)
                          .map(city => (
                            <tr key={city.slug} style={{ opacity: city.active ? 1 : 0.65 }}>
                              <td>
                                <div className="t-title">{city.city_name}</div>
                                <div className="t-sub">{city.state || '—'}</div>
                              </td>
                              <td>{city.country}</td>
                              <td>{city.service || 'SEO Agency'}</td>
                              <td>
                                <code style={{ fontSize: 12 }}>/{city.slug}</code>
                              </td>
                              <td>
                                <span className={`pill ${city.active ? 'ok' : 'draft'}`}>
                                  {city.active ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <button
                                  className="b sm"
                                  onClick={() => setEditingCity(city)}
                                  style={{ marginRight: 6 }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="b sm b-danger"
                                  onClick={async () => {
                                    if (!confirm(`Delete ${city.city_name}?`)) return
                                    await fetch('/api/admin/cities', {
                                      method: 'DELETE',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ slug: city.slug })
                                    })
                                    notify('City removed')
                                    fetchCities()
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 6: CONTACT LEADS & INQUIRIES
            ══════════════════════════════════════════════════════════════ */}
            {view === 'leads' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Contact Leads & Inquiries</h1>
                    <p>Review inbound customer requests submitted through the contact page and audit forms.</p>
                  </div>
                  <div className="row">
                    <button className="b sm" onClick={handleExportLeadsCsv}>Export CSV</button>
                    <button className="b sm b-primary" onClick={fetchLeads}>↻ Refresh</button>
                  </div>
                </div>

                {/* Filter Toolbar */}
                <div className="card" style={{ padding: '14px 18px', marginBottom: 16 }}>
                  <div className="row wrap-row between">
                    <div className="row wrap-row">
                      <input
                        className="inp"
                        placeholder="Search leads by name, email, company..."
                        value={leadsSearch}
                        onChange={e => setLeadsSearch(e.target.value)}
                        style={{ width: 280 }}
                      />
                      <div className="row" style={{ gap: 4 }}>
                        {(['all', 'new', 'contacted', 'archived'] as const).map(status => (
                          <button
                            key={status}
                            className={`b sm ${leadsFilter === status ? 'b-dark' : ''}`}
                            onClick={() => setLeadsFilter(status)}
                          >
                            {status === 'all' ? 'All Inquiries' : status === 'new' ? 'New Unread' : status === 'contacted' ? 'Contacted' : 'Archived'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="muted small">
                      {filteredLeads.length} inquiries found
                    </div>
                  </div>
                </div>

                {/* Leads Table */}
                <div className="card table-card">
                  {leadsLoading ? (
                    <div className="loading">Loading inquiries...</div>
                  ) : filteredLeads.length === 0 ? (
                    <div className="empty">No inquiries found matching criteria.</div>
                  ) : (
                    <table className="tbl">
                      <thead>
                        <tr>
                          <th>Contact Details</th>
                          <th>Company / Website</th>
                          <th>Service Requested</th>
                          <th>Budget</th>
                          <th>Status</th>
                          <th>Received</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map(lead => (
                          <tr key={lead.id}>
                            <td>
                              <div className="t-title">{lead.name}</div>
                              <div className="t-sub">
                                <a href={`mailto:${lead.email}`}>{lead.email}</a>
                                {lead.phone && <span> · {lead.phone}</span>}
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{lead.company || '—'}</div>
                              {lead.website && (
                                <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noopener" className="small" style={{ color: 'var(--a-orange)' }}>
                                  {lead.website} ↗
                                </a>
                              )}
                            </td>
                            <td>
                              <span style={{ fontSize: 13 }}>{lead.service || 'General SEO'}</span>
                            </td>
                            <td>
                              <strong style={{ fontSize: 13 }}>{lead.budget || '—'}</strong>
                            </td>
                            <td>
                              <select
                                className="inp"
                                value={lead.status}
                                onChange={e => handleUpdateLeadStatus(lead.id, e.target.value as Lead['status'])}
                                style={{ padding: '4px 8px', fontSize: 12.5 }}
                              >
                                <option value="new">New (Unread)</option>
                                <option value="contacted">Contacted</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td style={{ fontSize: 12, color: 'var(--a-muted)', whiteSpace: 'nowrap' }}>
                              {new Date(lead.created_at).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric'
                              })}
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <button
                                className="b sm"
                                onClick={() => setSelectedLead(lead)}
                                style={{ marginRight: 6 }}
                              >
                                View Message
                              </button>
                              <button
                                className="b sm b-danger"
                                onClick={() => handleDeleteLead(lead.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 7: MEDIA LIBRARY & UPLOADER
            ══════════════════════════════════════════════════════════════ */}
            {view === 'media' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Media Library</h1>
                    <p>Upload and manage images, diagrams, and assets for use across blog posts and landing pages.</p>
                  </div>
                  <label className="b b-primary" style={{ cursor: 'pointer' }}>
                    {mediaUploading ? 'Uploading...' : '+ Upload New Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMediaUpload}
                      style={{ display: 'none' }}
                      disabled={mediaUploading}
                    />
                  </label>
                </div>

                {/* Drag and Drop Zone */}
                <label className="drop big" style={{ display: 'block', cursor: 'pointer' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    style={{ display: 'none' }}
                    disabled={mediaUploading}
                  />
                  <b>{mediaUploading ? 'Uploading asset to server...' : 'Drag and drop image here or click to browse'}</b>
                  <span>Supported formats: WEBP, PNG, JPG, SVG, AVIF (up to 10MB)</span>
                </label>

                {/* Media Grid */}
                <div className="card">
                  <div className="card-h" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <h3><span>◫</span> Uploaded Assets ({mediaFiles.length})</h3>
                    <input
                      className="inp"
                      type="search"
                      placeholder="Filter files by name..."
                      value={mediaSearch}
                      onChange={e => setMediaSearch(e.target.value)}
                      style={{ maxWidth: 240, padding: '6px 12px', fontSize: 13 }}
                    />
                  </div>
                  <div className="card-b">
                    {filteredMediaFiles.length === 0 ? (
                      <div className="empty">No media files match your filter.</div>
                    ) : (
                      <div className="media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
                        {filteredMediaFiles.map(file => (
                          <div
                            key={file.url}
                            className="card inner"
                            style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10, background: '#fff', border: '1px solid var(--a-line)' }}
                          >
                            <div style={{ aspectRatio: '16 / 11', borderRadius: 8, overflow: 'hidden', background: '#F1EEE6', border: '1px solid #ECE7DC' }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={file.url} alt={file.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--a-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={file.filename}>
                              {file.filename}
                            </span>
                            <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
                              <button
                                type="button"
                                className="b sm full"
                                onClick={() => {
                                  navigator.clipboard.writeText(file.url)
                                  notify(`Copied URL: ${file.url}`)
                                }}
                              >
                                Copy URL
                              </button>
                              <button
                                type="button"
                                className="b sm b-danger"
                                onClick={() => handleDeleteMedia(file.filename)}
                                title="Delete image from server"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 8: SITE SETTINGS & OFFICE INFO
            ══════════════════════════════════════════════════════════════ */}
            {view === 'settings' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Site & Office Settings</h1>
                    <p>Official studio identity, contact coordinates, and global configuration.</p>
                  </div>
                  <button className="b b-primary" onClick={() => notify('Settings saved')}>Save Settings</button>
                </div>

                <div className="stack">
                  <div className="card">
                    <div className="card-h">
                      <h3><span>⚙</span> Office Coordinates & Support</h3>
                    </div>
                    <div className="card-b">
                      <div className="grid2">
                        <div className="field">
                          <label className="lbl">Office Location</label>
                          <input className="inp" defaultValue="Vadodara, Gujarat, India" readOnly />
                        </div>
                        <div className="field">
                          <label className="lbl">Direct Phone Support</label>
                          <input className="inp" defaultValue="+91 80 4507 4242" readOnly />
                        </div>
                      </div>
                      <div className="grid2">
                        <div className="field">
                          <label className="lbl">Contact Email</label>
                          <input className="inp" defaultValue="hello@genranq.com" readOnly />
                        </div>
                        <div className="field">
                          <label className="lbl">Studio Hours</label>
                          <input className="inp" defaultValue="Mon – Fri: 9:00 AM – 7:00 PM IST" readOnly />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-h">
                      <h3><span>§</span> Social Channels & Brand</h3>
                    </div>
                    <div className="card-b">
                      <div className="grid2">
                        <div className="field">
                          <label className="lbl">LinkedIn</label>
                          <input className="inp" defaultValue="https://linkedin.com/company/genranq" />
                        </div>
                        <div className="field">
                          <label className="lbl">Twitter / X</label>
                          <input className="inp" defaultValue="https://twitter.com/genranq" />
                        </div>
                      </div>
                      <div className="field">
                        <label className="lbl">Title Suffix for SEO</label>
                        <input className="inp" defaultValue=" | Gen Ranq" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                VIEW 9: DATABASE & SERVER HEALTH
            ══════════════════════════════════════════════════════════════ */}
            {view === 'system' && (
              <div>
                <div className="page-head">
                  <div>
                    <h1>Database & Server Health</h1>
                    <p>MySQL connection status, environment configuration, and deployment diagnostics.</p>
                  </div>
                  <button className="b b-primary" onClick={() => { fetchPosts(); notify('Tested database connection') }}>
                    Test Connection Now
                  </button>
                </div>

                <div className="stack">
                  <div className="card">
                    <div className="card-h">
                      <h3><span>⚡</span> Hostinger MySQL Configuration</h3>
                      <span className={`pill ${dbStatus.connected ? 'ok' : 'warn'}`}>
                        {dbStatus.connected ? 'Connected' : 'Offline / Local'}
                      </span>
                    </div>
                    <div className="card-b">
                      <p style={{ fontSize: 14, color: 'var(--a-muted)', lineHeight: 1.6 }}>
                        To persist posts and SEO changes across VPS restarts on Hostinger, ensure the following parameters are populated in your <code>.env.local</code> file:
                      </p>
                      <pre className="inp code" style={{ padding: 14, background: '#121613', color: '#E8E6E0', overflow: 'auto' }}>
{`DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=genranq_user
DB_PASSWORD=••••••••••••
DB_NAME=genranq_db

# Admin Authentication
ADMIN_PASSWORD=••••••••••••`}
                      </pre>
                      <div className="row" style={{ marginTop: 10 }}>
                        <a href="/robots.txt" target="_blank" rel="noopener" className="b sm">View robots.txt ↗</a>
                        <a href="/sitemap.xml" target="_blank" rel="noopener" className="b sm">View sitemap.xml ↗</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ─── LEAD DETAIL MODAL ─────────────────────────────────────── */}
      {selectedLead && (
        <div className="modal-bg" onClick={() => setSelectedLead(null)}>
          <div className="modal wide" onClick={e => e.stopPropagation()}>
            <div className="modal-h">
              <h3>Inquiry from {selectedLead.name}</h3>
              <button className="x" onClick={() => setSelectedLead(null)}>×</button>
            </div>
            <div className="modal-b lead-detail">
              <dl>
                <dt>Sender Name</dt>
                <dd><strong>{selectedLead.name}</strong></dd>

                <dt>Email Address</dt>
                <dd><a href={`mailto:${selectedLead.email}`} style={{ color: 'var(--a-orange)' }}>{selectedLead.email}</a></dd>

                <dt>Phone</dt>
                <dd>{selectedLead.phone || '—'}</dd>

                <dt>Company</dt>
                <dd>{selectedLead.company || '—'}</dd>

                <dt>Website</dt>
                <dd>
                  {selectedLead.website ? (
                    <a href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`} target="_blank" rel="noopener" style={{ color: 'var(--a-orange)' }}>
                      {selectedLead.website} ↗
                    </a>
                  ) : '—'}
                </dd>

                <dt>Requested Service</dt>
                <dd>{selectedLead.service || '—'}</dd>

                <dt>Budget Range</dt>
                <dd><strong>{selectedLead.budget || '—'}</strong></dd>

                <dt>Received At</dt>
                <dd>{new Date(selectedLead.created_at).toLocaleString()}</dd>

                <dt>Status</dt>
                <dd>
                  <select
                    className="inp"
                    value={selectedLead.status}
                    onChange={e => {
                      const st = e.target.value as Lead['status']
                      handleUpdateLeadStatus(selectedLead.id, st)
                      setSelectedLead(l => l ? { ...l, status: st } : null)
                    }}
                    style={{ width: 160 }}
                  >
                    <option value="new">New (Unread)</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </dd>
              </dl>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--a-muted)', marginBottom: 6 }}>
                  Complete Message
                </div>
                <div style={{ background: '#FAF8F3', border: '1px solid var(--a-line)', borderRadius: 10, padding: 14, fontSize: 14.5, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {selectedLead.message || 'No additional message was provided with this inquiry.'}
                </div>
              </div>
            </div>
            <div className="modal-f">
              <button className="b b-danger" onClick={() => handleDeleteLead(selectedLead.id)}>
                Delete Inquiry
              </button>
              <button className="b b-primary" onClick={() => setSelectedLead(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CITY EDIT MODAL ───────────────────────────────────────── */}
      {editingCity && (
        <div className="modal-bg" onClick={() => setEditingCity(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <form
              onSubmit={async e => {
                e.preventDefault()
                const fd = new window.FormData(e.currentTarget)
                const payload = {
                  city_name: fd.get('city_name'),
                  state: fd.get('state'),
                  country: fd.get('country'),
                  service: fd.get('service'),
                  slug: fd.get('slug'),
                  active: fd.get('active') === 'on',
                }
                const isNew = editingCity === 'new'
                const res = await fetch('/api/admin/cities', {
                  method: isNew ? 'POST' : 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                })
                if (res.ok) {
                  notify(isNew ? 'City created' : 'City updated')
                  setEditingCity(null)
                  fetchCities()
                } else {
                  notify('Failed to save city', 'err')
                }
              }}
            >
              <div className="modal-h">
                <h3>{editingCity === 'new' ? 'Add Single City Page' : `Edit ${editingCity.city_name}`}</h3>
                <button type="button" className="x" onClick={() => setEditingCity(null)}>×</button>
              </div>
              <div className="modal-b stack-s">
                <div className="field">
                  <label className="lbl">City Name</label>
                  <input
                    name="city_name"
                    className="inp"
                    defaultValue={editingCity !== 'new' ? editingCity.city_name : ''}
                    required
                  />
                </div>
                <div className="grid2">
                  <div className="field">
                    <label className="lbl">State / Region</label>
                    <input
                      name="state"
                      className="inp"
                      defaultValue={editingCity !== 'new' ? editingCity.state : ''}
                    />
                  </div>
                  <div className="field">
                    <label className="lbl">Country</label>
                    <input
                      name="country"
                      className="inp"
                      defaultValue={editingCity !== 'new' ? editingCity.country : 'United States'}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="lbl">Service Target</label>
                  <input
                    name="service"
                    className="inp"
                    defaultValue={editingCity !== 'new' ? editingCity.service : 'SEO Agency'}
                    required
                  />
                </div>
                <div className="field">
                  <label className="lbl">URL Slug (e.g. seo-agency-new-york)</label>
                  <input
                    name="slug"
                    className="inp code"
                    defaultValue={editingCity !== 'new' ? editingCity.slug : ''}
                    required
                  />
                </div>
                <label className="toggle" style={{ marginTop: 8 }}>
                  <input
                    name="active"
                    type="checkbox"
                    defaultChecked={editingCity === 'new' ? true : editingCity.active}
                  />
                  <span className="sw" />
                  <span>Active & Indexed</span>
                </label>
              </div>
              <div className="modal-f">
                <button type="button" className="b" onClick={() => setEditingCity(null)}>Cancel</button>
                <button type="submit" className="b b-primary">Save City</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── GLOSSARY EDIT MODAL ───────────────────────────────────── */}
      {editingGlossaryTerm && (
        <div className="modal-bg" onClick={() => setEditingGlossaryTerm(null)}>
          <div className="modal wide" onClick={e => e.stopPropagation()} style={{ width: 'min(840px, 100%)', maxHeight: '90vh' }}>
            <div className="modal-h">
              <h3>{editingGlossaryTerm.id ? `Edit Term: ${editingGlossaryTerm.title}` : 'Add New Glossary Term'}</h3>
              <button className="x" onClick={() => setEditingGlossaryTerm(null)}>×</button>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSaveGlossaryTerm(editingGlossaryTerm)
              }}
              style={{ display: 'contents' }}
            >
              <div className="modal-b" style={{ display: 'grid', gap: 16 }}>
                <div className="grid2">
                  <div className="field">
                    <label className="lbl">Term Name *</label>
                    <input
                      className="inp"
                      required
                      value={editingGlossaryTerm.title}
                      onChange={e => {
                        const val = e.target.value
                        setEditingGlossaryTerm(prev => prev ? {
                          ...prev,
                          title: val,
                          slug: !prev.id ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : prev.slug
                        } : null)
                      }}
                      placeholder="e.g. Generative Engine Optimisation (GEO)"
                    />
                  </div>

                  <div className="field">
                    <label className="lbl">URL Slug *</label>
                    <input
                      className="inp"
                      required
                      value={editingGlossaryTerm.slug}
                      onChange={e => setEditingGlossaryTerm(prev => prev ? { ...prev, slug: e.target.value } : null)}
                      placeholder="e.g. generative-engine-optimisation"
                    />
                  </div>
                </div>

                <div className="grid2">
                  <div className="field">
                    <label className="lbl">Category</label>
                    <select
                      className="inp"
                      value={editingGlossaryTerm.category}
                      onChange={e => setEditingGlossaryTerm(prev => prev ? { ...prev, category: e.target.value } : null)}
                    >
                      <option value="AI Search">AI Search & GEO</option>
                      <option value="Technical SEO">Technical SEO</option>
                      <option value="On-Page SEO">On-Page SEO</option>
                      <option value="Off-Page SEO">Off-Page SEO & Links</option>
                      <option value="Content Strategy">Content Strategy & E-E-A-T</option>
                      <option value="Local SEO">Local SEO</option>
                      <option value="Analytics">Analytics & Tracking</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="lbl">Synonyms & Acronyms (Comma Separated)</label>
                    <input
                      className="inp"
                      value={editingGlossaryTerm.synonyms}
                      onChange={e => setEditingGlossaryTerm(prev => prev ? { ...prev, synonyms: e.target.value } : null)}
                      placeholder="e.g. GEO, AI SEO, LLM search"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="lbl">
                    <span>Short Definition *</span>
                    <em style={{ color: editingGlossaryTerm.shortDef.length > 200 ? 'var(--a-amber)' : 'var(--a-muted)' }}>
                      {editingGlossaryTerm.shortDef.length} chars (aim for 120-180 for AI citations)
                    </em>
                  </label>
                  <textarea
                    className="inp"
                    rows={3}
                    required
                    value={editingGlossaryTerm.shortDef}
                    onChange={e => setEditingGlossaryTerm(prev => prev ? { ...prev, shortDef: e.target.value } : null)}
                    placeholder="Plain-English 1-2 sentence definition answering what this concept is and why it matters."
                  />
                </div>

                <div className="field">
                  <label className="lbl">Full Guide & Technical Explanation (Rich Text)</label>
                  <RichTextEditor
                    value={editingGlossaryTerm.content}
                    onChange={html => setEditingGlossaryTerm(prev => prev ? { ...prev, content: html } : null)}
                    placeholder="Write detailed explanations, bullet points, checklists, and examples..."
                  />
                </div>

                <div className="row" style={{ gap: 24, paddingTop: 8 }}>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={editingGlossaryTerm.autoLink}
                      onChange={e => setEditingGlossaryTerm(prev => prev ? { ...prev, autoLink: e.target.checked } : null)}
                    />
                    <span className="sw" />
                    <span>Auto-link this term inside blog & insight articles</span>
                  </label>

                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={editingGlossaryTerm.published}
                      onChange={e => setEditingGlossaryTerm(prev => prev ? { ...prev, published: e.target.checked } : null)}
                    />
                    <span className="sw" />
                    <span>Published (visible on /glossary)</span>
                  </label>
                </div>
              </div>

              <div className="modal-f">
                <button type="button" className="b" onClick={() => setEditingGlossaryTerm(null)}>
                  Cancel
                </button>
                <button type="submit" className="b b-primary">
                  Save Glossary Term
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── TOAST NOTIFICATIONS ───────────────────────────────────── */}
      <div className="toasts">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type === 'err' ? 'err' : ''}`}>
            {t.msg}
          </div>
        ))}
      </div>

    </div>
  )
}
