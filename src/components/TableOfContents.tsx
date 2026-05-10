'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Heading = { id: string; text: string; level: number }

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')
  const [expanded, setExpanded] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const article = document.querySelector('.article-body')
    if (!article) return

    const elements = article.querySelectorAll('h2, h3')
    const items: Heading[] = []
    elements.forEach((el, i) => {
      if (!el.id) el.id = `heading-${i}`
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      })
    })
    setHeadings(items)
    if (items.length > 0) setActiveId(items[0].id)
  }, [])

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const visible = entries.filter(e => e.isIntersecting)
    if (visible.length > 0) {
      setActiveId(visible[0].target.id)
    }
  }, [])

  useEffect(() => {
    if (headings.length === 0) return
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0.1,
    })
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [headings, handleIntersect])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 100
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
    setActiveId(id)
    setExpanded(false)
  }

  if (headings.length === 0) return null

  let counter2 = 0
  let counter3 = 0

  return (
    <div className="toc-wrap">
      <button
        className={`toc-toggle${expanded ? ' open' : ''}`}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="toc-toggle-label">Table of Contents</span>
        <span className="toc-toggle-count">{headings.filter(h => h.level === 2).length} sections</span>
        <span className="toc-toggle-icon">{expanded ? '\u2212' : '+'}</span>
      </button>
      <nav className={`toc-list${expanded ? ' open' : ''}`} aria-label="Table of contents">
        <ol>
          {headings.map(h => {
            let label = ''
            if (h.level === 2) {
              counter2++
              counter3 = 0
              label = `${counter2}`
            } else {
              counter3++
              label = `${counter2}.${counter3}`
            }
            return (
              <li
                key={h.id}
                className={`toc-item${h.level === 3 ? ' toc-sub' : ''}${activeId === h.id ? ' active' : ''}`}
              >
                <button onClick={() => scrollTo(h.id)}>
                  <span className="toc-num">{label}</span>
                  {h.text}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
