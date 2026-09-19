import NextLink from "next/link";
import { HiBell, HiCheckCircle, HiInbox } from "react-icons/hi2";
import { DashboardCard } from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatNumberAr } from "@/lib/formatters";

export function TicketAlerts({
  open,
  unassigned,
}: {
  open: number;
  unassigned: number;
}) {
  const clear = open === 0 && unassigned === 0;
  return (
    <DashboardCard className="gap-0">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-1.5 text-base text-balance">
          <HiBell className="text-bronze size-4 shrink-0" aria-hidden="true" />
          تنبيهات
        </CardTitle>
        <CardDescription className="text-pretty">
          تذاكر تحتاج انتباهك.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full items-center px-0">
        {clear ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HiCheckCircle aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>لا تنبيهات</EmptyTitle>
              <EmptyDescription className="text-xs">
                كل التذاكر معينة ولا توجد تذاكر مفتوحة.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon" className="bg-warning-soft">
                <HiBell aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>
                {formatNumberAr(open + unassigned)} تحتاج انتباهك
              </EmptyTitle>
              <EmptyDescription className="text-xs">
                {formatNumberAr(open)} مفتوحة · {formatNumberAr(unassigned)} غير
                معينة
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              {open > 0 ? (
                <NextLink href="/dashboard/tickets?status=open">
                  <Button
                    variant="default"
                    className="bg-warning-soft text-warning-foreground hover:bg-accent cursor-pointer hover:text-white"
                  >
                    <HiInbox className="size-4" aria-hidden="true" />
                    المفتوحة
                  </Button>
                </NextLink>
              ) : null}
              {unassigned > 0 ? (
                <NextLink href="/dashboard/tickets">
                  <Button
                    variant="outline"
                    className="hover:bg-foreground hover:text-background cursor-pointer"
                  >
                    عرض الكل
                  </Button>
                </NextLink>
              ) : null}
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
    </DashboardCard>
  );
}
