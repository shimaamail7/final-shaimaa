import Image from "next/image"

export function DifferenceSection() {
  return (
    <section className="relative   flex min-h-[554px] h-screen w-full items-center justify-center bg-black px-4 py-20 sm:px-6 md:px-8 text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/difference-bg.jpg"
          alt="Athlete wearing high-performance sports eyewear"
          fill
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Exact Figma overlay: #00000096 */}
        <div className="absolute inset-0 bg-[#00000096]" />
      </div>

      {/* Text Content */}
      <div className="relative z-10 mx-auto w-full max-w-[90vw] sm:max-w-4xl lg:max-w-5xl">
        <h2
          className="relative z-10 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-bold leading-[98%] tracking-[-0.03em] text-white uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          FOR THOSE WHO SEE
          <br />
          THE DIFFERENCE
        </h2>
      </div>
    </section>
  )
}
