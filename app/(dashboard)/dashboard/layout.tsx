import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/app-shell";
import { isAdmin } from "@/lib/admin";
import { getAdminTickets } from "@/lib/dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAdmin())) redirect("/");

  const { total: openCount } = await getAdminTickets({
    status: "open",
    pageSize: 1,
  });

  return <AppShell alertCount={openCount}>{children}</AppShell>;
}
