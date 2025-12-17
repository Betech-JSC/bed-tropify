import { siteConfig } from '@/utils/site-config'

export function createDefaultSchemas(
  locale: string = "vi"
): Record<string, unknown>[] {
  const currentLocale =
    locale === "vi" || locale === "en" ? locale : "vi";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title[currentLocale],
    url: siteConfig.url,
    description: siteConfig.description[currentLocale],
    inLanguage: currentLocale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/${locale === "en" ? "en/search" : "vi/tim-kiem"}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.title[currentLocale],
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description[currentLocale],
    sameAs: [
      // "https://www.linkedin.com/in/trung-thanh-cao-30813b168"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "",
      email: "contact@tropify.asia",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: ["Vietnamese", "English"]
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // Update address
      addressLocality: "", // Update locality district
      addressRegion: "Ho Chi Minh City",
      addressCountry: "VN"
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tropify Asia",
    jobTitle: "Tropify Asia",
    description: siteConfig.description[currentLocale],
    url: siteConfig.url,
    image: `${siteConfig.url}/images/home/image-avatar.webp`,
    sameAs: [
      "https://www.linkedin.com/in/trung-thanh-cao-30813b168"
    ],
    email: "contact@tropify.asia",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "", // Update address
      addressLocality: "", // Update locality district
      addressRegion: "Ho Chi Minh City",
      addressCountry: "VN"
    },
    knowsAbout: [
      "Sourcing & Trading",
      "Operations & Financial support services",
      "Business connect"
    ],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.title[currentLocale]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: currentLocale === "vi" ? "Trang chủ" : "Home",
        item: siteConfig.url
      }
    ]
  };

  return [websiteSchema, organizationSchema, personSchema, breadcrumbSchema];
}

export function createPageSchemas(
  pageName: string,
  locale: string = "vi"
): Record<string, unknown>[] {
  const currentLocale = locale === "vi" || locale === "en" ? locale : "vi";
  const baseSchemas = createDefaultSchemas(currentLocale);
  
  // Add page-specific schema
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteConfig.pages[pageName as keyof typeof siteConfig.pages]?.title[currentLocale] || pageName,
    description: siteConfig.pages[pageName as keyof typeof siteConfig.pages]?.description[currentLocale] || "",
    url: `${siteConfig.url}/${locale === "en" ? "" : locale}/${pageName}`,
    inLanguage: currentLocale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.title[currentLocale],
      url: siteConfig.url
    }
  };

  return [...baseSchemas, pageSchema];
}
