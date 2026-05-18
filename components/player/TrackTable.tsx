"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowUpRight, Pause, Play } from "lucide-react"
import { useMemo, useState } from "react"

import { usePlayerStore } from "@/lib/player-store"
import { tracks } from "@/data/tracks"
import type { Track } from "@/lib/types"
import { cn, formatDuration } from "@/lib/utils"

const CATEGORY_LABELS: Record<Track["category"], string> = {
  original: "Original",
  cover: "Cover",
  "ao-vivo": "Ao vivo",
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function EqBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="block w-[3px] rounded-sm bg-accent"
          animate={
            playing ? { scaleY: [0.3, 1, 0.5, 0.8, 0.3] } : { scaleY: 0.3 }
          }
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
          style={{ height: "100%", transformOrigin: "bottom" }}
        />
      ))}
    </div>
  )
}

export function TrackTable() {
  const loadTrack = usePlayerStore((state) => state.loadTrack)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const [expanded, setExpanded] = useState(false)

  const visibleTracks = useMemo(
    () => (expanded ? tracks : tracks.slice(0, 5)),
    [expanded],
  )

  return (
    <div className="w-full">
      <div className="grid grid-cols-[56px_1fr_120px] items-center gap-4 border-b border-border pb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground sm:grid-cols-[56px_1fr_2fr_1fr_60px] sm:gap-6">
        <span className="sr-only">Play</span>
        <span>Track</span>
        <span className="hidden sm:block">Artist</span>
        <span className="hidden sm:block">Genre</span>
        <span className="text-right">Time</span>
      </div>

      <ul role="list">
        {visibleTracks.map((track, index) => {
          const isActive = currentTrack?.id === track.id
          const isCurrentPlaying = isActive && isPlaying

          return (
            <motion.li
              key={track.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: EASE,
              }}
            >
              <motion.button
                type="button"
                initial="rest"
                whileHover="hover"
                animate={isActive ? "hover" : "rest"}
                data-cursor-label={isActive ? "Pause" : "Play"}
                onClick={() => {
                  if (isActive) togglePlay()
                  else loadTrack(track, tracks)
                }}
                className={cn(
                  "group relative grid w-full grid-cols-[56px_1fr_120px] items-center gap-4 overflow-hidden border-b border-border/40 py-4 text-left sm:grid-cols-[56px_1fr_2fr_1fr_60px] sm:gap-6",
                )}
              >
                <motion.span
                  aria-hidden
                  variants={{
                    rest: { scaleX: 0, originX: 0 },
                    hover: { scaleX: 1, originX: 0 },
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-y-0 left-0 z-0 w-full origin-left bg-foreground/[0.04]"
                />

                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 4 },
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative z-10 flex size-10 items-center justify-center"
                >
                  {isCurrentPlaying ? (
                    <EqBars playing />
                  ) : (
                    <motion.span
                      variants={{
                        rest: {
                          scale: 1,
                          backgroundColor: "transparent",
                          color: "var(--color-foreground)",
                        },
                        hover: {
                          scale: 1.1,
                          backgroundColor: "var(--color-foreground)",
                          color: "var(--color-background)",
                        },
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex size-9 items-center justify-center rounded-full border border-border"
                    >
                      {isActive ? (
                        <Pause className="size-3.5 fill-current" />
                      ) : (
                        <Play className="size-3.5 translate-x-[1px] fill-current" />
                      )}
                    </motion.span>
                  )}
                </motion.span>

                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: { x: 8 },
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative z-10 flex min-w-0 items-center gap-3"
                >
                  <motion.span
                    variants={{
                      rest: { scale: 1, rotate: 0 },
                      hover: { scale: 1.15, rotate: -3 },
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative size-10 shrink-0 overflow-hidden rounded-sm bg-muted"
                  >
                    <Image
                      src={track.coverArt}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </motion.span>
                  <span
                    className={cn(
                      "truncate font-sans text-base font-medium text-foreground sm:text-lg",
                    )}
                  >
                    {track.title}
                  </span>
                </motion.span>

                <motion.span
                  variants={{
                    rest: { x: 0, opacity: 0.7 },
                    hover: { x: 6, opacity: 1 },
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative z-10 hidden truncate font-sans text-sm text-muted-foreground sm:block"
                >
                  Cezar Dolphino
                </motion.span>

                <motion.span
                  variants={{
                    rest: { x: 0, opacity: 0.7 },
                    hover: { x: 6, opacity: 1 },
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative z-10 hidden truncate font-sans text-sm text-muted-foreground sm:block"
                >
                  {CATEGORY_LABELS[track.category]} · {track.year}
                </motion.span>

                <motion.span
                  variants={{
                    rest: { x: 0 },
                    hover: { x: -4 },
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative z-10 flex items-center justify-end gap-2 text-right font-mono text-xs tabular-nums text-muted-foreground"
                >
                  <motion.span
                    aria-hidden
                    variants={{
                      rest: { opacity: 0, x: -6 },
                      hover: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:inline-flex"
                  >
                    <ArrowUpRight className="size-3" />
                  </motion.span>
                  {formatDuration(track.duration)}
                </motion.span>
              </motion.button>
            </motion.li>
          )
        })}
      </ul>

      {tracks.length > 5 && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="group relative inline-flex items-center gap-2 pb-1 font-sans text-sm text-foreground"
          >
            {expanded ? "Mostrar menos" : "Mostrar mais"}
            <motion.span
              initial={{ scaleX: 1, originX: 0 }}
              whileHover={{ scaleX: 0, originX: 1 }}
              className="absolute inset-x-0 bottom-0 block h-px bg-foreground/60"
            />
          </button>
        </div>
      )}
    </div>
  )
}
