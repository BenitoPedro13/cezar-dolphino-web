"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import type { MouseEvent, ReactNode } from "react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

export function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const x = useSpring(mouseX, { damping: 20, stiffness: 200 })
  const y = useSpring(mouseY, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(y, [0, 1], [max, -max])
  const rotateY = useTransform(x, [0, 1], [-max, max])
  const shineX = useTransform(x, [0, 1], ["0%", "100%"])

  function handleMouse(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((event.clientX - rect.left) / rect.width)
    mouseY.set((event.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}
      <motion.div
        aria-hidden
        style={{ x: shineX }}
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent mix-blend-overlay opacity-60"
      />
    </motion.div>
  )
}
