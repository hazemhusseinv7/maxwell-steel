import { getPosts } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

function escapeXml(value: string): string {
  return value.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c] ?? c,
  );
}

export async function GET() {
  const base = siteUrl();
  const { items } = await getPosts({ pageSize: 50 });

  const xmlItems = items
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مقرات - المدونة</title>
    <link>${base}/</link>
      <description>مقالات وعقارات مقرات باللغة العربية</description>
    <language>ar</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
