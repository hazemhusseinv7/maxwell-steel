import { EmptyState } from "@heroui/react";
import { HiDocumentSearch } from "react-icons/hi";
import { HiEye, HiQueueList } from "react-icons/hi2";
import { RiArticleFill, RiVerifiedBadgeFill } from "react-icons/ri";

import { BlogFilters } from "@/components/blog-filters";
import { CornerFrame } from "@/components/corner-frame";
import { FeaturedBento } from "@/components/featured-bento";
import { HeroImage, HeroSection } from "@/components/hero";
import { LogosSection } from "@/components/logos-section";
import { ArPagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { SeriesCard } from "@/components/series-card";
import { ShowcaseImage } from "@/components/showcase-image";
import { SupportCta } from "@/components/support-cta";
import {
  getCategories,
  getFeaturedPosts,
  getMostRead,
  getPostIndex,
  getPosts,
  getSeriesShowcase,
  getTags,
} from "@/lib/blog";
import { ARTICLE_FORMS, formatCountAr } from "@/lib/formatters";
import { blockLines, getSiteSettings } from "@/lib/settings";

const PAGE_SIZE = 9;

interface Props {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const norm = (v?: string) => (v && v !== "all" ? v : "");
  const category = norm(params.category);
  const tag = norm(params.tag);
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const filtering = q !== "" || category !== "" || tag !== "";
  const showHero = !filtering && page === 1;

  const [
    { items, total },
    featured,
    categories,
    tags,
    showcase,
    settings,
    mostRead,
    postIndex,
  ] = await Promise.all([
    getPosts({ q, category, tag, page, pageSize: PAGE_SIZE }),
    filtering || page > 1 ? Promise.resolve([]) : getFeaturedPosts(),
    getCategories(),
    getTags(),
    filtering || page > 1 ? Promise.resolve([]) : getSeriesShowcase(),
    !filtering && page === 1 ? getSiteSettings() : Promise.resolve(null),
    filtering || page > 1 ? Promise.resolve([]) : getMostRead(),
    filtering || page > 1 ? Promise.resolve([]) : getPostIndex(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hero = showHero ? (items[0] ?? null) : null;
  const latest = items;
  const heroTitleLines = blockLines(settings?.siteTitle);
  const heroDescriptionLines = blockLines(settings?.siteDescription);

  const hrefFor = (p: number) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (category) sp.set("category", category);
    if (tag) sp.set("tag", tag);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <>
      {showHero && (
        <div className="relative flex flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
          <main className="relative mx-auto w-full max-w-6xl grow lg:px-4">
            <HeroSection
              post={
                hero
                  ? {
                      title: hero.title,
                      excerpt: hero.excerpt,
                      slug: hero.slug,
                    }
                  : null
              }
              titleLines={heroTitleLines}
              descriptionLines={heroDescriptionLines}
              index={postIndex}
              socialLinks={settings?.socialLinks ?? []}
            />
          </main>
        </div>
      )}
      <main className="mx-auto w-full max-w-6xl flex-1 overflow-hidden px-4">
        {!filtering && page === 1 && showcase.length > 0 && (
          <CornerFrame dividers="top">
            <section aria-label="السلاسل" className="texture-wash pt-24">
              <h2 className="text-foreground font-display ms-4 mb-4 flex items-center gap-1.5 text-xl font-bold">
                <HiQueueList className="size-5 shrink-0" aria-hidden="true" />
                سلسلة المقالات
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {showcase.map((s) => (
                  <SeriesCard key={s._id} series={s} />
                ))}
              </div>
            </section>
          </CornerFrame>
        )}

        {!filtering && page === 1 && featured.length > 0 && (
          <CornerFrame dividers="top">
            <section aria-label="مقالات مميزة" className="texture-wash pt-24">
              <h2 className="text-foreground font-display ms-4 mb-4 flex items-center gap-1.5 text-xl font-bold">
                <RiVerifiedBadgeFill
                  className="size-5 shrink-0"
                  aria-hidden="true"
                />
                مقالات مميزة
              </h2>
              <FeaturedBento posts={featured} />
            </section>
          </CornerFrame>
        )}

        {!filtering && page === 1 && mostRead.length > 0 && (
          <CornerFrame dividers="top">
            <section
              aria-label="الأكثر قراءة"
              id="most-read"
              className="texture-wash scroll-mt-24 pt-24"
            >
              <h2 className="text-foreground font-display ms-4 mb-4 flex items-center gap-1.5 text-xl font-bold">
                <HiEye className="size-5 shrink-0" aria-hidden="true" />
                الأكثر قراءة
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {mostRead.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </section>
          </CornerFrame>
        )}

        <CornerFrame dividers="top">
          <section
            aria-label="المقالات"
            id="articles"
            className="scroll-mt-24 py-24"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-foreground ms-4 flex items-center gap-1.5 text-xl font-bold">
                {filtering ? (
                  <HiDocumentSearch
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <RiArticleFill
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {filtering ? "نتائج البحث" : "جميع المقالات"}
              </h2>
              <span className="text-muted text-sm">
                {formatCountAr(total, ARTICLE_FORMS)}
              </span>
            </div>
            <BlogFilters
              q={q}
              category={category}
              tag={tag}
              categories={categories}
              tags={tags}
            />
            {latest.length === 0 ? (
              <CornerFrame>
                <EmptyState className="border-border text-muted flex flex-col items-center gap-2 rounded-none border border-dashed px-4 py-12 text-center">
                  <HiDocumentSearch className="size-8" aria-hidden="true" />
                  <p>
                    لا توجد مقالات مطابقة. جرّب كلمات مختلفة أو أزل التصفية.
                  </p>
                </EmptyState>
              </CornerFrame>
            ) : (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <ArPagination
                page={page}
                totalPages={totalPages}
                hrefFor={hrefFor}
              />
            </div>
          </section>
        </CornerFrame>

        {showHero && (
          <>
            <HeroImage image={settings?.heroImage ?? null} />
            <LogosSection
              logos={settings?.partnerLogos ?? []}
              title={settings?.logosTitle ?? null}
            />
          </>
        )}
        <ShowcaseImage />
        <SupportCta />
      </main>
    </>
  );
}
