import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { groq } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/client";
import { getWriteClient } from "@/sanity/lib/write-client";

const VIEW_ID_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]._id`;

// Anonymous view counting (one increment per browser session, enforced
// client-side via sessionStorage). No throttling - same accepted caveats as
// the like route: abuse possible, traffic never busts the blog cache.
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const id = await sanityFetch<string | null>({
    query: VIEW_ID_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Top-level named query so Sanity TypeGen picks it up.
  await getWriteClient()
    .patch(id)
    .setIfMissing({ views: 0 })
    .inc({ views: 1 })
    .commit();

  return NextResponse.json({ ok: true });
}
