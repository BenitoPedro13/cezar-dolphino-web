"use client"

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"

const HOVER_SELECTORS = "a, button, [role=button], [data-cursor]"

export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { damping: 30, stiffness: 350, mass: 0.4 })
  const sy = useSpring(y, { damping: 30, stiffness: 350, mass: 0.4 })

  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    function move(event: MouseEvent) {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    function over(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      if (!target?.closest) return
      const interactive = target.closest(HOVER_SELECTORS) as HTMLElement | null
      if (interactive) {
        setHovering(true)
        const customLabel = interactive.getAttribute("data-cursor-label")
        setLabel(customLabel)
      } else {
        setHovering(false)
        setLabel(null)
      }
    }

    function leave() {
      setVisible(false)
    }

    document.addEventListener("mousemove", move)
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseleave", leave)
    return () => {
      document.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseleave", leave)
    }
  }, [x, y])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[90] hidden md:block"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{
              width: hovering ? 56 : 12,
              height: hovering ? 56 : 12,
              borderWidth: hovering ? 1 : 0,
              backgroundColor: hovering
                ? "rgba(255,255,255,0)"
                : "rgba(255,255,255,1)",
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
            className="-translate-x-1/2 -translate-y-1/2 rounded-full border-foreground/80 mix-blend-difference"
          >
            {label && (
              <span className="flex h-full w-full items-center justify-center font-mono text-[0.55rem] uppercase tracking-[0.15em] text-foreground">
                {label}
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
