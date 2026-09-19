import { sanityFetch } from "@/sanity/lib/client";
import {
  AUTHOR_BY_SLUG_QUERY,
  type AuthorAvatar,
  type AuthorDetail,
  CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  type CategoryRef,
  type CoverImage,
  FEATURED_POSTS_QUERY,
  MOST_READ_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_INDEX_QUERY,
  POSTS_QUERY,
  type PostBody,
  type PostCard,
  type PostDetail,
  RELATED_POSTS_QUERY,
  SERIES_BY_SLUG_QUERY,
  SERIES_INDEX_QUERY,
  SERIES_LIST_QUERY,
  type SeriesDetail,
  type SeriesPostRef,
  type SeriesRef,
  TAG_BY_SLUG_QUERY,
  TAGS_QUERY,
  type TagRef,
} from "@/sanity/lib/queries";
import type {
  AUTHOR_BY_SLUG_QUERY_RESULT,
  CATEGORIES_QUERY_RESULT,
  CATEGORY_BY_SLUG_QUERY_RESULT,
  MOST_READ_QUERY_RESULT,
  POST_BY_SLUG_QUERY_RESULT,
  POSTS_INDEX_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  SERIES_BY_SLUG_QUERY_RESULT,
  SERIES_INDEX_QUERY_RESULT,
  SERIES_LIST_QUERY_RESULT,
  TAG_BY_SLUG_QUERY_RESULT,
  TAGS_QUERY_RESULT,
} from "@/sanity.types";
import { BLOG_CACHE_TAG } from "./constants";
import { arabicVariants } from "./search";

const postTags = [BLOG_CACHE_TAG, "post"];
const taxonomyTags = [BLOG_CACHE_TAG, "taxonomy"];

type CardRow = POSTS_QUERY_RESULT["items"][number];

function toAuthorRef(a: CardRow["author"]): {
  _id: string;
  name: string;
  slug: string;
  jobTitle?: string;
  avatar?: AuthorAvatar | null;
} | null {
  if (!a || !a.name || !a.slug) return null;
  return {
    _id: a._id,
    name: a.name,
    slug: a.slug,
    ...(a.jobTitle ? { jobTitle: a.jobTitle } : {}),
    ...(a.avatar ? { avatar: a.avatar } : {}),
  };
}

function toPostCard(r: CardRow): PostCard | null {
  if (!r.slug || !r.title || !r.excerpt || !r.publishedAt) return null;
  const author = toAuthorRef(r.author);
  if (!author) return null;
  const assetRef = r.cover?.asset;
  const cover =
    assetRef && typeof assetRef._ref === "string"
      ? {
          _type: "image" as const,
          asset: { _ref: assetRef._ref, _type: "reference" as const },
          ...(r.cover?.alt ? { alt: r.cover.alt } : {}),
        }
      : null;
  return {
    _id: r._id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    cover,
    publishedAt: r.publishedAt,
    ...(r.featured != null ? { featured: r.featured } : {}),
    likes: r.likes ?? 0,
    author,
    categories: (r.categories ?? []).flatMap((c) =>
      c.title && c.slug ? [{ _id: c._id, title: c.title, slug: c.slug }] : [],
    ),
    tags: (r.tags ?? []).flatMap((t) =>
      t.title && t.slug ? [{ _id: t._id, title: t.title, slug: t.slug }] : [],
    ),
  };
}

export interface PostFilters {
  q?: string;
  category?: string;
  tag?: string;
  page?: number;
  pageSize?: number;
}

export async function getPosts(
  filters: PostFilters = {},
): Promise<{ items: PostCard[]; total: number }> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? 9;
  const offset = (page - 1) * pageSize;
  const params: Record<string, string | number | boolean | string[] | null> = {
    offset,
    end: offset + pageSize,
    category: null,
    tag: null,
    q0: null,
    q1: null,
    q2: null,
    q3: null,
    q4: null,
  };
  const trimmedQ = filters.q?.trim();
  if (trimmedQ) {
    for (const [i, v] of arabicVariants(trimmedQ).entries()) {
      params[`q${i}`] = v;
    }
  }
  if (filters.category && filters.category !== "all")
    params.category = filters.category;
  if (filters.tag && filters.tag !== "all") params.tag = filters.tag;
  const result = await sanityFetch<POSTS_QUERY_RESULT>({
    query: POSTS_QUERY,
    params,
    tags: postTags,
  });
  return {
    items: result.items.flatMap((item) => {
      const card = toPostCard(item);
      return card ? [card] : [];
    }),
    total: result.total,
  };
}

