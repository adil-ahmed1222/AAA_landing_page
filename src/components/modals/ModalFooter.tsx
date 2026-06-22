"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

type ModalFooterProps = {
  children: React.ReactNode
  className?: string
}

export const ModalFooter = memo(function ModalFooter({
  children,
  className,
}: ModalFooterProps) {
  return (
    <div
      className={cn(
        "relative z-10 shrink-0 border-t border-white/10 bg-[#0a0a0a]/95 p-4 backdrop-blur-xl md:p-6",
        className,
      )}
    >
      {children}
    </div>
  )
})
