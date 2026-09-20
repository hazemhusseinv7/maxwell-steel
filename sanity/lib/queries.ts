import { groq } from "next-sanity";

import type { AUTHOR_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

export type AuthorAvatar = NonNullable<AUTHOR_BY_SLUG_QUERY_RESULT>["avatar"];

export interface AuthorRef {
  _id: string;
  name: string;
  slug: string;
  jobTitle?: string;
  bio?: string | null;
  avatar?: AuthorAvatar | null;
}

const postCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  cover,
  publishedAt,
  featured,
  likes,
  "author": author->{ _id, name, "slug": slug.current, jobTitle, avatar },
  "categories": categories[]->{ _id, title, "slug": slug.current },
  "tags": tags[]->{ _id, title, "slug": slug.current }
`;

const publishedFilter = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

const listFilter = `
  ($category == null || $category in categories[]->slug.current)
  && ($tag == null || $tag in tags[]->slug.current)
  && ($q0 == null || (
    title match $q0 + "*" || excerpt match $q0 + "*" || tags[]->title match $q0 + "*"
    || ($q1 != null && (title match $q1 + "*" || excerpt match $q1 + "*" || tags[]->title match $q1 + "*"))
    || ($q2 != null && (title match $q2 + "*" || excerpt match $q2 + "*" || tags[]->title match $q2 + "*"))
    || ($q3 != null && (title match $q3 + "*" || excerpt match $q3 + "*" || tags[]->title match $q3 + "*"))
    || ($q4 != null && (title match $q4 + "*" || excerpt match $q4 + "*" || tags[]->title match $q4 + "*"))
  ))
`;

export const POSTS_QUERY = groq`{
  "items": *[${publishedFilter} && ${listFilter}] | order(publishedAt desc) [$offset...$end] { ${postCardFields} },
  "total": count(*[${publishedFilter} && ${listFilter}])
}`;

export const FEATURED_POSTS_QUERY = groq`
  *[${publishedFilter} && featured == true] | order(publishedAt desc) [0...4] { ${postCardFields} }
`;

export const MOST_READ_QUERY = groq`
  *[${publishedFilter}] | order(coalesce(views, 0) desc, coalesce(likes, 0) desc, publishedAt desc) [0...$limit] { ${postCardFields} }
`;

export const POSTS_INDEX_QUERY = groq`
  *[${publishedFilter}] | order(publishedAt desc) [0...200] {
    _id, title, "slug": slug.current, excerpt
  }
`;

export const SERIES_INDEX_QUERY = groq`
  *[_type == "series"] | order(title asc) [0...100] {
    _id, title, "slug": slug.current
  }
`;

export interface PostIndexItem {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
}

export const POST_BY_SLUG_QUERY = groq`
  *[${publishedFilter} && slug.current == $slug][0] {
    ${postCardFields},
    "author": author->{ _id, name, "slug": slug.current, jobTitle, avatar, bio },
    body,
    youtubeUrl,
    videoCaption,
    "videoFileUrl": videoFile.asset->url,
    "series": series->{ _id, title, "slug": slug.current, description },
    "seriesPosts": array::unique(
      coalesce(series->posts[]->{ _id, title, "slug": slug.current }, [])
    )
      + (*[_type == "post" && defined(series) && series._ref == ^.series._ref && !(_id in ^.series->posts[]._ref) && publishedAt <= now()]
        | order(publishedAt asc) { _id, title, "slug": slug.current })
  }
`;

export const RELATED_POSTS_QUERY = groq`
  *[${publishedFilter} && slug.current != $slug
    && (count(categories[]._ref[@ in $catIds]) > 0 || count(tags[]._ref[@ in $tagIds]) > 0)
  ] | order(publishedAt desc) [0...3] { ${postCardFields} }
`;

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) { _id, title, "slug": slug.current, description }
`;

export const CATEGORY_BY_SLUG_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] { _id, title, "slug": slug.current, description }
`;

export const TAGS_QUERY = groq`
  *[_type == "tag"] | order(title asc) { _id, title, "slug": slug.current }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    gaMeasurementId,
    gtmId,
    siteTitle,
    siteDescription,
    heroImage,
    partnerLogos,
    logosTitle,
    propertiesUrl,
    socialLinks
  }
`;
export const TAG_BY_SLUG_QUERY = groq`
  *[_type == "tag" && slug.current == $slug][0] { _id, title, "slug": slug.current }
`;

export const SERIES_LIST_QUERY = groq`
  *[_type == "series"] | order(title asc) {
    _id, title, "slug": slug.current, description, cover,
    "postCount": count(array::unique(array::compact(posts[]->._id)))
      + count(*[_type == "post" && defined(series) && series._ref == ^._id && !(_id in ^.posts[]._ref) && publishedAt <= now()]),
    "topPosts": array::unique(coalesce(posts[]->{ _id, title, "slug": slug.current }, []))[0...5]
  }
`;

export const SERIES_BY_SLUG_QUERY = groq`
  *[_type == "series" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description,
    "posts": array::unique(coalesce(posts[]->{ ${postCardFields} }, []))
      + (*[_type == "post" && defined(series) && series._ref == ^._id && !(_id in ^.posts[]._ref) && publishedAt <= now()]
        | order(publishedAt asc) { ${postCardFields} })
  }
`;

export const AUTHOR_BY_SLUG_QUERY = groq`
  *[_type == "author" && slug.current == $slug][0] {
    _id, name, "slug": slug.current, jobTitle, bio, avatar, x, github, website,
    "posts": *[_type == "post" && author._ref == ^._id && publishedAt <= now()]
      | order(publishedAt desc) { ${postCardFields} }
  }
`;

export interface CoverImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

export interface CategoryRef {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface TagRef {
  _id: string;
  title: string;
  slug: string;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover: CoverImage | null;
  publishedAt: string;
  featured?: boolean;
  likes: number;
  author: AuthorRef;
  categories: CategoryRef[];
  tags: TagRef[];
}

export interface SeriesRef {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface SeriesPostRef {
  _id: string;
  title: string;
  slug: string;
}

export type PostBody = Array<
  Record<string, unknown> & { _type: string; _key: string }
>;

export interface PostDetail extends PostCard {
  body: PostBody;
  youtubeUrl: string | null;
  videoCaption: string | null;
  videoFileUrl: string | null;
  series: SeriesRef | null;
  seriesPosts: SeriesPostRef[];
}

export interface AuthorDetail {
  _id: string;
  name: string;
  slug: string;
  jobTitle?: string;
  bio?: string;
  avatar?: NonNullable<AUTHOR_BY_SLUG_QUERY_RESULT>["avatar"];
  x?: string;
  github?: string;
  website?: string;
  posts: PostCard[];
}

export interface SeriesDetail extends SeriesRef {
  posts: PostCard[];
}
