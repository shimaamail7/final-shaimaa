import StackedCards from '@/components/StackedCards';

export default function StackedCardsDemoPage() {
  return (
    <main className="bg-[#0B0F16] text-white min-h-[300vh]">
      <div className="relative">
        {/* Pin this section so the StackedCards seamlessly overlay it as you scroll down */}
        <div className="h-screen flex items-center justify-center flex-col text-center px-4 sticky top-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Scroll to Begin</h1>
          <p className="text-xl text-neutral-400 max-w-lg mx-auto">
            The following section is a pinned, scroll-controlled stacking component driven by GSAP and Lenis.
          </p>
        </div>

        <div className="relative z-10">
          <StackedCards />
        </div>
      </div>

      {/* Some spacing after */}
      <div className="h-screen flex items-center justify-center flex-col text-center px-4 bg-[#0B0F16]">
        <h2 className="text-4xl font-bold mb-4">End of Sequence</h2>
        <p className="text-neutral-500">Normal scrolling resumes.</p>
      </div>
    </main>
  );
}
