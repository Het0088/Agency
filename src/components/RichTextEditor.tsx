'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { CheckIcon, IconZap, IconUpload } from './Icons'

type RichEditorProps = {
  value: string
  onChange: (html: string) => void
  compact?: boolean
  placeholder?: string
}

const FONT_SIZES = [
  { label: 'Normal', value: '' },
  { label: 'Small', value: '2' },
  { label: 'Large', value: '5' },
  { label: 'Huge', value: '7' },
]

const HEADING_OPTIONS = [
  { label: 'Paragraph', tag: 'p' },
  { label: 'Heading 1', tag: 'h1' },
  { label: 'Heading 2', tag: 'h2' },
  { label: 'Heading 3', tag: 'h3' },
  { label: 'Heading 4', tag: 'h4' },
  { label: 'Heading 5', tag: 'h5' },
  { label: 'Heading 6', tag: 'h6' },
]

const TEXT_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#ffffff',
  '#ff5a1f', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#1abc9c',
  '#3498db', '#9b59b6', '#e91e63', '#795548',
]

function ToolbarButton({ cmd, arg, icon, title, active, onClick }: {
  cmd?: string
  arg?: string
  icon: React.ReactNode
  title: string
  active?: boolean
  onClick?: () => void
}) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    if (onClick) {
      onClick()
      return
    }
    if (cmd) {
      document.execCommand(cmd, false, arg || '')
    }
  }

  return (
    <button
      type="button"
      className={`rte-btn${active ? ' rte-btn-active' : ''}`}
      onMouseDown={handleClick}
      title={title}
      aria-label={title}
    >
      {icon}
    </button>
  )
}

function LinkDialog({
  initialText = '',
  onInsert,
  onClose,
}: {
  initialText?: string
  onInsert: (url: string, text: string, newTab: boolean, noFollow: boolean) => void
  onClose: () => void
}) {
  const [url, setUrl] = useState('https://')
  const [text, setText] = useState(initialText)
  const [newTab, setNewTab] = useState(true)
  const [noFollow, setNoFollow] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="rte-dialog-overlay" onMouseDown={onClose}>
      <div className="rte-dialog" onMouseDown={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="rte-dialog-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2563eb' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            Insert Hyperlink
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: '#94a3b8' }}
          >
            ✕
          </button>
        </div>

        <div className="rte-dialog-field">
          <label>Destination Web Address (URL) *</label>
          <input
            ref={inputRef}
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com/target-page"
          />
        </div>

        <div className="rte-dialog-field">
          <label>Text to Display in Article</label>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={initialText || 'Click here to read more'}
          />
          <span style={{ fontSize: 11, color: '#64748b', marginTop: 4, display: 'block' }}>
            {initialText ? '✓ Pre-filled from your highlighted text' : 'Leave blank to display the URL itself'}
          </span>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: 8, margin: '14px 0 18px', border: '1px solid #e2e8f0' }}>
          <label className="rte-dialog-check" style={{ marginBottom: 8 }}>
            <input type="checkbox" checked={newTab} onChange={e => setNewTab(e.target.checked)} />
            Open link in a new browser tab (recommended for external links)
          </label>
          <label className="rte-dialog-check" style={{ marginBottom: 0 }}>
            <input type="checkbox" checked={noFollow} onChange={e => setNoFollow(e.target.checked)} />
            Add rel=&quot;nofollow&quot; (for sponsor or unendorsed external links)
          </label>
        </div>

        <div className="rte-dialog-actions">
          <button type="button" className="adm-btn-ghost adm-btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="adm-btn-primary adm-btn-sm"
            style={{ width: 'auto', background: '#2563eb' }}
            onClick={() => {
              if (url && url !== 'https://') {
                onInsert(url, text, newTab, noFollow)
              }
              onClose()
            }}
            disabled={!url || url === 'https://'}
          >
            Insert Hyperlink
          </button>
        </div>
      </div>
    </div>
  )
}

