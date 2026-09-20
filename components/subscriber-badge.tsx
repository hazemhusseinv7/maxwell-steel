import { HiCheckCircle, HiClock, HiMinusCircle } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import type { SubscriberStatus } from "@/lib/subscribers";
import { cn } from "@/lib/utils";

const STATUS_META: Record<
  SubscriberStatus,
  { label: string; Icon: typeof HiCheckCircle }
> = {
  confirmed: { label: "مؤكد", Icon: HiCheckCircle },
  pending: { label: "بانتظار التأكيد", Icon: HiClock },
  unsubscribed: { label: "ألغى الاشتراك", Icon: HiMinusCircle },
};

export function SubscriberStatusBadge({ status }: { status: string }) {
  const meta = (
    STATUS_META as Record<
      string,
      (typeof STATUS_META)[SubscriberStatus] | undefined
    >
  )[status];
  const { label, Icon } = meta ?? {
    label: status,
    Icon: HiMinusCircle,
  };
  return (
    <Badge
      variant="default"
      className={cn(
        "min-w-24 justify-center gap-1",
        status === "confirmed" && "bg-accent text-accent-foreground",
        status === "pending" && "bg-warning-soft text-warning-soft-foreground",
        status === "unsubscribed" &&
          "bg-surface-secondary text-muted border-border border",
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {label}
    </Badge>
  );
}