export async function getFeaturedPosts(): Promise<PostCard[]> {
  const posts = await sanityFetch<POSTS_QUERY_RESULT["items"]>({
    query: FEATURED_POSTS_QUERY,
    tags: postTags,
  });
  return posts.flatMap((item) => {
    const card = toPostCard(item);
    return card ? [card] : [];
  });
}

export async function getMostRead(limit = 3): Promise<PostCard[]> {
  const posts = await sanityFetch<MOST_READ_QUERY_RESULT>({
    query: MOST_READ_QUERY,
    params: { limit },
    tags: postTags,
  });
  return posts.flatMap((item) => {
    const card = toPostCard(item);
    return card ? [card] : [];
  });
}

export interface PostIndex {
  _id: string;
  kind: "post" | "series";
  title: string;
  slug: string;
  excerpt?: string;
}

export async function getPostIndex(): Promise<PostIndex[]> {
  const [posts, allSeries] = await Promise.all([
    sanityFetch<POSTS_INDEX_QUERY_RESULT>({
      query: POSTS_INDEX_QUERY,
      tags: postTags,
    }),
    sanityFetch<SERIES_INDEX_QUERY_RESULT>({
      query: SERIES_INDEX_QUERY,
      tags: taxonomyTags,
    }),
  ]);
  return [
    ...posts.flatMap((p) =>
      p?._id && p?.title && p?.slug
        ? [
            {
              _id: p._id,
              kind: "post" as const,
              title: p.title,
              slug: p.slug,
              ...(p.excerpt ? { excerpt: p.excerpt } : {}),
            },
          ]
        : [],
    ),
    ...allSeries.flatMap((s) =>
      s?._id && s?.title && s?.slug
        ? [
            {
              _id: s._id,
              kind: "series" as const,
              title: s.title,
              slug: s.slug,
            },
          ]
        : [],
    ),
  ];
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const post = await sanityFetch<POST_BY_SLUG_QUERY_RESULT>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: postTags,
  });
  if (!post) return null;
  const card = toPostCard(post);
  if (!card) return null;
  return {
    ...card,
    body: (post.body ?? []) as PostBody,
    youtubeUrl: post.youtubeUrl,
    videoCaption: post.videoCaption,
    videoFileUrl: post.videoFileUrl,
    series:
      post.series?.title && post.series?.slug
        ? {
            _id: post.series._id,
            title: post.series.title,
            slug: post.series.slug,
            ...(post.series.description
              ? { description: post.series.description }
              : {}),
          }
        : null,
    seriesPosts: post.seriesPosts.flatMap((p) =>
      p.title && p.slug
        ? [
            {
              _id: p._id,
              title: p.title,
              slug: p.slug,
            },
          ]
        : [],
    ),
  };
}

export async function getRelatedPosts(
  slug: string,
  catIds: string[],
  tagIds: string[],
): Promise<PostCard[]> {
  const posts = await sanityFetch<POSTS_QUERY_RESULT["items"]>({
    query: RELATED_POSTS_QUERY,
    params: { slug, catIds, tagIds },
    tags: postTags,
  });
  return posts.flatMap((item) => {
    const card = toPostCard(item);
    return card ? [card] : [];
  });
}

export async function getCategories(): Promise<CategoryRef[]> {
  const result = await sanityFetch<CATEGORIES_QUERY_RESULT>({
    query: CATEGORIES_QUERY,
    tags: taxonomyTags,
  });
  return result.flatMap((c) =>
    c.title && c.slug
      ? [
          {
            _id: c._id,
            title: c.title,
            slug: c.slug,
            ...(c.description ? { description: c.description } : {}),
          },
        ]
      : [],
  );
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryRef | null> {
  const result = await sanityFetch<CATEGORY_BY_SLUG_QUERY_RESULT>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: taxonomyTags,
  });
  if (!result || !result.title || !result.slug) return null;
  return {
    _id: result._id,
    title: result.title,
    slug: result.slug,
    ...(result.description ? { description: result.description } : {}),
  };
}

export async function getTags(): Promise<TagRef[]> {
  const result = await sanityFetch<TAGS_QUERY_RESULT>({
    query: TAGS_QUERY,
    tags: taxonomyTags,
  });
  return result.flatMap((t) =>
    t.title && t.slug ? [{ _id: t._id, title: t.title, slug: t.slug }] : [],
  );
}

