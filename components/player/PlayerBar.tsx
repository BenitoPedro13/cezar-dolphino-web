"use client"

import Image from "next/image"
import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react"

import { siteConfig } from "@/data/site-config"
import { usePlayerStore } from "@/lib/player-store"
import { cn, formatDuration } from "@/lib/utils"

export function PlayerBar() {
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

  const elapsed = Math.floor(duration * progress)
  const total = Math.floor(duration)

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md"
      role="region"
      aria-label="Player de musica"
    >
      <div
        className="group relative h-1 w-full cursor-pointer bg-muted"
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          const ratio = (event.clientX - rect.left) / rect.width
          seek(Math.min(1, Math.max(0, ratio)))
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") seek(Math.min(1, progress + 0.05))
          if (event.key === "ArrowLeft") seek(Math.max(0, progress - 0.05))
        }}
        role="slider"
        aria-label="Progresso da faixa"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
      >
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-border/80 bg-muted">
            <Image
              src={currentTrack.coverArt}
              alt=""
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-sm font-medium text-foreground">
              {currentTrack.title}
            </p>
            <p className="truncate font-sans text-xs text-muted-foreground">
              {siteConfig.artistName}
            </p>
          </div>
          <button
            type="button"
            aria-label="Favoritar faixa"
            className="hidden shrink-0 text-muted-foreground transition-colors hover:text-primary sm:inline-flex"
          >
            <Heart className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Aleatorio"
            className="hidden p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Shuffle className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Faixa anterior"
            onClick={playPrev}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pausar" : "Tocar"}
            onClick={togglePlay}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current" />
            )}
          </button>
          <button
            type="button"
            aria-label="Proxima faixa"
            onClick={playNext}
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <SkipForward className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Repetir"
            className="hidden p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Repeat className="size-4" />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <span className="hidden font-sans text-xs tabular-nums text-muted-foreground sm:inline">
            {formatDuration(elapsed)} / {formatDuration(total)}
          </span>
          <div className="flex items-center gap-2">
            <Volume2 className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume * 100}
              onChange={(event) =>
                setVolume(Number(event.target.value) / 100)
              }
              aria-label="Volume"
              className={cn(
                "h-1 w-16 cursor-pointer appearance-none rounded-full bg-muted sm:w-24",
                "[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
                "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
