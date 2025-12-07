import Link from "next/link"
import Image from "next/image"
import profilePicture from "../../public/logo.jpeg"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-sm border-b border-ink/5">
      <div className="max-w-2xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href="/">
          <Image
            alt="Apoorv Singh"
            className="w-8 h-8 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
            src={profilePicture}
          />
        </Link>
        
        <div className="flex gap-6 font-sans text-sm">
          <Link href="/thoughts" className="text-ink-muted hover:text-ink transition-colors">
            Thoughts
          </Link>
          <Link href="/reports" className="text-ink-muted hover:text-ink transition-colors">
            Reports
          </Link>
        </div>
      </div>
    </nav>
  )
}
