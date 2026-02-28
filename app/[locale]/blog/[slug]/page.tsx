import Link from "next/link";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PortableText } from "@/lib/PortableTextComponents";
import Category from "../Category";
import Author from "../Author";
import { getBlogPost, getBlogPosts } from "@/lib/sanity/queries";
import { GoChevronLeft } from "react-icons/go";
import { urlFor } from "@/lib/sanity/image";

function toPlainText(blocks: any[] = []) {
  if (!blocks) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join(" ")
    .slice(0, 160);
}

export async function generateStaticParams() {
  const languages = ["en", "ar"];
  const allPosts = [];

  for (const locale of languages) {
    const posts = await getBlogPosts(locale);
    if (posts) {
      allPosts.push(
        ...posts.map((post) => ({
          slug: post.slug.current,
        })),
      );
    }
  }

  return allPosts;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getBlogPost(slug, locale);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = toPlainText(post.content) || post.title || "Blog Post";

  let imageUrl: string | undefined = undefined;
  if (post.mainImage && urlFor) {
    try {
      imageUrl = urlFor(post.mainImage).width(1200).height(630).url();
    } catch (e) {
      console.warn("Could not generate image URL", e);
    }
  }

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: imageUrl ? [imageUrl] : [],
      locale: locale === "ar" ? "ar" : "en",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await getBlogPost(slug, locale);
  const t = await getTranslations("Blog.post");

  if (!post) {
    return (
      <main>
        <div className="mx-auto max-w-340 p-4 text-center sm:p-6 lg:p-20">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("not-found")}
          </h1>
          <Link
            href="/blog"
            className="mt-4 inline-flex items-center text-blue-600 transition hover:underline"
          >
            {t("return")}
          </Link>
        </div>
      </main>
    );
  }

  const description = toPlainText(post.content);
  let jsonLdImage: string | undefined = undefined;
  if (post.mainImage && urlFor) {
    try {
      jsonLdImage = urlFor(post.mainImage).width(1200).height(630).url();
    } catch (e) {
      console.error(e);
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Anonymous",
    },
    image: jsonLdImage,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Blog Article */}
      <div className="mx-auto min-h-screen max-w-340 px-4 pt-28 pb-10 sm:px-6 lg:px-20">
        <div className="lg:col-span-2">
          <div className="py-8 lg:pe-8">
            <div className="space-y-5 lg:space-y-8">
              <Link
                className="inline-flex items-center gap-x-1.5 text-sm text-gray-600 decoration-2 hover:underline focus:underline focus:outline-hidden dark:text-blue-500"
                href="/blog"
              >
                <GoChevronLeft className="size-4 shrink-0 rtl:rotate-180" />
                {t("return")}
              </Link>

              <h1 className="text-3xl font-bold lg:text-5xl dark:text-white">
                {post.title}
              </h1>

              {post.publishedAt && (
                <span className="block text-xs text-gray-800 sm:text-sm dark:text-neutral-200">
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}

              <article className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText value={post.content} />
              </article>

              {post.author && (
                <Author
                  className="flex items-center justify-between"
                  name={post.author.name}
                  image={post.author.image}
                  bio={post.author.bio}
                />
              )}

              {post.categories && (
                <div className="flex flex-row flex-wrap gap-3">
                  {post.categories.map((category, i) => (
                    <Category
                      key={i}
                      className="rounded-full"
                      title={category.title}
                      description={category.description}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
