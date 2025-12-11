import { notFound } from "next/navigation";
import { routing } from "@/i18n/i18n-navigation";

// Generate static params for all locales
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
    rest: ['404'], // Generate a 404 page for each locale
  }));
}

export default function CatchAllPage() {
  notFound();
}
