"use client"

import { motion } from "motion/react"
import { ArrowUpRight, ArrowUpRightFromSquare } from "lucide-react"

import { siteConfig } from "@/data/site-config"

const SOCIAL_LABELS: Record<keyof typeof siteConfig.social, string> = {
  soundcloud: "SoundCloud",
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
  tiktok: "TikTok",
  appleMusic: "Apple Music",
}

export function Footer() {
  const socialEntries = Object.entries(siteConfig.social).filter(
    (entry): entry is [keyof typeof siteConfig.social, string] =>
      Boolean(entry[1]),
  )

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="pointer-events-none absolute -bottom-1/2 left-1/2 -z-0 size-[80vw] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="font-display text-[clamp(4rem,16vw,18rem)] leading-[0.85] tracking-tight italic"
        >
          <span className="block">{siteConfig.artistName.split(" ")[0]}</span>
          <span className="block text-primary">
            {siteConfig.artistName.split(" ")[1]}
          </span>
        </motion.h2>

        <div className="mt-16 grid gap-10 border-t border-border/60 pt-10 md:grid-cols-3">
          <div>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Contato
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-xl italic text-foreground transition-colors hover:text-primary"
            >
              {siteConfig.contactEmail}
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Onde estou
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {socialEntries.map(([key, href]) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 font-sans text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {SOCIAL_LABELS[key]}
                    <ArrowUpRightFromSquare className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Navegação
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm">
              <li>
                <a
                  href="#musica"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  Música
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#shows"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  Shows
                </a>
              </li>
              <li>
                <a
                  href="#apoie"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  Apoie
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.artistName}. Todos os
            direitos reservados.
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Feito com voz, violão e café
          </p>
        </div>
      </div>
    </footer>
  )
}
