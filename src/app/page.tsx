import Image from "next/image"

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
              className="h-[60px] w-[60px] rounded-full bg-cover md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px]"
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
            <h1 className="text-3xl font-bold">Apoorv Singh</h1>
          </section>
        </div>

        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold">
            Who am I?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            {`Well my name is Apoorv singh, a ${calculateAge()}-year-old student and software developer from India now looking to shift
            in America. I deeply love blockchain and specially its implementation, I also do research work when I am idle, I am a master of building backend infrastructure which scales.`}
          </span>
        </section>
        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold">
            What I love?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            I usually like to watch some animes or read documentation in my free time. A couple of my favorite animes would be{" "}
            <ExternalLink href="https://www.imdb.com/title/tt5626028/">My Hero Academia</ExternalLink> and{" "}
            <ExternalLink href="https://www.imdb.com/title/tt12343534/">Jujutsu Kaisen</ExternalLink> and a couple of my
            favorite docs would be{" "}
            <ExternalLink href="https://vuejs.org">Vue</ExternalLink> and{" "}
            <ExternalLink href="https://go.dev/doc/">Golang</ExternalLink>.
          </span>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            Not as much as I used to but I also like to build hardware solutions for day to day problems, you can check out what projects I&apos;ve
            been working recently on my{" "}
            <ExternalLink href="https://github.com/apoorvcodes">Github Profile</ExternalLink>.
          </span>
        </section>

        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold">
            What have I done?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
          Well, I love participating in hackathons, especially web3 ones.
           Ive won more than 20 hackathons, including {""}
           <ExternalLink href="https://unfold.devfolio.co">Unfold</ExternalLink>, {""}
           <ExternalLink href="https://hackjklu.devfolio.co/">HackJKLU</ExternalLink> and {""}
           <ExternalLink href="https://warpspeed.devfolio.co">WarpSpeed</ExternalLink>. I&apos;ve recieved over <ExternalLink href="https://www.xe.com/currencyconverter/convert/?Amount=65000&From=USD&To=INR ">65k USD</ExternalLink> as grants for my ventures from {""}
           <ExternalLink href="https://polygon.technology">Polygon</ExternalLink>, {""}
           <ExternalLink href="https://home.iitd.ac.in">IIT Delhi</ExternalLink>, {""}
           <ExternalLink href="https://solana.com">Solana</ExternalLink>, {""}
           <ExternalLink href="https://www.cbse.gov.in">Cbse</ExternalLink> just to name a few.
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            I also happen to be one of the finalists of the <ExternalLink href="https://www.symbolic.capital/fellowship">Nailwal fellowship</ExternalLink>, I was the only highschooler to reach that feat, 
            in addition to this I also started one of the first <ExternalLink href="https://hackclub.com">Hack Club</ExternalLink> in my state, weve impacted 3k+ students, 25+ schools and held 100+ sessions.{" "}
          </span>

          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            Finally Im the only Indian kid to win both <ExternalLink href="https://youthideathon.in">YI 2022</ExternalLink> and <ExternalLink href="https://cbseit.in/cbse/2022/sciex/index.html">Cbse Science Exhibition</ExternalLink>, both being one of the biggest fairs held in India.{" "}
          </span>

        </section>

        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold">
            What is my Techstack?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
          </h1>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            I primarily work with <ExternalLink href="https://www.typescriptlang.org/">TypeScript</ExternalLink>,{" "}
            <ExternalLink href="https://tailwindcss.com">Tailwindcss</ExternalLink>,{" "}
            <ExternalLink href="https://reactjs.org/">React</ExternalLink> (with TSX) when working in a frontend environment and I&apos;ve had a lot of experiences
            with some world class frameworks like <ExternalLink href="https://vuejs.org">Vuejs</ExternalLink> and{" "}
            <ExternalLink href="https://svelte.dev">Svelte</ExternalLink>.
          </span>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            I love building backend infrastructure mainly in <ExternalLink href="https://go.dev">Golang</ExternalLink>,{" "}
            I use my inhouse backend framework which I built from scratch <ExternalLink href="https://github.com/gominima/minima">Gominima</ExternalLink>,{" "}
            sometimes when Im in a hurry, I use <ExternalLink href="https://nodejs.org/en">Nodejs</ExternalLink>, lastly I absolutely love <ExternalLink href="https://graphql.org">Graphql</ExternalLink>.
          </span>
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            I know bits of everything, so if you wanna work on something cool just shoot me a mail!
          </span>
        </section>
        


        <section className="flex w-full max-w-[750px] flex-col gap-y-3">
          <h1 className="m-0 flex w-full max-w-[750px] items-center gap-x-3 font-semibold">
            What am I doing rn?
            <div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
          </h1>
          
          <span className="w-full max-w-[750px] text-justify text-gray-700 dark:text-light-gray">
            Current building <ExternalLink href="https://heyconn.ai">Connect</ExternalLink> a personal co-pilot with global context awareness, based on your day-to-day interactions, capable of autonomously performing tasks.
          </span>
        </section>

      </div>
    </main>
  )
}
