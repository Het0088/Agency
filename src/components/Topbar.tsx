import Link from 'next/link'

export default function Topbar({ text, linkText, linkHref }: { text: string; linkText?: string; linkHref?: string }) {
  const cleanText = (text || '').replace(/^[●•\s]+/, '').trim()

  return (
    <div className="topbar">
      <div className="wrap">
        <span className="pill">
          <span>{cleanText}</span>
          {linkText && linkHref && <Link href={linkHref}>{linkText}</Link>}
        </span>
      </div>
    </div>
  )
}
