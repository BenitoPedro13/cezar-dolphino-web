"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "motion/react"

import { cn } from "@/lib/utils"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Direction = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  direction?: Direction
  once?: boolean
  amount?: number
  as?: "div" | "section" | "article" | "header" | "li" | "p" | "h1" | "h2" | "h3"
}

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y,
  direction = "up",
  once = true,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const offset = OFFSETS[direction]
  const initial = {
    opacity: 0,
    x: offset.x,
    y: y !== undefined ? y : offset.y,
  }

  const MotionTag = motion[as] as typeof motion.div

  const variants: Variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EASE,
      },
    },
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  amount?: number
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  once = true,
  amount = 0.2,
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerItemVariants} className={cn(className)}>
      {children}
    </motion.div>
  )
}
