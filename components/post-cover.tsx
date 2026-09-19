import Image from "next/image";
import { cn } from "@/lib/utils";
import { safeImageUrl } from "@/sanity/lib/image";
import type { CoverImage } from "@/sanity/lib/queries";
import { RealEstateCoverSvg } from "./real-estate-cover-svg";

export function PostCover({
  cover,
  title,
  className,
  titleClassName,
  sizes = "(max-width: 768px) 100vw, 400px",
  priority = false,
  variant = "default",
}: {
  cover?: CoverImage | null;
  title: string;
  className?: string;
  titleClassName?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "default" | "series";
}) {
  const isSeries = variant === "series";
  const src = safeImageUrl(cover, 800, 75);

  if (!src) {
    return (
      <div
        className={cn(
          "texture-panel relative flex aspect-video w-full items-center justify-center overflow-hidden p-6",
          isSeries && "bg-accent-soft",
          className,
        )}
      >
        <RealEstateCoverSvg
          variant={variant}
          className="absolute inset-0 size-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-radial",
            isSeries
              ? "from-[color-mix(in_oklab,var(--accent)_14%,var(--surface))] via-[color-mix(in_oklab,var(--accent)_6%,transparent)] to-transparent"
              : "from-[oklch(0.92_0.035_80/0.82)] via-[oklch(0.9_0.03_78/0.5)] to-transparent",
          )}
        />
        <div className="relative z-1 flex flex-col items-center gap-2.5 px-3">
          <div aria-hidden="true" className="flex items-center gap-2">
            <span
              className={cn("h-px w-6", isSeries ? "bg-accent" : "bg-bronze")}
            />
            <span
              className={cn(
                "size-1.5 rotate-45 border",
                isSeries ? "border-accent bg-accent" : "border-gold bg-bronze",
              )}
            />
            <span
              className={cn("h-px w-6", isSeries ? "bg-accent" : "bg-bronze")}
            />
          </div>
          <p
            className={cn(
              "font-display text-foreground line-clamp-3 text-center text-xl leading-9 font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]",
              titleClassName,
            )}
          >
            {title}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn("relative aspect-video w-full overflow-hidden", className)}
    >
      <Image
        src={src}
        alt={cover?.alt ?? title}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  );
}
