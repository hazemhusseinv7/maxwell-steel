export const TICKET_CATEGORIES = [
  { value: "general", label: "استفسار عام" },
  { value: "technical", label: "مشكلة تقنية" },
  { value: "billing", label: "الفواتير والدفع" },
  { value: "content", label: "المحتوى والمقالات" },
  { value: "suggestion", label: "اقتراح" },
  { value: "other", label: "أخرى" },
] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number]["value"];

export const TICKET_CATEGORY_VALUES = TICKET_CATEGORIES.map((c) => c.value) as [
  TicketCategory,
  ...TicketCategory[],
];

export const TICKET_PRIORITIES = [
  { value: "low", label: "منخفضة" },
  { value: "medium", label: "متوسطة" },
  { value: "high", label: "عالية" },
  { value: "urgent", label: "عاجلة" },
] as const;

export type TicketPriority = (typeof TICKET_PRIORITIES)[number]["value"];

export const TICKET_PRIORITY_VALUES = TICKET_PRIORITIES.map((p) => p.value) as [
  TicketPriority,
  ...TicketPriority[],
];

export const TICKET_STATUSES = [
  { value: "open", label: "مفتوحة" },
  { value: "inProgress", label: "قيد المعالجة" },
  { value: "resolved", label: "تم الحل" },
  { value: "closed", label: "مغلقة" },
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number]["value"];

export const TICKET_STATUS_VALUES = TICKET_STATUSES.map((s) => s.value) as [
  TicketStatus,
  ...TicketStatus[],
];

export const MAX_SCREENSHOTS = 10;
export const MAX_SCREENSHOT_BYTES = 10 * 1024 * 1024;

export const BLOG_CACHE_TAG = "blog";

const YOUTUBE_ID_RE =
  /(?:youtube\.com\/(?:watch\?[^#\s]*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

export function getYouTubeId(url: string): string | null {
  const match = YOUTUBE_ID_RE.exec(url.trim());
  return match ? match[1] : null;
}
