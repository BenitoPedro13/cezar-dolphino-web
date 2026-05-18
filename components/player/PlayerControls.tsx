"use client"

import { Pause, Play, SkipBack, SkipForward } from "lucide-react"

import { usePlayerStore } from "@/lib/player-store"
import { buttonVariants } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn, formatDuration } from "@/lib/utils"

export function PlayerControls() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)
  const volume = usePlayerStore((state) => state.volume)
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const seek = usePlayerStore((state) => state.seek)
  const setVolume = usePlayerStore((state) => state.setVolume)
  const playNext = usePlayerStore((state) => state.playNext)
  const playPrev = usePlayerStore((state) => state.playPrev)

  if (!currentTrack) return null

  const elapsed = duration * progress

  return (
    <div className="mt-8 space-y-4 rounded-lg border border-border/70 bg-background/60 p-4">
      <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
        Player (preview chunk 04)
      </p>
      <p className="font-sans text-sm text-foreground">
        {currentTrack.title}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Faixa anterior"
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          onClick={playPrev}
        >
          <SkipBack className="size-4" />
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "Pausar" : "Tocar"}
          className={cn(buttonVariants({ size: "icon-sm" }))}
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          type="button"
          aria-label="Proxima faixa"
          className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
          onClick={playNext}
        >
          <SkipForward className="size-4" />
        </button>
        <span className="ml-2 font-sans text-xs tabular-nums text-muted-foreground">
          {formatDuration(Math.floor(elapsed))} / {formatDuration(Math.floor(duration))}
        </span>
      </div>

      <Slider
        value={[progress * 100]}
        max={100}
        step={0.5}
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value[0] : value
          seek((next ?? 0) / 100)
        }}
        aria-label="Progresso da faixa"
      />

      <div className="flex items-center gap-3">
        <span className="font-sans text-xs text-muted-foreground">Volume</span>
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={(value) => {
            const next = Array.isArray(value) ? value[0] : value
            setVolume((next ?? 0) / 100)
          }}
          aria-label="Volume"
          className="max-w-xs"
        />
      </div>
    </div>
  )
}
