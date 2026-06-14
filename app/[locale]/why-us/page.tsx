import Features from "@/components/Features";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Why Us",
    alternates: buildAlternates(locale, "/why-us"),
  };
}

export default function page() {
  return (
    <main className="pt-8 lg:pt-20">
      <Features />
    </main>
  );
}
