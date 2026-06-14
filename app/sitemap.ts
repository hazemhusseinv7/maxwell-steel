import type { MetadataRoute } from "next";
import { getProductSlugs, getBlogSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const currentDate = new Date();

  const languages = (path: string) => ({
    en: `${baseUrl}/en${path}`,
    ar: `${baseUrl}/ar${path}`,
    "x-default": `${baseUrl}/ar${path}`,
  });

  const localized = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ): MetadataRoute.Sitemap => [
    {
      url: `${baseUrl}/en${path}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
      alternates: { languages: languages(path) },
    },
    {
      url: `${baseUrl}/ar${path}`,
      lastModified: currentDate,
      changeFrequency,
      priority,
      alternates: { languages: languages(path) },
    },
  ];

  const staticRoutes = [
    ...localized("", 1.0, "weekly"),
    ...localized("/products", 0.9, "monthly"),
    ...localized("/projects", 0.9, "monthly"),
    ...localized("/why-us", 0.9, "monthly"),
    ...localized("/about-us", 0.8, "monthly"),
    ...localized("/contact", 0.7, "monthly"),
    ...localized("/blog", 0.5, "weekly"),
  ];

  const productSlugs = await getProductSlugs();
  const productRoutes = productSlugs.flatMap((slug) =>
    localized(`/products/${slug}`, 0.8, "monthly"),
  );

  const blogSlugs = await getBlogSlugs();
  const blogRoutes = blogSlugs.flatMap((slug) =>
    localized(`/blog/${slug}`, 0.6, "weekly"),
  );

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
