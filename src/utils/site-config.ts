import type { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";
const baseUrl = "https://bed-tropify.onrender.com";


export const siteConfig = {
  title: {
    vi: "Tropify Asia - Southeast Asia simplified sourcing and trading.",
    en: "Tropify Asia - Southeast Asia simplified sourcing and trading.",
  },
  description: {
    vi: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
    en: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
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
        vi: "Trang chủ - Tropify Asia - Southeast Asia simplified sourcing and trading.",
        en: "Home - Tropify Asia - Southeast Asia simplified sourcing and trading.",
      },
      description: {
        vi: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
        en: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
      },
    },
    about: {
      title: {
        vi: "Giới thiệu - Tropify Asia - Southeast Asia simplified sourcing and trading.",
        en: "About - Tropify Asia - Southeast Asia simplified sourcing and trading.",
      },
      description: {
        vi: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
        en: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
      },
    },
  },
};
