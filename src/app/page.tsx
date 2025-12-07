import Image from "next/image"
import Link from "next/link"
import ExternalLink from "@/components/ExternalLink"
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying"
import profilePicture from "../../public/logo.jpeg"

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <header className="pt-20 pb-12 px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="fade-in stagger-1">
            <Image
              alt="Apoorv Singh"
              className="w-20 h-20 rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              priority
              src={profilePicture}
            />
          </div>

          <h1 className="mt-8 text-4xl md:text-5xl font-medium tracking-tight fade-in stagger-2">
            Apoorv Singh
          </h1>
          
          <p className="mt-4 text-xl text-ink-light fade-in stagger-3">
            I like to train models and build concise pipelines.
          </p>
          
          <p className="mt-2 text-ink-muted font-sans text-sm fade-in stagger-3">
            19 · Bangalore, India
          </p>
          
          <div className="mt-4 fade-in stagger-4">
            <SpotifyNowPlaying />
          </div>

          <nav className="mt-6 flex gap-4 text-sm fade-in stagger-4">
            <Link 
              href="/thoughts" 
              className="text-ink font-medium underline underline-offset-4 hover:text-ink-muted transition-colors"
            >
              Thoughts
            </Link>
            <Link 
              href="/reports" 
              className="text-ink font-medium underline underline-offset-4 hover:text-ink-muted transition-colors"
            >
              Reports
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <article className="px-6 md:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          
          {/* What I've Worked On */}
          <section className="fade-in stagger-4">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-ink-muted mb-8">
              What I've Worked On
            </h2>
            
            <div className="space-y-6 prose-body text-ink-light">
              <p>
                Most recently I was at <ExternalLink href="https://heypixa.ai">Pixa AI</ExternalLink> as 
                a Founding Engineer and Researcher. Co-built <span className="text-ink font-medium">Luna</span>, 
                a <span className="text-ink font-medium">speech-to-speech model</span> that 
                understands meaning not just words. Also worked on <span className="text-ink font-medium">neural audio codecs</span> and 
                an <span className="text-ink font-medium">ASR</span> for how Indians actually speak, 
                code-switching between Hindi and English. Built the data pipelines to make it all happen.
              </p>

              <p>
                Now exploring <span className="text-ink font-medium">agentic search</span> and{" "}
                <span className="text-ink font-medium">RL environments</span> for niche dataset creation.
              </p>
            </div>
          </section>

          {/* Background Section */}
          <section className="mt-16 fade-in stagger-5">
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-ink-muted mb-8">
              Before This
            </h2>
            
            <div className="space-y-6 prose-body text-ink-light">
              <p>
                I first started exploring AI with something called <span className="text-ink font-medium">Mindify</span>, 
                an edtech agent designed for low income families who couldn't afford traditional private tuition. 
                I was invited to present this at the{" "}
                <ExternalLink href="https://www.indiamobilecongress.com">India Mobile Congress</ExternalLink> to 
                Mr. Ashwini Vaishnaw and our honourable Prime Minister.
              </p>

              <p>
                I skipped the traditional path. At 14, I built an <span className="text-ink font-medium">NLP-based</span> COVID 
                tracking bot for <ExternalLink href="https://discord.com">Discord</ExternalLink> that went viral and 
                served <span className="text-ink font-medium">500K+ users</span>. Got the bot verified on Discord too 
                (had to use my dad's ID since I was underage). Reverse-engineered Discord for hosting self-bots, 
                got three IDs banned in the process, then moved on to learn{" "}
                <ExternalLink href="https://go.dev">Golang</ExternalLink>.
              </p>
              
              <p>
                Built a <ExternalLink href="https://github.com/apoorvcodes/skaira">web framework</ExternalLink> like{" "}
                <ExternalLink href="https://expressjs.com">Express</ExternalLink> but around{" "}
                <span className="text-ink font-medium">50x faster</span>. Got over{" "}
                <span className="text-ink font-medium">150 stars</span> organically and about five companies use it now. 
                Moved to <span className="text-ink font-medium">crypto</span> for fun, came top 5 in my first hackathon.
              </p>

              <p>
                During school, I spent most of my time skipping classes and building{" "}
                <span className="text-ink font-medium">hardware projects</span> in the labs. That hands-on tinkering 
                helped me win both the{" "}
                <ExternalLink href="https://youthideathon.in">Youth Ideathon</ExternalLink> (2022) and 
                podium at the <ExternalLink href="https://cbseit.in/cbse/2022/sciex/index.html">CBSE Science Exhibition</ExternalLink> (2022). 
                Still the only person to achieve both. I later became a student evaluator for the CBSE Youth Ideathon.
              </p>

              <p>
                I've won multiple premier hackathons, most recently{" "}
                <ExternalLink href="https://unfold.devfolio.co">Unfold '23</ExternalLink> where I came 
                2nd as the youngest winner. Over the years I've received grants from the Government of 
                India, CBSE, <ExternalLink href="https://solana.com">Solana</ExternalLink>, and{" "}
                <ExternalLink href="https://polygon.technology">Polygon</ExternalLink> for my projects.
              </p>

              <p>
                Tried my hand at building a startup with <ExternalLink href="https://heyconn.ai">Connect AI</ExternalLink>, 
                a <span className="text-ink font-medium">Jarvis-like interface</span> that could convert thoughts into action. 
                Went viral on <ExternalLink href="https://twitter.com">Twitter</ExternalLink>, got reached out by{" "}
                <ExternalLink href="https://nexusvp.com">Nexus VP</ExternalLink>,{" "}
                <ExternalLink href="https://sierraventures.com">Sierra Ventures</ExternalLink>,{" "}
                <ExternalLink href="https://gradientventures.com">Gradient Ventures</ExternalLink>, and{" "}
                <ExternalLink href="https://peakxv.com">Peak XV</ExternalLink>. Even got to visit{" "}
                <ExternalLink href="https://olacabs.com">Ola's</ExternalLink> office where they were doing 
                human annotation, which was pretty cool. Had gaps in my knowledge when it came to business, 
                couldn't really pull it off but got a lot of learnings.
              </p>
            </div>
        </section>

          {/* Contact */}
          <section className="mt-16 pt-12 border-t border-ink/10 fade-in stagger-6">
            <p className="prose-body text-ink-light">
              Always open to conversations about AI research, interesting collaborations, 
              or ambitious projects.
            </p>
            <p className="mt-4 text-ink-light">
              <ExternalLink href="mailto:apoorv.conn@gmail.com">apoorv.conn@gmail.com</ExternalLink>
              {" · "}
              <ExternalLink href="https://twitter.com/apoorvcodes">@apoorvcodes</ExternalLink>
              {" · "}
              <ExternalLink href="https://github.com/apoorvcodes">GitHub</ExternalLink>
            </p>
        </section>

      </div>
      </article>
    </main>
  )
}
