"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { NAV_LINKS } from "@/lib/landing-data"
import { GlowButton } from "@/components/landing/motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-black/80 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
          <a href="#home" className="group flex flex-col">
            <span className="bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 bg-clip-text text-lg font-bold tracking-tight text-transparent md:text-xl">
              NeuralVarsity
            </span>
            <span className="text-[10px] tracking-widest text-zinc-500 uppercase md:text-xs">
              Agents & Automation
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-orange-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <GlowButton variant="ghost" href="#consultation" className="!px-5 !py-2.5 !text-sm">
              Book Consultation
            </GlowButton>
            <GlowButton variant="primary" href="#pricing" className="!px-5 !py-2.5 !text-sm">
              Enroll Now
            </GlowButton>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-lg border border-white/10 p-2 text-zinc-300 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="flex h-full flex-col px-6 pt-24 pb-8"
            >
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-zinc-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                <GlowButton variant="ghost" href="#consultation" onClick={() => setMobileOpen(false)}>
                  Book Consultation
                </GlowButton>
                <GlowButton variant="primary" href="#pricing" onClick={() => setMobileOpen(false)}>
                  Enroll Now
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
