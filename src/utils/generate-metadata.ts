import type { Metadata } from "next";
import { siteConfig } from "@/utils/site-config";

export interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
  locale?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  alternates?: Record<string, string> | null;
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  noIndex = false,
  locale = "vi",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  alternates: simpleAlternates,
}: MetadataProps): Metadata {
  const siteTitle =
    locale === "vi" || locale === "en"
      ? siteConfig.title[locale]
      : siteConfig.title.vi;

  const siteDescription =
    locale === "vi" || locale === "en"
      ? siteConfig.description[locale]
      : siteConfig.description.vi;

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaImage = image || siteConfig.defaultImage;
  const absoluteImageUrl = metaImage?.startsWith("http")
    ? metaImage
    : `${siteConfig.url}${metaImage}`;

  const openGraph: {
    title: string;
    description: string;
    images?: { url: string; alt: string }[];
    locale: string;
    siteName: string;
    type: "website" | "article";
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      author?: string;
      section?: string;
      tags?: string[];
    };
  } = {
    title: metaTitle,
    description: metaDescription,
    images: absoluteImageUrl
      ? [{ url: absoluteImageUrl, alt: metaTitle }]
      : undefined,
    locale,
    siteName: siteTitle,
    type: ogType,
  };

  if (ogType === "article") {
    openGraph.article = {
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { author }),
      ...(section && { section }),
      ...(tags && tags.length > 0 && { tags }),
    };
  }

  let finalAlternates: Metadata["alternates"] = null;
  if (simpleAlternates) {
    const canonicalPath =
      simpleAlternates[locale] ??
      simpleAlternates[siteConfig.defaultLocale] ??
      "/";
    const canonicalUrl = `${siteConfig.url}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

    const languages = Object.entries(simpleAlternates).reduce(
      (acc, [lang, path]) => {
        acc[lang] = path.startsWith("http")
          ? path
          : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
        return acc;
      },
      {} as Record<string, string>
    );

    finalAlternates = {
      canonical: canonicalUrl,
      languages: languages,
    };
  } else {
    const defaultLanguages: Record<string, string> = {};
    siteConfig.locales.forEach((loc) => {
      const pathPrefix = loc === siteConfig.defaultLocale ? "" : `/${loc}`;
      defaultLanguages[loc] = `${siteConfig.url}${pathPrefix}`;
    });
    finalAlternates = {
      canonical: `${siteConfig.url}${locale === siteConfig.defaultLocale ? "" : `/${locale}`}`,
      languages: defaultLanguages,
    };
  }

  // const defaultSchemas: Record<string, unknown>[] = [];
  // const schemaStructures = [...defaultSchemas, ...schemas];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || siteConfig.defaultKeywords,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: absoluteImageUrl ? [absoluteImageUrl] : undefined,
      creator: siteConfig.twitterHandle || "",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: finalAlternates,
    metadataBase: new URL(siteConfig.url),
  };
}

export function createPageMetadata(
  pageName: string,
  locale: string = "vi"
): MetadataProps {
  const validPageNames = Object.keys(siteConfig.pages);
  const validPageName = validPageNames.includes(pageName) ? pageName : "home";

  const pageConfig =
    siteConfig.pages[validPageName as keyof typeof siteConfig.pages];

  const pageTitle =
    locale === "vi" || locale === "en"
      ? pageConfig.title[locale]
      : pageConfig.title.vi;

  const pageDescription =
    locale === "vi" || locale === "en"
      ? pageConfig.description[locale]
      : pageConfig.description.vi;

  return {
    title: pageTitle,
    description: pageDescription,
    locale,
  };
}

export function createArticleMetadata(
  article: {
    seo_meta_title?: string;
    title?: string;
    seo_meta_description?: string;
    description?: string;
    seo_meta_keywords?: string;
    cover?: {
      absolute_url?: string;
    };
    published_at?: string;
    created_at?: string;
    updated_at?: string;
    author?: {
      name?: string;
    };
    slug?: string;
    tags?: Array<{ name: string }>;
  },
  locale: string = "vi"
): MetadataProps {
  // const currentLocale = locale === "vi" || locale === "en" ? locale : "vi";

  return {
    title: article?.seo_meta_title || article?.title,
    description: article?.seo_meta_description || article?.description,
    keywords: article?.seo_meta_keywords,
    image: article?.cover?.absolute_url,
    locale,
    ogType: "article",
    publishedTime: article?.published_at || article?.created_at,
    modifiedTime: article?.updated_at,
    author: article?.author?.name,
    tags: article?.tags?.map((tag: { name: string }) => tag.name) || [],
  };
}

// export function createDefaultSchemas(
//   locale: string = "vi"
// ): Record<string, any>[] {
//   const currentLocale =
//     locale === "vi" || locale === "en" ? locale : "vi";
//   const org = siteConfig.organization;

//   const websiteSchema = {
//     "@context": "https://schema.org/",
//     "@type": "WebSite",
//     name: siteConfig.title[currentLocale],
//     url: siteConfig.url,
//     potentialAction: {
//       "@type": "SearchAction",
//       target: `${siteConfig.url}/${locale === "en" ? "en/search ? "jp/search" : "tim-kiem"}?q={search_term_string}`,
//       "query-input": "required name=search_term_string",
//     },
//   };

//   const organizationSchema: Record<string, any> = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: org.name || siteConfig.title[currentLocale],
//     url: siteConfig.url,
//     logo: `${siteConfig.url}${org.logo || "/logo.png"}`,
//     sameAs: org.sameAs || [],
//   };

//   if (org.address) {
//     organizationSchema.address = {
//       "@type": "PostalAddress",
//       streetAddress: org.address.streetAddress,
//       addressLocality: org.address.addressLocality,
//       addressRegion: org.address.addressRegion,
//       postalCode: org.address.postalCode,
//       addressCountry: org.address.addressCountry,
//     };
//   }

//   if (org.geo) {
//     organizationSchema.geo = {
//       "@type": "GeoCoordinates",
//       latitude: org.geo.latitude,
//       longitude: org.geo.longitude,
//     };
//   }

//   if (org.contactPoint) {
//     organizationSchema.contactPoint = {
//       "@type": "ContactPoint",
//       telephone: org.contactPoint.telephone,
//       email: org.contactPoint.email,
//       contactType: "customer service",
//     };
//   }

//   return [websiteSchema, organizationSchema];
// }