function ImageDialog({
  onInsert,
  onClose,
}: {
  onInsert: (url: string, alt: string, caption?: string, align?: string) => void
  onClose: () => void
}) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload')
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [caption, setCaption] = useState('')
  const [align, setAlign] = useState<'center' | 'full' | 'left' | 'right'>('center')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setUrl(data.url)
        if (!alt) {
          setAlt(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
        }
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch {
      setError('Upload failed. Please check network connection.')
    }
    setUploading(false)
  }

  return (
    <div className="rte-dialog-overlay" onMouseDown={onClose}>
      <div className="rte-dialog" onMouseDown={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="rte-dialog-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#ea580c' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.8" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </span>
            Add / Upload Image
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: '#94a3b8' }}
          >
            ✕
          </button>
        </div>

        {/* Tabs: Upload vs URL */}
        <div className="rte-dialog-tabs">
          <button
            type="button"
            className={`rte-dialog-tab-btn${tab === 'upload' ? ' active' : ''}`}
            onClick={() => setTab('upload')}
          >
            📁 Upload from Computer
          </button>
          <button
            type="button"
            className={`rte-dialog-tab-btn${tab === 'url' ? ' active' : ''}`}
            onClick={() => setTab('url')}
          >
            🌐 Paste Image URL
          </button>
        </div>

        {tab === 'upload' ? (
          <div className="rte-dialog-field">
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
            <div className="rte-dropzone-box" onClick={() => fileRef.current?.click()}>
              <span style={{ width: 44, height: 44, borderRadius: '50%', background: '#ffedd5', color: '#ea580c', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </span>
              <strong style={{ fontSize: 14, color: '#1e293b' }}>
                {uploading ? 'Uploading image to server...' : 'Click to Choose Image from Computer'}
              </strong>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Supports JPG, PNG, WebP, GIF, SVG (up to 10MB)
              </span>
            </div>

            {url && (
              <div className="rte-image-preview-box">
                <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <span>✓ Uploaded successfully! Preview below:</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={alt || 'Uploaded preview'} />
              </div>
            )}
          </div>
        ) : (
          <div className="rte-dialog-field">
            <label>Image Web URL (HTTPS) *</label>
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or https://domain.com/photo.jpg"
            />
            {url && (
              <div className="rte-image-preview-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={alt || 'URL preview'} />
              </div>
            )}
          </div>
        )}

        {/* Image Metadata & Styling Options */}
        <div className="rte-dialog-field">
          <label>Alt Text / Description (Important for Google SEO)</label>
          <input
            value={alt}
            onChange={e => setAlt(e.target.value)}
            placeholder="e.g. Technical SEO Core Web Vitals Audit Graph"
          />
        </div>

        <div className="rte-dialog-field">
          <label>Caption (Optional — appears under image)</label>
          <input
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="e.g. Figure 1: 2026 Core Web Vitals telemetry"
          />
        </div>

        <div className="rte-dialog-field">
          <label>Image Alignment &amp; Size</label>
          <div className="rte-align-picker">
            <button
              type="button"
              className={`rte-align-btn${align === 'center' ? ' active' : ''}`}
              onClick={() => setAlign('center')}
            >
              Center (Standard)
            </button>
            <button
              type="button"
              className={`rte-align-btn${align === 'full' ? ' active' : ''}`}
              onClick={() => setAlign('full')}
            >
              Full Width
            </button>
            <button
              type="button"
              className={`rte-align-btn${align === 'left' ? ' active' : ''}`}
              onClick={() => setAlign('left')}
            >
              Wrap Left
            </button>
            <button
              type="button"
              className={`rte-align-btn${align === 'right' ? ' active' : ''}`}
              onClick={() => setAlign('right')}
            >
              Wrap Right
            </button>
          </div>
        </div>

        {error && <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{error}</div>}

        <div className="rte-dialog-actions">
          <button type="button" className="adm-btn-ghost adm-btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="adm-btn-primary adm-btn-sm"
            style={{ width: 'auto', background: '#ea580c' }}
            onClick={() => {
              if (url) onInsert(url, alt, caption, align)
              onClose()
            }}
            disabled={!url || uploading}
          >
            Insert Image into Post
          </button>
        </div>
      </div>
    </div>
  )
}

function EmbedDialog({ onInsert, onClose }: { onInsert: (html: string) => void; onClose: () => void }) {
  const [url, setUrl] = useState('')

  function getEmbedHtml(rawUrl: string): string {
    let videoId = ''
    try {
      const u = new URL(rawUrl)
      if (u.hostname.includes('youtube.com')) videoId = u.searchParams.get('v') || ''
      else if (u.hostname.includes('youtu.be')) videoId = u.pathname.slice(1)
    } catch {
      return ''
    }
    if (!videoId) return ''
    return `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:24px 0;border-radius:10px;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div>`
  }

  return (
    <div className="rte-dialog-overlay" onMouseDown={onClose}>
      <div className="rte-dialog" onMouseDown={e => e.stopPropagation()}>
        <div className="rte-dialog-title">Embed Video (YouTube)</div>
        <div className="rte-dialog-field">
          <label>YouTube Video Link</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            autoFocus
          />
        </div>
        <div className="rte-dialog-actions">
          <button type="button" className="adm-btn-ghost adm-btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="adm-btn-primary adm-btn-sm"
            style={{ width: 'auto' }}
            onClick={() => {
              const html = getEmbedHtml(url)
              if (html) onInsert(html)
              onClose()
            }}
          >
            Embed Video
          </button>
        </div>
      </div>
    </div>
  )
}

