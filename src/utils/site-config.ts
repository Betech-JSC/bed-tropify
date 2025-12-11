import type { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";
const baseUrl = "https://project-thanhcao-frontend.vercel.app";


export const siteConfig = {
  title: {
    vi: "ThanhCao Portfolio - Frontend Developer",
    en: "ThanhCao Portfolio - Frontend Developer",    
  },
  description: {
    vi: "Cao Trung Thanh - Frontend Developer chuyên nghiệp tại Việt Nam. Xây dựng website hiện đại, hiệu suất cao sử dụng React, Vue, Next.js và Nuxt.js. Khám phá portfolio 2025 của tôi.",
    en: "Cao Trung Thanh - Professional Frontend Developer based in Vietnam. Building modern, high-performance websites using React, Vue, Next.js, and Nuxt.js. Explore my 2025 portfolio.",
  },
  siteName: "Portfolio",
  url: baseUrl || process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  baseUrl: baseUrl || process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  apiEndpoint: process.env.NEXT_PUBLIC_API_URL,
  defaultImage: "/cover.jpg",
  ogImage: "/cover.jpg",
  twitterHandle: "",
  defaultKeywords: [
    "ThanhCao Portfolio",
    "Thanh Cao Frontend Developer",
    "Cao Trung Thanh Developer",
    "Frontend Developer Vietnam",
    "Web Developer Portfolio 2025",
    "React Developer Portfolio",
    "Vue Developer Portfolio",
    "Freelance Web Developer",
    "Personal Portfolio Website",
    "Frontend Developer React / Vue",
  ],
  keywords: [],
  locales: ["en", "vi"],
  defaultLocale: "en",
  localePrefix,
  pages: {
    home: {
      title: {
        vi: "Trang chủ - Portfolio Cao Trung Thanh",
        en: "Home - Cao Trung Thanh Portfolio",
      },
      description: {
        vi: "Trang chủ portfolio của Cao Trung Thanh - Frontend Developer chuyên nghiệp. Khám phá các dự án, dịch vụ và kinh nghiệm phát triển web.",
        en: "Homepage of Cao Trung Thanh's portfolio - Professional Frontend Developer. Explore projects, services and web development experience.",
      },
    },
    about: {
      title: {
        vi: "Giới thiệu - Cao Trung Thanh",
        en: "About - Cao Trung Thanh",
      },
      description: {
        vi: "Tìm hiểu về Cao Trung Thanh - Frontend Developer với 4+ năm kinh nghiệm trong phát triển web hiện đại.",
        en: "Learn about Cao Trung Thanh - Frontend Developer with 4+ years of experience in modern web development.",
      },
    },
    demo: {
      title: {
        vi: "Demo - Cao Trung Thanh",
        en: "Demo - Cao Trung Thanh",
      },
      description: {
        vi: "Xem các demo và ví dụ về công nghệ mà Cao Trung Thanh sử dụng trong phát triển web.",
        en: "View demos and examples of technologies that Cao Trung Thanh uses in web development.",
      },
    },
  },
};
