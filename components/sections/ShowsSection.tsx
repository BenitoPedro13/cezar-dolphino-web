import { CalendarDays } from "lucide-react"

import { ShowCard } from "@/components/sections/ShowCard"
import { ShowsPastList } from "@/components/sections/ShowsPastList"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { pastShows, upcomingShows } from "@/data/shows"
import { cn } from "@/lib/utils"

export function ShowsSection() {
  return (
    <section id="shows" className="scroll-mt-24 border-b border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Agenda
        </p>
        <h2 className="mt-3 font-display text-4xl">Shows</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          Encontros ao vivo, sessões intimistas e apresentações em palco. Fique
          de olho nas datas e garanta seu lugar.
        </p>

        {upcomingShows.length === 0 ? (
          <Alert className="mt-8 border-border/80 bg-card/50">
            <CalendarDays />
            <AlertTitle className="font-display text-lg italic">
              Fique de olho
            </AlertTitle>
            <AlertDescription>
              Em breve novidades na agenda. Enquanto isso, ouça as faixas e
              acompanhe pelas redes.
            </AlertDescription>
          </Alert>
        ) : (
          <ul className="mt-8 space-y-4">
            {upcomingShows.map((show) => (
              <li key={show.id}>
                <ShowCard show={show} />
              </li>
            ))}
          </ul>
        )}

        <ShowsPastList shows={pastShows} />

        <div className="mt-12 rounded-lg border border-border/70 bg-card/40 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-display text-xl italic text-foreground">
              Quer me ver no seu evento?
            </p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Para shows, festivais e parcerias — fale com a gente.
            </p>
          </div>
          <a
            href="#contato"
            className={cn(buttonVariants({ variant: "outline" }), "mt-4 shrink-0 sm:mt-0")}
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  )
}
