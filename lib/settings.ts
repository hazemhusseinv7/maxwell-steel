import { sanityFetch } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export async function getSiteSettings(): Promise<SITE_SETTINGS_QUERY_RESULT> {
  return sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });
}

type TextBlock = {
  children?: Array<{ text?: string }>;
};

export function blockLines(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks.flatMap((b) => {
    const line = ((b as TextBlock)?.children ?? [])
      .map((c) => c?.text ?? "")
      .join("")
      .trim();
    return line ? [line] : [];
  });
}
