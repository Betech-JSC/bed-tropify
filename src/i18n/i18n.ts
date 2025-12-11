import { getRequestConfig } from "next-intl/server";
import { routing } from "./i18n-navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  // Handle both sync and async requestLocale
  const locale = requestLocale instanceof Promise ? await requestLocale : requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../i18n/locales/${routing.defaultLocale}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../i18n/locales/${locale}.json`)).default,
  };
});
