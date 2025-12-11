"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  return (
    <section id="section-home" className="relative h-screen">
      <Swiper
        modules={[Pagination]}
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        className="w-full h-full relative"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx} className="w-full h-full relative">
            {item.image?.url && (
              <Image
                src={item.image.url}
                alt={item.image.alt || item.title || "Slide image"}
                className="w-full h-full object-cover"
                fill
                priority={idx === 0}
              />
            )}
            <div className="absolute inset-0 w-full h-full bg-black/50" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute z-10 bottom-0 left-0 w-full p-6">
        <div className="container">
          <div className="flex gap-6 w-max relative">
            <div className="absolute w-full h-px left-0 bottom-0 bg-white/20"></div>
            {items.map((itemPaginate, idxPaginate) => (
              <button
                key={idxPaginate}
                onClick={() => goToSlide(idxPaginate)}
                className={`label-0 font-medium uppercase pb-3 border-b-2 cursor-pointer transition-all duration-300 ease-in-out ${
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
