"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

interface ScrollingDisplayProps {
  text: string
  className?: string
  /** Quanto a faixa de texto move horizontalmente em % com o scroll. */
  range?: [string, string]
}

export function ScrollingDisplay({
  text,
  className,
  range = ["10%", "-30%"],
}: ScrollingDisplayProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], range)

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none relative w-full overflow-hidden",
        className,
      )}
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap font-display text-[clamp(5rem,18vw,18rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em] text-foreground/[0.06]"
      >
        <span>{text}</span>
      </motion.div>
    </div>
  )
}
