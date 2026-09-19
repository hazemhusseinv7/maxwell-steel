import { DecorIcon } from "@/components/decor-icon";
import { FullWidthDivider } from "@/components/full-width-divider";
import { LogoCloud, type PartnerLogo } from "@/components/logo-cloud";

export function LogosSection({
  logos,
  title,
}: {
  logos: PartnerLogo[];
  title?: string | null;
}) {
  if (logos.flatMap((l) => (l?.asset ? [l] : [])).length === 0) return null;
  const [muted, strong] = (title ?? "").split("|").map((s) => s.trim());
  return (
    <section>
      {muted ? (
        <h2 className="font-display text-muted py-6 text-center text-lg font-medium tracking-tight md:text-xl">
          {muted}
          {strong ? <span className="text-foreground"> {strong}</span> : null}
        </h2>
      ) : null}
      <div className="relative *:border-0">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />
        <LogoCloud logos={logos} />
        <FullWidthDivider className="-bottom-px" />
      </div>
    </section>
  );
}
