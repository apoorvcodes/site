import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import type { PropsWithChildren } from "react"

import "@/styles/globals.css"
import { BASE_URL, inter } from "@/util"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  appleWebApp: {
    title: "Apoorv Singh",
    statusBarStyle: "black-translucent",
  },
  applicationName: "Apoorv Singh",
  authors: [{ name: "Apoorv Singh", url: "https://github.com/apoorvcodes" }],
  category: "Personal Site",
  colorScheme: "dark",
  creator: "Apoorv Singh",
  description: "Personal website of Apoorv Singh - Software Developer, Researcher and Tech Enthusiast.",
  icons: {
    apple: [
      "/logo.jpeg",
      {
        url: "/safari-pinned-tab.svg",
        rel: "mask-icon",
        color: "#0a0a0a" // Near black color for safari pin
      },
    ],
    other: [
      {
        url: "/logo.jpeg",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/logo.jpeg",
        sizes: "16x16", 
        type: "image/png",
      },
      {
        url: "/logo.jpeg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/logo.jpeg",
        sizes: "512x512",
        type: "image/png",
      }
    ],
  },
  keywords: [
    "apxrv",
    "Apoorv Singh",
    "apoorv",
    "singh",
    "Website",
    "Portfolio",
    "Projects",
    "Developer",
    "Software Engineer",
    "Full Stack",
    "Backend Developer",
    "LLM Research"
  ],
  manifest: "/site.manifest",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    description: "Personal website of Apoorv Singh - Software Developer, Researcher and Tech Enthusiast.",
    siteName: "Apoorv Singh",
    title: "Apoorv Singh | Developer & Researcher",
    type: "website",
    url: new URL(BASE_URL),
    images: [{
      url: "/logo.jpeg",
      width: 1200,
      height: 630,
      alt: "Apoorv Singh"
    }]
  },
  twitter: {
    card: "summary_large_image",
    creator: "@apoorv_codes",
    description: "Personal website of Apoorv Singh - Software Developer, Researcher and Tech Enthusiast.",
    images: ["/logo.jpeg"],
    title: "Apoorv Singh | Developer & Researcher"
  },
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "msapplication-config": "/browserconfig.xml",
  },
  themeColor: [
    { color: "#0a0a0a" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0a0a0a",
    },
  ],
  title: {
    default: "Apoorv Singh | Developer & Researcher",
    template: "%s | Apoorv Singh",
  },
  viewport: {
    minimumScale: 1,
    initialScale: 1,
    width: "device-width",
    userScalable: false
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`
          ${inter.className} 
          bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#0a0a0a]
          flex h-full min-h-screen flex-col items-center
          text-gray-100
          selection:bg-blue-900/20 selection:text-blue-200
          antialiased
          scroll-smooth
        `}
      >
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-30" />
        <div className="relative w-full">
          {children}
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
