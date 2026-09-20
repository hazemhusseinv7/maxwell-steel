import { EmptyState } from "@heroui/react";
import { BsCalendar2RangeFill } from "react-icons/bs";
import { HiCheckCircle, HiEnvelope, HiMapPin } from "react-icons/hi2";
import { CornerFrame } from "@/components/corner-frame";
import { DashboardCard } from "@/components/dashboard-card";
import { ArPagination } from "@/components/pagination";
import { SubscriberStatusBadge } from "@/components/subscriber-badge";
import { SubscriberFilters } from "@/components/subscriber-filters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCountAr,
  formatDateAr,
  SUBSCRIBER_FORMS,
} from "@/lib/formatters";
import { getAdminSubscribers } from "@/lib/subscribers";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer",
};

interface Props {
  searchParams: Promise<{
    status?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function SubscribersPage({ searchParams }: Props) {
  const params = await searchParams;
  const norm = (v?: string) => (v && v !== "all" ? v : undefined);
  const filters = {
    status: norm(params.status),
    q: params.q || undefined,
    page: Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1),
    pageSize: PAGE_SIZE,
  };
  const { items, total } = await getAdminSubscribers(filters);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const hrefFor = (page: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries({
      ...params,
      page: page > 1 ? String(page) : undefined,
    })) {
      if (v) sp.set(k, v);
    }
    const qs = sp.toString();
    return qs ? `/dashboard/subscribers?${qs}` : "/dashboard/subscribers";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display flex items-center gap-2 text-2xl font-extrabold">
          <HiEnvelope
            className="text-foreground size-7 shrink-0"
            aria-hidden="true"
          />
          المشتركون
        </h1>
        <span className="text-muted text-sm">
          {formatCountAr(total, SUBSCRIBER_FORMS)}
        </span>
      </div>

      <SubscriberFilters q={filters.q ?? ""} status={filters.status ?? ""} />

      {items.length === 0 ? (
        <CornerFrame>
          <EmptyState className="border-border text-muted flex flex-col items-center gap-2 rounded-md border border-dashed px-4 py-12 text-center">
            <HiEnvelope className="size-8" aria-hidden="true" />
            <p>لا يوجد مشتركون مطابقون.</p>
          </EmptyState>
        </CornerFrame>
      ) : (
        <DashboardCard>
          <Table aria-label="جدول المشتركين">
            <TableHeader>
              <TableRow>
                <TableHead>
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
                <TableHead>
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
                  <TableCell
                    dir="ltr"
                    className="max-w-64 truncate font-medium tabular-nums"
                  >
                    {s.email}
                  </TableCell>
                  <TableCell>
                    <SubscriberStatusBadge status={s.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {s.source ? (SOURCE_LABELS[s.source] ?? s.source) : "-"}
                  </TableCell>
                  <TableCell>
                    <time
                      dateTime={s._createdAt}
                      className="text-muted-foreground"
                    >
                      {formatDateAr(s._createdAt)}
                    </time>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardCard>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center">
          <ArPagination
            page={filters.page}
            totalPages={totalPages}
            hrefFor={hrefFor}
            numbered={false}
            summary
          />
        </div>
      )}
    </div>
  );
}
