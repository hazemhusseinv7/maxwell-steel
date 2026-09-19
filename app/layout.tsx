import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: "مدونة مقرات - عقارات ومقالات",
  description: "مدونة مقرات: مقالات وعقارات واستشارات باللغة العربية",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
