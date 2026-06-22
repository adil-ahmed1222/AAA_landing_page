"use client"

import { memo } from "react"
import { motion } from "framer-motion"

type ModalBackdropProps = {
  onClose: () => void
}

export const ModalBackdrop = memo(function ModalBackdrop({
  onClose,
}: ModalBackdropProps) {
  return (
    <motion.button
      type="button"
      aria-label="Close modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
    />
  )
})
