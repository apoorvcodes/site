import type { PropsWithChildren } from "react"

interface Props {
  title: string
}

export default function Section({ title, children }: PropsWithChildren<Props>) {
  return (
    <section className="mt-16 first:mt-0">
      <h2 className="mb-5 font-display text-2xl italic text-ink">{title}</h2>
      <div className="space-y-5 text-[17px] leading-[1.7] text-ink-soft">{children}</div>
    </section>
  )
}
