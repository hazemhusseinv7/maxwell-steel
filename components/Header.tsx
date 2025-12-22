"use client";

import React from "react";
import Image from "next/image";

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

const Header = ({ projects }: { projects: ProjectsType | null }) => {
  const t = useTranslations("Header");

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const hasProjects = projects?.images && projects.images.length > 0;

  const items = [
    { name: t("links.link-1"), link: "/products" },
    ...(hasProjects ? [{ name: t("links.link-2"), link: "/projects" }] : []),
    { name: t("links.link-3"), link: "/why-us" },
    { name: t("links.link-4"), link: "/about-us" },
    { name: t("links.link-5"), link: "/blog" },
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
            <Link href="/">
              <Image
                src="/logo/logo.png"
                width={512}
                height={187}
                alt="Logo"
                className="h-auto w-24 lg:w-26"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {items.map(({ name, link }, i) => (
            <NavbarItem key={i}>
              <Link
                className="text-primary-blue text-lg font-medium"
                href={link}
              >
                {name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              className="text-md from-primary-blue/70 to-primary-blue hidden bg-linear-to-tr font-medium text-white lg:flex"
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

          <NavbarItem>
            <Button
              as={Link}
              className="text-md from-primary-blue/70 to-primary-blue w-full bg-linear-to-tr font-medium text-white"
              href="/contact"
              variant="shadow"
            >
              {t("button")}
            </Button>
          </NavbarItem>
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default Header;
