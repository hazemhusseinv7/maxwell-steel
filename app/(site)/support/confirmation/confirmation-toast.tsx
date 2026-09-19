"use client";

import { toast } from "@heroui/react";
import { useEffect, useRef } from "react";

export function ConfirmationToast() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    toast.success("تم استلام تذكرتك بنجاح");
  }, []);
  return null;
}
