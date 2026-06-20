"use client"

import "./career-section.css"

import { memo, useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { CAREER_PATHS, type CareerPath } from "@/lib/landing-data"
import {
  FadeUp,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "@/components/landing/motion"

const CARDS = CAREER_PATHS
const TOTAL_CARDS = CARDS.length
const SCROLL_HEIGHT_VH = TOTAL_CARDS * 100

const CARD_TRANSITION = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
}

const HOVER_TRANSITION = { duration: 0.35 }

const CareerCard = memo(function CareerCard({ data }: { data: CareerPath }) {
  return (
    <motion.article
      className="career-stack-card"
      whileHover={{ scale: 1.02, y: -8 }}
      transition={HOVER_TRANSITION}
    >
      <div className="career-stack-card-inner">
        <span className="career-stack-card-number">{data.number}</span>
        <h3 className="career-stack-card-title">{data.title}</h3>
        <div className="career-stack-card-tags">
          {data.tags.map((tag) => (
            <span key={tag} className="career-stack-card-tag">
              {tag}
            </span>
          ))}
        </div>
        <p className="career-stack-card-desc">{data.description}</p>
      </div>
    </motion.article>
  )
})

export function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      TOTAL_CARDS - 1,
      Math.floor(latest * TOTAL_CARDS),
    )
    setActiveIndex(index)
  })

  const safeIndex = Math.max(0, Math.min(activeIndex, TOTAL_CARDS - 1))

  return (
    <>
      <div id="careers" className="career-section-intro scroll-mt-28">
        <div className="career-section-bg" aria-hidden="true" />
        <FadeUp className="career-section-header mx-auto max-w-[900px] px-6 text-center md:px-10 lg:px-12">
          <SectionLabel>Career Paths</SectionLabel>
          <SectionTitle className="mx-auto text-center">
            WHERE THIS PROGRAM CAN TAKE YOU
          </SectionTitle>
          <SectionSubtitle className="mx-auto text-center text-white/70">
            Explore the career paths and opportunities you can unlock after
            mastering AI agents, automation, and intelligent systems.
          </SectionSubtitle>
        </FadeUp>
      </div>

      <section
        ref={sectionRef}
        className="career-scroll-section relative"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
        aria-label="Career path scroll showcase"
      >
        <div className="career-scroll-bg" aria-hidden="true" />

        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6">
          <div className="career-stack-glow" aria-hidden="true" />

          <div className="career-sticky-inner">
            <div
              className="relative flex h-[760px] w-full items-center justify-center overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              {CARDS.map((card, index) => (
                <motion.div
                  key={card.number}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: index === safeIndex ? 1 : 0,
                    scale: index === safeIndex ? 1 : 0.95,
                    y: index === safeIndex ? 0 : 50,
                    zIndex: index === safeIndex ? 1 : 0,
                    pointerEvents: index === safeIndex ? "auto" : "none",
                  }}
                  transition={CARD_TRANSITION}
                >
                  <CareerCard data={card} />
                </motion.div>
              ))}
            </div>

            <div className="career-stack-footer">
              <div className="career-stack-meta">
                <span className="career-stack-counter">
                  {String(safeIndex + 1).padStart(2, "0")}
                </span>
                <span className="career-stack-divider">/</span>
                <span className="career-stack-total">
                  {String(TOTAL_CARDS).padStart(2, "0")}
                </span>
              </div>

              <motion.p
                className="career-stack-hint"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Scroll to explore each path
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
