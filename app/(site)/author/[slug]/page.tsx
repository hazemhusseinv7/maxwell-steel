import { Link } from "@heroui/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

import { ArchiveLayout } from "@/components/archive-layout";
import { AuthorAvatar } from "@/components/author-avatar";
import { getAuthorBySlug } from "@/lib/blog";
import { personJsonLd, siteUrl } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  const url = `${siteUrl()}/author/${author.slug}`;
  return {
    title: `${author.name} - مقرات`,
    description: author.bio ?? `مقالات ${author.name}`,
    alternates: { canonical: url },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const url = `${siteUrl()}/author/${author.slug}`;
  const jsonLd = personJsonLd({
    name: author.name,
    url,
    jobTitle: author.jobTitle,
    bio: author.bio,
  });
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify output, no HTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArchiveLayout
        kicker="كاتب"
        title={author.name}
        description={author.bio}
        posts={author.posts}
        emptyMessage="لا توجد مقالات لهذا الكاتب بعد."
        heroSide={
          <div className="flex flex-col items-center gap-2">
            <AuthorAvatar name={author.name} avatar={author.avatar} size="lg" />
            {author.jobTitle ? (
              <p className="text-muted text-center text-xs">
                {author.jobTitle}
              </p>
            ) : null}
            <div className="flex gap-3 text-sm">
              {author.x ? (
                <Link
                  href={author.x}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="حساب إكس"
                  className="text-accent"
                >
                  <FaXTwitter className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
              {author.github ? (
                <Link
                  href={author.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="حساب غيت هب"
                  className="text-accent"
                >
                  <FaGithub className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
              {author.website ? (
                <Link
                  href={author.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="الموقع"
                  className="text-accent text-xs"
                >
                  الموقع
                </Link>
              ) : null}
            </div>
          </div>
        }
      />
    </>
  );
}
