"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { AboutExtendedBio } from "@/components/sections/AboutExtendedBio"
import { Reveal } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { siteConfig } from "@/data/site-config"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden border-b border-border/60 bg-card/30"
    >
      <div className="pointer-events-none absolute -right-32 top-0 -z-0 size-[40vw] rounded-full bg-secondary/15 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <SectionLabel index="02" label="Sobre" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <motion.div
                style={{ y: portraitY }}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60"
              >
                <Image
                  src={siteConfig.portraitImage}
                  alt={`Retrato de ${siteConfig.artistName}`}
                  fill
                  className="object-cover sepia-[0.25] saturate-[0.9]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-sans text-[0.65rem] uppercase tracking-[0.2em] text-foreground/80">
                  <span>{siteConfig.artistName}</span>
                  <span>Portrait · 2025</span>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight">
                Canções
                <span className="block italic text-primary">como salas</span>
                <span className="block">para ficar.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {siteConfig.shortBio}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <blockquote className="relative mt-16 max-w-2xl border-l-2 border-primary/60 pl-6">
                <p className="font-display text-3xl italic leading-snug text-foreground/95 sm:text-4xl">
                  &ldquo;{siteConfig.pullQuote}&rdquo;
                </p>
                <footer className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  — {siteConfig.artistName}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.4}>
              <AboutExtendedBio />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
