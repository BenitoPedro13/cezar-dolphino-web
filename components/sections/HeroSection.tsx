import Image from "next/image"
import { Globe, Music2, Play } from "lucide-react"

import { siteConfig } from "@/data/site-config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SOCIAL_ITEMS = [
  { key: "instagram" as const, label: "Instagram", icon: Globe },
  { key: "youtube" as const, label: "YouTube", icon: Play },
  { key: "spotify" as const, label: "Spotify", icon: Music2 },
  { key: "tiktok" as const, label: "TikTok", icon: Globe },
]

export function HeroSection() {
  const socialLinks = SOCIAL_ITEMS.flatMap((item) => {
    const href = siteConfig.social[item.key]
    if (!href) return []
    return [{ ...item, href }]
  })

  return (
    <section
      id="hero"
      className="relative scroll-mt-24 overflow-hidden border-b border-border/70 bg-background"
    >
      <Image
        src="/images/hero-poster.svg"
        alt="Textura cinematografica de fundo"
        fill
        priority
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/60 to-background/95" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(240,230,211,0.06)_1px,transparent_1px)] bg-[size:3px_3px] opacity-35" />

      <div className="relative mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground/95">
          Cinema Bedroom
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl italic tracking-wide text-foreground sm:text-7xl">
          {siteConfig.artistName}
        </h1>
        <p className="mt-4 max-w-xl font-sans text-sm text-foreground/85">
          {siteConfig.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#musica" className={cn(buttonVariants(), "gap-2")}>
            <Play className="size-4" />
            Ouca agora
          </a>
          <a href="#shows" className={cn(buttonVariants({ variant: "ghost" }))}>
            Proximos shows
          </a>
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-8 flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="rounded-md border border-border/80 bg-card/40 p-2.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>
        )}

        <a
          href="#musica"
          className="mt-10 inline-flex w-fit animate-bounce items-center gap-2 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Descer
          <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  )
}
