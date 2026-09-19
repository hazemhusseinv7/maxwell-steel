"use server";

import { trackTicketSchema } from "@/lib/ticket-schemas";
import {
  getPublicTicket,
  getPublicTicketList,
  type PublicTicket,
  type TicketListItem,
} from "@/lib/tickets";

export interface TrackState {
  error?: string;
  fieldErrors?: Record<string, string>;
  ticket?: PublicTicket;
  tickets?: TicketListItem[];
}

export async function trackTicketAction(
  _prev: TrackState,
  formData: FormData,
): Promise<TrackState> {
  const parsed = trackTicketSchema.safeParse({
    method: formData.get("method"),
    reference: formData.get("reference"),
    contact: formData.get("contact"),
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !(key in fieldErrors)) fieldErrors[key] = issue.message;
    }
    const first = parsed.error.issues[0]?.message;
    return {
      error: first ?? "تحقق من الحقول وحاول مجدداً",
      fieldErrors,
    };
  }
  try {
    if (!parsed.data.reference) {
      const tickets = await getPublicTicketList(parsed.data.contact);
      if (tickets.length === 0) {
        return {
          error: "لم يتم العثور على تذاكر بهذه البيانات.",
        };
      }
      return { tickets };
    }
    const ticket = await getPublicTicket(
      parsed.data.reference,
      parsed.data.contact,
    );
    if (!ticket) {
      // Same message for wrong ref and wrong contact: no existence oracle.
      return {
        error: "لم يتم العثور على تذكرة بهذه البيانات.",
      };
    }
    return { ticket };
  } catch {
    return { error: "تعذر جلب التذكرة. حاول مجدداً لاحقًا." };
  }
}
