"use client"

import { ArrowDownLeft, CalendarDays } from "lucide-react"
import { motion } from "motion/react"

import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { ShowCard } from "@/components/sections/ShowCard"
import { ShowsPastList } from "@/components/sections/ShowsPastList"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { pastShows, upcomingShows } from "@/data/shows"

export function ShowsSection() {
  return (
    <section
      id="shows"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40">
        <div className="grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (Live
                <br />
                shows)
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <h2 className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-[-0.05em]">
              <JiggleText
                text="On"
                className="font-bold text-foreground"
                maxRotate={10}
              />
              <JiggleText
                text="Stage"
                className="font-light text-foreground/40"
                maxRotate={-8}
                stagger={0.045}
              />
            </h2>
          </div>

          <div className="flex items-end justify-end lg:col-span-2">
            <motion.a
              href="#contato"
              aria-label="Falar sobre booking"
              data-cursor-label="Book"
              whileHover={{ scale: 1.08, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex size-16 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:size-20"
            >
              <ArrowDownLeft className="size-5 transition-transform group-hover:translate-x-[-3px] group-hover:translate-y-[3px] sm:size-6" />
            </motion.a>
          </div>
        </div>

        {upcomingShows.length === 0 ? (
          <Reveal delay={0.2}>
            <Alert className="mt-16 border-border bg-card/60">
              <CalendarDays />
              <AlertTitle className="font-sans text-lg">
                Fique de olho
              </AlertTitle>
              <AlertDescription>
                Em breve novidades na agenda. Enquanto isso, ouça as faixas e
                acompanhe pelas redes.
              </AlertDescription>
            </Alert>
          </Reveal>
        ) : (
          <Stagger className="mt-16 space-y-2" stagger={0.08}>
            {upcomingShows.map((show) => (
              <StaggerItem key={show.id}>
                <ShowCard show={show} />
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <ShowsPastList shows={pastShows} />
      </div>
    </section>
  )
}
