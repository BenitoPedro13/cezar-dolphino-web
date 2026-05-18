import { Mail } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { ContactForm } from "@/components/sections/ContactForm"
import { siteConfig } from "@/data/site-config"

export function ContactSection() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute -left-32 top-0 -z-0 size-[35vw] rounded-full bg-secondary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-0 size-[35vw] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <SectionLabel index="07" label="Contato" />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">
              Vamos
              <span className="block italic text-primary">conversar?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md font-serif text-base italic text-muted-foreground sm:text-lg">
              Shows, parcerias e imprensa. Respondemos em até 3 dias úteis.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-10">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-10 inline-flex items-center gap-3 font-sans text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/40">
              <Mail className="size-4" />
            </span>
            Prefere e-mail direto?{" "}
            <span className="text-foreground">{siteConfig.contactEmail}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
