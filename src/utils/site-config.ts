import type { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";
const baseUrl = null;


export const siteConfig = {
  title: {
    vi: "Tropify là một thương hiệu nông sản hữu cơ",
    en: "Tropify is an organic agricultural brand",    
  },
  description: {
    vi: "Tropify là một thương hiệu nông sản hữu cơ từ vùng Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, chuyển thẳng từ nông trại đến tay người tiêu dùng để đảm bảo chất lượng tốt nhất, với mục tiêu mang đến sự tươi mới và chất lượng vượt trội.",
    en: "Tropify is an organic agricultural brand from the Andalusia region of Spain, focused on providing fresh, sustainably grown fruits delivered straight from the farm to consumers to ensure the highest quality, with the goal of bringing exceptional freshness and superior quality.",
  },
  siteName: "Tropify",
  url: baseUrl || process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  baseUrl: baseUrl || process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  apiEndpoint: process.env.NEXT_PUBLIC_API_URL,
  defaultImage: "/cover.jpg",
  ogImage: "/cover.jpg",
  twitterHandle: "",
  defaultKeywords: [
    "Tropify",
    "Tropify is an organic agricultural",
    "Tropify organic"
  ],
  keywords: [],
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix,
  pages: {
    home: {
      title: {
        vi: "Trang chủ - Tropify",
        en: "Home - Tropify",
      },
      description: {
        vi: "Tropify là một thương hiệu nông sản hữu cơ từ vùng Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, chuyển thẳng từ nông trại đến tay người tiêu dùng để đảm bảo chất lượng tốt nhất, với mục tiêu mang đến sự tươi mới và chất lượng vượt trội.",
        en: "Tropify is an organic agricultural brand from the Andalusia region of Spain, focused on providing fresh, sustainably grown fruits delivered straight from the farm to consumers to ensure the highest quality, with the goal of bringing exceptional freshness and superior quality.",
      },
    },
    about: {
      title: {
        vi: "Giới thiệu - Tropify",
        en: "About - Tropify",
      },
      description: {
        vi: "Tropify là một thương hiệu nông sản hữu cơ từ vùng Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, chuyển thẳng từ nông trại đến tay người tiêu dùng để đảm bảo chất lượng tốt nhất, với mục tiêu mang đến sự tươi mới và chất lượng vượt trội.",
        en: "Tropify is an organic agricultural brand from the Andalusia region of Spain, focused on providing fresh, sustainably grown fruits delivered straight from the farm to consumers to ensure the highest quality, with the goal of bringing exceptional freshness and superior quality.",
      },
    },
    demo: {
      title: {
        vi: "Demo - Tropify",
        en: "Demo - Tropify",
      },
      description: {
        vi: "Tropify là một thương hiệu nông sản hữu cơ từ vùng Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, chuyển thẳng từ nông trại đến tay người tiêu dùng để đảm bảo chất lượng tốt nhất, với mục tiêu mang đến sự tươi mới và chất lượng vượt trội.",
        en: "Tropify is an organic agricultural brand from the Andalusia region of Spain, focused on providing fresh, sustainably grown fruits delivered straight from the farm to consumers to ensure the highest quality, with the goal of bringing exceptional freshness and superior quality.",
      },
    },
  },
};
