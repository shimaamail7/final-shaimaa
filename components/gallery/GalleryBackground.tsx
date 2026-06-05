'use client';

interface Props {
  currentImage: string;
  nextImage: string;
  activeLayer: number;
}

export const GalleryBackground = ({ currentImage, nextImage, activeLayer }: Props) => {
  return (
    <div className="fixed inset-[-20%] z-0 pointer-events-none">
      <div
        style={{ backgroundImage: `url(${currentImage})`, opacity: activeLayer === 0 ? 0.55 : 0 }}
        className="absolute inset-0 bg-cover bg-center blur-[48px] saturate-125 transition-opacity duration-500"
      />
      <div
        style={{ backgroundImage: `url(${nextImage})`, opacity: activeLayer === 1 ? 0.55 : 0 }}
        className="absolute inset-0 bg-cover bg-center blur-[48px] saturate-125 transition-opacity duration-500"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/75 via-black/45 to-black/80 pointer-events-none" />
    </div>
  );
};
