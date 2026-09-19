import { Avatar, Tooltip } from "@heroui/react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { AuthorAvatar as AuthorAvatarType } from "@/sanity/lib/queries";

interface Props {
  name: string;
  avatar?: AuthorAvatarType | null;
  size?: "md" | "lg";
  tooltip?: string;
}

export function AuthorAvatar({ name, avatar, size = "md", tooltip }: Props) {
  const initials = (
    <Avatar
      className={cn(
        "avatar--circle font-display shrink-0 bg-accent-soft font-bold text-accent",
        size === "lg" ? "h-20 w-20 text-2xl" : "h-12 w-12 text-lg",
      )}
    >
      {avatar ? (
        <Avatar.Image
          src={urlFor(avatar).width(160).height(160).url()}
          alt={name}
        />
      ) : null}
      <Avatar.Fallback>{name.slice(0, 1)}</Avatar.Fallback>
    </Avatar>
  );
  if (!tooltip) return initials;
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label={tooltip}>{initials}</Tooltip.Trigger>
      <Tooltip.Content>{tooltip}</Tooltip.Content>
    </Tooltip>
  );
}
