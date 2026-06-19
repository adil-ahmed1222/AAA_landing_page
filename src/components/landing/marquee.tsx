"use client"

import { cn } from "@/lib/utils"
import { ToolMarqueeCard } from "@/components/landing/tool-logos"

export function Marquee({
  items,
  direction = "right",
  speed = 40,
  className,
}: {
  items: readonly string[]
  direction?: "left" | "right"
  speed?: number
  className?: string
}) {
  const doubled = [...items, ...items]

  return (
    <div className={cn("marquee-group relative overflow-hidden", className)}>
      <div
        className={cn(
          "marquee-track flex w-max gap-4 py-2",
          direction === "right" ? "animate-marquee-right" : "animate-marquee-left"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <ToolMarqueeCard key={`${item}-${i}`} name={item} />
        ))}
      </div>
    </div>
  )
}
