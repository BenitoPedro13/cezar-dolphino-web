"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { AboutExtendedBio } from "@/components/sections/AboutExtendedBio"
import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal } from "@/components/motion/Reveal"
import { Squiggle } from "@/components/motion/Squiggle"
import { siteConfig } from "@/data/site-config"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section
      id="sobre"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40">
        <div className="grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (About
                <br />
                the artist)
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <h2 className="flex flex-wrap items-baseline gap-x-6 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-[-0.05em]">
              <JiggleText
                text="Cezar"
                className="font-bold text-foreground"
                maxRotate={10}
              />
              <JiggleText
                text="Dolphino"
                className="font-light text-foreground/40"
                maxRotate={-8}
                stagger={0.045}
              />
            </h2>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <motion.div
                style={{ y: portraitY }}
                className="relative aspect-[4/5] overflow-hidden rounded-md border border-border bg-card"
              >
                <Image
                  src={siteConfig.portraitImage}
                  alt={`Retrato de ${siteConfig.artistName}`}
                  fill
                  className="object-cover saturate-[0.85]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/80">
                  <span>(01)</span>
                  <span>Portrait · 2026</span>
                </div>
              </motion.div>

              <Squiggle
                delay={0.6}
                className="absolute -left-8 -top-6 size-32 text-foreground/40"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (Bio · short)
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl font-sans text-2xl leading-snug text-foreground sm:text-3xl">
                {siteConfig.shortBio}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <blockquote className="mt-16 max-w-2xl">
                <p className="font-display text-3xl font-light leading-[1.05] tracking-[-0.02em] text-foreground/85 sm:text-4xl">
                  &ldquo;{siteConfig.pullQuote}&rdquo;
                </p>
                <footer className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  — {siteConfig.artistName}
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.35}>
              <AboutExtendedBio />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
