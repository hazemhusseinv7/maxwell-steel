import { Link, Section, Text } from "react-email";

import {
  CoverHero,
  MailBody,
  MailFooter,
  MailShell,
  MailTitle,
} from "./_components/blocks";

interface Props {
  name: string;
  reference: string;
  trackUrl: string;
  siteUrl: string;
}

export function TicketConfirmation({
  name,
  reference,
  trackUrl,
  siteUrl,
}: Props) {
  return (
    <MailShell preview={`تم استلام تذكرتك ${reference}`}>
      <CoverHero src={`${siteUrl}/emails/cover-header.jpg`} alt="مدونة مقرات" />
      <Section style={{ padding: "8px 40px 40px" }}>
        <MailTitle>أهلاً {name}، تم استلام تذكرتك</MailTitle>
        <MailBody>شكراً لتواصلك معنا. رقم المرجع الخاص بتذكرتك هو:</MailBody>
        <Section style={{ textAlign: "center", margin: "20px 0" }}>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "2px",
              direction: "ltr",
            }}
          >
            {reference}
          </Text>
        </Section>
        <MailBody>
          احتفظ بهذا الرقم. يمكنك استخدامه مع بريدك الإلكتروني لتتبع حالة تذكرتك
          في أي وقت:
        </MailBody>
        <Link href={trackUrl} style={{ color: "#1d4ed8", fontSize: "15px" }}>
          تتبع التذكرة
        </Link>
      </Section>
      <MailFooter siteUrl={siteUrl} />
    </MailShell>
  );
}

export default function TicketConfirmationPreview() {
  return (
    <TicketConfirmation
      name="أحمد"
      reference="TKT-ABC123"
      trackUrl="http://localhost:3000/support/track?ref=TKT-ABC123"
      siteUrl="http://localhost:3000"
    />
  );
}
