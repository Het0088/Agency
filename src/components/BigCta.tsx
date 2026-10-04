import Link from 'next/link'
import { ArrowRight } from './Icons'

export default function BigCta({
  heading,
  em,
  text,
  btnText,
  btnHref,
  secondBtn,
}: {
  heading: string
  em: string
  text: string
  btnText: string
  btnHref: string
  secondBtn?: { text: string; href: string }
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="big-cta reveal" style={{ background: '#0e1410', color: '#ffffff' }}>
          <h2 style={{ color: '#ffffff' }}>
            {heading} <em style={{ color: 'var(--accent, #FF5A1F)', fontStyle: 'italic' }}>{em}</em>
          </h2>
          <p style={{ color: '#D4CEBF' }}>{text}</p>
          <div className="ctas">
            <Link href={btnHref} className="btn btn-primary">
              {btnText}
              <span className="arr"><ArrowRight /></span>
            </Link>
            {secondBtn && (
              <Link
                href={secondBtn.href}
                className="btn"
                style={{ background: 'transparent', color: '#D4CEBF', border: '1px solid var(--dark-border)' }}
              >
                {secondBtn.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
