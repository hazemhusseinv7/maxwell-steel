"use client";

import { cloneElement, isValidElement } from "react";
import { HiFlag } from "react-icons/hi2";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import type { SliceCount } from "@/components/dashboard";
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
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";
import { PRIORITY_META } from "@/lib/chart-meta";
import { formatNumberAr } from "@/lib/formatters";
import { TICKET_PRIORITY_ICONS } from "@/lib/option-icons";

const chartConfig = {
  ...PRIORITY_META,
  label: { color: "var(--background)" },
} satisfies ChartConfig;

function PriorityTooltipContent({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    value?: string | number;
    payload?: { key?: string; label?: string };
  }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      dir="rtl"
      className="border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-none border px-2.5 py-1.5 text-xs shadow-xl"
    >
      {payload.map((p, i) => {
        const key = p.payload?.key ?? String(i);
        return (
          <div key={key} className="flex items-center gap-1.5">
            {TICKET_PRIORITY_ICONS[key]}
            <span className="text-muted-foreground">
              {p.payload?.label ?? key}
            </span>
            <span className="ms-auto font-medium tabular-nums">
              {formatNumberAr(Number(p.value) || 0)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PriorityIconLegend({ items }: { items: SliceCount[] }) {
  return (
    <div
      dir="rtl"
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
    >
      {items.map((d) => (
        <span
          key={d.key}
          className="text-muted flex items-center gap-1 text-xs"
        >
          {TICKET_PRIORITY_ICONS[d.key]}
          {d.label}
        </span>
      ))}
    </div>
  );
}

export function TicketsPriorityChart({ data }: { data: SliceCount[] }) {
  function renderBarIcon(props: { viewBox?: unknown; index?: number }) {
    const vb = props.viewBox as
      { x?: number; y?: number; width?: number; height?: number } | undefined;
    const datum = props.index != null ? data[props.index] : undefined;
    if (
      !datum ||
      vb?.x == null ||
      vb?.y == null ||
      vb?.width == null ||
      vb?.height == null
    )
      return null;
    const node = TICKET_PRIORITY_ICONS[datum.key];
    const icon = isValidElement<{ className?: string }>(node)
      ? cloneElement(node, { className: "size-4 shrink-0 text-white" })
      : null;
    if (!icon) return null;
    const nameX = Number(vb.x) + Number(vb.width) + 30;
    const nx = nameX - 24;
    const ny = Number(vb.y) + Number(vb.height) / 2;
    return (
      <g transform={`translate(${nx}, ${ny - 8})`}>
        {icon}
        <text
          x={Math.abs(Number(vb.width)) - 14}
          y={8}
          textAnchor="end"
          dominantBaseline="central"
          fontSize={12}
          className="fill-white"
        >
          {datum.value > 0 ? formatNumberAr(datum.value) : ""}
        </text>
      </g>
    );
  }
  return (
    <DashboardCard className="gap-0 md:col-span-2">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="flex items-center gap-1.5">
            <HiFlag
              className="text-bronze size-4 shrink-0"
              aria-hidden="true"
            />
            التذاكر حسب الأولوية
          </CardTitle>
        </div>
        <CardDescription>
          التذاكر غير المغلقة حسب ترتيب الأولوية.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div dir="ltr" className="flex min-h-60 flex-1 md:min-h-80">
          <ChartContainer className="h-full w-full" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{ left: 16 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                axisLine={false}
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                type="category"
                hide
              />
              <XAxis dataKey="value" hide type="number" reversed />
              <ChartTooltip
                content={(props: React.ComponentProps<typeof ChartTooltip>) => (
                  <PriorityTooltipContent {...props} />
                )}
                cursor={false}
              />
              <Bar dataKey="value" radius={0}>
                {data.map((d) => (
                  <Cell key={d.key} fill={d.fill} />
                ))}
                <LabelList
                  dataKey="label"
                  position="insideRight"
                  offset={30}
                  className="fill-(--color-label)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="label"
                  position="insideRight"
                  offset={8}
                  content={renderBarIcon}
                />
              </Bar>
              <ChartLegend content={<PriorityIconLegend items={data} />} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
