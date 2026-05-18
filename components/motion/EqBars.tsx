"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface EqBarsProps {
  className?: string
  bars?: number
  /** Se true, anima continuamente. */
  playing?: boolean
}

export function EqBarsDeco({
  className,
  bars = 5,
  playing = true,
}: EqBarsProps) {
  return (
    <div className={cn("flex h-6 items-end gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="block w-[3px] rounded-sm bg-accent"
          animate={
            playing
              ? { scaleY: [0.3, 1, 0.5, 0.9, 0.4, 0.7, 0.3] }
              : { scaleY: 0.3 }
          }
          transition={{
            duration: 1.3,
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
