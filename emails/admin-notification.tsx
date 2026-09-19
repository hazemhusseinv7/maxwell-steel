import { Link, Section, Text } from "react-email";

import {
  CoverHero,
  MailBody,
  MailFooter,
  MailShell,
  MailTitle,
} from "./_components/blocks";

interface Props {
  reference: string;
  subject: string;
  categoryLabel: string;
  priorityLabel: string;
  requesterName: string;
  dashboardUrl: string;
  siteUrl: string;
}

export function AdminNotification({
  reference,
  subject,
  categoryLabel,
  priorityLabel,
  requesterName,
  dashboardUrl,
  siteUrl,
}: Props) {
  return (
    <MailShell preview={`تذكرة جديدة: ${subject}`}>
      <CoverHero src={`${siteUrl}/emails/cover-header.jpg`} alt="مدونة مقرات" />
      <Section style={{ padding: "8px 40px 40px" }}>
        <MailTitle>تذكرة دعم جديدة</MailTitle>
        <Section
          style={{
            fontSize: "15px",
            lineHeight: "30px",
            textAlign: "right",
            direction: "rtl",
          }}
        >
          <Text style={{ textAlign: "right" }}>المرجع: {reference}</Text>
          <Text style={{ textAlign: "right" }}>الموضوع: {subject}</Text>
          <Text style={{ textAlign: "right" }}>التصنيف: {categoryLabel}</Text>
          <Text style={{ textAlign: "right" }}>الأولوية: {priorityLabel}</Text>
          <Text style={{ textAlign: "right" }}>
            مقدّم الطلب: {requesterName}
          </Text>
        </Section>
        <Link
          href={dashboardUrl}
          style={{ color: "#1d4ed8", fontSize: "15px" }}
        >
          فتح التذكرة في لوحة التحكم
        </Link>
        <MailBody>
          <span style={{ fontSize: "13px", color: "#5a5549" }}>
            إشعار تلقائي من نظام الدعم.
          </span>
        </MailBody>
      </Section>
      <MailFooter siteUrl={siteUrl} />
    </MailShell>
  );
}

export default function AdminNotificationPreview() {
  return (
    <AdminNotification
      reference="TKT-ABC123"
      subject="مشكلة تجريبية"
      categoryLabel="عام"
      priorityLabel="متوسطة"
      requesterName="أحمد"
      dashboardUrl="http://localhost:3000/dashboard/tickets/preview"
      siteUrl="http://localhost:3000"
    />
  );
}
