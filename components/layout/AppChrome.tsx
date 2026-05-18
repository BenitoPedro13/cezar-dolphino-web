"use client"

import { FloatingDock } from "@/components/layout/FloatingDock"
import { CustomCursor } from "@/components/motion/CustomCursor"
import { Loader } from "@/components/motion/Loader"

interface AppChromeProps {
  children: React.ReactNode
}

export function AppChrome({ children }: AppChromeProps) {
  return (
    <>
      <CustomCursor />
      <Loader />
      {children}
      <FloatingDock />
    </>
  )
}
