import "server-only";

import { randomUUID } from "node:crypto";
import { groq } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/client";
import { getWriteClient } from "@/sanity/lib/write-client";
import { requireAdmin } from "./admin";

export type SubscriberStatus = "pending" | "confirmed" | "unsubscribed";

export interface Subscriber {
  _id: string;
  email: string;
  status: SubscriberStatus;
  confirmToken?: string | null;
  tokenExpiresAt?: string | null;
  resendContactId?: string | null;
  source?: string | null;
  _createdAt?: string | null;
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

const SUBSCRIBER_FIELDS = `_id, email, status, confirmToken, tokenExpiresAt, resendContactId`;

export async function findSubscriberByEmail(
  email: string,
): Promise<Subscriber | null> {
  return sanityFetch<Subscriber | null>({
    query: `*[_type == "subscriber" && email == $email][0]{${SUBSCRIBER_FIELDS}}`,
    params: { email: normalizeEmail(email) },
  });
}

export async function findSubscriberByToken(
  token: string,
): Promise<Subscriber | null> {
  return sanityFetch<Subscriber | null>({
    query: `*[_type == "subscriber" && confirmToken == $token][0]{${SUBSCRIBER_FIELDS}}`,
    params: { token },
  });
}

function freshToken(): { token: string; expiresAt: string } {
  return {
    token: randomUUID(),
    expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
  };
}

/** Create or reset a pending subscription. Returns the record + token. */
export async function upsertPendingSubscriber(
  email: string,
  source = "footer",
): Promise<{ subscriber: Subscriber; token: string }> {
  const client = getWriteClient();
  const clean = normalizeEmail(email);
  const existing = await findSubscriberByEmail(clean);
  const { token, expiresAt } = freshToken();

  if (existing) {
    const updated = (await client
      .patch(existing._id)
      .set({
        status: "pending",
        confirmToken: token,
        tokenExpiresAt: expiresAt,
      })
      .commit({ autoGenerateArrayKeys: true })) as unknown as Subscriber;
    return {
      subscriber: { ...updated, email: clean, status: "pending" },
      token,
    };
  }

  const created = (await client.create({
    _type: "subscriber",
    email: clean,
    status: "pending",
    confirmToken: token,
    tokenExpiresAt: expiresAt,
    source,
  })) as unknown as Subscriber;
  return { subscriber: { ...created, email: clean }, token };
}

/** Confirm a pending subscription if the token is valid and fresh. */
export async function confirmSubscriber(
  token: string,
): Promise<Subscriber | null> {
  const found = await findSubscriberByToken(token);
  if (!found || found.status !== "pending") return null;
  if (
    !found.tokenExpiresAt ||
    Number.isNaN(Date.parse(found.tokenExpiresAt)) ||
    Date.parse(found.tokenExpiresAt) < Date.now()
  ) {
    return null;
  }
  const client = getWriteClient();
  await client
    .patch(found._id)
    .set({ status: "confirmed" })
    .unset(["confirmToken", "tokenExpiresAt"])
    .commit();
  return { ...found, status: "confirmed", confirmToken: null };
}

export async function setSubscriberStatus(
  id: string,
  status: SubscriberStatus,
): Promise<void> {
  const client = getWriteClient();
  await client.patch(id).set({ status }).commit();
}

export async function setResendContactId(
  id: string,
  contactId: string,
): Promise<void> {
  const client = getWriteClient();
  await client.patch(id).set({ resendContactId: contactId }).commit();
}

const SUBSCRIBER_STATUSES: SubscriberStatus[] = [
  "pending",
  "confirmed",
  "unsubscribed",
];

export interface SubscriberRow {
  _id: string;
  email: string;
  status: SubscriberStatus;
  source?: string | null;
  resendContactId?: string | null;
  _createdAt: string;
}

const SUBSCRIBER_STATS_QUERY = groq`{
  "total": count(*[_type == "subscriber"]),
  "confirmed": count(*[_type == "subscriber" && status == "confirmed"]),
  "pending": count(*[_type == "subscriber" && status == "pending"]),
  "unsubscribed": count(*[_type == "subscriber" && status == "unsubscribed"])
}`;

export interface SubscriberStats {
  total: number;
  confirmed: number;
  pending: number;
  unsubscribed: number;
}

/** Admin-only subscriber counts. Sanity is the source of truth. */
export async function getSubscriberStats(): Promise<SubscriberStats> {
  await requireAdmin();
  const result = await sanityFetch<SubscriberStats>({
    query: SUBSCRIBER_STATS_QUERY,
  });
  return {
    total: result.total ?? 0,
    confirmed: result.confirmed ?? 0,
    pending: result.pending ?? 0,
    unsubscribed: result.unsubscribed ?? 0,
  };
}

export interface SubscriberFilters {
  status?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

// Secret confirm tokens are never selected here - admin list rows carry
// only display-safe fields.
const ADMIN_SUBSCRIBERS_QUERY = groq`{
  "items": *[
    _type == "subscriber"
    && ($status == null || status == $status)
    && ($q == null || email match $q + "*")
  ] | order(_createdAt desc) [$offset...$end] {
    _id, email, status, source, resendContactId, _createdAt
  },
  "total": count(*[
    _type == "subscriber"
    && ($status == null || status == $status)
    && ($q == null || email match $q + "*")
  ])
}`;

interface SubscriberAdminItem {
  _id: string | null;
  email: string | null;
  status: string | null;
  source?: string | null;
  resendContactId?: string | null;
  _createdAt: string | null;
}

function toSubscriberRow(item: SubscriberAdminItem): SubscriberRow | null {
  if (!item._id || !item.email || !item._createdAt) return null;
  if (!SUBSCRIBER_STATUSES.includes(item.status as SubscriberStatus))
    return null;
  return {
    _id: item._id,
    email: item.email,
    status: item.status as SubscriberStatus,
    ...(item.source ? { source: item.source } : {}),
    ...(item.resendContactId ? { resendContactId: item.resendContactId } : {}),
    _createdAt: item._createdAt,
  };
}

/** Admin-only paginated subscriber list with status + email search. */
export async function getAdminSubscribers(
  filters: SubscriberFilters = {},
): Promise<{ items: SubscriberRow[]; total: number }> {
  await requireAdmin();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? 20;
  const offset = (page - 1) * pageSize;
  const params: Record<string, string | number | null> = {
    offset,
    end: offset + pageSize,
    status: null,
    q: null,
  };
  if (filters.status && filters.status !== "all")
    params.status = filters.status;
  if (filters.q?.trim()) params.q = filters.q.trim().toLowerCase();
  const result = await sanityFetch<{
    items: SubscriberAdminItem[];
    total: number;
  }>({
    query: ADMIN_SUBSCRIBERS_QUERY,
    params,
  });
  return {
    items: result.items.flatMap((item) => {
      const row = toSubscriberRow(item);
      return row ? [row] : [];
    }),
    total: result.total,
  };
}
