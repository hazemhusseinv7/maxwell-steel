"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function TicketTableRow({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/dashboard/tickets/${id}`)}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </TableRow>
  );
}
