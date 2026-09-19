"use client";

import { toast } from "@heroui/react";
import { HiClipboardDocument } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

export function CopyText({ text, label }: { text: string; label: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("تم النسخ");
    } catch {
      toast("تعذر النسخ. انسخ النص يدويًا.", { variant: "danger" });
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={copy}
      aria-label={label}
      className="size-6 shrink-0 cursor-pointer"
    >
      <HiClipboardDocument className="size-3.5" aria-hidden="true" />
    </Button>
  );
}
