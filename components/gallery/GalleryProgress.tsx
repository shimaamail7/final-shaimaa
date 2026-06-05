'use client';

interface Props {
  progress: number;
}

export const GalleryProgress = ({ progress }: Props) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[min(12rem,40vw)] h-0.5 bg-white/10 z-10 opacity-0 group-pinned:opacity-100 pointer-events-none overflow-hidden">
    <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${progress * 100}%` }} />
  </div>
);
