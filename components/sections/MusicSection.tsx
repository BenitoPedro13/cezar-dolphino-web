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
          {tracks.length} faixas no catalogo. Destaque atual:{" "}
          <span className="text-foreground">{featuredTrack.title}</span> (
          {formatDuration(featuredTrack.duration)}).
        </p>
        <ul className="mt-6 space-y-2">
          {tracks.map((track) => (
            <li
              key={track.id}
              className="flex items-center justify-between rounded-md border border-border/70 bg-background/50 px-4 py-3 font-sans text-sm"
            >
              <span>
                {track.title}
                {track.featured && (
                  <span className="ml-2 text-xs uppercase tracking-[0.12em] text-primary">
                    Destaque
                  </span>
                )}
              </span>
              <span className="text-muted-foreground">
                {formatDuration(track.duration)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
