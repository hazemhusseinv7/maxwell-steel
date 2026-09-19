import "server-only";

import { randomUUID } from "node:crypto";

import { sanityFetch } from "@/sanity/lib/client";
import { getWriteClient } from "@/sanity/lib/write-client";

export type SubscriberStatus = "pending" | "confirmed" | "unsubscribed";

export interface Subscriber {
  _id: string;
  email: string;
  status: SubscriberStatus;
  confirmToken?: string | null;
  tokenExpiresAt?: string | null;
  resendContactId?: string | null;
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
