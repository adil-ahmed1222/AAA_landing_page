"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface Testimonial {
  quote: string
  name: string
  designation: string
  src: string
}

interface Colors {
  name?: string
  designation?: string
  testimony?: string
}

interface FontSizes {
  name?: string
  designation?: string
  quote?: string
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[]
  activeIndex: number
  colors?: Colors
  fontSizes?: FontSizes
  className?: string
}

const revealEase = [0.22, 1, 0.36, 1] as const

function calculateGap(width: number) {
  const minWidth = 1024
  const maxWidth = 1456
  const minGap = 60
  const maxGap = 86

  if (width <= minWidth) return minGap
  if (width >= maxWidth) {
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth))
  }

  return minGap + ((maxGap - minGap) * (width - minWidth)) / (maxWidth - minWidth)
}

export function CircularTestimonials({
  testimonials,
  activeIndex,
  colors = {},
  fontSizes = {},
  className,
}: CircularTestimonialsProps) {
  const colorName = colors.name ?? "#FFFFFF"
  const colorDesignation = colors.designation ?? "#FDBA74"
  const colorTestimony = colors.testimony ?? "#D1D5DB"

  const fontSizeName = fontSizes.name ?? "clamp(2rem, 4vw, 3rem)"
  const fontSizeDesignation = fontSizes.designation ?? "1rem"
  const fontSizeQuote = fontSizes.quote ?? "1.15rem"

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(1200)

  const testimonialsLength = testimonials.length
  const safeIndex =
    testimonialsLength > 0
      ? Math.min(Math.max(activeIndex, 0), testimonialsLength - 1)
      : 0

  const activeTestimonial = useMemo(
    () => testimonials[safeIndex],
    [safeIndex, testimonials]
  )

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function getImageStyle(index: number): CSSProperties {
    const gap = calculateGap(containerWidth)
    const maxStickUp = gap * 0.8
    const isActive = index === safeIndex
    const isLeft =
      (safeIndex - 1 + testimonialsLength) % testimonialsLength === index
    const isRight = (safeIndex + 1) % testimonialsLength === index

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: "translate3d(0, 0, 0) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }
    }

    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.55,
        pointerEvents: "none",
        transform: `translate3d(-${gap}px, -${maxStickUp}px, 0) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }
    }

    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.55,
        pointerEvents: "none",
        transform: `translate3d(${gap}px, -${maxStickUp}px, 0) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }
    }

    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: "translate3d(0, 0, 0) scale(0.95) rotateY(10deg)",
      transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
    }
  }

  const panelVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      y: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      y: -30,
    },
  }

  if (!activeTestimonial) return null

  return (
    <div className={cn("circular-testimonials w-full max-w-6xl px-4", className)}>
      <div className="circular-testimonials-grid grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div
          ref={imageContainerRef}
          className="circular-testimonials-images relative order-1 h-64 w-full will-change-transform md:h-96"
        >
          {testimonials.map((testimonial, index) => (
            <img
              key={`${testimonial.src}-${index}`}
              src={testimonial.src}
              alt={testimonial.name}
              className="circular-testimonial-image absolute inset-0 h-full w-full object-cover"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        <div className="circular-testimonials-content order-2 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: revealEase }}
            >
              <motion.h3
                className="mb-2 font-black tracking-tight"
                style={{ color: colorName, fontSize: fontSizeName }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: revealEase }}
              >
                {activeTestimonial.name}
              </motion.h3>

              <motion.p
                className="mb-8 font-medium uppercase"
                style={{
                  color: colorDesignation,
                  fontSize: fontSizeDesignation,
                }}
                initial={{ opacity: 0, letterSpacing: "0.28em" }}
                animate={{ opacity: 1, letterSpacing: "0.12em" }}
                transition={{ duration: 0.8, ease: revealEase, delay: 0.08 }}
              >
                {activeTestimonial.designation}
              </motion.p>

              <motion.p
                className="max-w-[600px] leading-[1.9]"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={`${word}-${wordIndex}`}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: 0.12 + wordIndex * 0.04,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CircularTestimonials
