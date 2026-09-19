import "server-only";

import { groq } from "next-sanity";

import { sanityFetch } from "@/sanity/lib/client";
import type {
  ADMIN_TICKETS_QUERY_RESULT,
  DETAIL_QUERY_RESULT,
  RECENT_EVENTS_QUERY_RESULT,
  STATS_QUERY_RESULT,
} from "@/sanity.types";
import { requireAdmin } from "./admin";

type AdminRow = ADMIN_TICKETS_QUERY_RESULT["items"][number];

function toTicketRow(r: AdminRow): TicketRow | null {
  if (!r.reference || !r.subject || !r.name || !r.phone || !r.status)
    return null;
  return {
    _id: r._id,
    reference: r.reference,
    subject: r.subject,
    category: r.category ?? "other",
    priority: r.priority ?? "medium",
    status: r.status,
    name: r.name,
    phone: r.phone,
    ...(r.email ? { email: r.email } : {}),
    _createdAt: r._createdAt,
    assignedTo: r.assignedTo
      ? {
          ...(r.assignedTo.clerkId ? { clerkId: r.assignedTo.clerkId } : {}),
          ...(r.assignedTo.name ? { name: r.assignedTo.name } : {}),
        }
      : null,
  };
}
export interface TicketFilters {
  status?: string;
  category?: string;
  priority?: string;
  from?: string;
  to?: string;
  q?: string;
  page?: number;
  pageSize?: number;
}

const ADMIN_TICKETS_QUERY = groq`{
  "items": *[
    _type == "ticket"
    && ($status == null || status == $status)
    && ($category == null || category == $category)
    && ($priority == null || priority == $priority)
    && ($from == null || _createdAt >= $from)
    && ($to == null || _createdAt <= $to)
    && ($q == null || reference match $q + "*" || subject match $q + "*" || phone match $q + "*" || email match $q + "*")
  ] | order(_createdAt desc) [$offset...$end] {
    _id, reference, subject, category, priority, status,
    name, phone, email, _createdAt,
    "assignedTo": assignedTo { clerkId, name }
  },
  "total": count(*[
    _type == "ticket"
    && ($status == null || status == $status)
    && ($category == null || category == $category)
    && ($priority == null || priority == $priority)
    && ($from == null || _createdAt >= $from)
    && ($to == null || _createdAt <= $to)
    && ($q == null || reference match $q + "*" || subject match $q + "*" || phone match $q + "*" || email match $q + "*")
  ])
}`;

export interface TicketRow {
  _id: string;
  reference: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  name: string;
  phone: string;
  email?: string;
  _createdAt: string;
  assignedTo: { clerkId?: string; name?: string } | null;
}

export async function getAdminTickets(
  filters: TicketFilters = {},
): Promise<{ items: TicketRow[]; total: number }> {
  await requireAdmin();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = filters.pageSize ?? 20;
  const offset = (page - 1) * pageSize;
  const params: Record<string, string | number | boolean | string[] | null> = {
    offset,
    end: offset + pageSize,
    status: null,
    category: null,
    priority: null,
    from: null,
    to: null,
    q: null,
  };
  if (filters.status && filters.status !== "all")
    params.status = filters.status;
  if (filters.category && filters.category !== "all")
    params.category = filters.category;
  if (filters.priority && filters.priority !== "all")
    params.priority = filters.priority;
  if (filters.from) params.from = filters.from;
  if (filters.to) params.to = filters.to;
  if (filters.q?.trim()) params.q = filters.q.trim();
  const result = await sanityFetch<ADMIN_TICKETS_QUERY_RESULT>({
    query: ADMIN_TICKETS_QUERY,
    params,
  });
  return {
    items: result.items.flatMap((item) => {
      const row = toTicketRow(item);
      return row ? [row] : [];
    }),
    total: result.total,
  };
}

export interface TicketDetail extends TicketRow {
  description: string;
  attachments: string[];
  replies: Array<{ body: string; authorName: string; createdAt: string }>;
  internalNotes: Array<{ body: string; authorName: string; createdAt: string }>;
  events: Array<{
    type: string;
    label: string;
    actor?: string;
    createdAt: string;
  }>;
}

