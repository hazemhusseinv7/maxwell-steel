export function siteUrl(): string {
  const value = process.env.NEXT_PUBLIC_APP_URL;
  if (!value)
    throw new Error("Missing environment variable: NEXT_PUBLIC_APP_URL");
  return value.replace(/\/$/, "");
}

export function blogPostingJsonLd(input: {
  title: string;
  excerpt: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  authorName: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.excerpt,
    url: input.url,
    datePublished: input.publishedAt,
    inLanguage: "ar",
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
    author: { "@type": "Person", name: input.authorName },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function personJsonLd(input: {
  name: string;
  url: string;
  jobTitle?: string;
  bio?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    url: input.url,
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.bio ? { description: input.bio } : {}),
  };
}
