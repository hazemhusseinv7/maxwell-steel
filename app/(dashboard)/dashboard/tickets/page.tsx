import { EmptyState } from "@heroui/react";
import NextLink from "next/link";
import {
  HiCalendarDays,
  HiCheckCircle,
  HiFlag,
  HiInbox,
  HiTag,
  HiTicket,
  HiUserCircle,
} from "react-icons/hi2";
import { CornerFrame } from "@/components/corner-frame";
import { DashboardCard } from "@/components/dashboard-card";
import { DashboardFilters } from "@/components/dashboard-filters";
import { ArPagination } from "@/components/pagination";
import { TicketStatusBadge } from "@/components/ticket-badge";
import { TicketTableRow } from "@/components/ticket-table-row";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TICKET_PRIORITIES } from "@/lib/constants";
import { getAdminTickets } from "@/lib/dashboard";
import { formatCountAr, formatDateAr, TICKET_FORMS } from "@/lib/formatters";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

interface Props {
  searchParams: Promise<{
    status?: string;
    category?: string;
    priority?: string;
    from?: string;
    to?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function TicketsPage({ searchParams }: Props) {
  const params = await searchParams;
  const norm = (v?: string) => (v && v !== "all" ? v : undefined);
  const filters = {
    status: norm(params.status),
    category: norm(params.category),
    priority: norm(params.priority),
    from: params.from || undefined,
    to: params.to || undefined,
    q: params.q || undefined,
    page: Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1),
    pageSize: PAGE_SIZE,
  };
  const { items, total } = await getAdminTickets(filters);
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
    return qs ? `/dashboard/tickets?${qs}` : "/dashboard/tickets";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display flex items-center gap-2 text-2xl font-extrabold">
          <HiTicket
            className="text-foreground size-7 shrink-0"
            aria-hidden="true"
          />
          التذاكر
        </h1>
        <span className="text-muted text-sm">
          {formatCountAr(total, TICKET_FORMS)}
        </span>
      </div>

      <DashboardFilters
        q={filters.q ?? ""}
        status={filters.status ?? ""}
        category={filters.category ?? ""}
        priority={filters.priority ?? ""}
        from={filters.from ?? ""}
        to={filters.to ?? ""}
      />

      {items.length === 0 ? (
        <CornerFrame>
          <EmptyState className="border-border text-muted flex flex-col items-center gap-2 rounded-md border border-dashed px-4 py-12 text-center">
            <HiInbox className="size-8" aria-hidden="true" />
            <p>لا توجد تذاكر مطابقة.</p>
          </EmptyState>
        </CornerFrame>
      ) : (
        <DashboardCard>
          <Table aria-label="جدول التذاكر">
            <TableHeader>
              <TableRow>
                <TableHead>
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
                <TableHead>
                  <span className="inline-flex items-center gap-1.5">
                    <HiFlag
                      className="text-bronze size-4 shrink-0"
                      aria-hidden="true"
                    />
                    الأولوية
                  </span>
                </TableHead>
                <TableHead>
                  <span className="inline-flex items-center gap-1.5">
                    <HiUserCircle
                      className="text-bronze size-4 shrink-0"
                      aria-hidden="true"
                    />
                    المعين
                  </span>
                </TableHead>
                <TableHead>
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
                <TicketTableRow key={t._id} id={t._id}>
                  <TableCell>
                    <NextLink
                      href={`/dashboard/tickets/${t._id}`}
                      dir="ltr"
                      className="text-accent font-mono"
                    >
                      {t.reference}
                    </NextLink>
                  </TableCell>
                  <TableCell>
                    <NextLink href={`/dashboard/tickets/${t._id}`}>
                      {t.subject}
                    </NextLink>
                  </TableCell>
                  <TableCell>
                    <TicketStatusBadge status={t.status} />
                  </TableCell>
                  <TableCell>
                    {TICKET_PRIORITIES.find((p) => p.value === t.priority)
                      ?.label ?? t.priority}
                  </TableCell>
                  <TableCell>{t.assignedTo?.name ?? "-"}</TableCell>
                  <TableCell>
                    <time
                      dateTime={t._createdAt}
                      className="text-muted-foreground"
                    >
                      {formatDateAr(t._createdAt)}
                    </time>
                  </TableCell>
                </TicketTableRow>
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
