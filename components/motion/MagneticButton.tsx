"use client"

import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import type { MouseEvent, ReactNode } from "react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  strength?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  href,
  strength = 0.25,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, { damping: 18, stiffness: 220, mass: 0.4 })
  const y = useSpring(mouseY, { damping: 18, stiffness: 220, mass: 0.4 })

  const innerX = useTransform(x, (v) => v * 0.6)
  const innerY = useTransform(y, (v) => v * 0.6)

  function handleMouse(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = event.clientX - rect.left - rect.width / 2
    const cy = event.clientY - rect.top - rect.height / 2
    mouseX.set(cx * strength)
    mouseY.set(cy * strength)
  }

  function handleLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const content = (
    <motion.span
      style={{ x: innerX, y: innerY }}
      className="pointer-events-none flex h-full w-full items-center justify-center"
    >
      {children}
    </motion.span>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {href ? (
        <a href={href} className="contents">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.div>
  )
}
