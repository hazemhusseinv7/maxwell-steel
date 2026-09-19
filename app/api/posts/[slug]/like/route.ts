import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { z } from "zod";

import { sanityFetch } from "@/sanity/lib/client";
import { getWriteClient } from "@/sanity/lib/write-client";

const bodySchema = z.object({ delta: z.union([z.literal(1), z.literal(-1)]) });

const ID_LIKES_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{_id, likes}`;

// Anonymous likes (no user accounts by design). No throttling - abuse
// caveat documented; like traffic never busts the blog cache.
// Stored count is clamped at 0: decrementing at 0 is a no-op (a concurrent
// double-vote may still overcount by 1, accepted for anonymous likes).
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  let delta: 1 | -1;
  try {
    const json: unknown = await req.json();
    delta = bodySchema.parse(json).delta;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const doc0 = await sanityFetch<{ _id: string; likes: number | null } | null>({
    query: ID_LIKES_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!doc0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const next = Math.max(0, (doc0.likes ?? 0) + delta);

  // Top-level named query so Sanity TypeGen picks it up.
  await getWriteClient()
    .patch(doc0._id)
    .setIfMissing({ likes: 0 })
    .set({ likes: next })
    .commit();

  return NextResponse.json({ likes: next });
}
