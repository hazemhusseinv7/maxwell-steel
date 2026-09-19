import type { ReactNode } from "react";

import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  corners?: boolean;
  dividers?: "top" | "bottom" | "both" | "none";
}

export function CornerFrame({
  children,
  className,
  corners = true,
  dividers = "none",
}: Props) {
  return (
    <div className={cn("relative", className)}>
      {corners ? (
        <>
          <DecorIcon className="size-4" position="top-left" />
          <DecorIcon className="size-4" position="top-right" />
          <DecorIcon className="size-4" position="bottom-left" />
          <DecorIcon className="size-4" position="bottom-right" />
        </>
      ) : null}
      {dividers === "top" || dividers === "both" ? (
        <FullWidthDivider className="-top-px" />
      ) : null}
      {children}
      {dividers === "bottom" || dividers === "both" ? (
        <FullWidthDivider className="-bottom-px" />
      ) : null}
    </div>
  );
}
