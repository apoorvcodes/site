import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import type { PropsWithChildren } from "react"

import "@/styles/globals.css"
import { BASE_URL, instrumentSerif, mono, newsreader } from "@/util"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  appleWebApp: {
    title: "Apoorv Singh",
    statusBarStyle: "default",
  },
  applicationName: "Apoorv Singh",
  authors: [{ name: "Apoorv Singh", url: "https://github.com/apoorvcodes" }],
  category: "Personal Site",
  creator: "Apoorv Singh",
  description: "Personal website of Apoorv Singh — developer and researcher.",
  icons: {
    apple: ["/logo.jpeg"],
    other: [
      { url: "/logo.jpeg", sizes: "32x32", type: "image/png" },
      { url: "/logo.jpeg", sizes: "192x192", type: "image/png" },
      { url: "/logo.jpeg", sizes: "512x512", type: "image/png" },
    ],
  },
  keywords: [
    "Apoorv Singh",
    "apxrv",
    "developer",
    "researcher",
    "AI",
    "LLM",
    "personal site",
  ],
  manifest: "/site.manifest",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    description: "Personal website of Apoorv Singh — developer and researcher.",
    siteName: "Apoorv Singh",
    title: "Apoorv Singh",
    type: "website",
    url: new URL(BASE_URL),
    images: [{ url: "/logo.jpeg", width: 1200, height: 630, alt: "Apoorv Singh" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@apoorv_codes",
    description: "Personal website of Apoorv Singh — developer and researcher.",
    images: ["/logo.jpeg"],
    title: "Apoorv Singh",
  },
  themeColor: "#f6f1e7",
  title: {
    default: "Apoorv Singh",
    template: "%s · Apoorv Singh",
  },
  viewport: {
    minimumScale: 1,
    initialScale: 1,
    width: "device-width",
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrumentSerif.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-paper font-serif text-ink antialiased">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
