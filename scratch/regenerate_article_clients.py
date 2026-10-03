import json
from bs4 import BeautifulSoup

def regenerate_client(html_filename, client_path, css_import, page_class, topbar_text, link_text, link_href):
    with open(f"d:\\Ideas\\Agency\\refrence\\{html_filename}", "r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    
    svg_sprite = str(soup.find('svg'))
    
    elements = []
    for c in soup.body.children:
        if not c.name:
            continue
        cls = " ".join(c.get('class', []))
        if c.name in ['nav', 'footer', 'script', 'svg'] or 'topbar' in cls:
            continue
        elements.append(str(c))
    
    full_html = "\n".join(elements)
    full_html = full_html.replace('onclick="', 'data-action="')
    
    svg_json = json.dumps(svg_sprite)
    html_json = json.dumps(full_html)
    
    component_name = "NewsArticleClient" if "news" in html_filename else "BlogArticleClient"
    
    template = f"""'use client'

import React, {{ useEffect, useRef }} from 'react'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import '{css_import}'

const SVG_SPRITE = %SVG_JSON%
const PAGE_HTML = %HTML_JSON%

export default function {component_name}() {{
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {{
    const root = containerRef.current
    if (!root) return

    // FAQ Accordion
    root.querySelectorAll('.faq button').forEach(b => {{
      const btn = b as HTMLButtonElement
      btn.onclick = () => {{
        const f = btn.parentElement
        if (!f) return
        const a = f.querySelector<HTMLElement>('.ans')
        if (!a) return
        const o = f.classList.toggle('open')
        a.style.maxHeight = o ? a.scrollHeight + 'px' : '0'
      }}
    }})

    // Reading progress bar
    const progressEl = root.querySelector<HTMLElement>('#progress')
    if (progressEl) {{
      const onScroll = () => {{
        const h = document.documentElement.scrollHeight - window.innerHeight
        const pct = h > 0 ? (window.scrollY / h) * 100 : 0
        progressEl.style.width = Math.min(100, Math.max(0, pct)) + '%'
      }}
      window.addEventListener('scroll', onScroll, {{ passive: true }})
      return () => window.removeEventListener('scroll', onScroll)
    }}
  }}, [])

  return (
    <div className="{page_class}" ref={{containerRef}}>
      <div style={{{{ display: 'none' }}}} dangerouslySetInnerHTML={{{{ __html: SVG_SPRITE }}}} />
      <Topbar text="{topbar_text}" linkText="{link_text}" linkHref="{link_href}" />
      <Nav />
      <div dangerouslySetInnerHTML={{{{ __html: PAGE_HTML }}}} />
      <Footer />
    </div>
  )
}}
"""
    final_code = template.replace('%SVG_JSON%', svg_json).replace('%HTML_JSON%', html_json)
    with open(client_path, "w", encoding="utf-8") as f:
        f.write(final_code)
    print(f"Regenerated {client_path} with {len(full_html):,} chars of HTML")

regenerate_client(
    "final news.html",
    r"d:\Ideas\Agency\src\app\resources\news\NewsArticleClient.tsx",
    "./news.css",
    "news-article-page",
    "Company Announcement • Vadodara Campus Expansion",
    "Read full press release ↓",
    "#article"
)

regenerate_client(
    "final blog.html",
    r"d:\Ideas\Agency\src\app\resources\blog\BlogArticleClient.tsx",
    "./blog-article.css",
    "blog-article-page",
    "Actionable AI Search Strategy • Updated for Google AI Overviews & ChatGPT",
    "Read full analysis ↓",
    "#article"
)
