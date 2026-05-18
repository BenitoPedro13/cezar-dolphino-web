"use client"

import { motion } from "motion/react"

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { TiltCard } from "@/components/motion/TiltCard"
import { influences, influenceCategories } from "@/data/influences"
import type { Influence } from "@/lib/types"
import { cn } from "@/lib/utils"

const TILE_GRADIENTS: Record<Influence["category"], string> = {
  musica: "from-primary/30 via-card to-background",
  cinema: "from-secondary/30 via-card to-background",
  literatura: "from-muted/80 via-card to-background",
}

function InfluenceTile({ item }: { item: Influence }) {
  const categoryLabel = influenceCategories.find(
    (c) => c.key === item.category,
  )?.label

  return (
    <StaggerItem>
      <TiltCard className="h-full">
        <article
          className={cn(
            "group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-border/60 p-5",
            "bg-gradient-to-br transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_60px_-20px_rgba(212,136,42,0.4)]",
            TILE_GRADIENTS[item.category],
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(240,230,211,0.05)_1px,transparent_1px)] bg-[size:3px_3px] opacity-30" />

          <div className="relative flex items-center justify-between font-sans text-[0.6rem] uppercase tracking-[0.2em] text-primary/90">
            <span>{categoryLabel}</span>
            <motion.span
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 45 }}
              className="inline-flex size-7 items-center justify-center rounded-full border border-border/60 text-foreground/60 transition-colors group-hover:border-primary group-hover:text-primary"
            >
              ↗
            </motion.span>
          </div>

          <div className="relative">
            <h3 className="font-display text-2xl italic leading-tight text-foreground sm:text-3xl">
              {item.name}
            </h3>
            {item.note && (
              <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground">
                {item.note}
              </p>
            )}
          </div>
        </article>
      </TiltCard>
    </StaggerItem>
  )
}

export function InfluencesSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="pointer-events-none absolute right-0 top-1/3 -z-0 size-[35vw] rounded-full bg-primary/8 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <SectionLabel index="03" label="Referências" />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">
              O que mora
              <span className="block italic text-primary">no quarto.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md font-serif text-base italic text-muted-foreground sm:text-lg">
              Um moodboard do que alimenta o som e o olhar — artistas, cinema e
              literatura que habitam o quarto.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {influences.map((item) => (
            <InfluenceTile key={item.id} item={item} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
