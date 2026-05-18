"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

interface SectionLabelProps {
  index: string
  label: string
  className?: string
}

export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground",
        className,
      )}
    >
      <span className="text-primary">{index}</span>
      <span className="h-px w-10 bg-border" />
      <span>{label}</span>
    </motion.div>
  )
}
