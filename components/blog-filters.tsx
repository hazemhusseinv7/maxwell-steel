"use client";

import { Button } from "@heroui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { CATEGORY_ICON, TAG_ICON } from "@/lib/option-icons";
import type { CategoryRef, TagRef } from "@/sanity/lib/queries";
import { FilterSelect } from "./form-select";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

interface Props {
  q: string;
  category: string;
  tag: string;
  categories: CategoryRef[];
  tags: TagRef[];
}

export function BlogFilters({ q, category, tag, categories, tags }: Props) {
  return (
    <form
      method="get"
      className="texture-panel border-border bg-surface-secondary grid items-end gap-3 rounded-none border p-4 shadow-surface card-gradient sm:grid-cols-[1fr_auto_auto_auto]"
    >
      <input
        type="search"
        name="q"
        defaultValue={q}
        placeholder="ابحث في العقارات والمقالات…"
        aria-label="البحث في العقارات والمقالات"
        className={inputClass}
      />
      <FilterSelect
        name="category"
        label="التصنيف"
        allLabel="كل التصنيفات"
        defaultValue={category || "all"}
        options={categories.map((c) => ({
          value: c.slug,
          label: c.title,
          icon: CATEGORY_ICON,
        }))}
      />
      <FilterSelect
        name="tag"
        label="الوسم"
        allLabel="كل الوسوم"
        defaultValue={tag || "all"}
        options={tags.map((t) => ({
          value: t.slug,
          label: t.title,
          icon: TAG_ICON,
        }))}
      />
      <Button type="submit" variant="primary">
        <HiMagnifyingGlass className="size-4" aria-hidden="true" />
        بحث
      </Button>
    </form>
  );
}
