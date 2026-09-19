import { HiSquares2X2 } from "react-icons/hi2";
import { Dashboard, type SliceCount } from "@/components/dashboard";
import { CATEGORY_META, PRIORITY_META, PRIORITY_ORDER } from "@/lib/chart-meta";
import {
  getAdminTickets,
  getRecentActivity,
  getTicketStats,
} from "@/lib/dashboard";
import { formatNumberAr } from "@/lib/formatters";

export const dynamic = "force-dynamic";

const weekdayAr = new Intl.DateTimeFormat("ar", { weekday: "short" });

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function lastDays(n: number): { key: string; label: string }[] {
  const today = new Date();
  const days: { key: string; label: string }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({ key: dayKey(d), label: weekdayAr.format(d) });
  }
  return days;
}

export default async function DashboardHome() {
  const [stats, recent, activity] = await Promise.all([
    getTicketStats(),
    getAdminTickets({ pageSize: 10 }),
    getRecentActivity(),
  ]);

  let total = 0;
  let open = 0;
  let unassigned = 0;
  let resolved = 0;
  const perDay = new Map<string, number>();
  const perDayStatus = new Map<
    string,
    { open: number; inProgress: number; resolved: number; closed: number }
  >();
  const priorityCounts = new Map<string, number>();
  const unresolvedByCategory = new Map<string, number>();
  const categoryCounts = new Map<string, number>();
  const perDayCategory = new Map<string, Record<string, number>>();
  for (const t of stats) {
    total++;
    if (t.status === "open") open++;
    if (t.status === "resolved") resolved++;
    if (!t.assignedTo?.clerkId) unassigned++;
    if (t.status !== "closed") {
      priorityCounts.set(t.priority, (priorityCounts.get(t.priority) ?? 0) + 1);
    }
    const catKey = t.category in CATEGORY_META ? t.category : "other";
    if (t.status !== "resolved") {
      unresolvedByCategory.set(
        catKey,
        (unresolvedByCategory.get(catKey) ?? 0) + 1,
      );
    }
    categoryCounts.set(catKey, (categoryCounts.get(catKey) ?? 0) + 1);
    perDay.set(
      t._createdAt.slice(0, 10),
      (perDay.get(t._createdAt.slice(0, 10)) ?? 0) + 1,
    );
    const day = perDayStatus.get(t._createdAt.slice(0, 10)) ?? {
      open: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
    };
    if (t.status === "inProgress") day.inProgress++;
    else if (t.status === "resolved") day.resolved++;
    else if (t.status === "closed") day.closed++;
    else day.open++;
    perDayStatus.set(t._createdAt.slice(0, 10), day);
    const catDay = perDayCategory.get(t._createdAt.slice(0, 10)) ?? {};
    catDay[catKey] = (catDay[catKey] ?? 0) + 1;
    perDayCategory.set(t._createdAt.slice(0, 10), catDay);
  }

  const week = lastDays(7);
  const quarter = lastDays(90);
  const priorWeek = lastDays(14).slice(0, 7);
  const newThisWeek = week.reduce((s, d) => s + (perDay.get(d.key) ?? 0), 0);
  const newPriorWeek = priorWeek.reduce(
    (s, d) => s + (perDay.get(d.key) ?? 0),
    0,
  );
  const wow =
    newPriorWeek === 0
      ? newThisWeek > 0
        ? 100
        : 0
      : ((newThisWeek - newPriorWeek) / newPriorWeek) * 100;

  const byPriority: SliceCount[] = PRIORITY_ORDER.map((key) => ({
    key,
    label: PRIORITY_META[key]?.label ?? key,
    fill: PRIORITY_META[key]?.color ?? "var(--muted)",
    value: priorityCounts.get(key) ?? 0,
  }));
  for (const [key, value] of priorityCounts) {
    if (!(key in PRIORITY_META)) {
      byPriority.push({ key, label: key, fill: "var(--muted)", value });
    }
  }
  const byCategory: SliceCount[] = [...unresolvedByCategory.keys()]
    .sort()
    .map((key) => ({
      key,
      label: CATEGORY_META[key as keyof typeof CATEGORY_META]?.label ?? key,
      fill:
        CATEGORY_META[key as keyof typeof CATEGORY_META]?.color ??
        "var(--muted)",
      value: unresolvedByCategory.get(key) ?? 0,
    }));
  const resolutionDelta = (() => {
    const last30 = lastDays(30);
    const prev30 = lastDays(60).slice(0, 30);
    const share = (days: { key: string }[]) => {
      let r = 0;
      let n = 0;
      for (const d of days) {
        const s = perDayStatus.get(d.key);
        if (!s) continue;
        const dayTotal = s.open + s.inProgress + s.resolved + s.closed;
        r += s.resolved;
        n += dayTotal;
      }
      return n > 0 ? (r / n) * 100 : 0;
    };
    return share(last30) - share(prev30);
  })();

  return (
    <div className="space-y-6">
      <h1 className="font-display flex items-center gap-2 text-2xl font-extrabold">
        <HiSquares2X2
          className="text-foreground size-7 shrink-0"
          aria-hidden="true"
        />
        نظرة عامة
      </h1>
      <Dashboard
        data={{
          tiles: [
            {
              label: "إجمالي التذاكر",
              value: formatNumberAr(total),
              change: Math.round(wow * 10) / 10,
              icon: "total",
            },
            { label: "مفتوحة", value: formatNumberAr(open), icon: "open" },
            {
              label: "غير معينة",
              value: formatNumberAr(unassigned),
              icon: "unassigned",
            },
            {
              label: "محلولة",
              value: formatNumberAr(resolved),
              icon: "resolved",
            },
          ],
          byStatus: quarter.map((d) => ({
            label: d.label,
            ...(perDayStatus.get(d.key) ?? {
              open: 0,
              inProgress: 0,
              resolved: 0,
              closed: 0,
            }),
          })),
          categories: quarter.map((d) => {
            const cats = perDayCategory.get(d.key) ?? {};
            return {
              label: d.label,
              general: cats.general ?? 0,
              technical: cats.technical ?? 0,
              billing: cats.billing ?? 0,
              content: cats.content ?? 0,
              suggestion: cats.suggestion ?? 0,
              other: cats.other ?? 0,
            };
          }),
          recent: recent.items,
          activity,
          openCount: open,
          unassignedCount: unassigned,
          byPriority,
          byCategory,
          resolvedCount: resolved,
          resolutionDelta,
        }}
      />
    </div>
  );
}