function TableDialog({
  onInsert,
  onClose,
}: {
  onInsert: (rows: number, cols: number, hasHeader: boolean) => void
  onClose: () => void
}) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [hasHeader, setHasHeader] = useState(true)

  return (
    <div className="rte-dialog-overlay" onMouseDown={onClose}>
      <div className="rte-dialog" onMouseDown={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="rte-dialog-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#16a34a' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
            </span>
            Insert Table (WordPress-Style)
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18, color: '#94a3b8' }}
          >
            ✕
          </button>
        </div>

        {/* Quick presets */}
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Quick Presets:
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { r: 2, c: 2, label: '2 × 2' },
              { r: 3, c: 3, label: '3 × 3' },
              { r: 4, c: 3, label: '4 × 3' },
              { r: 5, c: 4, label: '5 × 4' },
            ].map(p => (
              <button
                key={p.label}
                type="button"
                className="rte-preset-btn"
                onClick={() => {
                  setRows(p.r)
                  setCols(p.c)
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div className="rte-dialog-field" style={{ flex: 1 }}>
            <label>Number of Rows</label>
            <input
              type="number"
              min={1}
              max={20}
              value={rows}
              onChange={e => setRows(Math.max(1, Number(e.target.value)))}
            />
          </div>
          <div className="rte-dialog-field" style={{ flex: 1 }}>
            <label>Number of Columns</label>
            <input
              type="number"
              min={1}
              max={10}
              value={cols}
              onChange={e => setCols(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>

        <label className="rte-dialog-check">
          <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} />
          Include Header Row (styled distinct header)
        </label>

        <div className="rte-dialog-actions">
          <button type="button" className="adm-btn-ghost adm-btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="adm-btn-primary adm-btn-sm"
            style={{ width: 'auto', background: '#16a34a' }}
            onClick={() => {
              onInsert(rows, cols, hasHeader)
              onClose()
            }}
          >
            Insert Table into Post
          </button>
        </div>
      </div>
    </div>
  )
}


export default function RichTextEditor({ value, onChange, compact = false, placeholder }: RichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [sourceMode, setSourceMode] = useState(false)
  const [sourceCode, setSourceCode] = useState(value)
  const [selectedText, setSelectedText] = useState('')
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showEmbedDialog, setShowEmbedDialog] = useState(false)
  const [showTableDialog, setShowTableDialog] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showBgColorPicker, setShowBgColorPicker] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const savedSelection = useRef<Range | null>(null)
  const initialized = useRef(false)

  function saveSelection() {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0).cloneRange()
    }
  }

  function restoreSelection() {
    const sel = window.getSelection()
    if (sel && savedSelection.current) {
      sel.removeAllRanges()
      sel.addRange(savedSelection.current)
    }
  }

  useEffect(() => {
    if (editorRef.current && !initialized.current) {
      editorRef.current.innerHTML = value || ''
      initialized.current = true
    }
  }, [value])

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }, [onChange])

  function toggleSource() {
    if (sourceMode) {
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceCode
        onChange(sourceCode)
      }
    } else {
      setSourceCode(editorRef.current?.innerHTML || '')
    }
    setSourceMode(!sourceMode)
  }

  function handleInsertLink(url: string, text: string, newTab: boolean, noFollow: boolean) {
    restoreSelection()
    const displayText = text || url
    const relParts = []
    if (newTab) relParts.push('noopener', 'noreferrer')
    if (noFollow) relParts.push('nofollow')
    const rel = relParts.length ? ` rel="${relParts.join(' ')}"` : ''
    const target = newTab ? ' target="_blank"' : ''
    const html = `<a href="${url}"${target}${rel}>${displayText}</a>`
    document.execCommand('insertHTML', false, html)
    handleInput()
  }

  function handleInsertImage(url: string, alt: string, caption = '', align = 'center') {
    restoreSelection()
    let imgStyle = 'max-width:100%;height:auto;border-radius:8px;display:block;'
    let wrapStyle = 'margin:24px 0;'
    if (align === 'center') {
      imgStyle += 'margin-left:auto;margin-right:auto;'
      wrapStyle += 'text-align:center;'
    } else if (align === 'full') {
      imgStyle += 'width:100%;'
    } else if (align === 'left') {
      wrapStyle += 'float:left;margin-right:24px;margin-bottom:16px;max-width:50%;'
    } else if (align === 'right') {
      wrapStyle += 'float:right;margin-left:24px;margin-bottom:16px;max-width:50%;'
    }

    let html = ''
    if (caption) {
      html = `<figure style="${wrapStyle}"><img src="${url}" alt="${alt || ''}" style="${imgStyle}" /><figcaption style="font-size:13px;color:#64748b;margin-top:6px;font-style:italic;text-align:center;">${caption}</figcaption></figure><p><br></p>`
    } else {
      html = `<div style="${wrapStyle}"><img src="${url}" alt="${alt || ''}" style="${imgStyle}" /></div><p><br></p>`
    }
    document.execCommand('insertHTML', false, html)
    handleInput()
  }

  function handleInsertEmbed(html: string) {
    restoreSelection()
    document.execCommand('insertHTML', false, html)
    handleInput()
  }

  function handleInsertTable(rows: number, cols: number, hasHeader: boolean) {
    restoreSelection()
    let html = '<div class="table-wrap"><table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">'
    if (hasHeader) {
      html += '<thead><tr style="background:#f9fafb;border-bottom:2px solid #e5e5e5;">'
      for (let c = 0; c < cols; c++) {
        html += `<th style="border:1px solid #e5e5e5;padding:10px 14px;text-align:left;font-weight:600;">Header ${c + 1}</th>`
      }
      html += '</tr></thead>'
    }
    html += '<tbody>'
    for (let r = 0; r < (hasHeader ? rows - 1 : rows); r++) {
      const bg = r % 2 === 1 ? 'background:#fafafa;' : ''
      html += `<tr style="${bg}">`
      for (let c = 0; c < cols; c++) {
        html += `<td style="border:1px solid #e5e5e5;padding:10px 14px;">Cell ${r + 1},${c + 1}</td>`
      }
      html += '</tr>'
    }
    html += '</tbody></table></div><p><br></p>'
    document.execCommand('insertHTML', false, html)
    handleInput()
  }

  function insertHR() {
    document.execCommand('insertHTML', false, '<hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0;" />')
    handleInput()
  }

  function insertCodeBlock() {
    document.execCommand('insertHTML', false, '<pre style="background:#1e1e2e;color:#cdd6f4;padding:16px 20px;border-radius:8px;overflow-x:auto;font-size:14px;margin:16px 0;font-family:monospace;"><code>// Your code here</code></pre><p><br></p>')
    handleInput()
  }

  function formatBlock(tag: string) {
    if (tag === 'p') {
      document.execCommand('formatBlock', false, '<p>')
    } else {
      document.execCommand('formatBlock', false, `<${tag}>`)
    }
    handleInput()
  }

  function setFontSize(val: string) {
    if (!val) return
    document.execCommand('fontSize', false, val)
    handleInput()
  }

  function setTextColor(color: string) {
    document.execCommand('foreColor', false, color)
    setShowColorPicker(false)
    handleInput()
  }

  function setBgColor(color: string) {
    document.execCommand('hiliteColor', false, color)
    setShowBgColorPicker(false)
    handleInput()
  }

  function clearFormatting() {
    document.execCommand('removeFormat', false, '')
    handleInput()
  }

  // ─── Direct File Upload (shared by Drag&Drop and Paste) ───
  async function uploadAndInsertFile(file: File) {
    setIsUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        document.execCommand(
          'insertHTML',
          false,
          `<img src="${data.url}" alt="${file.name.replace(/\.[^/.]+$/, '')}" style="max-width:100%;height:auto;border-radius:10px;margin:20px 0;display:block;" /><p><br></p>`
        )
        handleInput()
      }
    } catch {}
    setIsUploading(false)
  }

  function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault()
        const file = items[i].getAsFile()
        if (file) uploadAndInsertFile(file)
        return
      }
    }
  }

  // ─── Drag and Drop Handlers ───
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      const imageFiles = files.filter(f => f.type.startsWith('image/'))
      if (imageFiles.length > 0) {
        imageFiles.forEach(file => uploadAndInsertFile(file))
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') { e.preventDefault(); document.execCommand('bold') }
      if (e.key === 'i') { e.preventDefault(); document.execCommand('italic') }
      if (e.key === 'u') { e.preventDefault(); document.execCommand('underline') }
      if (e.key === 'k') { e.preventDefault(); saveSelection(); setShowLinkDialog(true) }
    }
  }

  const toolbarHeight = compact ? 'rte-toolbar-compact' : ''

  return (
    <div
      className={`rte-wrap${compact ? ' rte-compact' : ''}${isDragging ? ' rte-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Uploading indicator */}
      {isUploading && (
        <div className="rte-uploading-bar">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IconZap /> Uploading image to server...
          </span>
        </div>
      )}

      {/* Drag & Drop Visual Overlay */}
      {isDragging && (
        <div className="rte-drag-overlay">
          <div className="rte-drag-box">
            <span style={{ width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <IconUpload />
            </span>
            <strong>Drop image anywhere to upload</strong>
            <span>Will be inserted at cursor position</span>
          </div>
        </div>
      )}

      {!sourceMode && (
        <div className="rte-quickbar">
          <div className="rte-quickbar-actions">
            <button
              type="button"
              className="rte-quick-btn rte-quick-image"
              onClick={() => {
                saveSelection()
                setShowImageDialog(true)
              }}
              title="Add or upload an image from your computer"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Add / Upload Image</span>
            </button>

            <button
              type="button"
              className="rte-quick-btn rte-quick-link"
              onClick={() => {
                saveSelection()
                const sel = window.getSelection()?.toString().trim() || ''
                setSelectedText(sel)
                setShowLinkDialog(true)
              }}
              title="Insert a link (highlight words first to link them)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Insert Link</span>
            </button>

            <button
              type="button"
              className="rte-quick-btn rte-quick-table"
              onClick={() => {
                saveSelection()
                setShowTableDialog(true)
              }}
              title="Insert a data table"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
              </svg>
              <span>Add Table</span>
            </button>

            {!compact && (
              <button
                type="button"
                className="rte-quick-btn rte-quick-video"
                onClick={() => {
                  saveSelection()
                  setShowEmbedDialog(true)
                }}
                title="Embed YouTube video"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" />
                </svg>
                <span>Embed Video</span>
              </button>
            )}
          </div>

          <div className="rte-quickbar-tips">
            <span>💡 Drop photos directly into text or paste (Ctrl+V)</span>
          </div>
        </div>
      )}

      {!sourceMode && (
        <div className={`rte-toolbar ${toolbarHeight}`}>
          <div className="rte-toolbar-row">
            {!compact && (
              <select
                className="rte-select"
                onChange={e => formatBlock(e.target.value)}
                defaultValue="p"
                title="Text style"
              >
                {HEADING_OPTIONS.map(o => (
                  <option key={o.tag} value={o.tag}>{o.label}</option>
                ))}
              </select>
            )}

            {!compact && (
              <select
                className="rte-select rte-select-sm"
                onChange={e => setFontSize(e.target.value)}
                defaultValue=""
                title="Font size"
              >
                {FONT_SIZES.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            )}

            <div className="rte-sep" />

            <ToolbarButton cmd="bold" icon="B" title="Bold (Ctrl+B)" />
            <ToolbarButton cmd="italic" icon="I" title="Italic (Ctrl+I)" />
            <ToolbarButton cmd="underline" icon="U" title="Underline (Ctrl+U)" />
            <ToolbarButton cmd="strikeThrough" icon="S" title="Strikethrough" />

            <div className="rte-sep" />

            <ToolbarButton cmd="justifyLeft" icon="&#x2261;" title="Align left" />
            <ToolbarButton cmd="justifyCenter" icon="&#x2261;" title="Align center" />
            <ToolbarButton cmd="justifyRight" icon="&#x2261;" title="Align right" />

            {!compact && <ToolbarButton cmd="justifyFull" icon="&#x2630;" title="Justify" />}

            <div className="rte-sep" />

            <ToolbarButton cmd="insertUnorderedList" icon="&#x2022;" title="Bullet list" />
            <ToolbarButton cmd="insertOrderedList" icon="1." title="Numbered list" />

            {!compact && (
              <>
                <ToolbarButton cmd="indent" icon="&#x21E5;" title="Indent" />
                <ToolbarButton cmd="outdent" icon="&#x21E4;" title="Outdent" />
              </>
            )}

            <div className="rte-sep" />

            <ToolbarButton
              icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
              title="Insert link (Ctrl+K)"
              onClick={() => { saveSelection(); setShowLinkDialog(true) }}
            />
            <ToolbarButton
              icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
              title="Insert / Upload Image"
              onClick={() => { saveSelection(); setShowImageDialog(true) }}
            />
            <ToolbarButton
              icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>}
              title="Insert Table (WordPress-Style)"
              onClick={() => { saveSelection(); setShowTableDialog(true) }}
            />

            {!compact && (
              <>
                <ToolbarButton
                  icon={<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                  title="Embed YouTube Video"
                  onClick={() => { saveSelection(); setShowEmbedDialog(true) }}
                />
                <ToolbarButton cmd="formatBlock" arg="blockquote" icon="&#x201C;" title="Blockquote" />
                <ToolbarButton icon="&lt;/&gt;" title="Code block" onClick={insertCodeBlock} />
                <ToolbarButton icon="&#x2015;" title="Horizontal rule" onClick={insertHR} />
              </>
            )}

            <div className="rte-sep" />

            <div className="rte-color-wrap">
              <button type="button" className="rte-btn" onMouseDown={e => { e.preventDefault(); setShowColorPicker(!showColorPicker); setShowBgColorPicker(false) }} title="Text color">
                A<span className="rte-color-bar" style={{ background: '#000' }} />
              </button>
              {showColorPicker && (
                <div className="rte-color-grid">
                  {TEXT_COLORS.map(c => (
                    <button key={c} type="button" className="rte-color-swatch" style={{ background: c }} onMouseDown={e => { e.preventDefault(); setTextColor(c) }} title={c} />
                  ))}
                </div>
              )}
            </div>

            <div className="rte-color-wrap">
              <button type="button" className="rte-btn" onMouseDown={e => { e.preventDefault(); setShowBgColorPicker(!showBgColorPicker); setShowColorPicker(false) }} title="Highlight color">
                <span style={{ background: '#ff0', padding: '0 3px', borderRadius: 2, fontSize: 11 }}>A</span>
              </button>
              {showBgColorPicker && (
                <div className="rte-color-grid">
                  {TEXT_COLORS.map(c => (
                    <button key={c} type="button" className="rte-color-swatch" style={{ background: c }} onMouseDown={e => { e.preventDefault(); setBgColor(c) }} title={c} />
                  ))}
                </div>
              )}
            </div>

            {!compact && (
              <>
                <div className="rte-sep" />
                <ToolbarButton cmd="undo" icon="&#x21B6;" title="Undo (Ctrl+Z)" />
                <ToolbarButton cmd="redo" icon="&#x21B7;" title="Redo (Ctrl+Y)" />
              </>
            )}

            <div className="rte-sep" />
            <ToolbarButton icon="&#x2718;" title="Clear formatting" onClick={clearFormatting} />

            {!compact && (
              <button
                type="button"
                className={`rte-btn rte-btn-source${sourceMode ? ' rte-btn-active' : ''}`}
                onMouseDown={e => { e.preventDefault(); toggleSource() }}
                title="View/edit HTML source"
              >
                &lt;/&gt;
              </button>
            )}
          </div>
        </div>
      )}

      {sourceMode ? (
        <textarea
          className="rte-source"
          value={sourceCode}
          onChange={e => setSourceCode(e.target.value)}
          style={{ minHeight: compact ? 120 : 400 }}
        />
      ) : (
        <div
          ref={editorRef}
          className={`rte-content${compact ? ' rte-content-compact' : ''}`}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          onBlur={saveSelection}
          data-placeholder={placeholder || 'Start writing... Drag & drop images anywhere'}
          style={{ minHeight: compact ? 100 : 350 }}
        />
      )}

      {sourceMode && (
        <div className="rte-source-bar">
          <button type="button" className="adm-btn-ghost adm-btn-sm" onClick={toggleSource}>
            Switch to Visual Editor
          </button>
        </div>
      )}

      {showLinkDialog && <LinkDialog initialText={selectedText} onInsert={handleInsertLink} onClose={() => setShowLinkDialog(false)} />}
      {showImageDialog && <ImageDialog onInsert={handleInsertImage} onClose={() => setShowImageDialog(false)} />}
      {showEmbedDialog && <EmbedDialog onInsert={handleInsertEmbed} onClose={() => setShowEmbedDialog(false)} />}
      {showTableDialog && <TableDialog onInsert={handleInsertTable} onClose={() => setShowTableDialog(false)} />}
    </div>
  )
}
