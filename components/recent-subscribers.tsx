"use client";

import NextLink from "next/link";
import { BsCalendar2RangeFill } from "react-icons/bs";
import {
  HiArrowLeft,
  HiCheckCircle,
  HiEnvelope,
  HiMapPin,
} from "react-icons/hi2";
import { DashboardCard } from "@/components/dashboard-card";
import { SubscriberStatusBadge } from "@/components/subscriber-badge";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateAr } from "@/lib/formatters";
import type { SubscriberRow } from "@/lib/subscribers";

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer",
};

export function RecentSubscribers({ items }: { items: SubscriberRow[] }) {
  return (
    <DashboardCard className="relative col-span-full gap-0">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-1.5 text-base">
          <HiEnvelope
            className="text-bronze size-4 shrink-0"
            aria-hidden="true"
          />
          أحدث المشتركين
        </CardTitle>
        <CardDescription>آخر اشتراكات النشرة البريدية وحالتها.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="ps-6">
                <span className="inline-flex items-center gap-1.5">
                  <HiEnvelope
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  البريد
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
              <TableHead>
                <span className="inline-flex items-center gap-1.5">
                  <HiMapPin
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  المصدر
                </span>
              </TableHead>
              <TableHead className="pe-6">
                <span className="inline-flex items-center gap-1.5">
                  <BsCalendar2RangeFill
                    className="text-bronze size-4 shrink-0"
                    aria-hidden="true"
                  />
                  التاريخ
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((s) => (
              <TableRow className="h-12" key={s._id}>
                <TableCell className="max-w-52 truncate ps-6 font-medium tabular-nums">
                  {s.email}
                </TableCell>
                <TableCell>
                  <SubscriberStatusBadge status={s.status} />
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {s.source ? (SOURCE_LABELS[s.source] ?? s.source) : "—"}
                </TableCell>
                <TableCell className="text-muted-foreground pe-6 text-xs">
                  <time dateTime={s._createdAt}>
                    {formatDateAr(s._createdAt)}
                  </time>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-center border-t py-2">
        <NextLink href="/dashboard/subscribers">
          <Button variant="default" className="bg-foreground cursor-pointer">
            عرض الكل
            <HiArrowLeft className="size-4" aria-hidden="true" />
          </Button>
        </NextLink>
      </div>
    </DashboardCard>
  );
}
