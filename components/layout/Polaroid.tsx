"use client"

import Image from "next/image"
import { motion } from "motion/react"
import type { ReactNode } from "react"

import { Squiggle } from "@/components/motion/Squiggle"
import { cn } from "@/lib/utils"

interface PolaroidProps {
  src: string
  alt: string
  caption?: string
  rotate?: number
  className?: string
  variant?: "vertical" | "square" | "wide"
  withSquiggle?: boolean
  squiggleDelay?: number
  children?: ReactNode
  delay?: number
}

const ASPECTS = {
  vertical: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  className,
  variant = "vertical",
  withSquiggle = false,
  squiggleDelay = 0.4,
  delay = 0,
}: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: rotate - 8 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: EASE }}
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { rotate, scale: 1, zIndex: 1 },
        hover: {
          rotate: 0,
          scale: 1.15,
          zIndex: 30,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      data-cursor-label="View"
      className={cn(
        "group relative isolate inline-block cursor-pointer",
        ASPECTS[variant],
        className,
      )}
      style={{ transformOrigin: "center center" }}
    >
      <motion.div
        variants={{
          rest: { boxShadow: "0 16px 40px -16px rgba(0,0,0,0.6)" },
          hover: { boxShadow: "0 32px 80px -20px rgba(0,0,0,0.9)" },
        }}
        transition={{ duration: 0.5 }}
        className="relative size-full overflow-hidden rounded-md bg-card"
      >
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.08 },
          }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 240px"
          />
        </motion.div>
        <motion.div
          variants={{
            rest: { opacity: 0.05 },
            hover: { opacity: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-background"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

        <motion.div
          variants={{
            rest: { y: 24, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground"
        >
          <span>{alt}</span>
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-foreground/15 backdrop-blur">
            ↗
          </span>
        </motion.div>
      </motion.div>

      {caption && (
        <div
          className="pointer-events-none absolute left-0 top-0 -translate-x-full pr-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl] [text-orientation:mixed]"
          style={{ transform: "rotate(180deg)" }}
        >
          {caption}
        </div>
      )}

      {withSquiggle && (
        <Squiggle
          delay={squiggleDelay}
          className="pointer-events-none absolute -right-12 -top-6 size-32 text-foreground/80 sm:-right-16 sm:size-40"
        />
      )}
    </motion.div>
  )
}
