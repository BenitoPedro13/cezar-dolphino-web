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
    <div className="mt-12 rounded-2xl border border-border/60 bg-card/30 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl italic text-foreground sm:text-2xl">
            Também me ouça em
          </p>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Salve, dê play e ajude o algoritmo a encontrar novos ouvintes.
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
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 font-sans text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
