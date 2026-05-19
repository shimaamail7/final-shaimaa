"use client"

export function PhilosophySection() {
  return (
    <section className="reel-stage bg-transparent">
      <div className="reel-stage-inner reel-stage-inner--split">
        <div aria-hidden className="min-h-0 md:min-h-dvh" />

        <div className="reel-stage-copy-intro reel-stage-copy-start max-w-lg">
          <p
            className="gs-scene-1-title text-gray-300 gs-dynamic-text mb-8 w-full font-playfair text-[20px] font-medium leading-[1.36] tracking-[0.11em]"
            style={{

              opacity: 0,
            }}
          >
            Welcome and
          </p>
          <h2
            className="gs-scene-1-title gs-dynamic-text mb-8 w-full font-inter text-[64px] font-bold uppercase leading-[0.98] tracking-[-0.04em] "
            style={{
              color: "#ffffff",
              opacity: 0,
            }}
          >
            We are optika
          </h2>

          <p
            className="gs-scene-1-p text-gray-300 gs-dynamic-text-light mb-16 max-w-[50ch] font-inter text-[20px] font-medium leading-[1.5] tracking-[0.02em] lg:pr-[84px]"
            style={{

              opacity: 0,
            }}
          >
            We delivers to you Premium Digital Lenses and Solutions manufactured
            to the highest standards.
          </p>
        </div>
      </div>

      <div className="reel-stage-scroll-hint gs-scene-1-scroll" style={{ opacity: 0 }}>
        <span className="gs-dynamic-text-light font-inter text-[10px] uppercase tracking-[0.25em] text-white">
          SCROLL NEXT
        </span>
      </div>
    </section>
  )
}
