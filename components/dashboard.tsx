import { DashboardActivity } from "@/components/dashboard-activity";
import { RecentTickets } from "@/components/recent-tickets";
import { DashboardStats } from "@/components/stats";
import { TicketAlerts } from "@/components/ticket-alerts";
import { TicketsPriorityChart } from "@/components/tickets-priority-chart";
import { TicketsResolutionDonut } from "@/components/tickets-resolution-donut";
import { TicketsStatusChart } from "@/components/tickets-status-chart";
import { TicketsTrendChart } from "@/components/tickets-trend-chart";
import type { ActivityEvent, TicketRow } from "@/lib/dashboard";

export interface StatTile {
  label: string;
  value: string;
  change?: number;
  icon: "total" | "open" | "unassigned" | "resolved";
}

export interface DayStatus {
  label: string;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
}

export interface DayCategory {
  label: string;
  general: number;
  technical: number;
  billing: number;
  content: number;
  suggestion: number;
  other: number;
}

export interface SliceCount {
  key: string;
  label: string;
  value: number;
  fill: string;
}

export interface DashboardData {
  tiles: StatTile[];
  byStatus: DayStatus[];
  categories: DayCategory[];
  byPriority: SliceCount[];
  byCategory: SliceCount[];
  resolvedCount: number;
  resolutionDelta: number;
  recent: TicketRow[];
  activity: ActivityEvent[];
  openCount: number;
  unassignedCount: number;
}

export function Dashboard({ data }: { data: DashboardData }) {
  return (
    <div className="bg-border grid grid-cols-1 gap-px p-px md:grid-cols-2 lg:grid-cols-4">
      <DashboardStats tiles={data.tiles} />
      <TicketsStatusChart data={data.byStatus} />
      <TicketsTrendChart data={data.categories} />
      <TicketsPriorityChart data={data.byPriority} />
      <TicketsResolutionDonut
        byCategory={data.byCategory}
        resolved={data.resolvedCount}
        resolutionDelta={data.resolutionDelta}
      />
      <RecentTickets items={data.recent} />
      <TicketAlerts open={data.openCount} unassigned={data.unassignedCount} />
      <DashboardActivity items={data.activity} />
    </div>
  );
}
