import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPageData } from "@/lib/sanity/queries";
import { buildAlternates } from "@/lib/seo";
import { PortableText } from "@/lib/PortableTextComponents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const { locale, page } = await params;
  const pageData = await getPageData(page, locale);

  if (!pageData) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: pageData.title,
    alternates: buildAlternates(locale, `/${page}`),
  };
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  const pageData = await getPageData(page, locale);

  if (!pageData) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-28 md:py-32">
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
          {pageData.title}
        </h1>

        <PortableText value={pageData.content} />
      </div>
    </main>
  );
}
