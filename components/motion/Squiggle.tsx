"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface SquiggleProps {
  className?: string
  delay?: number
}

export function Squiggle({ className, delay = 0 }: SquiggleProps) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 200"
      fill="none"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none", className)}
    >
      <motion.path
        d="M 20 90 C 60 30, 120 30, 140 90 S 180 170, 100 170 S 40 110, 90 100"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{
          duration: 2.4,
          ease: [0.65, 0, 0.35, 1] as const,
          delay,
        }}
      />
    </motion.svg>
  )
}

export function ScribbleUnderline({ className, delay = 0 }: SquiggleProps) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 30"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("pointer-events-none", className)}
    >
      <motion.path
        d="M 5 18 Q 30 4, 60 16 T 120 18 T 195 14"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.4,
          ease: [0.65, 0, 0.35, 1] as const,
          delay,
        }}
      />
    </motion.svg>
  )
}

export function CornerBracket({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={cn("size-4", className)}
    >
      <path d="M 2 8 V 2 H 8" />
      <path d="M 22 16 V 22 H 16" />
    </svg>
  )
}
