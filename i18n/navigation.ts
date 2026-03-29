import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
import { JSX } from "react";

const {
  Link: OriginalLink,
  getPathname,
  redirect,
  usePathname,
  useRouter,
} = createNavigation(routing);

export const Link = OriginalLink as <
  T extends string,
  P extends Omit<Parameters<typeof OriginalLink>[0], "href">,
>(
  props: P & { href: T },
) => JSX.Element;

export { getPathname, redirect, usePathname, useRouter };
