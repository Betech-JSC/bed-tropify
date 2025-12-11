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
  image?: {
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
        <div className="px-[75px] space-y-[100px]">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="headline-3 text-brown uppercase">Services</div>
              <div className="flex items-start gap-8">
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
              <button
                className="btn-custom-prev btn-pagination -left-16"
                aria-label="button-slider-prev"
              >
                <Chevron />
              </button>
              <button
                className="btn-custom-next btn-pagination -right-16 rotate-180"
                aria-label="button-slider-next"
              >
                <Chevron />
              </button>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".btn-custom-next",
                  prevEl: ".btn-custom-prev",
                }}
                spaceBetween={24}
                slidesPerView={3}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
              >
                {items.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <CardWhatWeDo item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="space-y-6">
            <div className="headline-3 text-brown uppercase">
              Other Services
            </div>
            <div className="space-y-8">
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
