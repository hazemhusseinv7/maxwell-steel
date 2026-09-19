import "server-only";

import { groq } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/client";
import { getWriteClient } from "@/sanity/lib/write-client";
import type {
  PUBLIC_TICKET_LIST_QUERY_RESULT,
  PUBLIC_TICKET_QUERY_RESULT,
  REF_EXISTS_QUERY_RESULT,
} from "@/sanity.types";
import { generateTicketRef } from "./refs";
import { normalizePhone, type SubmitTicketInput } from "./ticket-schemas";

const REF_EXISTS_QUERY = groq`count(*[_type == "ticket" && reference == $reference]) > 0`;

// Public projection: internalNotes are NEVER selected here.
// (Ticket has no publishedAt field - deliberately not selected.)
const PUBLIC_TICKET_QUERY = groq`
  *[_type == "ticket" && reference == $reference && (email == $contact || phone == $contact)][0] {
    _id, reference, subject, category, priority, description, status,
    _createdAt,
    "attachments": attachments[].asset->url,
    "replies": replies[] { body, authorName, createdAt } | order(createdAt asc),
    "events": events[] { type, label, actor, createdAt } | order(createdAt asc)
  }
`;

// Contact-only lookup stays minimal: list rows carry only what the picker
// renders. Full details require reference + contact (drill-down query).
const PUBLIC_TICKET_LIST_QUERY = groq`
  *[_type == "ticket" && (email == $contact || phone == $contact)] | order(_createdAt desc) [0...50] {
    _id, reference, subject, status, _createdAt
  }
`;

export interface TicketListItem {
  _id: string;
  reference: string;
  subject: string;
  status: string;
  _createdAt: string;
}

export interface PublicTicket {
  _id: string;
  reference: string;
  subject: string;
  category: string;
  priority: string;
  description: string;
  status: string;
  _createdAt: string;
  attachments: string[];
  replies: Array<{ body: string; authorName: string; createdAt: string }>;
  events: Array<{
    type: string;
    label: string;
    actor?: string;
    createdAt: string;
  }>;
}

async function generateUniqueRef(maxAttempts = 5): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    const reference = generateTicketRef();
    const exists = await sanityFetch<REF_EXISTS_QUERY_RESULT>({
      query: REF_EXISTS_QUERY,
      params: { reference },
    });
    if (!exists) return reference;
  }
  throw new Error("Could not generate a unique ticket reference");
}

type PublicTicketRow = NonNullable<PUBLIC_TICKET_QUERY_RESULT>;

function toPublicTicket(ticket: PublicTicketRow | null): PublicTicket | null {
  if (
    !ticket ||
    !ticket.reference ||
    !ticket.subject ||
    !ticket.description ||
    !ticket.status
  ) {
    return null;
  }
  return {
    _id: ticket._id,
    reference: ticket.reference,
    subject: ticket.subject,
    category: ticket.category ?? "other",
    priority: ticket.priority ?? "medium",
    description: ticket.description,
    status: ticket.status,
    _createdAt: ticket._createdAt,
    attachments: (ticket.attachments ?? []).filter(
      (u): u is string => typeof u === "string",
    ),
    replies: (ticket.replies ?? []).flatMap((r) =>
      r?.body && r?.authorName && r?.createdAt
        ? [{ body: r.body, authorName: r.authorName, createdAt: r.createdAt }]
        : [],
    ),
    events: (ticket.events ?? []).flatMap((e) =>
      e?.type && e?.label && e?.createdAt
        ? [
            {
              type: e.type,
              label: e.label,
              ...(e.actor ? { actor: e.actor } : {}),
              createdAt: e.createdAt,
            },
          ]
        : [],
    ),
  };
}

export async function getPublicTicket(
  reference: string,
  contact: string,
): Promise<PublicTicket | null> {
  const ticket = await sanityFetch<PUBLIC_TICKET_QUERY_RESULT>({
    query: PUBLIC_TICKET_QUERY,
    params: { reference, contact },
  });
  return toPublicTicket(ticket);
}

export async function getPublicTicketList(
  contact: string,
): Promise<TicketListItem[]> {
  const tickets = await sanityFetch<PUBLIC_TICKET_LIST_QUERY_RESULT>({
    query: PUBLIC_TICKET_LIST_QUERY,
    params: { contact },
  });
  return tickets.flatMap((t) =>
    t.reference && t.subject && t.status
      ? [
          {
            _id: t._id,
            reference: t.reference,
            subject: t.subject,
            status: t.status,
            _createdAt: t._createdAt,
          },
        ]
      : [],
  );
}

export async function createTicket(
  input: SubmitTicketInput,
  screenshots: File[],
): Promise<{ id: string; reference: string }> {
  const writeClient = getWriteClient();
  const reference = await generateUniqueRef();
  const now = new Date().toISOString();

  const attachments = await Promise.all(
    screenshots.map(async (file) => {
      const asset = await writeClient.assets.upload("image", file, {
        filename: file.name,
        contentType: file.type,
      });
      return {
        _type: "image" as const,
        asset: { _type: "reference" as const, _ref: asset._id },
      };
    }),
  );

  const doc = await writeClient.create({
    _type: "ticket",
    reference,
    name: input.name,
    phone: normalizePhone(input.phone),
    ...(input.email ? { email: input.email.trim().toLowerCase() } : {}),
    subject: input.subject,
    category: input.category,
    priority: input.priority,
    description: input.description,
    attachments,
    status: "open",
    replies: [],
    internalNotes: [],
    events: [
      {
        _type: "event",
        _key: `created-${Date.now()}`,
        type: "created",
        label: "تم إنشاء التذكرة",
        actor: input.name,
        createdAt: now,
      },
    ],
  });

  return { id: doc._id, reference };
}
