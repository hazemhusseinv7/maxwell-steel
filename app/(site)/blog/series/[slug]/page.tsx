import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchiveLayout } from "@/components/archive-layout";
import { getSeriesBySlug } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) return {};
  const url = `${siteUrl()}/blog/series/${series.slug}`;
  return {
    title: `${series.title} - مقرات`,
    description: series.description ?? `سلسلة مقالات ${series.title}`,
    alternates: { canonical: url },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();
  return (
    <ArchiveLayout
      kicker="سلسلة مقالات"
      title={series.title}
      description={series.description}
      posts={series.posts}
      emptyMessage="لا توجد مقالات في هذه السلسلة بعد."
    />
  );
}
