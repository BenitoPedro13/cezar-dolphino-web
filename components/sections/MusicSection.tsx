"use client"

import { ArrowDownLeft } from "lucide-react"
import { motion } from "motion/react"

import { GridBackground } from "@/components/layout/GridBackground"
import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal } from "@/components/motion/Reveal"
import { ScrollingDisplay } from "@/components/motion/ScrollingDisplay"
import { TrackTable } from "@/components/player/TrackTable"
import { tracks } from "@/data/tracks"

export function MusicSection() {
  return (
    <section
      id="musica"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <GridBackground />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40">
        <div className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-[1fr_2fr_auto] lg:gap-x-16">
          <div className="lg:pt-4">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                ({tracks.length}{" "}
                {tracks.length === 1 ? "faixa" : "faixas"})
              </p>
            </Reveal>

            <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.05em] text-foreground/30">
              <JiggleText
                text="Let's"
                className="block"
                maxRotate={9}
              />
              <JiggleText
                text="Explore"
                className="block"
                maxRotate={-8}
                stagger={0.045}
              />
            </h2>
          </div>

          <div>
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.85] tracking-[-0.05em]">
              <JiggleText
                text="Our"
                className="block text-foreground"
                maxRotate={10}
              />
              <JiggleText
                text="Music"
                className="block text-foreground"
                maxRotate={-9}
                stagger={0.045}
              />
            </h2>
          </div>

          <div className="flex shrink-0 lg:justify-end">
            <motion.a
              href="#sobre"
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ scale: 1.08, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              aria-label="Próxima seção: sobre"
              data-cursor-label="Next"
              className="group relative inline-flex size-20 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:size-24 lg:size-28"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-2 hidden sm:block"
              >
                <svg viewBox="0 0 100 100" className="size-full">
                  <defs>
                    <path
                      id="cta-circle-music"
                      d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    fontSize="8"
                    fontFamily="var(--font-mono)"
                    letterSpacing="3"
                    className="fill-foreground/70 group-hover:fill-background/80"
                  >
                    <textPath href="#cta-circle-music">
                      NEXT · ABOUT · NEXT · ABOUT ·{" "}
                    </textPath>
                  </text>
                </svg>
              </motion.span>
              <ArrowDownLeft className="relative size-6 transition-transform group-hover:translate-x-[-3px] group-hover:translate-y-[3px] sm:size-7" />
            </motion.a>
          </div>
        </div>

        <Reveal delay={0.3} className="mt-16">
          <TrackTable />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-10 max-w-md font-sans text-sm text-muted-foreground">
            Catálogo independente entre originais, covers e takes ao vivo. Toque
            uma faixa pelo botão de play e ela aparece no dock.
          </p>
        </Reveal>
      </div>

      <ScrollingDisplay
        text="SESSIONS · ARE · CURRENTLY · OPEN ·"
        className="absolute inset-x-0 bottom-10 -z-0 select-none opacity-90"
      />
    </section>
  )
}
