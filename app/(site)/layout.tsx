import type { ReactNode } from "react";
import "../globals.css";
import { Analytics } from "@/components/analytics";
import { DocumentShell } from "@/components/document-shell";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSeriesList } from "@/lib/blog";
import { blockLines, getSiteSettings } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, allSeries] = await Promise.all([
    getSiteSettings(),
    getSeriesList(),
  ]);
  return (
    <DocumentShell>
      <Analytics settings={settings} />
      <Header />
      {children}
      <Footer
        series={allSeries.map((s) => ({ title: s.title, slug: s.slug }))}
        siteTitle={blockLines(settings?.siteTitle)}
        siteDescription={blockLines(settings?.siteDescription)}
        propertiesUrl={settings?.propertiesUrl ?? null}
        socialLinks={settings?.socialLinks ?? []}
      />
    </DocumentShell>
  );
}
