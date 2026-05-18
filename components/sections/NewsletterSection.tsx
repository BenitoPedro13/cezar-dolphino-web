import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal } from "@/components/motion/Reveal"
import { NewsletterForm } from "@/components/sections/NewsletterForm"

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-36">
        <div className="grid items-end gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (Stay in
                <br />
                the loop)
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-[-0.04em]">
              <JiggleText
                text="Newsletter"
                className="block font-bold text-foreground"
                maxRotate={8}
              />
              <JiggleText
                text="bilhete para o quarto."
                className="block font-light text-foreground/40"
                maxRotate={-7}
                stagger={0.03}
              />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md font-sans text-base text-muted-foreground">
                Sem spam. Só novidades quando houver — shows, faixas novas e
                bastidores.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={0.2}>
              <div className="rounded-md border border-border bg-card/40 p-6">
                <NewsletterForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
