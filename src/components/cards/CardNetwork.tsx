import Image from "next/image";
import Arrow from "../icons/Arrow";

interface CardNetworkProps {
  item: {
    image: {
      url: string;
      alt: string;
    };
    icon?: any;
    title?: string;
    description?: string;
  };
}

export function CardNetwork({ item }: CardNetworkProps) {
  return (
    <article className="relative w-full md:w-[259px] min-h-[250px] md:min-h-[334px] rounded-[20px] md:rounded-[32px] overflow-hidden group">
      <div className="absolute inset-0">
        <Image
          src={item.image?.url}
          alt={item.image?.alt || item.title || "image network"}
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-linear-olive"></div>
      <div className="absolute inset-0 w-full h-full px-3 pt-6 md:p-6 text-black bg-gray-100 lg:group-hover:bg-transparent lg:group-hover:text-white duration-300 ease-in-out flex flex-col justify-between">
        <div className="w-10 md:w-12 aspect-square">{item.icon}</div>
        <div className="mt-2 md:mt-6 flex flex-col justify-between h-full">
          <div className="w-full space-y-1">
            {item.title && (
              <h3 className="title-2 font-bold uppercase">{item.title}</h3>
            )}
            {item.description && <p className="body-1">{item.description}</p>}
          </div>
          <button className="size-11 rounded-full flex items-center justify-center bg-white text-olive lg:group-hover:opacity-100 opacity-0 duration-300 ease-in-out cursor-pointer">
            <Arrow />
          </button>
        </div>
      </div>
    </article>
  );
}
