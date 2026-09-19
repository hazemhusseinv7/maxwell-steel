"use client";

import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";

import { navGroups } from "@/components/app-shared";
import { NavGroup } from "@/components/nav-group";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, path?: string): boolean {
  if (!path) return false;
  if (path === "/dashboard") return pathname === "/dashboard";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar
      className={cn("*:data-[slot=sidebar-inner]:bg-background")}
      collapsible="icon"
      variant="sidebar"
      side="right"
    >
      <SidebarHeader className="h-14 items-start justify-center border-b px-2">
        <NextLink
          href="/dashboard"
          aria-label="لوحة التحكم"
          className="flex items-center rounded-md px-2 py-1.5 transition-colors hover:bg-transparent"
        >
          <Image
            src="/logo/logo.svg"
            alt="شعار مقرات"
            width={512}
            height={435}
            className="h-8 w-auto"
          />
        </NextLink>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <NavGroup
            key={group.label}
            label={group.label}
            items={group.items.map((item) => ({
              ...item,
              isActive: isActivePath(pathname, item.path),
            }))}
          />
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 border-t p-2">
        <NextLink
          href="/"
          aria-label="تصفح المدونة"
          className="group border-border relative block h-72 overflow-hidden rounded-none border group-data-[collapsible=icon]:hidden"
        >
          <Image
            src="/hero.png"
            alt="صورة الواجهة"
            fill
            sizes="256px"
            className="bg-accent-soft object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-linear-to-t from-[oklch(0.25_0.03_75/0.7)] to-transparent px-2 pt-6 pb-1.5 text-xs font-bold text-white">
            تصفح المدونة
            <HiArrowLeft className="size-3.5" aria-hidden="true" />
          </span>
        </NextLink>
      </SidebarFooter>
    </Sidebar>
  );
}
