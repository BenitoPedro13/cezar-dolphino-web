"use client"

import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/data/site-config"

const PLATFORMS = [
  { key: "spotify" as const, label: "Spotify" },
  { key: "youtube" as const, label: "YouTube Music" },
  { key: "soundcloud" as const, label: "SoundCloud" },
  { key: "appleMusic" as const, label: "Apple Music" },
]

export function StreamingLinks() {
  const links = PLATFORMS.flatMap((platform) => {
    const href = siteConfig.social[platform.key]
    if (!href) return []
    return [{ ...platform, href }]
  })

  if (links.length === 0) return null

  return (
    <div className="mt-12 grid gap-4 rounded-md border border-border bg-card/30 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          (03) Streaming
        </p>
        <p className="mt-3 font-display text-2xl font-medium leading-[0.95] tracking-[-0.02em] text-foreground">
          Também me ouça em
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <motion.a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground"
          >
            {link.label}
            <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        ))}
      </div>
    </div>
  )
}
