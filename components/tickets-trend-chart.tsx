"use client";

import { useMemo, useState } from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type RangeDays,
  RangeFilter,
  SeriesToggles,
} from "@/components/chart-filters";
import type { DayCategory } from "@/components/dashboard";
import { DashboardCard } from "@/components/dashboard-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/chart-meta";
import { TICKET_CATEGORY_ICONS } from "@/lib/option-icons";

const chartConfig = CATEGORY_META satisfies ChartConfig;

const KEYS = [...CATEGORY_ORDER];

export function TicketsTrendChart({ data }: { data: DayCategory[] }) {
  const [range, setRange] = useState<RangeDays>(30);
  const [active, setActive] = useState<ReadonlySet<string>>(
    () => new Set<string>(KEYS),
  );
  const rows = useMemo(() => data.slice(-range), [data, range]);
  const interval = Math.max(0, Math.floor((rows.length - 1) / 8));
  const totals = useMemo(() => {
    const sums: Record<string, number> = {};
    for (const key of KEYS) sums[key] = 0;
    for (const row of rows) {
      for (const key of KEYS) sums[key] += row[key] ?? 0;
    }
    return sums;
  }, [rows]);

  function toggle(key: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <DashboardCard className="gap-0 md:col-span-2 lg:col-span-4">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-1.5">
            <HiArrowTrendingUp
              className="text-bronze size-4 shrink-0"
              aria-hidden="true"
            />
            اتجاه التذاكر حسب التصنيف
          </CardTitle>
          <RangeFilter value={range} onChange={setRange} />
        </div>
        <SeriesToggles
          series={KEYS.map((key) => ({
            key,
            label: CATEGORY_META[key].label,
            color: CATEGORY_META[key].color,
            icon: TICKET_CATEGORY_ICONS[key],
          }))}
          active={active}
          onToggle={toggle}
          totals={totals}
        />
        <CardDescription>التذاكر المستلمة يومياً حسب التصنيف.</CardDescription>
      </CardHeader>
      <CardContent>
        <div dir="ltr">
          <ChartContainer
            className="aspect-auto h-60 w-full p-0 md:h-80"
            config={chartConfig}
          >
            <LineChart
              accessibilityLayer
              data={rows}
              margin={{ left: 12, right: 12, top: 8 }}
            >
              <CartesianGrid className="stroke-border" vertical={false} />
              <XAxis
                axisLine={false}
                dataKey="label"
                interval={interval}
                tickLine={false}
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              {KEYS.map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  dot={false}
                  hide={!active.has(key)}
                  stroke={`var(--color-${key})`}
                  strokeWidth={2}
                  type="monotone"
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
