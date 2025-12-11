"use client";

// import { usePathname } from "@/i18n/i18n-navigation";
import React from "react";
// import { useLocale } from "next-intl";
import { I18nParamsProvider } from "@/providers/i18n-provider";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const isHomepage = pathname === "/";
  // const locale = useLocale();

  return (
    <I18nParamsProvider>
      <main className="bg-black min-h-screen">
        {children}
      </main>
    </I18nParamsProvider>
  );
}
