"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { MdMarkChatRead } from "react-icons/md";
import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { PostSearch } from "@/components/post-search";
import type { PostIndex } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

type HeroImageValue = NonNullable<SITE_SETTINGS_QUERY_RESULT>["heroImage"];

interface HeroPost {
  title: string;
  excerpt: string;
  slug: string;
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={`${i}-${line}`}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </>
  );
}

export function HeroImage({ image }: { image?: HeroImageValue | null }) {
  if (!image?.asset) return null;
  return (
    <div className="relative lg:px-40">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <FullWidthDivider className="-top-px" />
      <div className="relative aspect-video overflow-hidden px-4 *:pointer-events-none *:select-none">
        <div className="absolute inset-x-0 top-10 bottom-0 md:top-16">
          <Image
            alt="صورة تعريفية"
            src={urlFor(image).width(1600).url()}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
      <FullWidthDivider className="-bottom-px" />
    </div>
  );
}

export function HeroSection({
  post,
  titleLines,
  descriptionLines,
  index,
}: {
  post: HeroPost | null;
  titleLines: string[];
  descriptionLines: string[];
  index: PostIndex[];
}) {
  const router = useRouter();
  const titleContent =
    titleLines.length > 0 ? (
      <Lines lines={titleLines} />
    ) : (
      (post?.title ?? null)
    );
  const descriptionContent =
    descriptionLines.length > 0 ? (
      <Lines lines={descriptionLines} />
    ) : (
      (post?.excerpt ?? null)
    );

  return (
    <section>
      <div className="texture-band bg-accent-soft border-border relative flex flex-col items-center justify-center gap-5 rounded-none border px-4 py-12 md:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-1 size-full overflow-hidden"
        >
          <div
            className={cn(
              "absolute -inset-x-20 inset-y-0 z-0 rounded-full",
              "bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_12%,transparent),transparent,transparent)]",
              "blur-[50px]",
            )}
          />
          <div className="via-border to-border absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent md:left-8" />
          <div className="via-border to-border absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent md:right-8" />
          <div className="via-border/50 to-border/50 absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent md:left-12" />
          <div className="via-border/50 to-border/50 absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent md:right-12" />
        </div>
        {post ? (
          <button
            type="button"
            onClick={() => router.push(`/blog/${post.slug}`)}
            className={cn(
              "group border-border bg-surface shadow-surface mx-auto flex w-fit cursor-pointer items-center gap-3 rounded-md border p-1",
              "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out",
            )}
          >
            <div className="border-border bg-surface rounded-md border px-1.5 py-0.5 shadow-sm">
              <p className="text-xs">جديد</p>
            </div>

            <span className="max-w-56 truncate text-xs">{post.title}</span>
            <span className="block h-5 border-s" />

            <div className="pe-1">
              <HiArrowLeft className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:-translate-x-1" />
            </div>
          </button>
        ) : null}

        {titleContent ? (
          <h1
            className={cn(
              "font-display text-foreground max-w-2xl text-center text-3xl font-bold text-balance md:text-5xl lg:text-6xl",
              "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-100 duration-500 ease-out",
            )}
          >
            {titleContent}
          </h1>
        ) : null}

        {descriptionContent ? (
          <p
            className={cn(
              "text-muted text-center text-sm font-normal tracking-wide sm:text-lg",
              "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-200 duration-500 ease-out",
            )}
          >
            {descriptionContent}
          </p>
        ) : null}

        <PostSearch index={index} />

        <div className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards flex w-fit items-center justify-center gap-3 pt-2 delay-300 duration-500 ease-out">
          <Button
            variant="secondary"
            onPress={() => router.push("/support/submit")}
          >
            <MdMarkChatRead data-icon="inline-start" /> استشارة عقارية
          </Button>
          <Button
            variant="primary"
            onPress={() =>
              router.push(post ? `/blog/${post.slug}` : "/support/submit")
            }
          >
            {post ? "اقرأ المقال" : "أرسل طلب"}{" "}
            <HiArrowLeft data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
