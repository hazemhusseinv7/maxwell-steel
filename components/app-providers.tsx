"use client";

import { I18nProvider, Toast } from "@heroui/react";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider locale="ar">
      {children}
      <Toast.Provider placement="bottom" />
    </I18nProvider>
  );
}
