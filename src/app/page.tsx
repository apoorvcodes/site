import Image from "next/image"
import { motion } from "framer-motion"

import { calculateAge } from "@/util"
import CurrentTime from "@/components/CurrentTime"
import DiscordStatus from "@/components/DiscordStatus"
import ExternalLink from "@/components/ExternalLink"
import profilePicture from "../../public/logo.jpeg"

export default function Page() {
  return (
    <main className="flex min-h-full w-full grow content-stretch p-2 md:p-5">
      <div className="flex grow flex-col items-center justify-center space-y-10 overflow-hidden bg-fixed bg-center p-5 md:p-0">
        <div className="flex w-full max-w-[750px] flex-col gap-y-3 rounded-lg">
          <div className="flex items-center gap-x-1">
            <Image
              alt="Profile Picture"
              className="h-[70px] w-[70px] rounded-full bg-cover transition-transform duration-300 hover:scale-105 md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px]"
              priority
              src={profilePicture}
            />
          </div>

          <section className="w-full">
            <aside className="flex items-center gap-x-1 rounded-xl text-sm dark:text-gray-400">
              <DiscordStatus />
              &mdash;
              <CurrentTime />
            </aside>
            <h1 className="text-4xl font-bold pt-1">Apoorv Singh</h1>
          </section>
        </div>

        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
            Who am I?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20 transition-colors duration-300 hover:bg-indigo-500/50" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Hey! I am Apoorv, an 18-year-old developer and researcher. I was born in a small town called Varanasi but now I&apos;ve shifted to Bangalore. I decided to skip college and focus on building cool stuff instead. I&apos;m super into AI and love tinkering with backend systems. Right now I am now planning to move to San Francisco by the end of this year - pretty excited about that!
          </span>
        </section>
        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
            What I love?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20 transition-colors duration-300 hover:bg-indigo-500/50" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            A bit about me is that I love watching football - I&apos;m a huge Barça fan (PS: hope we win CL this year lol). I also love watching anime, 
            especially seinen ones. My absolute favorites are{" "}
            <ExternalLink href="https://www.imdb.com/title/tt7984734/">Made in Abyss</ExternalLink> and{" "}
            <ExternalLink href="https://www.imdb.com/title/tt10233448/">Vinland Saga</ExternalLink>.
          </span>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            As for my passions, I absolutely love LLMs, transformers and hardware. Back in school, I spent most of my time bunking classes 
            and building stuff in the labs (I was pretty damn good at it too!). You can check out some of my hardware projects on my{" "}
            <ExternalLink href="https://github.com/apoorvcodes">Github Profile</ExternalLink>.
          </span>
        </section>

        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
            What have I done?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20 transition-colors duration-300 hover:bg-indigo-500/50" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            The first thing I built was an NLP-based COVID tracking bot for spreading awareness on Discord. It went viral at its peak—I handled 500K+ users, and the bot was also verified on Discord. (I was just 14, had to use my dad&apos;s ID.) I reverse-engineered Discord for hosting self-bots (got three IDs banned), then went on to learn Golang.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            I built a framework like Express but around 50x faster for personal use—got over 150 stars organically. As per my knowledge, around five companies use it right now, including major projects my institute maintains. Moved to crypto for the fun of it, came top 5 in my first hackathon (biggest multichain hackathon at the time), was a core member in Saturn. We received a $50K grant from Sandeep Nailwal (didn&apos;t work out well).
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Did hackathons in between, won around five premier hacks, wrote a couple of compilers here and there. In total, I&apos;ve received over <ExternalLink href="https://www.xe.com/currencyconverter/convert/?Amount=65000&From=USD&To=INR">$65K</ExternalLink> in grants and prizes.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            This was my first phase of life.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            In my senior years, I did a lot of huge science fairs. I&apos;m still the only kid to podium in both <ExternalLink href="https://youthideathon.in">Youth Ideathon</ExternalLink> (Won in &apos;22) and the <ExternalLink href="https://cbseit.in/cbse/2022/sciex/index.html">CBSE Science Exhibition</ExternalLink> (Podium &apos;22).
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            When I was 17, I was offered the <ExternalLink href="https://www.symbolic.capital/fellowship">Nailwal Fellowship</ExternalLink> ($100K in total) but decided not to take it. Apart from this, I came 2nd in the biggest multichain hackathon (<ExternalLink href="https://unfold.devfolio.co">Unfold &apos;23</ExternalLink>)—once again, the youngest winner.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Later, I moved out of crypto and focused on AI and human interfaces as a whole. I built <ExternalLink href="https://heyconn.ai">Connect AI</ExternalLink>—a Jarvis-like human-computer interface that could convert thoughts into action and perform tasks like a human. We went viral on Twitter—500K views in a day—top founders and VCs approaching for investment. Couldn&apos;t translate well as a business, so I moved away from it. (Some sneak peeks for later—I&apos;m gonna reuse it at the end of the year for something even bigger.)
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            I also wrote the AI pipeline and benchmarks for kids&apos; AI at <ExternalLink href="https://heypixа.ai">HeyPixa.ai</ExternalLink>—just for fun. Pixa is gonna be in UK stores by the end of the year.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Then I built a Zapier-like service but for browser agents—in a week—for WTFund. Went till finals. Got rejected &apos;cause I was too early.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Now, I&apos;ve co-founded a research lab with a couple of my friends from IITs, and we&apos;re soon gonna release our first research!
          </span>
        </section>

        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
            Plans and Future?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20 transition-colors duration-300 hover:bg-indigo-500/50" />
          </h1>
          
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            Currently conducting voice-to-voice research at my AI lab and building a prompt editor for in-house usage. Long-term, I have major plans for human-computer interfaces, particularly in hardware, scheduled for the end of the year—something that will revolutionize human interactions forever!
          </span>
          
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
            If you&apos;re an engineer interested in working with the lab or on the HCI project, feel free to email or DM me.
          </span>
        </section>

      </div>
    </main>
  )
}
