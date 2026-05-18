"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

interface ParallaxBackgroundProps {
  className?: string
}

export function ParallaxBackground({ className }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0])

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -left-32 top-[10%] size-[55vw] rounded-full bg-primary/35 blur-[120px]"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute -right-40 top-[35%] size-[65vw] rounded-full bg-secondary/40 blur-[140px]"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute left-[20%] bottom-[5%] size-[40vw] rounded-full bg-primary/20 blur-[100px]"
      />
    </div>
  )
}
