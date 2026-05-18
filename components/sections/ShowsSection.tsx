import { CalendarDays } from "lucide-react"

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { ShowCard } from "@/components/sections/ShowCard"
import { ShowsPastList } from "@/components/sections/ShowsPastList"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { pastShows, upcomingShows } from "@/data/shows"
import { cn } from "@/lib/utils"

export function ShowsSection() {
  return (
    <section
      id="shows"
      className="relative scroll-mt-24 overflow-hidden border-b border-border/60 bg-card/30"
    >
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-0 size-[35vw] rounded-full bg-secondary/15 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <SectionLabel index="04" label="Agenda" />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">
              Ao vivo,
              <span className="block italic text-primary">presente.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md font-serif text-base italic text-muted-foreground sm:text-lg">
              Encontros, sessões intimistas e apresentações em palco. Datas
              confirmadas e agenda em construção.
            </p>
          </Reveal>
        </div>

        {upcomingShows.length === 0 ? (
          <Reveal delay={0.3}>
            <Alert className="mt-12 border-border/60 bg-card/50">
              <CalendarDays />
              <AlertTitle className="font-display text-xl italic">
                Fique de olho
              </AlertTitle>
              <AlertDescription>
                Em breve novidades na agenda. Enquanto isso, ouça as faixas e
                acompanhe pelas redes.
              </AlertDescription>
            </Alert>
          </Reveal>
        ) : (
          <Stagger className="mt-12 space-y-4" stagger={0.1}>
            {upcomingShows.map((show) => (
              <StaggerItem key={show.id}>
                <ShowCard show={show} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <ShowsPastList shows={pastShows} />

        <Reveal>
          <div className="mt-16 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card/40 to-secondary/10 p-8 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-10">
            <div>
              <p className="font-display text-3xl italic text-foreground sm:text-4xl">
                Quer me ver no seu evento?
              </p>
              <p className="mt-3 max-w-md font-sans text-sm text-muted-foreground">
                Para shows, festivais e parcerias — abrimos espaço na agenda.
              </p>
            </div>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-6 h-12 shrink-0 rounded-full px-7 font-sans text-sm uppercase tracking-[0.16em] sm:mt-0",
              )}
            >
              Entrar em contato
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
