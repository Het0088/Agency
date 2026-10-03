import json
from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\final blog.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

soup = BeautifulSoup(text, "html.parser")
svg_sprite = str(soup.find('svg'))

elements = []
for child in soup.body.children:
    if not child.name:
        continue
    if child.name in ['header', 'article', 'section']:
        elements.append(str(child))

full_html = "\n".join(elements)

svg_json = json.dumps(svg_sprite)
html_json = json.dumps(full_html)

template = """'use client'

import React, { useEffect, useRef } from 'react'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './blog-article.css'

const SVG_SPRITE = %SVG_JSON%
const PAGE_HTML = %HTML_JSON%

export default function BlogArticleClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    // FAQ Accordion
    root.querySelectorAll('.faq button').forEach(b => {
      const btn = b as HTMLButtonElement
      btn.onclick = () => {
        const f = btn.parentElement
        if (!f) return
        const a = f.querySelector<HTMLElement>('.ans')
        if (!a) return
        const o = f.classList.toggle('open')
        a.style.maxHeight = o ? a.scrollHeight + 'px' : '0'
      }
    })

    // Reading progress bar
    const progressEl = root.querySelector<HTMLElement>('#progress')
    if (progressEl) {
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight
        const pct = h > 0 ? (window.scrollY / h) * 100 : 0
        progressEl.style.width = Math.min(100, Math.max(0, pct)) + '%'
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="blog-article-page" ref={containerRef}>
      <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: SVG_SPRITE }} />
      <Topbar text="Actionable AI Search Strategy • Updated for Google AI Overviews & ChatGPT" linkText="Read full analysis ↓" linkHref="#article" />
      <Nav />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Footer />
    </div>
  )
}
"""

final_code = template.replace('%SVG_JSON%', svg_json).replace('%HTML_JSON%', html_json)

with open(r"d:\Ideas\Agency\src\app\resources\blog\BlogArticleClient.tsx", "w", encoding="utf-8") as f:
    f.write(final_code)

print("Generated BlogArticleClient.tsx successfully!")
