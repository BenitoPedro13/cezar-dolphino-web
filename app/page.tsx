export default function Page() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10" id="hero">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Chunk 00
        </p>
        <h1 className="mt-4 font-display text-5xl italic tracking-wide sm:text-7xl">
          Cezar Dolphino
        </h1>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted-foreground">
          MPB · Soul · Jazz — Rio de Janeiro
        </p>
      </section>

      <div className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-2 sm:px-10">
        <section className="rounded-lg border border-border bg-card p-5" id="musica">
          <h2 className="font-display text-2xl">Musica</h2>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            Player e discografia entram no chunk 04 e chunk 05.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-card p-5" id="sobre">
          <h2 className="font-display text-2xl">Sobre</h2>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            Bio curta, influencias e quote no chunk 06.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-card p-5" id="shows">
          <h2 className="font-display text-2xl">Shows</h2>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            Calendario de eventos no chunk 07.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-card p-5" id="apoie">
          <h2 className="font-display text-2xl">Apoie</h2>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            PIX, plataformas e newsletter no chunk 08.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-card p-5 sm:col-span-2" id="contato">
          <h2 className="font-display text-2xl">Contato</h2>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            Formulario de booking e imprensa no chunk 09.
          </p>
        </section>
      </div>
    </main>
  )
}
