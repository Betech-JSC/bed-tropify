import { siteConfig } from "@/utils/site-config";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routePatterns = {
  demo: {
    vi: "demo",
    en: "demo",
  },
  about: {
    vi: "about",
    en: "about",
  },
};

const createPathnames = () => {
  return {
    "/": {      
      en: "/",
      vi: "/vi",
    },
    "/demo": {      
      vi: `/vi/${routePatterns.demo.vi}`,
      en: `/${routePatterns.demo.en}`,
    },
  };
};

let serverI18nParams: Record<string, unknown> = {};

export const setI18nParams = (params: Record<string, unknown>) => {
  serverI18nParams = params;
};

export const getI18nParams = () => {
  return serverI18nParams;
};

export const routing = defineRouting({
  locales: siteConfig.locales,
  localePrefix: "as-needed",
  defaultLocale: siteConfig.defaultLocale,
  localeDetection: false,
  pathnames: createPathnames(),
});

export const { Link, usePathname, useRouter } = createNavigation(routing);
