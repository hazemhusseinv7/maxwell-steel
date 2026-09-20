import { Button, Card } from "@heroui/react";
import NextLink from "next/link";
import { MdMarkChatUnread } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SupportLanding() {
  return (
    <main className="mx-auto min-h-150 w-full max-w-6xl flex-1 px-4 py-10">
      <div className="texture-band bg-accent-soft border-border shadow-surface rounded-sm border p-6 text-center sm:p-8">
        <h1 className="font-display text-3xl font-extrabold">
          <MdMarkChatUnread className="me-2 inline size-7" aria-hidden="true" />
          الدعم
        </h1>
        <p className="text-muted mx-auto mt-3 max-w-xl leading-8">
          أرسل تذكرة جديدة وسنرد عليك، أو تتبع تذكرتك الحالية برقم المرجع أو رقم
          جوالك.
        </p>
      </div>
      <div className="mx-auto mt-8 grid max-w-2xl gap-5 sm:grid-cols-2">
        <Card className="texture-panel border-border shadow-surface card-gradient p-6 text-center">
          <Card.Header className="flex-col items-center gap-2">
            <Card.Title className="font-display text-xl">
              <FaPaperPlane
                className="me-1.5 inline size-5"
                aria-hidden="true"
              />
              إرسال تذكرة جديدة
            </Card.Title>
            <Card.Description>
              صف مشكلتك وسيتم حلها بأسرع شكل ممكن
            </Card.Description>
          </Card.Header>
          <Card.Footer className="justify-center">
            <NextLink href="/support/submit">
              <Button variant="primary">إرسال تذكرة</Button>
            </NextLink>
          </Card.Footer>
        </Card>
        <Card className="texture-panel border-border shadow-surface card-gradient p-6 text-center">
          <Card.Header className="flex-col items-center gap-2">
            <Card.Title className="font-display text-xl">
              <HiMagnifyingGlass
                className="me-1.5 inline size-5"
                aria-hidden="true"
              />
              تتبع تذكرة
            </Card.Title>
            <Card.Description>
              تحقق من حالة تذكرتك والردود عليها
            </Card.Description>
          </Card.Header>
          <Card.Footer className="justify-center">
            <NextLink href="/support/track">
              <Button variant="outline">تتبع تذكرة</Button>
            </NextLink>
          </Card.Footer>
        </Card>
      </div>
    </main>
  );
}
