import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Beliefs",
  description: "An essay on what beliefs are, where they come from, and how they shape who we become. Written at 16.",
}

export default function BeliefsPage() {
  return (
    <main className="min-h-screen pt-20 pb-24 px-6 md:px-8">
      <article className="max-w-2xl mx-auto">
        <Link 
          href="/thoughts" 
          className="font-sans text-sm text-ink-muted hover:text-ink transition-colors"
        >
          ← Thoughts
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-medium tracking-tight">Beliefs</h1>
          <p className="mt-3 font-sans text-sm text-ink-muted">
            Written at 16
          </p>
        </header>

        <div className="mt-12 space-y-6 prose-body text-ink-light">
          <p>
            Beliefs, a word in the English lexicon, but what does it mean? I wrestled with this 
            question and realized a few things. Belief isn&apos;t a simple word. An apple is the 
            same for everybody, just a red fruit. But beliefs, I quickly learned, differ from 
            person to person, never representing the same thing.
          </p>

          <p>
            Continuing on my quest to understand the true meaning of &quot;beliefs,&quot; I ventured 
            into uncharted territory, reflecting on my own. In doing so, I began to understand 
            what they mean for everyone.
          </p>

          <p>
            I also discovered that beliefs change not only from person to person but also with time. 
            Our beliefs are as transient as the tide. When I was younger, I believed I would become 
            a doctor, but like the ocean erases marks in the sand, time swept away that belief, replacing 
            it with something I still can&apos;t fully grasp.
          </p>

          <p>
            The question I attempted to answer, I thought, was incomplete. I now realized the true 
            question is not <em>&quot;What are beliefs,&quot;</em> but rather{" "}
            <em>&quot;Where do they come from?&quot;</em>
          </p>

          <p>
            I felt like a physicist in the 1800s trying to find what medium carries light. Albeit, 
            the task in front of me might have been harder. I was trying to find the medium that 
            carries forth beliefs and allows them to change. So I looked inward.
          </p>

          <p>
            When the mind is faced with such confusion, it defaults to the things it is most sure of. 
            For me, that was my undying love for computers. The question then became:{" "}
            <em>&quot;Where did this belief, that I love computers, come from?&quot;</em>
          </p>

          <p>
            <em>&quot;I always had a passion for computers,&quot;</em> my mind answered. But nothing 
            may always exist, as the very nature of life is change. Thus, realizing the question lay 
            out of my grasp, I took to answering the simpler one:{" "}
            <em>&quot;When did my passion for computers re-emerge?&quot;</em>
          </p>

          <p>
            After much contemplation, I narrowed it down to around the 9th grade. Watching a CS video 
            plunged me into daily exploration, driven by the love of learning. That&apos;s when I 
            grasped the true challenge: to understand my beliefs, I must understand myself.
          </p>

          <p>
            I confess, my eyes opened wide as I considered this idea, and what formed in my mind was 
            truly terrifying. It sounds simple, but its meaning and essence aren&apos;t:
          </p>

          <p className="text-ink font-medium italic pl-4 border-l-2 border-ink/20">
            &quot;Everything that we believe in is a consequence of our actions and our experiences.&quot;
          </p>

          <p>
            I saw that everything we love, all the things we believe in, determine our actions. 
            That determines what we do and who we are.
          </p>

          <p>
            I began reevaluating my life&apos;s events in the context of my evolving beliefs. What if 
            the lockdown never occurred? What if I wasn&apos;t bullied for my CS questions, hadn&apos;t 
            faced a near death experience, or hadn&apos;t scored low when I couldn&apos;t do anything? 
            Yet, my beliefs endured. They sustained me.
          </p>

          <p>
            I smile as I chide myself. My beliefs didn&apos;t carry me through these events. It was 
            the struggle for survival that shaped my beliefs. This is my belief in life.
          </p>

          <p>
            In answering how beliefs change, I found myself answering questions about the nature of 
            life itself. Life is a chessboard with countless possibilities, yet it always comes back 
            to one defining move, one moment that connects it all. We can only look back, contemplate 
            our beliefs, and connect the dots.
          </p>

          <p>
            I began with the simple question, <em>&quot;What are Beliefs,&quot;</em> and ended up 
            explaining how we become who we are. It&apos;s as astonishing as the discovery that light 
            doesn&apos;t need a medium and can propagate in a vacuum. Beliefs, too, don&apos;t require 
            one. For all of us, their medium of propagation is our very existence.
          </p>

          <p>
            Life leaves us with more than we had. It left me with all my beliefs. It left me writing 
            this essay.
          </p>

          <p className="text-ink font-medium">
            Life is a twisted curse, a beautiful one.
          </p>
        </div>
      </article>
    </main>
  )
}
