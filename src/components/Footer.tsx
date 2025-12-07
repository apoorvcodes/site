export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-8 border-t border-ink/5">
      <div className="max-w-2xl mx-auto">
        <p className="font-sans text-xs text-ink-muted">
          © {new Date().getFullYear()} Apoorv Singh
        </p>
      </div>
    </footer>
  )
}
