"use client";

import { ToggleButton, toast } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

import { formatNumberAr } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface Props {
  slug: string;
  initialLikes: number;
  compact?: boolean;
}

export function LikeButton({ slug, initialLikes, compact }: Props) {
  const storageKey = `liked:${slug}`;
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikes);

  useEffect(() => {
    try {
      setLiked(window.localStorage.getItem(storageKey) === "1");
    } catch {
      setLiked(false);
    }
  }, [storageKey]);

  async function onChange(next: boolean) {
    setLiked(next);
    setCount((c) => Math.max(0, c + (next ? 1 : -1)));
    try {
      const res = await fetch(`/api/posts/${encodeURIComponent(slug)}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta: next ? 1 : -1 }),
      });
      if (!res.ok) throw new Error("like failed");
      const data = (await res.json()) as { likes: number };
      setCount(Math.max(0, data.likes));
      window.localStorage.setItem(storageKey, next ? "1" : "0");
    } catch {
      setLiked(!next);
      setCount(initialLikes);
      toast("تعذر تسجيل الإعجاب. حاول مجدداً.", { variant: "danger" });
    }
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", compact && "text-xs")}
    >
      <ToggleButton
        aria-label={liked ? "إلغاء الإعجاب" : "أعجبني"}
        isSelected={liked}
        onChange={onChange}
        variant="ghost"
        size={compact ? "sm" : "md"}
        isIconOnly
        className="like-button"
      >
        {liked ? (
          <HiHeart className="text-danger size-4" />
        ) : (
          <HiOutlineHeart className="size-4" />
        )}
      </ToggleButton>
      <span
        className="text-muted inline-block min-w-[3ch] text-center tabular-nums"
        aria-live="polite"
      >
        {formatNumberAr(count)}
      </span>
    </span>
  );
}
