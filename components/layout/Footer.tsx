"use client"

import { motion } from "motion/react"

import { JiggleText } from "@/components/motion/JiggleText"
import { siteConfig } from "@/data/site-config"

const SOCIAL_LABELS: Record<keyof typeof siteConfig.social, string> = {
  soundcloud: "SoundCloud",
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
  tiktok: "TikTok",
  appleMusic: "Apple Music",
}

const NAV = [
  { href: "#hero", label: "Home" },
  { href: "#musica", label: "Música" },
  { href: "#sobre", label: "Sobre" },
  { href: "#shows", label: "Shows" },
  { href: "#apoie", label: "Apoie" },
  { href: "#contato", label: "Contato" },
]

export function Footer() {
  const socialEntries = Object.entries(siteConfig.social).filter(
    (entry): entry is [keyof typeof siteConfig.social, string] =>
      Boolean(entry[1]),
  )

  const [firstName, lastName] = siteConfig.artistName.split(" ")

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pb-40 pt-24 sm:pt-32">
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="font-display text-[clamp(4rem,18vw,18rem)] leading-[0.82] tracking-[-0.06em]">
            <JiggleText
              text={firstName}
              className="block font-bold text-foreground"
              maxRotate={10}
            />
            <JiggleText
              text={lastName}
              className="block font-light text-foreground/30"
              maxRotate={-9}
              stagger={0.045}
            />
          </h2>
          <p className="mt-3 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
            <span className="h-px w-8 bg-foreground/40" />
            Dynamic Artist · {siteConfig.tagline.split(" — ").pop()}
          </p>
        </motion.div>

        <div className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
              (Explore)
            </p>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
              (Follow)
            </p>
            <ul className="mt-4 space-y-2">
              {socialEntries.map(([key, href]) => (
                <li key={key}>
                  <FooterLink
                    href={href}
                    label={SOCIAL_LABELS[key]}
                    external
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
              (Contact)
            </p>
            <FooterLink
              href={`mailto:${siteConfig.contactEmail}`}
              label={siteConfig.contactEmail}
              className="mt-4"
            />
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              Rio de Janeiro · BR
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.artistName}. Todos os
            direitos reservados.
          </p>
          <p>Feito com voz, violão e café</p>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkProps {
  href: string
  label: string
  external?: boolean
  className?: string
}

function FooterLink({ href, label, external, className }: FooterLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group relative inline-flex items-center font-sans text-base text-foreground ${className ?? ""}`}
    >
      <motion.span
        variants={{
          rest: { x: 0 },
          hover: { x: 8 },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      >
        {label}
      </motion.span>
      <motion.span
        aria-hidden
        variants={{
          rest: { opacity: 0, x: -6, scale: 0.8 },
          hover: { opacity: 1, x: 0, scale: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="ml-2 text-accent"
      >
        →
      </motion.span>
    </motion.a>
  )
}
