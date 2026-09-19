import { Button, Card } from "@heroui/react";
import NextLink from "next/link";
import { HiCheckCircle } from "react-icons/hi2";
import { CornerFrame } from "@/components/corner-frame";
import { ConfirmationToast } from "./confirmation-toast";
import { CopyButton } from "./copy-button";

interface Props {
  searchParams: Promise<{ ref?: string }>;
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { ref } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10 text-center">
      {ref ? <ConfirmationToast /> : null}
      <CornerFrame>
        <Card className="p-8">
          <Card.Header className="flex-col items-center gap-3">
            <span className="bg-accent-soft text-accent flex h-14 w-14 items-center justify-center rounded-full">
              <HiCheckCircle className="size-8" aria-hidden="true" />
            </span>
            <Card.Title className="font-display text-2xl">
              تم استلام تذكرتك
            </Card.Title>
            <Card.Description>
              احتفظ برقم المرجع لتتبع طلبك برقم جوالك.
            </Card.Description>
          </Card.Header>
          {ref ? (
            <Card.Content className="items-center gap-3">
              <div
                dir="ltr"
                className="border-border bg-surface-secondary shadow-surface card-gradient flex w-full max-w-xs items-stretch gap-0 overflow-hidden rounded-md border"
              >
                <p className="flex-1 px-4 py-3 text-center text-2xl font-bold tracking-widest">
                  {ref}
                </p>
                <CopyButton text={ref} />
              </div>
            </Card.Content>
          ) : null}
          <Card.Footer className="items-center">
            <div className="relative mx-auto w-full max-w-xs px-5">
              <span
                aria-hidden="true"
                className="via-border to-border absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent"
              />
              <span
                aria-hidden="true"
                className="via-border to-border absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent"
              />
              <div className="flex flex-wrap items-center justify-center gap-2">
                <NextLink href={`/support/track${ref ? `?ref=${ref}` : ""}`}>
                  <Button variant="primary">تتبع التذكرة</Button>
                </NextLink>
                <NextLink href="/support/submit?fresh=1">
                  <Button variant="outline">إرسال تذكرة أخرى</Button>
                </NextLink>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </CornerFrame>
    </main>
  );
}
