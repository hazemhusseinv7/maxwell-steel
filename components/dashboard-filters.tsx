"use client";

import { Button } from "@heroui/react";
import type { ReactNode } from "react";
import { BsCalendar2RangeFill } from "react-icons/bs";
import {
  HiCheckCircle,
  HiFlag,
  HiFunnel,
  HiMagnifyingGlass,
  HiTag,
} from "react-icons/hi2";

import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "@/lib/constants";
import {
  TICKET_CATEGORY_ICONS,
  TICKET_PRIORITY_ICONS,
  TICKET_STATUS_ICONS,
} from "@/lib/option-icons";
import { DateFilter } from "./date-filter";
import { FilterSelect } from "./form-select";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

interface Props {
  q: string;
  status: string;
  category: string;
  priority: string;
  from: string;
  to: string;
}

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

export function DashboardFilters({
  q,
  status,
  category,
  priority,
  from,
  to,
}: Props) {
  return (
    <form
      method="get"
      className="texture-panel border-border bg-surface-secondary shadow-surface card-gradient grid items-end gap-3 rounded-none border p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="min-w-0">
        <label
          htmlFor="dashboard-search"
          className="text-foreground mb-1.5 block text-sm font-medium"
        >
          <FilterLabel
            icon={
              <HiMagnifyingGlass className={LABEL_ICON} aria-hidden="true" />
            }
          >
            بحث
          </FilterLabel>
        </label>
        <div className="relative min-w-0">
          <HiMagnifyingGlass
            className="text-muted pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            id="dashboard-search"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="مرجع / موضوع / بريد…"
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
        options={TICKET_STATUSES.map((s) => ({
          value: s.value,
          label: s.label,
          icon: TICKET_STATUS_ICONS[s.value],
        }))}
      />
      <FilterSelect
        name="category"
        ariaLabel="التصنيف"
        label={
          <FilterLabel
            icon={<HiTag className={LABEL_ICON} aria-hidden="true" />}
          >
            التصنيف
          </FilterLabel>
        }
        allLabel="كل التصنيفات"
        defaultValue={category || "all"}
        options={TICKET_CATEGORIES.map((c) => ({
          value: c.value,
          label: c.label,
          icon: TICKET_CATEGORY_ICONS[c.value],
        }))}
      />
      <FilterSelect
        name="priority"
        ariaLabel="الأولوية"
        label={
          <FilterLabel
            icon={<HiFlag className={LABEL_ICON} aria-hidden="true" />}
          >
            الأولوية
          </FilterLabel>
        }
        allLabel="كل الأولويات"
        defaultValue={priority || "all"}
        options={TICKET_PRIORITIES.map((p) => ({
          value: p.value,
          label: p.label,
          icon: TICKET_PRIORITY_ICONS[p.value],
        }))}
      />
      <DateFilter
        name="from"
        ariaLabel="من تاريخ"
        label={
          <FilterLabel
            icon={
              <BsCalendar2RangeFill className={LABEL_ICON} aria-hidden="true" />
            }
          >
            من تاريخ
          </FilterLabel>
        }
        defaultValue={from}
      />
      <DateFilter
        name="to"
        ariaLabel="إلى تاريخ"
        label={
          <FilterLabel
            icon={
              <BsCalendar2RangeFill className={LABEL_ICON} aria-hidden="true" />
            }
          >
            إلى تاريخ
          </FilterLabel>
        }
        defaultValue={to}
      />
      <Button
        type="submit"
        variant="primary"
        className="sm:col-span-2 lg:col-span-2"
      >
        <HiFunnel className="size-4" aria-hidden="true" />
        تصفية
      </Button>
    </form>
  );
}
