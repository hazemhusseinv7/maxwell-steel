import { Tajawal } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale, hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

import { Providers } from "./providers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton/ContactButton";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const direction = locale === "ar" ? "rtl" : "ltr";

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID,
    gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body className={cn(tajawal.variable, "font-tajawal antialiased")}>
        <NextIntlClientProvider>
          <Providers>
            <Header />
            {children}
            <ContactButton />
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>

      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
