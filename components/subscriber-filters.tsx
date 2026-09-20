"use client";

import { Button } from "@heroui/react";
import type { ReactNode } from "react";
import {
  HiCheckCircle,
  HiEnvelope,
  HiFunnel,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { FilterSelect } from "./form-select";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

const LABEL_ICON = "size-4 shrink-0 text-bronze";

function FilterLabel({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {children}
    </span>
  );
}

const STATUS_OPTIONS = [
  { value: "confirmed", label: "مؤكد" },
  { value: "pending", label: "بانتظار التأكيد" },
  { value: "unsubscribed", label: "ألغى الاشتراك" },
];

export function SubscriberFilters({
  q,
  status,
}: {
  q: string;
  status: string;
}) {
  return (
    <form
      method="get"
      className="texture-panel border-border bg-surface-secondary shadow-surface card-gradient grid items-end gap-3 rounded-none border p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="min-w-0 lg:col-span-2">
        <label
          htmlFor="subscribers-search"
          className="text-foreground mb-1.5 block text-sm font-medium"
        >
          <FilterLabel
            icon={
              <HiMagnifyingGlass className={LABEL_ICON} aria-hidden="true" />
            }
          >
            بحث بالبريد
          </FilterLabel>
        </label>
        <div className="relative min-w-0">
          <HiMagnifyingGlass
            className="text-muted pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            id="subscribers-search"
            type="search"
            name="q"
            dir="ltr"
            defaultValue={q}
            placeholder="name@example.com"
            className={`${inputClass} ps-9`}
          />
        </div>
      </div>
      <FilterSelect
        name="status"
        ariaLabel="الحالة"
        label={
          <FilterLabel
            icon={<HiCheckCircle className={LABEL_ICON} aria-hidden="true" />}
          >
            الحالة
          </FilterLabel>
        }
        allLabel="كل الحالات"
        defaultValue={status || "all"}
        options={STATUS_OPTIONS.map((s) => ({
          value: s.value,
          label: s.label,
          icon: <HiEnvelope className={LABEL_ICON} aria-hidden="true" />,
        }))}
      />
      <Button type="submit" variant="primary">
        <HiFunnel className="size-4" aria-hidden="true" />
        تصفية
      </Button>
    </form>
  );
}
