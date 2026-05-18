import { MoonPhase } from "@/components/motion/MoonPhase"
import { Reveal } from "@/components/motion/Reveal"
import { siteConfig } from "@/data/site-config"

export function MoonPhaseSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
            (Spinning vinyl · Cinema Bedroom)
          </p>
        </Reveal>

        <div className="mt-12">
          <MoonPhase centerImage={siteConfig.portraitImage} />
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-12 max-w-xl text-center font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cada faixa é uma fase: do violão em silêncio total à banda completa.
            Aperte play e atravesse o disco.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
