"use client"

import { PlayerBar } from "@/components/player/PlayerBar"
import { usePlayerStore } from "@/lib/player-store"
import { cn } from "@/lib/utils"

interface AppChromeProps {
  children: React.ReactNode
}

export function AppChrome({ children }: AppChromeProps) {
  const hasTrack = usePlayerStore((state) => Boolean(state.currentTrack))

  return (
    <>
      <div className={cn(hasTrack && "pb-[73px]")}>{children}</div>
      <PlayerBar />
    </>
  )
}
