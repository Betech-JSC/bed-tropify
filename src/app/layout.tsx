import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Tropify",
    template: "%s | Tropify"
  },
  description: "Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.",
  keywords: [
    "Tropify",
  ],
  authors: [{ name: "Tropify" }],
  creator: "Tropify",
  publisher: "Tropify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tropify.asia',
    siteName: 'Tropify',
    title: 'Tropify',
    description: 'Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.',
    images: [
      {
        url: '/cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Tropify cover image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tropify',
    description: 'Tropify Asia is a Southeast Asia - focused sourcing and business solutions partner that connects global buyers with etrusted suppliers. We specialize in coffee, fruit powders, frozen fruits, while also offering services such as supplier vetting, business matching, and local operational support.',
    images: ['/cover.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Thay bằng code thực tế
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
