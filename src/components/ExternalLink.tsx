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
      className="underline underline-offset-4 hover:text-[#00b4d8]"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      {children}
    </Link>
  )
}
