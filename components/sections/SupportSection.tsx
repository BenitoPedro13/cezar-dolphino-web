import { siteConfig } from "@/data/site-config"

export function SupportSection() {
  return (
    <section
      id="apoie"
      className="scroll-mt-24 border-b border-border/70 bg-card/40"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="font-display text-4xl">Apoie</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          Gostou do que ouviu? Me pague um cafe via PIX ou apoie no Ko-fi.
        </p>
        <div className="mt-6 space-y-2 font-sans text-sm">
          <p>
            <span className="text-muted-foreground">PIX:</span>{" "}
            <span className="text-foreground">{siteConfig.pixKey}</span>
          </p>
          <p>
            <span className="text-muted-foreground">Ko-fi:</span>{" "}
            <a
              href={`https://ko-fi.com/${siteConfig.kofiUsername}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary transition-colors hover:text-foreground"
            >
              ko-fi.com/{siteConfig.kofiUsername}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
