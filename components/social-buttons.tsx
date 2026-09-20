"use client";

import { Button, Tooltip } from "@heroui/react";
import { motion, useReducedMotion } from "motion/react";
import {
  getPlatformFallbackIcon,
  SOCIAL_PLATFORMS,
} from "@/lib/social-platforms";
import { cn } from "@/lib/utils";

export interface SocialLink {
  platform?: string | null;
  url?: string | null;
}

export function SocialButtons({
  links,
  className,
  stagger = false,
  plain = false,
}: {
  links: SocialLink[];
  className?: string;
  stagger?: boolean;
  plain?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const socials = (links ?? []).flatMap((s, i) => {
    const meta = s?.platform ? SOCIAL_PLATFORMS[s.platform] : undefined;
    const Icon = meta?.icon ?? getPlatformFallbackIcon();
    const label = meta?.title ?? s?.platform ?? `رابط ${i + 1}`;
    return s?.url
      ? [{ key: `${s.platform}-${i}`, label, url: s.url, Icon }]
      : [];
  });
  if (socials.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {socials.map(({ key, label, url, Icon }, i) => {
        const trigger = (
          <Tooltip key={key}>
            <Tooltip.Trigger aria-label={label}>
              <Button
                className={cn(
                  "hover:bg-accent hover:text-background transition-colors duration-300",
                  plain && "border-0",
                )}
                variant="outline"
                isIconOnly
                aria-label={label}
                onPress={() =>
                  window.open(url, "_blank", "noopener,noreferrer")
                }
              >
                <Icon className="size-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>{label}</Tooltip.Content>
          </Tooltip>
        );
        // The motion wrapper stays outside Tooltip so the trigger
        // structure (and its hover/keyboard behavior) is untouched.
        return stagger && !reduceMotion ? (
          <motion.span
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 170,
              damping: 22,
              duration: 0.4,
              delay: 0.35 + i * 0.07,
            }}
          >
            {trigger}
          </motion.span>
        ) : (
          trigger
        );
      })}
    </div>
  );
}
