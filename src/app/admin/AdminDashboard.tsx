'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { defaultContent } from '@/lib/content-blocks'
import { CheckIcon, IconClose, IconBookOpen, IconSearch, IconAlertTriangle } from '@/components/Icons'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false })

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

const emptyForm: FormData = {
  id: '', type: 'article', tag: '', title: '', description: '',
  content: '', author: '', read_time: '', slug: '', cover_gradient: 'g1',
  featured: false, published: true,
}

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
      setError('Wrong password')
      setLoading(false)
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={handleLogin}>
        <div className="adm-login-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <img src="/logo-icon.png" alt="Gen Ranq" style={{ height: 38, width: 'auto' }} />
          <span>Gen Ranq</span>
        </div>
        <h1>Admin Portal</h1>
        <div className="adm-field">
          <label htmlFor="adm-pass">Password</label>
          <input
            id="adm-pass"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            required
          />
        </div>
        {error && <div className="adm-error">{error}</div>}
        <button type="submit" className="adm-btn-primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

function PostForm({ initial, onSave, onCancel }: {
  initial: FormData
  onSave: (data: FormData) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState<FormData>(initial)
  const [saving, setSaving] = useState(false)

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  function autoSlug(title: string) {
    return '/insights/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <form className="adm-post-form" onSubmit={handleSubmit}>
      <div className="adm-form-row">
        <div className="adm-field adm-field-half">
          <label>Type</label>
          <select value={form.type} onChange={e => set('type', e.target.value as 'article' | 'blog')}>
            <option value="article">Article</option>
            <option value="blog">Blog</option>
          </select>
        </div>
        <div className="adm-field adm-field-half">
          <label>Tag / Category</label>
          <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="AI Search, Technical SEO..." />
        </div>
      </div>

      <div className="adm-field">
        <label>Title</label>
        <input
          value={form.title}
          onChange={e => { set('title', e.target.value); if (!initial.id) set('slug', autoSlug(e.target.value)) }}
          placeholder="Post title"
          required
        />
      </div>

      <div className="adm-field">
        <label>Description</label>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          placeholder="Short description for cards and meta"
          rows={2}
        />
      </div>

      <div className="adm-field">
        <label>Content (Visual Blog &amp; Article Editor)</label>
        <div className="adm-editor-helper">
          <span className="adm-helper-badge">Easy Editor</span>
          <p>
            <strong>WordPress-Style Media &amp; Formatting:</strong> Click the prominent <strong>Add / Upload Image</strong> button to pick photos from your computer, or drag &amp; drop pictures directly into the text. Highlight any word or sentence and click <strong>Insert Link</strong> to create hyperlinks. Use <strong>Add Table</strong> to insert responsive data tables.
          </p>
        </div>
        <RichTextEditor
          value={form.content}
          onChange={val => set('content', val)}
          placeholder="Start writing your post..."
        />
      </div>

      <div className="adm-form-row">
        <div className="adm-field adm-field-half">
          <label>Author</label>
          <input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Author name" />
        </div>
        <div className="adm-field adm-field-half">
          <label>Read Time</label>
          <input value={form.read_time} onChange={e => set('read_time', e.target.value)} placeholder="14 min" />
        </div>
      </div>

      <div className="adm-field">
        <label>Slug</label>
        <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="/insights/my-post" />
      </div>

      <div className="adm-form-row">
        <div className="adm-field adm-field-half">
          <label>Cover Gradient</label>
          <select value={form.cover_gradient} onChange={e => set('cover_gradient', e.target.value)}>
            {['g1','g2','g3','g4','g5','g6'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="adm-field adm-field-half" style={{ display: 'flex', gap: 24, alignItems: 'center', paddingTop: 28 }}>
          <label className="adm-check">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
            Published
          </label>
          <label className="adm-check">
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} />
            Featured
          </label>
        </div>
      </div>

      <div className="adm-form-actions">
        <button type="button" className="adm-btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="adm-btn-primary" disabled={saving}>
          {saving ? 'Saving...' : (initial.id ? 'Update Post' : 'Create Post')}
        </button>
      </div>
    </form>
  )
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

function charHint(val: string, max: number, min = 0) {
  if (val.length > max) return { color: '#dc2626', text: `${val.length}/${max} — too long` }
  if (min && val.length < min) return { color: '#d97706', text: `${val.length}/${max} — could be longer` }
  return { color: '#16a34a', text: `${val.length}/${max} — good` }
}

function MetaEditPanel({ page, onSaved }: { page: LivePage; onSaved: (p: LivePage) => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: page.title, description: page.description, canonical: page.canonical, og_title: page.og_title, og_description: page.og_description, og_image: page.og_image })
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [errMsg, setErrMsg] = useState('')

  function field(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }))
      if (key === 'title') setForm(f => ({ ...f, title: e.target.value, og_title: e.target.value }))
      if (key === 'description') setForm(f => ({ ...f, description: e.target.value, og_description: e.target.value }))
      setStatus('idle')
    }
  }

  async function save() {
    setSaving(true)
    setStatus('idle')
    const res = await fetch('/api/admin/meta', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route: page.route, ...form }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      setStatus('ok')
      onSaved({ ...page, ...form, saved: true })
      setTimeout(() => setStatus('idle'), 3000)
    } else {
      setStatus('err')
      setErrMsg(data.error || 'Failed to save')
    }
    setSaving(false)
  }

  async function reset() {
    if (!confirm('Reset to code defaults? Your saved overrides will be deleted.')) return
    await fetch('/api/admin/meta', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ route: page.route }) })
    onSaved({ ...page, saved: false })
    setStatus('idle')
  }

  const titleHint = charHint(form.title, 60)
  const descHint = charHint(form.description, 160, 120)

  return (
    <div className={`seo-page-card${open ? ' open' : ''}`}>
      <button className="seo-page-header" onClick={() => setOpen(o => !o)}>
        <div className="seo-page-header-left">
          <span className="seo-page-route">{page.route}</span>
          <span className="seo-page-label">{page.label}</span>
          {page.saved && <span className="seo-saved-badge">Saved</span>}
        </div>
        <div className="seo-page-header-right">
          <code className="seo-page-file">{page.filePath}</code>
          <span className="seo-chevron">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="seo-page-body">
          {page.note && <div className="seo-note">ℹ {page.note}</div>}

          {status === 'ok' && <div className="seo-toast seo-toast-ok"><CheckIcon /> Changes saved — live immediately</div>}
          {status === 'err' && <div className="seo-toast seo-toast-err"><IconClose /> {errMsg}</div>}

          <div className="seo-edit-field">
            <div className="seo-edit-label-row">
              <label className="seo-meta-label">Page Title</label>
              <span className="seo-char-hint" style={{ color: titleHint.color }}>{titleHint.text}</span>
            </div>
            <input className="seo-edit-input" value={form.title} onChange={field('title')} placeholder="Page Title" />
          </div>

          <div className="seo-edit-field">
            <div className="seo-edit-label-row">
              <label className="seo-meta-label">Meta Description</label>
              <span className="seo-char-hint" style={{ color: descHint.color }}>{descHint.text}</span>
            </div>
            <textarea className="seo-edit-textarea" value={form.description} onChange={field('description')} placeholder="Meta description shown in Google search results" rows={3} />
          </div>

          <div className="seo-edit-field">
            <label className="seo-meta-label">Canonical URL</label>
            <input className="seo-edit-input" value={form.canonical} onChange={field('canonical')} placeholder="https://genranq.com/page" />
          </div>

          <details className="seo-og-toggle">
            <summary>Open Graph (Social sharing)</summary>
            <div className="seo-og-fields">
              <div className="seo-edit-field">
                <label className="seo-meta-label">OG Title</label>
                <input className="seo-edit-input" value={form.og_title} onChange={e => { setForm(f => ({ ...f, og_title: e.target.value })); setStatus('idle') }} placeholder="Title for Facebook, LinkedIn, Twitter" />
              </div>
              <div className="seo-edit-field">
                <label className="seo-meta-label">OG Description</label>
                <textarea className="seo-edit-textarea" value={form.og_description} onChange={e => { setForm(f => ({ ...f, og_description: e.target.value })); setStatus('idle') }} placeholder="Description for social sharing" rows={2} />
              </div>
              <div className="seo-edit-field">
                <label className="seo-meta-label">OG Image URL</label>
                <input className="seo-edit-input" value={form.og_image} onChange={e => { setForm(f => ({ ...f, og_image: e.target.value })); setStatus('idle') }} placeholder="https://genranq.com/og-image.jpg (1200×630)" />
              </div>
            </div>
          </details>

          <div className="seo-edit-actions">
            <button className="seo-reset-btn" onClick={reset} disabled={saving}>Reset to default</button>
            <button className="seo-save-btn" onClick={save} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SeoTab() {
  const [pages, setPages] = useState<LivePage[]>([])
  const [loading, setLoading] = useState(true)
  const [dbWarning, setDbWarning] = useState('')

  useEffect(() => {
    fetch('/api/admin/meta')
      .then(r => r.json())
      .then(d => {
        if (d.dbWarning) setDbWarning(d.dbWarning)
        if (d.pages) setPages(d.pages)
      })
      .catch(() => setDbWarning('Could not reach server'))
      .finally(() => setLoading(false))
  }, [])

  function onSaved(updated: LivePage) {
    setPages(ps => ps.map(p => p.route === updated.route ? updated : p))
  }

  return (
    <div className="seo-tab">
      <div className="seo-tab-intro">
        <h2>Page SEO</h2>
        <p>Click any page to edit its title, description, and Open Graph tags. Changes save to the database and go live <strong>immediately</strong> — no code editing, no redeployment needed.</p>
      </div>

      {dbWarning && (
        <div className="seo-db-warning">
          <span className="seo-db-warning-icon"><IconAlertTriangle /></span>
          <div>
            <strong>Database not connected</strong> — pages below show code defaults only. Saves will not persist until you add your Hostinger MySQL credentials to <code>.env.local</code>
            <span className="seo-db-warning-keys"> (DB_HOST · DB_USER · DB_PASSWORD · DB_NAME)</span>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: 32, color: '#9ca3af', fontSize: 14 }}>Loading pages...</div>
      ) : (
        <div className="seo-pages-list">
          {pages.map(page => <MetaEditPanel key={page.route} page={page} onSaved={onSaved} />)}
        </div>
      )}
    </div>
  )
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Homepage',
  '/about': 'About',
  '/contact': 'Contact',
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
  '/services/analytics': 'Analytics',
  '/services/web-design': 'Web Design',
  '/insights': 'Insights',
}

