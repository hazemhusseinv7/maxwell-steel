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
            <Link href="/" className="font-bold text-lg text-teal-800">
              Fine Edge
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {items.map(({ name, link }, i) => (
            <NavbarItem key={i}>
              <Link className="text-teal-900 text-lg" href={link}>
                {name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              className="text-white text-md font-medium bg-linear-to-tr from-teal-400 to-teal-700"
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
