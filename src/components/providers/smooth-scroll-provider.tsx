"use client"

import { ReactLenis, useLenis } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, type ReactNode } from "react"

gsap.registerPlugin(ScrollTrigger)

function AnchorScrollHandler() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('a[href^="#"]')
      if (!target) return

      const href = target.getAttribute("href")
      if (!href || href === "#") return

      const element = document.querySelector(href) as HTMLElement | null
      if (!element) return

      event.preventDefault()
      lenis.scrollTo(element, { offset: -88, duration: 1.2 })
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [lenis])

  return null
}

function LenisScrollTriggerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on("scroll", ScrollTrigger.update)

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    const onRefresh = () => {
      lenis.resize()
    }

    ScrollTrigger.addEventListener("refresh", onRefresh)
    ScrollTrigger.refresh()

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      ScrollTrigger.removeEventListener("refresh", onRefresh)
    }
  }, [lenis])

  return null
}

function LenisFramerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const onScroll = () => {
      window.dispatchEvent(new Event("scroll"))
    }

    lenis.on("scroll", onScroll)
    return () => lenis.off("scroll", onScroll)
  }, [lenis])

  return null
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        infinite: false,
        autoResize: true,
        syncTouch: true,
        lerp: 0.1,
      }}
    >
      <AnchorScrollHandler />
      <LenisScrollTriggerBridge />
      <LenisFramerBridge />
      {children}
    </ReactLenis>
  )
}
