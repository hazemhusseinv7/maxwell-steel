import Link from "next/link";
import Image from "next/image";

import { getLocale, getTranslations } from "next-intl/server";

import { PortableText } from "@portabletext/react";

import Category from "../Category";
import Author from "../Author";

import { getBlogPost, getBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

import { GoChevronLeft } from "react-icons/go";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="mx-auto rounded-lg"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

// Generate static params for SSG
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
            className="mt-4 inline-flex items-center text-blue-600 hover:underline"
          >
            {t("return")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
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
                  {new Date(post.publishedAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}

              <article className="prose prose-lg dark:prose-invert max-w-none">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </article>

              {post.author && (
                // Avatar Media
                <Author
                  className="flex items-center justify-between"
                  name={post.author.name}
                  image={post.author.image}
                  bio={post.author.bio}
                />
                // End Avatar Media
              )}

              {post.categories && (
                <div className="flex flex-col gap-y-5 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
                  {/* Categories Tags */}
                  <div>
                    {post.categories.map((category, i) => (
                      <Category
                        key={i}
                        className="rounded-full"
                        title={category.title}
                        description={category.description}
                      />
                    ))}
                  </div>
                  {/* End Categories Tags */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Blog Article */}
    </main>
  );
}
