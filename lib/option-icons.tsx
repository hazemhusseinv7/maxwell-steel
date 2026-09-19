import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  HiArchiveBox,
  HiBanknotes,
  HiChatBubbleOvalLeft,
  HiCheckCircle,
  HiClock,
  HiDocumentText,
  HiExclamationTriangle,
  HiFlag,
  HiFolder,
  HiInbox,
  HiLightBulb,
  HiMapPin,
  HiTag,
  HiUser,
  HiWrenchScrewdriver,
} from "react-icons/hi2";

function ic(Icon: IconType): ReactNode {
  return <Icon className="size-4 shrink-0 text-muted" aria-hidden="true" />;
}

export const CATEGORY_ICON: ReactNode = ic(HiFolder);
export const TAG_ICON: ReactNode = ic(HiTag);

export const TICKET_CATEGORY_ICONS: Record<string, ReactNode> = {
  general: ic(HiChatBubbleOvalLeft),
  technical: ic(HiWrenchScrewdriver),
  billing: ic(HiBanknotes),
  content: ic(HiDocumentText),
  suggestion: ic(HiLightBulb),
  other: ic(HiMapPin),
};

export const TICKET_STATUS_ICONS: Record<string, ReactNode> = {
  open: ic(HiInbox),
  inProgress: ic(HiClock),
  resolved: ic(HiCheckCircle),
  closed: ic(HiArchiveBox),
};

export const TICKET_PRIORITY_ICONS: Record<string, ReactNode> = {
  low: ic(HiFlag),
  medium: ic(HiFlag),
  high: ic(HiExclamationTriangle),
  urgent: ic(HiExclamationTriangle),
};

export const ADMIN_ICON: ReactNode = ic(HiUser);
