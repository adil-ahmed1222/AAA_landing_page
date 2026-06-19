"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Brain } from "lucide-react"
import { ORBIT_TOOLS } from "@/lib/landing-data"

function orbitPosition(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2
  return {
    left: `${(50 + Math.cos(angle) * radius).toFixed(2)}%`,
    top: `${(50 + Math.sin(angle) * radius).toFixed(2)}%`,
  }
}

const INNER_TOOLS = ORBIT_TOOLS.slice(0, 12).map((tool, i) => ({
  tool,
  ...orbitPosition(i, 12, 38),
}))

const OUTER_TOOLS = ORBIT_TOOLS.slice(12).map((tool, i) => ({
  tool,
  ...orbitPosition(i, ORBIT_TOOLS.length - 12, 48),
}))

function OrbitPlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-[100px]" />
      <div className="absolute inset-[15%] rounded-full bg-amber-500/10 blur-[60px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-24 items-center justify-center rounded-full border border-orange-500/40 bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-xl md:size-32">
          <Brain className="size-10 text-orange-300 md:size-14" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}

export function HeroOrbit() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mounted, mouseX, mouseY])

  if (!mounted) {
    return <OrbitPlaceholder />
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-[100px]" />
      <div className="absolute inset-[15%] rounded-full bg-amber-500/10 blur-[60px]" />

      {[0, 1, 2].map((ring) => (
        <motion.div
          key={ring}
          className="absolute inset-0 rounded-full border border-orange-500/20"
          style={{
            scale: 0.55 + ring * 0.18,
            rotateX,
            rotateY,
          }}
          animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 30 + ring * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{ rotateX, rotateY, transformPerspective: 800 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {INNER_TOOLS.map(({ tool, left, top }, i) => (
            <motion.div
              key={tool}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left, top }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <div className="rounded-lg border border-orange-500/30 bg-black/60 px-2 py-1 text-[10px] font-medium whitespace-nowrap text-orange-200 shadow-[0_0_20px_-4px_rgba(249,115,22,0.5)] backdrop-blur-md md:px-3 md:py-1.5 md:text-xs">
                {tool}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {OUTER_TOOLS.map(({ tool, left, top }, i) => (
            <motion.div
              key={tool}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left, top }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4 + (i % 2),
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-medium whitespace-nowrap text-zinc-400 backdrop-blur-md md:px-2.5 md:py-1 md:text-[10px]">
                {tool}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        animate={{
          boxShadow: [
            "0 0 60px 10px rgba(249,115,22,0.3)",
            "0 0 80px 20px rgba(251,191,36,0.4)",
            "0 0 60px 10px rgba(249,115,22,0.3)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex size-24 items-center justify-center rounded-full border border-orange-500/40 bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-xl md:size-32">
          <Brain className="size-10 text-orange-300 md:size-14" strokeWidth={1.5} />
        </div>
      </motion.div>

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-1 rounded-full bg-orange-400/60"
          style={{
            left: `${10 + ((i * 17) % 80)}%`,
            top: `${5 + ((i * 23) % 90)}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}
