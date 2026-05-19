"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const items = [
  {
    id: "refractive",
    title: "REFRACTIVE INDEXES",
    desc: "Tailored solutions for any vision",
    image: "/model1.png", // Using an existing image as placeholder
  },
  {
    id: "single-vision",
    title: "SINGLE VISION LENSES",
    desc: "Advanced technology for all visions",
    image: "/single-vision.jpg",
  },
  {
    id: "progressive",
    title: "PROGRESSIVE LENSES",
    desc: "A seamless transition at every distance",
    image: "/test.jpg",
  },
];

export default function DiscoverLensesSection() {
  const [activeItem, setActiveItem] = useState(items[0].id);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate all images based on active state
    items.forEach((item, index) => {
      const el = imageRefs.current[index];
      if (!el) return;

      if (item.id === activeItem) {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          zIndex: 10,
        });
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "power2.out",
          zIndex: 0,
        });
      }
    });
  }, [activeItem]);

  return (
    <section className="w-full flex flex-col md:flex-row min-h-screen bg-black">
      {/* Left side: Image */}
      <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen ">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="absolute inset-0 opacity-0"
            style={{
              opacity: index === 0 ? 1 : 0,
              transform: index === 0 ? "scale(1)" : "scale(1.05)"
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>

      {/* Right side: Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:pl-24 lg:pl-48 xl:pl-64 py-16 md:py-0">
        <div className="max-w-md">
          <div className="mb-12 font-inter">
            <p className="text-xs font-light text-gray-400">Optika</p>
            <p className="text-xs font-light text-gray-400">Standard Lenses</p>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight leading-[1.1] mb-16 text-white font-inter">
            DISCOVER<br />
            OPTIKA&apos;S WIDE<br />
            RANGE OF<br />
            LENSES
          </h2>

          <div className="flex flex-col gap-8">
            {items.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => setActiveItem(item.id)}
                  onMouseEnter={() => setActiveItem(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold text-sm transition-all duration-700 ease-out ${isActive
                        ? "text-[#38bdf8] translate-x-0 opacity-100"
                        : "text-transparent group-hover:text-gray-600 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                    >
                      &#8594;
                    </span>
                    <h3
                      className={`font-bold tracking-wider text-sm transition-all duration-700 ease-out font-inter ${isActive
                        ? "text-white translate-x-1"
                        : "text-gray-400 group-hover:text-gray-300 translate-x-0"
                        }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className={`text-xs ml-6 mt-1.5 font-inter transition-all duration-700 ease-out ${isActive
                      ? "text-[#38bdf8] translate-x-1"
                      : "text-gray-500 group-hover:text-gray-400 translate-x-0"
                      }`}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
