"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Pause, Play } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { usePlayerStore } from "@/lib/player-store"
import type { Track } from "@/lib/types"
import { cn, formatDuration } from "@/lib/utils"

const CATEGORY_LABELS: Record<Track["category"], string> = {
  original: "Original",
  cover: "Cover",
  "ao-vivo": "Ao vivo",
}

interface TrackCardProps {
  track: Track
  queue: Track[]
  featured?: boolean
}

export function TrackCard({ track, queue, featured = false }: TrackCardProps) {
  const loadTrack = usePlayerStore((state) => state.loadTrack)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const isActive = currentTrack?.id === track.id && isPlaying

  return (
    <motion.button
      type="button"
      onClick={() => loadTrack(track, queue)}
      whileHover="hover"
      initial="idle"
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-border/70 bg-card/60 text-left backdrop-blur transition-colors hover:border-primary/60",
        featured && "sm:col-span-2 lg:col-span-3",
        isActive && "border-primary/60 ring-1 ring-primary/30",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-square",
        )}
      >
        <motion.div
          variants={{
            idle: { scale: 1.02 },
            hover: { scale: 1.08 },
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute inset-0"
        >
          <Image
            src={track.coverArt}
            alt={track.title}
            fill
            className="object-cover"
            sizes={
              featured ? "(max-width: 1024px) 100vw, 70vw" : "(max-width: 640px) 100vw, 360px"
            }
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/30 to-transparent" />

        <motion.div
          variants={{
            idle: { y: 12, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl sm:size-14",
            isActive && "opacity-100",
          )}
        >
          {isActive ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="size-5 fill-current translate-x-[1px]" />
          )}
        </motion.div>

        {featured && (
          <div className="absolute left-6 top-6">
            <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary">
              Em destaque
            </Badge>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="border border-border/40 bg-background/60 text-[0.65rem] uppercase tracking-[0.14em] backdrop-blur"
            >
              {CATEGORY_LABELS[track.category]}
            </Badge>
            <span className="font-sans text-xs text-muted-foreground">
              {track.year} · {formatDuration(track.duration)}
            </span>
          </div>
          <p
            className={cn(
              "font-display leading-tight text-foreground",
              featured ? "text-3xl sm:text-5xl" : "text-xl sm:text-2xl",
            )}
          >
            {track.title}
          </p>
        </div>
      </div>
    </motion.button>
  )
}
