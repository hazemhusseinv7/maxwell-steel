import type { Metadata } from "next";

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: path || "/",
    languages: {
      "x-default": path || "/",
    },
  } satisfies Metadata["alternates"];
}
