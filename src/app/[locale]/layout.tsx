import "@/styles/globals.scss";
import { routing } from "@/i18n/i18n-navigation";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ClientProviders from "@/providers/client-provider";
import MainWrapper from "@/components/layout/main-wrapper";
import { Metadata } from "next";
import { generateMetadata as genMeta } from "@/utils/generate-metadata";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SchemaScript from "@/components/layout/schema-script";
import { createDefaultSchemas } from "@/utils/schemas";
declare global {
    interface Window {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: Array<Record<string, unknown>>;
    }
  }

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// Generate static params for all locales
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata(
  props: RootLayoutProps
): Promise<Metadata> {
  const { locale } = await props.params;

  return genMeta({
    locale,
    alternates: {
      en: "/",
      vi: "/vi"
    }
  });
}

export default async function RootLayout(props: RootLayoutProps) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const schemas = createDefaultSchemas(locale);

  return (
    <>
      <SchemaScript schemas={schemas} />
      <ClientProviders>
        <NextIntlClientProvider
          locale={locale}
          messages={messages as AbstractIntlMessages}
        >
          <Header />
          <MainWrapper>{props.children}</MainWrapper>
          <Footer />
        </NextIntlClientProvider>
      </ClientProviders>
    </>
  );
}
