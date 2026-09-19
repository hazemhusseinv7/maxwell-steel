import { HiArchiveBox, HiCheckCircle, HiClock, HiInbox } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { TICKET_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function statusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "open":
      return "default";
    case "inProgress":
      return "default";
    case "resolved":
      return "default";
    default:
      return "destructive";
  }
}

const STATUS_ICONS = {
  open: HiInbox,
  inProgress: HiClock,
  resolved: HiCheckCircle,
  closed: HiArchiveBox,
} as const;

export function TicketStatusBadge({ status }: { status: string }) {
  const Icon = STATUS_ICONS[status as keyof typeof STATUS_ICONS] ?? HiInbox;
  return (
    <Badge
      variant={statusVariant(status)}
      className={cn(
        "min-w-24 justify-center gap-1",
        status === "open" && "bg-warning-soft text-warning-foreground",
        status === "inProgress" && "bg-accent text-accent-foreground",
        status === "resolved" && "bg-foreground text-background",
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {TICKET_STATUSES.find((s) => s.value === status)?.label ?? status}
    </Badge>
  );
}
