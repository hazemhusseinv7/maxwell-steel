import {
  HiCheckCircle,
  HiEnvelope,
  HiInbox,
  HiTicket,
  HiUserPlus,
} from "react-icons/hi2";
import type { StatTile } from "@/components/dashboard";
import { DashboardCard } from "@/components/dashboard-card";
import {
  TrendBadge,
  TrendBadgeIcon,
  TrendBadgeValue,
} from "@/components/trend-badge";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TILE_ICONS = {
  total: HiTicket,
  open: HiInbox,
  unassigned: HiUserPlus,
  resolved: HiCheckCircle,
  subscribers: HiEnvelope,
} as const;

export function DashboardStats({ tiles }: { tiles: StatTile[] }) {
  return (
    <>
      {tiles.map((s) => {
        const Icon = TILE_ICONS[s.icon];
        return (
          <DashboardCard key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-1.5 text-xs font-normal tracking-wide">
                <Icon
                  className="text-bronze size-4 shrink-0"
                  aria-hidden="true"
                />
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row items-center gap-2">
              <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
            </CardContent>
            <CardFooter className="bg-background gap-1 rounded-none text-xs">
              {s.change == null || s.change === 0 ? (
                <span className="text-muted-foreground">الإجمالي الحالي</span>
              ) : (
                <>
                  <TrendBadge value={s.change}>
                    <TrendBadgeIcon />
                    <TrendBadgeValue />
                  </TrendBadge>
                  <span className="text-muted-foreground">
                    مقارنة بالأسبوع الماضي
                  </span>
                </>
              )}
            </CardFooter>
          </DashboardCard>
        );
      })}
    </>
  );
}
