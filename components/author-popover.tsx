"use client";

import { Popover } from "@heroui/react";
import NextLink from "next/link";
import type { ReactNode } from "react";

import type { AuthorRef } from "@/sanity/lib/queries";
import { AuthorAvatar } from "./author-avatar";

export function AuthorPopover({
  author,
  children,
}: {
  author: AuthorRef;
  children: ReactNode;
}) {
  return (
    <Popover>
      <Popover.Trigger className="cursor-pointer">{children}</Popover.Trigger>
      <Popover.Dialog aria-label={`الكاتب ${author.name}`}>
        <Popover.Content className="flex items-center gap-3 p-1">
          <AuthorAvatar name={author.name} avatar={author.avatar} />
          <span>
            <NextLink
              href={`/author/${author.slug}`}
              className="block text-sm font-bold"
            >
              {author.name}
            </NextLink>
            {author.jobTitle ? (
              <span className="text-muted block text-xs">
                {author.jobTitle}
              </span>
            ) : null}
          </span>
        </Popover.Content>
      </Popover.Dialog>
    </Popover>
  );
}
