import { Reveal } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { NewsletterForm } from "@/components/sections/NewsletterForm"

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-28">
        <SectionLabel index="06" label="Comunidade" />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-tight">
              Bilhete
              <span className="block italic text-primary">para o quarto.</span>
            </h2>
            <p className="mt-6 max-w-md font-serif text-base italic text-muted-foreground sm:text-lg">
              Sem spam. Só novidades quando houver — shows, faixas novas e
              bastidores.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-8">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
