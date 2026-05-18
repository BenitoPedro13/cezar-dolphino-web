"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react"

import { usePlayerStore } from "@/lib/player-store"
import { cn, formatDuration } from "@/lib/utils"

export function PlayerBar() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const seek = usePlayerStore((state) => state.seek)
  const playNext = usePlayerStore((state) => state.playNext)
  const playPrev = usePlayerStore((state) => state.playPrev)
  const clearTrack = usePlayerStore((state) => state.clearTrack)

  if (!currentTrack) return null

  const elapsed = Math.floor(duration * progress)

  return (
    <AnimatePresence>
      <motion.div
        key="player"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center px-4 sm:bottom-24"
      >
        <div
          className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-full border border-border bg-background/90 p-2 shadow-[0_22px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          role="region"
          aria-label="Player de música"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 pl-1">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-muted">
              <Image
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                fill
                className="object-cover"
                sizes="36px"
              />
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 12,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "linear",
                }}
                className="absolute inset-2 rounded-full border border-white/20"
                aria-hidden
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <p className="truncate font-sans text-xs font-medium text-foreground">
                {currentTrack.title}
              </p>
              <p className="truncate font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                {formatDuration(elapsed)} / {formatDuration(duration)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              aria-label="Aleatório"
              className="hidden p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <Shuffle className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Faixa anterior"
              onClick={playPrev}
              className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <SkipBack className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pausar" : "Tocar"}
              onClick={togglePlay}
              className={cn(
                "mx-1 inline-flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95",
              )}
            >
              {isPlaying ? (
                <Pause className="size-3.5 fill-current" />
              ) : (
                <Play className="size-3.5 translate-x-[1px] fill-current" />
              )}
            </button>
            <button
              type="button"
              aria-label="Próxima faixa"
              onClick={playNext}
              className="p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <SkipForward className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Repetir"
              className="hidden p-2 text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <Repeat className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={clearTrack}
            aria-label="Fechar player"
            className="ml-1 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        </div>

        <div
          className="pointer-events-auto absolute inset-x-4 bottom-0 sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-xl sm:-translate-x-1/2"
          aria-hidden
        >
          <div
            className="mx-2 h-[2px] cursor-pointer overflow-hidden rounded-full bg-foreground/10"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const ratio = (event.clientX - rect.left) / rect.width
              seek(Math.min(1, Math.max(0, ratio)))
            }}
          >
            <div
              className="h-full bg-accent transition-[width] duration-150 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
