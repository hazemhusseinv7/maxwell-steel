"use client";
import * as React from "react";
import {
  HiArrowDown,
  HiArrowTrendingDown,
  HiArrowTrendingUp,
  HiArrowUp,
  HiChevronDown,
  HiChevronUp,
  HiMinus,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TrendBadgeIconVariant = "default" | "trend" | "arrow";
type TrendBadgeVariant = "default" | "badge";

type TrendBadgeContextValue = {
  value: number;
};

const TrendBadgeContext = React.createContext<TrendBadgeContextValue | null>(
  null,
);

function useTrendBadgeValue() {
  const context = React.useContext(TrendBadgeContext);

  if (!context) {
    throw new Error(
      "TrendBadgeIcon and TrendBadgeValue must be used inside a `TrendBadge` component.",
    );
  }

  return context.value;
}

function TrendBadge({
  className,
  value,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  value: number;
  variant?: TrendBadgeVariant;
}) {
  return (
    <TrendBadgeContext.Provider value={{ value }}>
      {variant === "badge" ? (
        <Badge
          className={cn(
            "gap-1 border-none tabular-nums [&_svg]:size-4 [&_svg]:shrink-0",
            value > 0 ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger",
            className,
          )}
          data-slot="trend-badge"
          variant="secondary"
          {...(props as React.ComponentProps<typeof Badge>)}
        />
      ) : (
        <div
          className={cn(
            "text-muted-foreground inline-flex items-center gap-1 tabular-nums",
            "[&_svg]:size-3 [&_svg]:shrink-0",
            value > 0 ? "text-accent" : "",
            value < 0 ? "text-danger" : "",
            className,
          )}
          data-slot="trend-badge"
          {...props}
        />
      )}
    </TrendBadgeContext.Provider>
  );
}

function FilledShell({
  value,
  children,
}: {
  value: number;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-3 shrink-0 items-center justify-center rounded-full",
        "[&_svg]:text-background [&_svg]:size-2! [&_svg]:shrink-0 [&_svg]:stroke-3!",
        value > 0 && "bg-accent",
        value < 0 && "bg-danger",
        (!value || value === 0) && "bg-muted-foreground",
      )}
      data-slot="trend-badge-icon"
    >
      {children}
    </span>
  );
}

function TrendBadgeIcon({
  variant = "default",
  filled = false,
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "fill"> & {
  variant?: TrendBadgeIconVariant;
  filled?: boolean;
}) {
  const resolvedValue = useTrendBadgeValue();

  const mergedClassName = cn(className);

  const shell = (node: React.ReactElement) =>
    filled ? <FilledShell value={resolvedValue}>{node}</FilledShell> : node;

  const slotProps = filled ? {} : { "data-slot": "delta-icon" as const };

  if (!resolvedValue || resolvedValue === 0) {
    return shell(
      <HiMinus {...slotProps} className={mergedClassName} {...props} />,
    );
  }

  if (resolvedValue > 0) {
    if (variant === "trend") {
      return shell(
        <HiArrowTrendingUp
          {...slotProps}
          className={mergedClassName}
          {...props}
        />,
      );
    }

    if (variant === "arrow") {
      return shell(
        <HiArrowUp {...slotProps} className={mergedClassName} {...props} />,
      );
    }

    return shell(
      <HiChevronUp {...slotProps} className={mergedClassName} {...props} />,
    );
  }

  if (variant === "trend") {
    return shell(
      <HiArrowTrendingDown
        {...slotProps}
        className={mergedClassName}
        {...props}
      />,
    );
  }

  if (variant === "arrow") {
    return shell(
      <HiArrowDown {...slotProps} className={mergedClassName} {...props} />,
    );
  }

  return shell(
    <HiChevronDown {...slotProps} className={mergedClassName} {...props} />,
  );
}

function TrendBadgeValue({
  className,
  precision = 1,
  suffix = "%",
  absolute = true,
  ...props
}: React.ComponentProps<"span"> & {
  precision?: number;
  suffix?: string;
  absolute?: boolean;
}) {
  const resolvedValue = useTrendBadgeValue();

  const formattedValue = (
    absolute ? Math.abs(resolvedValue) : resolvedValue
  ).toFixed(precision);

  return (
    <span
      className={cn("tabular-nums", className)}
      data-slot="trend-badge-value"
      {...props}
    >
      {formattedValue}
      {suffix}
    </span>
  );
}
export { TrendBadge, TrendBadgeIcon, TrendBadgeValue };
