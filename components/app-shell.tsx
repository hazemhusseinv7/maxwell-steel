import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  alertCount,
}: {
  children: React.ReactNode;
  alertCount?: number;
}) {
  return (
    <SidebarProvider
      className={cn("relative overflow-hidden [--app-wrapper-max-width:80rem]")}
    >
      <TooltipProvider>
        <AppSidebar />
        <SidebarInset className="bg-transparent">
          <AppHeader alertCount={alertCount} />
          <div
            className={cn(
              "flex flex-1 flex-col p-4 md:p-6",
              "mx-auto w-full max-w-(--app-wrapper-max-width)",
            )}
          >
            {children}
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
