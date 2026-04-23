import React from "react";
import CinematicHero from "@/components/cinematic-hero";

export const metadata = {
  title: "The Golden Hour | Chapter 01",
  description: "An immersive narrative experience.",
};

export default function GoldenHourPage() {
  return (
    <main className="w-full min-h-screen bg-[#D9C5B2] font-sans antialiased text-[#4A3B32]">
      <CinematicHero />
    </main>
  );
}
