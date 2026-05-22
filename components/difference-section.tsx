"use client"

import { useEffect, useRef } from "react"
import CinematicHero from "./cinematic-hero"

export function DifferenceSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoNode = videoRef.current
    if (!videoNode) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoNode.play().catch(() => {
              // Ignore play errors (e.g. autoplay blocked before interaction)
            })
          } else {
            videoNode.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(videoNode)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section id="difference" className="relative z-20 flex w-full h-screen items-center justify-center px-4 py-20 sm:px-6 md:px-8 text-center overflow-hidden bg-black" style={{ willChange: "transform" }}>
      <CinematicHero />
    </section>
  )
}