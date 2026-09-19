import NextLink from "next/link";
import { notFound } from "next/navigation";
import {
  HiChatBubbleOvalLeft,
  HiClock,
  HiDocumentText,
  HiEnvelope,
  HiFlag,
  HiPhone,
  HiPhoto,
  HiTag,
  HiTicket,
  HiUser,
  HiUserCircle,
} from "react-icons/hi2";
import { IoMdQuote } from "react-icons/io";
import { AttachmentGallery } from "@/components/attachment-gallery";
import { CopyText } from "@/components/copy-text";
import { DashboardCard } from "@/components/dashboard-card";
import { TicketStatusBadge } from "@/components/ticket-badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/lib/constants";
import { getTicketDetail } from "@/lib/dashboard";
import { formatDateTimeAr } from "@/lib/formatters";
import { getAdminUsers } from "./actions";
import { AssignForm, NoteForm, ReplyForm, StatusForm } from "./ticket-forms";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: Props) {
  const { id } = await params;
  const ticket = await getTicketDetail(id);
  if (!ticket) notFound();
  const admins = await getAdminUsers();

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NextLink href="/dashboard">لوحة التحكم</NextLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NextLink href="/dashboard/tickets">التذاكر</NextLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <span dir="ltr">{ticket.reference}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-wrap items-center gap-4">
        <h1 className="font-display text-2xl font-extrabold">
          {ticket.subject}
        </h1>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <DashboardCard>
        <CardContent className="grid gap-3 p-5 text-sm sm:grid-cols-2">
          <p className="flex flex-wrap items-center gap-x-2">
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiTicket
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              المرجع:
            </span>
            <span dir="ltr">{ticket.reference}</span>
            <CopyText text={ticket.reference} label="نسخ المرجع" />
          </p>
          <p>
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiUser
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              مقدّم الطلب:
            </span>
            {ticket.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-2">
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiPhone
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              الجوال:
            </span>
            <span dir="ltr">
              <a
                href={`tel:${ticket.phone.replace(/[\s-]/g, "")}`}
                className="hover:text-accent hover:underline"
              >
                {ticket.phone}
              </a>
            </span>
            <CopyText text={ticket.phone} label="نسخ رقم الجوال" />
          </p>
          {ticket.email ? (
            <p className="flex flex-wrap items-center gap-x-2">
              <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
                <HiEnvelope
                  className="text-bronze size-4 shrink-0"
                  aria-hidden="true"
                />
                البريد:
              </span>
              <span dir="ltr">
                <a
                  href={`mailto:${ticket.email}`}
                  className="hover:text-accent hover:underline"
                >
                  {ticket.email}
                </a>
              </span>
              <CopyText text={ticket.email} label="نسخ البريد" />
            </p>
          ) : null}
          <p>
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiTag
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              التصنيف:
            </span>
            {TICKET_CATEGORIES.find((c) => c.value === ticket.category)
              ?.label ?? ticket.category}
          </p>
          <p>
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiFlag
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              الأولوية:
            </span>
            {TICKET_PRIORITIES.find((p) => p.value === ticket.priority)
              ?.label ?? ticket.priority}
          </p>
          <p>
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiUserCircle
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              المعين:
            </span>
            {ticket.assignedTo?.name ?? "غير معينة"}
          </p>
          <p>
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiClock
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              أُنشئت:
            </span>
            <time>{formatDateTimeAr(ticket._createdAt)}</time>
          </p>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
              <HiDocumentText
                className="text-bronze size-4 shrink-0"
                aria-hidden="true"
              />
              الوصف:
            </span>
            <CopyText text={ticket.description} label="نسخ الوصف" />
            <blockquote className="border-bronze bg-surface-secondary mt-2 rounded-md border border-s-4 px-4 py-3">
              <IoMdQuote
                className="text-bronze mb-1 size-6"
                aria-hidden="true"
              />
              <p className="text-sm leading-7 whitespace-pre-wrap">
                {ticket.description}
              </p>
            </blockquote>
          </div>
          {ticket.attachments.length > 0 ? (
            <div className="sm:col-span-2">
              <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5">
                <HiPhoto
                  className="text-bronze size-4 shrink-0"
                  aria-hidden="true"
                />
                المرفقات:
              </span>
              <AttachmentGallery attachments={ticket.attachments} />
            </div>
          ) : null}
        </CardContent>
      </DashboardCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard className="gap-0">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-base">
              <HiUser
                className="text-muted-foreground size-4"
                aria-hidden="true"
              />
              إدارة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <StatusForm id={ticket._id} current={ticket.status} />
            <AssignForm id={ticket._id} admins={admins} />
          </CardContent>
        </DashboardCard>
        <DashboardCard className="gap-0">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-base">
              <HiClock
                className="text-muted-foreground size-4"
                aria-hidden="true"
              />
              الجدول الزمني
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <ol className="border-border space-y-2 border-s-2 ps-4">
              {ticket.events.map((e, i) => (
                <li key={`${e.createdAt}-${i}`} className="text-sm">
                  <p>
                    {e.label}
                    {e.actor ? (
                      <span className="text-muted-foreground">
                        {" "}
                        - {e.actor}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatDateTimeAr(e.createdAt)}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </DashboardCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard className="gap-0">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-base">
              <HiChatBubbleOvalLeft
                className="text-muted-foreground size-4"
                aria-hidden="true"
              />
              الرد العام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            <ReplyForm id={ticket._id} />
            {ticket.replies.length > 0 ? (
              <ul className="space-y-2">
                {ticket.replies.map((r, i) => (
                  <li
                    key={`${r.createdAt}-${i}`}
                    className="bg-secondary rounded-none p-3 text-sm"
                  >
                    <p className="whitespace-pre-wrap">{r.body}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {r.authorName} · {formatDateTimeAr(r.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </DashboardCard>
        <DashboardCard className="gap-0">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-base">
              <HiDocumentText
                className="text-muted-foreground size-4"
                aria-hidden="true"
              />
              ملاحظات داخلية (لا تظهر للعميل)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            <NoteForm id={ticket._id} />
            {ticket.internalNotes.length > 0 ? (
              <ul className="space-y-2">
                {ticket.internalNotes.map((n, i) => (
                  <li
                    key={`${n.createdAt}-${i}`}
                    className="bg-background rounded-none p-3 text-sm"
                  >
                    <p className="whitespace-pre-wrap">{n.body}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {n.authorName} · {formatDateTimeAr(n.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </DashboardCard>
      </div>
    </div>
  );
}
