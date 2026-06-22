"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import dynamic from "next/dynamic"
import { SuccessToast } from "@/components/modals/SuccessToast"

const DownloadBrochureModal = dynamic(
  () =>
    import("@/components/modals/DownloadBrochureModal").then(
      (mod) => mod.DownloadBrochureModal,
    ),
  { ssr: false },
)

const EnrollNowModal = dynamic(
  () =>
    import("@/components/modals/EnrollNowModal").then((mod) => mod.EnrollNowModal),
  { ssr: false },
)

type ModalContextValue = {
  isBrochureOpen: boolean
  isEnrollOpen: boolean
  openBrochure: (trigger?: HTMLElement | null) => void
  closeBrochure: () => void
  openEnroll: (trigger?: HTMLElement | null) => void
  closeEnroll: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isToastVisible, setIsToastVisible] = useState(false)
  const brochureTriggerRef = useRef<HTMLElement | null>(null)
  const enrollTriggerRef = useRef<HTMLElement | null>(null)

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setIsToastVisible(true)
  }, [])

  const hideToast = useCallback(() => {
    setIsToastVisible(false)
  }, [])

  const openBrochure = useCallback((trigger?: HTMLElement | null) => {
    brochureTriggerRef.current = trigger ?? (document.activeElement as HTMLElement)
    setIsEnrollOpen(false)
    setIsBrochureOpen(true)
  }, [])

  const closeBrochure = useCallback(() => {
    setIsBrochureOpen(false)
  }, [])

  const openEnroll = useCallback((trigger?: HTMLElement | null) => {
    enrollTriggerRef.current = trigger ?? (document.activeElement as HTMLElement)
    setIsBrochureOpen(false)
    setIsEnrollOpen(true)
  }, [])

  const closeEnroll = useCallback(() => {
    setIsEnrollOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      isBrochureOpen,
      isEnrollOpen,
      openBrochure,
      closeBrochure,
      openEnroll,
      closeEnroll,
    }),
    [
      isBrochureOpen,
      isEnrollOpen,
      openBrochure,
      closeBrochure,
      openEnroll,
      closeEnroll,
    ],
  )

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isBrochureOpen ? (
        <DownloadBrochureModal
          isOpen={isBrochureOpen}
          onClose={closeBrochure}
          onSuccess={showToast}
          returnFocusRef={brochureTriggerRef}
        />
      ) : null}
      {isEnrollOpen ? (
        <EnrollNowModal
          isOpen={isEnrollOpen}
          onClose={closeEnroll}
          onSuccess={showToast}
          returnFocusRef={enrollTriggerRef}
        />
      ) : null}
      <SuccessToast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={hideToast}
      />
    </ModalContext.Provider>
  )
}

export function useLandingModals() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useLandingModals must be used within ModalProvider")
  }
  return context
}

export function useLandingModalsOptional() {
  return useContext(ModalContext)
}
