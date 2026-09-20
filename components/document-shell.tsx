import { arSA } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { AppProviders } from "@/components/app-providers";
import { LogoPattern } from "@/components/logo-pattern";
import { clerkAppearance } from "@/lib/clerk-appearance";

const thmanyah = localFont({
  variable: "--font-thmanyah",
  display: "swap",
  src: [
    {
      path: "../public/fonts/thmanyahserifdisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/thmanyahserifdisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/thmanyahserifdisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/thmanyahserifdisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/thmanyahserifdisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export function DocumentShell({ children }: { children: ReactNode }) {
  return (
    <html
      dir="rtl"
      lang="ar"
      className="min-h-screen scroll-smooth antialiased"
    >
      <body
        className={`${thmanyah.variable} site-shell relative flex min-h-screen flex-col font-sans`}
      >
        <LogoPattern className="fixed inset-0 -z-10 opacity-[0.05]" />
        <ClerkProvider localization={arSA} appearance={clerkAppearance}>
          <AppProviders>{children}</AppProviders>
        </ClerkProvider>
      </body>
    </html>
  );
}
