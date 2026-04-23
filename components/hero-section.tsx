import { ArrowDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  eyebrowText?: string;
  title?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function HeroSection({
  imageSrc = "/hero.jpg",
  imageAlt = "Premium optical lenses showcasing modern eyecare technology",
  imagePosition = "top",
  eyebrowText = "Exceptional Optical Solutions",
  title = (
    <>
      HIGH-END
      <br />
      LENSES
      <br />
      FOR MODERN
      <br />
      EYECARE
    </>
  ),
  description = "Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.",
  ctaText = "Learn More",
  ctaHref = "#about"
}: HeroSectionProps) {
  return (
    <section className=" relative min-h-screen w-full ">

      {/* Hero Image - Positioned absolutely to start under the 64px top navigation */}
      <div className="absolute top-0 min-h-screen inset-x-0 bottom-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          style={{ objectPosition: imagePosition }}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto flex min-h-screen max-w-[2560px] items-end ml-4   px-4   sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20" style={{ bottom: '15vh' }}>
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Spacer for image on large screens */}
          <div className="hidden lg:block" />

          {/* Text Content */}
          <div className="z-10 flex flex-col justify-center py-12 md:py-0 pl-0 lg:pl-20 lg:py-0">
            {/* Eyebrow text */}
            {eyebrowText && (
              <p
                className="mb-4 text-black/70 sm:mb-6 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.11em] leading-[135%] font-playfair font-normal"
              >
                {eyebrowText}
              </p>
            )}

            {/* Main Heading */}
            {title && (
              <h1
                className="mb-6 text-black sm:mb-8 relative z-10 text-[32px] sm:text-[40px] md:text-[40px] lg:text-[50px] xl:text-[56px] font-bold leading-[98%] tracking-[-0.03em]"
                style={{
                  fontFamily: "var(--font-inter)",
                }}
              >
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p
                className="mb-8 max-w-md text-black/70 sm:mb-10 md:max-w-lg lg:max-w-md xl:max-w-lg text-[13px] sm:text-sm lg:text-base leading-[150%] tracking-[0.02em]"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
              >
                {description}
              </p>
            )}

            {/* CTA Button */}
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-black transition-colors hover:text-gray-600 sm:text-base lg:text-[16px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center bg-black text-white transition-colors group-hover:bg-gray-800">
                  <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </span>
                <span>{ctaText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
