"use client";

import { useEffect } from "react";

// view count: one increment per browser session.
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `maqrat:viewed:${slug}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      return;
    }
    fetch(`/api/posts/${encodeURIComponent(slug)}/view`, {
      method: "POST",
    }).catch(() => {});
  }, [slug]);
  return null;
}
