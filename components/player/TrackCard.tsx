"use client"

import Image from "next/image"
import { Play } from "lucide-react"

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
    <button
      type="button"
      onClick={() => loadTrack(track, queue)}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg border border-border/80 bg-card text-left transition-colors hover:border-primary/50",
        featured && "sm:col-span-2",
        isActive && "border-primary/60 ring-1 ring-primary/30",
      )}
    >
      <div
        className={cn(
          "relative aspect-square w-full bg-muted",
          featured && "sm:aspect-[2/1]",
        )}
      >
        <Image
          src={track.coverArt}
          alt={track.title}
          fill
          className="object-cover opacity-90 transition-opacity group-hover:opacity-75"
          sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "240px"}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Play className="size-5 fill-current" />
          </span>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-lg leading-tight text-foreground">
            {track.title}
          </p>
          <Badge variant="secondary" className="shrink-0 text-[0.65rem] uppercase">
            {CATEGORY_LABELS[track.category]}
          </Badge>
        </div>
        <p className="font-sans text-xs text-muted-foreground">
          {track.year} · {formatDuration(track.duration)}
        </p>
      </div>
    </button>
  )
}
