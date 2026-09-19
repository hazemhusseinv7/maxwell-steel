"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function Toc({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="محتويات المقال"
      className="border-border bg-surface shadow-surface card-gradient rounded-none border p-4 lg:sticky lg:top-24"
    >
      <p className="font-display mb-3 font-bold">محتويات المقال</p>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ps-4" : undefined}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "true" : undefined}
              className={cn(
                "hover:text-accent block leading-7",
                active === h.id ? "text-accent font-bold" : "text-muted",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
