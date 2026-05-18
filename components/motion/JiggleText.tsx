"use client"

import { motion, type Variants } from "motion/react"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface JiggleTextProps {
  text: string
  className?: string
  style?: CSSProperties
  /** Rotação máxima de cada letra ao passar o mouse */
  maxRotate?: number
  /** Translação vertical máxima de cada letra */
  maxY?: number
  /** Intensidade do stagger entre letras */
  stagger?: number
  /** Se true, anima ao entrar na viewport também */
  animateOnView?: boolean
  /** Define se hover precisa ser no container inteiro (true) ou cada letra (false) */
  group?: boolean
  as?: "span" | "div"
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function JiggleText({
  text,
  className,
  style,
  maxRotate = 8,
  maxY = 6,
  stagger = 0.04,
  animateOnView = true,
  group = true,
  as = "span",
}: JiggleTextProps) {
  const characters = Array.from(text)

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
    hover: {
      transition: { staggerChildren: stagger * 0.7 },
    },
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: "55%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
    hover: (i: number) => ({
      y: i % 2 === 0 ? -maxY : maxY,
      rotate: i % 2 === 0 ? maxRotate : -maxRotate,
      transition: { duration: 0.6, ease: EASE },
    }),
  }

  const Container = motion[as] as typeof motion.span

  return (
    <Container
      initial={animateOnView ? "hidden" : false}
      whileInView={animateOnView ? "visible" : undefined}
      viewport={animateOnView ? { once: true, amount: 0.3 } : undefined}
      whileHover={group ? "hover" : undefined}
      animate={animateOnView ? undefined : "visible"}
      variants={containerVariants}
      className={cn("inline-flex flex-wrap", className)}
      style={style}
      aria-label={text}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={letterVariants}
          whileHover={
            !group
              ? {
                  y: i % 2 === 0 ? -maxY : maxY,
                  rotate: i % 2 === 0 ? maxRotate : -maxRotate,
                  transition: { duration: 0.4, ease: EASE },
                }
              : undefined
          }
          className="inline-block will-change-transform"
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Container>
  )
}
