import Image from "next/image";
import Mail from "../icons/Mail";
import Phone from "../icons/Phone";
import FormAdvise from "../ui/form-advise";

type ContactItem = {
  title?: string;
  email?: string;
  phone?: string;
  note?: string;
};

type SectionWhatWeDoProps = {
  items: ContactItem[];
};

const SectionContact: React.FC<SectionWhatWeDoProps> = ({ items }) => {
  return (
    <section id="section-contact" className="relative">
      <div className="absolute inset-0">
        <Image
          src="/images/demo/image-contact.webp"
          alt="background contact"
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <div className="absolute inset-0 bg-linear-white w-full h-full"></div>
      <div className="relative pb-6 md:pb-[85px] pt-5 md:pt-[110px]">
        <div className="container">
          <div className="max-w-[904px] w-full mx-auto bg-white/70 rounded-xl overflow-hidden relative p-4 md:p-6 xl:p-8 flex md:flex-row flex-col items-start gap-6 md:gap-[120px]">
            <div className="max-w-[324px] w-full space-y-4 md:space-y-6 xl:space-y-8">
              <h2 className="display-2 font-bold text-brown">
                Contact Information
              </h2>
              {items.map((itemInfo, indexInfo) => (
                <div key={indexInfo} className="space-y-4">
                  <div className="title-2 font-bold text-gray-900 uppercase">
                    {itemInfo.title}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 body-1">
                      <Mail />
                      <span>
                        <a href={`mailto:${itemInfo.email}`} className="text-gray-700 lg:hover:text-olive duration-300 ease-in-out">
                          {itemInfo.email}
                        </a>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 body-1">
                      <Phone />
                      <span>
                        <a href={`tel:${itemInfo.phone}`} className="text-gray-700 lg:hover:text-olive duration-300 ease-in-out">{itemInfo.phone}</a>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 w-full">
                <FormAdvise />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionContact;
