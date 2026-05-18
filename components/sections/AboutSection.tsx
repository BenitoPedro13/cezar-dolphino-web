import { siteConfig } from "@/data/site-config"

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-24 border-b border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="font-display text-4xl">Sobre</h2>
        <p className="mt-3 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
          {siteConfig.shortBio}
        </p>
        <blockquote className="mt-8 max-w-3xl font-display text-2xl italic text-foreground/90 sm:text-3xl">
          &ldquo;{siteConfig.pullQuote}&rdquo;
        </blockquote>
      </div>
    </section>
  )
}
