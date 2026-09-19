import "server-only";

import { Resend } from "resend";

import { AdminNotification } from "@/emails/admin-notification";
import { NewPostBroadcast } from "@/emails/new-post";
import { NewsletterConfirm } from "@/emails/newsletter-confirm";
import { NewsletterWelcome } from "@/emails/newsletter-welcome";
import { TicketConfirmation } from "@/emails/ticket-confirmation";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function getResend(): Resend {
  return new Resend(requireEnv("RESEND_API_KEY"));
}

export async function sendTicketConfirmation(input: {
  to: string;
  name: string;
  reference: string;
}): Promise<void> {
  const resend = getResend();
  const appUrl = requireEnv("NEXT_PUBLIC_APP_URL");
  const { error } = await resend.emails.send({
    from: requireEnv("RESEND_FROM"),
    to: input.to,
    subject: `تم استلام تذكرتك ${input.reference}`,
    react: TicketConfirmation({
      name: input.name,
      reference: input.reference,
      trackUrl: `${appUrl}/support/track?ref=${input.reference}`,
      siteUrl: appUrl,
    }),
  });
  if (error) throw new Error(`Resend confirmation failed: ${error.message}`);
}

export async function sendAdminNotification(input: {
  reference: string;
  subject: string;
  categoryLabel: string;
  priorityLabel: string;
  requesterName: string;
  ticketId: string;
}): Promise<void> {
  const resend = getResend();
  const appUrl = requireEnv("NEXT_PUBLIC_APP_URL");
  const { error } = await resend.emails.send({
    from: requireEnv("RESEND_FROM"),
    to: requireEnv("ADMIN_EMAIL"),
    subject: `تذكرة جديدة ${input.reference}: ${input.subject}`,
    react: AdminNotification({
      reference: input.reference,
      subject: input.subject,
      categoryLabel: input.categoryLabel,
      priorityLabel: input.priorityLabel,
      requesterName: input.requesterName,
      dashboardUrl: `${appUrl}/dashboard/tickets/${input.ticketId}`,
      siteUrl: appUrl,
    }),
  });
  if (error)
    throw new Error(`Resend admin notification failed: ${error.message}`);
}

export async function sendSubscribeConfirm(input: {
  to: string;
  confirmUrl: string;
  siteUrl: string;
  token: string;
}): Promise<void> {
  const resend = getResend();
  const { error } = await resend.emails.send(
    {
      from: requireEnv("RESEND_FROM"),
      to: input.to,
      subject: "أكّد اشتراكك في نشرة مقرات",
      react: NewsletterConfirm({
        confirmUrl: input.confirmUrl,
        siteUrl: input.siteUrl,
      }),
      tags: [{ name: "category", value: "newsletter-confirm" }],
    },
    {
      idempotencyKey: `newsletter-confirm/${input.token}`,
    },
  );
  if (error) throw new Error(`Resend confirm failed: ${error.message}`);
}

export async function sendNewsletterWelcome(input: {
  to: string;
  subscriberId: string;
  unsubscribeUrl: string;
  siteUrl: string;
}): Promise<void> {
  const resend = getResend();
  const { error } = await resend.emails.send(
    {
      from: requireEnv("RESEND_FROM"),
      to: input.to,
      subject: "تم اشتراكك في نشرة مقرات",
      react: NewsletterWelcome({
        unsubscribeUrl: input.unsubscribeUrl,
        siteUrl: input.siteUrl,
      }),
      tags: [{ name: "category", value: "newsletter-welcome" }],
    },
    {
      idempotencyKey: `newsletter-welcome/${input.subscriberId}`,
    },
  );
  if (error) throw new Error(`Resend welcome failed: ${error.message}`);
}

/**
 * New-post broadcast via the Broadcast API. Resend resolves recipients from
 * the segment and renders per-recipient unsubscribe pages - no recipient
 * enumeration in code.
 */
export async function sendNewPostBroadcast(input: {
  postSlug: string;
  title: string;
  excerpt: string;
  postUrl: string;
  siteUrl: string;
  coverUrl?: string | null;
}): Promise<{ broadcastId: string }> {
  const resend = getResend();
  const { data, error } = await resend.broadcasts.create({
    segmentId: requireEnv("RESEND_SEGMENT_ID"),
    from: requireEnv("RESEND_FROM"),
    subject: `مقال جديد: ${input.title}`,
    react: NewPostBroadcast({
      title: input.title,
      excerpt: input.excerpt,
      postUrl: input.postUrl,
      siteUrl: input.siteUrl,
      coverUrl: input.coverUrl,
    }),
    name: `new-post/${input.postSlug}`,
    send: true,
  });
  if (error) throw new Error(`Resend broadcast failed: ${error.message}`);
  if (!data?.id) throw new Error("Resend broadcast returned no id");
  return { broadcastId: data.id };
}
