import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import type { PropsWithChildren } from "react"

import "@/styles/globals.css"
import { BASE_URL, inter } from "@/util"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  appleWebApp: {
    title: "Apoorv Singh",
  },
  applicationName: "Apoorv Singh",
  authors: [{ name: "Apoorv Singh", url: "https://github.com/apoorvcodes" }],
  category: "Personal Site",
  colorScheme: "dark light",
  creator: "Apoorv Singh",
  description: "Personal website of Apoorv Singh.",
  icons: {
    apple: [
      "/logo.jpeg",
      {
        url: "/safari-pinned-tab.svg",
        rel: "mask-icon",
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
    ],
  },
  keywords: ["apxrv", "Apoorv Singh", "apoorv", "singh", "Website", "Portfolio", "Projects"],
  manifest: "/site.manifest",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    description: "Personal website of Apoorv Singh.",
    siteName: "Apoorv Singh",
    title: "Apoorv Singh",
    type: "website",
    url: new URL(BASE_URL),
  },
  other: {
    "msapplication-TileColor": "#0d1321",
  },
  themeColor: [
    { color: "0d1321" },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0d1321",
    },
  ],
  title: {
    default: "Apoorv Singh",
    template: "%s | Apoorv Singh",
  },
  viewport: {
    minimumScale: 1,
    initialScale: 1,
    width: "device-width",
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-[#0d1321] flex h-full min-h-screen flex-col items-center`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
