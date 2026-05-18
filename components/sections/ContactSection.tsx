import { ContactForm } from "@/components/sections/ContactForm"
import { siteConfig } from "@/data/site-config"

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Contato
        </p>
        <h2 className="mt-3 font-display text-4xl">Fale com a gente</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          Para shows, parcerias e imprensa. Respondemos em até 3 dias úteis.
        </p>

        <ContactForm />

        <p className="mt-8 font-sans text-sm text-muted-foreground">
          Prefere email direto?{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-primary transition-colors hover:text-foreground"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    </section>
  )
}
