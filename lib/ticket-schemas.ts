import { z } from "zod";

import {
  MAX_SCREENSHOT_BYTES,
  MAX_SCREENSHOTS,
  TICKET_CATEGORY_VALUES,
  TICKET_PRIORITY_VALUES,
  TICKET_STATUS_VALUES,
} from "./constants";

export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export const phoneSchema = z
  .string()
  .trim()
  .min(7, "رقم الجوال غير صالح")
  .max(20, "رقم الجوال غير صالح")
  .regex(/^\+?[\d\s-]{7,20}$/, "رقم الجوال غير صالح")
  .transform(normalizePhone)
  .pipe(z.string().regex(/^\+?\d{7,15}$/, "رقم الجوال غير صالح"));

const emailContactSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.string().email("البريد الإلكتروني غير صالح"));

const trackReferenceSchema = z
  .string()
  .trim()
  .transform((v) => (v === "" ? undefined : v.toUpperCase()))
  .pipe(
    z
      .string()
      .regex(
        /^TKT-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/,
        "رقم المرجع غير صالح",
      )
      .optional(),
  );

export const trackTicketSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("email"),
    reference: trackReferenceSchema,
    contact: emailContactSchema,
  }),
  z.object({
    method: z.literal("phone"),
    reference: trackReferenceSchema,
    contact: phoneSchema,
  }),
]);

export const submitTicketSchema = z.object({
  name: z.string().trim().min(2, "الاسم مطلوب").max(100),
  phone: phoneSchema,
  email: z
    .string()
    .trim()
    .email("البريد الإلكتروني غير صالح")
    .max(254)
    .optional(),
  subject: z.string().trim().min(5, "الموضوع قصير جدًا").max(200),
  category: z.enum(TICKET_CATEGORY_VALUES),
  priority: z.enum(TICKET_PRIORITY_VALUES),
  description: z.string().trim().min(20, "الوصف قصير جدًا").max(5000),
  honeypot: z.string().max(0, "spam").optional(),
});

export type SubmitTicketInput = z.infer<typeof submitTicketSchema>;

const imageMime = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export function validateScreenshot(file: File): string | null {
  if (file.size > MAX_SCREENSHOT_BYTES) return "حجم الصورة يتجاوز ١٠ م.ب";
  if (!imageMime.includes(file.type)) return "نوع الملف غير مدعوم";
  return null;
}

export interface FieldErrorState {
  error: string;
  fieldErrors: Record<string, string>;
}

export function fieldErrorsFromIssues(
  issues: z.ZodError["issues"],
  exclude: string[] = ["honeypot"],
): FieldErrorState {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !exclude.includes(key) && !(key in fieldErrors)) {
      fieldErrors[key] = issue.message;
    }
  }
  const first = issues.find((i) => !exclude.includes(String(i.path[0] ?? "")));
  return {
    error: first?.message ?? "تحقق من الحقول وحاول مجدداً",
    fieldErrors,
  };
}

export function validateScreenshotCount(count: number): string | null {
  if (count > MAX_SCREENSHOTS) return "الحد الأقصى صورتان";
  return null;
}

export const updateStatusSchema = z.object({
  status: z.enum(TICKET_STATUS_VALUES),
});

export const replySchema = z.object({
  body: z.string().trim().min(1, "الرد فارغ").max(5000),
});

export const assignSchema = z.object({
  clerkId: z.string().min(1),
  name: z.string().trim().max(200),
});
