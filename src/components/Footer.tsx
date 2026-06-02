import { REPOSITORY_LINK, SOCIAL_LINKS } from "@/util"
import ExternalLink from "@/components/ExternalLink"

const { Discord, Email, GitHub, Linkedin, Twitter } = SOCIAL_LINKS

const links: [string, string][] = [
  ["github", GitHub],
  ["twitter", Twitter],
  ["linkedin", Linkedin],
  ["discord", Discord],
  ["email", Email],
]

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-page px-6 pb-16 pt-24">
      <div className="border-t border-rule pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <span>
            © {new Date().getFullYear()} Apoorv Singh ·{" "}
            <ExternalLink href={REPOSITORY_LINK}>source</ExternalLink>
          </span>
          <nav className="flex flex-wrap gap-x-4">
            {links.map(([label, href]) => (
              <ExternalLink key={label} href={href}>
                {label}
              </ExternalLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
