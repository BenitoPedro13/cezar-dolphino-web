"use client"

import { AnimatePresence, motion } from "motion/react"

import { usePlayerStore } from "@/lib/player-store"
import { formatDuration } from "@/lib/utils"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function PlayerBar() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)
  const seek = usePlayerStore((state) => state.seek)

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          key="player-info"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4 sm:bottom-28"
        >
          <div
            className="pointer-events-auto flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-border bg-background/85 px-4 py-3 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            role="region"
            aria-label="Faixa atual"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-sans text-sm font-medium text-foreground">
                  {currentTrack.title}
                </p>
                <p className="truncate font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {currentTrack.album ?? "Cezar Dolphino"} · {currentTrack.year}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                {formatDuration(Math.floor(duration * progress))} /{" "}
                {formatDuration(duration)}
              </span>
            </div>

            <button
              type="button"
              className="group block h-[3px] cursor-pointer overflow-hidden rounded-full bg-foreground/10"
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                const ratio = (event.clientX - rect.left) / rect.width
                seek(Math.min(1, Math.max(0, ratio)))
              }}
              aria-label="Buscar na faixa"
            >
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-linear group-hover:h-[5px]"
                style={{ width: `${progress * 100}%` }}
              />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
