"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

type ModalBodyProps = {
  children: React.ReactNode
  className?: string
}

export const ModalBody = memo(function ModalBody({
  children,
  className,
}: ModalBodyProps) {
  return (
    <div
      data-lenis-prevent
      className={cn(
        "modal-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain",
        "[-webkit-overflow-scrolling:touch] [touch-action:pan-y]",
        className,
      )}
    >
      {children}
    </div>
  )
})
