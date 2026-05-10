'use client'

import { useEffect } from 'react'

export default function RevealProvider() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    function observeAll() {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    }

    observeAll()

    const mo = new MutationObserver((mutations) => {
      let hasNewNodes = false
      for (const m of mutations) {
        if (m.addedNodes.length > 0) { hasNewNodes = true; break }
      }
      if (hasNewNodes) observeAll()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  useEffect(() => {
    const counted = new WeakSet<Element>()

    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          if (counted.has(el)) return
          counted.add(el)
          co.unobserve(el)

          const target = parseFloat(el.dataset.count || '0')
          const decimals = parseInt(el.dataset.decimals || '0', 10)
          const dur = 1400
          const start = performance.now()

          function tick(t: number) {
            const p = Math.min(1, (t - start) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = (target * eased).toFixed(decimals)
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 }
    )

    function observeCounts() {
      document.querySelectorAll('[data-count]').forEach((el) => {
        if (!counted.has(el)) co.observe(el)
      })
    }

    observeCounts()

    const mo = new MutationObserver((mutations) => {
      let hasNewNodes = false
      for (const m of mutations) {
        if (m.addedNodes.length > 0) { hasNewNodes = true; break }
      }
      if (hasNewNodes) observeCounts()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      co.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
