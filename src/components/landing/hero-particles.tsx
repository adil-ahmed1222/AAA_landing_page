"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function useParticleCount() {
  const [count, setCount] = useState(20)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCount(8)
      else if (w < 1024) setCount(12)
      else setCount(20)
    }
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])

  return count
}

export function HeroParticles() {
  const count = useParticleCount()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-400/50"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${8 + ((i * 19) % 84)}%`,
            top: `${6 + ((i * 27) % 88)}%`,
          }}
          animate={{
            opacity: [0.15, 0.7, 0.15],
            y: [0, -20 - (i % 5) * 8, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * 10, 0],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="hero-light-streak absolute top-1/4 left-1/4 h-px w-1/3 rotate-12 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="hero-light-streak absolute top-1/2 right-1/4 h-px w-1/4 -rotate-6 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
    </div>
  )
}
