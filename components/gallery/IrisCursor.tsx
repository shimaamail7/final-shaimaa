'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface IrisCursorProps {
  className?: string;
}

export const IrisCursor = ({ className }: IrisCursorProps) => {
  const [isTouch, setIsTouch] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) {
      setIsTouch(true);
    }
  }, []);

  useGSAP(() => {
    if (isTouch) return;

    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;
    let irisX = 0, irisY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      posX += (mouseX - posX) * 0.22;
      posY += (mouseY - posY) * 0.22;
      gsap.set(cursorRef.current, { x: posX, y: posY });

      const ix = mouseX - posX;
      const iy = mouseY - posY;
      const dist = Math.hypot(ix, iy);
      const s = dist > 8 ? 8 / dist : 1;

      irisX += (ix * s - irisX) * 0.3;
      irisY += (iy * s - irisY) * 0.3;
      gsap.set(ringRef.current, { x: irisX, y: irisY });
    };

    window.addEventListener('mousemove', onMove);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] w-10 h-10 -ml-5 -mt-5 pointer-events-none will-change-transform ${className}`}
    >
      <div className="w-full h-full border-2 border-white/90 rounded-full bg-black/40 grid place-items-center">
        <div ref={ringRef} className="w-[62%] h-[62%] grid place-items-center will-change-transform">
          <div ref={irisRef} className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 relative">
            <div className="absolute w-[38%] h-[38%] top-[28%] left-[30%] rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};
