"use client";

import { Button, Tooltip, toast } from "@heroui/react";
import { HiClipboardDocument } from "react-icons/hi2";

export function CopyButton({ text }: { text: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("تم نسخ الرقم");
    } catch {
      toast("تعذر النسخ. انسخ الرقم يدويًا.", { variant: "danger" });
    }
  }

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger aria-label="نسخ الرقم">
        <Button
          variant="tertiary"
          isIconOnly
          onPress={copy}
          aria-label="نسخ الرقم"
          className="border-border h-full cursor-pointer rounded-none rounded-e-md border-s"
        >
          <HiClipboardDocument className="size-5" aria-hidden="true" />
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>نسخ الرقم</Tooltip.Content>
    </Tooltip>
  );
}
