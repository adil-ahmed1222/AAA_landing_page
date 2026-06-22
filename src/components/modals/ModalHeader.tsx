"use client"

import { memo } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type ModalHeaderProps = {
  title: string
  description?: string
  onClose: () => void
  titleId: string
  descriptionId?: string
  className?: string
}

export const ModalHeader = memo(function ModalHeader({
  title,
  description,
  onClose,
  titleId,
  descriptionId,
  className,
}: ModalHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 id={titleId} className="text-xl font-bold tracking-tight text-white md:text-2xl">
          {title}
        </h2>
        {description ? (
          <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
      >
        <X className="size-5" />
      </button>
    </div>
  )
})
