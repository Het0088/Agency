'use client'

import { useState, useEffect, useCallback } from 'react'

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
        <div className="adm-login-brand">Omniranq</div>
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
        <label>Content (HTML)</label>
        <textarea
          value={form.content}
          onChange={e => set('content', e.target.value)}
          placeholder="Full post content. Supports HTML."
          rows={14}
          className="adm-content-area"
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

export default function AdminDashboard({ authenticated }: { authenticated: boolean }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editTarget, setEditTarget] = useState<FormData>(emptyForm)
  const [filter, setFilter] = useState<'all' | 'article' | 'blog'>('all')
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const url = filter === 'all' ? '/api/admin/posts?drafts=1' : `/api/admin/posts?type=${filter}&drafts=1`
    const res = await fetch(url)
    const data = await res.json()
    setPosts(data.items || [])
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
          <span className="adm-brand">Omniranq</span>
          <span className="adm-badge">Admin</span>
        </div>
        <div className="adm-header-right">
          <a href="/" className="adm-link" target="_blank" rel="noopener">View Site</a>
          <button className="adm-btn-ghost adm-btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="adm-main">
        {view === 'list' ? (
          <>
            <div className="adm-stats">
              <div className="adm-stat">
                <span className="adm-stat-val">{posts.length}</span>
                <span className="adm-stat-lab">Total Posts</span>
              </div>
              <div className="adm-stat">
                <span className="adm-stat-val">{articleCount}</span>
                <span className="adm-stat-lab">Articles</span>
              </div>
              <div className="adm-stat">
                <span className="adm-stat-val">{blogCount}</span>
                <span className="adm-stat-lab">Blogs</span>
              </div>
              <div className="adm-stat">
                <span className="adm-stat-val">{draftCount}</span>
                <span className="adm-stat-lab">Drafts</span>
              </div>
            </div>

            <div className="adm-toolbar">
              <div className="adm-filters">
                {(['all', 'article', 'blog'] as const).map(f => (
                  <button
                    key={f}
                    className={`adm-filter${filter === f ? ' active' : ''}`}
                    onClick={() => setFilter(f)}
                  >
                    {f === 'all' ? 'All' : f === 'article' ? 'Articles' : 'Blogs'}
                  </button>
                ))}
              </div>
              <button className="adm-btn-primary" onClick={startCreate}>
                New Post
              </button>
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
                      <th>Title</th>
                      <th>Type</th>
                      <th>Tag</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
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
            <div className="adm-form-header">
              <h2>{editTarget.id ? 'Edit Post' : 'New Post'}</h2>
            </div>
            <PostForm
              initial={editTarget}
              onSave={handleSave}
              onCancel={() => { setView('list'); setEditTarget(emptyForm) }}
            />
          </>
        )}
      </main>
    </div>
  )
}
