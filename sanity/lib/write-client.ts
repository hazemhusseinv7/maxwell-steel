import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Write client for server actions / route handlers only.
// Token is resolved lazily so missing envs fail at call time,
// not at build time.
export function getWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error("Missing environment variable: SANITY_API_TOKEN");
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    token,
  });
}
