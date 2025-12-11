import { ReactNode } from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import ClientProviders from "@/providers/client-provider";

interface EmptyProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export function Empty({ children, locale, messages }: EmptyProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientProviders>{children}</ClientProviders>
    </NextIntlClientProvider>
  );
}
