import type { ReactNode } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import {
  HiEnvelope,
  HiHome,
  HiNewspaper,
  HiSquares2X2,
  HiTicket,
} from "react-icons/hi2";

export type SidebarNavItem = {
  title: string;
  path?: string;
  icon?: ReactNode;
  isActive?: boolean;
  subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
  label?: string;
  items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
  {
    label: "الإدارة",
    items: [
      {
        title: "نظرة عامة",
        path: "/dashboard",
        icon: <HiSquares2X2 />,
      },
      {
        title: "التذاكر",
        path: "/dashboard/tickets",
        icon: <HiTicket />,
      },
      {
        title: "المشتركون",
        path: "/dashboard/subscribers",
        icon: <HiEnvelope />,
      },
    ],
  },
  {
    label: "الموقع",
    items: [
      {
        title: "إدارة المدونة",
        path: "/admin",
        icon: <HiNewspaper />,
      },
      {
        title: "عرض الموقع",
        path: "/",
        icon: <HiHome />,
      },
      {
        title: "إرسال تذكرة",
        path: "/support/submit",
        icon: <FaPaperPlane />,
      },
    ],
  },
];

export const footerNavLinks: SidebarNavItem[] = [];

export const navLinks: SidebarNavItem[] = [
  ...navGroups.flatMap((group) =>
    group.items.flatMap((item) =>
      item.subItems?.length ? [item, ...item.subItems] : [item],
    ),
  ),
  ...footerNavLinks,
];

export function findNavItem(pathname: string): SidebarNavItem | null {
  const clean = pathname.replace(/\/$/, "") || "/";
  let fallback: SidebarNavItem | null = null;
  for (const item of navLinks) {
    if (!item.path) continue;
    if (clean === item.path) return { ...item, isActive: true };
    if (
      item.path !== "/" &&
      clean.startsWith(`${item.path}/`) &&
      (!fallback?.path || item.path.length > fallback.path.length)
    ) {
      fallback = item;
    }
  }
  return fallback ? { ...fallback, isActive: true } : null;
}
