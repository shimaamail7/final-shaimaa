"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const lensCategories = [
  {
    id: "acutus",
    image: "/acutus.jpg",
    imageAlt: "Happy couple wearing stylish sunglasses outdoors",
    logoText: "ACUTUS",
    logoSubscript: "®",
    description: "Optika Exclusive range of Lens",
    link: "/lenses/acutus",
  },
  {
    id: "single-vision",
    image: "/single-vision.jpg",
    imageAlt: "Woman wearing elegant cream framed eyeglasses",
    logoText: "SINGLE VISION",
    logoSubscript: "",
    description: "Innovative Single Vision Lenses",
    link: "/lenses/single-vision",
  },
  {
    id: "transitions",
    image: "/transition.jpg",
    imageAlt: "Stylish woman wearing pink tinted sunglasses",
    logoText: "Transitions",
    logo: "/Transitions.svg",
    logoSubscript: "®",
    description: "Light Innovative Technology Lenses",
    link: "/lenses/transitions",
    isItalic: true,
  },
];

// Stack offsets for the fanned card effect
const VISIBLE_BEHIND = 2;
const STACK_OFFSETS = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: -15, y: -12, rotate: -4, scale: 0.95, opacity: 1 },
  { x: -28, y: -22, rotate: -8, scale: 0.9, opacity: 0.85 },
];

