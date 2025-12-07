import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Personal reflections and ideas by Apoorv Singh.",
}

const thoughts = [
  {
    slug: "beliefs",
    title: "Beliefs",
    date: "Written at 16",
    preview: "Beliefs, a word in the English lexicon, but what does it mean? I wrestled with this question and ended up explaining how we become who we are.",
  },
]

export default function ThoughtsPage() {
  return (
    <main className="min-h-screen pt-20 pb-24 px-6 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/" 
          className="font-sans text-sm text-ink-muted hover:text-ink transition-colors"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-medium tracking-tight">Thoughts</h1>
        <p className="mt-4 text-ink-light prose-body">
          Personal reflections, ideas, and things I&apos;m thinking about.
        </p>

        <div className="mt-12 space-y-10">
          {thoughts.map((thought) => (
            <article key={thought.slug} className="group">
              <Link href={`/thoughts/${thought.slug}`}>
                <p className="font-sans text-xs text-ink-muted mb-2">{thought.date}</p>
                <h2 className="text-xl font-medium group-hover:text-ink-light transition-colors">
                  {thought.title}
                </h2>
                <p className="mt-2 text-ink-light prose-body">{thought.preview}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
