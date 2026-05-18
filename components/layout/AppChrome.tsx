"use client"

import { FloatingDock } from "@/components/layout/FloatingDock"
import { CustomCursor } from "@/components/motion/CustomCursor"
import { Loader } from "@/components/motion/Loader"
import { PlayerBar } from "@/components/player/PlayerBar"

interface AppChromeProps {
  children: React.ReactNode
}

export function AppChrome({ children }: AppChromeProps) {
  return (
    <>
      <CustomCursor />
      <Loader />
      {children}
      <PlayerBar />
      <FloatingDock />
    </>
  )
}
