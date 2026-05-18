"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

import { siteConfig } from "@/data/site-config"

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1800

    function tick(now: number) {
      const elapsed = now - start
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)
      if (next < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 400)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] as const }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:left-10">
            Dynamic
            <br />
            Artist
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-foreground sm:right-10">
            <span className="tabular-nums">
              {progress.toString().padStart(3, "0")}
            </span>{" "}
            %
            <br />
            <span className="text-muted-foreground">Loading</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold leading-none tracking-[-0.05em] text-foreground">
              {siteConfig.artistName.split(" ")[0]}
            </div>

            <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
              <span className="relative inline-flex size-6 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-foreground/40" />
                <span className="size-1 rounded-full bg-foreground" />
              </span>
              <span>
                Empowering Listeners and Redefining{" "}
                <span className="text-foreground">the Future of Music</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
