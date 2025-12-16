import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import ReactLenis from "lenis/react";

import Hero from "@/components/Hero";
import RiskAdvantage from "@/components/RiskAdvantage";
import Products from "@/components/Products";
import AboutUs from "@/components/AboutUs";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";

import {
  getSettingsData,
  getRiskAdvantageData,
  getProductsData,
  getAboutUsData,
  getTestimonialsData,
} from "@/lib/sanity/queries";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale as Locale);

  const [settings, riskAdvantage, products, aboutUs, testimonials] =
    await Promise.all([
      getSettingsData(),
      getRiskAdvantageData(locale),
      getProductsData(locale),
      getAboutUsData(locale),
      getTestimonialsData(locale),
    ]);

  return (
    <main>
      <ReactLenis root className="min-h-[200vh] overflow-hidden">
        <Hero />
        <RiskAdvantage riskAdvantage={riskAdvantage} />
        <Products products={products} />
        <AboutUs settings={settings} aboutUs={aboutUs} />
        <Testimonials testimonials={testimonials} />
        <Clients />
      </ReactLenis>
    </main>
  );
}
