import { auth, clerkClient } from "@clerk/nextjs/server";
import { cache } from "react";

function roleFromSessionClaims(sessionClaims: unknown): string | undefined {
  if (typeof sessionClaims !== "object" || sessionClaims === null)
    return undefined;
  const metadata = (sessionClaims as { metadata?: unknown }).metadata;
  if (typeof metadata !== "object" || metadata === null) return undefined;
  const role = (metadata as { role?: unknown }).role;
  return typeof role === "string" ? role : undefined;
}

// Layers 2 (dashboard layout) and 3 (every mutating server action) of
// admin enforcement. Returns the admin's identity for timeline attribution.
//
// Role resolution: session-claims fast path first (zero latency when the
// Clerk session-token template exposes publicMetadata as `metadata`),
// falling back to an authoritative Backend API lookup so a missing token
// customization locks nobody out. Cached per request: layout + actions
// share a single lookup.
async function checkAdminUncached(): Promise<{
  clerkId: string;
  name: string;
}> {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("NOT_AUTHORIZED:anonymous");

  if (roleFromSessionClaims(sessionClaims) === "admin") {
    return { clerkId: userId, name: "الدعم" };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.publicMetadata as { role?: unknown })?.role;
  if (role === "admin") {
    return {
      clerkId: userId,
      name:
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.emailAddresses[0]?.emailAddress ||
        "الدعم",
    };
  }
  throw new Error("NOT_AUTHORIZED:role");
}

export const requireAdmin = cache(checkAdminUncached);

export async function isAdmin(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch (err) {
    console.error(
      "[admin-guard] denied:",
      err instanceof Error ? err.message : err,
    );
    return false;
  }
}