function ContentPageEditor({ page, blocks, saved, onUpdate, searchQuery }: {
  page: string
  blocks: Record<string, string>
  saved: Record<string, string>
  onUpdate: (key: string, val: string) => void
  searchQuery: string
}) {
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const allMeta = defaultContent.filter(b => b.page === page)

  // Group blocks by section (Hero, Stats, Process, Pricing, etc.)
  const sections = Array.from(new Set(allMeta.map(b => b.section || 'General Content')))

  const hasChanges = allMeta.some(b => blocks[b.key] !== saved[b.key])
  const changedCount = allMeta.filter(b => blocks[b.key] !== saved[b.key]).length

  function toggleSection(sec: string) {
    setOpenSections(prev => ({ ...prev, [sec]: prev[sec] === undefined ? false : !prev[sec] }))
  }

  function isSectionOpen(sec: string) {
    if (searchQuery.trim()) return true // Auto-expand all when searching
    return openSections[sec] !== false // Default open
  }

  async function saveSection(sectionName?: string) {
    setSaving(true)
    setStatus('idle')
    let ok = true
    const targets = sectionName ? allMeta.filter(b => (b.section || 'General Content') === sectionName) : allMeta

    for (const b of targets) {
      if (blocks[b.key] === saved[b.key]) continue
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, key: b.key, content: blocks[b.key] }),
      })
      if (!res.ok) ok = false
    }
    setStatus(ok ? 'ok' : 'err')
    setSaving(false)
    if (ok) setTimeout(() => setStatus('idle'), 3000)
  }

  async function resetAll() {
    if (!confirm('Reset all content on this page to code defaults?')) return
    await fetch('/api/admin/content', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page }),
    })
    for (const b of allMeta) onUpdate(b.key, b.value)
  }

  return (
    <div className="cnt-editor-wrap">
      <div className="cnt-editor-header">
        <div>
          <div className="cnt-editor-title-row">
            <h3>{PAGE_LABELS[page] || page}</h3>
            <span className="cnt-route-pill">{page}</span>
            {hasChanges && <span className="cnt-changes-badge">● {changedCount} unsaved {changedCount === 1 ? 'change' : 'changes'}</span>}
          </div>
          <p className="cnt-editor-subtitle">Edit text, images, buttons, and sections on this page. Drag &amp; drop images directly into text blocks.</p>
        </div>

        <div className="cnt-header-actions">
          <a href={page} target="_blank" rel="noopener noreferrer" className="adm-btn-ghost adm-btn-sm" title="View live page in new tab">
            View Live Page ↗
          </a>
          <button className="adm-btn-primary adm-btn-sm" style={{ width: 'auto' }} onClick={() => saveSection()} disabled={saving || !hasChanges}>
            {saving ? 'Saving...' : hasChanges ? `Save Page (${changedCount})` : 'All Saved'}
          </button>
        </div>
      </div>

      {status === 'ok' && <div className="seo-toast seo-toast-ok"><CheckIcon /> Changes saved &amp; live immediately!</div>}
      {status === 'err' && <div className="seo-toast seo-toast-err"><IconClose /> Failed to save — check DB connection in .env.local</div>}

      <div className="cnt-sections-list">
        {sections.map(sec => {
          const secMeta = allMeta.filter(b => (b.section || 'General Content') === sec)
          const filteredMeta = searchQuery.trim()
            ? secMeta.filter(b => b.label.toLowerCase().includes(searchQuery.toLowerCase()) || (blocks[b.key] || '').toLowerCase().includes(searchQuery.toLowerCase()))
            : secMeta

          if (filteredMeta.length === 0) return null

          const secHasChanges = secMeta.some(b => blocks[b.key] !== saved[b.key])
          const isOpen = isSectionOpen(sec)

          return (
            <div className={`cnt-section-card${isOpen ? ' open' : ''}`} key={sec}>
              <div className="cnt-section-head" onClick={() => toggleSection(sec)}>
                <div className="cnt-section-head-left">
                  <span className="cnt-section-icon"><IconBookOpen /></span>
                  <strong>{sec} Section</strong>
                  <span className="cnt-section-count">{filteredMeta.length} {filteredMeta.length === 1 ? 'item' : 'items'}</span>
                  {secHasChanges && <span className="cnt-sec-dirty-dot" title="Unsaved changes in this section">●</span>}
                </div>

                <div className="cnt-section-head-right">
                  {secHasChanges && (
                    <button
                      type="button"
                      className="adm-btn-primary adm-btn-sm"
                      style={{ width: 'auto', padding: '4px 10px', fontSize: 11 }}
                      onClick={e => { e.stopPropagation(); saveSection(sec) }}
                      disabled={saving}
                    >
                      Save Section
                    </button>
                  )}
                  <span className="cnt-accordion-arrow">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {isOpen && (
                <div className="cnt-section-body">
                  {filteredMeta.map(b => (
                    <div key={`${page}_${b.section}_${b.key}`} className="cnt-field-row">
                      <div className="cnt-field-label-wrap">
                        <label className="cnt-field-label">{b.label}</label>
                        <span className="cnt-field-key">{b.key}</span>
                      </div>

                      {b.type === 'textarea' ? (
                        <RichTextEditor
                          compact
                          value={blocks[b.key] || ''}
                          onChange={val => onUpdate(b.key, val)}
                          placeholder={`Edit ${b.label.toLowerCase()}... Drag & drop images anywhere`}
                        />
                      ) : (
                        <input
                          className="cnt-field-input"
                          value={blocks[b.key] || ''}
                          onChange={e => onUpdate(b.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="cnt-footer-bar">
        <button type="button" className="seo-reset-btn" onClick={resetAll} disabled={saving}>
          Reset page to defaults
        </button>
        <button
          type="button"
          className="adm-btn-primary"
          style={{ width: 'auto', padding: '10px 24px' }}
          onClick={() => saveSection()}
          disabled={saving || !hasChanges}
        >
          {saving ? 'Saving...' : hasChanges ? `Save All Page Changes (${changedCount})` : 'Page Up To Date'}
        </button>
      </div>
    </div>
  )
}

function ContentTab() {
  const [blocks, setBlocks] = useState<Record<string, Record<string, string>>>({})
  const [savedState, setSavedState] = useState<Record<string, Record<string, string>>>({})
  const [activePage, setActivePage] = useState('/')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [dbWarn, setDbWarn] = useState('')

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(d => {
        if (d.blocks) {
          setBlocks(d.blocks)
          setSavedState(JSON.parse(JSON.stringify(d.blocks)))
        }
        if (d.dbWarning) setDbWarn(d.dbWarning)
      })
      .catch(() => setDbWarn('Could not reach server'))
      .finally(() => setLoading(false))
  }, [])

  const pages = [...new Set(defaultContent.map(b => b.page))]

  function updateBlock(page: string, key: string, val: string) {
    setBlocks(prev => ({ ...prev, [page]: { ...prev[page], [key]: val } }))
  }

  return (
    <div className="seo-tab">
      <div className="seo-tab-intro">
        <h2>Visual Page Content Editor</h2>
        <p>WordPress-style visual editor for all pages, headings, pricing plans, and text blocks. Drag &amp; drop images directly into text.</p>
      </div>

      {dbWarn && (
        <div className="seo-db-warning">
          <span className="seo-db-warning-icon"><IconAlertTriangle /></span>
          <div><strong>Database not connected.</strong> {dbWarn}</div>
        </div>
      )}

      {/* WordPress-Style Page Selector Tabs & Search */}
      <div className="cnt-toolbar">
        <div className="cnt-page-pills">
          {pages.map(p => {
            const label = PAGE_LABELS[p] || p
            const isSelected = activePage === p
            const pageMeta = defaultContent.filter(b => b.page === p)
            const hasDirty = pageMeta.some(b => (blocks[p]?.[b.key] ?? b.value) !== (savedState[p]?.[b.key] ?? b.value))

            return (
              <button
                key={p}
                type="button"
                className={`cnt-page-pill${isSelected ? ' active' : ''}`}
                onClick={() => { setActivePage(p); setSearchQuery('') }}
              >
                {label}
                {hasDirty && <span className="cnt-pill-dirty">●</span>}
              </button>
            )
          })}
        </div>

        <div className="cnt-search-box">
          <span className="cnt-search-icon"><IconSearch /></span>
          <input
            type="text"
            placeholder="Search any text on this page..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button type="button" className="cnt-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
              <IconClose />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 48, color: '#9ca3af', textAlign: 'center', fontSize: 15 }}>Loading content blocks...</div>
      ) : (
        <ContentPageEditor
          key={activePage}
          page={activePage}
          blocks={blocks[activePage] || {}}
          saved={savedState[activePage] || {}}
          onUpdate={(k, v) => updateBlock(activePage, k, v)}
          searchQuery={searchQuery}
        />
      )}
    </div>
  )
}

type CityRecord = {
  slug: string
  city_name: string
  state: string
  country: string
  service: string
  hero_heading: string
  hero_subheading: string
  description: string
  meta_title: string
  meta_description: string
  phone: string
  address: string
  population: string
  local_keywords: string
  testimonial_name: string
  testimonial_role: string
  testimonial_quote: string
  active: number
}

function CityEditModal({ city, onClose, onSaved }: { city: CityRecord | null; onClose: () => void; onSaved: () => void }) {
  const blank: CityRecord = {
    slug: '', city_name: '', state: '', country: '', service: 'SEO Services',
    hero_heading: '', hero_subheading: '', description: '', meta_title: '', meta_description: '',
    phone: '', address: '', population: '', local_keywords: '',
    testimonial_name: '', testimonial_role: '', testimonial_quote: '', active: 1,
  }
  const [form, setForm] = useState<CityRecord>(city || blank)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  function upd<K extends keyof CityRecord>(k: K, v: CityRecord[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 200)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setErr('')
    const method = city ? 'PUT' : 'POST'
    const payload = { ...form, slug: form.slug || autoSlug(form.city_name + (form.state ? '-' + form.state : '')) }
    const res = await fetch('/api/admin/cities', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok) {
      onSaved()
    } else {
      setErr(data.error || 'Failed to save')
    }
    setSaving(false)
  }

  const rows: [string, keyof CityRecord, 'text' | 'textarea'][] = [
    ['City Name', 'city_name', 'text'],
    ['Slug', 'slug', 'text'],
    ['State', 'state', 'text'],
    ['Country', 'country', 'text'],
    ['Service', 'service', 'text'],
    ['Hero Heading', 'hero_heading', 'textarea'],
    ['Hero Subheading', 'hero_subheading', 'textarea'],
    ['Description', 'description', 'textarea'],
    ['Meta Title', 'meta_title', 'text'],
    ['Meta Description', 'meta_description', 'textarea'],
    ['Phone', 'phone', 'text'],
    ['Address', 'address', 'text'],
    ['Population', 'population', 'text'],
    ['Local Keywords', 'local_keywords', 'text'],
    ['Testimonial Name', 'testimonial_name', 'text'],
    ['Testimonial Role', 'testimonial_role', 'text'],
    ['Testimonial Quote', 'testimonial_quote', 'textarea'],
  ]

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-form-header" style={{ marginBottom: 16 }}>
          <h2>{city ? 'Edit City' : 'Add City'}</h2>
          <button className="adm-btn-ghost adm-btn-sm" onClick={onClose} style={{ marginLeft: 'auto' }}>Close</button>
        </div>
        {err && <div className="seo-toast seo-toast-err" style={{ marginBottom: 12 }}>{err}</div>}
        <form onSubmit={save} style={{ maxHeight: '70vh', overflowY: 'auto', padding: '0 4px' }}>
          {rows.map(([label, key, type]) => (
            <div key={key} className="seo-edit-field">
              <label className="seo-meta-label">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  className="seo-edit-textarea"
                  value={String(form[key] || '')}
                  onChange={e => upd(key, e.target.value as never)}
                  rows={3}
                />
              ) : (
                <input
                  className="seo-edit-input"
                  value={String(form[key] || '')}
                  onChange={e => {
                    upd(key, e.target.value as never)
                    if (key === 'city_name' && !city) upd('slug', autoSlug(e.target.value + (form.state ? '-' + form.state : '')) as never)
                  }}
                  required={key === 'city_name'}
                />
              )}
            </div>
          ))}
          <div className="seo-edit-actions" style={{ position: 'sticky', bottom: 0, background: '#fff', paddingTop: 12 }}>
            <button type="button" className="seo-reset-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="seo-save-btn" disabled={saving}>
              {saving ? 'Saving...' : city ? 'Update City' : 'Create City'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CitiesTab() {
  const [cities, setCities] = useState<CityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [dbWarn, setDbWarn] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState('')
  const [editCity, setEditCity] = useState<CityRecord | null | 'new'>(null)
  const [search, setSearch] = useState('')

  const fetchCities = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/cities')
      const data = await res.json()
      if (data.dbWarning) setDbWarn(data.dbWarning)
      setCities(data.cities || [])
    } catch {
      setDbWarn('Could not reach server')
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchCities() }, [fetchCities])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadResult('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/cities', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        setUploadResult(`Uploaded: ${data.inserted} new, ${data.updated} updated, ${data.skipped} skipped`)
        fetchCities()
      } else {
        setUploadResult(`Error: ${data.error}`)
      }
    } catch {
      setUploadResult('Upload failed')
    }
    setUploading(false)
    e.target.value = ''
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete city '${slug}' permanently?`)) return
    await fetch('/api/admin/cities', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
    fetchCities()
  }

  async function toggleActive(city: CityRecord) {
    await fetch('/api/admin/cities', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: city.slug, active: !city.active }),
    })
    fetchCities()
  }

  const filtered = search
    ? cities.filter(c =>
        c.city_name.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase()) ||
        c.slug.toLowerCase().includes(search.toLowerCase())
      )
    : cities

  const activeCount = cities.filter(c => c.active).length
  const countries = [...new Set(cities.map(c => c.country).filter(Boolean))]

  return (
    <div className="seo-tab">
      <div className="seo-tab-intro">
        <h2>City Pages</h2>
        <p>Manage city-based SEO landing pages. Upload an Excel/CSV file to bulk import, or add cities one at a time. Changes go live <strong>immediately</strong>.</p>
      </div>

      {dbWarn && (
        <div className="seo-db-warning">
          <span className="seo-db-warning-icon">\u26A0</span>
          <div><strong>Database not connected.</strong> {dbWarn}</div>
        </div>
      )}

      <div className="adm-stats" style={{ marginBottom: 20 }}>
        <div className="adm-stat"><span className="adm-stat-val">{cities.length}</span><span className="adm-stat-lab">Total Cities</span></div>
        <div className="adm-stat"><span className="adm-stat-val">{activeCount}</span><span className="adm-stat-lab">Active</span></div>
        <div className="adm-stat"><span className="adm-stat-val">{countries.length}</span><span className="adm-stat-lab">Countries</span></div>
      </div>

      <div className="adm-toolbar">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}>
          <input
            className="seo-edit-input"
            placeholder="Search cities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 260 }}
          />
          <label className="adm-btn-ghost" style={{ cursor: 'pointer', padding: '8px 16px', fontSize: 13 }}>
            {uploading ? 'Uploading...' : 'Upload Excel/CSV'}
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
          {uploadResult && <span style={{ fontSize: 13, color: uploadResult.startsWith('Error') ? '#dc2626' : '#16a34a' }}>{uploadResult}</span>}
        </div>
        <button className="adm-btn-primary" onClick={() => setEditCity('new')}>Add City</button>
      </div>

      {loading ? (
        <div style={{ padding: 32, color: '#9ca3af', fontSize: 14 }}>Loading cities...</div>
      ) : filtered.length === 0 ? (
        <div className="adm-empty">{search ? 'No cities match your search.' : 'No cities yet. Upload an Excel file or add one manually.'}</div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>City</th><th>State</th><th>Country</th><th>Service</th><th>Slug</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(city => (
                <tr key={city.slug} className={!city.active ? 'adm-row-draft' : ''}>
                  <td className="adm-cell-title"><span>{city.city_name}</span></td>
                  <td>{city.state}</td>
                  <td>{city.country}</td>
                  <td>{city.service}</td>
                  <td style={{ fontSize: 12, fontFamily: 'monospace', color: '#6b7280' }}>/{city.slug}</td>
                  <td>
                    <button className={`adm-status ${city.active ? 'published' : 'draft'}`} onClick={() => toggleActive(city)}>
                      {city.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="adm-cell-actions">
                    <button className="adm-act-btn" onClick={() => setEditCity(city)}>Edit</button>
                    <button className="adm-act-btn adm-act-del" onClick={() => handleDelete(city.slug)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editCity && (
        <CityEditModal
          city={editCity === 'new' ? null : editCity}
          onClose={() => setEditCity(null)}
          onSaved={() => { setEditCity(null); fetchCities() }}
        />
      )}
    </div>
  )
}

export default function AdminDashboard({ authenticated }: { authenticated: boolean }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [dbError, setDbError] = useState('')
  const [tab, setTab] = useState<'posts' | 'seo' | 'content' | 'cities'>('posts')
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editTarget, setEditTarget] = useState<FormData>(emptyForm)
  const [filter, setFilter] = useState<'all' | 'article' | 'blog'>('all')
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setDbError('')
    const url = filter === 'all' ? '/api/admin/posts?drafts=1' : `/api/admin/posts?type=${filter}&drafts=1`
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (res.status === 503) {
        setDbError(data.error || 'Database not connected')
        setPosts([])
      } else {
        setPosts(data.items || [])
      }
    } catch {
      setDbError('Could not reach the server.')
    }
    setLoading(false)
  }, [filter])

  useEffect(() => {
    if (authenticated) fetchPosts()
  }, [authenticated, fetchPosts])

  if (!authenticated) return <LoginScreen />

  async function handleSave(form: FormData) {
    const isEdit = !!editTarget.id
    const method = isEdit ? 'PUT' : 'POST'
    await fetch('/api/admin/posts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        featured: form.featured ? 1 : 0,
        published: form.published,
      }),
    })
    setView('list')
    setEditTarget(emptyForm)
    await fetchPosts()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post permanently?')) return
    await fetch('/api/admin/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchPosts()
  }

  async function togglePublish(post: Post) {
    await fetch('/api/admin/posts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    })
    await fetchPosts()
  }

  function startEdit(post: Post) {
    setEditTarget({
      id: post.id, type: post.type, tag: post.tag, title: post.title,
      description: post.description || '', content: post.content || '',
      author: post.author, read_time: post.read_time, slug: post.slug,
      cover_gradient: post.cover_gradient, featured: !!post.featured, published: !!post.published,
    })
    setView('form')
  }

  function startCreate() {
    setEditTarget(emptyForm)
    setView('form')
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    window.location.reload()
  }

  const articleCount = posts.filter(p => p.type === 'article').length
  const blogCount = posts.filter(p => p.type === 'blog').length
  const draftCount = posts.filter(p => !p.published).length

  return (
    <div className="adm-wrap">
      <header className="adm-header">
        <div className="adm-header-left">
          <span className="adm-brand" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/logo-icon.png" alt="Gen Ranq" style={{ height: 24, width: 'auto' }} />
            <span>Gen Ranq</span>
          </span>
          <span className="adm-badge">Admin</span>
        </div>
        <div className="adm-header-right">
          <a href="/" className="adm-link" target="_blank" rel="noopener">View Site</a>
          <button className="adm-btn-ghost adm-btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="adm-tabs">
        <button className={`adm-tab${tab === 'posts' ? ' active' : ''}`} onClick={() => { setTab('posts'); setView('list') }}>Posts</button>
        <button className={`adm-tab${tab === 'seo' ? ' active' : ''}`} onClick={() => setTab('seo')}>Page SEO</button>
        <button className={`adm-tab${tab === 'content' ? ' active' : ''}`} onClick={() => setTab('content')}>Content</button>
        <button className={`adm-tab${tab === 'cities' ? ' active' : ''}`} onClick={() => setTab('cities')}>Cities</button>
      </div>

      <main className="adm-main">
        {tab === 'seo' ? <SeoTab /> : tab === 'content' ? <ContentTab /> : tab === 'cities' ? <CitiesTab /> : view === 'list' ? (
          <>
            {dbError && (
              <div style={{ margin: '0 0 20px', padding: '14px 18px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, fontSize: 14, color: '#b91c1c', lineHeight: 1.6 }}>
                <strong>Database not connected:</strong> {dbError}
                <br />
                <span style={{ fontSize: 13, color: '#7f1d1d', marginTop: 4, display: 'block' }}>
                  Set <code style={{ background: '#fee2e2', padding: '1px 5px', borderRadius: 3 }}>DB_HOST</code>, <code style={{ background: '#fee2e2', padding: '1px 5px', borderRadius: 3 }}>DB_USER</code>, <code style={{ background: '#fee2e2', padding: '1px 5px', borderRadius: 3 }}>DB_PASSWORD</code>, <code style={{ background: '#fee2e2', padding: '1px 5px', borderRadius: 3 }}>DB_NAME</code> in <strong>.env.local</strong> to your Hostinger MySQL credentials, then restart the server.
                </span>
              </div>
            )}
            <div className="adm-stats">
              <div className="adm-stat"><span className="adm-stat-val">{posts.length}</span><span className="adm-stat-lab">Total Posts</span></div>
              <div className="adm-stat"><span className="adm-stat-val">{articleCount}</span><span className="adm-stat-lab">Articles</span></div>
              <div className="adm-stat"><span className="adm-stat-val">{blogCount}</span><span className="adm-stat-lab">Blogs</span></div>
              <div className="adm-stat"><span className="adm-stat-val">{draftCount}</span><span className="adm-stat-lab">Drafts</span></div>
            </div>

            <div className="adm-toolbar">
              <div className="adm-filters">
                {(['all', 'article', 'blog'] as const).map(f => (
                  <button key={f} className={`adm-filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                    {f === 'all' ? 'All' : f === 'article' ? 'Articles' : 'Blogs'}
                  </button>
                ))}
              </div>
              <button className="adm-btn-primary" onClick={startCreate}>New Post</button>
            </div>

            {loading ? (
              <div className="adm-loading">Loading...</div>
            ) : posts.length === 0 ? (
              <div className="adm-empty">No posts yet. Create your first one.</div>
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Title</th><th>Type</th><th>Tag</th><th>Author</th><th>Status</th><th>Date</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => (
                      <tr key={post.id} className={!post.published ? 'adm-row-draft' : ''}>
                        <td className="adm-cell-title">
                          <span>{post.title}</span>
                          {post.featured ? <span className="adm-featured-badge">Featured</span> : null}
                        </td>
                        <td><span className={`adm-type-badge adm-type-${post.type}`}>{post.type}</span></td>
                        <td>{post.tag}</td>
                        <td>{post.author}</td>
                        <td>
                          <button className={`adm-status ${post.published ? 'published' : 'draft'}`} onClick={() => togglePublish(post)}>
                            {post.published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="adm-cell-date">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="adm-cell-actions">
                          <button className="adm-act-btn" onClick={() => startEdit(post)}>Edit</button>
                          <button className="adm-act-btn adm-act-del" onClick={() => handleDelete(post.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="adm-form-header"><h2>{editTarget.id ? 'Edit Post' : 'New Post'}</h2></div>
            <PostForm initial={editTarget} onSave={handleSave} onCancel={() => { setView('list'); setEditTarget(emptyForm) }} />
          </>
        )}
      </main>
    </div>
  )
}
