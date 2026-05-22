import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

 export function Solutions  () {
  return (

     
            <section className="w-full bg-[#F3F3F3] px-6 py-16 sm:px-10 md:px-16 md:py-24 lg:px-24 lg:py-32">   
                
   
                   {/* Main Container - 2x2 Grid */}
                <div className="grid grid-cols-1 gap-px border border-[#D1D1D1] bg-[#F3F3F3] md:grid-cols-2">

                    {/* Top Left: Text */}
                    <div className="order-1 flex min-h-[60vh]  flex-col 2xl:ml-18 bg-[#F3F3F3] p-10 md:p-16 lg:min-h-[75vh] lg:p-24 lg:pt-32">
                           <div className="flex max-w-[480px] gap-5">
                               {/* Vertical black accent line */}
  <div className="w-[1px] shrink-0 self-stretch bg-black ml-0 lg:ml-[-22px] lg:mr-4 2xl:ml-0" />                               <div className="flex-1 ">
                                   <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-black/50">
                                        Solutions for partners
                                   </p>
                                   <h2 className="mb-8 text-[24px] font-bold leading-[1.3] text-black md:text-[28px]">
                                        STREAMLINED<br /> WORKFLOWS
                                   </h2>
                                   <p className="text-[18px] mb-12 leading-[1.7] text-black md:text-[20px] lg:pr-8 2xl:pr-0">
                                        We provide partners with End to End Solutions and Custom Lenses that meet different and wide ranges of Use-Cases, Taste, and style.
                                   </p>
                                 <button
                            className="group cursor-pointer inline-flex w-fit items-center gap-3 text-sm font-medium text-black transition-colors hover:text-black/80 sm:text-base lg:text-[16px]"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                            <span>Become a Partner</span>
                        </button>
                               </div>
                           </div>
                       </div>
   
                       {/* Top Right: Image */}
                       <div className="relative order-2 min-h-[60vh] bg-[#F3F3F3] lg:min-h-[75vh]">
                           <Image
                               src="/workflow.png"
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
                               <div className="w-[1px] shrink-0 self-stretch lg:mr-4 bg-black" />
                                   <div className="flex-1">
                                   <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.2em] text-black/50">
                                        A connected system
                                   </p>
                                   <h2 className="mb-8 text-[24px] font-bold leading-[1.3] text-black md:text-[28px]">
                                        SCALE WITHOUT <br/> LOSING CONSISTENCY

                                   </h2>
                                   <p className="text-[18px] mb-12 leading-[1.7] text-black md:text-[20px]">
We operate as an integrated system for partners to creates a stable foundation for growth, operational clarity, and a more consistent experience across every touch-point.                                   </p>
                                 <button
                            className="group cursor-pointer inline-flex w-fit items-center gap-3 text-sm font-medium text-black transition-colors hover:text-black/80 sm:text-base lg:text-[16px]"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center border border-black/30 transition-all group-hover:border-black group-hover:bg-black group-hover:text-white">
                                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            </span>
                            <span>Learn More</span>
                        </button>
                               </div>
                           </div>
                       </div>
   
                   </div>
               </section>
  )
}

export default Solutions;