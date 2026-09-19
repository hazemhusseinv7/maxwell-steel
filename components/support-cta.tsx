import { Button } from "@heroui/react";
import NextLink from "next/link";
import { FaPaperPlane } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdMarkChatUnread } from "react-icons/md";

export function SupportCta() {
  return (
    <section className="texture-band bg-accent-soft border-border shadow-surface rounded-none border px-6 py-10 text-center">
      <h2 className="text-foreground font-display text-2xl font-bold">
        <MdMarkChatUnread className="me-2 inline size-6" aria-hidden="true" />
        تحتاج مساعدة؟
      </h2>
      <p className="text-muted mx-auto mt-2 max-w-md leading-8">
        أرسل تذكرة دعم وسنرد عليك.
        <br />
        يمكنك تتبع حالة تذكرتك برقم المرجع في أي وقت.
      </p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <NextLink href="/support/submit">
          <Button variant="primary">
            <FaPaperPlane className="size-4" aria-hidden="true" />
            إرسال تذكرة
          </Button>
        </NextLink>
        <NextLink href="/support/track">
          <Button variant="secondary">
            <HiMagnifyingGlass className="size-4" aria-hidden="true" />
            تتبع تذكرة
          </Button>
        </NextLink>
      </div>
    </section>
  );
}
