"use client"

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, ArrowRight, LayoutGrid, LineChart, Eye, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

import { cn } from "@/lib/utils";
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/terms", label: "Terms" },
]

const faqs = [
    {
        question: "What makes Optika lenses different?",
        answer:
            "Optika lenses are manufactured in the Czech Republic using cutting-edge digital technology and tested to the highest industry standards. Every lens is customized to meet the specific needs of the wearer, ensuring unmatched visual clarity and comfort.",
    },
    {
        question: "How long does delivery take?",
        answer:
            "Most orders are delivered within 48 hours of production completion. We optimize every step of our workflow to ensure your lenses arrive on time and ready to perform.",
    },
    {
        question: "Can I customize my orders?",
        answer:
            "Yes. Our digital ordering system allows eye care professionals to customize every aspect of their lens orders. You control the specifications, and we handle the precision manufacturing.",
    },
    {
        question: "What quality standards do you follow?",
        answer:
            "Every lens meets global industry standards and passes through rigorous quality controls at every stage of production. We test what matters and deliver what works.",
    },
    {
        question: "Do you offer bulk ordering?",
        answer:
            "We serve eye care professionals of all sizes. Our system scales to your needs, whether you are ordering a few lenses or managing high-volume production.",
    },
    {
        question: "Reach out to our team for more information.",
        answer:
            "Our lenses combine Czech precision manufacturing with advanced digital technology. Each lens is customized to the wearer's exact specifications and tested rigorously before delivery. You get clarity that performs.",
    },
    {
        question: "What sets Optika apart?",
        answer:
            "We handle the ordering through a streamlined digital system designed for eye care professionals. You specify what you need, we manufacture with precision, and delivery happens within 48 hours. The process is built for efficiency.",
    },
    {
        question: "How does ordering work?",
        answer:
            "Every lens passes through strict quality controls at every production stage. We test what matters and only ship what meets our standards. Your patients will notice the difference immediately.",
    },
]
// Stack offsets for the fanned card effect
const VISIBLE_BEHIND = 2;
const STACK_OFFSETS = [
    { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
    { x: -15, y: -12, rotate: -4, scale: 0.95, opacity: 1 },
    { x: -28, y: -22, rotate: -8, scale: 0.9, opacity: 0.85 },
];
export const DEFAULT_CATEGORIES = [
    {
        id: "Exceptional",
        image: "/high2.jpg",
        imageAlt: "Exceptional performance",
        logoText: "Exceptional performance",
        logoSubscript: "",
        description: "Freeform digital surfacing, wavefront optimisation, and precise fitting parameters. To faster adaptation, sharper acuity, and reduced eye strain across distances.",
        fontClass: "font-bold tracking-tight",
    },
    {
        id: "High",
        image: "/test.jpg",
        imageAlt: "Woman wearing elegant cream framed eyeglasses",
        logoText: "High Standard Testing",
        logoSubscript: "",
        description: "Through the wavefront analysis, (MTF) evaluation, and wearer trials under real conditions. To validate optical quality, predictable performance, and enhanced wearer satisfaction across varied environments.",

        fontClass: "font-bold tracking-widest",
    },
    {
        id: "Customised solutions",
        image: "/about-optika2.jpg",
        imageAlt: "Customised solutions",
        logoText: "Customised solutions",

        description: "Tailored to various lifestyles, occupations, and visual behaviours. Through task-specific optimisations to increases comfort, efficiency, and visual accuracy, minimising head movements and postural strains.  ",
        fontClass: "font-light italic tracking-normal",
    },
]
export default function AboutPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [hasCompletedCarousel, setHasCompletedCarousel] = useState(false);
    const [cardsAnimated, setCardsAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const desktopScrollRef = useRef<HTMLDivElement>(null);
    const total = DEFAULT_CATEGORIES.length;
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        })
    }
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
        <div className="relative min-h-screen w-full bg-white">
            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/about-hero.jpg"
                    alt="Modern office interior with natural lighting"
                    fill
                    className="object-cover object-center"
                    priority
                />

                {/* Dark Overlay - strictly bg-black/60 as per design system requirements */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Top Navigation (Header) */}
                <header className="absolute top-0 left-0 right-0 z-20 w-full px-6 py-8 sm:px-10 md:px-16 lg:px-[120px]">
                    <div className="flex items-center justify-between">
                        {/* Logo / Brand Name */}
                        <Link href="/" className="text-[18px] font-semibold text-white transition-opacity hover:opacity-80">
                            Optika
                        </Link>

                        {/* Nav Links */}
                        <nav className="hidden items-center gap-8 md:flex lg:gap-12">
                            <Link href="/" className="text-[14px] font-normal text-white transition-opacity hover:opacity-80">Home</Link>
                            <Link href="/products" className="text-[14px] font-normal text-white transition-opacity hover:opacity-80">Products</Link>
                            <Link href="/terms" className="text-[14px] font-normal text-white transition-opacity hover:opacity-80">Terms</Link>
                            <Link href="/partners" className="text-[14px] font-normal text-white transition-opacity hover:opacity-80">/ For Partners</Link>
                        </nav>

                        {/* Mobile Menu Icon (Visible only on small screens) */}
                        <button className="text-white md:hidden" aria-label="Menu">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </header>

                {/* Hero Content */}
                <div className="relative z-10 flex h-full w-full  px-6 sm:px-10 md:px-16 lg:px-[120px] items-end pb-16">
                    <div className="w-full max-w-2xl">
                        {/* Eyebrow text */}
                        <p className="mb-4 text-[13px] font-normal tracking-wide text-white/90 sm:mb-5 sm:text-[14px]">
                            Nice to meet you,
                        </p>

                        {/* Main Heading - Extra bold, all caps, tight line height */}
                        <h1 className="mb-6 font-sans text-[44px] font-extrabold uppercase leading-[98%] tracking-tight text-white  lg:text-[56px] 2xl:text-[64px]">
                            EXCEPTIONAL<br />
                            OPTICAL<br />
                            SOLUTIONS
                        </h1>

                        {/* Description */}
                        <p className="mb-6 text-[14px] font-normal leading-[1.6] text-white/90 sm:text-[15px] md:text-[16px]">
                            Welcome to Optika,<br />
                            Let us walk you through a little about us.
                        </p>

                        {/* CTA / Scroll Arrow - Square white box with black stroke arrow */}
                        <button
                            onClick={scrollToContent}
                            className="group flex h-[32px] w-[32px] items-center justify-center bg-white transition-colors hover:bg-gray-200"
                            aria-label="Scroll down"
                        >
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-[2px]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2.5"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                            >
                                <path d="M12 4v16M19 13l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 2: BEHIND OPTIKA
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="w-full bg-[#F3F3F3] px-6 py-16 sm:px-10 md:px-16 md:py-24 lg:px-[120px] lg:py-32">

                {/* Header Section */}
                <div className="mb-12 flex items-center gap-6 md:mb-16 md:gap-10">
                    <h2 className="ml-0 lg:ml-10 whitespace-nowrap text-[32px] font-bold uppercase tracking-tight text-black md:ml-16 md:text-[40px] lg:ml-24">
                        BEHIND OPTIKA
                    </h2>
                    <div className="h-px flex-1 bg-[#D1D1D1]" />
                </div>

                {/* Main Container - 2x2 Grid */}
                <div className="grid grid-cols-1 gap-px border border-[#D1D1D1] bg-[#D1D1D1] md:grid-cols-2">

                    {/* Top Left: Text */}
                    <div className="order-1 flex min-h-[60vh] flex-col bg-[#F3F3F3] p-10 md:p-16 lg:min-h-[75vh] lg:p-24 lg:pt-32">
                        <div className="flex max-w-[480px] gap-5">
                            {/* Vertical black accent line */}
                            <div className="w-[1px] shrink-0 self-stretch bg-black" />
                            <div className="flex-1">
                                <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-black/50">
                                    About<br />Us
                                </p>
                                <p className="text-[18px] leading-[1.7] text-black md:text-[20px]">
                                    Optika is a Global Eyewear Solutions Provider and Distributor of Exclusive and advanced Digital Lenses, Eyecare products, and Premium solutions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Right: Image */}
                    <div className="relative order-2 min-h-[60vh] bg-[#F3F3F3] lg:min-h-[75vh]">
                        <Image
                            src="/about-optika.jpg"
                            alt="Three fashion models looking down at the camera wearing sunglasses against a blue sky"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Bottom Left: Image */}
                    <div className="relative order-4 min-h-[60vh] bg-[#F3F3F3] md:order-3 lg:min-h-[75vh]">
                        <Image
                            src="/about-optika2.jpg"
                            alt="Two models in white polo shirts wearing sunglasses against a white wall"
                            fill
                            className="object-cover" sizes="33vw"
                        />
                    </div>

                    {/* Bottom Right: Text */}
                    <div className="order-3 flex min-h-[60vh] flex-col bg-[#F3F3F3] p-10 md:order-4 md:p-16 lg:min-h-[75vh] lg:p-24 lg:pt-32">
                        <div className="flex max-w-[480px] gap-5">
                            {/* Vertical black accent line */}
                            <div className="w-[2px] shrink-0 self-stretch bg-black" />
                            <div className="flex-1">
                                <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-black/50">
                                    Ophthalmic<br />Technology<br />Provider
                                </p>
                                <p className="mb-6 text-[18px] leading-[1.7] text-black md:text-[20px]">
                                    Driven by ambition, innovation, Optika supplies eyewear to professionals, hospitals, and users.
                                </p>
                                <p className="text-[18px] leading-[1.7] text-black md:text-[20px]">
                                    We deliver variety of high-end lenses which are manufactured in the Czech Republic and tested according to industry best standards with strict quality controls.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>





            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 3: GENUINE ASPIRATION BANNER
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="w-full bg-black px-6 py-20 sm:px-10 sm:py-16 md:px-12 flex flex-col items-center justify-center md:py-20 lg:px-16 lg:py-32 2xl:py-50 ">
                <div className="mx-auto max-w-[900px] text-center ">
                    <h2 className="mb-4 text-[22px] font-bold uppercase leading-[1.1] tracking-tight text-white sm:mb-5 sm:text-[28px] md:text-[34px] lg:text-[40px] 2xl:my-10">
                        Genuine Aspiration Toward
                        <br />
                        Excellence
                    </h2>
                    <p className="mx-auto mb-10 max-w-[600px] text-[12px] leading-[1.7] text-white/80 sm:text-[13px] md:text-sm">
                        Optika positions itself with unwavering commitment to industry best practices. We deliver and manufacture what works and we prioritize performance.
                    </p>
                    <button
                        className="mx-auto  group cursor-pointer self-center flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-white/80 sm:text-base lg:text-[16px]"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center  border border-white/30 transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                        <span>Contact us</span>
                    </button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 4: THREE PRODUCT CARDS
      ═══════════════════════════════════════════════════════════════════════════ */}





            <section ref={sectionRef} className="w-full  min-h-screen">
                {/* ═══════════════════════════════════════════════════════════════
          DESKTOP: Full-screen height with scroll snap (hidden on mobile/tablet)
      ═══════════════════════════════════════════════════════════════ */}
                <div className="hidden h-[110vh] bg-[#f5f5f5] overflow-hidden  lg:block" >
                    <div
                        ref={desktopScrollRef}
                        className="h-full  scroll-smooth"
                    >
                        <div className="flex h-full snap-start items-stretch">
                            {DEFAULT_CATEGORIES.map((category, index) => (
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
                                    <div className="relative flex-1 h-[70vh] aspect-[3/4] ">
                                        <Image
                                            src={category.image}
                                            alt={category.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="33vw"
                                        />
                                    </div>

                                    {/* Content - fixed height at bottom */}
                                    <div className="flex flex-col items-center px-6 py-10 text-center h-full">
                                        <div className="h-12 w-auto relative mb-2">


                                            <h3 className="flex items-baseline">
                                                <span
                                                    className={cn(
                                                        "text-2xl    font-bold tracking-tight text-black xl:text-3xl"

                                                    )}
                                                >
                                                    {category.logoText}
                                                </span>

                                            </h3>

                                        </div>
                                        <p className="mt-1 text-sm text-black/60  max-w-[70%] text-center">
                                            {category.description}
                                        </p>

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
                                {DEFAULT_CATEGORIES.map((category, index) => (
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


                                                    <h3 className="flex items-baseline">
                                                        <span
                                                            className={cn(
                                                                "text-xl font-bold tracking-tight text-white"
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

                                                </div>
                                                <p className="mt-2 text-sm text-white/50">
                                                    {category.description}
                                                </p>

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
                                <div className="flex items-center mt-14 gap-8">
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

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 5: EVERYTHING YOU NEED TO SUCCEED
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="w-full-safe bg-white px-6 py-16 sm:py-20  md:py-24 lg:py-28">
                <div className="mx-auto xl:max-w-[1000px] 2xl:max-w-[1200px]  ">
                    {/* Section Header */}
                    <div className="mb-10 text-center sm:mb-12 lg:mb-16">
                        <h2 className="mb-3 text-[22px] font-bold uppercase tracking-tight text-black sm:text-[28px] md:text-[32px] lg:text-[36px]">
                            Everything You Need
                            <br />
                            To Succeed
                        </h2>
                        <p className="mx-auto max-w-[500px] text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                            Our integrated platform streamlines every aspect of lens ordering, production, and delivery.
                        </p>
                    </div>

                    {/* 3-Column Layout */}
                    <div className="flex  place-content-center flex-col lg:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10">
                        {/* Left Column */}
                        <div className="flex w-full lg:w-[35%] shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                            {/* Custom order */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                    <LayoutGrid className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Custom order</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Place detailed orders through our advanced digital system with complete customization options.
                                </p>
                            </div>

                            {/* Real-time tracking */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                    <Eye className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Real-time tracking</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Monitor your lens production at every stage from manufacturing through quality control.
                                </p>
                            </div>
                        </div>

                        {/* Center Video Section */}
                        <div className="order-first lg:order-none flex-1 min-h-[300px] aspect-video  w-full lg:w-[50%] bg-black">
                            {/* Video Placeholder */}
                        </div>

                        {/* Right Column */}
                        <div className="flex w-full lg:w-[35%] shrink-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                            {/* Production stages */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center">
                                    <LineChart className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Production stages</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Follow your lenses through each production phase with complete visibility and control.
                                </p>
                            </div>

                            {/* Delivery management */}
                            <div className="flex-1 border border-gray-200 p-6 sm:p-8 ">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center ">
                                    <Truck className="h-6 w-6 text-black" />
                                </div>
                                <h3 className="mb-2 text-[13px] font-bold text-black sm:text-sm">Delivery management</h3>
                                <p className="text-[11px] leading-[1.6] text-gray-500 sm:text-xs">
                                    Seamless delivery coordination ensures your lenses arrive on time and in perfect condition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 6: DESIGNED TO PERFORM
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden py-32 md:py-48">
                <Image
                    src="/tm.png"
                    alt="Office workers standing around table"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center sm:px-10">
                    <h2 className="text-[28px] font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-[36px] md:text-[48px] lg:text-[60px]">
                        DESIGNED TO PERFORM<br />WELL TODAY AND<br />REMAIN ADAPTABLE<br />TOMORROW.
                    </h2>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 7: FAQ
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="w-full bg-white px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24 lg:px-16">
                <div className="mx-auto max-w-[1100px]">
                    {/* Header */}
                    <div className="mb-10 sm:mb-12 lg:mb-14">
                        <h2 className="mb-2 text-[28px] font-bold tracking-tight text-black sm:text-[32px] md:text-[36px]">
                            FAQ
                        </h2>
                        <p className="text-[12px] text-gray-500 sm:text-[13px]">
                            Find answers to questions about our lenses and ordering process.
                        </p>
                    </div>

                    {/* Two-column grid */}
                    <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-10">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-t border-gray-200 pt-5">
                                <h3 className="mb-2 text-[12px] font-bold text-black sm:text-[13px]">
                                    {faq.question}
                                </h3>
                                <p className="text-[11px] leading-[1.7] text-gray-500 sm:text-xs">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 8: STILL HAVE QUESTIONS BANNER
      ═══════════════════════════════════════════════════════════════════════════ */}
            <section className="flex w-full h-[70vh] bg-white flex-col relative ">
                {/* ── Part 1: Banner with dark overlay ── */}
                <div className="relative w-full h-full mb-5 overflow-hidden" style={{ minHeight: "clamp(180px, 28vw, 340px)" }}>
                    {/* Background photo */}
                    <Image
                        src="/contact.jpg"
                        alt="Team members sitting around a table having a discussion"
                        fill
                        className="object-cover object-center"
                        priority={false}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Text content */}
                    <div className="relative z-10 flex h-full flex-col justify-end px-6 py-10 sm:px-10 md:px-16 lg:px-20 xl:px-24"
                        style={{ minHeight: "clamp(180px, 28vw, 340px)" }}>
                        <h2
                            className="text-balance font-bold text-white"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.25 }}
                        >
                            Still have questions?
                        </h2>
                        <p
                            className="mt-2 text-white/80"
                            style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9375rem)" }}
                        >
                            Questions about lenses or ordering or even about us?
                        </p>
                    </div>
                </div>

                {/* ── Part 2: Two-column CTA row ── */}
                <div className="grid w-full grid-cols-1 sm:grid-cols-2  bg-white">
                    {/* Contact us */}
                    <div
                        className="flex flex-col justify-between px-6 py-10 sm:px-10 md:px-16 lg:px-20 xl:px-24"
                        style={{ borderRight: "1px solid #e5e7eb" }}
                    >
                        <div>
                            <h3
                                className="font-bold text-black"
                                style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                            >
                                Contact us
                            </h3>
                            <p
                                className="mt-3 leading-relaxed text-gray-500 max-w-md"
                                style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
                            >
                                Reach out straight to our mail and our teams will reach back right away
                            </p>
                        </div>

                        <button
                            className="mt-8 inline-flex w-fit items-center gap-3 bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                            style={{ minWidth: "160px" }}
                        >
                            Contact us
                            <ArrowRight className="h-4 w-4 flex-shrink-0" />
                        </button>
                    </div>

                    {/* Enquiry form */}
                    <div className="flex flex-col justify-between px-6 py-10 sm:px-10 md:px-16 lg:px-20 xl:px-24">
                        <div>
                            <h3
                                className="font-bold text-black"
                                style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)" }}
                            >
                                Enquiry from
                            </h3>
                            <p
                                className="mt-3 leading-relaxed text-gray-500"
                                style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)" }}
                            >
                                Fill out our enquiry and select from our pre defined categories and specify your requirements, so we deliver faster, more precise response to your Enquiry.
                            </p>
                        </div>

                        <button
                            className="mt-8 inline-flex w-fit items-center gap-3 bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                            style={{ minWidth: "160px" }}
                        >
                            Fill Form
                            <ArrowRight className="h-4 w-4 flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════════════
          SECTION 9: CONTACT US / ENQUIRY FORM
      ═══════════════════════════════════════════════════════════════════════════ */}

            <Footer />

        </div>
    )
}
