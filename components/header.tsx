"use client";
import { Button, Link } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const navLinks = [
  {
    label: "الرئيسية",
    href: "/",
  },
  {
    label: "الدعم",
    href: "/support",
  },
  {
    label: "تتبع تذكرة",
    href: "/support/track",
  },
];

export function Header() {
  const scrolled = useScroll(10);
  const router = useRouter();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-6xl border-b border-transparent md:rounded-none md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 supports-backdrop-filter:bg-background/50 md:shadow-surface backdrop-blur-sm md:top-2 md:max-w-3xl":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <NextLink className="rounded-md py-2" href="/" aria-label="مدونة مقرات">
          <Image
            src="/logo/logo.svg"
            alt="مقرات"
            width={512}
            height={435}
            className="h-8 w-auto"
            priority
          />
        </NextLink>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:bg-accent h-8 px-3 py-2 text-sm transition-colors hover:text-white hover:no-underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button
            size="sm"
            variant="primary"
            onPress={() => router.push("/support/submit")}
          >
            فتح تذكرة
          </Button>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
