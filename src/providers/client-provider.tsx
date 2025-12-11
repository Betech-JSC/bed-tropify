"use client";

import React from "react";
import Script from "next/script";

function ThirdPartyScripts() {
  // Load GA only when NEXT_PUBLIC_GA_ID is set. Use lazyOnload to defer
  // loading until the browser is idle to reduce blocking and bytes used
  // during initial navigation.
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID) return null;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="ga-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config','${GA_ID}', { page_path: window.location.pathname });`,
        }}
      />
    </>
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ThirdPartyScripts />
    </>
  );
}
