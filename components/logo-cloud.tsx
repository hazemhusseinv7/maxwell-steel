import Image from "next/image";
import { DecorIcon } from "@/components/decor-icon";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export type PartnerLogo = NonNullable<
  NonNullable<SITE_SETTINGS_QUERY_RESULT>["partnerLogos"]
>[number];

export function LogoCloud({ logos }: { logos: PartnerLogo[] }) {
  const items = logos.flatMap((l) => (l?.asset ? [l] : []));
  if (items.length === 0) return null;
  return (
    <div className="border-border shadow-surface bg-border grid grid-cols-2 gap-px border md:grid-cols-4">
      {items.map((logo, i) => (
        <div
          key={logo._key}
          className={cn(
            "relative flex items-center justify-center px-4 py-8 md:p-8",
            i % 2 === 0 ? "bg-surface-secondary" : "bg-surface",
          )}
        >
          <Image
            alt=""
            className="pointer-events-none h-4 w-auto select-none md:h-8"
            height={32}
            src={urlFor(logo).width(400).url()}
            width={127}
          />
          {i === 0 ? (
            <DecorIcon className="z-10" position="bottom-right" />
          ) : null}
          {i === items.length - 1 && items.length > 1 ? (
            <DecorIcon className="z-10" position="bottom-left" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
