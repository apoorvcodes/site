import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Personal reflections and ideas by Apoorv Singh.",
}

// Add your thoughts here
const thoughts: Array<{
  slug: string
  title: string
  date: string
  preview: string
}> = [
  // Example:
  // {
  //   slug: "why-speech-matters",
  //   title: "Why Speech Matters",
  //   date: "2024-12-01",
  //   preview: "Some thoughts on why I believe speech is the most natural interface...",
  // },
]

export default function ThoughtsPage() {
  return (
    <main className="min-h-screen pt-20 pb-24 px-6 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/" 
          className="font-sans text-sm text-ink-muted hover:text-ink transition-colors link-underline"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-medium tracking-tight">Thoughts</h1>
        <p className="mt-4 text-ink-light prose-body">
          Personal reflections, ideas, and things I'm thinking about.
        </p>

        <div className="mt-12 space-y-10">
          {thoughts.length === 0 ? (
            <p className="text-ink-muted font-sans text-sm">Nothing here yet. Check back soon.</p>
          ) : (
            thoughts.map((thought) => (
              <article key={thought.slug} className="group">
                <Link href={`/thoughts/${thought.slug}`}>
                  <p className="font-sans text-xs text-ink-muted mb-2">{thought.date}</p>
                  <h2 className="text-xl font-medium group-hover:text-ink-light transition-colors">
                    {thought.title}
                  </h2>
                  <p className="mt-2 text-ink-light prose-body">{thought.preview}</p>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

