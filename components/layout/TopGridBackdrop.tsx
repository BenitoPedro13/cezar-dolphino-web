import { cn } from "@/lib/utils"

interface TopGridBackdropProps {
  children: React.ReactNode
  className?: string
}

export function TopGridBackdrop({ children, className }: TopGridBackdropProps) {
  return (
    <div className={cn("relative isolate bg-background", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "min(14vw,180px) min(14vw,180px)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>
      {children}
    </div>
  )
}
