"use client";

import NextLink from "next/link";
import {
  HiArrowLeft,
  HiCalendarDays,
  HiCheckCircle,
  HiTag,
  HiTicket,
} from "react-icons/hi2";
import { DashboardCard } from "@/components/dashboard-card";
import { TicketStatusBadge } from "@/components/ticket-badge";
import { TicketTableRow } from "@/components/ticket-table-row";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TicketRow } from "@/lib/dashboard";
import { formatDateAr } from "@/lib/formatters";

export function RecentTickets({ items }: { items: TicketRow[] }) {
  return (
    <DashboardCard className="relative gap-0 md:col-span-2">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-1.5 text-base">
          <HiTicket
            className="text-bronze size-4 shrink-0"
            aria-hidden="true"
          />
          أحدث التذاكر
        </CardTitle>
        <CardDescription>آخر التذاكر المستلمة وحالتها.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableCaption className="sr-only">
            أحدث التذاكر مع المرجع والموضوع والحالة والتاريخ.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="ps-6">
                <span className="inline-flex items-center gap-1.5">
                  <HiTicket
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  المرجع
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-1.5">
                  <HiTag
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  الموضوع
                </span>
              </TableHead>
              <TableHead>
                <span className="inline-flex items-center gap-1.5">
                  <HiCheckCircle
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  الحالة
                </span>
              </TableHead>
              <TableHead className="pe-6">
                <span className="inline-flex items-center gap-1.5">
                  <HiCalendarDays
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  التاريخ
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((t) => (
              <TicketTableRow className="h-12" key={t._id} id={t._id}>
                <TableCell className="ps-6 font-medium tabular-nums">
                  <NextLink
                    href={`/dashboard/tickets/${t._id}`}
                    dir="ltr"
                    className="text-accent font-mono"
                  >
                    {t.reference}
                  </NextLink>
                </TableCell>
                <TableCell className="max-w-40 truncate">
                  <NextLink href={`/dashboard/tickets/${t._id}`}>
                    {t.subject}
                  </NextLink>
                </TableCell>
                <TableCell>
                  <TicketStatusBadge status={t.status} />
                </TableCell>
                <TableCell className="text-muted-foreground pe-6 text-xs">
                  <time dateTime={t._createdAt}>
                    {formatDateAr(t._createdAt)}
                  </time>
                </TableCell>
              </TicketTableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-center border-t py-2">
        <NextLink href="/dashboard/tickets">
          <Button variant="default" className="bg-foreground cursor-pointer">
            عرض الكل
            <HiArrowLeft className="size-4" aria-hidden="true" />
          </Button>
        </NextLink>
      </div>
    </DashboardCard>
  );
}
