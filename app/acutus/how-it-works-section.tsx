const STEPS = [
  "Order Input",
  "Processing & Validation",
  "Lens Customisation",
  "Production",
  "Delivery",
] as const

/** Section field — light gray */
const BG = "#D1D1D1"
/** Thin rules between steps — dark gray */
const RULE = "rgba(0,0,0,0.35)"

export default function AcutusHowItWorksSection() {
  return (
    <section
      className="flex min-h-screen w-full flex-col justify-center text-black"
      style={{ backgroundColor: BG }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-[120px] lg:py-24 xl:py-28">
        <div className="mx-auto grid w-full max-w-[min(100%,75rem)] grid-cols-1 items-start gap-12 sm:gap-14 md:gap-16 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:gap-y-0 xl:max-w-[80rem] xl:gap-x- 2xl:gap-x-32">
          {/* Left — serif tagline, bold caps headline, body + red dot (uniform stack gaps) */}
          <div className="flex w-full flex-col items-start gap-5 sm:gap-6 md:gap-6">
            <p
              className="text-[12px] font-normal leading-[1.65] tracking-[0.01em] text-black sm:text-[13px] md:text-[14px] lg:text-[15px]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              From Prescription to Patient Seamlessly.
            </p>
            <h2
              id="how-it-works-heading"
              className="font-inter text-[clamp(1.875rem,5.8vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.028em] text-black md:text-[clamp(2.125rem,4.5vw,3.5rem)] lg:text-[clamp(2.5rem,3.6vw,3.75rem)]"
            >
              How It Works
            </h2>
            <p className="max-w-[min(100%,28rem)] font-inter text-[14px] font-normal leading-[1.5] text-black sm:max-w-[30rem] sm:text-[15px] md:text-[16px] lg:max-w-[32rem] lg:leading-[1.52]">
              Our end-to-end workflow is engineered to minimize friction, reduce error, and ensure
              every lens meets the highest standards before it reaches your practice.

            </p>
          </div>

          {/* Right — five rows: label + fixed white square; rules span full row width (top + 5× bottom = 6 lines) */}
          <div className="w-[60%]">
            <div
              className="w-full "
              style={{ backgroundColor: BG, borderColor: RULE }}
            >
              {STEPS.map((label) => (
                <div
                  key={label}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 border-b py-3 sm:gap-x-6 sm:py-4 md:gap-x-8 md:py-2 lg:pt-5"
                  style={{
                    backgroundColor: BG,
                    borderColor: RULE,
                  }}
                >
                  <p className="min-w-0 font-inter text-[15px] font-normal leading-[1.35] text-black sm:text-[16px] md:text-[17px] lg:text-[18px]">
                    {label}
                  </p>
                  {/* Segmented white square — same size every row, sharp corners */}
                  <div
                    className="size-9 shrink-0 rounded-none bg-white sm:size-10 md:size-11"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
