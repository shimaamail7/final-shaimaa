"use client"

import React from 'react'
import Image from 'next/image'
import Solutions from './Solutions'
import { SolutionsDetailSection } from './SolutionsDetailSection'

interface ContentBlock {
  id: string
  eyebrow: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  imageAlt: string
  imagePosition: 'left' | 'right'
}

const CONTENT: ContentBlock[] = [
  {
    id: 'about-us',
    eyebrow: 'About Us',
    title: '',
    description: "Optika is a Global Eyewear Solutions Provider and Distributor of Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium solutions.",
    ctaLabel: '',
    ctaHref: '#',
    imageSrc: '/about-hero.jpg', // Replace with actual assets from reference
    imageAlt: 'Group of models wearing premium eyewear',
    imagePosition: 'right'
  },
  {
    id: 'manufacturing',
    eyebrow: 'Manufacturing Technology & Standard',
    title: '',
    description: "Driven by ambition, innovation, Quality superior eyewear to unmatched, impeccable, and user. We deliver variety of high-end lenses which are manufactured in the Czech Republic and based according to industry leading standards with strict quality controls.",
    ctaLabel: '',
    ctaHref: '#',
    imageSrc: '/about-optika2.jpg', // Replace with actual assets from reference
    imageAlt: 'Models in white polo shirts wearing sunglasses',
    imagePosition: 'left'
  }
]

export default function BehindOptika() {
  return (
    <section className="w-full  bg-[#F3F3F3] px-6 py-16 md:py-24 lg:px-26 2xl:px-50 lg:py-32">
      {/* Header Section */}
      <div className="flex items-center gap-6 ">
        <h2 className="text-xl md:text-4xl font-bold uppercase tracking-tight text-black whitespace-nowrap">
          Behind Optika
        </h2>
        <div className="flex-1 h-px bg-black/20" />
      </div>

      {/* 2x2 Grid */}
      <Solutions content={CONTENT} />
    </section>
  )
}
