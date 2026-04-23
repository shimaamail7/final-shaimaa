"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });

// 121 frames for the narrative sequence
const FRAME_COUNT = 121;

export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const playheadRef = useRef({ frame: 0 });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Use a mix-blend-mode overlay for ambient bloom pulsating
  const bloomRef = useRef<HTMLDivElement>(null);

  // 1. Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();

      // Define your asset path here. Format: `/moments/00001.png`
      // We padstart with 5 zeros, e.g. 00001 to 00121
      const frameIndex = String(i + 1).padStart(5, "0");
      img.src = `/moments/${frameIndex}.png`;

      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      img.onerror = () => {
        // Note: If image is missing, we silently continue so the canvas can render a fallback color
        loadedCount++;
        setImagesLoaded(loadedCount);
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // 2. Canvas Rendering & GSAP
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Responsive Canvas Resizing & "Cover" Algorithm
    const renderFrame = () => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(playheadRef.current.frame))
      );
      const img = images[frameIndex];

      // Ensure canvas sharpness on high DPI screens (4K clarity)
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      const width = rect.width;
      const height = rect.height;

      // Ambient Fill: matches standard background
      ctx.fillStyle = "#D9C5B2";
      ctx.fillRect(0, 0, width, height);

      if (img && img.complete && img.naturalWidth > 0) {
        // Calculate Cover Fit
        const canvasRatio = width / height;
        const imgRatio = img.naturalWidth / img.naturalHeight;

        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          // Image is wider than canvas
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        } else {
          // Image is taller than canvas
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        }

        // Optional: apply slight warm tint or filter on canvas (done via CSS overlay below)
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      } else {
        // Fallback visualization if images are missing
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.font = "italic 16px serif";
        ctx.textAlign = "center";
        ctx.fillText(`Frame ${frameIndex} (Awaiting Image)`, width / 2, height / 2);
      }
    };

    // Initial render
    renderFrame();

    window.addEventListener("resize", renderFrame);

    // Context for cleanup
    let ctxGsap = gsap.context(() => {
      // Kinetic Sequence Timeline
      // Phase 1 (0-60): The Turn
      // Phase 2 (61-120): The Gaze
      const tl = gsap.timeline({


        yoyo: true // Allows a seamless, meditative loop lowering the book back
      });

      tl.to(playheadRef.current, {
        frame: FRAME_COUNT - 1,
        duration: 8,
        ease: "sine.inOut",
        onUpdate: renderFrame
      });

      // Fade in text from below after sequence completes
      tl.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
      );

      // Bloom Effect reflecting sunlight (plays once to match the timeline, no infinite repeating)
      tl.to(bloomRef.current, {
        opacity: 0.8,
        duration: 8,
        ease: "sine.inOut"
      }, 0); // Start immediately with the sequence
    }, containerRef);

    return () => {
      window.removeEventListener("resize", renderFrame);
      ctxGsap.revert();
    };
  }, [images]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#D9C5B2] select-none">

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />

      {/* The Ambient Bloom Effect (mix-blend: screen orange gradient) */}
      <div
        ref={bloomRef}
        className="absolute inset-0 pointer-events-none  opacity-40 transition-opacity"
        style={{
          background: "radial-gradient(circle at 65% 25%, rgba(255,160,50,0.6) 0%, rgba(230,120,20,0.1) 45%, transparent 75%)"
        }}
      />

      {/* Typography Overlay - Matching Design */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-end pointer-events-auto pl-8 md:pl-20 lg:pl-32 xl:pl-40 z-20 pb-20 opacity-0"
      >
        <p className={`text-[#D0BCA0] text-xs md:text-sm font-medium tracking-wide mb-2 ${playfair.className}`}>
          We do our best
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-2xl uppercase tracking-tight leading-[1.1] mb-5 font-sans">
          So you never<br />miss a moment
        </h1>

        <p className="text-[#E6E6E6] max-w-[280px] md:max-w-sm text-xs md:text-sm font-light mb-6 leading-[1.6] font-sans">
          Optika delivers to you Premium Digital<br />
          Lenses and Solutions manufactured to the<br />
          highest standards.
        </p>

        <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group cursor-pointer w-max">
          <span className="flex items-center justify-center w-7 h-7 border border-white/30 group-hover:border-white transition-colors text-[10px]">
            &#8595;
          </span>
          <span className="text-xs tracking-wide font-sans font-light">Learn More</span>
        </button>
      </div>

      {/* Loading Overlay */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#D9C5B2] transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: imagesLoaded === FRAME_COUNT ? 0 : 1 }}
      >
        <div className={`text-sm tracking-widest uppercase text-[#4A3B32]/60 animate-pulse ${playfair.className}`}>
          Immersing... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
        </div>
      </div>
    </div>
  );
}
