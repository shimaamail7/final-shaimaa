"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function DifferencePartnerWrapper({
  difference,
  partner,
}: {
  difference: React.ReactNode
  partner: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const differenceRef = useRef<HTMLDivElement>(null)
  const partnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (!containerRef.current || !partnerRef.current) return

      // Set initial state for Partner section to be off-screen at the bottom
      gsap.set(partnerRef.current, { yPercent: 100 })

      // Create a timeline that pins the container and animates the Partner section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Determines how long the pin/animation lasts
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
        }
      })

      // 1. Animate Partner section up to cover the Difference section
      tl.to(partnerRef.current, {
        yPercent: 0,
        ease: "none",
        duration: 1
      })

      // 2. Add an empty tween to keep it pinned ("stick") for a bit
      tl.to({}, { duration: 0.5 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative w-full bg-transparent ">
      {/* Difference Section - Stays in place */}
      <div ref={differenceRef} className="w-full">
        {difference}
      </div>

      {/* Partner Section - Animates over */}
      <div
        ref={partnerRef}
        className="absolute top-0 left-0 right-0 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        {partner}
      </div>
    </div>
  )
}
