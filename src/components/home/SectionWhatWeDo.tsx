"use client";

import React, { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Chevron from "../icons/Chevron";
import { CardWhatWeDo } from "../cards/CardWhatWeDo";
import { CardService } from "../cards/CardService";

type WhatWeDoItem = {
  image?: {
    url: string;
    alt?: string;
  };
  title?: string;
  description?: string;
};

type ServiceItem = {
  image: {
    url: string;
    alt?: string;
  };
  title?: string;
  services?: any;
};

type SectionWhatWeDoProps = {
  items: WhatWeDoItem[];
  services: ServiceItem[];
};

const SectionWhatWeDo: React.FC<SectionWhatWeDoProps> = ({
  items,
  services,
}) => {
  return (
    <section
      id="section-what-we-do"
      className="relative py-12 md:py-16 xl:py-[100px] bg-beige"
    >
      <div className="container">
        <div className="xl:px-[75px] md:space-y-20 space-y-16 xl:space-y-[100px]">
          <div className="md:space-y-6 space-y-4 xl:space-y-8">
            <div className="space-y-6">
              <div className="headline-3 text-brown uppercase">Services</div>
              <div className="flex md:flex-row flex-col items-start gap-4 md:gap-8">
                <div className="max-w-[480px] w-full">
                  <h2 className="display-2 font-bold text-brown">
                    Sourcing & tropical <br /> Commodies trading
                  </h2>
                </div>
                <div className="flex-1 w-full max-w-[490px] body-1 text-gray-800">
                  <p>
                    We research, vet, and select manufacturers or vendors that
                    meet your quality, price, and compliance requirements.
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Frozen tropical fruits</li>
                    <li>Coffee</li>
                    <li>Wooden Furniture</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".btn-custom-next",
                  prevEl: ".btn-custom-prev",
                }}
                spaceBetween={24}
                slidesPerView={3}
                loop={true}
                // autoplay={{
                //   delay: 4000,
                //   disableOnInteraction: false,
                // }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
              >
                {items.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <CardWhatWeDo item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                className="btn-custom-prev btn-pagination -left-3 md:-left-6 xl:-left-16"
                aria-label="button-slider-prev"
              >
                <Chevron />
              </button>
              <button
                className="btn-custom-next btn-pagination -right-3 md:-right-6 xl:-right-16 rotate-180"
                aria-label="button-slider-next"
              >
                <Chevron />
              </button>
            </div>
          </div>
          <div className="space-y-3 md:space-y-6">
            <div className="headline-3 text-brown uppercase">
              Other Services
            </div>
            <div className="md:space-y-6 space-y-8 xl:space-y-8">
              {services.map((itemService, indexService) => (
                <CardService key={indexService} item={itemService} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhatWeDo;
