"use client"

import Image from "next/image"


export function PhilosophySection() {
  return (
    <section className="relative flex min-h-screen items-start md:items-center bg-transparent">
      {/* 
        The background gradient is now gracefully handled globally in page.tsx 
        to allow seamless crossfading between sections via GSAP.
      */}

      {/*
        Content panel — right half, z-20 so the 3D canvas (z-30) overlaps.
        Model occupies the left ~55% via 3D positioning.
      */}
      <div className="relative z-20 ml-auto flex w-full max-w-sm flex-col items-center justify-start pt-[25vh] px-8 pb-10 mr-10
      md:max-w-xl md:justify-center md:py-20 md:pt-20 md:px-12 lg:px-5">

        <p
          className="gs-scene-1-title gs-dynamic-text w-full font-sans text-xs font-medium uppercase tracking-widest mb-2 md:text-sm"
          style={{
            color: "#e5e7eb",
            letterSpacing: "0.25em",
            textAlign: "left",
            opacity: 0,
          }}
        >
          Philosophy
        </p>
        <h2
          className="gs-scene-1-title gs-dynamic-text mb-4 w-full font-sans text-6xl font-black uppercase tracking-tighter md:text-7xl lg:text-8xl"
          style={{
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 0.92,
            textAlign: "left",
            opacity: 0,
          }}
        >
          VISIONARY
        </h2>

        {/* Subtitle — below VISIONARY */}


        {/* Description */}
        <p
          className="gs-scene-1-p gs-dynamic-text-light mb-10 font-sans text-sm leading-relaxed"
          style={{
            maxWidth: "40ch",
            color: "#9ca3af",
            lineHeight: 1.75,
            textAlign: "center",
            opacity: 0,
          }}
        >
          Experience the pinnacle of optical engineering. Designed to
          provide unmatched clarity while making a bold statement.
        </p>
      </div>

      {/* SCROLL indicator — bottom center, just the word */}
      <div className="gs-scene-1-scroll absolute bottom-10 left-1/2 z-20 -translate-x-1/2" style={{ opacity: 0 }}>
        <span className="gs-dynamic-text-light font-sans text-[10px] uppercase tracking-[0.25em] text-white">
          SCROLL NEXT
        </span>
      </div>
    </section >
  )
}