export function LensCategoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [hasCompletedCarousel, setHasCompletedCarousel] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const total = lensCategories.length;

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === 0) return total - 1;
      return prev - 1;
    });
  }, [total]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === total - 1 ? 0 : prev + 1;
      // Mark carousel as completed when we've cycled through all cards
      if (next === 0 && prev === total - 1) {
        setHasCompletedCarousel(true);
      }
      return next;
    });
  }, [total]);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Trigger card animation after a short delay
          setTimeout(() => setCardsAnimated(true), 200);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle scroll locking on mobile/tablet until carousel is completed
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only apply scroll lock on mobile/tablet (< 1024px)
      if (window.innerWidth >= 1024) return;
      if (hasCompletedCarousel) return;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection =
        rect.top <= 100 && rect.bottom >= window.innerHeight / 2;

      if (isInSection && !hasCompletedCarousel) {
        e.preventDefault();
        // Navigate carousel based on scroll direction
        if (e.deltaY > 0) {
          goToNext();
        } else if (e.deltaY < 0) {
          goToPrevious();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [hasCompletedCarousel, goToNext, goToPrevious]);

  const getCardTransform = (index: number) => {
    let slot = (index - activeIndex + total) % total;
    const isActive = slot === 0;
    const slotBehind = slot <= VISIBLE_BEHIND ? slot : null;

    if (slotBehind === null) {
      return {
        transform: `translate(-50%, -50%) scale(0.85)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none" as const,
      };
    }

    const o = STACK_OFFSETS[slotBehind];
    return {
      transform: `translate(calc(-50% + ${o.x}px), calc(-50% + ${o.y}px)) scale(${o.scale}) rotate(${o.rotate}deg)`,
      opacity: o.opacity,
      zIndex: VISIBLE_BEHIND + 1 - slotBehind,
      pointerEvents: isActive ? ("auto" as const) : ("none" as const),
    };
  };

  return (
    <section ref={sectionRef} className="w-full min-h-screen ">
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP: Full-screen height with scroll snap (hidden on mobile/tablet)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden h-full lg:block">
        <div
          ref={desktopScrollRef}
          className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth"
        >
          <div className="flex h-screen snap-start items-stretch">
            {lensCategories.map((category, index) => (
              <div
                key={category.id}
                className={cn(
                  "relative flex flex-1 flex-col snap-center transition-all duration-700",
                  isInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image - takes most of the height */}
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>

                {/* Content - fixed height at bottom */}
                <div className="flex flex-col items-center bg-black px-6 py-10 text-center">
                  <div className="h-12 w-auto relative mb-2">
                    {category.logo ? (
                      <Image
                        src={category.logo}
                        alt={category.logoText}
                        width={120}
                        height={70}
                        className="h-14 -mt-2 w-auto object-contain brightness-0 invert"
                      />
                    ) : (
                      <h3 className="flex items-baseline">
                        <span
                          className={cn(
                            "text-2xl font-bold tracking-tight text-white xl:text-3xl",
                            category.isItalic && "italic",
                          )}
                        >
                          {category.logoText}
                        </span>
                        {category.logoSubscript && (
                          <span className="ml-0.5 text-sm text-white">
                            {category.logoSubscript}
                          </span>
                        )}
                      </h3>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/60">
                    {category.description}
                  </p>
                  <Link
                    href={category.link}
                    className="group mt-5 flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                  >
                    <span className="flex h-6 w-6 items-center bg-white text-black justify-center hover:bg-black hover:text-white border border-white/30 transition-colors group-hover:border-white/60">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    <span>View Lenses</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE & TABLET: Stacked card carousel on black background
      ═══════════════════════════════════════════════════════════════ */}
      <div className="block bg-black lg:hidden pt-16" >
        <div className="px-6 pb-20 pt-20 sm:px-10 sm:pb-20 sm:pt-24">
          <div className="mx-auto flex max-w-md flex-col items-center">
            {/* Stack container */}
            <div
              className={cn(
                "relative w-full transition-all duration-700",
                cardsAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0",
              )}
              style={{ height: "clamp(420px, 75vw, 520px)" }}
            >
              {lensCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
                  style={{
                    width: "min(90%, 320px)",
                    ...getCardTransform(index),
                  }}
                >
                  {/* Card with visible border on black background */}
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                    {/* Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: "4/5" }}
                    >
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, 320px"
                        priority={index === 0}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center bg-neutral-900 px-5 py-6 text-center">
                      <div className="h-10 w-auto relative mb-1">
                        {category.logo ? (
                          <Image
                            src={category.logo}
                            alt={category.logoText}
                            width={100}
                            height={70}
                            className="h-full w-auto object-contain brightness-0 invert"
                          />
                        ) : (
                          <h3 className="flex items-baseline">
                            <span
                              className={cn(
                                "text-xl font-bold tracking-tight text-white",
                                category.isItalic && "italic",
                              )}
                            >
                              {category.logoText}
                            </span>
                            {category.logoSubscript && (
                              <span className="ml-0.5 text-xs text-white">
                                {category.logoSubscript}
                              </span>
                            )}
                          </h3>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-white/50">
                        {category.description}
                      </p>
                      <Link
                        href={category.link}
                        className="group mt-4 flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                      >
                        <span className="flex h-6 w-6 items-center bg-white text-black justify-center hover:bg-black hover:text-white border border-white/30 transition-colors group-hover:border-white/60">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                        <span>View Lenses</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls - positioned below the cards with proper spacing */}
            <div
              className={cn(
                "mt-14 flex flex-col items-center gap-6 transition-all duration-700 delay-300",
                cardsAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0",
              )}
            >


              {/* Prev / Next buttons with counter */}
              <div className="flex items-center mt-10 gap-8">
                <button
                  onClick={goToPrevious}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white/50 transition-all hover:border-white/50 hover:text-white active:scale-95"
                  aria-label="Previous lens"
                >
                  <ChevronLeft className="h-5 w-5 text-white" strokeWidth={1.5} />
                </button>

                <span className="min-w-[60px] text-center text-sm font-medium tabular-nums text-white/40">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>

                <button
                  onClick={goToNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 text-white/50 transition-all hover:border-white/50 hover:text-white active:scale-95"
                  aria-label="Next lens"
                >
                  <ChevronRight className="h-5 w-5 text-white" strokeWidth={1.5} />
                </button>
              </div>

              {/* Scroll hint (shows until carousel is completed) */}
              {!hasCompletedCarousel && (
                <p className="mt-3 animate-pulse text-xs text-white/30">
                  Scroll to navigate through cards
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LensCategoriesSection
