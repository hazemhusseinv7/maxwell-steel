import NextLink from "next/link";
import { HiClock, HiTicket } from "react-icons/hi2";
import { DashboardCard } from "@/components/dashboard-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { ActivityEvent } from "@/lib/dashboard";
import { formatDateTimeAr } from "@/lib/formatters";

export function DashboardActivity({ items }: { items: ActivityEvent[] }) {
  return (
    <DashboardCard className="gap-0">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-1.5">
          <HiClock className="text-bronze size-4 shrink-0" aria-hidden="true" />
          النشاط
        </CardTitle>
        <CardDescription>أحدث الأحداث على التذاكر.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {items.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon" className="bg-warning-soft">
                <HiTicket aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>لا نشاط بعد</EmptyTitle>
              <EmptyDescription className="text-xs">
                ستظهر هنا الأحداث فور حدوثها على التذاكر.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="divide-border flex flex-col divide-y">
            {items.map((item) => (
              <li key={`${item.ticketId}-${item.createdAt}-${item.type}`}>
                <NextLink
                  href={`/dashboard/tickets/${item.ticketId}`}
                  className="hover:bg-muted/50 flex h-16 items-center gap-3 px-6 transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground flex size-10 shrink-0 items-center justify-center [&_svg]:size-4"
                  >
                    <HiTicket />
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-foreground line-clamp-1 text-sm leading-snug text-pretty">
                      {item.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      <time dateTime={item.createdAt}>
                        {formatDateTimeAr(item.createdAt)}
                      </time>
                      {item.actor ? ` · ${item.actor}` : ""}
                      {item.ticketRef ? ` · ${item.ticketRef}` : ""}
                    </p>
                  </div>
                </NextLink>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </DashboardCard>
  );
}
