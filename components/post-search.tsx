"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  HiDocumentText,
  HiMagnifyingGlass,
  HiQueueList,
} from "react-icons/hi2";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import type { PostIndex } from "@/lib/blog";
import { normalizeArabic } from "@/lib/search";
import { cn } from "@/lib/utils";

function arabicFilter(value: string, search: string): number {
  const q = normalizeArabic(search);
  if (!q) return 1;
  return normalizeArabic(value).includes(q) ? 1 : 0;
}

export function PostSearch({ index }: { index: PostIndex[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (kind: "post" | "series", slug: string) => {
      setOpen(false);
      router.push(kind === "series" ? `/blog/series/${slug}` : `/blog/${slug}`);
    },
    [router],
  );

  const posts = index.filter((p) => p.kind === "post");
  const allSeries = index.filter((p) => p.kind === "series");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "border-border bg-surface text-muted shadow-surface mx-auto flex w-full max-w-2xl cursor-pointer items-center gap-3 rounded-none border px-5 py-4 text-base",
          "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-[250ms] duration-500 ease-out",
        )}
      >
        <HiMagnifyingGlass className="size-5 shrink-0" aria-hidden="true" />
        <span>ابحث في المقالات…</span>
        <span className="ms-auto">
          <Kbd dir="ltr" className="border-border bg-background border">
            ⌘K
          </Kbd>
        </span>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        label="البحث في المقالات"
      >
        <Command filter={arabicFilter} label="البحث في المقالات">
          <CommandInput placeholder="ابحث بعنوان المقال…" />
          <CommandList>
            <CommandEmpty>لا توجد نتائج مطابقة.</CommandEmpty>
            <CommandGroup heading="المقالات">
              {posts.map((p) => (
                <CommandItem
                  key={p._id}
                  value={`${p.title} ${p.excerpt ?? ""}`}
                  onSelect={() => go("post", p.slug)}
                  className="gap-2.5"
                >
                  <HiDocumentText
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="line-clamp-1">{p.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {allSeries.length > 0 ? (
              <CommandGroup heading="السلاسل">
                {allSeries.map((s) => (
                  <CommandItem
                    key={s._id}
                    value={s.title}
                    onSelect={() => go("series", s.slug)}
                    className="gap-2.5"
                  >
                    <HiQueueList
                      className="text-bronze size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="line-clamp-1">{s.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
