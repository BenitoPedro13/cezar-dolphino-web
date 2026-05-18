"use client"

import { Play } from "lucide-react"

import { tracks } from "@/data/tracks"
import { usePlayerStore } from "@/lib/player-store"
import type { Track } from "@/lib/types"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TrackPlayButtonProps {
  track: Track
}

export function TrackPlayButton({ track }: TrackPlayButtonProps) {
  const loadTrack = usePlayerStore((state) => state.loadTrack)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const isActive = currentTrack?.id === track.id && isPlaying

  return (
    <button
      type="button"
      aria-label={`Tocar ${track.title}`}
      className={cn(
        buttonVariants({ variant: isActive ? "default" : "outline", size: "sm" }),
        "gap-1.5",
      )}
      onClick={() => loadTrack(track, tracks)}
    >
      <Play className="size-3.5" />
      Tocar
    </button>
  )
}
