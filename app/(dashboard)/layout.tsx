import type { ReactNode } from "react";
import "../globals.css";
import { DocumentShell } from "@/components/document-shell";

export default function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DocumentShell>{children}</DocumentShell>;
}
