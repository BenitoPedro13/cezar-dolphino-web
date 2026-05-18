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
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.artistName}
        </p>
        <div className="flex flex-wrap gap-5">
          {socialEntries.map(([key, href]) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {SOCIAL_LABELS[key]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
