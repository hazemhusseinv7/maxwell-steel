import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

import Hero from "@/components/Hero";
import RiskAdvantage from "@/components/RiskAdvantage";
import Products from "@/components/Products";
import Features from "@/components/Features";
import AboutUs from "@/components/AboutUs";
import CTA from "@/components/CTA";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";

import {
  getSettingsData,
  getRiskAdvantageData,
  getProductsData,
  getAboutUsData,
  getTestimonialsData,
} from "@/lib/sanity/queries";
import { buildAlternates } from "@/lib/seo";
import Projects from "@/components/Projects";

export async function generateMetadata({
  params,
}: Omit<PageProps<"/[locale]">, "searchParams">): Promise<Metadata> {
  const { locale } = await params;

  const settings = await getSettingsData(locale);

  const title = settings?.seoTitle;
  const description = settings?.seoDescription;
  const ogImageUrl = settings?.ogImage?.asset?.url;
  const twitterCardType = settings?.twitterCardType || "summary_large_image";

  const metadata: Metadata = {
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "ar" ? "ar" : "en",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: twitterCardType as "summary_large_image" | "summary",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: buildAlternates(locale, ""),
  };

  if (title) metadata.title = { absolute: title };
  if (description) metadata.description = description;
  if (settings?.seoKeywords) metadata.keywords = settings.seoKeywords;

  return metadata;
}

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
      <Hero />
      <RiskAdvantage riskAdvantage={riskAdvantage} />
      <Products products={products} />
      <AboutUs settings={settings} aboutUs={aboutUs} />
      <Projects />
      <Features />
      <Testimonials testimonials={testimonials} />
      <CTA />
      <Clients />
    </main>
  );
}
