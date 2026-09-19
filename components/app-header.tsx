"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { HiBell } from "react-icons/hi2";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { findNavItem } from "@/components/app-shared";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { DecorIcon } from "@/components/decor-icon";
import { NavUser } from "@/components/nav-user";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatNumberAr } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function AppHeader({ alertCount }: { alertCount?: number }) {
  const pathname = usePathname();
  const activeItem = findNavItem(pathname);
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-6",
        "bg-background/95 supports-backdrop-filter:bg-background/50 backdrop-blur-sm",
      )}
    >
      <DecorIcon className="hidden md:block" position="bottom-left" />
      <div className="flex items-center gap-3">
        <CustomSidebarTrigger />
        <Separator
          className="mr-2 h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <AppBreadcrumbs page={activeItem} />
      </div>
      <div className="flex items-center gap-3">
        <NextLink
          href="/dashboard/tickets?status=open"
          aria-label="التذاكر المفتوحة"
        >
          <Button
            size="icon-sm"
            variant="outline"
            aria-label="التذاكر المفتوحة"
            className="hover:bg-warning-soft relative cursor-pointer"
          >
            <HiBell />
            {alertCount != null && alertCount > 0 ? (
              <span className="bg-destructive text-destructive-foreground absolute -inset-s-1 -top-1 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                {alertCount > 9 ? "٩+" : formatNumberAr(alertCount)}
              </span>
            ) : null}
          </Button>
        </NextLink>
        <Separator
          className="h-4 data-[orientation=vertical]:self-center"
          orientation="vertical"
        />
        <NavUser />
      </div>
    </header>
  );
}
