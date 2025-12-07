import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reports",
  description: "Technical white papers and research reports by Apoorv Singh.",
}

// Add your reports here
const reports: Array<{
  slug: string
  title: string
  date: string
  preview: string
}> = [
  // Example:
  // {
  //   slug: "luna-architecture",
  //   title: "Luna: A Speech-to-Speech Architecture",
  //   date: "2024-11-15",
  //   preview: "Technical deep-dive into the architecture behind Luna...",
  // },
]

export default function ReportsPage() {
  return (
    <main className="min-h-screen pt-20 pb-24 px-6 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/" 
          className="font-sans text-sm text-ink-muted hover:text-ink transition-colors link-underline"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-4xl font-medium tracking-tight">Reports</h1>
        <p className="mt-4 text-ink-light prose-body">
          Technical white papers and research documentation.
        </p>

        <div className="mt-12 space-y-10">
          {reports.length === 0 ? (
            <p className="text-ink-muted font-sans text-sm">Nothing here yet. Check back soon.</p>
          ) : (
            reports.map((report) => (
              <article key={report.slug} className="group">
                <Link href={`/reports/${report.slug}`}>
                  <p className="font-sans text-xs text-ink-muted mb-2">{report.date}</p>
                  <h2 className="text-xl font-medium group-hover:text-ink-light transition-colors">
                    {report.title}
                  </h2>
                  <p className="mt-2 text-ink-light prose-body">{report.preview}</p>
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

