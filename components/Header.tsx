"use client";

import React from "react";
import { useTranslations } from "next-intl";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import ChangeLang from "./ChangeLang";

const Header = () => {
  const t = useTranslations("Header");

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const items = [
    { name: t("links.link-1"), link: "/products" },
    { name: t("links.link-2"), link: "/about-us" },
    { name: t("links.link-3"), link: "/blog" },
  ];

  return (
    <header>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        className="fixed top-0"
      >
        <NavbarContent as="div">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/" className="text-lg font-bold text-blue-800">
              Maxwell Steel
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {items.map(({ name, link }, i) => (
            <NavbarItem key={i}>
              <Link className="text-lg text-blue-900" href={link}>
                {name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              className="text-md bg-linear-to-tr from-blue-400 to-blue-700 font-medium text-white"
              href="/contact"
              variant="shadow"
            >
              {t("button")}
            </Button>
          </NavbarItem>
          <NavbarItem>
            <ChangeLang />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {items.map(({ name, link }, index) => (
            <NavbarMenuItem key={`${name}-${index}`}>
              <Link className="w-full" color="foreground" href={link} size="lg">
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default Header;
