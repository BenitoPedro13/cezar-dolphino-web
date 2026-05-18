import { upcomingShows } from "@/data/shows"
import { formatShowDate } from "@/lib/utils"

const STATUS_LABELS = {
  upcoming: "Ingressos",
  "sold-out": "Esgotado",
  past: "Realizado",
  tba: "Em breve",
} as const

export function ShowsSection() {
  return (
    <section id="shows" className="scroll-mt-24 border-b border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="font-display text-4xl">Shows</h2>

        {upcomingShows.length === 0 ? (
          <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
            Fique de olho. Em breve novidades.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {upcomingShows.map((show) => (
              <li
                key={show.id}
                className="flex flex-col gap-1 rounded-md border border-border/70 bg-card/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-sans text-sm text-foreground">
                    {formatShowDate(show.date)} · {show.venue}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {show.city}, {show.state}
                  </p>
                </div>
                <span className="font-sans text-xs uppercase tracking-[0.14em] text-primary">
                  {STATUS_LABELS[show.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
