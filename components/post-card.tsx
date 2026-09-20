import { Card, Chip, Tooltip } from "@heroui/react";
import NextLink from "next/link";
import { BsCalendar2Week } from "react-icons/bs";
import { HiTag, HiUser } from "react-icons/hi2";
import { countWords, formatDateAr, readingTimeAr } from "@/lib/formatters";
import type { PostCard as PostCardType } from "@/sanity/lib/queries";
import { AuthorPopover } from "./author-popover";
import { CornerFrame } from "./corner-frame";
import { LikeButton } from "./like-button";
import { LogoPattern } from "./logo-pattern";
import { PostCover } from "./post-cover";

export function PostCard({
  post,
  className,
  coverTitleClassName,
}: {
  post: PostCardType;
  className?: string;
  coverTitleClassName?: string;
}) {
  return (
    <CornerFrame className={className}>
      <Card className="group shadow-surface card-gradient relative isolate flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-secondary">
        <LogoPattern className="-z-10 opacity-[0.05]" />
        <NextLink
          href={`/blog/${post.slug}`}
          aria-label={post.title}
          className="absolute inset-0 rounded-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        />
        <NextLink href={`/blog/${post.slug}`} className="block">
          <PostCover
            cover={post.cover}
            title={post.title}
            titleClassName={coverTitleClassName}
          />
        </NextLink>
        <Card.Header className="grow flex-col items-start gap-2">
          <div className="relative flex flex-wrap items-center gap-2">
            {post.categories.map((c) => (
              <NextLink key={c._id} href={`/blog/category/${c.slug}`}>
                <Chip size="sm" color="accent" variant="soft">
                  <HiTag className="size-3 shrink-0" aria-hidden="true" />
                  {c.title}
                </Chip>
              </NextLink>
            ))}
          </div>
          <NextLink href={`/blog/${post.slug}`}>
            <Card.Title className="font-display group-hover:text-accent text-lg leading-8 transition-colors">
              {post.title}
            </Card.Title>
          </NextLink>
          <Card.Description className="line-clamp-2">
            {post.excerpt}
          </Card.Description>
        </Card.Header>
        <Card.Footer className="text-muted mt-auto items-center gap-2 text-xs">
          <AuthorPopover author={post.author}>
            <span className="hover:text-accent relative flex min-w-0 items-center gap-1">
              <HiUser className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{post.author.name}</span>
            </span>
          </AuthorPopover>
          <span className="relative ms-auto flex shrink-0 items-center gap-2">
            <Tooltip delay={0}>
              <Tooltip.Trigger
                aria-label={`${formatDateAr(post.publishedAt)} - ${readingTimeAr(countWords(post.excerpt))}`}
              >
                <BsCalendar2Week
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              </Tooltip.Trigger>
              <Tooltip.Content>
                {formatDateAr(post.publishedAt)} -{" "}
                {readingTimeAr(countWords(post.excerpt))}
              </Tooltip.Content>
            </Tooltip>
            <LikeButton slug={post.slug} initialLikes={post.likes} compact />
          </span>
          <time dateTime={post.publishedAt} className="sr-only">
            {formatDateAr(post.publishedAt)}
          </time>
        </Card.Footer>
      </Card>
    </CornerFrame>
  );
}
