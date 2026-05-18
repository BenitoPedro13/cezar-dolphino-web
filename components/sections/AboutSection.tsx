import Image from "next/image"

import { AboutExtendedBio } from "@/components/sections/AboutExtendedBio"
import { siteConfig } from "@/data/site-config"

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-24 border-b border-border/70">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Sobre
        </p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-5 lg:-mt-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/80 bg-card shadow-[0_24px_48px_-24px_rgba(212,136,42,0.35)]">
              <Image
                src={siteConfig.portraitImage}
                alt={`Retrato de ${siteConfig.artistName}`}
                fill
                className="object-cover sepia-[0.35] saturate-[0.85] brightness-[0.92]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl italic tracking-wide sm:text-5xl">
              {siteConfig.artistName}
            </h2>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-primary">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 max-w-xl font-serif text-base leading-relaxed text-foreground/90">
              {siteConfig.shortBio}
            </p>
          </div>
        </div>

        <blockquote className="relative mt-14 max-w-4xl lg:ml-8 lg:pl-6 lg:before:absolute lg:before:top-0 lg:before:left-0 lg:before:h-full lg:before:w-px lg:before:bg-primary/50">
          <p className="font-display text-2xl italic leading-snug text-foreground/95 sm:text-4xl">
            &ldquo;{siteConfig.pullQuote}&rdquo;
          </p>
        </blockquote>

        <AboutExtendedBio />
      </div>
    </section>
  )
}
