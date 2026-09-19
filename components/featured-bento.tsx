import NextLink from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import type { PostCard as PostCardType } from "@/sanity/lib/queries";
import { CornerFrame } from "./corner-frame";
import { PostCard } from "./post-card";

export function FeaturedBento({ posts }: { posts: PostCardType[] }) {
  if (posts.length === 0) return null;
  const isLeadFeatured = posts.length === 1 || posts.length >= 3;
  const [lead, ...rest] = posts;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <PostCard
        key={lead._id}
        post={lead}
        className={isLeadFeatured ? "sm:col-span-2 lg:col-span-2" : undefined}
        coverTitleClassName={
          isLeadFeatured
            ? "text-2xl leading-10 md:text-3xl md:leading-[2.75rem]"
            : undefined
        }
      />
      {rest.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <CornerFrame
        className={cn(
          posts.length <= 2 && "col-span-full sm:col-span-2 lg:col-span-1",
        )}
      >
        <NextLink
          href="#articles"
          className="text-muted hover:border-accent hover:text-accent border-border flex min-h-44 flex-col items-center justify-center gap-2 rounded-none border border-dashed transition-colors"
        >
          <HiArrowLeft className="size-6" aria-hidden="true" />
          <span className="text-sm font-bold">تصفح جميع المقالات</span>
        </NextLink>
      </CornerFrame>
    </div>
  );
}
