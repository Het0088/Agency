import Link from 'next/link'

export default function Topbar({ text, linkText, linkHref }: { text: string; linkText?: string; linkHref?: string }) {
  return (
    <div className="topbar">
      <div className="wrap">
        <span className="pill">
          <span className="blink"></span>
          <span>{text}</span>
          {linkText && linkHref && <Link href={linkHref}>{linkText}</Link>}
        </span>
      </div>
    </div>
  )
}
