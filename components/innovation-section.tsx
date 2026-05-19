"use client"

export function InnovationSection({ onComplete }: { onComplete?: () => void }) {
  return (
    <section
      className="reel-stage flex min-h-dvh items-start md:items-center"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="reel-stage-inner reel-stage-inner--split w-full">
        <div aria-hidden className="min-h-0 md:min-h-dvh" />

        <div className="reel-stage-copy lg:ml-10 reel-stage-copy--start max-w-xl relative z-1000">
          <p
            className="gs-scene-3-sub text-gray-200  mb-8 font-playfair text-[20px] font-medium uppercase leading-[1.36] tracking-[0.11em]"
            style={{ color: "#d0c4b7" }}
          >
            Innovation
          </p>
          <h2
            className="gs-scene-3-title gs-dynamic-text mb-8 font-inter text-white text-[64px] font-bold uppercase leading-[0.98] tracking-[-0.04em]"
            style={{ color: "#ffffff" }}
          >
            TIMELESS
          </h2>
          <p
            className="gs-scene-3-p text-gray-200  mb-16 max-w-[40ch] font-inter text-[20px] font-medium leading-[1.5] tracking-[0.02em]"
            style={{ color: "#d0c4b7" }}
          >
            To stand out in any crowd. We Engineered our lenses for those who
            define standards, and users who demand nothing but excellence
          </p>
          <button
            type="button"
            className="gs-scene-3-btn w-full cursor-pointer relative z-50 pointer-events-auto font-inter text-[20px] font-normal uppercase leading-none tracking-normal transition-transform duration-200 hover:scale-105"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "none",
              padding: "16px 32px", cursor: "pointer"
            }}
            onClick={() => onComplete?.()}
          >
            Start Experience
          </button>
        </div>
      </div>
    </section>
  )
}
