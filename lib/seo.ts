import type { Metadata } from "next";

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      en: `/en${path}`,
      ar: `/ar${path}`,
      "x-default": `/ar${path}`,
    },
  } satisfies Metadata["alternates"];
}
