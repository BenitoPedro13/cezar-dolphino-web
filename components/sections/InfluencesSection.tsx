"use client"

import { motion } from "motion/react"

import { GridBackground } from "@/components/layout/GridBackground"
import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { Squiggle } from "@/components/motion/Squiggle"
import { influences, influenceCategories } from "@/data/influences"
import type { Influence } from "@/lib/types"
import { cn } from "@/lib/utils"

const CATEGORY_TONES: Record<Influence["category"], string> = {
  musica: "from-accent/20 via-card to-background",
  cinema: "from-foreground/[0.05] via-card to-background",
  literatura: "from-foreground/[0.03] via-card to-background",
}

function InfluenceTile({ item, index }: { item: Influence; index: number }) {
  const categoryLabel = influenceCategories.find(
    (c) => c.key === item.category,
  )?.label

  return (
    <StaggerItem>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        className={cn(
          "group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-md border border-border bg-gradient-to-br p-5 transition-colors hover:border-foreground/40",
          CATEGORY_TONES[item.category],
        )}
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
            ({(index + 1).toString().padStart(2, "0")})
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent">
            {categoryLabel}
          </span>
        </div>

        <div>
          <h3 className="font-display text-2xl font-medium leading-[0.95] tracking-[-0.02em] text-foreground sm:text-3xl">
            {item.name}
          </h3>
          {item.note && (
            <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground">
              {item.note}
            </p>
          )}
        </div>
      </motion.article>
    </StaggerItem>
  )
}

export function InfluencesSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <GridBackground />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40">
        <div className="grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (Meet
                <br />
                the references)
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <h2 className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-[-0.05em]">
              <JiggleText
                text="Our"
                className="font-bold text-foreground"
                maxRotate={9}
              />
              <span className="relative inline-block">
                <JiggleText
                  text="Mood"
                  className="font-light text-foreground/40"
                  maxRotate={-8}
                />
                <Squiggle
                  delay={0.6}
                  className="pointer-events-none absolute -right-12 -top-8 size-24 text-foreground/30"
                />
              </span>
              <JiggleText
                text="Board"
                className="font-bold text-foreground"
                maxRotate={8}
                stagger={0.045}
              />
            </h2>
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-md font-sans text-base text-muted-foreground">
            Um moodboard do que alimenta o som e o olhar — artistas, cinema e
            literatura que habitam o quarto.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {influences.map((item, i) => (
            <InfluenceTile key={item.id} item={item} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
