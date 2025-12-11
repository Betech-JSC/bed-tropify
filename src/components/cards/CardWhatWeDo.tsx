import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Arrow from "../icons/Arrow";

type WhatWeDoItem = {
  image?: {
    url: string;
    alt?: string;
  };
  title?: string;
  description?: string;
};

interface CardWhatWeDoProps {
  item: WhatWeDoItem;
  onHeightChange?: (height: number) => void;
  forcedHeight?: number;
}

export function CardWhatWeDo({
  item,
  onHeightChange,
  forcedHeight,
}: CardWhatWeDoProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Report height changes so parent can sync heights across cards
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !onHeightChange) return;

    const reportHeight = () => onHeightChange(el.offsetHeight);
    reportHeight();

    const resizeObserver = new ResizeObserver(reportHeight);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [onHeightChange]);

  return (
    <article
      ref={cardRef}
      className="w-full rounded-3xl border border-brown/30 overflow-hidden group lg:hover:bg-white"
    >
      {item.image?.url && (
        <div className="relative w-full h-full aspect-w-7 aspect-h-5 overflow-hidden">
          <Image
            src={item.image.url}
            alt={item.image?.alt || item.title || "What we do image"}
            className="w-full h-full object-cover"
            fill
          />
        </div>
      )}
      <div className="px-4 py-6 flex flex-col justify-between space-y-6 h-[324px]">
        <div className="space-y-6">
          <h3 className="headline-3 font-bold text-brown line-clamp-2 uppercase">
            {item.title}
          </h3>
          <p className="body-1 text-gray-800 line-clamp-[7]">
            {item.description}
          </p>
        </div>
        <button className="size-11 rounded-full flex items-center justify-center bg-olive text-white lg:group-hover:bg-orange duration-300 ease-in-out cursor-pointer">
          <Arrow />
        </button>
      </div>
    </article>
  );
}
