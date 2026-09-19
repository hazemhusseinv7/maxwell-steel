import type { MetadataRoute } from "next";
import { getCategories, getPosts, getSeriesList, getTags } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();
  const [{ items: posts }, categories, tags, series] = await Promise.all([
    getPosts({ pageSize: 1000 }),
    getCategories(),
    getTags(),
    getSeriesList(),
  ]);

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/support`, lastModified: now },
    { url: `${base}/support/submit`, lastModified: now },
    { url: `${base}/support/track`, lastModified: now },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
    })),
    ...categories.map((c) => ({
      url: `${base}/blog/category/${c.slug}`,
      lastModified: now,
    })),
    ...tags.map((t) => ({
      url: `${base}/blog/tag/${t.slug}`,
      lastModified: now,
    })),
    ...series.map((s) => ({
      url: `${base}/blog/series/${s.slug}`,
      lastModified: now,
    })),
  ];
}
