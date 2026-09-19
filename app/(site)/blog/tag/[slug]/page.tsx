import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchiveLayout } from "@/components/archive-layout";
import { getPosts, getTagBySlug } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return {};
  const url = `${siteUrl()}/blog/tag/${tag.slug}`;
  return {
    title: `#${tag.title} - مقرات`,
    description: `مقالات الوسم ${tag.title}`,
    alternates: { canonical: url },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();
  const { items } = await getPosts({ tag: slug, pageSize: 100 });
  return (
    <ArchiveLayout
      kicker="وسم"
      title={`#${tag.title}`}
      posts={items}
      emptyMessage="لا توجد مقالات بهذا الوسم بعد."
    />
  );
}
