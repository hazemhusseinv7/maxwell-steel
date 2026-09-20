import { Breadcrumbs, Chip } from "@heroui/react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { BsCalendar2RangeFill } from "react-icons/bs";
import {
  HiArrowLeft,
  HiChevronLeft,
  HiChevronRight,
  HiClock,
} from "react-icons/hi2";
import { AuthorAvatar } from "@/components/author-avatar";
import { CornerFrame } from "@/components/corner-frame";
import { LikeButton } from "@/components/like-button";
import { PortableContent } from "@/components/portable-content";
import { PostCard } from "@/components/post-card";
import { PostCover } from "@/components/post-cover";
import { PostVideo } from "@/components/post-video";
import { SupportCta } from "@/components/support-cta";
import { Toc } from "@/components/toc";
import { ViewTracker } from "@/components/view-tracker";
import {
  getPostBySlug,
  getRelatedPosts,
  headingsFromBody,
  plainTextFromBody,
} from "@/lib/blog";
import { countWords, formatDateAr, readingTimeAr } from "@/lib/formatters";
import { blogPostingJsonLd, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${siteUrl()}/blog/${post.slug}`;
  return {
    title: `${post.title} - مقرات`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
      images: [{ url: `${url}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const headings = headingsFromBody(post.body);
  const related = await getRelatedPosts(
    post.slug,
    post.categories.map((c) => c._id),
    post.tags.map((t) => t._id),
  );
  const readingTime = readingTimeAr(countWords(plainTextFromBody(post.body)));

  const seriesIndex = post.series
    ? post.seriesPosts.findIndex((p) => p.slug === post.slug)
    : -1;
  const prevInSeries =
    seriesIndex > 0 ? post.seriesPosts[seriesIndex - 1] : null;
  const nextInSeries =
    seriesIndex >= 0 && seriesIndex < post.seriesPosts.length - 1
      ? post.seriesPosts[seriesIndex + 1]
      : null;

  const url = `${siteUrl()}/blog/${post.slug}`;
  const jsonLd = [
    blogPostingJsonLd({
      title: post.title,
      excerpt: post.excerpt,
      url,
      imageUrl: post.cover ? urlFor(post.cover).width(1200).url() : undefined,
      publishedAt: post.publishedAt,
      authorName: post.author?.name ?? "مقرات",
    }),
    breadcrumbJsonLd([
      { name: "الرئيسية", url: siteUrl() },
      { name: post.title, url },
    ]),
  ];

  return (
    <>
      <ViewTracker slug={post.slug} />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify output, no HTML
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto w-full max-w-6xl px-4">
        <main className="flex-1 py-8">
          <Breadcrumbs>
            <Breadcrumbs.Item href="/">الرئيسية</Breadcrumbs.Item>
            <Breadcrumbs.Item href={`/blog/${post.slug}`}>
              {post.title}
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <article className="mt-6">
            <div className="texture-band bg-accent-soft border-border shadow-surface rounded-none border p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {post.categories.map((c) => (
                  <NextLink key={c._id} href={`/blog/category/${c.slug}`}>
                    <Chip size="sm" color="accent" variant="soft">
                      {c.title}
                    </Chip>
                  </NextLink>
                ))}
                {post.tags.map((t) => (
                  <NextLink key={t._id} href={`/blog/tag/${t.slug}`}>
                    <Chip size="sm" color="warning" variant="soft">
                      #{t.title}
                    </Chip>
                  </NextLink>
                ))}
              </div>

              <h1 className="font-display mt-4 text-3xl leading-12 font-extrabold sm:text-4xl">
                {post.title}
              </h1>
              <p className="text-muted mt-3 max-w-2xl text-lg leading-9">
                {post.excerpt}
              </p>
              <p className="text-muted mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="flex items-center gap-1.5">
                  <BsCalendar2RangeFill
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <time dateTime={post.publishedAt}>
                    {formatDateAr(post.publishedAt)}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <HiClock className="size-4 shrink-0" aria-hidden="true" />
                  <span>{readingTime}</span>
                </span>
              </p>
              <div className="mt-3">
                <LikeButton slug={post.slug} initialLikes={post.likes} />
              </div>
            </div>

            <PostCover
              cover={post.cover}
              title={post.title}
              titleClassName="text-2xl leading-12 md:text-5xl md:leading-[2]"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="mt-6"
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
              <div className="texture-panel border-border bg-surface shadow-surface min-w-0 rounded-none border p-6 sm:p-10">
                <PortableContent body={post.body} />
                {post.author ? (
                  <section
                    aria-label="الكاتب"
                    className="border-border mt-8 border-t pt-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                      <NextLink
                        href={`/author/${post.author.slug}`}
                        aria-label={`صفحة الكاتب ${post.author.name}`}
                        className="shrink-0"
                      >
                        <AuthorAvatar
                          name={post.author.name}
                          avatar={post.author.avatar}
                          size="lg"
                        />
                      </NextLink>
                      <div className="min-w-0 flex-1">
                        <p className="text-muted text-xs font-bold">
                          بقلم الكاتب
                        </p>
                        <NextLink
                          href={`/author/${post.author.slug}`}
                          className="font-display hover:text-accent mt-1 inline-block text-lg font-bold transition-colors"
                        >
                          {post.author.name}
                        </NextLink>
                        {post.author.jobTitle ? (
                          <p className="text-bronze mt-0.5 text-sm">
                            {post.author.jobTitle}
                          </p>
                        ) : null}
                        {post.author.bio ? (
                          <p className="text-muted mt-2 text-sm leading-8">
                            {post.author.bio}
                          </p>
                        ) : null}
                        <NextLink
                          href={`/author/${post.author.slug}`}
                          className="text-accent mt-3 inline-flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-80"
                        >
                          جميع مقالات الكاتب
                          <HiArrowLeft
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                        </NextLink>
                      </div>
                    </div>
                  </section>
                ) : null}
              </div>
              <aside className="min-w-0">
                <Toc headings={headings} />
              </aside>
            </div>

            <PostVideo
              fileUrl={post.videoFileUrl}
              youtubeUrl={post.youtubeUrl}
              caption={post.videoCaption}
            />

            {post.series && (
              <CornerFrame>
                <section aria-label="سلسلة المقالات" className="mt-10">
                  <p className="text-muted mb-3 text-sm">
                    جزء من سلسلة:{" "}
                    <NextLink
                      href={`/blog/series/${post.series.slug}`}
                      className="text-accent font-bold"
                    >
                      {post.series.title}
                    </NextLink>
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {prevInSeries ? (
                      <NextLink
                        href={`/blog/${prevInSeries.slug}`}
                        className="group border-border bg-surface shadow-surface card-gradient hover:bg-surface-secondary block rounded-none border p-5 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="text-muted flex items-center gap-1 text-xs font-bold">
                          <HiChevronRight
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                          المقال السابق
                        </span>
                        <span className="font-display group-hover:text-accent mt-2 line-clamp-2 block font-bold transition-colors">
                          {prevInSeries.title}
                        </span>
                      </NextLink>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="border-border text-muted hidden rounded-none border border-dashed p-5 text-sm sm:block"
                      >
                        أنت في بداية السلسلة
                      </div>
                    )}
                    {nextInSeries ? (
                      <NextLink
                        href={`/blog/${nextInSeries.slug}`}
                        className="group border-border bg-surface shadow-surface card-gradient hover:bg-surface-secondary block rounded-none border p-5 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="text-muted flex items-center gap-1 text-xs font-bold">
                          المقال التالي
                          <HiChevronLeft
                            className="size-4 shrink-0"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="font-display group-hover:text-accent mt-2 line-clamp-2 block font-bold transition-colors">
                          {nextInSeries.title}
                        </span>
                      </NextLink>
                    ) : (
                      <div
                        aria-hidden="true"
                        className="border-border text-muted hidden rounded-none border border-dashed p-5 text-sm sm:block"
                      >
                        أنت في نهاية السلسلة
                      </div>
                    )}
                  </div>
                </section>
              </CornerFrame>
            )}

            {related.length > 0 && (
              <section aria-label="مقالات ذات صلة" className="mt-10">
                <h2 className="font-display mb-4 text-xl font-bold">
                  مقالات ذات صلة
                </h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <PostCard key={r._id} post={r} />
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>

        <div className="mt-10">
          <SupportCta />
        </div>
      </div>
    </>
  );
}
