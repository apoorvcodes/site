import Link from "next/link"
import type { ReactNode } from "react"
import type { UrlObject } from "url"

interface Props {
  children: ReactNode
  href: string | UrlObject
  title?: string
}

export default function ExternalLink({ children, href, title }: Props) {
  return (
    <Link
      className="text-ink underline decoration-rule decoration-1 underline-offset-[3px] transition-colors duration-200 hover:text-accent hover:decoration-accent/60"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </Link>
  )
}
