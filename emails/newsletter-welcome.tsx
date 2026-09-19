import { Section } from "react-email";

import {
  CoverHero,
  MailBody,
  MailChecklist,
  MailCta,
  MailFooter,
  MailShell,
  MailTitle,
} from "./_components/blocks";

interface Props {
  unsubscribeUrl: string;
  siteUrl: string;
}

const TIPS = [
  {
    title: "تصفح الأقسام",
    description: "مقالات مصنّفة في العقارات والاستثمار والتطوير العقاري.",
  },
  {
    title: "تابع السلاسل",
    description: "سلاسل مرتبة تأخذك من الأساسيات إلى المواضيع المتقدمة.",
  },
  {
    title: "شارك المقالات",
    description: "أرسل ما يعجبك لمن يهمه الأمر وساهم في نشر المعرفة.",
  },
];

export function NewsletterWelcome({ unsubscribeUrl, siteUrl }: Props) {
  return (
    <MailShell preview="تم اشتراكك في نشرة مقرات بنجاح">
      <CoverHero src={`${siteUrl}/emails/cover-header.jpg`} alt="مدونة مقرات" />
      <Section style={{ padding: "8px 40px 0" }}>
        <MailTitle>أهلاً بك في نشرة مقرات</MailTitle>
        <MailBody>
          تم تأكيد اشتراكك بنجاح. ستصلك مختارات المقالات العقارية الجديدة على
          بريدك.
        </MailBody>
        <MailCta href={`${siteUrl}/`} label="تصفح المقالات" />
      </Section>
      <MailChecklist items={TIPS} />
      <MailFooter siteUrl={siteUrl} unsubscribeUrl={unsubscribeUrl} />
    </MailShell>
  );
}

export default function NewsletterWelcomePreview() {
  return (
    <NewsletterWelcome
      unsubscribeUrl="http://localhost:3000/newsletter/unsubscribe?email=preview@example.com"
      siteUrl="http://localhost:3000"
    />
  );
}
