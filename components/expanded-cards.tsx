"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface CardData {
    id: number
    number: string
    title: string
    subtitle: string
    description: string
    image: string
    color: string
    buttonText: string
}

const cardsData: CardData[] = [
    {
        id: 1,
        number: "01",
        title: "FAYZE Vision",
        subtitle: "See differently. / Live boldly.",
        description:
            'With Smooth Optics, there is a solution for the "eyear" effect that is often experienced with regular lenses in designs that are positioned very close to the face. Premium optics ensure unobstructed vision whether in busy streets, outdoor trails, or indoor corridors, adapt to your surroundings and ignite your perspective and greater confidence.',
        image: "/about-optika2.jpg",
        color: "bg-slate-700",
        buttonText: "Explore Collection",
    },
    {
        id: 2,
        number: "02",
        title: "Urban Style",
        subtitle: "Modern elegance. / Timeless design.",
        description:
            "Experience the perfect fusion of contemporary fashion and classic sophistication. Our urban collection features sleek silhouettes and bold statements that transition seamlessly from day to night, boardroom to boulevard.",
        image: "/images/fayze-hero.png",
        color: "bg-rose-600",
        buttonText: "Shop Now",
    },
    {
        id: 3,
        number: "03",
        title: "Sport Performance",
        subtitle: "Push limits. / Break boundaries.",
        description:
            "Engineered for athletes who demand excellence. Advanced ventilation systems, impact-resistant frames, and precision-fit technology ensure optimal performance during your most intense activities.",
        image: "/images/fayze-hero.png",
        color: "bg-amber-500",
        buttonText: "View Sports Line",
    },
    {
        id: 4,
        number: "04",
        title: "Eco Collection",
        subtitle: "Sustainable vision. / Conscious choice.",
        description:
            "Crafted from recycled ocean plastics and bio-based materials, our eco-friendly line proves that sustainability and style are not mutually exclusive. Every purchase contributes to marine conservation efforts.",
        image: "/images/fayze-hero.png",
        color: "bg-emerald-500",
        buttonText: "Go Green",
    },
]

export default function ExpandableCards() {
    const [activeCard, setActiveCard] = useState<number>(1)

    return (
        <section className="min-h-screen bg-black flex items-center justify-center p-4 md:p-6 lg:p-8">
            <div className="w-full max-w-[1400px] mx-auto">
                {/* Desktop Layout */}
                <div className="hidden md:flex h-[600px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px] gap-2">
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => setActiveCard(card.id)}
                            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-500 ease-in-out ${activeCard === card.id
                                ? "flex-[4]"
                                : "flex-[0.5] hover:flex-[0.6]"
                                }`}
                        >
                            {/* Collapsed State */}
                            <div
                                className={`absolute inset-0 ${card.color} transition-opacity duration-500 ${activeCard === card.id ? "opacity-0" : "opacity-100"
                                    }`}
                            >
                                <div className="h-full flex flex-col justify-between p-4 lg:p-6">
                                    <span className="text-white/80 font-light text-sm lg:text-base tracking-wider">
                                        {card.number}
                                    </span>
                                    <div className="flex items-center justify-center flex-1">
                                        <span
                                            className="text-white font-medium text-base lg:text-lg tracking-wide"
                                            style={{
                                                writingMode: "vertical-rl",
                                                textOrientation: "mixed",
                                                transform: "rotate(180deg)",
                                            }}
                                        >
                                            {card.title}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/30 flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-white/80 -rotate-45" />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded State */}
                            <div
                                className={`absolute inset-0 bg-slate-900 transition-opacity duration-500 ${activeCard === card.id ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <div className="h-full flex">
                                    {/* Left Content Panel */}
                                    <div className="w-[45%] h-full flex flex-col justify-between p-6 lg:p-8 xl:p-10 bg-slate-800/90">
                                        <div>
                                            <span className="text-white/60 font-light text-sm lg:text-base tracking-wider block mb-6 lg:mb-8">
                                                {card.number}
                                            </span>
                                            <div className="mb-4 lg:mb-6">
                                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-700 flex items-center justify-center mb-4 lg:mb-6">
                                                    <span className="text-white text-xs lg:text-sm font-medium">
                                                        FAYZE
                                                    </span>
                                                </div>
                                                <h3 className="text-white text-lg lg:text-xl xl:text-2xl font-semibold mb-2">
                                                    {card.title}
                                                </h3>
                                                <p className="text-white/60 text-xs lg:text-sm tracking-wide">
                                                    {card.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-white/70 text-xs lg:text-sm leading-relaxed mb-6 lg:mb-8">
                                                {card.description}
                                            </p>
                                            <button className="group flex items-center gap-2 text-white text-xs lg:text-sm font-medium hover:gap-3 transition-all duration-300">
                                                <span className="uppercase tracking-wider">
                                                    {card.buttonText}
                                                </span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Image Panel */}
                                    <div className="w-[55%] h-full relative">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                            priority={card.id === 1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tablet and Mobile Layout */}
                <div className="md:hidden flex flex-col gap-3">
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => setActiveCard(activeCard === card.id ? 0 : card.id)}
                            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-500 ease-in-out ${activeCard === card.id ? "h-[450px] sm:h-[500px]" : "h-[80px]"
                                }`}
                        >
                            {/* Collapsed State - Mobile */}
                            <div
                                className={`absolute inset-0 ${card.color} transition-opacity duration-500 ${activeCard === card.id ? "opacity-0" : "opacity-100"
                                    }`}
                            >
                                <div className="h-full flex items-center justify-between px-5">
                                    <div className="flex items-center gap-4">
                                        <span className="text-white/80 font-light text-sm tracking-wider">
                                            {card.number}
                                        </span>
                                        <span className="text-white font-medium text-base tracking-wide">
                                            {card.title}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                                        <ArrowRight
                                            className={`w-5 h-5 text-white/80 transition-transform duration-300 ${activeCard === card.id ? "rotate-90" : "rotate-0"
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded State - Mobile */}
                            <div
                                className={`absolute inset-0 bg-slate-900 transition-opacity duration-500 ${activeCard === card.id ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <div className="h-full flex flex-col">
                                    {/* Image Section */}
                                    <div className="h-[55%] relative">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                            priority={card.id === 1}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="text-white/80 font-light text-sm tracking-wider">
                                                {card.number}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="h-[45%] bg-slate-800/90 p-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                                                    <span className="text-white text-[10px] font-medium">
                                                        FAYZE
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-white text-base font-semibold">
                                                        {card.title}
                                                    </h3>
                                                    <p className="text-white/60 text-xs tracking-wide">
                                                        {card.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-white/70 text-xs leading-relaxed line-clamp-4">
                                                {card.description}
                                            </p>
                                        </div>
                                        <button className="group flex items-center gap-2 text-white text-xs font-medium hover:gap-3 transition-all duration-300 mt-3">
                                            <span className="uppercase tracking-wider">
                                                {card.buttonText}
                                            </span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
