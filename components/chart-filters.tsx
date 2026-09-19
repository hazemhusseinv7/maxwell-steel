import type { ReactNode } from "react";
import {
  type ArabicCountForms,
  formatCountAr,
  TICKET_FORMS,
} from "@/lib/formatters";
import { cn } from "@/lib/utils";

export const RANGES = [7, 30, 90] as const;
export type RangeDays = (typeof RANGES)[number];

const DAY_FORMS: ArabicCountForms = {
  one: "يوم",
  two: "يومان",
  few: "أيام",
  many: "يومًا",
};

const buttonClass = (active: boolean) =>
  cn(
    "cursor-pointer rounded-md border px-2.5 py-1 text-xs transition-colors",
    active
      ? "border-accent bg-accent font-bold text-accent-foreground"
      : "border-border hover:border-accent hover:text-accent",
  );

export function RangeFilter({
  value,
  onChange,
}: {
  value: RangeDays;
  onChange: (range: RangeDays) => void;
}) {
  return (
    <fieldset
      className="flex items-center gap-1.5 border-0 p-0"
      aria-label="النطاق الزمني"
    >
      {RANGES.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-pressed={value === n}
          className={buttonClass(value === n)}
        >
          {formatCountAr(n, DAY_FORMS)}
        </button>
      ))}
    </fieldset>
  );
}

export function SeriesToggles({
  series,
  active,
  onToggle,
  totals,
}: {
  series: Array<{
    key: string;
    label: string;
    color: string;
    icon?: ReactNode;
  }>;
  active: ReadonlySet<string>;
  onToggle: (key: string) => void;
  totals?: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap items-stretch gap-1.5">
      {series.map((s) => {
        const on = active.has(s.key);
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onToggle(s.key)}
            aria-pressed={on}
            className={cn(
              "min-w-28 flex-1 cursor-pointer rounded-none border px-3 py-3 text-start transition-colors",
              on
                ? "border-accent bg-accent-soft"
                : "border-border hover:border-accent opacity-50",
            )}
          >
            <span className="text-muted flex items-center gap-1.5 text-xs">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden="true"
              />
              {s.icon}
              {s.label}
            </span>
            <span className="text-foreground mt-1 block text-xl font-bold tabular-nums">
              {formatCountAr(totals?.[s.key] ?? 0, TICKET_FORMS)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
