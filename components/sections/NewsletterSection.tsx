import { NewsletterForm } from "@/components/sections/NewsletterForm"

export function NewsletterSection() {
  return (
    <section className="border-b border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Comunidade
        </p>
        <h2 className="mt-3 font-display text-4xl">Newsletter</h2>
        <p className="mt-3 max-w-xl font-sans text-sm text-muted-foreground">
          Sem spam. Só novidades quando houver — shows, faixas novas e bastidores.
        </p>
        <NewsletterForm />
      </div>
    </section>
  )
}