export async function getTagBySlug(slug: string): Promise<TagRef | null> {
  const result = await sanityFetch<TAG_BY_SLUG_QUERY_RESULT>({
    query: TAG_BY_SLUG_QUERY,
    params: { slug },
    tags: taxonomyTags,
  });
  if (!result || !result.title || !result.slug) return null;
  return { _id: result._id, title: result.title, slug: result.slug };
}

export async function getSeriesList(): Promise<SeriesRef[]> {
  const result = await sanityFetch<SERIES_LIST_QUERY_RESULT>({
    query: SERIES_LIST_QUERY,
    tags: taxonomyTags,
  });
  return result.flatMap((s) =>
    s.title && s.slug
      ? [
          {
            _id: s._id,
            title: s.title,
            slug: s.slug,
            ...(s.description ? { description: s.description } : {}),
          },
        ]
      : [],
  );
}

export interface SeriesShowcase extends SeriesRef {
  postCount: number;
  cover: CoverImage | null;
  topPosts: SeriesPostRef[];
}

export async function getSeriesShowcase(): Promise<SeriesShowcase[]> {
  const result = await sanityFetch<SERIES_LIST_QUERY_RESULT>({
    query: SERIES_LIST_QUERY,
    tags: taxonomyTags,
  });
  return result.flatMap((s) =>
    s.title && s.slug
      ? [
          {
            _id: s._id,
            title: s.title,
            slug: s.slug,
            ...(s.description ? { description: s.description } : {}),
            postCount: s.postCount ?? 0,
            cover:
              s.cover?.asset != null
                ? {
                    _type: "image",
                    asset: s.cover.asset,
                    ...(s.cover.alt ? { alt: s.cover.alt } : {}),
                  }
                : null,
            topPosts: (s.topPosts ?? []).flatMap((p) =>
              p.title && p.slug
                ? [{ _id: p._id, title: p.title, slug: p.slug }]
                : [],
            ),
          },
        ]
      : [],
  );
}

export async function getSeriesBySlug(
  slug: string,
): Promise<SeriesDetail | null> {
  const result = await sanityFetch<SERIES_BY_SLUG_QUERY_RESULT>({
    query: SERIES_BY_SLUG_QUERY,
    params: { slug },
    tags: taxonomyTags,
  });
  if (!result || !result.title || !result.slug) return null;
  return {
    _id: result._id,
    title: result.title,
    slug: result.slug,
    ...(result.description ? { description: result.description } : {}),
    posts: result.posts.flatMap((item) => {
      if (!item) return [];
      const card = toPostCard(item);
      return card ? [card] : [];
    }),
  };
}

type AuthorResult = NonNullable<AUTHOR_BY_SLUG_QUERY_RESULT>;

export async function getAuthorBySlug(
  slug: string,
): Promise<AuthorDetail | null> {
  const result: AuthorResult | null =
    await sanityFetch<AUTHOR_BY_SLUG_QUERY_RESULT>({
      query: AUTHOR_BY_SLUG_QUERY,
      params: { slug },
      tags: taxonomyTags,
    });
  if (!result || !result.name || !result.slug) return null;
  return {
    _id: result._id,
    name: result.name,
    slug: result.slug,
    ...(result.jobTitle ? { jobTitle: result.jobTitle } : {}),
    ...(result.bio ? { bio: result.bio } : {}),
    ...(result.avatar ? { avatar: result.avatar } : {}),
    ...(result.x ? { x: result.x } : {}),
    ...(result.github ? { github: result.github } : {}),
    ...(result.website ? { website: result.website } : {}),
    posts: result.posts.flatMap((item) => {
      const card = toPostCard(item);
      return card ? [card] : [];
    }),
  };
}

export function plainTextFromBody(
  body: Array<{
    _type: string;
    children?: Array<{ text?: string }>;
  }>,
): string {
  return body
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children.map((c) => c.text ?? "").join("");
      }
      return "";
    })
    .join("\n");
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function headingsFromBody(
  body: Array<{
    _type: string;
    style?: string;
    _key: string;
    children?: Array<{ text?: string }>;
  }>,
): TocHeading[] {
  return body
    .filter(
      (b) => b._type === "block" && (b.style === "h2" || b.style === "h3"),
    )
    .map((b) => ({
      id: b._key,
      text: (b.children ?? []).map((c) => c.text ?? "").join("") || "-",
      level: b.style === "h2" ? 2 : 3,
    }));
}
