import os
import json
from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Final Web Development.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

soup = BeautifulSoup(text, "html.parser")

# CSS
style = soup.find('style')
css_content = style.string if style else ""

os.makedirs(r"d:\Ideas\Agency\src\app\services\web-development", exist_ok=True)
with open(r"d:\Ideas\Agency\src\app\services\web-development\web-development.css", "w", encoding="utf-8") as f:
    f.write("/* ── GENRANQ Web Development Styles ── */\n")
    f.write(css_content)

print(f"Written web-development.css ({len(css_content):,} chars)")

# SVG & Sections
svg_sprite = str(soup.find('svg'))

elements = []
for child in soup.body.children:
    if not child.name:
        continue
    if child.name in ['header', 'section']:
        elements.append(str(child))

full_html = "\n".join(elements)
full_html = full_html.replace('onclick="', 'data-action="')

svg_json = json.dumps(svg_sprite)
html_json = json.dumps(full_html)

client_template = """'use client'

import React, { useEffect, useRef } from 'react'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './web-development.css'

const SVG_SPRITE = %SVG_JSON%
const PAGE_HTML = %HTML_JSON%

export default function WebDevClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    root.querySelectorAll('.reveal').forEach(el => io.observe(el))

    // Marquee dupes
    root.querySelectorAll('.dup').forEach(el => {
      if (!el.getAttribute('data-duped')) {
        el.innerHTML += el.innerHTML
        el.setAttribute('data-duped', 'true')
      }
    })

    // Sliders
    root.querySelectorAll<HTMLElement>('[data-slider]').forEach(s => {
      const track = s.querySelector<HTMLElement>('.slides')
      if (!track || !track.children.length) return
      const items = Array.from(track.children) as HTMLElement[]
      const dots = s.querySelector<HTMLElement>('.dots')
      
      const getW = () => items[0].getBoundingClientRect().width + 24
      const perView = () => Math.max(1, Math.round((track.clientWidth + 24) / getW()))
      const pages = () => Math.max(1, items.length - perView() + 1)
      const idx = () => Math.round(track.scrollLeft / getW())
      
      const update = () => {
        if (!dots) return
        Array.from(dots.children).forEach((d, i) => d.classList.toggle('on', i === Math.min(idx(), pages() - 1)))
      }

      const build = () => {
        if (!dots) return
        dots.innerHTML = ''
        for (let i = 0; i < pages(); i++) {
          const b = document.createElement('button')
          b.ariaLabel = 'Slide ' + (i + 1)
          b.onclick = () => track.scrollTo({ left: i * getW(), behavior: 'smooth' })
          dots.appendChild(b)
        }
        update()
      }

      const go = (d: number) => {
        let i = idx() + d
        if (i >= pages()) i = 0
        if (i < 0) i = pages() - 1
        track.scrollTo({ left: i * getW(), behavior: 'smooth' })
      }

      const nextBtn = s.querySelector('.next') as HTMLElement
      const prevBtn = s.querySelector('.prev') as HTMLElement
      if (nextBtn) nextBtn.onclick = () => go(1)
      if (prevBtn) prevBtn.onclick = () => go(-1)

      track.addEventListener('scroll', () => requestAnimationFrame(update))
      window.addEventListener('resize', build)
      build()
    })

    // Tabs
    root.querySelectorAll('.tabs button').forEach(b => {
      const btn = b as HTMLButtonElement
      btn.onclick = () => {
        root.querySelectorAll('.tabs button').forEach(x => x.classList.remove('on'))
        root.querySelectorAll('.panel').forEach(p => p.classList.remove('on'))
        btn.classList.add('on')
        const tabId = btn.dataset.tab
        if (tabId) {
          const panel = root.querySelector('#' + tabId)
          if (panel) panel.classList.add('on', 'in')
        }
      }
    })

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

    return () => io.disconnect()
  }, [])

  return (
    <div className="web-dev-page" ref={containerRef}>
      <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: SVG_SPRITE }} />
      <Topbar text="Custom Web Design & Next.js / Shopify Development" linkText="Get a free quote →" linkHref="#contact" />
      <Nav />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Footer />
    </div>
  )
}
"""

final_code = client_template.replace('%SVG_JSON%', svg_json).replace('%HTML_JSON%', html_json)
with open(r"d:\Ideas\Agency\src\app\services\web-development\WebDevClient.tsx", "w", encoding="utf-8") as f:
    f.write(final_code)

print("Generated WebDevClient.tsx successfully!")
