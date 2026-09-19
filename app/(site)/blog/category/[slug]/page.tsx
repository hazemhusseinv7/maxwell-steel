import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchiveLayout } from "@/components/archive-layout";
import { getCategoryBySlug, getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  const url = `${siteUrl()}/blog/category/${category.slug}`;
  return {
    title: `${category.title} - مقرات`,
    description: category.description ?? `مقالات تصنيف ${category.title}`,
    alternates: { canonical: url },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const { items } = await getPosts({ category: slug, pageSize: 100 });
  return (
    <ArchiveLayout
      kicker="تصنيف"
      title={category.title}
      description={category.description}
      posts={items}
      emptyMessage="لا توجد مقالات في هذا التصنيف بعد."
    />
  );
}
