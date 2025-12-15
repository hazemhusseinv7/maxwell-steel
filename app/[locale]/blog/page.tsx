"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { useLocale, useTranslations } from "next-intl";

import { Pagination } from "@heroui/react";

import Loading from "@/components/Loading";

import { getBlogPosts } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

import { GoChevronRight } from "react-icons/go";

const POSTS_PER_PAGE = 6;

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("Blog");

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await getBlogPosts(locale);
        setAllPosts(posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setAllPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [locale]);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <main>
      {/* Card Blog */}
      <div className="mx-auto max-w-340 px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        {/* Title */}
        <div className="relative flex w-full flex-col items-center justify-center pt-32 pb-32 sm:pt-40">
          <h1 className="relative max-w-[12ch] text-4xl leading-tight uppercase opacity-70 lg:text-8xl">
            {t("title")}
          </h1>
        </div>
        {/* End Title */}
        {loading ? (
          <Loading id="blog" className="min-h-120 lg:min-h-170" />
        ) : !allPosts || allPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-600 dark:text-neutral-400">
              {t("not-found")}
            </p>
          </div>
        ) : (
          <>
            {(() => {
              return (
                <div className="space-y-10">
                  {/* Grid */}
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map(({ _id, title, slug, mainImage }) => (
                      // Card
                      <Link
                        className="group rounded-xl bg-gray-200/70 p-5 transition hover:bg-gray-300/70 focus:bg-gray-100 focus:outline-hidden dark:bg-white/5 dark:hover:bg-white/20 dark:focus:bg-white/10"
                        href={`/blog/${slug.current}`}
                        key={_id}
                      >
                        <div className="aspect-16/10">
                          <Image
                            className="size-full rounded-xl object-cover"
                            width={400}
                            height={250}
                            src={urlFor(mainImage).width(400).height(250).url()}
                            alt={title}
                          />
                        </div>
                        <span className="mt-5 block text-xl text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                          {title}
                        </span>
                        <div className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
                          {t("read-more")}
                          <GoChevronRight className="size-4 shrink-0 transition ease-in-out group-hover:translate-x-1 group-focus:-translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 rtl:group-focus:translate-x-1" />
                        </div>
                      </Link>
                      // End Card
                    ))}
                  </div>
                  {/* End Grid */}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center">
                      <Pagination
                        page={currentPage}
                        total={totalPages}
                        showControls
                        showShadow
                        color="primary"
                        size="lg"
                        classNames={{
                          prev: "rotate-180",
                          next: "rotate-180",
                        }}
                        onChange={setCurrentPage}
                      />
                    </div>
                  )}
                  {/* End Pagination */}
                </div>
              );
            })()}
          </>
        )}
      </div>
      {/* End Card Blog */}
    </main>
  );
}
