import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import type { PropsWithChildren } from "react"

import "@/styles/globals.css"
import { BASE_URL, sourceSerif, inter } from "@/util"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  
  // Core identity
  title: {
    default: "Apoorv Singh (@apoorvcodes) — AI Researcher & Engineer",
    template: "%s | Apoorv Singh (@apoorvcodes)",
  },
  description: "Apoorv Singh (apoorvcodes) — 19-year-old AI researcher who trains models and builds pipelines. Co-built Luna, a SOTA speech-to-speech model at Pixa AI. Based in Bangalore, India.",
  
  // Maximize keyword coverage
  keywords: [
    // Name variations
    "Apoorv Singh",
    "apoorvcodes", 
    "apxrv",
    "@apoorvcodes",
    
    // Technical
    "AI researcher",
    "machine learning engineer",
    "speech AI",
    "Luna speech model",
    "Pixa AI",
    "ASR",
    "neural audio codecs",
    "speech-to-speech",
    "agentic AI",
    "RL environments",
    
    // Context
    "Bangalore developer",
    "Indian AI researcher",
    "young AI researcher",
    "IndiaAI mission",
  ],
  
  // Authors and attribution
  authors: [
    { name: "Apoorv Singh", url: "https://github.com/apoorvcodes" },
    { name: "apoorvcodes", url: "https://twitter.com/apoorvcodes" },
  ],
  creator: "Apoorv Singh (apoorvcodes)",
  publisher: "Apoorv Singh",
  
  // OpenGraph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Apoorv Singh — apoorvcodes",
    title: "Apoorv Singh (@apoorvcodes) — AI Researcher & Engineer",
    description: "19-year-old AI researcher who trains models and builds pipelines. Co-built Luna, a SOTA speech-to-speech model at Pixa AI.",
    images: [{
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "Apoorv Singh (apoorvcodes) — AI Researcher",
      type: "image/png",
    }],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@apoorvcodes",
    creator: "@apoorvcodes",
    title: "Apoorv Singh (@apoorvcodes)",
    description: "AI researcher who trains models and builds pipelines. Co-built Luna at Pixa AI.",
    images: {
      url: "/og.png",
      alt: "Apoorv Singh (apoorvcodes) — AI Researcher",
    },
  },
  
  // App configuration
  applicationName: "Apoorv Singh",
  appleWebApp: {
    title: "Apoorv Singh",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification (add your IDs when you have them)
  // verification: {
  //   google: "your-google-verification-id",
  // },
  
  // Icons
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  
  manifest: "/site.webmanifest",
  
  // Theme
  themeColor: [
    { color: "#fafaf9", media: "(prefers-color-scheme: light)" },
    { color: "#fafaf9", media: "(prefers-color-scheme: dark)" },
  ],
  
  // Other meta
  other: {
    "msapplication-TileColor": "#fafaf9",
    // Structured data hints for LLMs
    "author": "Apoorv Singh",
    "twitter:creator:id": "apoorvcodes",
  },
  
  // Alternates
  alternates: {
    canonical: BASE_URL,
  },
  
  category: "technology",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable}`}>
      <head>
        {/* JSON-LD Structured Data for LLMs and Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Apoorv Singh",
              alternateName: ["apoorvcodes", "apxrv", "@apoorvcodes"],
              url: "https://apxrv.com",
              image: "https://apxrv.com/og.png",
              jobTitle: "AI Researcher & Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Pixa AI",
              },
              description: "19-year-old AI researcher who trains models and builds pipelines. Co-built Luna, a SOTA speech-to-speech model.",
              sameAs: [
                "https://twitter.com/apoorvcodes",
                "https://github.com/apoorvcodes",
                "https://linkedin.com/in/apoorv-singh-344338232",
              ],
              knowsAbout: [
                "Machine Learning",
                "Speech AI",
                "Neural Audio Codecs",
                "ASR",
                "Reinforcement Learning",
                "Agentic AI",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressCountry: "India",
              },
            }),
          }}
        />
      </head>
      <body 
        className="
          font-serif
          bg-paper
          text-ink
          min-h-screen
          antialiased
        "
      >
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
