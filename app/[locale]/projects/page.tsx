import Projects from "@/components/Projects";
import { buildAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Projects",
    alternates: buildAlternates(locale, "/projects"),
  };
}

export default async function Page() {
  return (
    <main className="min-h-screen">
      <Projects />
    </main>
  );
}
