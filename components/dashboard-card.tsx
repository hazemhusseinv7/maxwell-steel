import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LogoPattern } from "./logo-pattern";

export function DashboardCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn(
        "bg-background relative isolate rounded-none shadow-none ring-0",
        className,
      )}
      {...props}
    >
      <LogoPattern className="-z-10 opacity-[0.05]" />
      {children}
    </Card>
  );
}
