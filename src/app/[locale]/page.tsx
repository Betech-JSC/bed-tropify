// import { useTranslations } from "next-intl";

import SectionHero from "@/components/home/SectionHero";
import SectionNetwork from "@/components/home/SectionNetwork";
import SectionWhatWeDo from "@/components/home/SectionWhatWeDo";
import SectionContact from "@/components/home/SectionContact";
import Database from "@/components/icons/Database";
import LocalExpert from "@/components/icons/LocalExpert";
import { routing } from "@/i18n/i18n-navigation";
import { HERO_SLIDERS, NETWORKS, WHAT_WE_DO, SERVICES, CONTACTS } from "@/lib/constants";
import SectionBooking from "@/components/home/SectionBooking";

// Generate static params for all locales
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default function Home() {
  // const t = useTranslations();

  const CARD_NETWORKS = [
    {
      icon: <Database />,
      title: "Database",
      description: "of local suppliers in Vietnam and Indonesia",
      image: {
        url: "/images/demo/image-network-1.jpg",
        alt: "image database",
      },
    },
    {
      icon: <LocalExpert />,
      title: "Local expert",
      description: "networks, associations",
      image: {
        url: "/images/demo/image-network-2.jpg",
        alt: "image local expert",
      },
    },
  ];

  return (
    <div>
      <SectionHero items={HERO_SLIDERS} />
      <SectionNetwork items={NETWORKS} cards={CARD_NETWORKS} />
      <SectionWhatWeDo items={WHAT_WE_DO} services={SERVICES} />
      <SectionBooking />
      <SectionContact items={CONTACTS} />
    </div>
  );
}
