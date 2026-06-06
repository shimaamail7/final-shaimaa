"use client"

import { useState, useEffect } from "react"

const slides = [
  {
    id: "smooth-optics",
    label: "SMOOTH OPTICS",
    description:
      "Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.",
    image: "/45.png"
  },
  {
    id: "custom-form",
    label: "CUSTOM FORM",
    description:
      "Custom form lenses tailored to your unique prescription requirements for optimal visual clarity.",
    image: "/45.png"
  },
  {
    id: "eye-view",
    label: "EYE VIEW",
    description:
      "Advanced eye view technology providing enhanced peripheral vision and a natural viewing experience.",
    image: "/45.png"
  },
  {
    id: "eye-power",
    label: "EYE POWER",
    description:
      "High-performance lenses designed for maximum power and precision in vision correction.",
    image: "/45.png"
  }
]

export function BuiltInTechnologies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-play slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [activeIndex])

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
      setIsTransitioning(false)
    }, 300)
  }

  const selectSlide = (index: number) => {
    if (index === activeIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveIndex(index)
      setIsTransitioning(false)
    }, 300)
  }

  const currentSlide = slides[activeIndex]

  return (
    <section className="w-full mx-auto  ">
      {/* Background radial accent to give premium feel */}


      {/* Slide Text Content */}
      <div className="flex-1 flex flex-col justify-center  max-w-4xl bg-[#111111] z-10 mx-auto  text-white py-20 md:py-28 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-44 flex flex-col justify-between overflow-hidden relative min-h-[480px] h-[480px]">
        <h2 className="text-4xl md:text-5xl font-bold font-inter tracking-tight text-white mb-2">
          Built-In Technologies
        </h2>
        <p className="text-lg md:text-xl font-playfair italic text-white/50 mb-8">
          From Prescription to Patient Seamlessly.
        </p>

        {/* Dynamic content area with fade animation */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {/* Label with decorative wave graphic */}
          <div className="relative inline-block mb-4 pt-2">
            {currentSlide.image && (
              <img
                src={currentSlide.image}
                alt={currentSlide.label}
                className=" w-[100px] h-[60px] object-contain  pointer-events-none filter brightness-200 "
              />
            )}

          </div>

          {/* Description */}
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg font-inter">
            {currentSlide.description}
          </p>
        </div>
      </div>

      {/* Pagination indicators at bottom */}
      <div className="mt-4 md:mt-10 mb-4 md:mb-10 flex items-center justify-center gap-3 z-10">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => selectSlide(idx)}
            className="group py-2  flex items-center focus:outline-black"
            aria-label={`Go to slide ${idx + 1}`}
          >
            {/* Horizontal line indicator */}
            <div
              className={`h-[2px] transition-all duration-500 rounded-full ${idx === activeIndex
                ? "w-16 bg-black"
                : "w-8 bg-black/20 group-hover:bg-black/40"
                }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
