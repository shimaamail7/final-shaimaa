"use client"

import { useEffect, useRef, useLayoutEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// SSR-safe useLayoutEffect
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Register ScrollTrigger plugin once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hook for creating GSAP animations with proper cleanup
 * Handles SSR compatibility and React strict mode
 */
export function useGSAP<T extends Element>(
  callback: (context: gsap.Context, element: T) => void | gsap.core.Timeline,
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null)
  const contextRef = useRef<gsap.Context | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return

    // Create a GSAP context for scoped animations and easy cleanup
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!, elementRef.current!)
    }, elementRef)

    return () => {
      // Revert all animations created in this context
      contextRef.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return elementRef
}

/**
 * Hook for scroll-triggered GSAP animations
 * Integrates with Lenis smooth scrolling
 */
export function useScrollAnimation<T extends Element>(
  callback: (element: T, scrollTrigger: typeof ScrollTrigger) => gsap.core.Tween | gsap.core.Timeline,
  options: {
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
    toggleActions?: string
  } = {},
  deps: React.DependencyList = []
) {
  const elementRef = useRef<T>(null)

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return

    // Refresh ScrollTrigger to account for Lenis
    ScrollTrigger.refresh()

    const animation = callback(elementRef.current, ScrollTrigger)

    return () => {
      animation?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return elementRef
}

/**
 * Hook for timeline-based GSAP animations
 * Returns a ref to attach to the container element
 */
export function useGSAPTimeline<T extends Element>(
  buildTimeline: (tl: gsap.core.Timeline, element: T) => void,
  options: gsap.TimelineVars = {},
  deps: React.DependencyList = []
): [RefObject<T | null>, gsap.core.Timeline | null] {
  const elementRef = useRef<T>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return

    // Create timeline with options
    const tl = gsap.timeline(options)
    timelineRef.current = tl

    // Build the timeline
    buildTimeline(tl, elementRef.current)

    return () => {
      tl.kill()
      timelineRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [elementRef, timelineRef.current]
}

/**
 * Utility to integrate GSAP with Lenis scroll
 * Call this in components that need scroll-based animations
 */
export function useLenisScrollTrigger(lenis: { raf: (time: number) => void } | null) {
  useIsomorphicLayoutEffect(() => {
    if (!lenis) return

    // Sync ScrollTrigger with Lenis
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          // ScrollTrigger is setting the scroll
          return
        }
        return window.scrollY
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

    // Update ScrollTrigger when Lenis scrolls
    ScrollTrigger.addEventListener("refresh", () => lenis.raf(performance.now()))
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.clearScrollMemory()
    }
  }, [lenis])
}
