import json

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

from bs4 import BeautifulSoup
soup = BeautifulSoup(text, "html.parser")

svg_sprite = str(soup.find('svg'))

sections_html = []
for child in soup.body.children:
    if not child.name:
        continue
    if child.name in ['header', 'section']:
        html_str = str(child)
        sections_html.append(html_str)

full_html = "\n".join(sections_html)
full_html = full_html.replace('onclick="', 'data-action="')

svg_json = json.dumps(svg_sprite)
html_json = json.dumps(full_html)

template = """'use client'

import React, { useEffect, useRef } from 'react'
import Topbar from '@/components/Topbar'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './hire-resource.css'

const SVG_SPRITE = %SVG_JSON%
const PAGE_HTML = %HTML_JSON%

export default function HireResourceClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }}
      )
    }, { threshold: 0.1 })
    root.querySelectorAll('.reveal').forEach(el => io.observe(el))

    // Duplicate marquee content
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

      if (s.hasAttribute('data-auto')) {
        let t = setInterval(() => go(1), 4500)
        s.onmouseenter = () => clearInterval(t)
        s.onmouseleave = () => { t = setInterval(() => go(1), 4500) }
      }
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

    // Form submission
    const form = root.querySelector('form')
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault()
        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement
        if (submitBtn) {
          submitBtn.disabled = true
          submitBtn.innerText = 'Submitting...'
        }
        const formData = new FormData(form)
        const payload = {
          name: formData.get('name') || 'Prospect',
          email: formData.get('email') || '',
          phone: formData.get('phone') || '',
          service: 'Hire Dedicated Developers',
          message: `Role: ${formData.get('role') || 'Any'}, Experience: ${formData.get('experience') || 'Any'}, Details: ${formData.get('message') || ''}`,
        }
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (res.ok) {
            alert('Thank you! Your requirements have been received. We will send matching developer profiles within 24 hours.')
            form.reset()
          } else {
            alert('Something went wrong. Please email us directly at hello@genranq.com.')
          }
        } catch {
          alert('Submission error. Please email hello@genranq.com.')
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false
            submitBtn.innerText = 'Schedule Interview'
          }
        }
      }
    }

    return () => {
      io.disconnect()
    }
  }, [])

  return (
    <div className="hire-resource-page" ref={containerRef}>
      <div style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: SVG_SPRITE }} />
      <Topbar text="Pre-vetted developers ready to start within 5 days." linkText="Schedule an interview →" linkHref="#contact" />
      <Nav />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Footer />
    </div>
  )
}
"""

final_code = template.replace('%SVG_JSON%', svg_json).replace('%HTML_JSON%', html_json)

with open(r"d:\Ideas\Agency\src\app\hire-resource\HireResourceClient.tsx", "w", encoding="utf-8") as f:
    f.write(final_code)

print("Generated HireResourceClient.tsx successfully using json interpolation!")
