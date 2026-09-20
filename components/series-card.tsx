"use client";

import { Tooltip } from "@heroui/react";
import NextLink from "next/link";
import { HiArrowLeft, HiQueueList } from "react-icons/hi2";

import type { SeriesShowcase } from "@/lib/blog";
import { ARTICLE_FORMS, formatCountAr } from "@/lib/formatters";
import { PostCover } from "./post-cover";

export function SeriesCard({ series }: { series: SeriesShowcase }) {
  const overflow = Math.max(0, series.postCount - series.topPosts.length);
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label={series.title}>
        <NextLink
          href={`/blog/series/${series.slug}`}
          className="texture-panel border-border bg-surface shadow-surface card-gradient group hover:bg-surface-secondary block rounded-none border p-5 transition-all duration-300 hover:-translate-y-1"
        >
          <PostCover
            cover={series.cover}
            title={series.title}
            variant="series"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="[&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-105"
          />
          <h3 className="font-display group-hover:text-accent flex items-center gap-1.5 text-lg font-bold transition-colors">
            <HiQueueList
              className="text-accent size-4 shrink-0"
              aria-hidden="true"
            />
            {series.title}
          </h3>
          {series.description ? (
            <p className="text-muted mt-1 text-sm leading-7">
              {series.description}
            </p>
          ) : null}
          <p className="text-muted mt-2 flex items-center gap-1 text-xs">
            {formatCountAr(series.postCount, ARTICLE_FORMS)}
            <HiArrowLeft
              className="size-3.5 shrink-0 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </p>
        </NextLink>
      </Tooltip.Trigger>
      <Tooltip.Content placement="bottom" className="max-w-64">
        <p className="mb-1 text-xs font-bold">{series.title}</p>
        <ol className="list-inside list-[arabic-indic] space-y-0.5 text-xs leading-6">
          {series.topPosts.map((p) => (
            <li key={p._id} className="truncate">
              {p.title}
            </li>
          ))}
        </ol>
        {overflow > 0 ? (
          <p className="text-muted mt-1 text-xs">
            + {formatCountAr(overflow, ARTICLE_FORMS)}
          </p>
        ) : null}
      </Tooltip.Content>
    </Tooltip>
  );
}
