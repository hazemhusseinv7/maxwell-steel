"use client";

import {
  HiArrowTrendingDown,
  HiArrowTrendingUp,
  HiCheckCircle,
} from "react-icons/hi2";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";
import type { SliceCount } from "@/components/dashboard";
import { DashboardCard } from "@/components/dashboard-card";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { formatNumberAr } from "@/lib/formatters";

const chartConfig = {
  resolved: { label: "محلولة", color: "var(--accent)" },
} satisfies ChartConfig;

const ACTIVE_INDEX = 0;

function DonutTooltipContent({
  active,
  data,
}: {
  active?: boolean;
  data: SliceCount[];
}) {
  if (!active) return null;
  return (
    <div
      dir="rtl"
      className="border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-none border px-2.5 py-1.5 text-xs shadow-xl"
    >
      {data.map((d) => (
        <div key={d.key} className="flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: d.fill }}
            aria-hidden="true"
          />
          <span className="text-muted-foreground">{d.label}</span>
          <span className="ms-auto font-medium tabular-nums">
            {formatNumberAr(d.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TicketsResolutionDonut({
  byCategory,
  resolved,
  resolutionDelta,
}: {
  byCategory: SliceCount[];
  resolved: number;
  resolutionDelta: number;
}) {
  const slices = [
    {
      key: "resolved",
      label: "محلولة",
      value: resolved,
      fill: "var(--color-resolved)",
    },
    ...byCategory.flatMap((d, i) =>
      d.value > 0
        ? [
            {
              ...d,
              fill: `color-mix(in oklab, var(--muted) ${Math.max(20, 72 - i * 10)}%, transparent)`,
            },
          ]
        : [],
    ),
  ];
  const total = slices.reduce((s, d) => s + d.value, 0);
  const pct = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const up = resolutionDelta >= 0;
  const flat = resolutionDelta === 0;
  const TrendIcon = up ? HiArrowTrendingUp : HiArrowTrendingDown;
  return (
    <DashboardCard className="gap-0 md:col-span-2">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="flex items-center gap-1.5">
            <HiCheckCircle
              className="text-bronze size-4 shrink-0"
              aria-hidden="true"
            />
            معدل الحل
          </CardTitle>
        </div>
        <CardDescription>المحلولة مقابل باقي التصنيفات.</CardDescription>
      </CardHeader>
      <CardContent>
        <div dir="ltr">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-60 w-full md:max-h-80"
          >
            <PieChart accessibilityLayer>
              <ChartTooltip
                cursor={false}
                content={(props: React.ComponentProps<typeof ChartTooltip>) => (
                  <DonutTooltipContent {...props} data={slices} />
                )}
              />
              <Pie
                data={slices}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
                shape={({
                  index,
                  outerRadius = 0,
                  ...props
                }: PieSectorShapeProps) =>
                  index === ACTIVE_INDEX ? (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  ) : (
                    <Sector {...props} outerRadius={outerRadius} />
                  )
                }
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          dominantBaseline="middle"
                          textAnchor="middle"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          <tspan
                            className="fill-foreground text-3xl font-bold"
                            x={viewBox.cx}
                            y={viewBox.cy}
                          >
                            {formatNumberAr(pct)}٪
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="bg-warning-soft flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {flat ? (
            "استقر معدل الحل"
          ) : (
            <>
              {up ? "ارتفع" : "انخفض"} معدل الحل بـ{" "}
              {formatNumberAr(Math.abs(Math.round(resolutionDelta * 10) / 10))}٪
              <TrendIcon className="size-4 shrink-0" aria-hidden="true" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          عرض إجمالي التذاكر
        </div>
      </CardFooter>
    </DashboardCard>
  );
}
