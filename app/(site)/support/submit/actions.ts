"use server";

import { redirect } from "next/navigation";

import { TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/lib/constants";
import { sendAdminNotification, sendTicketConfirmation } from "@/lib/email";
import {
  fieldErrorsFromIssues,
  submitTicketSchema,
  validateScreenshot,
  validateScreenshotCount,
} from "@/lib/ticket-schemas";
import { createTicket } from "@/lib/tickets";

export interface SubmitState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitTicketAction(
  _prev: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const emailRaw = formData.get("email");
  const parsed = submitTicketSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email:
      typeof emailRaw === "string" && emailRaw.trim() === ""
        ? undefined
        : emailRaw,
    subject: formData.get("subject"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    description: formData.get("description"),
    honeypot: formData.get("honeypot") ?? "",
  });

  // Honeypot filled → pretend success (spam trap, no ticket created).
  if (
    !parsed.success &&
    parsed.error.issues.some((i) => i.path.join() === "honeypot")
  ) {
    redirect("/support/confirmation?ref=TKT-SPAM00");
  }
  if (!parsed.success) {
    return fieldErrorsFromIssues(parsed.error.issues);
  }

  const files = formData
    .getAll("screenshots")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const countError = validateScreenshotCount(files.length);
  if (countError) return { error: countError };
  for (const file of files) {
    const fileError = validateScreenshot(file);
    if (fileError) return { error: `${file.name}: ${fileError}` };
  }

  let reference: string;
  let id: string;
  try {
    ({ id, reference } = await createTicket(parsed.data, files));
  } catch (err) {
    console.error("[submit-ticket]", err);
    return { error: "تعذر إنشاء التذكرة. حاول مجدداً لاحقًا." };
  }

  const categoryLabel =
    TICKET_CATEGORIES.find((c) => c.value === parsed.data.category)?.label ??
    parsed.data.category;
  const priorityLabel =
    TICKET_PRIORITIES.find((p) => p.value === parsed.data.priority)?.label ??
    parsed.data.priority;
  const results = await Promise.allSettled([
    ...(parsed.data.email
      ? [
          sendTicketConfirmation({
            to: parsed.data.email,
            name: parsed.data.name,
            reference,
          }),
        ]
      : []),
    sendAdminNotification({
      reference,
      subject: parsed.data.subject,
      categoryLabel,
      priorityLabel,
      requesterName: parsed.data.name,
      ticketId: id,
    }),
  ]);
  for (const r of results) {
    if (r.status === "rejected")
      console.error("[submit-ticket-email]", r.reason);
  }

  redirect(`/support/confirmation?ref=${reference}`);
}
