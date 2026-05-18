"use client"

import { motion } from "motion/react"
import type { AnchorHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface UnderlineLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  className?: string
}

export function UnderlineLink({
  children,
  className,
  ...props
}: UnderlineLinkProps) {
  return (
    <motion.a
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn("relative inline-flex items-center", className)}
      {...(props as Parameters<typeof motion.a>[0])}
    >
      <span className="relative">
        {children}
        <motion.span
          variants={{
            rest: { scaleX: 0, originX: 0 },
            hover: { scaleX: 1, originX: 0 },
          }}
          transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] as const }}
          className="absolute -bottom-0.5 left-0 block h-px w-full origin-left bg-current"
        />
      </span>
    </motion.a>
  )
}
