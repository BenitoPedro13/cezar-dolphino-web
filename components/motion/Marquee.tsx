"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
  repeat?: number
}

export function Marquee({
  children,
  duration = 30,
  reverse = false,
  className,
  repeat = 4,
}: MarqueeProps) {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.div
        className="flex shrink-0 items-center gap-12 pr-12"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          duration: hovering ? duration * 3 : duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center gap-12 pr-12">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
