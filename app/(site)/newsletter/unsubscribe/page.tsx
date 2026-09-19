import type { Metadata } from "next";

import { UnsubscribeForm } from "@/components/unsubscribe-form";

export const metadata: Metadata = {
  title: "إلغاء الاشتراك - مقرات",
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return <UnsubscribeForm initialEmail={email ?? ""} />;
}
