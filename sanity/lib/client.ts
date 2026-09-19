import "server-only";

import { createClient, type QueryParams } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Private dataset: every read goes through the server with a token.
// Never import this file (or sanityFetch) from a client component.
const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

function requireToken(): string {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error("Missing environment variable: SANITY_API_TOKEN");
  }
  return token;
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, string | number | boolean | string[] | null>;
  tags?: string[];
}) {
  return readClient.fetch<QueryResponse>(query, params as QueryParams, {
    token: requireToken(),
    next: { tags },
  });
}
