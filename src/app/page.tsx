import Image from "next/image"

import CurrentTime from "@/components/CurrentTime"
import DiscordStatus from "@/components/DiscordStatus"
import ExternalLink from "@/components/ExternalLink"
import Section from "@/components/Section"
import Spotify from "@/components/Spotify"
import profilePicture from "../../public/logo.jpeg"

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-page px-6 pb-8 pt-16 md:pt-24">
      <header className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Image
            alt="Apoorv Singh"
            className="mb-6 h-14 w-14 rounded-full grayscale transition duration-500 hover:grayscale-0 md:h-16 md:w-16"
            priority
            src={profilePicture}
          />
          <h1 className="font-display text-5xl italic leading-[0.95] tracking-tight text-ink md:text-6xl">
            Apoorv Singh
          </h1>
          <p className="mt-3 text-[17px] text-ink-soft">
            Developer &amp; researcher. Bangalore, soon San Francisco.
          </p>
        </div>

        <aside className="flex flex-col gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute md:items-end md:pt-3">
          <CurrentTime />
          <DiscordStatus />
          <Spotify />
        </aside>
      </header>

      <Section title="Who I am">
        <p>
          I&apos;m 19. Born in Varanasi, in Bangalore the last few years, headed to San Francisco
          soon on an O-1. I never went to college; I&apos;d been building things long enough by
          then that stopping for a few more years of lectures didn&apos;t make sense.
        </p>
        <p>
          These days I&apos;m an AI scientist and research engineer at{" "}
          <ExternalLink href="https://smallest.ai">Smallest</ExternalLink>. Most of my time goes
          into Pulse, our speech-to-text — one of the fastest STTs in the world per{" "}
          <ExternalLink href="https://artificialanalysis.ai">Artificial Analysis</ExternalLink>.
          I&apos;m one of the primary researchers on it and built our foundational realtime
          variant, which now sits among the best realtime STTs out there. On the scale side, I
          recently took Pulse Pro from around 4 concurrent streams on a single GPU to 150+ in
          production for one of our enterprise customers. The rest of my time is on Hydra: a
          full-duplex, asynchronous-thinking speech-to-speech model — where turn-taking and
          thought start to blur into the same thing.
        </p>
      </Section>

      <Section title="The work so far">
        <p>
          The first thing I built that mattered was an NLP-powered Discord bot, at 14, for COVID
          awareness. By 15 it was sitting at 500K users and carrying a Discord verification badge
          — I&apos;d registered it under my dad&apos;s ID because I was too young to hold the
          account myself. I shut it down once COVID wound down; the job was done. Along the way I
          reverse-engineered Discord to host self-bots (three accounts banned in the process),
          which is how I picked up Go in the first place.
        </p>
        <p>
          Also at 15: Minima, a Go web framework. Express-shaped on the outside; roughly 50×
          faster underneath. About 150 stars on its own, and last I checked still running in
          production at a handful of companies.
        </p>
        <p>
          A few years inside crypto followed. Core team at Saturn. A $50K grant from Sandeep
          Nailwal (Polygon co-founder) on a project that didn&apos;t pan out. I won{" "}
          <ExternalLink href="https://unfold.devfolio.co">Unfold</ExternalLink> twice —
          India&apos;s largest multichain hackathon — and a long string of regional ones across
          that stretch, youngest in the room each time. About $65K in grants and prizes by the
          end of it.
        </p>
        <p>
          Hardware took up most of 16 to 18, mostly lab time when I should have been in class. A
          small-form ventilator. A network-wide exhaust-monitoring and filtering simulation for
          two-wheelers that read tailpipe output and cleaned it inline. A pair of glasses for the
          blind that ran a camera through realtime scene transcription. Some of it placed at
          national fairs; most of it I just wanted to see if I could build.
        </p>

        <p
          aria-hidden
          className="select-none py-2 text-center font-display text-2xl tracking-[0.5em] text-ink-mute"
        >
          ⁂
        </p>

        <p>
          Around the same stretch, two of India&apos;s largest student competitions —{" "}
          <ExternalLink href="https://youthideathon.in">Youth Ideathon</ExternalLink> and the{" "}
          <ExternalLink href="https://cbseit.in/cbse/2022/sciex/index.html">
            CBSE Science Exhibition
          </ExternalLink>
          , each with more than 150K participants. I&apos;m still the only person to podium at
          both. Winning Youth Ideathon also got me into a room of five kids presenting edtech
          work to Narendra Modi.
        </p>
        <p>
          The same year, I made the{" "}
          <ExternalLink href="https://www.symbolic.capital/fellowship">
            Nailwal Fellowship
          </ExternalLink>{" "}
          shortlist — $100K to drop out and go full-time on web3. I had a few months of high
          school left and didn&apos;t want to skip the ending for a pivot I wasn&apos;t sure I
          wanted. (Never ended up going to college anyway.)
        </p>
        <p>
          Also at 17: <ExternalLink href="https://heyconn.ai">Connect AI</ExternalLink>. A
          Jarvis-shaped human–computer interface — language in, action out across a full machine.
          The launch pulled 500K views in a day on Twitter; inbound from Peak XV, Sierra, Nexus,
          and Gradient; warm notes from the founders of Loom and Gumroad. It never quite
          resolved into a business, so I shelved it. The bones of it are coming back this year
          for something larger.
        </p>
        <p>
          WTFund a little after that: top 3% of applicants on an idea I started the night before
          the deadline. I built the whole product over the application window — a fully async AI
          web handler for white-collar browser tasks, with a few small models I trained for it.
          Got cut at the end for being too early, which I&apos;ll take.
        </p>
        <p>
          Then a year at <ExternalLink href="https://heypixа.ai">HeyPixa</ExternalLink>, 18 to
          19, on voice research. I built the data pipelines that produced more than 500K hours of
          training audio, and ran the post-training and final SFTs for Luna — one of the first
          foundational models to come out of India, and a speech-to-speech model at that. Pixa
          ships to UK stores this year.
        </p>
      </Section>

      <Section title="What’s next">
        <p>San Francisco, soon, on an O-1.</p>
        <p>
          In the meantime, writing — a couple of workshop papers and some conference work on the
          way. Past that, I want to get back into full-duplex systems and hardware.
        </p>
        <p>If you want to hack around on any of this, hit me up.</p>
      </Section>
    </main>
  )
}
