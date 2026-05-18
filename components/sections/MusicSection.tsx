import { TrackGrid } from "@/components/player/TrackGrid"
import { featuredTrack, tracks } from "@/data/tracks"
import { formatDuration } from "@/lib/utils"

export function MusicSection() {
  return (
    <section
      id="musica"
      className="scroll-mt-24 border-b border-border/70 bg-card/40"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="font-display text-4xl">Musica</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          {tracks.length} {tracks.length === 1 ? "faixa" : "faixas"} no catalogo.
          Destaque:{" "}
          <span className="text-foreground">{featuredTrack.title}</span> (
          {formatDuration(featuredTrack.duration)}).
        </p>
        <TrackGrid />
      </div>
    </section>
  )
}
