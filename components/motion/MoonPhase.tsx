"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

interface MoonPhaseProps {
  className?: string
  centerImage?: string
}

const PHASES = [
  { kind: "crescent-right", rotate: 0 },
  { kind: "half-right", rotate: 0 },
  { kind: "full", rotate: 0 },
  { kind: "half-left", rotate: 0 },
  { kind: "crescent-left", rotate: 0 },
]

export function MoonPhase({ className, centerImage }: MoonPhaseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <motion.div
      ref={ref}
      style={{ rotate }}
      className={cn(
        "relative flex w-full items-center justify-center gap-[3vw]",
        className,
      )}
    >
      {PHASES.map((phase, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.9,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="relative size-[12vw] max-h-44 max-w-44 shrink-0"
        >
          <Phase kind={phase.kind} center={phase.kind === "full"} />
          {centerImage && phase.kind === "full" && (
            <div className="absolute inset-[18%] overflow-hidden rounded-full">
              <Image
                src={centerImage}
                alt=""
                fill
                className="object-cover saturate-[0.85]"
                sizes="200px"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              <div className="absolute left-1/2 top-1/2 size-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

function Phase({ kind, center }: { kind: string; center: boolean }) {
  if (kind === "full") {
    return (
      <div className="relative size-full">
        <div className="absolute inset-0 rounded-full bg-accent/10" />
        <div className="absolute inset-0 rounded-full ring-1 ring-foreground/80" />
        {center && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-foreground/20"
          />
        )}
      </div>
    )
  }

  const clipPath =
    kind === "crescent-right"
      ? "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
      : kind === "half-right"
        ? "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)"
        : kind === "half-left"
          ? "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"
          : "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)"

  const isCrescent = kind.startsWith("crescent")

  return (
    <div className="relative size-full">
      <div
        className="absolute inset-0 rounded-full bg-accent/10"
        style={{ clipPath }}
      />
      <div
        className="absolute inset-0 rounded-full ring-1 ring-foreground/80"
        style={isCrescent ? { clipPath } : undefined}
      />
      {isCrescent && (
        <div
          className="absolute inset-0 rounded-full bg-background"
          style={{
            clipPath:
              kind === "crescent-right"
                ? "ellipse(35% 50% at 25% 50%)"
                : "ellipse(35% 50% at 75% 50%)",
          }}
        />
      )}
    </div>
  )
}
