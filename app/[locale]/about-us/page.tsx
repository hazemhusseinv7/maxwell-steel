import { getSettingsData, getAboutUsData } from "@/lib/sanity/queries";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import AboutUs from "@/components/AboutUs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "About Us",
    alternates: buildAlternates(locale, "/about-us"),
  };
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  const [settings, aboutUs] = await Promise.all([
    getSettingsData(),
    getAboutUsData(locale),
  ]);
  return (
    <main>
      <AboutUs settings={settings} aboutUs={aboutUs} />
    </main>
  );
}