const DETAIL_QUERY = groq`
  *[_type == "ticket" && _id == $id][0] {
    _id, reference, subject, category, priority, status,
    name, phone, email, _createdAt,
    "assignedTo": assignedTo { clerkId, name },
    description,
    "attachments": attachments[].asset->url,
    "replies": replies[] { body, authorName, createdAt } | order(createdAt asc),
    "internalNotes": internalNotes[] { body, authorName, createdAt } | order(createdAt asc),
    "events": events[] { type, label, actor, createdAt } | order(createdAt asc)
  }
`;

type DetailResult = NonNullable<DETAIL_QUERY_RESULT>;

function toMessage(
  m: {
    body: string | null;
    authorName: string | null;
    createdAt: string | null;
  } | null,
): { body: string; authorName: string; createdAt: string } | null {
  if (!m || !m.body || !m.authorName || !m.createdAt) return null;
  return { body: m.body, authorName: m.authorName, createdAt: m.createdAt };
}

export async function getTicketDetail(
  id: string,
): Promise<TicketDetail | null> {
  await requireAdmin();
  const ticket: DetailResult | null = await sanityFetch<DETAIL_QUERY_RESULT>({
    query: DETAIL_QUERY,
    params: { id },
  });
  if (!ticket) return null;
  const row = toTicketRow(ticket);
  if (!row || !ticket.description) return null;
  return {
    ...row,
    description: ticket.description,
    attachments: (ticket.attachments ?? []).filter(
      (u): u is string => typeof u === "string",
    ),
    replies: (ticket.replies ?? []).flatMap((r) => {
      const m = toMessage(r);
      return m ? [m] : [];
    }),
    internalNotes: (ticket.internalNotes ?? []).flatMap((n) => {
      const m = toMessage(n);
      return m ? [m] : [];
    }),
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

export interface TicketStat {
  status: string;
  priority: string;
  category: string;
  _createdAt: string;
  assignedTo: { clerkId?: string } | null;
}

// Capped: the feeds need recency, not history. Revisit (events as
// documents / GROQ-side aggregation) if ticket volume nears this.
const MAX_DASHBOARD_SCAN = 2000;

const STATS_QUERY = groq`*[_type == "ticket"] | order(_createdAt desc) [0...$cap] { status, priority, category, _createdAt, assignedTo }`;

export interface ActivityEvent {
  type: string;
  label: string;
  actor?: string;
  createdAt: string;
  ticketId: string;
  ticketRef: string;
  ticketSubject: string;
}

const RECENT_EVENTS_QUERY = groq`*[_type == "ticket"] | order(_createdAt desc) [0...$cap] {
  "ticketId": _id,
  "ticketRef": reference,
  "ticketSubject": subject,
  "events": events[] { type, label, actor, createdAt }
}`;

export async function getRecentActivity(): Promise<ActivityEvent[]> {
  await requireAdmin();
  const tickets = await sanityFetch<RECENT_EVENTS_QUERY_RESULT>({
    query: RECENT_EVENTS_QUERY,
    params: { cap: MAX_DASHBOARD_SCAN },
  });
  return tickets
    .flatMap((t) =>
      (t?.events ?? []).flatMap((e) =>
        e?.type && e?.label && e?.createdAt && t?.ticketId
          ? [
              {
                type: e.type,
                label: e.label,
                ...(e.actor ? { actor: e.actor } : {}),
                createdAt: e.createdAt,
                ticketId: t.ticketId,
                ticketRef: t.ticketRef ?? "",
                ticketSubject: t.ticketSubject ?? "",
              },
            ]
          : [],
      ),
    )
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 9);
}
export async function getTicketStats(): Promise<TicketStat[]> {
  await requireAdmin();
  const stats = await sanityFetch<STATS_QUERY_RESULT>({
    query: STATS_QUERY,
    params: { cap: MAX_DASHBOARD_SCAN },
  });
  return stats.flatMap((s) =>
    s.status && s.priority && s.category
      ? [
          {
            status: s.status,
            priority: s.priority,
            category: s.category,
            _createdAt: s._createdAt,
            assignedTo: s.assignedTo?.clerkId
              ? { clerkId: s.assignedTo.clerkId }
              : null,
          },
        ]
      : [],
  );
}
