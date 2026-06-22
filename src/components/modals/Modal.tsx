"use client"

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useLenis } from "lenis/react"
import { ModalBackdrop } from "@/components/modals/ModalBackdrop"
import { cn } from "@/lib/utils"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  labelledBy: string
  describedBy?: string
  className?: string
  returnFocusRef?: React.RefObject<HTMLElement | null>
}

export const Modal = memo(function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
  describedBy,
  className,
  returnFocusRef,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const scrollPositionRef = useRef(0)
  const titleId = useId()
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    scrollPositionRef.current = lenis?.scroll ?? window.scrollY

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    lenis?.stop()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab" || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled"))

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    const focusTimer = window.setTimeout(() => {
      const firstFocusable =
        panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      firstFocusable?.focus()
    }, 50)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow

      lenis?.start()
      if (lenis) {
        lenis.scrollTo(scrollPositionRef.current, { immediate: true })
      } else {
        window.scrollTo(0, scrollPositionRef.current)
      }

      const returnTarget =
        returnFocusRef?.current ?? previousFocusRef.current
      returnTarget?.focus()
    }
  }, [isOpen, onClose, returnFocusRef, lenis])

  const handleBackdropClose = useCallback(() => {
    onClose()
  }, [onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen ? (
        <>
          <ModalBackdrop onClose={handleBackdropClose} />
          <div
            data-lenis-prevent
            className="pointer-events-none fixed inset-0 z-[101] flex items-end justify-center p-0 md:items-center md:p-6"
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy || titleId}
              aria-describedby={describedBy}
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className={cn(
                "pointer-events-auto flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden rounded-none",
                "border border-white/10 bg-[#0a0a0a]/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]",
                "backdrop-blur-xl md:h-auto md:max-h-[min(90vh,900px)] md:min-h-0 md:rounded-[24px]",
                className,
              )}
            >
              <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
})
