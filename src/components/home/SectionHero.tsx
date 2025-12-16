"use client";

import React, { useState } from "react";
import Image from "next/image";

type SliderItem = {
  image?: {
    url: string;
    alt?: string;
  };
  title?: string;
  description?: string;
};

type SectionHeroProps = {
  items: SliderItem[];
};

const SectionHero: React.FC<SectionHeroProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Lấy title và image hiện tại
  const currentTitle = items[activeIndex]?.description || "";
  const currentImage = items[activeIndex]?.image?.url || "/images/demo/image-hero-2.webp";
  const currentImageAlt = items[activeIndex]?.image?.alt || items[activeIndex]?.title || "Hero image";

  return (
    <section id="section-home" className="relative h-screen">
      <div className="relative w-full h-full">
        <Image
          src={currentImage}
          alt={currentImageAlt}
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-black/50"></div>

      <div className="absolute z-10 bottom-0 left-0 w-full md:p-6 pb-3">
        <div className="container">
          <div
            className="display-2 max-md:text-[26px] text-white font-bold md:mb-10 mb-6 xl:mb-16"
            dangerouslySetInnerHTML={{ __html: currentTitle }}
          ></div>

          <div className="flex md:flex-row flex-col gap-2 xl:gap-6 w-max relative max-md:mx-auto">
            <div className="absolute w-full h-px left-0 bottom-0 bg-white/20 md:block hidden"></div>
            {items.map((itemPaginate, idxPaginate) => (
              <button
                key={idxPaginate}
                onClick={() => goToSlide(idxPaginate)}
                className={`label-0 max-xl:text-[16px] max-md:text-[14px] font-medium uppercase pb-1 md:pb-3 border-b-2 cursor-pointer transition-all duration-300 ease-in-out ${
                  activeIndex === idxPaginate
                    ? "border-white text-white"
                    : "border-transparent text-white/60 lg:hover:text-white/80 duration-300 ease-in-out"
                }`}
              >
                {itemPaginate.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
