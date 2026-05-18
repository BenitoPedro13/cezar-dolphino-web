import { siteConfig } from "@/data/site-config"

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="font-display text-4xl">Contato</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          Para shows, parcerias e imprensa. Respondemos em ate 3 dias uteis.
        </p>
        <p className="mt-4 font-sans text-sm">
          <span className="text-muted-foreground">Email:</span>{" "}
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
