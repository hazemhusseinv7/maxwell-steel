"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { TICKET_STATUSES } from "@/lib/constants";
import {
  assignSchema,
  replySchema,
  updateStatusSchema,
} from "@/lib/ticket-schemas";
import { getWriteClient } from "@/sanity/lib/write-client";

export interface ActionState {
  error?: string;
  ok?: boolean;
}

function event(type: string, label: string, actor: string) {
  return {
    _type: "event" as const,
    type,
    label,
    actor,
    createdAt: new Date().toISOString(),
  };
}

export async function updateStatusAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const admin = await requireAdmin();
    const parsed = updateStatusSchema.safeParse({
      status: formData.get("status"),
    });
    if (!parsed.success) return { error: "حالة غير صالحة" };
    const label =
      TICKET_STATUSES.find((s) => s.value === parsed.data.status)?.label ??
      parsed.data.status;
    await getWriteClient()
      .patch(id)
      .set({ status: parsed.data.status })
      .setIfMissing({ events: [] })
      .append("events", [
        event("status", `تغيّرت الحالة إلى: ${label}`, admin.name),
      ])
      .commit({ autoGenerateArrayKeys: true });
    revalidatePath(`/dashboard/tickets/${id}`);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("NOT_AUTHORIZED"))
      return { error: "غير مصرح" };
    console.error("[update-status]", err);
    return { error: "تعذر تحديث الحالة" };
  }
}

export async function assignTicketAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const admin = await requireAdmin();
    const parsed = assignSchema.safeParse({
      clerkId: formData.get("clerkId"),
      name: formData.get("name"),
    });
    if (!parsed.success) return { error: "بيانات التعيين غير صالحة" };
    await getWriteClient()
      .patch(id)
      .set({
        assignedTo: { clerkId: parsed.data.clerkId, name: parsed.data.name },
      })
      .setIfMissing({ events: [] })
      .append("events", [
        event("assigned", `عُيّنت إلى: ${parsed.data.name}`, admin.name),
      ])
      .commit({ autoGenerateArrayKeys: true });
    revalidatePath(`/dashboard/tickets/${id}`);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("NOT_AUTHORIZED"))
      return { error: "غير مصرح" };
    console.error("[assign-ticket]", err);
    return { error: "تعذر التعيين" };
  }
}

export async function addReplyAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const admin = await requireAdmin();
    const parsed = replySchema.safeParse({ body: formData.get("body") });
    if (!parsed.success)
      return { error: parsed.error.issues[0]?.message ?? "الرد فارغ" };
    const now = new Date().toISOString();
    await getWriteClient()
      .patch(id)
      .setIfMissing({ replies: [], events: [] })
      .append("replies", [
        {
          _type: "reply" as const,
          body: parsed.data.body,
          authorName: admin.name,
          createdAt: now,
        },
      ])
      .append("events", [event("reply", "ردّ الدعم على التذكرة", admin.name)])
      .commit({ autoGenerateArrayKeys: true });
    revalidatePath(`/dashboard/tickets/${id}`);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("NOT_AUTHORIZED"))
      return { error: "غير مصرح" };
    console.error("[add-reply]", err);
    return { error: "تعذر إرسال الرد" };
  }
}

export async function addNoteAction(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const admin = await requireAdmin();
    const parsed = replySchema.safeParse({ body: formData.get("body") });
    if (!parsed.success)
      return { error: parsed.error.issues[0]?.message ?? "الملاحظة فارغة" };
    const now = new Date().toISOString();
    await getWriteClient()
      .patch(id)
      .setIfMissing({ internalNotes: [], events: [] })
      .append("internalNotes", [
        {
          _type: "internalNote" as const,
          body: parsed.data.body,
          authorName: admin.name,
          createdAt: now,
        },
      ])
      .append("events", [event("note", "أُضيفت ملاحظة داخلية", admin.name)])
      .commit({ autoGenerateArrayKeys: true });
    revalidatePath(`/dashboard/tickets/${id}`);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("NOT_AUTHORIZED"))
      return { error: "غير مصرح" };
    console.error("[add-note]", err);
    return { error: "تعذر حفظ الملاحظة" };
  }
}

export interface AdminUser {
  clerkId: string;
  name: string;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  await requireAdmin();
  const client = await clerkClient();
  const users = await client.users.getUserList({ limit: 100 });
  return users.data
    .filter((u) => (u.publicMetadata as { role?: string })?.role === "admin")
    .map((u) => ({
      clerkId: u.id,
      name:
        [u.firstName, u.lastName].filter(Boolean).join(" ") ||
        u.emailAddresses[0]?.emailAddress ||
        u.id,
    }));
}
