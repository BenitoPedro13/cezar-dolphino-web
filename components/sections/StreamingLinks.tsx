import { Music2 } from "lucide-react"

import { siteConfig } from "@/data/site-config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    <div className="mt-10 rounded-lg border border-border/70 bg-background/40 p-6">
      <div className="flex items-start gap-3">
        <Music2 className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="font-display text-xl italic text-foreground">
            Ouça nas plataformas
          </p>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Ouça nas plataformas e ajude o algoritmo a encontrar mais ouvintes.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
