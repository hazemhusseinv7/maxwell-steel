import { EmptyState } from "@heroui/react";
import type { ReactNode } from "react";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { CornerFrame } from "@/components/corner-frame";
import { PostCard } from "@/components/post-card";
import { ARTICLE_FORMS, formatCountAr } from "@/lib/formatters";
import type { PostCard as PostCardType } from "@/sanity/lib/queries";

interface Props {
  kicker: string;
  title: string;
  description?: string;
  posts: PostCardType[];
  emptyMessage: string;
  extra?: ReactNode;
  heroSide?: ReactNode;
}

export function ArchiveLayout({
  kicker,
  title,
  description,
  posts,
  emptyMessage,
  extra,
  heroSide,
}: Props) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <div className="texture-band bg-accent-soft border-border shadow-surface rounded-none border p-6 sm:p-8">
        <div className="flex items-start gap-5">
          {heroSide ? <div className="shrink-0">{heroSide}</div> : null}
          <div className="min-w-0 flex-1">
            <p className="text-muted text-sm">{kicker}</p>
            <h1 className="font-display mt-2 text-3xl font-extrabold">
              {title}
            </h1>
            {description ? (
              <p className="text-muted mt-2 max-w-2xl leading-8">
                {description}
              </p>
            ) : null}
            <p className="text-muted mt-2 text-sm">
              {formatCountAr(posts.length, ARTICLE_FORMS)}
            </p>
          </div>
        </div>
      </div>
      {extra}
      {posts.length === 0 ? (
        <CornerFrame>
          <EmptyState className="border-border text-muted mt-6 flex flex-col items-center gap-2 rounded-none border border-dashed px-4 py-12 text-center">
            <HiDocumentMagnifyingGlass className="size-8" aria-hidden="true" />
            <p>{emptyMessage}</p>
          </EmptyState>
        </CornerFrame>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
