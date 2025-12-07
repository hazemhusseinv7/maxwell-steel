import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import ReactLenis from "lenis/react";

import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import RiskAdvantageCards from "@/components/RiskAdvantageCards";
import Clients from "@/components/Clients";

import { getSettingsData, getAboutUsData } from "@/lib/sanity/queries";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const [settings, aboutUs] = await Promise.all([
    getSettingsData(),
    getAboutUsData(locale),
  ]);

  return (
    <ReactLenis root className="min-h-[200vh] overflow-hidden">
      <Hero />
      <RiskAdvantageCards />
      <AboutUs settings={settings} aboutUs={aboutUs} />
      <Clients />
    </ReactLenis>
  );
}
