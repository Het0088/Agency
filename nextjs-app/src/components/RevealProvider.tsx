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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
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
          co.unobserve(el)
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('[data-count]').forEach((el) => co.observe(el))
    return () => co.disconnect()
  }, [])

  return null
}
