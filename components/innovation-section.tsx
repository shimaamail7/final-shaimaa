"use client"

export function InnovationSection({ onComplete }: { onComplete?: () => void }) {
  return (
    <section
      id="innovation"
      className="relative flex min-h-screen items-start md:items-center justify-center"
      style={{ backgroundColor: "transparent" }}
    >
      {/* 
        Global background gradient handled gracefully in page.tsx 
      */}
      {/*
        Layout: model occupies the left ~55%, text block is right-aligned to the right ~45%.
        On mobile: stacked, text at top.
      */}
      <div className="relative  max-w-xl z-40 h-[95vh] md:min-h-auto ml-auto flex w-full flex-col items-center justify-between md:justify-center pt-[20vh] pb-10 md:px-3 px-10 md:w-1/2 md:items-end md:justify-center md:pt-0 md:pb-0 md:pr-16 lg:pr-24">
        <div>
          <p
            className="gs-scene-3-sub gs-dynamic-text-light mb-6 font-sans text-xs font-medium uppercase self-start tracking-widest md:text-sm"
            style={{
              color: "#e5e7eb",
              letterSpacing: "0.25em",
              textAlign: "left",
            }}
          >
            Innovation
          </p>
          <h2
            className="gs-scene-3-title gs-dynamic-text mb-4 font-sans text-6xl font-black uppercase tracking-tighter md:text-7xl lg:text-8xl"
            style={{
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
              textAlign: "right",
            }}
          >
            TIMELESS
          </h2></div>
        <div className="flex flex-col items-start md:items-end">

          {/* Sub-headline */}


          {/* Body */}
          <p
            className="gs-scene-3-p gs-dynamic-text-light mb-10 font-sans  text-sm leading-relaxed "
            style={{
              maxWidth: "40ch",
              color: "#9ca3af",
              lineHeight: 1.75,
              textAlign: "right",
            }}
          >
            Stand out in any crowd. Engineered for those who define the standard,
            never follow it — where optical precision meets iconic design heritage.
          </p>

          {/* CTA button — pill shaped, white bg, black text */}
          <button
            className="gs-scene-3-btn relative z-50 pointer-events-auto cursor-pointer group font-sans text-xs font-bold uppercase tracking-widest transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "9999px",
              padding: "14px 36px",
              letterSpacing: "0.15em",
              cursor: "pointer",
            }}
            onClick={() => {
              if (onComplete) {
                onComplete()
              }
            }}
          >
            Start Experience
          </button></div>
      </div>
    </section>
  )
}
