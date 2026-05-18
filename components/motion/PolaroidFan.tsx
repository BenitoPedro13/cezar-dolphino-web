"use client"

import Image from "next/image"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface FanPhoto {
  src: string
  alt: string
}

interface PolaroidFanProps {
  primary: FanPhoto
  extras: FanPhoto[]
  caption?: string
  rotate?: number
  className?: string
  variant?: "vertical" | "square" | "wide"
}

const ASPECTS = {
  vertical: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function PolaroidFan({
  primary,
  extras,
  caption,
  rotate = 0,
  className,
  variant = "vertical",
}: PolaroidFanProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      data-cursor-label="View"
      variants={{
        rest: { rotate, zIndex: 1 },
        hover: {
          rotate: 0,
          zIndex: 40,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
      className={cn("group relative inline-block", ASPECTS[variant], className)}
      style={{ transformOrigin: "center center" }}
    >
      {extras.map((extra, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        const offset = (index + 1) * 18
        const rotation = (index + 1) * 10 * direction
        return (
          <motion.div
            key={extra.src + index}
            variants={{
              rest: { x: 0, y: 0, rotate, opacity: 0, scale: 0.95 },
              hover: {
                x: offset * direction,
                y: -offset * 0.4,
                rotate: rotation,
                opacity: 1,
                scale: 1.05,
                transition: {
                  duration: 0.7,
                  ease: EASE,
                  delay: index * 0.05,
                },
              },
            }}
            className="absolute inset-0"
            style={{ zIndex: -index - 1, transformOrigin: "center center" }}
          >
            <div className="relative size-full overflow-hidden rounded-md bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
              <Image
                src={extra.src}
                alt={extra.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 240px"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        )
      })}

      <motion.div
        variants={{
          rest: { scale: 1, boxShadow: "0 16px 40px -16px rgba(0,0,0,0.6)" },
          hover: {
            scale: 1.15,
            boxShadow: "0 32px 80px -20px rgba(0,0,0,0.95)",
            transition: { duration: 0.6, ease: EASE },
          },
        }}
        className="relative size-full overflow-hidden rounded-md bg-card"
        style={{ zIndex: 5 }}
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
            src={primary.src}
            alt={primary.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 240px"
          />
        </motion.div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

        <motion.div
          variants={{
            rest: { y: 24, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="absolute inset-x-3 bottom-3 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground"
        >
          <span>{primary.alt}</span>
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
    </motion.div>
  )
}
