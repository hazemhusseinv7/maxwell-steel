export const PRIORITY_ORDER = ["low", "medium", "high", "urgent"] as const;

export const PRIORITY_META = {
  low: { label: "منخفضة", color: "var(--muted)" },
  medium: { label: "متوسطة", color: "var(--bronze)" },
  high: { label: "عالية", color: "var(--gold)" },
  urgent: { label: "عاجلة", color: "var(--danger)" },
} as const;

export const CATEGORY_ORDER = [
  "general",
  "technical",
  "billing",
  "content",
  "suggestion",
  "other",
] as const;

export const CATEGORY_META = {
  general: { label: "استفسار عام", color: "var(--chart-1)" },
  technical: { label: "مشكلة تقنية", color: "var(--chart-2)" },
  billing: { label: "الفواتير والدفع", color: "var(--chart-3)" },
  content: { label: "المحتوى والمقالات", color: "var(--muted)" },
  suggestion: { label: "اقتراح", color: "var(--chart-4)" },
  other: { label: "أخرى", color: "var(--separator)" },
} as const;

export const STATUS_ORDER = [
  "open",
  "inProgress",
  "resolved",
  "closed",
] as const;

export const STATUS_META = {
  open: { label: "مفتوحة", color: "var(--chart-1)" },
  inProgress: { label: "قيد المعالجة", color: "var(--chart-2)" },
  resolved: { label: "تم الحل", color: "var(--chart-3)" },
  closed: { label: "مغلقة", color: "var(--muted)" },
} as const;
