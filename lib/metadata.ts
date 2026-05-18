import type { Metadata, Viewport } from "next"

import { siteConfig } from "@/data/site-config"
import { siteUrl } from "@/lib/site"

const titleDefault = `${siteConfig.artistName} — ${siteConfig.tagline}`

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.artistName}`,
  },
  description: siteConfig.shortBio,
  keywords: [
    "Cezar Dolphino",
    "MPB",
    "soul",
    "jazz",
    "música brasileira",
    "Rio de Janeiro",
    "cantor",
    "compositor",
  ],
  authors: [{ name: siteConfig.artistName }],
  creator: siteConfig.artistName,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: siteConfig.artistName,
    title: titleDefault,
    description: siteConfig.shortBio,
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: siteConfig.shortBio,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
}

export const siteViewport: Viewport = {
  themeColor: "#3d3830",
  width: "device-width",
  initialScale: 1,
}
