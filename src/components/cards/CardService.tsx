import Image from "next/image";
import Arrow from "../icons/Arrow";
import { scrollToContact } from "@/lib/scrollToSection";

interface ServiceCardProps {
  item: {
    image: {
      url: string;
      alt?: string;
    };
    title?: string;
    services?: string[];
  };
}

export function CardService({ item }: ServiceCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-4 xl:gap-8 items-start group">
      <div className="shrink-0 rounded-xl md:max-w-[180px] xl:max-w-[200px] w-full relative overflow-hidden">
        <div className="aspect-w-7 aspect-h-5">
          <Image
            src={item.image?.url}
            alt={item.image?.alt || item.title || "Service image"}
            className="w-full h-full object-cover lg:group-hover:scale-105 duration-300 ease-in-out"
            fill
          />
        </div>
      </div>
      <div className="flex flex-wrap flex-1 shrink gap-3 md:gap-4 xl:gap-8 items-start basis-0 min-w-60 max-md:max-w-full">
        <div className="display-3 font-bold text-brown md:max-w-[320px] xl:max-w-[420px] w-full">
          {item.title}
        </div>

        <ul className="flex-1 shrink body-1 text-gray-800 list-disc pl-2">
          {item.services &&
            item.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
        </ul>

        <button className="size-11 rounded-full flex items-center justify-center bg-olive text-white lg:group-hover:bg-orange duration-300 ease-in-out cursor-pointer" onClick={() => scrollToContact()}>
          <Arrow />
        </button>
      </div>
    </div>
  );
}
