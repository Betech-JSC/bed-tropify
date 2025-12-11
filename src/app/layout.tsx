import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Tropify",
    template: "%s | Tropify"
  },
  description: "Tropify là một thương hiệu nông sản hữu cơ từ Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, và giao trực tiếp từ nông trại đến tay người tiêu dùng, đảm bảo chất lượng cao nhất và thời gian vận chuyển ngắn nhất.",
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
    url: '', // Thay bằng URL thực tế của bạn
    siteName: 'Tropify',
    title: 'Tropify',
    description: 'Tropify là một thương hiệu nông sản hữu cơ từ Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, và giao trực tiếp từ nông trại đến tay người tiêu dùng, đảm bảo chất lượng cao nhất và thời gian vận chuyển ngắn nhất.',
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
    description: 'Tropify là một thương hiệu nông sản hữu cơ từ Andalusia, Tây Ban Nha, tập trung vào việc cung cấp trái cây tươi ngon, được trồng bền vững, và giao trực tiếp từ nông trại đến tay người tiêu dùng, đảm bảo chất lượng cao nhất và thời gian vận chuyển ngắn nhất.',
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
