import { Tajawal } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "./providers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactButton from "@/components/ContactButton/ContactButton";
import { getProjectsData } from "@/lib/sanity/queries";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const SITE_NAME = "Maxwell Steel";

export function generateStaticParams() {
  return [{ locale: "ar" }];
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
) {
  const { locale } = await props.params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      "facebook-domain-verification":
        process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION,
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
    gaId = process.env.NEXT_PUBLIC_GA_ID,
    googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  const projects: ProjectsType | null = await getProjectsData();

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body className={cn(tajawal.variable, "font-tajawal antialiased")}>
        <NextIntlClientProvider>
          <Providers>
            <Header projects={projects} />
            {children}
            <ContactButton />
            <Footer />
          </Providers>
        </NextIntlClientProvider>

        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {gaId && <GoogleAnalytics gaId={gaId} />}

        {googleAdsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdsId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
