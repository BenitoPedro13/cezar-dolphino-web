import { Reveal } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { TrackGrid } from "@/components/player/TrackGrid"
import { featuredTrack, tracks } from "@/data/tracks"
import { formatDuration } from "@/lib/utils"

export function MusicSection() {
  return (
    <section
      id="musica"
      className="relative scroll-mt-24 overflow-hidden border-b border-border/60 bg-background"
    >
      <div className="pointer-events-none absolute -left-40 top-20 -z-0 size-[40vw] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <SectionLabel index="01" label="Música" />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">
              Escute o
              <span className="block italic text-primary">quarto inteiro.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2} direction="up">
            <p className="max-w-md font-serif text-base italic text-muted-foreground sm:text-lg">
              {tracks.length} {tracks.length === 1 ? "faixa" : "faixas"} entre
              originais, covers e takes ao vivo. Destaque:{" "}
              <span className="text-foreground">{featuredTrack.title}</span> —{" "}
              {formatDuration(featuredTrack.duration)}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <TrackGrid />
        </Reveal>
      </div>
    </section>
  )
}
