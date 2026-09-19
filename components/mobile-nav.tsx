"use client";
import { Button, Link, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { navLinks } from "@/components/header";
import { Portal, PortalBackdrop } from "@/components/portal";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <div className="md:hidden">
      <Tooltip>
        <Tooltip.Trigger aria-label="فتح القائمة">
          <Button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="فتح القائمة"
            className="md:hidden"
            onPress={() => setOpen(!open)}
            isIconOnly
            variant="outline"
          >
            {open ? (
              <HiXMark className="size-4" />
            ) : (
              <HiBars3 className="size-4" />
            )}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>القائمة</Tooltip.Content>
      </Tooltip>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-95 data-[slot=open]:animate-in ease-out",
              "bg-background size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onPress={() => setOpen(false)}
                  className="hover:text-accent justify-start px-3 py-2 transition-colors hover:no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Button
                variant="primary"
                fullWidth
                onPress={() => go("/support/submit")}
              >
                أرسل طلب
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
